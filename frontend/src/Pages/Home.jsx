// Home.jsx - Enhanced AI-themed landing page
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Brain,
  Zap,
  TrendingUp,
  Globe,
  Lock,
  Activity,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Target,
  BarChart3,
  Users,
  AlertTriangle,
  Menu,
  X,
  Scan,
  Info,
  BookOpen,
} from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [statsCount, setStatsCount] = useState({
    threats: 0,
    accuracy: 0,
    scans: 0,
  });

  // Animated counter effect
  useEffect(() => {
    const animateCount = (target, key) => {
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setStatsCount((prev) => ({ ...prev, [key]: target }));
          clearInterval(timer);
        } else {
          setStatsCount((prev) => ({ ...prev, [key]: Math.floor(current) }));
        }
      }, 30);
    };

    animateCount(15420, "threats");
    animateCount(98, "accuracy");
    animateCount(47300, "scans");
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Detection",
      description:
        "Advanced machine learning model trained on millions of phishing patterns",
      gradient: "from-blue-500 to-cyan-500",
      delay: "0s",
    },
    {
      icon: Shield,
      title: "4-Layer Protection",
      description: "Google Safe Browsing, VirusTotal, URLhaus + Custom ML",
      gradient: "from-purple-500 to-pink-500",
      delay: "0.1s",
    },
    {
      icon: Zap,
      title: "Real-time SMS Alerts",
      description:
        "Instant threat notifications to keep your team protected 24/7",
      gradient: "from-orange-500 to-red-500",
      delay: "0.2s",
    },
    {
      icon: Globe,
      title: "African SME Focus",
      description:
        "Built specifically for African businesses facing unique cyber threats",
      gradient: "from-green-500 to-teal-500",
      delay: "0.3s",
    },
  ];

  const threatTypes = [
    { name: "Banking Scams", count: "47%", color: "text-red-400" },
    { name: "Mobile Money", count: "23%", color: "text-orange-400" },
    { name: "Payment Fraud", count: "18%", color: "text-yellow-400" },
    { name: "Other", count: "12%", color: "text-blue-400" },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background effects */}
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
                      className="px-4 py-2 text-white bg-white/10 rounded-xl transition-all duration-300 text-sm font-medium"
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
                      className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 text-sm font-medium flex items-center gap-2"
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
                      className="block px-4 py-3 text-white bg-white/10 rounded-xl text-sm font-medium"
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
                      className="px-4 py-3 text-white hover:bg-white/10 rounded-xl text-sm font-medium flex items-center gap-2"
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
        <section className="container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-5xl mx-auto text-center">
            {/* AI Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-blue-400/30 text-blue-300 px-5 py-3 rounded-full text-sm font-medium mb-8 shadow-lg shadow-blue-500/10 animate-fade-in">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span>Next-Generation AI Security</span>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight animate-fade-in">
              Stop Phishing
              <br />
              <span className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Before It Strikes
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 animate-fade-in">
              AI-powered phishing detection protecting African SMEs from cyber
              threats. Real-time analysis. Instant alerts. Zero compromise.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in">
              <Link
                to="/detect"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-[1.05] shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 flex items-center gap-3"
              >
                <Shield className="w-6 h-6" />
                <span>Start Scanning Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-[1.05] flex items-center gap-2"
              >
                <span>Learn More</span>
                <Info className="w-5 h-5" />
              </Link>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-blue-400/50 transition-all">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <AlertTriangle className="w-6 h-6 text-blue-400" />
                    <div className="text-4xl font-bold text-white">
                      {statsCount.threats.toLocaleString()}+
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm font-medium">
                    Threats Blocked
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-purple-400/50 transition-all">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <Target className="w-6 h-6 text-purple-400" />
                    <div className="text-4xl font-bold text-white">
                      {statsCount.accuracy}%
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm font-medium">
                    Detection Accuracy
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-green-400/50 transition-all">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <Activity className="w-6 h-6 text-green-400" />
                    <div className="text-4xl font-bold text-white">
                      {statsCount.scans.toLocaleString()}+
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm font-medium">
                    Scans Completed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Powered by{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Advanced AI
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Five layers of protection working together to keep you safe
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative animate-fade-in"
                  style={{ animationDelay: feature.delay }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 rounded-3xl blur-xl transition-all duration-500`}
                  ></div>
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all duration-300 hover:scale-[1.02]">
                    <div
                      className={`inline-flex p-4 bg-gradient-to-br ${feature.gradient} rounded-2xl mb-6`}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
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
          </div>
        </section>

        {/* Threat Intelligence */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-400/30 text-red-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                      <Activity className="w-4 h-4 animate-pulse" />
                      <span>Live Threat Intelligence</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      Real-time African Threat Monitoring
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-6">
                      Our AI tracks and analyzes phishing patterns targeting
                      African businesses, providing up-to-date protection
                      against evolving threats.
                    </p>
                    <Link
                      to="/detect"
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold group"
                    >
                      <span>Check a suspicious link</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  <div className="space-y-4">
                    <div className="text-sm text-gray-400 font-semibold mb-4">
                      Top Threats Detected
                    </div>
                    {threatTypes.map((threat, index) => (
                      <div
                        key={index}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">
                            {threat.name}
                          </span>
                          <span className={`${threat.color} font-bold`}>
                            {threat.count}
                          </span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div
                            className={`bg-gradient-to-r ${threat.color.replace(
                              "text",
                              "from"
                            )}-500 to-transparent h-2 rounded-full transition-all duration-1000`}
                            style={{
                              width: threat.count,
                              animationDelay: `${index * 0.1}s`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 rounded-3xl blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-12 md:p-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Ready to Protect Your Business?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join thousands of African SMEs using PhishAI to stay safe from
                  phishing attacks
                </p>
                <Link
                  to="/detect"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-[1.05] shadow-2xl shadow-purple-500/50"
                >
                  <Shield className="w-6 h-6" />
                  <span>Start Free Scan</span>
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </div>
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
              © 2025 EndPhishAI. Protecting African SMEs from cyber threats.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
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
