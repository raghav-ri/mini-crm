import {
  createCustomer,
  getCustomers,
} from "../services/customer.service.js";

export const createCustomerController = async (req, res) => {
  try {
    const customer = await createCustomer(req.body);

    res.status(201).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCustomersController = async (req, res) => {
  try {
    const customers = await getCustomers();

    res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};