import {
  CheckCircle,
  AlertCircle,
  Info,
  Search,
  Globe,
  Brain,
  Sparkles,
  Zap,
} from "lucide-react";

export default function EnhancedContentDisplay({ result }) {
  // Check if we have NLP analysis results
  const hasNlpAnalysis = result?.nlp_analysis?.performed;
  const hasContentAnalysis = result?.content_analysis_performed;

  // *** THE REAL FIX: Don't render ANYTHING if no data ***
  if (!hasNlpAnalysis && !hasContentAnalysis) {
    return null; // Returns nothing = no extra space
  }

  const contentScore = result.content_score || 0;
  const contentIndicators = result.content_indicators || [];
  const hasContentIndicators = contentIndicators.length > 0;

  const getThreatLevel = (score) => {
    if (score >= 0.7) return { level: "High", color: "red" };
    if (score >= 0.5) return { level: "Medium", color: "yellow" };
    return { level: "Low", color: "green" };
  };

  const threat = getThreatLevel(contentScore);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* NLP AI ANALYSIS SECTION */}
      {hasNlpAnalysis && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"></div>

          <div className="relative bg-gradient-to-br from-purple-900/50 to-purple-800/40 backdrop-blur-xl border-2 border-purple-500/50 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/30 rounded-xl shadow-lg">
                  <Brain className="w-6 h-6 text-purple-300" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">
                    NLP AI Analysis
                  </h3>
                  <p className="text-purple-300 text-sm">
                    {result.nlp_analysis.method}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-3xl font-bold text-purple-300">
                  {(result.nlp_analysis.score * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-purple-400 font-medium">
                  AI Confidence:{" "}
                  {(result.nlp_analysis.confidence * 100).toFixed(0)}%
                </div>
              </div>
            </div>

            {/* AI Score Bar */}
            <div className="bg-gray-900/50 rounded-xl p-4 mb-4 border border-purple-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-200 text-sm font-medium">
                  Threat Detection Score:
                </span>
                <span
                  className={`text-lg font-bold ${
                    result.nlp_analysis.score >= 0.7
                      ? "text-red-400"
                      : result.nlp_analysis.score >= 0.5
                      ? "text-yellow-400"
                      : "text-green-400"
                  }`}
                >
                  {result.nlp_analysis.score >= 0.7
                    ? "HIGH RISK"
                    : result.nlp_analysis.score >= 0.5
                    ? "MEDIUM"
                    : "LOW RISK"}
                </span>
              </div>

              <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden border border-purple-500/20">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    result.nlp_analysis.score >= 0.7
                      ? "bg-gradient-to-r from-red-500 via-red-600 to-pink-600"
                      : result.nlp_analysis.score >= 0.5
                      ? "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500"
                      : "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"
                  }`}
                  style={{ width: `${result.nlp_analysis.score * 100}%` }}
                />
              </div>
            </div>

            {/* AI Indicators */}
            {result.nlp_analysis.indicators &&
              result.nlp_analysis.indicators.length > 0 && (
                <div className="space-y-2">
                  <p className="text-purple-200 text-sm font-semibold mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                    AI-Detected Patterns:
                  </p>

                  <div className="space-y-2">
                    {result.nlp_analysis.indicators.map((indicator, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 bg-purple-900/30 border border-purple-500/30 rounded-lg p-3 hover:bg-purple-900/40 transition-all animate-slide-in"
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        <Zap className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span className="text-purple-100 text-sm">
                          {indicator}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* AI Tech Badge */}
            <div className="mt-4 pt-4 border-t border-purple-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-purple-300">
                  <Brain className="w-4 h-4" />
                  <span>
                    Powered by Transformer-based Natural Language Processing
                  </span>
                </div>
                <div className="px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full">
                  <span className="text-xs font-semibold text-purple-300">
                    AI LAYER 5
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTENT ANALYSIS SECTION */}
      {hasContentAnalysis && (
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-xl"></div>

          <div className="relative bg-gradient-to-br from-blue-900/50 to-blue-800/40 backdrop-blur-xl border-2 border-blue-600/50 rounded-2xl p-6 shadow-xl">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-400" />
              Deep Content Analysis
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-300">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Webpage content scanned successfully
                </span>
              </div>

              <div className="bg-gray-800/80 rounded-xl p-4 border-2 border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-200 text-sm font-medium">
                    Content Threat Score:
                  </span>
                  <span
                    className={`text-2xl font-bold ${
                      threat.color === "red"
                        ? "text-red-400"
                        : threat.color === "yellow"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  >
                    {(contentScore * 100).toFixed(1)}%
                  </span>
                </div>

                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden border border-gray-600">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      threat.color === "red"
                        ? "bg-gradient-to-r from-red-500 to-red-600"
                        : threat.color === "yellow"
                        ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                        : "bg-gradient-to-r from-green-500 to-emerald-500"
                    }`}
                    style={{ width: `${contentScore * 100}%` }}
                  />
                </div>

                <div className="mt-2 text-right">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      threat.color === "red"
                        ? "bg-red-900/50 text-red-300 border border-red-600"
                        : threat.color === "yellow"
                        ? "bg-yellow-900/50 text-yellow-300 border border-yellow-600"
                        : "bg-green-900/50 text-green-300 border border-green-600"
                    }`}
                  >
                    {threat.level} Risk
                  </span>
                </div>
              </div>

              {hasContentIndicators ? (
                <div>
                  <p className="text-gray-200 text-sm mb-3 font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-400" />
                    Content indicators found:
                  </p>
                  <div className="space-y-2">
                    {contentIndicators.map((indicator, index) => (
                      <div
                        key={index}
                        className="bg-yellow-900/40 border-2 border-yellow-600/50 rounded-lg p-3 flex items-start gap-2 animate-slide-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0" />
                        <p className="text-yellow-100 text-sm">{indicator}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-green-900/40 border-2 border-green-600/50 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <div>
                      <p className="text-green-200 font-medium text-sm">
                        All Clear!
                      </p>
                      <p className="text-green-100 text-xs mt-1">
                        No suspicious content patterns detected in the webpage.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <details className="bg-gray-800/80 rounded-xl p-4 cursor-pointer hover:bg-gray-800 transition-all group border-2 border-gray-700">
                <summary className="text-gray-200 text-sm font-medium flex items-center gap-2 select-none">
                  <Info className="w-4 h-4 text-blue-400" />
                  What did we check?
                  <span className="text-xs text-gray-400 ml-auto group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>

                <div className="mt-4 space-y-2 text-xs text-gray-300 animate-slide-in">
                  <div className="flex items-center gap-2 py-1">
                    <CheckCircle className="w-3 h-3 text-blue-400 flex-shrink-0" />
                    <span>Login forms & password fields</span>
                  </div>
                  <div className="flex items-center gap-2 py-1">
                    <CheckCircle className="w-3 h-3 text-blue-400 flex-shrink-0" />
                    <span>External links & redirects</span>
                  </div>
                  <div className="flex items-center gap-2 py-1">
                    <CheckCircle className="w-3 h-3 text-blue-400 flex-shrink-0" />
                    <span>Hidden iframes & embedded content</span>
                  </div>
                  <div className="flex items-center gap-2 py-1">
                    <CheckCircle className="w-3 h-3 text-blue-400 flex-shrink-0" />
                    <span>Suspicious JavaScript code</span>
                  </div>
                  <div className="flex items-center gap-2 py-1">
                    <CheckCircle className="w-3 h-3 text-blue-400 flex-shrink-0" />
                    <span>Brand impersonation in page content</span>
                  </div>
                  <div className="flex items-center gap-2 py-1">
                    <CheckCircle className="w-3 h-3 text-blue-400 flex-shrink-0" />
                    <span>Urgent language and scam keywords</span>
                  </div>
                  <div className="flex items-center gap-2 py-1">
                    <CheckCircle className="w-3 h-3 text-blue-400 flex-shrink-0" />
                    <span>Page content length and structure</span>
                  </div>
                  <div className="flex items-center gap-2 py-1">
                    <CheckCircle className="w-3 h-3 text-blue-400 flex-shrink-0" />
                    <span>HTTPS encryption status</span>
                  </div>
                </div>
              </details>

              <div className="bg-blue-900/40 border-2 border-blue-600/50 rounded-lg p-3 flex items-start gap-2">
                <Globe className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-blue-100 text-xs">
                  <strong>Deep scanning</strong> analyzes the actual webpage
                  content by visiting the URL and examining its HTML, forms,
                  links, and scripts for phishing indicators.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
