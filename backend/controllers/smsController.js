import dotenv from "dotenv";
dotenv.config(); // Ensure .env is loaded before Twilio init

import twilio from "twilio";

// Load credentials from environment
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

// Initialize Twilio client
let client;
if (accountSid && authToken) {
  client = twilio(accountSid, authToken);
  console.log(" Twilio client initialized successfully");
} else {
  console.error(" Twilio credentials missing. SMS will not work.");
}

/**
 * Send SMS alert when phishing is detected
 */
export const sendPhishingAlert = async (req, res) => {
  try {
    const { phoneNumber, threat, url } = req.body;

    if (!phoneNumber) {
      return res
        .status(400)
        .json({ error: "missing_phone", message: "Phone number is required" });
    }

    if (!client) {
      return res.status(503).json({
        error: "sms_not_configured",
        message: "SMS service is not configured",
      });
    }

    const cleanPhone = phoneNumber.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      return res.status(400).json({
        error: "invalid_phone",
        message: "Invalid phone number format",
      });
    }

    const formattedPhone = cleanPhone.startsWith("+")
      ? cleanPhone
      : `+${cleanPhone}`;

    let message;
    if (threat === "phishing" || threat === "malicious") {
      message = ` PHISHING ALERT!\nPhishAI detected a DANGEROUS link:\n${
        url || "Unknown URL"
      }\n DO NOT CLICK OR SHARE\nStay safe!\n- EndPhishAI Security`;
    } else if (threat === "suspicious") {
      message = ` SUSPICIOUS CONTENT\nPhishAI found suspicious patterns in:\n${
        url || "Unknown URL"
      }\n Proceed with caution\n- EndPhishAI Security`;
    } else {
      message = ` Content verified as safe by PhishAI.\nURL: ${
        url || "Unknown URL"
      }\nStay vigilant!\n- EndPhishAI Security`;
    }

    const twilioMessage = await client.messages.create({
      body: message,
      from: twilioPhone,
      to: formattedPhone,
    });

    console.log(` SMS sent to ${formattedPhone}: ${twilioMessage.sid}`);

    return res.json({
      success: true,
      message: "SMS alert sent successfully",
      sid: twilioMessage.sid,
      to: formattedPhone,
    });
  } catch (error) {
    console.error(" SMS sending error:", error);
    let errorMessage = "Failed to send SMS alert";
    if (error.code === 21211) errorMessage = "Invalid phone number";
    else if (error.code === 21608)
      errorMessage = "Phone number is not verified (Twilio trial)";

    return res.status(500).json({
      error: "sms_failed",
      message: errorMessage,
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * Verify phone number
 */
export const verifyPhone = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res
        .status(400)
        .json({ error: "missing_phone", message: "Phone number is required" });
    }

    const cleanPhone = phoneNumber.replace(/\D/g, "");
    const isValid = cleanPhone.length >= 10 && cleanPhone.length <= 15;

    return res.json({
      valid: isValid,
      formatted: isValid ? `+${cleanPhone}` : null,
      message: isValid
        ? "Phone number is valid"
        : "Invalid phone number format",
    });
  } catch (error) {
    console.error(" Phone verification error:", error);
    return res.status(500).json({
      error: "verification_failed",
      message: "Failed to verify phone number",
    });
  }
};
