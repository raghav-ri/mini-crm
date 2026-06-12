import prisma from "../config/prisma.js";

export const getCampaignByIdRepo = async (campaignId) => {
  return prisma.campaign.findUnique({
    where: {
      id: campaignId,
    },
  });
};

export const getSegmentByIdRepo = async (segmentId) => {
  return prisma.segment.findUnique({
    where: {
      id: segmentId,
    },
  });
};

export const getAudienceRepo = async (rules) => {
  const where = {};

  if (rules.totalSpent?.gte) {
    where.totalSpent = {
      gte: Number(rules.totalSpent.gte),
    };
  }

  if (rules.city) {
    where.city = rules.city;
  }

  return prisma.customer.findMany({
    where,
  });
};

export const createRecipientRepo = async (
  campaignId,
  customerId
) => {
  return prisma.campaignRecipient.create({
    data: {
      campaignId,
      customerId,
    },
  });
};