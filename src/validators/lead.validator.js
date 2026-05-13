import { z } from "zod";

export const analyzeLeadSchema = z.object({
  lead: z
    .string()
    .min(3, "Lead input too short")
    .max(500, "Lead input too long")
});

export const bulkLeadSchema = z.object({
  leads: z
    .array(z.string().min(3))
    .min(1)
    .max(50)
});