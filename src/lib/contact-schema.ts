import { z } from "zod";

/** Standard spellings for Orange County coastal areas */
export const PROJECT_LOCATIONS = [
  "Newport Beach",
  "Newport Coast",
  "Corona del Mar",
  "Costa Mesa",
  "Laguna Beach",
  "San Clemente",
  "Other",
] as const;

/** Coerce empty strings (from unselected `<select>`) to undefined so required_error fires. */
const emptyToUndefined = z.preprocess((v) => (v === "" ? undefined : v), z.any());

function enumField<T extends readonly [string, ...string[]]>(values: T, message: string) {
  return emptyToUndefined.pipe(z.enum(values, { required_error: message, invalid_type_error: message }));
}

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone is required"),
  projectType: enumField(
    ["Full Custom Build", "Remodel / Addition to Home", "Investment Property", "ADU"],
    "Please select a project type.",
  ),
  budgetRange: enumField(
    ["$500K-$1M", "$1M-$3M", "$3M-$7M", "$7M-$15M", "$15M+"],
    "Please select a budget range.",
  ),
  timeline: enumField(
    ["ASAP", "1–3 months", "3–6 months", "6–12 months", "12+ months"],
    "Please select a timeline.",
  ),
  drawingsStatus: enumField(
    ["Just exploring ideas", "Planning or early design", "Plans in progress", "Plans complete / Permits pending", "Permits approved / Ready to Build"],
    "Please select where you are in the process.",
  ),
  projectLocation: enumField([...PROJECT_LOCATIONS], "Please select a project location."),
  message: z.string().optional(),
  company: z.string().optional(),
  sourcePage: z.string().max(500).optional(),
});

export type ContactSchema = z.infer<typeof contactSchema>;
