import { Router } from "express";
import {
  deliveryWebhookController,
} from "../controllers/webhook.controller.js";

const router = Router();

router.post(
  "/delivery",
  deliveryWebhookController
);

export default router;