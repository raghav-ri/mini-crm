import {
  createCustomerRepo,
  getCustomersRepo,
} from "../repositories/customer.repository.js";

export const createCustomer = async (data) => {
  return createCustomerRepo(data);
};

export const getCustomers = async () => {
  return getCustomersRepo();
};