import { Router } from "express";

import {
  createSegmentController,
  getSegmentsController,
  previewAudienceController,
} from "../controllers/segment.controller.js";

const router = Router();

router.post("/", createSegmentController);
router.get("/", getSegmentsController);
router.post("/preview", previewAudienceController);

export default router;