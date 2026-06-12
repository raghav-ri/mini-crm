import {
  saveEvent,
} from "../services/event.service.js";

export const deliveryWebhookController =
  async (req, res) => {
    try {
      await saveEvent({
        campaignRecipientId:
          req.body.campaignRecipientId,

        eventType:
          req.body.eventType,

        metadata:
          req.body,
      });

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };