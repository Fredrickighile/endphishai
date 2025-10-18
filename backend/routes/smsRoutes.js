// routes/smsRoutes.js
import express from "express";
import {
  sendPhishingAlert,
  verifyPhone,
} from "../controllers/smsController.js";

const router = express.Router();

// Send SMS alert
router.post("/alert", sendPhishingAlert);

// Verify phone number
router.post("/verify-phone", verifyPhone);

export default router;
