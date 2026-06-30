# Google Sheet + Apps Script for contact form

## How sync works

Every form submission is saved to **Postgres** (source of truth) and then pushed to Google Sheets in real time via a fire-and-forget webhook. If the real-time push fails, the row stays unsynced and is picked up by one of two safety nets:

- **Vercel Cron** — runs daily at 6 AM UTC (`/api/cron/sync-sheets`).
- **Manual CLI** — `npm run sync:sheet` pushes all unsynced rows on demand.

The webhook payload matches the **IWP Learn More form** fields in [`src/lib/contact-schema.ts`](../src/lib/contact-schema.ts). Role-specific fields are left blank when not collected (e.g. Storyteller submissions have no phone).

## Sheet setup

1. Create a Google Sheet with a tab named **`Responses`** (or change `TAB_NAME` below).
2. Add a header row in row 1 (column order must match the script):

   `submissionId | submittedAt | sourcePage | describesYou | email | fullName | linkedIn | phone | referredBy | investmentRange | financingParticipation | lendingAffiliation | industry | service`

3. In the Sheet: **Extensions → Apps Script**. Paste the script from [`scripts/google-apps-script.gs`](../scripts/google-apps-script.gs) (or below) and set `SECRET` to match `GOOGLE_SHEETS_WEBHOOK_SECRET` in your site env.

```javascript
const TAB_NAME = "Responses";
const SECRET = "paste-the-same-secret-as-GOOGLE_SHEETS_WEBHOOK_SECRET";
const NOTIFY_EMAIL = "Waynne@iwp.fund";

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, hint: "POST JSON { secret, row } from your site to append a row." }),
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  if (!e.postData || !e.postData.contents) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: "no body" }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
  var body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: "invalid json" }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
  if (body.secret !== SECRET) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: "unauthorized" }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
  var r = body.row || {};
  var sheet = SpreadsheetApp.getActive().getSheetByName(TAB_NAME);
  if (!sheet) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: "missing tab" }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
  sheet.appendRow([
    r.submissionId || "",
    r.submittedAt || "",
    r.sourcePage || "",
    r.describesYou || "",
    r.email || "",
    r.fullName || "",
    r.linkedIn || "",
    r.phone || "",
    r.referredBy || "",
    r.investmentRange || "",
    r.financingParticipation || "",
    r.lendingAffiliation || "",
    r.industry || "",
    r.service || "",
  ]);

  try {
    sendNotification(r);
  } catch (mailErr) {
    Logger.log("Mail error: " + mailErr.message);
  }

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true }),
  ).setMimeType(ContentService.MimeType.JSON);
}

function sendNotification(r) {
  var submitted = r.submittedAt || "";
  try {
    submitted = Utilities.formatDate(
      new Date(r.submittedAt), "America/Los_Angeles",
      "MMM d, yyyy 'at' h:mm a"
    );
  } catch (err) { /* leave raw if it won't parse */ }

  var subject = "New IWP Inquiry: " + (r.fullName || "Unknown") +
    (r.describesYou ? " — " + r.describesYou : "");

  var body =
    "New submission from the IWP website.\n\n" +
    "Describes You:           " + (r.describesYou || "") + "\n" +
    "Full Name:               " + (r.fullName || "") + "\n" +
    "Email:                   " + (r.email || "") + "\n" +
    "LinkedIn:                " + (r.linkedIn || "") + "\n" +
    "Phone:                   " + (r.phone || "") + "\n" +
    "Referred By:             " + (r.referredBy || "") + "\n" +
    "Investment Range:        " + (r.investmentRange || "") + "\n" +
    "Financing Participation: " + (r.financingParticipation || "") + "\n" +
    "Lending Affiliation:     " + (r.lendingAffiliation || "") + "\n" +
    "Industry:                " + (r.industry || "") + "\n" +
    "Service:                 " + (r.service || "") + "\n" +
    "Source Page:             " + (r.sourcePage || "") + "\n" +
    "Submitted:               " + submitted + "\n\n" +
    "Submission ID:           " + (r.submissionId || "");

  var htmlBody =
    '<div style="font-family:Arial,sans-serif;font-size:14px;color:#222;max-width:600px">' +
      '<h2 style="margin:0 0 4px">New IWP Inquiry</h2>' +
      '<p style="color:#666;margin:0 0 16px">From the IWP website contact form</p>' +
      '<table style="border-collapse:collapse;width:100%">' +
        htmlRow_("Describes You", r.describesYou) +
        htmlRow_("Full Name", r.fullName) +
        htmlRow_("Email", r.email ? '<a href="mailto:' + r.email + '">' + r.email + '</a>' : "") +
        htmlRow_("LinkedIn", r.linkedIn ? '<a href="' + r.linkedIn + '">' + r.linkedIn + '</a>' : "") +
        htmlRow_("Phone", r.phone) +
        htmlRow_("Referred By", r.referredBy) +
        htmlRow_("Investment Range", r.investmentRange) +
        htmlRow_("Financing Participation", r.financingParticipation) +
        htmlRow_("Lending Affiliation", r.lendingAffiliation) +
        htmlRow_("Industry", r.industry) +
        htmlRow_("Service", r.service) +
        htmlRow_("Source Page", r.sourcePage) +
        htmlRow_("Submitted", submitted) +
      '</table>' +
      '<p style="color:#999;font-size:12px;margin-top:16px">Submission ID: ' + (r.submissionId || "") + '</p>' +
    '</div>';

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: subject,
    body: body,
    htmlBody: htmlBody
  });
}

function htmlRow_(label, value) {
  if (value === undefined || value === null || value === "") value = "—";
  return '<tr>' +
    '<td style="padding:6px 12px 6px 0;color:#666;vertical-align:top;white-space:nowrap"><strong>' + label + '</strong></td>' +
    '<td style="padding:6px 0;border-bottom:1px solid #eee">' + value + '</td>' +
    '</tr>';
}
```

