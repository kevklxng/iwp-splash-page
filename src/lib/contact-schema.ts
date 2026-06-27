import { z } from "zod";

export const DESCRIBES_YOU_OPTIONS = [
  "Investor",
  "Lender",
  "Service Provider",
  "Other",
] as const;

export const INVESTMENT_RANGE_OPTIONS = [
  "Under $100K",
  "$100K – $500K",
  "$500K – $1M",
  "$1M – $5M",
  "$5M – $10M",
  "$10M+",
] as const;

export const INDUSTRY_OPTIONS = [
  "Entertainment",
  "Film & Television",
  "Music",
  "Gaming",
  "Sports",
  "Technology",
  "Real Estate",
  "Other",
] as const;

export const FINANCING_PARTICIPATION_OPTIONS = [
  "Direct Investment",
  "Fund Investment",
  "Lending",
  "Advisory",
  "Other",
] as const;

export const LENDING_AFFILIATION_OPTIONS = [
  "Yes",
  "No",
] as const;

const emptyToUndefined = z.preprocess((v) => (v === "" ? undefined : v), z.any());

function enumField<T extends readonly [string, ...string[]]>(values: T, message: string) {
  return emptyToUndefined.pipe(z.enum(values, { required_error: message, invalid_type_error: message }));
}

export const contactSchema = z.object({
  describesYou: enumField(
    [...DESCRIBES_YOU_OPTIONS],
    "Please select which best describes you.",
  ),
  email: z.string().email("Valid email is required"),
  fullName: z.string().min(1, "Full name is required"),
  linkedIn: z.string().min(1, "LinkedIn URL is required"),
  phone: z.string().min(1, "Phone is required"),
  referredBy: z.string().min(1, "Please let us know who referred you"),
  investmentRange: enumField(
    [...INVESTMENT_RANGE_OPTIONS],
    "Please select an investment range.",
  ),
  industry: enumField(
    [...INDUSTRY_OPTIONS],
    "Please select an industry.",
  ),
  service: z.string().min(1, "Please describe your service"),
  financingParticipation: enumField(
    [...FINANCING_PARTICIPATION_OPTIONS],
    "Please select how you participate.",
  ),
  lendingAffiliation: enumField(
    [...LENDING_AFFILIATION_OPTIONS],
    "Please select an option.",
  ),
  company: z.string().optional(),
  sourcePage: z.string().max(500).optional(),
});

export type ContactSchema = z.infer<typeof contactSchema>;
