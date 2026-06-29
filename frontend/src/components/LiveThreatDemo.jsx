import { useState } from "react";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Loader,
  ChevronRight,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const DEMO_THREATS = [
  {
    language: "Swahili",
    flag: "🇰🇪",
    message:
      "HARAKA! Akaunti yako ya M-Pesa imefungwa. Thibitisha sasa: http://mpesa-verify.tk/login",
    translation: "URGENT! Your M-Pesa account is locked. Verify now:",
    url: "http://mpesa-verify.tk/login",
  },
  {
    language: "Hausa",
    flag: "🇳🇬",
    message:
      "Gaggawa! Asusun MTN ka an kulle. Tabbatar yanzu: http://mtn-secure.xyz/verify",
    translation: "Urgent! Your MTN account is locked. Confirm now:",
    url: "http://mtn-secure.xyz/verify",
  },
  {
    language: "Yoruba",
    flag: "🇳🇬",
    message:
      "Kiakia! Akọọlẹ GTBank rẹ ti di. Jẹrisi bayi: http://gtbank-alert.ml/account",
    translation: "Quick! Your GTBank account is blocked. Verify now:",
    url: "http://gtbank-alert.ml/account",
  },
  {
    language: "French",
    flag: "🇸🇳",
    message:
      "URGENT: Votre compte Orange Money est bloqué. Vérifier maintenant: http://orange-verify.ga",
    translation: "URGENT: Your Orange Money account is blocked. Verify now:",
    url: "http://orange-verify.ga",
  },
];

function VerdictBadge({ verdict, confidence }) {
  if (!verdict) return null;
  const isPhishing = verdict === "phishing" || verdict === "suspicious";
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold ${
        isPhishing
          ? "bg-red-500/20 border border-red-500/40 text-red-300"
          : "bg-green-500/20 border border-green-500/40 text-green-300"
      }`}
    >
      {isPhishing ? (
        <AlertTriangle className="w-4 h-4" />
      ) : (
        <CheckCircle className="w-4 h-4" />
      )}
      <span>{isPhishing ? "PHISHING" : "SAFE"}</span>
      {confidence > 0 && (
        <span className="text-xs opacity-75 ml-1">
          {Math.round(confidence * 100)}%
        </span>
      )}
    </div>
  );
}

export default function LiveThreatDemo() {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});

  const scan = async (index, threat) => {
    setLoading((prev) => ({ ...prev, [index]: true }));
    setResults((prev) => ({ ...prev, [index]: null }));

    try {
      // Scan the URL directly — that's where the phishing signal is strongest
      const response = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: threat.url, text: threat.message }),
      });
      const data = await response.json();
      setResults((prev) => ({
        ...prev,
        [index]: {
          verdict: data.final_status || data.ai_result,
          confidence: data.ai_score || 0,
          explanation: data.ai_reason || data.explanation || "",
        },
      }));
    } catch {
      setResults((prev) => ({
        ...prev,
        [index]: {
          verdict: "error",
          confidence: 0,
          explanation: "Could not reach API",
        },
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [index]: false }));
    }
  };

  const scanAll = async () => {
    for (let i = 0; i < DEMO_THREATS.length; i++) {
      scan(i, DEMO_THREATS[i]);
      await new Promise((r) => setTimeout(r, 400));
    }
  };

  return (
    <section className="container mx-auto px-4 py-20 max-w-5xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-400/30 text-red-300 px-5 py-2.5 rounded-full text-sm font-medium mb-6">
          <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse inline-block" />
          Live Detection — Real API, Real Results
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          What Other Tools{" "}
          <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            Miss
          </span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          These phishing messages bypass most Western security tools. Watch
          EndPhishAI catch them in real time.
        </p>
        <button
          onClick={scanAll}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold transition-all hover:scale-[1.03]"
        >
          <Shield className="w-5 h-5" />
          Scan All Four Now
        </button>
      </div>

      <div className="space-y-4">
        {DEMO_THREATS.map((threat, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{threat.flag}</span>
                  <span className="text-sm font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-lg">
                    {threat.language}
                  </span>
                </div>
                <p className="text-white font-mono text-sm mb-2 leading-relaxed">
                  {threat.message}
                </p>
                <p className="text-gray-500 text-xs italic mb-2">
                  Translation: {threat.translation}
                </p>
                {results[i]?.explanation && (
                  <p className="text-gray-400 text-xs mt-2 bg-white/5 rounded-lg px-3 py-2">
                    {results[i].explanation}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-end gap-3 sm:min-w-[140px]">
                {results[i] ? (
                  <VerdictBadge
                    verdict={results[i].verdict}
                    confidence={results[i].confidence}
                  />
                ) : (
                  <button
                    onClick={() => scan(i, threat)}
                    disabled={loading[i]}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-sm font-semibold transition-all disabled:opacity-50"
                  >
                    {loading[i] ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                    {loading[i] ? "Scanning..." : "Scan This"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-gray-500 text-sm mt-6">
        Real phishing patterns from African mobile money scams. Each scan hits
        the live EndPhishAI API — no pre-loaded results.
      </p>
    </section>
  );
}
