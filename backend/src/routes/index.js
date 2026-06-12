import { Router } from "express";
import customerRoutes from "./customer.routes.js";
import orderRoutes from "./order.routes.js";
import segmentRoutes from "./segment.routes.js";
import aiRoutes from "./ai.routes.js";
import campaignRoutes from "./campaign.routes.js";
import webhookRoutes from "./webhook.routes.js";
import campaignSendRoutes from "./campaign-send.routes.js";
import analyticsRoutes from "./analytics.routes.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API v1 Running",
  });
});

router.use("/customers", customerRoutes);
router.use("/orders", orderRoutes);
router.use("/segments", segmentRoutes);
router.use("/ai", aiRoutes);
router.use("/campaigns", campaignRoutes);
router.use("/webhooks", webhookRoutes);
router.use(
  "/campaigns",
  campaignSendRoutes
);
router.use(
  "/analytics",
  analyticsRoutes
);

export default router;