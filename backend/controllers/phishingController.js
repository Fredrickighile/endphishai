// controllers/phishingController.js
import axios from "axios";

// Python AI service URL from environment or default
const PYTHON_AI_URL =
  process.env.PYTHON_AI_URL || "http://127.0.0.1:8000/predict";

/**
 * Analyze potential phishing URL/text
 * Proxies request to Python AI service with retry logic
 */
export const analyzePhish = async (req, res) => {
  try {
    // Extract input from request body
    const { text, url } = req.body;
    const input = text || url;

    // Validate input
    if (!input || typeof input !== "string") {
      return res.status(400).json({
        error: "invalid_input",
        message: "Please provide 'text' or 'url' field with valid content",
      });
    }

    // Sanitize input length
    if (input.length > 2000) {
      return res.status(400).json({
        error: "input_too_long",
        message: "Input must be less than 2000 characters",
      });
    }

    console.log(
      `📡 Forwarding request to Python AI: ${input.substring(0, 50)}...`
    );

    // Call Python AI service with retry logic
    let aiResponse;
    let lastError;

    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        aiResponse = await axios.post(
          PYTHON_AI_URL,
          { text: input },
          {
            timeout: 15000, // 15 second timeout
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Success - break out of retry loop
        break;
      } catch (error) {
        lastError = error;
        console.error(`❌ Attempt ${attempt} failed:`, error.message);

        // Don't retry on client errors (4xx)
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          break;
        }

        // Wait before retry (only on first attempt)
        if (attempt === 1) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    }

    // Check if we got a response
    if (!aiResponse) {
      throw lastError || new Error("Failed to get response from AI service");
    }

    // Extract data from response
    const aiData = aiResponse.data;

    // Validate response structure
    if (!aiData || typeof aiData !== "object") {
      throw new Error("Invalid response format from AI service");
    }

    // Map AI response to frontend expected format
    const response = {
      prediction: aiData.final_status || aiData.ai_result || "unknown",
      confidence: aiData.ai_score || 0,
      explanation:
        aiData.explanation || aiData.ai_reason || "No explanation available",

      // Additional details
      url: aiData.url || input,
      host: aiData.host || "N/A",
      ai_result: aiData.ai_result,
      google_result: aiData.google_result,
      google_details: aiData.google_details,
      method: aiData.method || "Unknown",

      // Debug info (optional)
      heuristic_score: aiData.heuristic_score,
      ml_score: aiData.ml_score,
    };

    console.log(
      `✅ Analysis complete: ${response.prediction} (${response.confidence})`
    );

    return res.json(response);
  } catch (error) {
    console.error("❌ analyzePhish error:", error.message);

    // Determine error type and message
    let errorResponse = {
      error: "ai_service_error",
      message: "Failed to analyze content",
      details: error.message,
    };

    if (error.code === "ECONNREFUSED") {
      errorResponse.details =
        "Python AI service is not running. Please start it first.";
      errorResponse.message = "Connection refused - AI service offline";
    } else if (
      error.code === "ETIMEDOUT" ||
      error.message.includes("timeout")
    ) {
      errorResponse.details = "AI service took too long to respond";
      errorResponse.message = "Analysis timeout";
    } else if (error.response) {
      // Error from Python service
      errorResponse.details =
        error.response.data?.message || error.response.statusText;
      errorResponse.http_status = error.response.status;
    }

    // Don't expose internal errors in production
    if (process.env.NODE_ENV === "production") {
      delete errorResponse.details;
    }

    return res.status(500).json(errorResponse);
  }
};
