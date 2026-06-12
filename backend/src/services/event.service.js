import {
  createEventRepo,
} from "../repositories/event.repository.js";

export const saveEvent =
  async (data) => {
    return createEventRepo(data);
  };