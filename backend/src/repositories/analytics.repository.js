import prisma from "../config/prisma.js";

export const getCampaignAnalyticsRepo =
  async (campaignId) => {
    const recipients =
      await prisma.campaignRecipient.findMany({
        where: {
          campaignId,
        },
        include: {
          events: true,
        },
      });

    return recipients;
  };