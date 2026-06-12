import prisma from "../config/prisma.js";

export const createCustomerRepo = (data) => {
  return prisma.customer.create({
    data,
  });
};

export const getCustomersRepo = () => {
  return prisma.customer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};