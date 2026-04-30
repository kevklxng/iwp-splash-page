import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone is required"),
  projectType: z.enum(["New Custom Build", "Remodel", "Addition", "ADU", "Not sure yet"]),
  budgetRange: z.enum(["$500K-$1M", "$1M-$3M", "$3M-$7M", "$7M-$15M", "$15M+"]),
  timeline: z.enum(["Ready to start in 1-3 months", "3-6 months", "6-12 months", "Just exploring"]),
  drawingsStatus: z.enum(["Submitted to city", "In progress with architect", "Haven't started", "Not sure"]),
  projectLocation: z.string().min(1, "Project location is required"),
  message: z.string().optional(),
  company: z.string().optional(),
});

export type ContactSchema = z.infer<typeof contactSchema>;
