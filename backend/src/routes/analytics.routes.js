import { Router } from "express";

import {
  getCampaignAnalyticsController,
} from "../controllers/analytics.controller.js";

const router = Router();

router.get(
  "/campaigns/:campaignId",
  getCampaignAnalyticsController
);

export default router;