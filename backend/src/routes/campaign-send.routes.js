import { Router } from "express";

import {
  sendCampaignController,
} from "../controllers/campaign-send.controller.js";

const router = Router();

router.post(
  "/:campaignId/send",
  sendCampaignController
);

export default router;