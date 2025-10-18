// routes/phishingRoutes.js
import express from "express";
import { analyzePhish } from "../controllers/phishingController.js";

const router = express.Router();

router.post("/analyze", analyzePhish);

export default router;
