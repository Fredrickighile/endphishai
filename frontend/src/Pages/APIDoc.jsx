import { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import {
  Brain,
  Code,
  Copy,
  CheckCircle,
  Globe,
  Shield,
  Zap,
  Lock,
  ChevronDown,
  ChevronUp,
  Terminal,
  AlertTriangle,
} from "lucide-react";

const API_BASE = "https://endphishai-api.onrender.com";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="flex items-center gap-1 px-2 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs text-gray-300 transition-all"
    >
      {copied ? (
        <CheckCircle className="w-3 h-3 text-green-400" />
      ) : (
        <Copy className="w-3 h-3" />
      )}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function CodeBlock({ code, language = "bash" }) {
  return (
    <div className="relative bg-black/60 border border-white/10 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
        <span className="text-gray-500 text-xs font-mono">{language}</span>
        <CopyButton text={code} />
      </div>
      <pre className="p-4 text-sm text-gray-300 font-mono overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function LiveDemo() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const [lastRun, setLastRun] = useState(0);
  const run = async () => {
    if (Date.now() - lastRun < 3000) return; // 3 second cooldown
    setLastRun(Date.now());
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const isUrl = input.startsWith("http://") || input.startsWith("https://");
      const body = isUrl ? { url: input } : { text: input };
      const r = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setResult(await r.json());
    } catch {
      setError("Could not reach API. Check your connection.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Terminal className="w-5 h-5 text-green-400" />
        <span className="text-white font-semibold">Live API Console</span>
        <span className="text-xs text-gray-500 ml-auto">No auth required</span>
      </div>
      <div className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && run()}
          placeholder="Paste a URL or message to scan..."
          className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-400/50 font-mono"
        />
        <button
          onClick={run}
          disabled={loading || !input.trim()}
          className="px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 disabled:opacity-40 text-white rounded-xl font-semibold text-sm transition-all"
        >
          {loading ? "..." : "Run"}
        </button>
      </div>
      {result && (
        <div className="bg-black/60 border border-white/10 rounded-xl p-4 font-mono text-xs overflow-x-auto">
          <pre
            className={
              result.final_status === "phishing"
                ? "text-red-300"
                : result.final_status === "suspicious"
                  ? "text-yellow-300"
                  : "text-green-300"
            }
          >
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-300 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}

function Endpoint({ method, path, description, request, response, notes }) {
  const [open, setOpen] = useState(false);
  const methodColor =
    method === "POST"
      ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
      : "bg-green-500/20 text-green-300 border-green-500/30";
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/5 transition-all"
      >
        <span
          className={`px-2 py-1 rounded-lg text-xs font-bold border ${methodColor}`}
        >
          {method}
        </span>
        <code className="text-white font-mono text-sm">{path}</code>
        <span className="text-gray-400 text-sm ml-2">{description}</span>
        <span className="ml-auto text-gray-500">
          {open ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 space-y-4 border-t border-white/10 pt-4">
          {notes && (
            <div className="flex items-start gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3">
              <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-yellow-300 text-xs">{notes}</p>
            </div>
          )}
          <div>
            <p className="text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wider">
              Request Body
            </p>
            <CodeBlock code={request} language="json" />
          </div>
          <div>
            <p className="text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wider">
              Response
            </p>
            <CodeBlock code={response} language="json" />
          </div>
        </div>
      )}
    </div>
  );
}

export default function APIDoc() {
  const endpoints = [
    {
      method: "POST",
      path: "/predict",
      description: "Scan a URL or text message for phishing",
      notes:
        "The primary endpoint. Accepts either a URL or free-text (SMS, email body, WhatsApp message). Runs all 7 detection layers and returns a verdict with explanation.",
      request: JSON.stringify(
        {
          text: "URGENT: Your MTN account suspended. Verify: http://mtn-verify.xyz",
        },
        null,
        2,
      ),
      response: JSON.stringify(
        {
          final_status: "phishing",
          ai_result: "phishing",
          ai_score: 1.0,
          explanation:
            "Suspicious domain extension (.xyz); Potential MTN impersonation; No secure connection (HTTP)",
          heuristic_score: 1.0,
          ml_score: null,
          method: "Enhanced Heuristics + NLP AI",
          google_result: "unknown",
          virustotal_result: "unknown",
          nlp_analysis: {
            score: 0.57,
            indicators: [
              "Urgency + Action Required",
              "Brand impersonation attempt (mtn)",
            ],
            method: "Linguistic Pattern Analysis",
          },
        },
        null,
        2,
      ),
    },
    {
      method: "GET",
      path: "/",
      description: "Service status and capability check",
      request: "// No body required — GET request",
      response: JSON.stringify(
        {
          service: "PhishAI Detection Service",
          status: "running",
          version: "5.0",
          ml_available: true,
          protection_layers: 7,
          supported_files: ["PDF", "TXT", "CSV", "HTML", "DOCX"],
        },
        null,
        2,
      ),
    },
    {
      method: "GET",
      path: "/health",
      description: "Health check endpoint for monitoring",
      request: "// No body required — GET request",
      response: JSON.stringify({ status: "healthy" }, null, 2),
    },
    {
      method: "POST",
      path: "/send-sms",
      description: "Send an SMS phishing alert to a phone number",
      notes:
        "Requires Twilio credentials configured on the server. Returns 503 if SMS is not configured.",
      request: JSON.stringify(
        {
          phoneNumber: "+2348012345678",
          threat: "phishing",
          url: "http://gtbank-alert.ml/verify",
        },
        null,
        2,
      ),
      response: JSON.stringify(
        {
          success: true,
          sid: "SM1234567890abcdef",
          to: "+2348012345678",
        },
        null,
        2,
      ),
    },
  ];

  const curlExample = `curl -X POST ${API_BASE}/predict \\
  -H "Content-Type: application/json" \\
  -d '{"text": "HARAKA! Akaunti yako ya M-Pesa imefungwa. Thibitisha: http://mpesa-verify.tk"}'`;

  const pythonExample = `import requests

response = requests.post(
    "${API_BASE}/predict",
    json={"text": "URGENT: Your GTBank account suspended. Verify: http://gtbank-alert.ml"}
)

result = response.json()
print(result["final_status"])  # "phishing"
print(result["ai_score"])      # 1.0
print(result["explanation"])   # "Suspicious domain extension (.ml)..."`;

  const jsExample = `const response = await fetch("${API_BASE}/predict", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    text: "Gaggawa! Asusun MTN ka an kulle: http://mtn-secure.xyz/verify"
  })
});

const result = await response.json();
// result.final_status === "phishing"
// result.nlp_analysis.indicators includes "Brand impersonation attempt (mtn)"`;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-3xl animate-pulse" />
      </div>
      <Navbar />
      <div className="relative z-10 container mx-auto px-4 pt-28 pb-20 max-w-5xl">
        {/* Hero */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/30 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Code className="w-4 h-4" />
            <span>REST API — Free to use, no auth required</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            EndPhishAI API
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed mb-6">
            Integrate multilingual phishing detection into any app, platform, or
            workflow. Detects threats in English, Swahili, Hausa, Yoruba, French
            and Pidgin. No API key required to get started.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { icon: Globe, label: "6 Languages", color: "text-green-400" },
              {
                icon: Shield,
                label: "7 Detection Layers",
                color: "text-blue-400",
              },
              { icon: Zap, label: "< 2s Response", color: "text-yellow-400" },
              {
                icon: Lock,
                label: "No Auth Required",
                color: "text-purple-400",
              },
            ].map((b, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl"
              >
                <b.icon className={`w-4 h-4 ${b.color}`} />
                <span className="text-gray-300 text-sm">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Base URL */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8">
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Base URL
          </p>
          <div className="flex items-center justify-between">
            <code className="text-green-400 font-mono text-sm">{API_BASE}</code>
            <CopyButton text={API_BASE} />
          </div>
        </div>

        {/* Live console */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Try It Live</h2>
          <LiveDemo />
        </div>

        {/* Quick start */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Start</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                <Terminal className="w-4 h-4" /> cURL
              </p>
              <CodeBlock code={curlExample} language="bash" />
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">Python</p>
              <CodeBlock code={pythonExample} language="python" />
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">JavaScript / Node</p>
              <CodeBlock code={jsExample} language="javascript" />
            </div>
          </div>
        </div>

        {/* Endpoints */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Endpoints</h2>
          <div className="space-y-3">
            {endpoints.map((ep, i) => (
              <Endpoint key={i} {...ep} />
            ))}
          </div>
        </div>

        {/* Response fields */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Response Reference
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-gray-400 font-semibold">
                    Field
                  </th>
                  <th className="text-left p-4 text-gray-400 font-semibold">
                    Type
                  </th>
                  <th className="text-left p-4 text-gray-400 font-semibold">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["final_status", "string", "phishing | suspicious | safe"],
                  [
                    "ai_score",
                    "float",
                    "Confidence 0.0–1.0. Above 0.65 = phishing",
                  ],
                  [
                    "explanation",
                    "string",
                    "Human-readable reason for the verdict",
                  ],
                  [
                    "heuristic_score",
                    "float",
                    "Score from structural/URL analysis layer",
                  ],
                  [
                    "ml_score",
                    "float | null",
                    "ML model score (null if model not loaded)",
                  ],
                  ["google_result", "string", "safe | malicious | unknown"],
                  [
                    "virustotal_result",
                    "string",
                    "safe | malicious | suspicious | unknown",
                  ],
                  [
                    "nlp_analysis.score",
                    "float",
                    "Multilingual intent analysis score",
                  ],
                  [
                    "nlp_analysis.indicators",
                    "array",
                    "List of detected phishing signals",
                  ],
                  ["method", "string", "Detection method(s) used"],
                ].map(([field, type, desc], i) => (
                  <tr
                    key={i}
                    className="border-b border-white/5 hover:bg-white/5 transition-all"
                  >
                    <td className="p-4">
                      <code className="text-blue-300 font-mono">{field}</code>
                    </td>
                    <td className="p-4 text-yellow-300 font-mono text-xs">
                      {type}
                    </td>
                    <td className="p-4 text-gray-400">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Limitations */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Known Limitations
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
            {[
              [
                "Social engineering without URLs",
                "Messages like 'Hi, it's IT support, I need your password' contain no URLs or suspicious domains. Automated tools including this API cannot reliably detect them. Human judgment required.",
              ],
              [
                "New phishing domains",
                "A domain registered 10 minutes ago won't appear in Google Safe Browsing or VirusTotal databases yet. EndPhishAI's structural analysis still catches suspicious TLDs and brand impersonation, but zero-day domains with clean TLDs may score lower.",
              ],
              [
                "Rate limits",
                "Free tier: no hard rate limit, but please be reasonable. High-volume commercial use requires contacting us.",
              ],
            ].map(([title, desc], i) => (
              <div key={i} className="flex gap-3">
                <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-sm font-semibold">{title}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
          <div className="relative bg-white/5 border border-white/10 rounded-3xl p-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-3">
              Ready to integrate?
            </h2>
            <p className="text-gray-400 mb-6">
              The API is live. No sign-up, no API key, no rate limits for
              reasonable use.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/detect"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold transition-all hover:scale-[1.03]"
              >
                <Shield className="w-5 h-5" />
                Try the Scanner
              </Link>
              <a
                href="https://github.com/Fredrickighile/endphishai"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-semibold transition-all"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="relative z-10 border-t border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold">EndPhishAI</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 EndPhishAI · Top 3 AfriHackBox Hackathon
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-sm">API Online</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
