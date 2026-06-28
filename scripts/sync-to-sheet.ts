/**
 * Manually sync unsynced Postgres submissions to Google Sheets.
 * Run: npm run sync:sheet
 *
 * Requires in .env.local:
 *   POSTGRES_URL
 *   GOOGLE_SHEETS_WEBHOOK_URL
 *   GOOGLE_SHEETS_WEBHOOK_SECRET
 */
import { sql } from "@vercel/postgres";
import { postRowToSheet } from "../src/lib/google-sheets";

if (!process.env.POSTGRES_URL) {
  console.error("POSTGRES_URL is not set.");
  process.exit(1);
}
if (!process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
  console.error("GOOGLE_SHEETS_WEBHOOK_URL is not set.");
  process.exit(1);
}
if (!process.env.GOOGLE_SHEETS_WEBHOOK_SECRET) {
  console.error("GOOGLE_SHEETS_WEBHOOK_SECRET is not set.");
  process.exit(1);
}

type Row = {
  id: number;
  submitted_at: Date;
  source_page: string | null;
  describes_you: string | null;
  email: string;
  full_name: string;
  linkedin: string | null;
  phone: string | null;
  referred_by: string | null;
  investment_range: string | null;
  industry: string | null;
  service: string | null;
  financing_participation: string | null;
  lending_affiliation: string | null;
};

async function main() {
  await sql`
    ALTER TABLE contact_submissions
    ADD COLUMN IF NOT EXISTS synced_to_sheet BOOLEAN DEFAULT FALSE
  `;

  const { rows } = await sql<Row>`
    SELECT id, submitted_at, source_page, describes_you, email, full_name,
           linkedin, phone, referred_by, investment_range, industry, service,
           financing_participation, lending_affiliation
    FROM contact_submissions
    WHERE synced_to_sheet = FALSE
    ORDER BY submitted_at ASC
  `;

  if (rows.length === 0) {
    console.log("All submissions are already synced to Google Sheets.");
    return;
  }

  console.log(`Found ${rows.length} unsynced submission(s).\n`);

  let synced = 0;
  for (const r of rows) {
    const submittedAt =
      r.submitted_at instanceof Date ? r.submitted_at.toISOString() : String(r.submitted_at);

    const sheetRow = {
      submissionId: String(r.id),
      submittedAt,
      sourcePage: r.source_page ?? undefined,
      describesYou: r.describes_you ?? undefined,
      fullName: r.full_name,
      email: r.email,
      linkedIn: r.linkedin ?? undefined,
      phone: r.phone ?? undefined,
      referredBy: r.referred_by ?? undefined,
      investmentRange: r.investment_range ?? undefined,
      industry: r.industry ?? undefined,
      service: r.service ?? undefined,
      financingParticipation: r.financing_participation ?? undefined,
      lendingAffiliation: r.lending_affiliation ?? undefined,
    };

    try {
      await postRowToSheet(sheetRow);
      await sql`UPDATE contact_submissions SET synced_to_sheet = TRUE WHERE id = ${r.id}`;
      console.log(`  #${r.id} ${r.full_name} (${r.email}) -> Sheet OK`);
      synced++;
    } catch (err) {
      console.error(`  #${r.id} ${r.full_name} -> FAILED:`, err instanceof Error ? err.message : err);
    }
  }

  console.log(`\nSynced ${synced}/${rows.length} rows.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
