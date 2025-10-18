// server.js
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

console.log(process.env.TWILIO_ACCOUNT_SID);
import phishingRoutes from "./routes/phishingRoutes.js";
import smsRoutes from "./routes/smsRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/sms", smsRoutes);

app.get("/", (req, res) => res.send("PhishAI Node Backend running..."));

app.use("/api/phish", phishingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Backend running on http://127.0.0.1:${PORT}`);
});
