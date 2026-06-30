/**
 * Google Apps Script for the IWP contact form → Google Sheets webhook.
 * Paste into Extensions → Apps Script on your Sheet, then redeploy the web app.
 * See docs/splash-apps-script.md for setup and column order.
 */
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
