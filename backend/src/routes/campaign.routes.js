import { Router } from "express";

import {
  createCampaignController,
  getCampaignsController,
} from "../controllers/campaign.controller.js";

const router = Router();

router.post("/", createCampaignController);
router.get("/", getCampaignsController);

export default router;