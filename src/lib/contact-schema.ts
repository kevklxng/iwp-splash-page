import { z } from "zod";

export const DESCRIBES_YOU_OPTIONS = [
  "I am a Financier",
  "I am a Storyteller",
  "I am a Service Provider",
] as const;

export type DescribesYouOption = (typeof DESCRIBES_YOU_OPTIONS)[number];

export type ConditionalField =
  | "phone"
  | "investmentRange"
  | "industry"
  | "service"
  | "financingParticipation"
  | "lendingAffiliation";

export const ROLE_FIELDS = {
  "I am a Financier": ["phone", "investmentRange", "financingParticipation", "lendingAffiliation"],
  "I am a Storyteller": [],
  "I am a Service Provider": ["phone", "industry", "service"],
} as const satisfies Record<DescribesYouOption, readonly ConditionalField[]>;

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

export const LENDING_AFFILIATION_OPTIONS = ["Yes", "No"] as const;

const emptyToUndefined = z.preprocess((v) => (v === "" ? undefined : v), z.any());

function enumField<T extends readonly [string, ...string[]]>(values: T, message: string) {
  return emptyToUndefined.pipe(z.enum(values, { required_error: message, invalid_type_error: message }));
}

function optionalEnumField<T extends readonly [string, ...string[]]>(values: T, message: string) {
  return emptyToUndefined.pipe(z.enum(values, { invalid_type_error: message }).optional());
}

const ROLE_FIELD_MESSAGES: Record<ConditionalField, string> = {
  phone: "Phone is required",
  investmentRange: "Please select an investment range.",
  industry: "Please select an industry.",
  service: "Please describe your service",
  financingParticipation: "Please select how you participate.",
  lendingAffiliation: "Please select an option.",
};

const ALL_CONDITIONAL_FIELDS: readonly ConditionalField[] = [
  "phone",
  "investmentRange",
  "industry",
  "service",
  "financingParticipation",
  "lendingAffiliation",
];

const contactSchemaBase = z.object({
  describesYou: enumField(
    [...DESCRIBES_YOU_OPTIONS],
    "Please select which best describes you.",
  ),
  email: z.string().optional(),
  fullName: z.string().optional(),
  linkedIn: z.string().optional(),
  phone: z.string().optional(),
  referredBy: z.string().optional(),
  investmentRange: optionalEnumField(
    [...INVESTMENT_RANGE_OPTIONS],
    "Please select an investment range.",
  ),
  industry: optionalEnumField([...INDUSTRY_OPTIONS], "Please select an industry."),
  service: z.string().optional(),
  financingParticipation: optionalEnumField(
    [...FINANCING_PARTICIPATION_OPTIONS],
    "Please select how you participate.",
  ),
  lendingAffiliation: optionalEnumField(
    [...LENDING_AFFILIATION_OPTIONS],
    "Please select an option.",
  ),
  company: z.string().optional(),
  sourcePage: z.string().max(500).optional(),
});

export const contactSchema = contactSchemaBase.superRefine((data, ctx) => {
  if (!data.describesYou) return;

  if (!data.email?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Valid email is required",
      path: ["email"],
    });
  } else if (!z.string().email().safeParse(data.email).success) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Valid email is required",
      path: ["email"],
    });
  }

  if (!data.fullName?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Full name is required",
      path: ["fullName"],
    });
  }

  if (!data.linkedIn?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "LinkedIn URL is required",
      path: ["linkedIn"],
    });
  }

  if (!data.referredBy?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please let us know who referred you",
      path: ["referredBy"],
    });
  }

  const requiredFields = ROLE_FIELDS[data.describesYou as DescribesYouOption] ?? [];

  for (const field of requiredFields) {
    const value = data[field];
    if (value === undefined || value === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: ROLE_FIELD_MESSAGES[field],
        path: [field],
      });
    }
  }
});

export type ContactSchema = z.infer<typeof contactSchema>;

export function getFieldsForRole(role: DescribesYouOption | undefined): readonly ConditionalField[] {
  if (!role) return [];
  return ROLE_FIELDS[role];
}

export function getHiddenFieldsForRole(role: DescribesYouOption | undefined): readonly ConditionalField[] {
  if (!role) return [...ALL_CONDITIONAL_FIELDS];
  const active = new Set<ConditionalField>(ROLE_FIELDS[role]);
  return ALL_CONDITIONAL_FIELDS.filter((field) => !active.has(field));
}
