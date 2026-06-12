import prisma from "../config/prisma.js";

export const createSegmentRepo = async (data) => {
  return prisma.segment.create({
    data,
  });
};

export const getSegmentsRepo = async () => {
  return prisma.segment.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const previewAudienceRepo = async (rules) => {
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