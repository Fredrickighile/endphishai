import { AlertTriangle, CheckCircle, Brain, Sparkles } from "lucide-react";
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
  const hasNlpAnalysis = result?.nlp_analysis?.performed;

  const getThreatTitle = () => {
    switch (threatLevel) {
      case "critical":
        return "CRITICAL THREAT DETECTED";
      case "high":
        return "HIGH RISK - PHISHING DETECTED";
      case "medium":
        return "SUSPICIOUS CONTENT";
      case "low":
        return "NO THREATS DETECTED";
      default:
        return "ANALYSIS COMPLETE";
    }
  };

  // Get NLP language detection if available
  const nlpLanguage = hasNlpAnalysis
    ? result.nlp_analysis.indicators?.find((ind) => ind.includes("Language:"))
    : null;

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
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {getThreatTitle()}
            </h2>

            {/* NLP AI Badge */}
            {hasNlpAnalysis && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full">
                <Brain className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-xs font-semibold text-purple-300">
                  NLP AI ANALYZED
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-3">
            <p className={`${color.text} text-sm font-semibold`}>
              Threat Level: {threatLevel.toUpperCase()} | Confidence:{" "}
              {getDisplayConfidence(result).toFixed(1)}%
            </p>

            {/* Language Badge */}
            {nlpLanguage && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full">
                <Sparkles className="w-3 h-3 text-blue-400" />
                <span className="text-xs font-medium text-blue-300">
                  {nlpLanguage}
                </span>
              </div>
            )}
          </div>

          <p className="text-gray-200 leading-relaxed text-sm sm:text-base">
            {getUserFriendlyExplanation(result)}
          </p>

          {/* NLP Quick Summary */}
          {hasNlpAnalysis && result.nlp_analysis.score > 0.5 && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <div className="flex items-start gap-2">
                <Brain className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-purple-200">
                  <span className="font-semibold">NLP AI Detected:</span>{" "}
                  {result.nlp_analysis.indicators?.[0] ||
                    "Suspicious patterns in text content"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
