import { useState } from "react";
import { Phone, Send, CheckCircle, AlertCircle } from "lucide-react";

/**
 * SMS Alert Section Component
 * Allows users to receive SMS notifications about detected threats
 * Includes professional error handling and validation
 */
export const SMSAlertSection = ({ result }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  /**
   * Send SMS alert to user's phone number
   * Handles all error cases professionally without exposing technical details
   */
  const sendSMSAlert = async () => {
    // Validate phone number before sending
    if (!phoneNumber.trim()) {
      setError("Please enter a phone number");
      return;
    }

    setSending(true);
    setError("");

    try {
      // Call Python backend SMS endpoint
      const response = await fetch("http://127.0.0.1:8000/send-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          threat: result.final_status || result.ai_result,
          url: result.url,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // SMS sent successfully
        setSent(true);

        // Reset form after 3 seconds
        setTimeout(() => {
          setSent(false);
          setPhoneNumber("");
        }, 3000);
      } else {
        // Handle error responses professionally
        if (data.error === "sms_unavailable") {
          setError(
            "SMS service temporarily unavailable. Please try again later or contact support."
          );
        } else if (data.error === "invalid_phone") {
          setError(
            "Invalid phone number. Please include country code (e.g., +234 for Nigeria)"
          );
        } else if (data.error === "unverified_number") {
          setError(
            "This phone number needs verification. Please contact support."
          );
        } else {
          setError("Unable to send SMS. Please try again later.");
        }
      }
    } catch (err) {
      // Network or connection error
      setError("Service temporarily unavailable. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  // Only display SMS section for phishing or suspicious results
  const shouldShow =
    result &&
    (result.final_status === "phishing" ||
      result.final_status === "suspicious" ||
      result.ai_result === "phishing");

  if (!shouldShow) return null;

  return (
    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mt-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Phone className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h3 className="text-white font-bold">Send SMS Alert</h3>
          <p className="text-sm text-gray-400">
            Get instant SMS notification about this threat
          </p>
        </div>
      </div>

      {/* SMS Form */}
      <div className="space-y-3">
        {/* Phone Number Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Phone Number (with country code)
          </label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+234 XXX XXX XXXX"
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
            disabled={sending || sent}
          />
          <p className="text-xs text-gray-500 mt-1">
            Example: +234 for Nigeria, +254 for Kenya, +1 for US
          </p>
        </div>

        {/* Error Message Display */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        {/* Success Message Display */}
        {sent && (
          <div className="flex items-center gap-2 p-3 bg-green-500/20 border border-green-500/30 rounded-lg animate-fade-in">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <p className="text-sm text-green-300">
              SMS alert sent successfully!
            </p>
          </div>
        )}

        {/* Send Button */}
        <button
          onClick={sendSMSAlert}
          disabled={sending || sent || !phoneNumber.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 hover:scale-[1.02] shadow-lg"
        >
          {sending ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Sending...</span>
            </>
          ) : sent ? (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Sent!</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Send SMS Alert</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
