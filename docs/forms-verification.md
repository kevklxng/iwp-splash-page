# Contact form: verification and operations

This site posts inquiries to [`src/app/api/contact/route.ts`](../src/app/api/contact/route.ts), which can:

1. **Email** — [Resend](https://resend.com) → `CONTACT_TO_EMAIL`
2. **Spreadsheet** — Google Apps Script webhook → row on your Sheet ([setup](splash-apps-script.md))
3. **CMS** — Sanity `formSubmission` document (requires `SANITY_API_WRITE_TOKEN` and valid Sanity project env)

Vercel does **not** store form data; these integrations do.

---

## 1. Resend (email notification)

1. In [Resend → Domains](https://resend.com/domains), verify **`iwp.fund`** (or whichever domain you use in `CONTACT_FROM_EMAIL`).
2. Ensure `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` are set locally (`.env.local`) and on Vercel (Preview + Production).
3. **Smoke test (local)** — with `npm run dev`, submit the contact form or run:

   ```bash
   curl -sS -X POST http://localhost:3000/api/contact \
     -H "Content-Type: application/json" \
     -d '{"describesYou":"I am a Storyteller","email":"you@example.com","fullName":"Test User","linkedIn":"https://linkedin.com/in/test","referredBy":"Friend","sourcePage":"/"}'
   ```

   Expect `{"ok":true}` (and optional `warnings` if another channel failed). Check the inbox for `CONTACT_TO_EMAIL`.

4. If Resend returns a domain error, fix DNS / domain verification in Resend before retesting.

---

## 2. Google Sheets (row per submission)

1. Confirm the Sheet has the tab name expected by your Apps Script (default **`Responses`**).
2. In Apps Script, **Deploy → Manage deployments** — the web app must allow **Anyone** (anonymous) POSTs from the server, per [splash-apps-script.md](splash-apps-script.md).
3. `GOOGLE_SHEETS_WEBHOOK_URL` must be the **`/exec`** deployment URL. `GOOGLE_SHEETS_WEBHOOK_SECRET` must match the `SECRET` constant in the script.
4. **401 / HTML “Page Not Found”** from Google usually means: wrong URL, revoked deployment, or access not set to **Anyone**. Create a **New deployment** (version), redeploy, and update the URL in env vars.
5. After a test submission, confirm a new row appears in the Sheet.

**Note:** The API treats email and Sheets as separate steps. If Sheets fails but email succeeds, the user still sees success and you get a `warnings` array in the JSON response for debugging.

---

## 3. Vercel environment variables

In the Vercel project: **Settings → Environment Variables**, ensure **Preview** and **Production** include at least:

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Send notification email |
| `CONTACT_TO_EMAIL` | Recipient |
| `CONTACT_FROM_EMAIL` | Sender (domain must be verified in Resend) |
| `GOOGLE_SHEETS_WEBHOOK_URL` | Apps Script web app URL |
| `GOOGLE_SHEETS_WEBHOOK_SECRET` | Shared secret with the script |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Site + Studio |
| `NEXT_PUBLIC_SANITY_DATASET` | e.g. `production` |
| `SANITY_API_WRITE_TOKEN` | Optional; enables `formSubmission` documents in Sanity |
| `NEXT_PUBLIC_SPLASH_MODE` | Optional splash / route lockdown |

CLI (if logged in): `npx vercel env ls`

**Cleanup:** If you see an environment variable whose **name** looks like a long JWT string, that was likely created by mistake (e.g. pasting a token into the name field). **Remove it** in the Vercel UI — it is not used by the app and clutters the project.

After changing env vars, **redeploy** (or trigger a new deployment) so serverless functions pick up new values.

---

## 4. Sanity Studio (`formSubmission`)

If `SANITY_API_WRITE_TOKEN` is set and the token has **create** access to the dataset, submissions are stored as `formSubmission` documents. View them in **Sanity Studio** (`/studio` on the site, or embedded tool).

---

## 5. Quick checklist

- [ ] Resend domain verified; test email received
- [ ] Sheet receives a row on test submit; Apps Script deployed as web app (Anyone)
- [ ] Vercel env vars match `.env.example` / production needs; bogus JWT-named env removed
- [ ] (Optional) New `formSubmission` appears in Studio after submit
