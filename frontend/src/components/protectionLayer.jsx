import { Brain, Shield, Activity, Sparkles } from "lucide-react";

export const ProtectionLayers = ({ result }) => {
  if (!result) return null;

  const hasNlpAnalysis = result?.nlp_analysis?.performed;

  return (
    <div className="bg-gray-900/95 backdrop-blur-xl border-2 border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5 text-blue-400" />
        Protection Layer Results
        {hasNlpAnalysis && (
          <span className="ml-auto text-xs px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full text-purple-300 font-semibold">
            5 LAYERS ACTIVE
          </span>
        )}
      </h3>

      <div
        className={`grid md:grid-cols-2 ${
          hasNlpAnalysis ? "lg:grid-cols-5" : "lg:grid-cols-4"
        } gap-4 text-sm`}
      >
        {/* AI Model Layer */}
        <div
          className={`p-3 rounded-lg border-2 ${
            result.ai_result === "phishing"
              ? "bg-red-900/50 border-red-600"
              : "bg-green-900/50 border-green-600"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Brain className="w-4 h-4" />
            <span className="font-semibold text-white text-xs">
              AI Model (ML)
            </span>
          </div>
          <span
            className={`font-bold text-sm ${
              result.ai_result === "phishing"
                ? "text-red-300"
                : "text-green-300"
            }`}
          >
            {result.ai_result?.toUpperCase() || "UNKNOWN"}
          </span>
          <div className="text-xs text-gray-400 mt-1">Layer 1</div>
        </div>

        {/* Google Safe Browsing Layer */}
        <div
          className={`p-3 rounded-lg border-2 ${
            result.google_result === "malicious"
              ? "bg-red-900/50 border-red-600"
              : result.google_result === "safe"
              ? "bg-green-900/50 border-green-600"
              : "bg-gray-800/70 border-gray-600"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4" />
            <span className="font-semibold text-white text-xs">Google</span>
          </div>
          <span
            className={`font-bold text-sm ${
              result.google_result === "malicious"
                ? "text-red-300"
                : result.google_result === "safe"
                ? "text-green-300"
                : "text-gray-300"
            }`}
          >
            {result.google_result?.toUpperCase() || "UNKNOWN"}
          </span>
          <div className="text-xs text-gray-400 mt-1">Layer 2</div>
        </div>

        {/* VirusTotal Layer */}
        <div
          className={`p-3 rounded-lg border-2 ${
            result.virustotal_result === "malicious"
              ? "bg-red-900/50 border-red-600"
              : result.virustotal_result === "safe"
              ? "bg-green-900/50 border-green-600"
              : "bg-gray-800/70 border-gray-600"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-4 h-4" />
            <span className="font-semibold text-white text-xs">VirusTotal</span>
          </div>
          <span
            className={`font-bold text-sm ${
              result.virustotal_result === "malicious"
                ? "text-red-300"
                : result.virustotal_result === "safe"
                ? "text-green-300"
                : "text-gray-300"
            }`}
          >
            {result.virustotal_result?.toUpperCase() || "UNKNOWN"}
          </span>
          <div className="text-xs text-gray-400 mt-1">Layer 3</div>
        </div>

        {/* URLhaus Layer */}
        <div
          className={`p-3 rounded-lg border-2 ${
            result.urlhaus_result === "malicious"
              ? "bg-red-900/50 border-red-600"
              : result.urlhaus_result === "safe"
              ? "bg-green-900/50 border-green-600"
              : "bg-gray-800/70 border-gray-600"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-4 h-4" />
            <span className="font-semibold text-white text-xs">URLhaus</span>
          </div>
          <span
            className={`font-bold text-sm ${
              result.urlhaus_result === "malicious"
                ? "text-red-300"
                : result.urlhaus_result === "safe"
                ? "text-green-300"
                : "text-gray-300"
            }`}
          >
            {result.urlhaus_result?.toUpperCase() || "UNKNOWN"}
          </span>
          <div className="text-xs text-gray-400 mt-1">Layer 4</div>
        </div>

        {/* NLP AI Layer - NEW! */}
        {hasNlpAnalysis && (
          <div
            className={`p-3 rounded-lg border-2 relative overflow-hidden ${
              result.nlp_analysis.score >= 0.65
                ? "bg-red-900/50 border-red-600"
                : result.nlp_analysis.score >= 0.45
                ? "bg-yellow-900/50 border-yellow-600"
                : "bg-green-900/50 border-green-600"
            }`}
          >
            <div className="absolute top-0 right-0 p-1">
              <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
            </div>
            <div className="flex items-center gap-2 mb-1">
              <Brain className="w-4 h-4 text-purple-400" />
              <span className="font-semibold text-white text-xs">NLP AI</span>
            </div>
            <span
              className={`font-bold text-sm ${
                result.nlp_analysis.score >= 0.65
                  ? "text-red-300"
                  : result.nlp_analysis.score >= 0.45
                  ? "text-yellow-300"
                  : "text-green-300"
              }`}
            >
              {result.nlp_analysis.score >= 0.65
                ? "PHISHING"
                : result.nlp_analysis.score >= 0.45
                ? "SUSPICIOUS"
                : "SAFE"}
            </span>
            <div className="text-xs text-purple-400 mt-1 font-semibold">
              Layer 5
            </div>
          </div>
        )}
      </div>

      {/* AI Layer Info */}
      {hasNlpAnalysis && (
        <div className="mt-4 p-3 bg-purple-900/20 border border-purple-500/30 rounded-lg">
          <div className="flex items-center gap-2 text-xs text-purple-300">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="font-semibold">Enhanced Detection:</span>
            <span>
              Transformer-based NLP AI analyzing text patterns and intent
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
