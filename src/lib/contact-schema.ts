import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone is required"),
  projectType: z.enum(["Full Custom Build", "Remodel / Addition to Home", "Investment Property", "ADU"]),
  budgetRange: z.enum(["$500K-$1M", "$1M-$3M", "$3M-$7M", "$7M-$15M", "$15M+"]),
  timeline: z.enum(["ASAP", "1–3 months", "3–6 months", "6–12 months", "12+ months"]),
  drawingsStatus: z.enum(["Just exploring ideas", "Planning or early design", "Plans in progress", "Plans complete / Permits pending", "Permits approved / Ready to Build"]),
  projectLocation: z.string().min(1, "Project location is required"),
  message: z.string().optional(),
  company: z.string().optional(),
  sourcePage: z.string().max(500).optional(),
});

export type ContactSchema = z.infer<typeof contactSchema>;
