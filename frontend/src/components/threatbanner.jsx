import { AlertTriangle, CheckCircle } from "lucide-react";
import {
  getThreatLevel,
  colors,
  getUserFriendlyExplanation,
  getDisplayConfidence,
} from "../utils/threatUtils";

export const ThreatBanner = ({ result }) => {
  if (!result) return null;

  const threatLevel = getThreatLevel(result);
  const color = colors[threatLevel] || colors.low;

  const getThreatTitle = () => {
    switch (threatLevel) {
      case "critical":
        return "🚨 CRITICAL THREAT DETECTED";
      case "high":
        return "⚠️ HIGH RISK - PHISHING DETECTED";
      case "medium":
        return "⚠️ SUSPICIOUS CONTENT";
      case "low":
        return "✅ NO THREATS DETECTED";
      default:
        return "🔍 ANALYSIS COMPLETE";
    }
  };

  return (
    <div
      className={`${color.bg} border-l-4 ${
        color.border
      } rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-xl ${
        threatLevel === "critical" || threatLevel === "high"
          ? "animate-pulse-border"
          : ""
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 ${color.bg} rounded-xl shadow-lg`}>
          {threatLevel === "critical" ||
          threatLevel === "high" ||
          threatLevel === "medium" ? (
            <AlertTriangle className={`w-6 h-6 sm:w-8 sm:h-8 ${color.icon}`} />
          ) : (
            <CheckCircle className={`w-6 h-6 sm:w-8 sm:h-8 ${color.icon}`} />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {getThreatTitle()}
            </h2>
          </div>
          <p className={`${color.text} text-sm mb-3 font-semibold`}>
            Threat Level: {threatLevel.toUpperCase()} | Confidence:{" "}
            {getDisplayConfidence(result).toFixed(1)}%
          </p>
          <p className="text-gray-200 leading-relaxed text-sm sm:text-base">
            {getUserFriendlyExplanation(result)}
          </p>
        </div>
      </div>
    </div>
  );
};
