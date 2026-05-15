/**
 * Fetch contact submissions from the admin API.
 * Run: npm run pull:submissions
 * Or: npx tsx --env-file=.env.local scripts/pull-submissions.ts --unread
 *
 * Requires ADMIN_API_SECRET and SITE_URL or NEXT_PUBLIC_SITE_URL (defaults to http://localhost:3000).
 */
const args = process.argv.slice(2);
const unreadOnly = args.includes("--unread");

const secret = process.env.ADMIN_API_SECRET;
const baseUrl = (
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000"
).replace(/\/+$/, "");

if (!secret) {
  console.error("ADMIN_API_SECRET is not set. Add it to .env.local.");
  process.exit(1);
}

type Submission = {
  id: number;
  submittedAt: string;
  sourcePage: string | null;
  name: string;
  email: string;
  phone: string | null;
  projectType: string | null;
  budgetRange: string | null;
  timeline: string | null;
  drawingsStatus: string | null;
  projectLocation: string | null;
  message: string | null;
  isRead: boolean;
};

async function main() {
  const params = new URLSearchParams({ limit: "50", offset: "0" });
  if (unreadOnly) params.set("unread", "true");

  const url = `${baseUrl}/api/admin/submissions?${params.toString()}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${secret}` },
  });

  const body = (await res.json().catch(() => ({}))) as {
    error?: string;
    submissions?: Submission[];
    total?: number;
  };

  if (!res.ok) {
    console.error(`Request failed: HTTP ${res.status}`, body.error ?? body);
    process.exit(1);
  }

  const submissions = body.submissions ?? [];
  const total = body.total ?? submissions.length;

  console.log(`Total matching rows: ${total}\n`);

  const table = submissions.map((s) => ({
    id: s.id,
    submitted: s.submittedAt.slice(0, 19).replace("T", " "),
    name: s.name,
    email: s.email,
    phone: s.phone ?? "",
    location: s.projectLocation ?? "",
    read: s.isRead ? "yes" : "no",
  }));

  console.table(table);

  if (submissions.length > 0 && submissions.some((s) => s.message)) {
    console.log("\n--- Messages ---\n");
    for (const s of submissions) {
      if (s.message) {
        console.log(`#${s.id} ${s.name}: ${s.message}\n`);
      }
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
