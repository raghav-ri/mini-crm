import { Router } from "express";

import {
  generateCampaignController,
  suggestSegmentController,
} from "../controllers/ai.controller.js";

const router = Router();

router.post(
  "/generate-campaign",
  generateCampaignController
);

router.post(
  "/suggest-segment",
  suggestSegmentController
);

export default router;