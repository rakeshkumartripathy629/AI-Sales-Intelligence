import { analyzeSingleLead, analyzeBulkLeads, getAllLeads } from '../api/leadApi';

export const leadService = {
  /**
   * Analyzes a single lead URL
   * @param {string} url - The website URL to analyze
   * @returns {Promise<Object>} Lead analysis result
   */
  async analyzeLead(url) {
    const trimmed = url.trim();
    if (!trimmed) throw new Error('Please enter a valid URL.');
    const result = await analyzeSingleLead(trimmed);
    return result;
  },

  /**
   * Analyzes multiple leads from a newline-separated string
   * @param {string} rawText - Newline-separated URLs
   * @returns {Promise<Object>} Bulk analysis results
   */
  async bulkAnalyze(rawText) {
    const leads = rawText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (leads.length === 0) throw new Error('Please enter at least one URL.');
    if (leads.length > 20) throw new Error('Maximum 20 leads per bulk request.');

    const result = await analyzeBulkLeads(leads);
    return result;
  },

  /**
   * Fetches all previously analyzed leads
   * @returns {Promise<Array>} Array of lead objects
   */
  async fetchAll() {
    const result = await getAllLeads();
    return result?.data || [];
  },
};
