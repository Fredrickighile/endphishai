// import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import {
  Shield,
  Brain,
  Globe,
  Target,
  Zap,
  Activity,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Scan,
  Info,
  Menu,
  X,
  Award,
  Users,
  AlertTriangle,
  Lock,
  BookOpen,
  Code,
  MessageSquare,
} from "lucide-react";

export default function About() {
  const capabilities = [
    {
      icon: Brain,
      title: "Multilingual NLP Engine",
      description:
        "Custom-built intent classifier that reads phishing signals in English, Swahili, Hausa, Yoruba, Pidgin and French. Detects urgency, credential harvesting, and threat language across all six.",
      gradient: "from-blue-500 to-cyan-500",
      badge: "6 Languages",
    },
    {
      icon: Shield,
      title: "7-Layer Detection",
      description:
        "Every scan runs through: custom ML model (Random Forest), structural heuristics, NLP intent analysis, Google Safe Browsing, VirusTotal, PhishTank, and URLhaus.",
      gradient: "from-purple-500 to-pink-500",
      badge: "7 Layers",
    },
    {
      icon: Target,
      title: "Homoglyph & Typosquat Detection",
      description:
        "Catches paypa1.com, g00gle.com, arnazon.com and 30+ African brand impersonations that character-substitution attacks rely on. Most tools miss these entirely.",
      gradient: "from-orange-500 to-red-500",
      badge: "Advanced",
    },
    {
      icon: Globe,
      title: "African Brand Intelligence",
      description:
        "Specifically trained to detect impersonation of MTN, M-Pesa, Safaricom, GTBank, FirstBank, Airtel, Flutterwave, Paystack and more. No Western tool covers these.",
      gradient: "from-green-500 to-emerald-500",
      badge: "30+ Brands",
    },
  ];

  const techStack = [
    {
      layer: "Layer 1",
      name: "Custom ML Model",
      detail: "Random Forest trained on 10,000+ phishing samples",
      status: "Active",
    },
    {
      layer: "Layer 2",
      name: "Structural Heuristics",
      detail: "URL patterns, TLD analysis, homoglyphs, typosquats",
      status: "Active",
    },
    {
      layer: "Layer 3",
      name: "Multilingual NLP",
      detail: "Intent classification in 6 languages",
      status: "Active",
    },
    {
      layer: "Layer 4",
      name: "Google Safe Browsing",
      detail: "Real-time threat database lookup",
      status: "Active",
    },
    {
      layer: "Layer 5",
      name: "VirusTotal",
      detail: "70+ antivirus engine consensus",
      status: "Active",
    },
    {
      layer: "Layer 6",
      name: "PhishTank",
      detail: "Community-verified phishing database",
      status: "Active",
    },
    {
      layer: "Layer 7",
      name: "URLhaus",
      detail: "Malware URL intelligence feed",
      status: "Active",
    },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Nav */}
      <Navbar />

      <div className="relative z-10 pt-28">
        {/* Hero */}
        <section className="container mx-auto px-4 py-16 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-400/30 text-yellow-300 px-5 py-2.5 rounded-full text-sm font-medium mb-8">
            <Award className="w-4 h-4" />
            <span>
              Top 3 Finalist · AfriHackBox Pan-African Cybersecurity Hackathon
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            The Gap Nobody
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Was Filling
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Every major phishing detection tool is trained on English data,
            built for Western markets. 1.4 billion people across Africa, South
            Asia and diaspora communities worldwide receive phishing attacks in
            their native languages — and existing tools catch almost none of it.
            EndPhishAI was built to fix that.
          </p>
        </section>

        {/* The problem */}
        <section className="container mx-auto px-4 py-12 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: MessageSquare,
                title: "The SMS Problem",
                desc: '"Thibitisha akaunti yako ya M-Pesa haraka!" — This Swahili phishing message bypasses every major security tool. Millions of East Africans receive messages like this daily.',
                color: "from-red-500/20 to-orange-500/20",
                border: "border-red-500/30",
                iconColor: "text-red-400",
              },
              {
                icon: AlertTriangle,
                title: "The Bank Problem",
                desc: "GTBank, FirstBank, Zenith, MTN and Airtel are impersonated constantly. No Western threat database has these brands in their training data.",
                color: "from-orange-500/20 to-yellow-500/20",
                border: "border-orange-500/30",
                iconColor: "text-orange-400",
              },
              {
                icon: Users,
                title: "The Diaspora Problem",
                desc: "Nigerian, Kenyan and Ghanaian immigrants in Canada, UK and US are targeted in their home languages. Canadian banks serve these communities with zero specialized protection.",
                color: "from-yellow-500/20 to-green-500/20",
                border: "border-yellow-500/30",
                iconColor: "text-yellow-400",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br ${item.color} border ${item.border} rounded-2xl p-6`}
              >
                <item.icon className={`w-8 h-8 ${item.iconColor} mb-4`} />
                <h3 className="text-white font-bold text-lg mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Capabilities */}
        <section className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              What It Actually{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Does
              </span>
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Real capabilities. No marketing fluff.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {capabilities.map((c, i) => (
              <div key={i} className="group relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${c.gradient} opacity-0 group-hover:opacity-10 rounded-3xl blur-xl transition-all`}
                />
                <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all h-full">
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={`inline-flex p-4 bg-gradient-to-br ${c.gradient} rounded-2xl`}
                    >
                      <c.icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-semibold text-white">
                      {c.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {c.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {c.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Detection{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Architecture
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              Every scan runs through all 7 layers simultaneously.
            </p>
          </div>
          <div className="space-y-3">
            {techStack.map((layer, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded-lg w-16 text-center">
                    {layer.layer}
                  </span>
                  <div>
                    <p className="text-white font-semibold">{layer.name}</p>
                    <p className="text-gray-400 text-sm">{layer.detail}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-xs font-medium">
                    {layer.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* API Section */}
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
            <div className="relative bg-white/5 border border-white/10 rounded-3xl p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Public API</h2>
                  <p className="text-gray-400 text-sm">
                    Integrate EndPhishAI into your own platform
                  </p>
                </div>
              </div>
              <div className="bg-black/50 rounded-2xl p-6 font-mono text-sm mb-6 overflow-x-auto">
                <div className="text-green-400 mb-2">
                  # Scan any URL or message
                </div>
                <div className="text-gray-300">
                  <span className="text-blue-400">POST</span>{" "}
                  https://endphishai-api.onrender.com/predict
                </div>
                <div className="text-gray-500 mt-3">{"{"}</div>
                <div className="text-gray-300 ml-4">
                  "text": "URGENT: Your MTN account suspended. Verify:
                  http://mtn-verify.xyz"
                </div>
                <div className="text-gray-500">{"}"}</div>
                <div className="text-gray-500 mt-3">{"// Response"}</div>
                <div className="text-gray-500">{"{"}</div>
                <div className="text-gray-300 ml-4">
                  "final_status":{" "}
                  <span className="text-red-400">"phishing"</span>,
                </div>
                <div className="text-gray-300 ml-4">
                  "ai_score": <span className="text-yellow-400">0.95</span>,
                </div>
                <div className="text-gray-300 ml-4">
                  "explanation":{" "}
                  <span className="text-green-400">
                    "Urgency + MTN impersonation + suspicious TLD"
                  </span>
                </div>
                <div className="text-gray-500">{"}"}</div>
              </div>
              <p className="text-gray-400 text-sm">
                Free to use. No API key required for basic usage. Built for
                developers, security teams, and businesses who want to integrate
                phishing detection into their own products.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 py-20 max-w-4xl text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 rounded-3xl blur-2xl" />
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Try It Right Now
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-xl mx-auto">
                Paste any suspicious URL, SMS, or email. Free. No account
                needed.
              </p>
              <Link
                to="/detect"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-[1.05] shadow-2xl shadow-purple-500/50"
              >
                <Shield className="w-6 h-6" />
                <span>Start Scanning</span>
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </section>
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
              <span className="text-green-400 text-sm font-medium">
                All Systems Operational
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
