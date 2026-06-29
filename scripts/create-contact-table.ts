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
      describes_you VARCHAR(255),
      email VARCHAR(255) NOT NULL,
      full_name VARCHAR(255) NOT NULL,
      linkedin TEXT,
      phone VARCHAR(50),
      referred_by VARCHAR(255),
      investment_range VARCHAR(100),
      industry TEXT,
      service VARCHAR(255),
      financing_participation VARCHAR(255),
      lending_affiliation VARCHAR(255),
      synced_to_sheet BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;
  console.log("Table contact_submissions is ready.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
