import prisma from "../config/prisma.js";

export const createOrderRepo = async (data) => {
  return prisma.order.create({
    data,
  });
};

export const getOrdersRepo = async () => {
  return prisma.order.findMany({
    include: {
      customer: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};