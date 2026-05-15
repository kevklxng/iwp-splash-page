/**
 * Shared Google Sheets webhook helper.
 * Posts a row to a Google Apps Script Web App that appends it to a Sheet.
 * Throws on failure — callers decide whether to swallow or propagate.
 */

const TIMEOUT_MS = 15_000;

export type SheetRow = Record<string, string | number | undefined>;

export function isSheetsConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_SHEETS_WEBHOOK_URL && process.env.GOOGLE_SHEETS_WEBHOOK_SECRET,
  );
}

export async function postRowToSheet(row: SheetRow): Promise<void> {
  const rawUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;

  if (!rawUrl) {
    throw new Error("GOOGLE_SHEETS_WEBHOOK_URL is not set.");
  }
  if (!secret) {
    throw new Error("GOOGLE_SHEETS_WEBHOOK_SECRET is not set.");
  }

  const url = rawUrl.trim().replace(/\/+$/, "");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ secret, row }),
      redirect: "follow",
      signal: controller.signal,
      cache: "no-store",
    });

    const text = await response.text().catch(() => "");

    if (!response.ok) {
      const snippet = text.replace(/\s+/g, " ").slice(0, 400);
      throw new Error(`HTTP ${response.status}: ${snippet}`);
    }

    const trimmed = text.trim();
    if (!trimmed) return;

    try {
      const parsed = JSON.parse(trimmed) as { ok?: boolean; error?: string };
      if (parsed?.ok === false) {
        throw new Error(parsed.error ?? "unknown rejection from Apps Script");
      }
    } catch (err) {
      if (err instanceof SyntaxError) return;
      throw err;
    }
  } finally {
    clearTimeout(timer);
  }
}
