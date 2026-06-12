import prisma from "../config/prisma.js";

export const createCampaignRepo = async (data) => {
  return prisma.campaign.create({
    data,
  });
};

export const getCampaignsRepo = async () => {
  return prisma.campaign.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};