4. **Deploy → New deployment → Web app**:
   - **Execute as:** your account (**Me**).
   - **Who has access:** **Anyone** (not "Anyone within your organization"). Your Next.js server sends an anonymous POST; anything stricter returns **401** or an HTML error page before `doPost` runs.
5. Copy the **Web app URL** (must end in **`/exec`**) into `GOOGLE_SHEETS_WEBHOOK_URL` in `.env.local` and in Vercel. After any script change, use **Deploy → Manage deployments → Edit (pencil) → New version → Deploy** so the URL keeps working.
6. **Sanity check:** Paste the same URL in a **private/incognito** window. You should see JSON from `doGet`. If you see a Google sign-in page or "Page Not Found", the deployment URL or access setting is wrong — fix deployment, then update the env URL.

### Field reference (by role)

| Column | Always | Financier | Storyteller | Service Provider |
|--------|--------|-----------|-------------|------------------|
| describesYou | ✓ | ✓ | ✓ | ✓ |
| email, fullName, linkedIn, referredBy | ✓ | ✓ | ✓ | ✓ |
| phone | | ✓ | | ✓ |
| investmentRange, financingParticipation, lendingAffiliation | | ✓ | | |
| industry (comma-separated if multiple) | | | | ✓ |
| service | | | | ✓ |

### Troubleshooting

| Symptom | What to do |
|--------|------------|
| **401** or HTML error (not your JSON `{"ok":false,...}`) | Redeploy the web app; set **Who has access** to **Anyone**; copy the **new** `/exec` URL from that deployment into `GOOGLE_SHEETS_WEBHOOK_URL`. |
| URL does not end in **`/exec`** | Use the **Web app** deployment URL from **Deploy → Manage deployments**, not the script editor URL. |
| `{"ok":false,"error":"unauthorized"}` in logs | `SECRET` in the script does not match `GOOGLE_SHEETS_WEBHOOK_SECRET` in env (typo, trailing space, or wrong deployment). |
| `{"ok":false,"error":"missing tab"}` | Sheet tab name ≠ `TAB_NAME` (default **Responses**). |
| Data in wrong columns | Header row or `appendRow` order does not match this doc — update both together. |
| **Google Workspace** and 401 persists | Your admin may block **anonymous** web apps. Ask IT to allow it, or deploy from a consumer Google account's Sheet, or use org-only access only if your server can authenticate to Google (this repo expects **Anyone** on the internet). |

## Testing

From the repo root, after `.env.local` is set:

```bash
npm run test:sheets
```

## Environment variables

| Variable | Purpose |
|----------|---------|
| `GOOGLE_SHEETS_WEBHOOK_URL` | Apps Script `/exec` URL |
| `GOOGLE_SHEETS_WEBHOOK_SECRET` | Shared secret between your app and the Apps Script |
| `CRON_SECRET` | Vercel automatically injects this for cron route auth. Set it in Vercel project settings under Environment Variables. |

## Payload format

Sent by [`src/app/api/contact/route.ts`](../src/app/api/contact/route.ts) and [`src/app/api/cron/sync-sheets/route.ts`](../src/app/api/cron/sync-sheets/route.ts):

```json
{
  "secret": "<GOOGLE_SHEETS_WEBHOOK_SECRET>",
  "row": {
    "submissionId": "42",
    "submittedAt": "2026-06-28T12:00:00.000Z",
    "sourcePage": "/",
    "describesYou": "I am a Financier",
    "email": "user@example.com",
    "fullName": "Jane Doe",
    "linkedIn": "https://linkedin.com/in/janedoe",
    "phone": "555-0100",
    "referredBy": "Colleague",
    "investmentRange": "$1M – $5M",
    "financingParticipation": "Direct Investment",
    "lendingAffiliation": "No",
    "industry": "Entertainment, Music",
    "service": "Legal counsel"
  }
}
```

Omitted or empty fields are stored as blank cells. `industry` is a comma-separated string when multiple options are selected.
