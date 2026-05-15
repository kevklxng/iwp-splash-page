import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function parseLimit(raw: string | null): number {
  const n = raw === null ? 50 : Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 1) return 50;
  return Math.min(n, 200);
}

function parseOffset(raw: string | null): number {
  const n = raw === null ? 0 : Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 0) return 0;
  return n;
}

export async function GET(request: Request) {
  const secret = process.env.ADMIN_API_SECRET;
  if (!secret) {
    console.error("[api/admin/submissions] ADMIN_API_SECRET is not set.");
    return NextResponse.json({ error: "Server misconfiguration." }, { status: 500 });
  }

  const auth = request.headers.get("authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7).trim() : null;
  if (!token || token !== secret) {
    return unauthorized();
  }

  if (!process.env.POSTGRES_URL) {
    return NextResponse.json({ error: "Database not configured." }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const limit = parseLimit(searchParams.get("limit"));
  const offset = parseOffset(searchParams.get("offset"));
  const unreadOnly = searchParams.get("unread") === "true";

  type Row = {
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
    is_read: boolean;
    created_at: Date;
  };

  const countResult = unreadOnly
    ? await sql<{ count: string }>`SELECT COUNT(*)::text AS count FROM contact_submissions WHERE is_read = FALSE`
    : await sql<{ count: string }>`SELECT COUNT(*)::text AS count FROM contact_submissions`;

  const total = Number.parseInt(countResult.rows[0]?.count ?? "0", 10) || 0;

  const listResult = unreadOnly
    ? await sql<Row>`
        SELECT
          id,
          submitted_at,
          source_page,
          name,
          email,
          phone,
          project_type,
          budget_range,
          timeline,
          drawings_status,
          project_location,
          message,
          is_read,
          created_at
        FROM contact_submissions
        WHERE is_read = FALSE
        ORDER BY submitted_at DESC
        LIMIT ${limit}
        OFFSET ${offset}
      `
    : await sql<Row>`
        SELECT
          id,
          submitted_at,
          source_page,
          name,
          email,
          phone,
          project_type,
          budget_range,
          timeline,
          drawings_status,
          project_location,
          message,
          is_read,
          created_at
        FROM contact_submissions
        ORDER BY submitted_at DESC
        LIMIT ${limit}
        OFFSET ${offset}
      `;

  const submissions = listResult.rows.map((r) => ({
    id: r.id,
    submittedAt: r.submitted_at instanceof Date ? r.submitted_at.toISOString() : String(r.submitted_at),
    sourcePage: r.source_page,
    name: r.name,
    email: r.email,
    phone: r.phone,
    projectType: r.project_type,
    budgetRange: r.budget_range,
    timeline: r.timeline,
    drawingsStatus: r.drawings_status,
    projectLocation: r.project_location,
    message: r.message,
    isRead: r.is_read,
    createdAt: r.created_at instanceof Date ? r.created_at.toISOString() : String(r.created_at),
  }));

  return NextResponse.json({ submissions, total });
}
