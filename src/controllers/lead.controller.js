import Lead from "../models/Lead.js";

import { processLead } from "../services/leadProcessor.service.js";

import asyncHandler from "../utils/asyncHandler.js";

export const analyzeLead = asyncHandler(
  async (req, res) => {
    const { lead } = req.body;

    const result = await processLead(lead);

    if (!result.success) {
      return res.status(500).json(result);
    }

    res.status(200).json(result);
  }
);

export const analyzeBulkLeads =
  asyncHandler(async (req, res) => {
    const { leads } = req.body;

    const results = [];

    for (const lead of leads) {
      const result = await processLead(lead);

      results.push({
        input: lead,
        ...result
      });
    }

    res.status(200).json({
      success: true,
      total: results.length,
      data: results
    });
  });

export const getAllLeads = asyncHandler(
  async (req, res) => {
    const leads = await Lead.find().sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      data: leads
    });
  }
);