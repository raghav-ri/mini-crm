import {
  createOrder,
  getOrders,
} from "../services/order.service.js";

export const createOrderController = async (req, res) => {
  try {
    const order = await createOrder(req.body);

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOrdersController = async (req, res) => {
  try {
    const orders = await getOrders();

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};