import prisma from "../config/prisma.js";

export const createEventRepo =
  async (data) => {
    return prisma.communicationEvent.create({
      data,
    });
  };