import { z } from "zod";

export const aiResponseSchema = z.object({
  companyOverview: z.string(),

  coreServices: z.array(z.string()),

  targetAudience: z.string(),

  b2bQualification: z.boolean(),

  qualificationReason: z.string(),

  salesQuestions: z
    .array(z.string())
    .length(3)
});