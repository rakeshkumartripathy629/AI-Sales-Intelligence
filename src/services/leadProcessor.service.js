import Lead from "../models/Lead.js";

import { scrapeWebsite } from "./scraper.service.js";

import { analyzeLeadWithAI } from "./aiAnalysis.service.js";

import { cleanScrapedContent } from "./contentCleaner.service.js";

import { extractWebsite } from "../utils/extractDomain.js";

import { logger } from "../utils/logger.js";

export const processLead = async (
  leadInput
) => {
  try {
    // Extract Website
    const website =
      extractWebsite(leadInput);

    // Validate Website
    if (!website) {
      return {
        success: false,
        error:
          "No valid website found in input"
      };
    }

    logger.info(
      `Processing lead: ${website}`
    );

    // Create Initial Lead Record
    const lead = await Lead.create({
      input: leadInput,
      website,
      status: "processing"
    });

    // SCRAPE WEBSITE
    const scrapeResult =
      await scrapeWebsite(website);

    // Handle Scraping Failure
    if (!scrapeResult.success) {
      lead.status = "failed";

      lead.error = scrapeResult.error;

      await lead.save();

      return {
        success: false,
        error: scrapeResult.error
      };
    }

    // CLEAN CONTENT
    const cleanedContent =
      cleanScrapedContent(
        scrapeResult.content
      );

    // Save Scraped Data
    lead.scrapedContent =
      cleanedContent;

    lead.pagesScraped =
      scrapeResult.pagesScraped;

    // AI ANALYSIS
    const aiResult =
      await analyzeLeadWithAI(
        cleanedContent
      );

    // Handle AI Failure
    if (!aiResult.success) {
      lead.status = "failed";

      lead.error = aiResult.error;

      await lead.save();

      return {
        success: false,
        error: aiResult.error
      };
    }

    // SAVE AI INSIGHTS
    lead.companyOverview =
      aiResult.data.companyOverview;

    lead.coreServices =
      aiResult.data.coreServices;

    lead.targetAudience =
      aiResult.data.targetAudience;

    lead.b2bQualification =
      aiResult.data.b2bQualification;

    lead.qualificationReason =
      aiResult.data.qualificationReason;

    lead.salesQuestions =
      aiResult.data.salesQuestions;

    // Final Status
    lead.status = "completed";

    // Save Final Lead
    await lead.save();

    logger.info(
      `Lead processed successfully: ${website}`
    );

    return {
      success: true,
      data: lead
    };
  } catch (error) {
    logger.error(
      "PROCESS LEAD ERROR",
      error.message
    );

    return {
      success: false,
      error: error.message
    };
  }
};


