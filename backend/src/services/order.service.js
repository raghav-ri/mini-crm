import prisma from "../config/prisma.js";
import { getOrdersRepo } from "../repositories/order.repository.js";

export const createOrder = async (data) => {
  const order = await prisma.order.create({
    data,
  });

  await prisma.customer.update({
    where: {
      id: data.customerId,
    },
    data: {
      totalSpent: {
        increment: data.amount,
      },
    },
  });

  return order;
};

export const getOrders = async () => {
  return getOrdersRepo();
};