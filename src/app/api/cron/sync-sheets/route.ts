import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { postRowToSheet } from "@/lib/google-sheets";

type SubmissionRow = {
  id: number;
  submitted_at: Date;
  source_page: string | null;
  name: string;
  email: string;
  phone: string | null;
  project_type: string | null;
  budget_range: string | null;
  timeline: string | null;
  drawings_status: string | null;
  project_location: string | null;
  message: string | null;
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
    SELECT id, submitted_at, source_page, name, email, phone,
           project_type, budget_range, timeline, drawings_status,
           project_location, message
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
      name: r.name,
      email: r.email,
      phone: r.phone ?? undefined,
      projectType: r.project_type ?? undefined,
      budgetRange: r.budget_range ?? undefined,
      timeline: r.timeline ?? undefined,
      drawingsStatus: r.drawings_status ?? undefined,
      projectLocation: r.project_location ?? undefined,
      message: r.message ?? undefined,
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
