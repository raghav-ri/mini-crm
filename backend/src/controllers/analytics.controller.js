import {
  getCampaignAnalytics,
} from "../services/analytics.service.js";

export const getCampaignAnalyticsController =
  async (req, res) => {
    try {
      const data =
        await getCampaignAnalytics(
          req.params.campaignId
        );

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };