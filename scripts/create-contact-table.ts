/**
 * Creates `contact_submissions` for Vercel Postgres.
 * Run: npx tsx --env-file=.env.local scripts/create-contact-table.ts
 */
import { sql } from "@vercel/postgres";

if (!process.env.POSTGRES_URL) {
  console.error("POSTGRES_URL is not set. Link a Postgres database in Vercel or add POSTGRES_URL to .env.local.");
  process.exit(1);
}

async function main() {
  await sql`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      source_page VARCHAR(255),
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      project_type VARCHAR(100),
      budget_range VARCHAR(100),
      timeline VARCHAR(100),
      drawings_status VARCHAR(100),
      project_location VARCHAR(255),
      message TEXT,
      is_read BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;
  console.log("Table contact_submissions is ready.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
