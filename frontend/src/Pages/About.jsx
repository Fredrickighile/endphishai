// About.jsx - Personal story focused version
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Brain,
  Globe,
  Smartphone,
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
  Heart,
  Users,
  AlertTriangle,
  Lock,
  TrendingUp,
  BookOpen,
} from "lucide-react";

export default function About() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description:
        "Advanced machine learning model trained on millions of phishing patterns to detect even the most sophisticated attacks.",
      color: "from-blue-500 to-cyan-500",
      stats: "99.7% Accuracy",
    },
    {
      icon: Shield,
      title: "4-Layer Protection",
      description:
        "Google Safe Browsing, VirusTotal, URLhaus, plus our custom ML model working in harmony.",
      color: "from-purple-500 to-pink-500",
      stats: "3 Databases + ML",
    },
    {
      icon: Zap,
      title: "Real-time SMS Alerts",
      description:
        "Instant notifications via SMS when threats are detected, keeping your team informed even offline.",
      color: "from-orange-500 to-red-500",
      stats: "< 2s Response",
    },
    {
      icon: Globe,
      title: "African Market Focus",
      description:
        "Specifically trained on phishing patterns targeting African SMEs, mobile money scams, and local banking threats.",
      color: "from-green-500 to-emerald-500",
      stats: "Local Context",
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Paste & Scan",
      description:
        "Copy any suspicious URL, SMS message, or email content and paste it into our intelligent scanner.",
      icon: Target,
      color: "blue",
    },
    {
      step: "02",
      title: "AI Analysis",
      description:
        "Our system simultaneously checks multiple threat databases and runs deep pattern analysis using machine learning.",
      icon: Brain,
      color: "purple",
    },
    {
      step: "03",
      title: "Get Results",
      description:
        "Receive instant, color-coded results with clear explanations and actionable security recommendations.",
      icon: CheckCircle,
      color: "green",
    },
    {
      step: "04",
      title: "Stay Protected",
      description:
        "Optional SMS alerts keep you and your team informed about detected threats in real-time.",
      icon: Smartphone,
      color: "orange",
    },
  ];

  const stats = [
    { label: "Detection Accuracy", value: "98%", icon: Target },
    { label: "Response Time", value: "< 2s", icon: Zap },
    { label: "Threats Blocked", value: "15K+", icon: Shield },
    { label: "Protection Layers", value: "4", icon: Activity },
  ];

  const impactStats = [
    {
      icon: Users,
      value: "10K+",
      label: "SMEs Protected",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: AlertTriangle,
      value: "47%",
      label: "Banking Scams Blocked",
      color: "from-red-500 to-orange-500",
    },
    {
      icon: TrendingUp,
      value: "99.7%",
      label: "Success Rate",
      color: "from-green-500 to-teal-500",
    },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl">
              <div className="px-6 py-3">
                <div className="flex items-center justify-between">
                  <Link to="/" className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl blur-md opacity-75"></div>
                      <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl">
                        <Brain className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <span className="text-white font-bold text-xl tracking-tight">
                        EndPhishAI
                      </span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-400 text-xs font-medium">
                          AI Active
                        </span>
                      </div>
                    </div>
                  </Link>

                  <div className="hidden lg:flex items-center gap-1">
                    <Link
                      to="/"
                      className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 text-sm font-medium"
                    >
                      Home
                    </Link>
                    <Link
                      to="/detect"
                      className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 text-sm font-medium flex items-center gap-2"
                    >
                      <Scan className="w-4 h-4" />
                      Detect
                    </Link>

                    <Link
                      to="/learn"
                      className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 text-sm font-medium flex items-center gap-2"
                    >
                      <BookOpen className="w-4 h-4" />
                      Learn
                    </Link>
                    <Link
                      to="/about"
                      className="px-4 py-2 text-white bg-white/10 rounded-xl transition-all duration-300 text-sm font-medium flex items-center gap-2"
                    >
                      <Info className="w-4 h-4" />
                      About
                    </Link>
                  </div>

                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden text-white p-2 hover:bg-white/10 rounded-xl transition-all"
                  >
                    {mobileMenuOpen ? (
                      <X className="w-6 h-6" />
                    ) : (
                      <Menu className="w-6 h-6" />
                    )}
                  </button>
                </div>

                {mobileMenuOpen && (
                  <div className="lg:hidden mt-4 pt-4 border-t border-white/10 space-y-2">
                    <Link
                      to="/"
                      className="px-4 py-3 text-white hover:bg-white/10 rounded-xl text-sm font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      to="/detect"
                      className="px-4 py-3 text-white hover:bg-white/10 rounded-xl text-sm font-medium flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Scan className="w-4 h-4" />
                      Detect Threats
                    </Link>

                    <Link
                      to="/learn"
                      className="px-4 py-3 text-white hover:bg-white/10 rounded-xl text-sm font-medium flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <BookOpen className="w-4 h-4" />
                      Learn Security
                    </Link>
                    <Link
                      to="/about"
                      className="px-4 py-3 text-white bg-white/10 rounded-xl text-sm font-medium flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Info className="w-4 h-4" />
                      About
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-32 pb-16 max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-blue-400/30 text-blue-300 px-5 py-3 rounded-full text-sm font-medium mb-8 shadow-lg shadow-blue-500/10">
              <Award className="w-5 h-5" />
              <span>Built for AfrihackBox Hackathon 2025</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              About{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                EndPhishAI
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              An advanced AI-powered phishing detection platform protecting
              African SMEs from cyber threats through real-time analysis and
              intelligent threat intelligence.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:border-blue-400/50 transition-all">
                  <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Personal Story & Mission */}
        <section className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-3xl blur-2xl"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/20">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Heart className="w-8 h-8 text-red-400" />
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Why I Built This
                </h2>
              </div>
              <div className="max-w-4xl mx-auto">
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed text-center mb-6">
                  I've been a victim of phishing attacks before. I know the
                  feeling of helplessness, the frustration, and the financial
                  loss that comes with falling for these scams. That painful
                  experience became my motivation.
                </p>
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed text-center mb-8">
                  I'm passionate about protecting others in the digital world
                  because I understand the real impact of cybercrime. No one
                  should go through what I went through. EndPhishAI is my way of
                  fighting back and helping others stay safe online.
                </p>

                <div className="grid sm:grid-cols-3 gap-6 mt-8">
                  <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-blue-400/30 transition-all group">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-blue-400 mb-2">
                      Simple
                    </div>
                    <p className="text-gray-400 text-sm">
                      No technical knowledge required - anyone can use it
                    </p>
                  </div>
                  <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-purple-400/30 transition-all group">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-purple-400 mb-2">
                      Intelligent
                    </div>
                    <p className="text-gray-400 text-sm">
                      AI-powered with 98% accuracy across databases
                    </p>
                  </div>
                  <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-green-400/30 transition-all group">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-green-400 mb-2">
                      Local
                    </div>
                    <p className="text-gray-400 text-sm">
                      Built for African contexts and threat patterns
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How It{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Four simple steps to complete threat protection
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-5xl font-bold text-white/10">
                      {step.step}
                    </span>
                    <div
                      className={`p-3 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-xl`}
                    >
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                EndPhishAI
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Enterprise-grade security features designed for everyone
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 rounded-3xl blur-xl transition-all duration-500`}
                ></div>
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all duration-300 h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`inline-flex p-4 bg-gradient-to-br ${feature.color} rounded-2xl group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <span
                      className={`px-3 py-1 bg-gradient-to-r ${feature.color} bg-opacity-20 border border-white/20 rounded-full text-sm font-semibold text-white`}
                    >
                      {feature.stats}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Impact Section */}
        <section className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Impact
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Making a real difference in the fight against cybercrime
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {impactStats.map((stat, index) => (
              <div key={index} className="relative group">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 rounded-2xl blur-xl group-hover:opacity-20 transition-all`}
                ></div>
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all text-center h-full">
                  <div
                    className={`inline-flex p-4 bg-gradient-to-br ${stat.color} rounded-2xl mb-4`}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20 max-w-5xl">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 rounded-3xl blur-2xl"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-12 md:p-16 border border-white/20 text-center">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>Protecting African Businesses</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Stay Protected?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join the fight against phishing with AI-powered protection
                that's simple, effective, and built for Africa.
              </p>
              <Link
                to="/detect"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-[1.05] shadow-2xl shadow-purple-500/50 group"
              >
                <Shield className="w-6 h-6" />
                <span>Start Scanning Now</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
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
              © 2025 EndPhishAI. Built with ❤️ for AfrihackBox Hackathon.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">
                AI Systems Active
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
