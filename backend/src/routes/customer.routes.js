import { Router } from "express";

import {
  createCustomerController,
  getCustomersController,
} from "../controllers/customer.controller.js";

const router = Router();

router.post("/", createCustomerController);
router.get("/", getCustomersController);

export default router;