import { Brain, Shield, Activity } from "lucide-react";

export const ProtectionLayers = ({ result }) => {
  if (!result) return null;

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5 text-blue-400" />
        Protection Layer Results
      </h3>
      <div className="grid md:grid-cols-4 gap-4 text-sm">
        <div
          className={`p-3 rounded-lg ${
            result.ai_result === "phishing"
              ? "bg-red-500/20 border border-red-500/30"
              : "bg-green-500/20 border border-green-500/30"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Brain className="w-4 h-4" />
            <span className="font-semibold">AI Model</span>
          </div>
          <span
            className={
              result.ai_result === "phishing"
                ? "text-red-300"
                : "text-green-300"
            }
          >
            {result.ai_result?.toUpperCase() || "UNKNOWN"}
          </span>
        </div>

        <div
          className={`p-3 rounded-lg ${
            result.google_result === "malicious"
              ? "bg-red-500/20 border border-red-500/30"
              : result.google_result === "safe"
              ? "bg-green-500/20 border border-green-500/30"
              : "bg-gray-500/20 border border-gray-500/30"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4" />
            <span className="font-semibold">Google</span>
          </div>
          <span
            className={
              result.google_result === "malicious"
                ? "text-red-300"
                : result.google_result === "safe"
                ? "text-green-300"
                : "text-gray-300"
            }
          >
            {result.google_result?.toUpperCase() || "UNKNOWN"}
          </span>
        </div>

        <div
          className={`p-3 rounded-lg ${
            result.virustotal_result === "malicious"
              ? "bg-red-500/20 border border-red-500/30"
              : result.virustotal_result === "safe"
              ? "bg-green-500/20 border border-green-500/30"
              : "bg-gray-500/20 border border-gray-500/30"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-4 h-4" />
            <span className="font-semibold">VirusTotal</span>
          </div>
          <span
            className={
              result.virustotal_result === "malicious"
                ? "text-red-300"
                : result.virustotal_result === "safe"
                ? "text-green-300"
                : "text-gray-300"
            }
          >
            {result.virustotal_result?.toUpperCase() || "UNKNOWN"}
          </span>
        </div>

        {/* URLhaus - ADD THIS AS SEPARATE BLOCK */}
        <div
          className={`p-3 rounded-lg ${
            result.urlhaus_result === "malicious"
              ? "bg-red-500/20 border border-red-500/30"
              : result.urlhaus_result === "safe"
              ? "bg-green-500/20 border border-green-500/30"
              : "bg-gray-500/20 border border-gray-500/30"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-4 h-4" />
            <span className="font-semibold">URLhaus</span>
          </div>
          <span
            className={
              result.urlhaus_result === "malicious"
                ? "text-red-300"
                : result.urlhaus_result === "safe"
                ? "text-green-300"
                : "text-gray-300"
            }
          >
            {result.urlhaus_result?.toUpperCase() || "UNKNOWN"}
          </span>
        </div>
      </div>
    </div>
  );
};
