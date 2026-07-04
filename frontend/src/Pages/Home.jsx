import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LiveThreatDemo from "../components/LiveThreatDemo";
import Navbar from "../components/Navbar";
import {
  Shield,
  Brain,
  Zap,
  Globe,
  Lock,
  Activity,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Target,
  Users,
  AlertTriangle,
  Menu,
  X,
  Scan,
  Info,
  BookOpen,
  Code,
  MessageSquare,
} from "lucide-react";

export default function Home() {
  const [, setScanCount] = useState(0);

  useEffect(() => {
    // Fetch real scan count from backend
    fetch(`${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}/`)
      .then((r) => r.json())
      .then((d) => {
        if (d.total_scans) setScanCount(d.total_scans);
      })
      .catch(() => {});
  }, []);

  const features = [
    {
      icon: Brain,
      title: "Multilingual AI Detection",
      description:
        "Detects phishing in English, Swahili, Hausa, Yoruba, Pidgin and French. The only engine built for non-English attack patterns.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Shield,
      title: "7-Layer Protection",
      description:
        "Google Safe Browsing, VirusTotal, PhishTank, URLhaus, custom ML model, NLP analysis, and structural heuristics.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Globe,
      title: "African Brand Protection",
      description:
        "Catches impersonation of MTN, M-Pesa, GTBank, Airtel, Safaricom — brands Western tools miss entirely.",
      gradient: "from-green-500 to-teal-500",
    },
    {
      icon: Code,
      title: "API Access",
      description:
        "Integrate EndPhishAI into your own app or platform. Simple REST API, JSON responses, built for developers.",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const languages = [
    "English",
    "Swahili",
    "Hausa",
    "Yoruba",
    "Pidgin",
    "French",
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background */}
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

      <Navbar />

      <div className="relative z-10">
        {/* Hero */}
        <section className="container mx-auto px-4 pt-36 pb-20 max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/30 text-blue-300 px-5 py-2.5 rounded-full text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Top 3 — AfriHackBox Pan-African Cybersecurity Hackathon</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Phishing Detection
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              in Any Language
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-6 leading-relaxed">
            The only phishing engine that understands how attackers write in
            Swahili, Hausa, Yoruba and Pidgin. Built for markets Western
            security tools ignore.
          </p>

          {/* Language pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {languages.map((lang) => (
              <span
                key={lang}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
              >
                {lang}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/detect"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-[1.03] shadow-2xl shadow-purple-500/30"
            >
              <Shield className="w-5 h-5" />
              <span>Scan for Threats</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-2xl font-bold text-lg transition-all duration-300"
            >
              <span>How It Works</span>
            </Link>
          </div>
        </section>

        {/* Stats — real only */}
        <section className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Protection Layers",
                value: "7",
                icon: Shield,
                color: "text-blue-400",
              },
              {
                label: "Languages Covered",
                value: "6",
                icon: Globe,
                color: "text-green-400",
              },
              {
                label: "African Brands Protected",
                value: "30+",
                icon: Target,
                color: "text-purple-400",
              },
              {
                label: "Hackathon Placement",
                value: "Top 3",
                icon: Sparkles,
                color: "text-yellow-400",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-all"
              >
                <s.icon className={`w-6 h-6 ${s.color} mx-auto mb-2`} />
                <div className="text-3xl font-bold text-white mb-1">
                  {s.value}
                </div>
                <p className="text-gray-400 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 py-20 max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What Makes It{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Different
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Not another URL checker. A multilingual threat intelligence
              engine.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div key={i} className="group relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-10 rounded-3xl blur-xl transition-all duration-500`}
                />
                <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all h-full">
                  <div
                    className={`inline-flex p-4 bg-gradient-to-br ${f.gradient} rounded-2xl mb-5`}
                  >
                    <f.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {f.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <LiveThreatDemo />
        {/* Who it's for */}
        <section className="container mx-auto px-4 py-16 max-w-5xl">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
            <div className="relative bg-white/5 border border-white/10 rounded-3xl p-10 md:p-14">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                Built For These Problems
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: MessageSquare,
                    title: "SMS Scams",
                    desc: '"Thibitisha akaunti yako ya M-Pesa" — Swahili phishing that no Western tool catches.',
                    color: "text-red-400",
                  },
                  {
                    icon: AlertTriangle,
                    title: "Bank Impersonation",
                    desc: "GTBank, FirstBank, Zenith fake login pages targeting Nigerian and Ghanaian users.",
                    color: "text-orange-400",
                  },
                  {
                    icon: Globe,
                    title: "Diaspora Targeting",
                    desc: "Immigrants in Canada, UK and US targeted with scams in their native languages.",
                    color: "text-yellow-400",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6"
                  >
                    <item.icon className={`w-8 h-8 ${item.color} mb-4`} />
                    <h3 className="text-white font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 py-20 max-w-4xl text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 rounded-3xl blur-2xl" />
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-12 md:p-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Try It Now. Free.
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-xl mx-auto">
                Paste any URL, SMS, or email. Get a verdict in under 2 seconds.
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
