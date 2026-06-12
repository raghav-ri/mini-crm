import {
  sendCampaign,
} from "../services/campaign-send.service.js";

export const sendCampaignController =
  async (req, res) => {
    try {
      const result =
        await sendCampaign(
          req.params.campaignId
        );

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };