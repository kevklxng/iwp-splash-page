# Google Sheet + Apps Script for contact form

1. Create a Google Sheet with a tab named **`Responses`** (or change `TAB_NAME` below).
2. Add a header row in row 1 (optional but recommended):

   `submittedAt | sourcePage | name | email | phone | projectType | budgetRange | timeline | drawingsStatus | projectLocation | message`

3. In the Sheet: **Extensions → Apps Script**. Paste and adjust `TAB_NAME` / `SECRET` to match `GOOGLE_SHEETS_WEBHOOK_SECRET` in your site env.

```javascript
const TAB_NAME = "Responses";
const SECRET = "paste-the-same-secret-as-GOOGLE_SHEETS_WEBHOOK_SECRET";

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

4. **Deploy → New deployment → Web app**: Execute as **Me**, Who has access **Anyone** (anonymous POST from the server).
5. Copy the **Web app URL** (ends in `/exec`) into `GOOGLE_SHEETS_WEBHOOK_URL` in `.env.local` / hosting.

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
