import { Router } from "express";
import axios from "axios";

const router = Router();

router.post("/send", async (req, res) => {
  const payload = req.body;

  console.log("Campaign Received");

  res.status(200).json({
    success: true,
    message: "Message queued",
  });

  setTimeout(async () => {
    try {
      await axios.post(
        process.env.CRM_CALLBACK_URL,
        {
          ...payload,
          eventType: "DELIVERED",
        }
      );

      console.log("DELIVERED");
    } catch (error) {
      console.log(error.message);
    }
  }, 2000);

  setTimeout(async () => {
    try {
      await axios.post(
        process.env.CRM_CALLBACK_URL,
        {
          ...payload,
          eventType: "OPENED",
        }
      );

      console.log("OPENED");
    } catch (error) {
      console.log(error.message);
    }
  }, 4000);

  setTimeout(async () => {
    try {
      await axios.post(
        process.env.CRM_CALLBACK_URL,
        {
          ...payload,
          eventType: "CLICKED",
        }
      );

      console.log("CLICKED");
    } catch (error) {
      console.log(error.message);
    }
  }, 6000);
});

export default router;