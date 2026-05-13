import groq from "../config/groq.js";

import { SALES_ANALYSIS_PROMPT } from "../utils/prompts.js";

import { aiResponseSchema } from "../validators/aiResponse.validator.js";

import { logger } from "../utils/logger.js";

const MAX_RETRIES = 2;

export const analyzeLeadWithAI = async (
  content
) => {
  let attempt = 0;

  while (attempt <= MAX_RETRIES) {
    try {
      const prompt =
        SALES_ANALYSIS_PROMPT(content);

      // GROQ AI CALL
      const response =
        await groq.chat.completions.create({
          model: "llama-3.3-70b-versatile",

          messages: [
            {
              role: "user",
              content: prompt
            }
          ],

          temperature: 0.2
        });

      const rawContent =
        response.choices[0].message.content;

      const cleanedResponse =
        rawContent
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

      const parsedData = JSON.parse(
        cleanedResponse
      );

      const validatedData =
        aiResponseSchema.parse(parsedData);

      return {
        success: true,
        data: validatedData
      };
    } catch (error) {
      logger.warn(
        `AI Attempt ${attempt + 1} Failed`,
        error.message
      );

      attempt++;

      if (attempt > MAX_RETRIES) {
        return {
          success: false,
          error:
            "AI response validation failed"
        };
      }
    }
  }
};


