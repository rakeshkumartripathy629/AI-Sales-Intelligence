import express from 'express';

import { analyzeLead, getAllLeads, analyzeBulkLeads } from '../controllers/lead.controller.js';

import { validate } from '../middleware/validate.middleware.js';

import { analyzeLeadSchema, bulkLeadSchema } from '../validators/lead.validator.js';

const router = express.Router();

router.post('/analyze', validate(analyzeLeadSchema), analyzeLead);

router.post('/bulk-analyze', validate(bulkLeadSchema), analyzeBulkLeads);

router.get('/', getAllLeads);

export default router;
