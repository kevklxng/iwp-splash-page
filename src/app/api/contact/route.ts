import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { hasSanity } from "../../../sanity/env";
import { sanityClient } from "../../../sanity/client";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form fields." }, { status: 400 });
  }

  const data = parsed.data;

  if (data.company && data.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (resend && process.env.CONTACT_TO_EMAIL) {
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "TCH Website <no-reply@templetoncustomhomes.com>",
      to: process.env.CONTACT_TO_EMAIL,
      subject: `New project inquiry: ${data.name}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Project type: ${data.projectType}`,
        `Budget range: ${data.budgetRange}`,
        `Timeline: ${data.timeline}`,
        `Drawings status: ${data.drawingsStatus}`,
        `Project location: ${data.projectLocation}`,
        `Message: ${data.message || "(none)"}`,
      ].join("\n"),
    });
  }

  if (hasSanity && process.env.SANITY_API_WRITE_TOKEN) {
    await sanityClient.withConfig({ token: process.env.SANITY_API_WRITE_TOKEN, useCdn: false }).create({
      _type: "formSubmission",
      ...data,
      sourcePage: "/contact",
      submittedAt: new Date().toISOString(),
    });
  }

  return NextResponse.json({ ok: true });
}
