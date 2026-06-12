import {
  getCampaignAnalyticsRepo,
} from "../repositories/analytics.repository.js";

export const getCampaignAnalytics =
  async (campaignId) => {
    const recipients =
      await getCampaignAnalyticsRepo(
        campaignId
      );

    const sent =
      recipients.length;

    let delivered = 0;
    let opened = 0;
    let clicked = 0;

    for (const recipient of recipients) {
      for (const event of recipient.events) {
        if (
          event.eventType === "DELIVERED"
        ) {
          delivered++;
        }

        if (
          event.eventType === "OPENED"
        ) {
          opened++;
        }

        if (
          event.eventType === "CLICKED"
        ) {
          clicked++;
        }
      }
    }

    return {
      campaignId,
      sent,
      delivered,
      opened,
      clicked,
    };
  };