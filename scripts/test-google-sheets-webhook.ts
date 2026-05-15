/**
 * POST a test row to the Google Apps Script webhook using GOOGLE_SHEETS_* from .env.local.
 * Run: npm run test:sheets
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvLocal() {
  const path = resolve(process.cwd(), ".env.local");
  if (!existsSync(path)) {
    console.error("Missing .env.local — copy from .env.example and set GOOGLE_SHEETS_* vars.");
    process.exit(1);
  }
  const raw = readFileSync(path, "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) {
      process.env[key] = val;
    }
  }
}

async function main() {
  loadEnvLocal();
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim().replace(/\/+$/, "");
  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET?.trim();
  if (!url || !secret) {
    console.error("Set GOOGLE_SHEETS_WEBHOOK_URL and GOOGLE_SHEETS_WEBHOOK_SECRET in .env.local");
    process.exit(1);
  }

  const row = {
    submittedAt: new Date().toISOString(),
    sourcePage: "/scripts/test-google-sheets-webhook",
    name: "Sheets webhook test",
    email: "test@example.com",
    phone: "555-0199",
    projectType: "ADU",
    budgetRange: "$500K-$1M",
    timeline: "ASAP",
    drawingsStatus: "Just exploring ideas",
    projectLocation: "Other",
    message: "npm run test:sheets — safe to delete this row.",
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ secret, row }),
    redirect: "follow",
    cache: "no-store",
  });

  const text = await res.text();
  console.log("HTTP", res.status);
  console.log(text.slice(0, 2000));

  if (!res.ok) {
    process.exit(1);
  }

  try {
    const json = JSON.parse(text) as { ok?: boolean; error?: string };
    if (json.ok === false) {
      console.error("Script returned ok:false —", json.error);
      process.exit(1);
    }
  } catch {
    // tolerate empty / non-JSON
  }

  console.log("\nIf HTTP 200 and ok is not false, check the Sheet for a new row on the Responses tab.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
