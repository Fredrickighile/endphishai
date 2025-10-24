import { Brain, Shield, Activity } from "lucide-react";

export const ProtectionLayers = ({ result }) => {
  if (!result) return null;

  return (
    <div className="bg-gray-900/95 backdrop-blur-xl border-2 border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5 text-blue-400" />
        Protection Layer Results
      </h3>
      <div className="grid md:grid-cols-4 gap-4 text-sm">
        <div
          className={`p-3 rounded-lg border-2 ${
            result.ai_result === "phishing"
              ? "bg-red-900/50 border-red-600"
              : "bg-green-900/50 border-green-600"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Brain className="w-4 h-4" />
            <span className="font-semibold text-white">AI Model</span>
          </div>
          <span
            className={`font-bold ${
              result.ai_result === "phishing"
                ? "text-red-300"
                : "text-green-300"
            }`}
          >
            {result.ai_result?.toUpperCase() || "UNKNOWN"}
          </span>
        </div>

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
            <span className="font-semibold text-white">Google</span>
          </div>
          <span
            className={`font-bold ${
              result.google_result === "malicious"
                ? "text-red-300"
                : result.google_result === "safe"
                ? "text-green-300"
                : "text-gray-300"
            }`}
          >
            {result.google_result?.toUpperCase() || "UNKNOWN"}
          </span>
        </div>

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
            <span className="font-semibold text-white">VirusTotal</span>
          </div>
          <span
            className={`font-bold ${
              result.virustotal_result === "malicious"
                ? "text-red-300"
                : result.virustotal_result === "safe"
                ? "text-green-300"
                : "text-gray-300"
            }`}
          >
            {result.virustotal_result?.toUpperCase() || "UNKNOWN"}
          </span>
        </div>

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
            <span className="font-semibold text-white">URLhaus</span>
          </div>
          <span
            className={`font-bold ${
              result.urlhaus_result === "malicious"
                ? "text-red-300"
                : result.urlhaus_result === "safe"
                ? "text-green-300"
                : "text-gray-300"
            }`}
          >
            {result.urlhaus_result?.toUpperCase() || "UNKNOWN"}
          </span>
        </div>
      </div>
    </div>
  );
};
