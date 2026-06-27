import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { postRowToSheet } from "@/lib/google-sheets";

type SubmissionRow = {
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

const BATCH_LIMIT = 50;

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await sql`
    ALTER TABLE contact_submissions
    ADD COLUMN IF NOT EXISTS synced_to_sheet BOOLEAN DEFAULT FALSE
  `;

  const { rows } = await sql<SubmissionRow>`
    SELECT id, submitted_at, source_page, describes_you, email, full_name,
           linkedin, phone, referred_by, investment_range, industry, service,
           financing_participation, lending_affiliation
    FROM contact_submissions
    WHERE synced_to_sheet = FALSE
    ORDER BY submitted_at ASC
    LIMIT ${BATCH_LIMIT}
  `;

  if (rows.length === 0) {
    return NextResponse.json({ synced: 0, failed: 0, message: "Nothing to sync." });
  }

  let synced = 0;
  let failed = 0;

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
      synced++;
    } catch (err) {
      console.error(
        `[cron/sync-sheets] #${r.id} failed:`,
        err instanceof Error ? err.message : err,
      );
      failed++;
    }
  }

  return NextResponse.json({ synced, failed, total: rows.length });
}
