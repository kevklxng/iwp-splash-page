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
          id, submitted_at, source_page, describes_you, email, full_name,
          linkedin, phone, referred_by, investment_range, industry, service,
          financing_participation, lending_affiliation, is_read, created_at
        FROM contact_submissions
        WHERE is_read = FALSE
        ORDER BY submitted_at DESC
        LIMIT ${limit}
        OFFSET ${offset}
      `
    : await sql<Row>`
        SELECT
          id, submitted_at, source_page, describes_you, email, full_name,
          linkedin, phone, referred_by, investment_range, industry, service,
          financing_participation, lending_affiliation, is_read, created_at
        FROM contact_submissions
        ORDER BY submitted_at DESC
        LIMIT ${limit}
        OFFSET ${offset}
      `;

  const submissions = listResult.rows.map((r) => ({
    id: r.id,
    submittedAt: r.submitted_at instanceof Date ? r.submitted_at.toISOString() : String(r.submitted_at),
    sourcePage: r.source_page,
    describesYou: r.describes_you,
    fullName: r.full_name,
    email: r.email,
    linkedIn: r.linkedin,
    phone: r.phone,
    referredBy: r.referred_by,
    investmentRange: r.investment_range,
    industry: r.industry,
    service: r.service,
    financingParticipation: r.financing_participation,
    lendingAffiliation: r.lending_affiliation,
    isRead: r.is_read,
    createdAt: r.created_at instanceof Date ? r.created_at.toISOString() : String(r.created_at),
  }));

  return NextResponse.json({ submissions, total });
}
