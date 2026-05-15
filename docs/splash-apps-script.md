# Google Sheet + Apps Script for contact form

1. Create a Google Sheet with a tab named **`Responses`** (or change `TAB_NAME` below).
2. Add a header row in row 1 (optional but recommended):

   `submittedAt | sourcePage | name | email | phone | projectType | budgetRange | timeline | drawingsStatus | projectLocation | message`

3. In the Sheet: **Extensions → Apps Script**. Paste and adjust `TAB_NAME` / `SECRET` to match `GOOGLE_SHEETS_WEBHOOK_SECRET` in your site env.

```javascript
const TAB_NAME = "Responses";
const SECRET = "paste-the-same-secret-as-GOOGLE_SHEETS_WEBHOOK_SECRET";

/** Optional: open the web app URL in a browser — you should see JSON (proves deployment is reachable). */
function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, hint: "POST JSON { secret, row } from your site to append a row." }),
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  if (!e.postData || !e.postData.contents) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "no body" })).setMimeType(
      ContentService.MimeType.JSON
    );
  }
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "invalid json" })).setMimeType(
      ContentService.MimeType.JSON
    );
  }
  if (body.secret !== SECRET) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "unauthorized" })).setMimeType(
      ContentService.MimeType.JSON
    );
  }
  const r = body.row || {};
  const sheet = SpreadsheetApp.getActive().getSheetByName(TAB_NAME);
  if (!sheet) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "missing tab" })).setMimeType(
      ContentService.MimeType.JSON
    );
  }
  sheet.appendRow([
    r.submittedAt || "",
    r.sourcePage || "",
    r.name || "",
    r.email || "",
    r.phone || "",
    r.projectType || "",
    r.budgetRange || "",
    r.timeline || "",
    r.drawingsStatus || "",
    r.projectLocation || "",
    r.message || "",
  ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
```

4. **Deploy → New deployment → Web app**:
   - **Execute as:** your account (**Me**).
   - **Who has access:** **Anyone** (not “Anyone within your organization”). Your Next.js server sends an anonymous POST; anything stricter returns **401** or an HTML error page before `doPost` runs.
5. Copy the **Web app URL** (must end in **`/exec`**) into `GOOGLE_SHEETS_WEBHOOK_URL` in `.env.local` and in Vercel. After any script change, use **Deploy → Manage deployments → Edit (pencil) → New version → Deploy** so the URL keeps working.
6. **Sanity check:** Paste the same URL in a **private/incognito** window. You should see JSON from `doGet`. If you see a Google sign-in page or “Page Not Found”, the deployment URL or access setting is wrong — fix deployment, then update the env URL.

### If you still see HTTP 401 or HTML “Page Not Found”

| Symptom | What to do |
|--------|------------|
| **401** or HTML error (not your JSON `{"ok":false,...}`) | Redeploy the web app; set **Who has access** to **Anyone**; copy the **new** `/exec` URL from that deployment into `GOOGLE_SHEETS_WEBHOOK_URL`. |
| URL does not end in **`/exec`** | Use the **Web app** deployment URL from **Deploy → Manage deployments**, not the script editor URL. |
| `{"ok":false,"error":"unauthorized"}` in logs | `SECRET` in the script does not match `GOOGLE_SHEETS_WEBHOOK_SECRET` in env (typo, trailing space, or wrong deployment). |
| `{"ok":false,"error":"missing tab"}` | Sheet tab name ≠ `TAB_NAME` (default **Responses**). |
| **Google Workspace** and 401 persists | Your admin may block **anonymous** web apps. Ask IT to allow it, or deploy from a consumer Google account’s Sheet, or use org-only access only if your server can authenticate to Google (this repo expects **Anyone** on the internet). |

From the repo root, after `.env.local` is set, you can POST a test row:

`npm run test:sheets`

The Next.js route sends:

```json
{
  "secret": "<GOOGLE_SHEETS_WEBHOOK_SECRET>",
  "row": {
    "submittedAt": "ISO date",
    "sourcePage": "/",
    "name": "...",
    "email": "...",
    ...
  }
}
```
