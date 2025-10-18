import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Brain,
  AlertTriangle,
  Lock,
  Eye,
  Mail,
  Smartphone,
  Globe,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  BookOpen,
  Target,
  Users,
  CreditCard,
  Link2,
  Scan,
  Info,
  Menu,
  X,
  Zap,
  TrendingUp,
  Award,
  ArrowRight,
  Star,
  Trophy,
  PlayCircle,
  Sparkles,
  Flame,
  Clock,
  MessageCircle,
} from "lucide-react";

export default function Learn() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [activeSection, setActiveSection] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [streak, setStreak] = useState(0);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-section]");
      const scrollPosition = window.scrollY + 200;

      sections.forEach((section, index) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (scrollPosition >= top && scrollPosition < bottom) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const phishingTypes = [
    {
      icon: Mail,
      title: "Email Phishing",
      description:
        "Fake emails pretending to be from legitimate companies asking for personal information.",
      examples: [
        "Urgent account verification requests",
        "Fake password reset emails",
        "Lottery/prize winning notifications",
      ],
      color: "from-blue-500 to-cyan-500",
      dangerLevel: 5,
    },
    {
      icon: Smartphone,
      title: "SMS/Text Phishing (Smishing)",
      description:
        "Fraudulent text messages designed to trick you into clicking malicious links or sharing data.",
      examples: [
        "Fake delivery notifications",
        "Bank security alerts",
        "Tax refund messages",
      ],
      color: "from-purple-500 to-pink-500",
      dangerLevel: 4,
    },
    {
      icon: Globe,
      title: "Website Spoofing",
      description:
        "Fake websites that look identical to real ones to steal login credentials and payment info.",
      examples: [
        "Fake banking login pages",
        "Counterfeit shopping sites",
        "Phony payment portals",
      ],
      color: "from-orange-500 to-red-500",
      dangerLevel: 5,
    },
    {
      icon: Users,
      title: "Social Media Scams",
      description:
        "Scammers using fake profiles or compromised accounts to trick victims on social platforms.",
      examples: [
        "Friend impersonation",
        "Fake investment opportunities",
        "Romance scams",
      ],
      color: "from-green-500 to-teal-500",
      dangerLevel: 4,
    },
  ];

  const redFlags = [
    {
      icon: AlertTriangle,
      title: "Urgency & Pressure",
      description:
        "Messages creating false urgency like 'Your account will be closed in 24 hours!'",
      severity: "high",
      tip: "Legitimate companies give reasonable time for responses",
    },
    {
      icon: Link2,
      title: "Suspicious Links",
      description:
        "URLs that don't match the official website or use misleading domain names.",
      severity: "high",
      tip: "Always hover over links before clicking",
    },
    {
      icon: Mail,
      title: "Generic Greetings",
      description:
        "Emails starting with 'Dear Customer' instead of your actual name.",
      severity: "medium",
      tip: "Real companies usually use your name",
    },
    {
      icon: CreditCard,
      title: "Requests for Sensitive Info",
      description:
        "Asking for passwords, PINs, credit card numbers, or OTPs via email/SMS.",
      severity: "critical",
      tip: "Never share sensitive data through email or text",
    },
    {
      icon: Eye,
      title: "Spelling & Grammar Errors",
      description:
        "Professional companies proofread their communications. Multiple errors are red flags.",
      severity: "medium",
      tip: "Poor grammar often indicates scams",
    },
    {
      icon: Globe,
      title: "Mismatched URLs",
      description:
        "Hovering over links shows different URLs than displayed (paypa1.com vs paypal.com).",
      severity: "high",
      tip: "Check the actual URL in the status bar",
    },
  ];

  const protectionSteps = [
    {
      step: "01",
      title: "Verify Before You Click",
      description:
        "Always hover over links to preview the actual URL before clicking. If in doubt, type the website address directly into your browser.",
      icon: Eye,
      actionable: "Hover over any link for 2 seconds before clicking",
    },
    {
      step: "02",
      title: "Enable Two-Factor Authentication",
      description:
        "Add an extra layer of security to your accounts. Even if scammers get your password, they can't access your account without the second factor.",
      icon: Lock,
      actionable: "Set up 2FA on all important accounts today",
    },
    {
      step: "03",
      title: "Keep Software Updated",
      description:
        "Regularly update your operating system, browsers, and security software to patch vulnerabilities that scammers exploit.",
      icon: Shield,
      actionable: "Enable automatic updates on all devices",
    },
    {
      step: "04",
      title: "Use Strong, Unique Passwords",
      description:
        "Create different passwords for each account. Use a password manager to keep track. Never reuse passwords across sites.",
      icon: Target,
      actionable: "Use a password manager like Bitwarden or 1Password",
    },
    {
      step: "05",
      title: "Look for HTTPS",
      description:
        "Before entering sensitive information, ensure the website URL starts with 'https://' and has a padlock icon in the address bar.",
      icon: Lock,
      actionable: "Check the padlock before entering any data",
    },
    {
      step: "06",
      title: "Trust Your Instincts",
      description:
        "If something feels off or too good to be true, it probably is. Take time to verify before taking action.",
      icon: Lightbulb,
      actionable: "When in doubt, contact the company directly",
    },
  ];

  const quizQuestions = [
    {
      question:
        "You receive an urgent email saying your bank account will be locked in 24 hours unless you verify your details. What should you do?",
      options: [
        "Click the link immediately to verify",
        "Reply to the email with your details",
        "Contact your bank directly using their official number",
        "Forward the email to friends for advice",
      ],
      correct: 2,
      explanation:
        "Never click links in urgent emails. Always contact your bank directly using official contact information from their website or your card.",
    },
    {
      question: "Which URL is most likely a phishing attempt for PayPal?",
      options: [
        "https://www.paypal.com",
        "https://www.paypa1.com",
        "https://paypal.com",
        "https://secure.paypal.com",
      ],
      correct: 1,
      explanation:
        "The number '1' instead of lowercase 'L' is a classic trick. Always check URLs carefully for character substitutions.",
    },
    {
      question:
        "A text message claims you have a package delivery. The link starts with 'http://' (not https). Should you click it?",
      options: [
        "Yes, it's just a delivery notification",
        "Yes, but only on WiFi",
        "No, legitimate sites use HTTPS for security",
        "Yes, if it looks official",
      ],
      correct: 2,
      explanation:
        "Legitimate delivery services and any site handling personal data use HTTPS. The absence of 'S' (Secure) is a major red flag.",
    },
    {
      question:
        "What's the BEST way to check if an email is really from your employer?",
      options: [
        "Check if it uses your company logo",
        "See if the sender's email domain matches your company",
        "Look for professional language",
        "Check if other employees got it too",
      ],
      correct: 1,
      explanation:
        "Always verify the sender's email domain. Scammers can copy logos and writing styles, but they can't use your company's actual email domain.",
    },
    {
      question:
        "You won a lottery you never entered! The email asks for a 'processing fee' to claim your prize. What is this?",
      options: [
        "A legitimate lottery procedure",
        "An advance-fee scam (phishing)",
        "A tax requirement",
        "A banking regulation",
      ],
      correct: 1,
      explanation:
        "This is a classic advance-fee scam. Legitimate lotteries never ask winners to pay fees upfront. If you didn't enter, you didn't win!",
    },
    {
      question:
        "What should you do FIRST if you accidentally clicked a phishing link?",
      options: [
        "Turn off your device immediately",
        "Disconnect from the internet",
        "Change all your passwords",
        "Delete the email",
      ],
      correct: 1,
      explanation:
        "Disconnect from the internet immediately to prevent data transmission or malware downloads. Then run security scans and change passwords.",
    },
    {
      question:
        "A colleague sends you a file called 'invoice.pdf.exe'. What's suspicious about this?",
      options: [
        "PDFs can't have .exe extensions",
        "The double file extension is a disguise for malware",
        "Invoices should be in Word format",
        "Nothing, this is normal",
      ],
      correct: 1,
      explanation:
        "The double extension (.pdf.exe) is a trick to hide executable malware. Real PDFs end in .pdf only. .exe files are programs that can infect your device.",
    },
    {
      question: "Which is the STRONGEST password?",
      options: [
        "Password123!",
        "MyBirthday1990",
        "Tr!cky_P@ssw0rd",
        "g7#mK9$pL2@nQ5&rT8",
      ],
      correct: 3,
      explanation:
        "The longest password with random characters is strongest. It has uppercase, lowercase, numbers, symbols, and no dictionary words or personal info.",
    },
    {
      question:
        "An email from 'Amazon' has several spelling mistakes. What does this indicate?",
      options: [
        "Amazon's marketing team made errors",
        "It's likely a phishing attempt",
        "It's from Amazon's international team",
        "Nothing unusual",
      ],
      correct: 1,
      explanation:
        "Major companies like Amazon have professional editors. Multiple spelling/grammar errors strongly indicate a phishing scam.",
    },
    {
      question: "What's the main purpose of two-factor authentication (2FA)?",
      options: [
        "To make login harder",
        "To add a second layer of security beyond passwords",
        "To track your location",
        "To verify your identity to advertisers",
      ],
      correct: 1,
      explanation:
        "2FA adds an extra security layer. Even if someone steals your password, they can't access your account without the second factor (code, app, or key).",
    },
  ];

  const handleAnswerSelect = (index) => {
    if (selectedAnswer !== null) return; // Already answered

    setSelectedAnswer(index);

    if (index === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }

    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
      }
    }, 3000);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizCompleted(false);
    setStreak(0);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 90)
      return {
        text: "Cybersecurity Master! 🏆",
        color: "from-yellow-400 to-orange-500",
      };
    if (percentage >= 70)
      return {
        text: "Great Job! Keep Learning! 🌟",
        color: "from-green-400 to-emerald-500",
      };
    if (percentage >= 50)
      return {
        text: "Good Start! Review the Material! 💪",
        color: "from-blue-400 to-cyan-500",
      };
    return {
      text: "Keep Practicing! You'll Get There! 📚",
      color: "from-purple-400 to-pink-500",
    };
  };

  const faqs = [
    {
      question: "What is phishing and why is it dangerous?",
      answer:
        "Phishing is a cybercrime where attackers impersonate legitimate organizations to trick people into revealing sensitive information like passwords, credit card numbers, or personal data. It's dangerous because it can lead to identity theft, financial loss, and unauthorized access to your accounts. Phishing attacks are becoming more sophisticated, making them harder to detect.",
    },
    {
      question: "How can I tell if an email or message is a phishing attempt?",
      answer:
        "Look for red flags: urgent language pressuring immediate action, generic greetings (not your name), spelling/grammar errors, suspicious sender addresses, requests for sensitive information, mismatched URLs when hovering over links, and unexpected attachments. Legitimate companies never ask for passwords or sensitive data via email.",
    },
    {
      question: "What should I do if I clicked on a phishing link?",
      answer:
        "Act quickly: (1) Disconnect from the internet immediately, (2) Don't enter any information if a page loads, (3) Run antivirus/anti-malware scans, (4) Change passwords for all accounts (especially banking and email) from a clean device, (5) Enable two-factor authentication, (6) Monitor your accounts for suspicious activity, (7) Report the phishing attempt to relevant authorities and the impersonated company.",
    },
    {
      question: "Are mobile devices safe from phishing attacks?",
      answer:
        "No, mobile devices are increasingly targeted through SMS phishing (smishing), malicious apps, and mobile-optimized phishing websites. Mobile users are often more vulnerable because smaller screens make it harder to inspect URLs, and people tend to be less cautious on phones. Always verify links before clicking, even on trusted messaging apps.",
    },
    {
      question: "How do attackers create fake websites that look so real?",
      answer:
        "Attackers copy the HTML, CSS, and design elements from legitimate websites. They register similar domain names (like amaz0n.com instead of amazon.com) and use free SSL certificates to display the padlock icon. Some even clone entire websites with perfect precision. Always check the exact URL spelling and look for subtle differences.",
    },
    {
      question: "What is spear phishing and how is it different?",
      answer:
        "Spear phishing is a targeted attack aimed at specific individuals or organizations, using personalized information to appear more legitimate. Unlike mass phishing emails, spear phishing messages reference your name, job title, recent activities, or colleagues. These attacks are harder to detect and more successful, often used in corporate espionage and high-value fraud.",
    },
    {
      question: "Are QR code scams real, and how do they work?",
      answer:
        "Yes, QR phishing (quishing) is growing rapidly. Attackers place malicious QR codes in emails, flyers, or even over legitimate codes in public places. When scanned, they redirect to phishing sites or download malware. Always verify the destination URL before visiting, and be cautious of QR codes in unexpected emails or public locations.",
    },
  ];

  const globalStats = [
    {
      label: "Phishing Attacks Yearly",
      value: "3.4B+",
      icon: TrendingUp,
      color: "from-red-500 to-orange-500",
    },
    {
      label: "Average Cost per Attack",
      value: "$4.9M",
      icon: CreditCard,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Success Rate",
      value: "32%",
      icon: Target,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Response Time Critical",
      value: "< 1hr",
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const sections = [
    "Overview",
    "Types",
    "Red Flags",
    "Protection",
    "Quiz",
    "FAQ",
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>

        {/* Animated grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
      </div>

      {/* Progress Indicator */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden xl:block">
        <div className="flex flex-col gap-4">
          {sections.map((section, index) => (
            <div key={index} className="group flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span
                  className={`text-xs font-medium transition-all duration-300 ${
                    activeSection === index
                      ? "text-white opacity-100"
                      : "text-gray-500 opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {section}
                </span>
              </div>
              <div
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  activeSection === index
                    ? "border-blue-500 bg-blue-500 scale-125"
                    : "border-gray-600 bg-transparent group-hover:border-blue-400"
                }`}
              ></div>
            </div>
          ))}
        </div>
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
                      className="px-4 py-2 text-white bg-white/10 rounded-xl transition-all duration-300 text-sm font-medium flex items-center gap-2"
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
                      className="block px-4 py-3 text-white hover:bg-white/10 rounded-xl text-sm font-medium"
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
                      className="px-4 py-3 text-white bg-white/10 rounded-xl text-sm font-medium flex items-center gap-2"
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
        <section
          data-section
          className="container mx-auto px-4 pt-32 pb-20 max-w-6xl"
        >
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-blue-400/30 text-blue-300 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg shadow-blue-500/10 hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span>Master Cybersecurity • Protect Yourself • Stay Ahead</span>
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>

            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-white mb-8 leading-tight">
              Learn to{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                Stay Safe
              </span>
            </h1>

            <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Master the art of identifying and avoiding phishing attacks.
              <span className="text-blue-400 font-semibold">
                {" "}
                Knowledge is your best defense
              </span>{" "}
              in the digital world.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 bg-green-500/10 border border-green-400/30 px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-300 text-sm font-medium">
                  Interactive Learning
                </span>
              </div>
              <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-400/30 px-4 py-2 rounded-full">
                <Trophy className="w-5 h-5 text-purple-400" />
                <span className="text-purple-300 text-sm font-medium">
                  Test Your Skills
                </span>
              </div>
              <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-400/30 px-4 py-2 rounded-full">
                <Flame className="w-5 h-5 text-orange-400" />
                <span className="text-orange-300 text-sm font-medium">
                  Real-World Examples
                </span>
              </div>
            </div>
          </div>

          {/* Enhanced Global Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {globalStats.map((stat, index) => (
              <div key={index} className="relative group">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-30 rounded-2xl blur-xl transition-all duration-500`}
                ></div>
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:border-white/30 transition-all hover:scale-105 duration-300">
                  <div
                    className={`inline-flex p-3 bg-gradient-to-br ${stat.color} rounded-xl mb-3`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Types of Phishing - Enhanced */}
        <section
          data-section
          className="container mx-auto px-4 py-20 max-w-6xl"
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Types of{" "}
              <span className="bg-gradient-to-r from-red-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
                Phishing Attacks
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Know your enemy. Understanding attack methods is the first step to
              protection.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {phishingTypes.map((type, index) => (
              <div key={index} className="group relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-0 group-hover:opacity-30 rounded-3xl blur-2xl transition-all duration-700`}
                ></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all duration-500 h-full group-hover:scale-[1.02]">
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`inline-flex p-4 bg-gradient-to-br ${type.color} rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}
                    >
                      <type.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(type.dangerLevel)].map((_, i) => (
                        <Flame key={i} className="w-4 h-4 text-orange-400" />
                      ))}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                    {type.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                    {type.description}
                  </p>
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-orange-400 mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Common Examples:
                    </p>
                    {type.examples.map((example, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 text-gray-300 text-sm bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-all"
                      >
                        <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <span>{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Red Flags - Enhanced */}
        <section
          data-section
          className="container mx-auto px-4 py-20 max-w-6xl"
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Spot the{" "}
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Red Flags
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Warning signs that scream "PHISHING!" Learn to recognize them
              instantly.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {redFlags.map((flag, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-red-400/50 transition-all h-full group-hover:scale-[1.02] duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`p-3 rounded-xl ${
                        flag.severity === "critical"
                          ? "bg-red-500/30 ring-2 ring-red-400"
                          : flag.severity === "high"
                          ? "bg-orange-500/30 ring-2 ring-orange-400"
                          : "bg-yellow-500/30 ring-2 ring-yellow-400"
                      } group-hover:scale-110 transition-transform duration-300`}
                    >
                      <flag.icon
                        className={`w-6 h-6 ${
                          flag.severity === "critical"
                            ? "text-red-300"
                            : flag.severity === "high"
                            ? "text-orange-300"
                            : "text-yellow-300"
                        }`}
                      />
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        flag.severity === "critical"
                          ? "bg-red-500/30 text-red-200 border border-red-400/50 animate-pulse"
                          : flag.severity === "high"
                          ? "bg-orange-500/30 text-orange-200 border border-orange-400/50"
                          : "bg-yellow-500/30 text-yellow-200 border border-yellow-400/50"
                      }`}
                    >
                      {flag.severity.toUpperCase()}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {flag.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {flag.description}
                  </p>
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <p className="text-cyan-300 text-xs font-medium">
                        {flag.tip}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Protection Steps - Enhanced */}
        <section
          data-section
          className="container mx-auto px-4 py-20 max-w-6xl"
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Your{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Defense Strategy
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Follow these essential steps to build an impenetrable digital
              defense.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {protectionSteps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-green-400/50 transition-all h-full group-hover:scale-[1.02] duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-6xl font-bold text-white/10 group-hover:text-white/20 transition-colors">
                      {step.step}
                    </span>
                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {step.description}
                  </p>
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-start gap-2 bg-green-500/10 p-3 rounded-lg">
                      <Target className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <p className="text-green-300 text-xs font-medium leading-relaxed">
                        <span className="font-bold">Action:</span>{" "}
                        {step.actionable}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Quiz Section */}
        <section
          data-section
          className="container mx-auto px-4 py-20 max-w-4xl"
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Test Your{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Knowledge
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Put your phishing detection skills to the test with our
              interactive quiz!
            </p>
          </div>

          {!quizStarted ? (
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-blue-500/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-12 text-center">
                <div className="inline-flex p-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                  <Trophy className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Ready for the Challenge?
                </h3>
                <p className="text-gray-300 text-lg mb-8 max-w-md mx-auto">
                  Test yourself with 10 real-world phishing scenarios. Can you
                  spot all the threats?
                </p>
                <div className="grid grid-cols-3 gap-4 mb-8 max-w-lg mx-auto">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-3xl font-bold text-blue-400 mb-1">
                      10
                    </div>
                    <div className="text-xs text-gray-400">Questions</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-3xl font-bold text-green-400 mb-1">
                      ~5
                    </div>
                    <div className="text-xs text-gray-400">Minutes</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-3xl font-bold text-purple-400 mb-1">
                      90%
                    </div>
                    <div className="text-xs text-gray-400">To Pass</div>
                  </div>
                </div>
                <button
                  onClick={() => setQuizStarted(true)}
                  className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 shadow-2xl shadow-purple-500/50 group"
                >
                  <PlayCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
                  <span>Start Quiz</span>
                  <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ) : !quizCompleted ? (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8">
                {/* Quiz Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 px-4 py-2 rounded-xl">
                      <span className="text-white font-bold">
                        Question {currentQuestion + 1}/{quizQuestions.length}
                      </span>
                    </div>
                    {streak > 1 && (
                      <div className="flex items-center gap-2 bg-orange-500/20 border border-orange-400/30 px-4 py-2 rounded-xl animate-pulse">
                        <Flame className="w-5 h-5 text-orange-400" />
                        <span className="text-orange-300 font-bold">
                          {streak} Streak!
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="bg-white/10 px-4 py-2 rounded-xl">
                    <span className="text-white font-bold">
                      Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-white/10 rounded-full h-3 mb-8 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 rounded-full"
                    style={{
                      width: `${
                        ((currentQuestion + 1) / quizQuestions.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>

                {/* Question */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-6 leading-relaxed">
                    {quizQuestions[currentQuestion].question}
                  </h3>
                  <div className="space-y-4">
                    {quizQuestions[currentQuestion].options.map(
                      (option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          disabled={selectedAnswer !== null}
                          className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-300 group ${
                            selectedAnswer === null
                              ? "bg-white/5 border-white/10 hover:border-blue-400/50 hover:bg-white/10"
                              : selectedAnswer === index
                              ? index === quizQuestions[currentQuestion].correct
                                ? "bg-green-500/20 border-green-400 ring-4 ring-green-400/30"
                                : "bg-red-500/20 border-red-400 ring-4 ring-red-400/30"
                              : index === quizQuestions[currentQuestion].correct
                              ? "bg-green-500/20 border-green-400"
                              : "bg-white/5 border-white/10 opacity-50"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold transition-all ${
                                selectedAnswer === null
                                  ? "bg-white/10 text-white group-hover:bg-blue-500/30"
                                  : selectedAnswer === index
                                  ? index ===
                                    quizQuestions[currentQuestion].correct
                                    ? "bg-green-500 text-white"
                                    : "bg-red-500 text-white"
                                  : index ===
                                    quizQuestions[currentQuestion].correct
                                  ? "bg-green-500 text-white"
                                  : "bg-white/10 text-gray-400"
                              }`}
                            >
                              {selectedAnswer !== null &&
                                (selectedAnswer === index ? (
                                  index ===
                                  quizQuestions[currentQuestion].correct ? (
                                    <CheckCircle className="w-6 h-6" />
                                  ) : (
                                    <XCircle className="w-6 h-6" />
                                  )
                                ) : index ===
                                  quizQuestions[currentQuestion].correct ? (
                                  <CheckCircle className="w-6 h-6" />
                                ) : (
                                  String.fromCharCode(65 + index)
                                ))}
                              {selectedAnswer === null &&
                                String.fromCharCode(65 + index)}
                            </div>
                            <span className="text-white font-medium flex-1">
                              {option}
                            </span>
                          </div>
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Explanation */}
                {showResult && (
                  <div
                    className={`p-6 rounded-2xl border-2 ${
                      selectedAnswer === quizQuestions[currentQuestion].correct
                        ? "bg-green-500/10 border-green-400/50"
                        : "bg-red-500/10 border-red-400/50"
                    } animate-fade-in`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      {selectedAnswer ===
                      quizQuestions[currentQuestion].correct ? (
                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                      )}
                      <div>
                        <h4
                          className={`font-bold text-lg mb-2 ${
                            selectedAnswer ===
                            quizQuestions[currentQuestion].correct
                              ? "text-green-300"
                              : "text-red-300"
                          }`}
                        >
                          {selectedAnswer ===
                          quizQuestions[currentQuestion].correct
                            ? "🎉 Correct! Well done!"
                            : "❌ Not quite right"}
                        </h4>
                        <p className="text-gray-300 leading-relaxed">
                          {quizQuestions[currentQuestion].explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/30 via-orange-500/30 to-pink-500/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-12 text-center">
                <div
                  className={`inline-flex p-6 bg-gradient-to-br ${
                    getScoreMessage().color
                  } rounded-3xl mb-6 animate-bounce`}
                >
                  <Award className="w-16 h-16 text-white" />
                </div>
                <h3
                  className={`text-4xl font-bold bg-gradient-to-r ${
                    getScoreMessage().color
                  } bg-clip-text text-transparent mb-4`}
                >
                  {getScoreMessage().text}
                </h3>
                <div className="text-7xl font-bold text-white mb-6">
                  {score}/{quizQuestions.length}
                </div>
                <p className="text-2xl text-gray-300 mb-8">
                  You scored {Math.round((score / quizQuestions.length) * 100)}%
                </p>

                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-400 mb-1">
                      {score}
                    </div>
                    <div className="text-sm text-gray-400">Correct</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <XCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-red-400 mb-1">
                      {quizQuestions.length - score}
                    </div>
                    <div className="text-sm text-gray-400">Incorrect</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={resetQuiz}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-xl"
                  >
                    <PlayCircle className="w-6 h-6" />
                    <span>Try Again</span>
                  </button>
                  <Link
                    to="/detect"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-xl"
                  >
                    <Shield className="w-6 h-6" />
                    <span>Detect Threats</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* FAQ Section - Enhanced */}
        <section
          data-section
          className="container mx-auto px-4 py-20 max-w-4xl"
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Got{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Questions?
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Find answers to the most common questions about phishing and
              online security.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-blue-400/50 transition-all">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-all group"
                  >
                    <div className="flex items-center gap-4 flex-1 pr-4">
                      <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-white font-semibold text-lg">
                        {faq.question}
                      </span>
                    </div>
                    <div className="flex-shrink-0">
                      {openFAQ === index ? (
                        <ChevronUp className="w-6 h-6 text-blue-400" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      )}
                    </div>
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-6 animate-fade-in">
                      <div className="pl-14 pr-10">
                        <p className="text-gray-300 leading-relaxed text-lg">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section - Enhanced */}
        <section className="container mx-auto px-4 py-24 max-w-5xl">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-cyan-500/40 rounded-3xl blur-3xl group-hover:blur-[100px] transition-all duration-700"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-12 md:p-16 border border-white/20 text-center overflow-hidden">
              {/* Animated background shapes */}
              <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div
                className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/30 text-green-300 px-6 py-3 rounded-full text-sm font-medium mb-8 animate-pulse">
                  <Shield className="w-5 h-5" />
                  <span>You're Now Armed with Knowledge</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                  Ready to Hunt{" "}
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Phishing Threats?
                  </span>
                </h2>
                <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                  You've learned the tactics, spotted the red flags, and
                  mastered the defense. Now put your skills to work with our
                  AI-powered threat detector.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    to="/detect"
                    className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 shadow-2xl shadow-purple-500/50 group"
                  >
                    <Shield className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                    <span>Start Scanning Now</span>
                    <Scan className="w-7 h-7 group-hover:scale-110 transition-transform" />
                  </Link>
                  <button
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="inline-flex items-center gap-3 px-10 py-5 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105"
                  >
                    <BookOpen className="w-7 h-7" />
                    <span>Review Lessons</span>
                  </button>
                </div>

                <div className="mt-12 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all">
                    <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white mb-1">
                      Expert
                    </div>
                    <div className="text-xs text-gray-400">Level Unlocked</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all">
                    <Trophy className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white mb-1">
                      Ready
                    </div>
                    <div className="text-xs text-gray-400">To Defend</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all">
                    <Flame className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white mb-1">
                      Active
                    </div>
                    <div className="text-xs text-gray-400">Protection</div>
                  </div>
                </div>
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
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl blur-md opacity-75"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl">
                  <Brain className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="text-white font-bold">EndPhishAI</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 EndPhishAI. Empowering users with cybersecurity knowledge.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">
                Stay Vigilant, Stay Safe
              </span>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
