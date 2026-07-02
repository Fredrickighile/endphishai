import { useState, useEffect, useCallback } from "react";
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
  BookOpen,
  Target,
  Scan,
  Info,
  Menu,
  X,
  Zap,
  TrendingUp,
  ArrowRight,
  Trophy,
  PlayCircle,
  Sparkles,
  Flame,
  MessageCircle,
  Award,
  Star,
  BarChart3,
  Crosshair,
  RefreshCw,
  Clock,
  Hash,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// ─── CHALLENGE BANK ────────────────────────────────────────────────────────
// Real-world phishing examples across languages, types, and difficulties
const CHALLENGES = [
  // EASY
  {
    id: 1,
    difficulty: "easy",
    type: "URL",
    language: "English",
    content: "http://paypa1.com/login",
    hint: "Look very carefully at the spelling",
    verdict: "phishing",
    teach:
      "The number '1' replaces the letter 'l' — a homoglyph attack. paypa1.com is not PayPal.",
    category: "Typosquat",
  },
  {
    id: 2,
    difficulty: "easy",
    type: "SMS",
    language: "English",
    content:
      "URGENT: Your Netflix account has been suspended. Verify now: http://netflix-secure.tk/verify",
    hint: "Check the domain extension",
    verdict: "phishing",
    teach:
      ".tk is a free domain used almost exclusively in phishing. Netflix uses netflix.com only.",
    category: "Brand Impersonation",
  },
  {
    id: 3,
    difficulty: "easy",
    type: "URL",
    language: "English",
    content: "https://www.amazon.com/orders/track",
    hint: "Check the domain carefully",
    verdict: "safe",
    teach:
      "This is the real Amazon domain. HTTPS, correct spelling, official path.",
    category: "Legitimate",
  },
  {
    id: 4,
    difficulty: "easy",
    type: "SMS",
    language: "Swahili",
    content:
      "HARAKA! Akaunti yako ya M-Pesa imefungwa. Thibitisha sasa: http://mpesa-verify.tk/login",
    hint: "Haraka means URGENT in Swahili",
    verdict: "phishing",
    teach:
      "Classic urgency + suspicious TLD (.tk). Safaricom never sends verification links via SMS to unofficial domains.",
    category: "Mobile Money Scam",
  },
  {
    id: 5,
    difficulty: "easy",
    type: "SMS",
    language: "English",
    content:
      "Your Uber ride is arriving in 3 minutes. Driver: John, Toyota Camry, ABC-1234.",
    hint: "Is there any link or request for information?",
    verdict: "safe",
    teach:
      "No link, no urgency, no request for data. Standard ride notification.",
    category: "Legitimate",
  },
  // MEDIUM
  {
    id: 6,
    difficulty: "medium",
    type: "Email",
    language: "English",
    content:
      "From: security@paypal-support.com\nSubject: Unusual activity detected\n\nDear Customer, we noticed suspicious login from Nigeria. Verify your account within 24 hours or it will be suspended: http://paypal-support.com/verify",
    hint: "Who is the email actually from?",
    verdict: "phishing",
    teach:
      "paypal-support.com is NOT paypal.com. Scammers register similar domains. PayPal only emails from paypal.com.",
    category: "Email Spoofing",
  },
  {
    id: 7,
    difficulty: "medium",
    type: "SMS",
    language: "Hausa",
    content:
      "Gaggawa! Asusun MTN ka an kulle saboda ayyukan da ba a yarda da su. Tabbatar yanzu: http://mtn-ng-secure.xyz/verify",
    hint: "Gaggawa means URGENT in Hausa",
    verdict: "phishing",
    teach:
      "MTN Nigeria never sends verification links to .xyz domains. The urgency + account lockout threat is a classic pressure tactic.",
    category: "Mobile Money Scam",
  },
  {
    id: 8,
    difficulty: "medium",
    type: "URL",
    language: "English",
    content: "http://microsoft.com.account-verify.net/login",
    hint: "Read the full domain very carefully from right to left",
    verdict: "phishing",
    teach:
      "The real domain is account-verify.net, not microsoft.com. The .com is a subdomain trick. Microsoft uses microsoft.com only.",
    category: "Subdomain Attack",
  },
  {
    id: 9,
    difficulty: "medium",
    type: "Email",
    language: "French",
    content:
      "De: noreply@orange-money-alertes.com\nObjet: Votre compte Orange Money est bloqué\n\nVotre compte nécessite une vérification immédiate. Cliquez ici: http://orange-verify.ga",
    hint: "Check both the sender domain and the link domain",
    verdict: "phishing",
    teach:
      "orange-money-alertes.com is not orange.com. The link goes to a .ga domain. Orange Money uses orange.com or its country-specific domains.",
    category: "Email Spoofing",
  },
  {
    id: 10,
    difficulty: "medium",
    type: "SMS",
    language: "English",
    content:
      "Your Amazon order #114-7829341-1234567 has shipped. Track at amazon.com/track. Expected delivery: Tomorrow.",
    hint: "Is there a link asking you to log in or verify anything?",
    verdict: "safe",
    teach:
      "Real Amazon order notifications include order numbers. No login request. No suspicious domain.",
    category: "Legitimate",
  },
  // HARD
  {
    id: 11,
    difficulty: "hard",
    type: "URL",
    language: "English",
    content:
      "https://signin.microsoft.com.account-services.info/oauth2/authorize",
    hint: "Where does this URL actually take you?",
    verdict: "phishing",
    teach:
      "The real domain here is account-services.info — not microsoft.com. Everything before the last .info/domain is a subdomain path used to deceive.",
    category: "Advanced Subdomain",
  },
  {
    id: 12,
    difficulty: "hard",
    type: "Email",
    language: "English",
    content:
      "From: no-reply@gtbank-online.com\nSubject: Security Alert — Login from new device\n\nDear Valued Customer, a login was detected from Lagos, Nigeria at 2:34 AM. If this wasn't you, secure your account: https://gtbank-online.com/secure",
    hint: "GTBank's actual domain is gtbank.com",
    verdict: "phishing",
    teach:
      "gtbank-online.com is a registered lookalike domain. GTBank only communicates from @gtbank.com. The new device login fear tactic is designed to make you react without thinking.",
    category: "Bank Impersonation",
  },
  {
    id: 13,
    difficulty: "hard",
    type: "SMS",
    language: "Yoruba",
    content:
      "Kiakia! Akọọlẹ GTBank rẹ ti di nitori iṣẹ ajeji. Jẹrisi identity rẹ bayi: http://gtbank-alert.ml/verify tabi pe +234-800-FAKE",
    hint: "Two attack vectors in one message",
    verdict: "phishing",
    teach:
      "This combines a fake URL (.ml domain) AND a fake phone number — a dual-vector attack. Real GTBank only uses gtbank.com and official numbers listed on their cards.",
    category: "Multi-Vector Attack",
  },
  {
    id: 14,
    difficulty: "hard",
    type: "Email",
    language: "English",
    content:
      "From: hr@yourcompany-payroll.com\nSubject: Urgent: Update your bank details for this month's salary\n\nHi Team, due to our banking system upgrade, please update your salary payment details by EOD today using the secure form: https://payroll-update.yourcompany-payroll.com",
    hint: "This is Business Email Compromise (BEC) — what's the real domain?",
    verdict: "phishing",
    teach:
      "Business Email Compromise. The attacker registered yourcompany-payroll.com to impersonate HR. Always verify payroll change requests by calling HR directly — never via email links.",
    category: "BEC Attack",
  },
  {
    id: 15,
    difficulty: "hard",
    type: "URL",
    language: "English",
    content:
      "https://www.paypal.com.secure-login.verify-account.com/webscr?cmd=_login",
    hint: "Find the actual domain in this URL",
    verdict: "phishing",
    teach:
      "The real domain is verify-account.com. paypal.com appears as a subdomain to fool you. Real PayPal URLs always end in paypal.com before the first slash.",
    category: "Domain Deception",
  },
  // EXPERT
  {
    id: 16,
    difficulty: "expert",
    type: "Email",
    language: "English",
    content:
      "From: security-noreply@accounts.google.com.security-alert.net\nSubject: Critical: Your Google account will be deleted\n\nWe detected that your account violated our terms. To appeal, verify within 12 hours: https://accounts.google.com.security-alert.net/appeal",
    hint: "Read the domain in the email address — not just google.com",
    verdict: "phishing",
    teach:
      "The full sender domain is security-alert.net — not google.com. Google only emails from @google.com or @accounts.google.com. The 12-hour deadline is psychological pressure.",
    category: "Advanced Spoofing",
  },
  {
    id: 17,
    difficulty: "expert",
    type: "SMS",
    language: "English",
    content:
      "Hi, it's Sarah from IT. We're doing urgent server maintenance. I need your VPN credentials to restore your access before the system locks at 6pm. Reply here or call me: +1-555-0147",
    hint: "No link — this is a different kind of attack",
    verdict: "phishing",
    teach:
      "This is vishing (voice phishing) via SMS — social engineering with no URL. IT departments NEVER ask for credentials via SMS. Always verify via official company channels.",
    category: "Social Engineering",
  },
  {
    id: 18,
    difficulty: "expert",
    type: "Email",
    language: "English",
    content:
      "From: invoice@dropbox.com\nSubject: Document shared with you\n\nFred Ighile has shared a document: Q3_Financial_Report.pdf\nView document: https://www.dropbox.com/s/abc123/Q3_Financial_Report.pdf",
    hint: "This one looks very legitimate — is it?",
    verdict: "safe",
    teach:
      "This is actually a real Dropbox notification pattern. The sender is dropbox.com, the link goes to dropbox.com. The lesson: not every unexpected email is phishing — verify the domain.",
    category: "Legitimate",
  },
];

const DIFFICULTY_CONFIG = {
  easy: {
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    label: "Easy",
    points: 10,
  },
  medium: {
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    label: "Medium",
    points: 20,
  },
  hard: {
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    label: "Hard",
    points: 35,
  },
  expert: {
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    label: "Expert",
    points: 50,
  },
};

const TYPE_ICONS = { URL: Globe, SMS: Smartphone, Email: Mail };

// ─── THREAT IQ CALCULATOR ──────────────────────────────────────────────────
function calcThreatIQ(score, total, accuracy) {
  if (total === 0) return 500;
  const base = 500;
  const scoreBonus = (score / (total * 50)) * 300;
  const accuracyBonus = (accuracy / 100) * 200;
  return Math.min(Math.round(base + scoreBonus + accuracyBonus), 1000);
}

function getThreatIQLabel(iq) {
  if (iq >= 900) return { label: "Elite Analyst", color: "text-yellow-400" };
  if (iq >= 800) return { label: "Senior Analyst", color: "text-purple-400" };
  if (iq >= 700) return { label: "Security Analyst", color: "text-blue-400" };
  if (iq >= 600) return { label: "Threat Hunter", color: "text-cyan-400" };
  if (iq >= 500) return { label: "Security Trainee", color: "text-green-400" };
  return { label: "Beginner", color: "text-gray-400" };
}

// ─── NAV ───────────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl blur-xl" />
          <div className="relative bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl px-6 py-3">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl blur-md opacity-75" />
                  <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <span className="text-white font-bold text-xl">
                    EndPhishAI
                  </span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400 text-xs font-medium">
                      AI Active
                    </span>
                  </div>
                </div>
              </Link>
              <div className="hidden lg:flex items-center gap-1">
                {[
                  { to: "/", label: "Home" },
                  {
                    to: "/detect",
                    label: "Detect",
                    icon: <Scan className="w-4 h-4" />,
                  },
                  {
                    to: "/learn",
                    label: "Threat Lab",
                    icon: <BookOpen className="w-4 h-4" />,
                    active: true,
                  },
                  {
                    to: "/about",
                    label: "About",
                    icon: <Info className="w-4 h-4" />,
                  },
                ].map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${l.active ? "text-white bg-white/10" : "text-gray-300 hover:text-white hover:bg-white/10"}`}
                  >
                    {l.icon}
                    {l.label}
                  </Link>
                ))}
              </div>
              <button
                onClick={() => setOpen(!open)}
                className="lg:hidden text-white p-2 hover:bg-white/10 rounded-xl"
              >
                {open ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ─── MAIN ──────────────────────────────────────────────────────────────────
export default function Learn() {
  const [screen, setScreen] = useState("landing"); // landing | lab | results
  const [filter, setFilter] = useState("all");
  const [challenges, setChallenges] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answered, setAnswered] = useState(null); // null | "phishing" | "safe"
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [history, setHistory] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [apiVerdict, setApiVerdict] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);

  // Build challenge set based on filter
  const buildChallenges = useCallback((f) => {
    let pool =
      f === "all" ? CHALLENGES : CHALLENGES.filter((c) => c.difficulty === f);
    // Shuffle
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(10, shuffled.length));
  }, []);

  // Timer
  useEffect(() => {
    if (!timerActive || timeLeft <= 0) return;
    const t = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timerActive, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && timerActive && answered === null) {
      handleAnswer("timeout");
    }
  }, [timeLeft, timerActive, answered]);

  const startLab = (f) => {
    setFilter(f);
    const set = buildChallenges(f);
    setChallenges(set);
    setCurrent(0);
    setAnswered(null);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setHistory([]);
    setApiVerdict(null);
    setShowHint(false);
    setHintsUsed(0);
    setTimeLeft(30);
    setTimerActive(true);
    setScreen("lab");
  };

  const scanWithAPI = async (challenge) => {
    setScanning(true);
    try {
      const isURL = challenge.type === "URL";
      const body = isURL
        ? { url: challenge.content }
        : { text: challenge.content };
      const r = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const d = await r.json();
      setApiVerdict({
        verdict: d.final_status || d.ai_result,
        score: d.ai_score || 0,
        reason: d.ai_reason || d.explanation || "",
      });
    } catch {
      setApiVerdict({
        verdict: "unavailable",
        score: 0,
        reason: "API unavailable",
      });
    }
    setScanning(false);
  };

  const handleAnswer = async (userAnswer) => {
    if (answered !== null) return;
    const ch = challenges[current];
    setTimerActive(false);
    setAnswered(userAnswer);

    const correct =
      userAnswer === ch.verdict || userAnswer === "timeout"
        ? false
        : userAnswer === ch.verdict;
    const diff = DIFFICULTY_CONFIG[ch.difficulty];
    const timeBonus = timeLeft > 20 ? 5 : timeLeft > 10 ? 2 : 0;
    const hintPenalty = showHint ? 5 : 0;
    const pts = correct ? diff.points + timeBonus - hintPenalty : 0;

    const newStreak = correct ? streak + 1 : 0;
    const newBest = Math.max(bestStreak, newStreak);
    setScore((s) => s + pts);
    setStreak(newStreak);
    setBestStreak(newBest);
    setHistory((h) => [
      ...h,
      {
        challenge: ch,
        userAnswer,
        correct,
        points: pts,
        timeUsed: 30 - timeLeft,
      },
    ]);

    // Scan with real API for educational verdict
    await scanWithAPI(ch);
  };

  const nextChallenge = () => {
    if (current >= challenges.length - 1) {
      setScreen("results");
      return;
    }
    setCurrent((c) => c + 1);
    setAnswered(null);
    setApiVerdict(null);
    setShowHint(false);
    setTimeLeft(30);
    setTimerActive(true);
  };

  const ch = challenges[current];
  const TypeIcon = ch ? TYPE_ICONS[ch.type] || Globe : Globe;
  const accuracy =
    history.length > 0
      ? Math.round(
          (history.filter((h) => h.correct).length / history.length) * 100,
        )
      : 0;
  const threatIQ = calcThreatIQ(score, challenges.length * 50, accuracy);
  const iqLabel = getThreatIQLabel(threatIQ);

  // ── LANDING ──────────────────────────────────────────────────────────────
  if (screen === "landing")
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>
        <Nav />
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20 max-w-5xl">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-400/30 text-orange-300 px-5 py-2.5 rounded-full text-sm font-medium mb-8">
              <Flame className="w-4 h-4 animate-pulse" />
              <span>Threat Lab — Train Like a Security Analyst</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Your Personal
              <br />
              <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                Threat Lab
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-4">
              Real phishing challenges. Real AI analysis. Real skills. Train on
              actual attack patterns across 6 languages — the same threats
              targeting people globally right now.
            </p>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              Every verdict is verified by the EndPhishAI engine — not multiple
              choice guessing. You learn why each message is dangerous, not just
              whether it is.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              {
                label: "Real Challenges",
                value: CHALLENGES.length + "+",
                icon: Target,
                color: "from-blue-500 to-cyan-500",
              },
              {
                label: "Languages",
                value: "6",
                icon: Globe,
                color: "from-green-500 to-emerald-500",
              },
              {
                label: "Attack Types",
                value: "10+",
                icon: Crosshair,
                color: "from-orange-500 to-red-500",
              },
              {
                label: "Max Threat IQ",
                value: "1000",
                icon: BarChart3,
                color: "from-purple-500 to-pink-500",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-all"
              >
                <div
                  className={`inline-flex p-3 bg-gradient-to-br ${s.color} rounded-xl mb-3`}
                >
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {s.value}
                </div>
                <p className="text-gray-400 text-xs">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Difficulty selector */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Choose Your Training Level
            </h2>
            <p className="text-gray-400 text-sm mb-8">
              Each level uses real attack patterns. Expert includes Business
              Email Compromise and multi-vector attacks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                key: "easy",
                icon: Shield,
                desc: "Basic phishing URLs, obvious SMS scams, suspicious TLDs",
              },
              {
                key: "medium",
                icon: Eye,
                desc: "Email spoofing, subdomain attacks, multilingual scams",
              },
              {
                key: "hard",
                icon: AlertTriangle,
                desc: "Advanced domain deception, BEC, multi-vector attacks",
              },
              {
                key: "expert",
                icon: Crosshair,
                desc: "Nation-state techniques, social engineering, zero-day patterns",
              },
            ].map(({ key, icon: Icon, desc }) => {
              const cfg = DIFFICULTY_CONFIG[key];
              return (
                <button
                  key={key}
                  onClick={() => startLab(key)}
                  className={`group relative text-left p-6 rounded-2xl border-2 ${cfg.border} ${cfg.bg} hover:scale-[1.03] transition-all`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Icon className={`w-6 h-6 ${cfg.color}`} />
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-full ${cfg.bg} ${cfg.color} border ${cfg.border}`}
                    >
                      {cfg.points} pts/challenge
                    </span>
                  </div>
                  <h3 className={`text-lg font-bold ${cfg.color} mb-2`}>
                    {cfg.label}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {desc}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="text-center">
            <button
              onClick={() => startLab("all")}
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-2xl font-bold text-lg transition-all hover:scale-[1.03] shadow-2xl shadow-red-500/30"
            >
              <Flame className="w-5 h-5" />
              Full Training — All Levels Mixed
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-gray-500 text-sm mt-3">
              10 challenges, all difficulties, all languages
            </p>
          </div>

          {/* What makes this different */}
          <div className="mt-20 grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Real AI Verdicts",
                desc: "Every challenge is scanned live by the EndPhishAI engine. You see the same analysis a security analyst sees.",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Globe,
                title: "6 Languages",
                desc: "Swahili, Hausa, Yoruba, French, Pidgin, English. The only training platform with non-English phishing attacks.",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: BarChart3,
                title: "Threat IQ Score",
                desc: "Your score reflects real analyst skill — speed, accuracy, difficulty. Share it on LinkedIn.",
                color: "from-purple-500 to-pink-500",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div
                  className={`inline-flex p-3 bg-gradient-to-br ${f.color} rounded-xl mb-4`}
                >
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-bold mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

  // ── RESULTS ───────────────────────────────────────────────────────────────
  if (screen === "results") {
    const correct = history.filter((h) => h.correct).length;
    const iq = calcThreatIQ(score, challenges.length * 50, accuracy);
    const iql = getThreatIQLabel(iq);
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        </div>
        <Nav />
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20 max-w-3xl">
          <div className="text-center mb-10">
            <div className="inline-flex p-6 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-3xl mb-6 animate-bounce">
              <Trophy className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-2">
              Training Complete
            </h1>
            <p className="text-gray-400 text-lg">
              Here's your threat analysis report
            </p>
          </div>

          {/* Threat IQ */}
          <div className="bg-white/5 border border-white/20 rounded-3xl p-8 mb-6 text-center">
            <p className="text-gray-400 text-sm mb-2">Your Threat IQ</p>
            <div className={`text-8xl font-bold ${iql.color} mb-2`}>{iq}</div>
            <div className={`text-2xl font-bold ${iql.color} mb-4`}>
              {iql.label}
            </div>
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full transition-all duration-1000"
                style={{ width: `${(iq / 1000) * 100}%` }}
              />
            </div>
            <p className="text-gray-500 text-xs mt-2">{iq} / 1000</p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              {
                label: "Score",
                value: score,
                icon: Star,
                color: "text-yellow-400",
              },
              {
                label: "Accuracy",
                value: `${accuracy}%`,
                icon: Target,
                color: "text-green-400",
              },
              {
                label: "Best Streak",
                value: bestStreak,
                icon: Flame,
                color: "text-orange-400",
              },
              {
                label: "Correct",
                value: `${correct}/${challenges.length}`,
                icon: CheckCircle,
                color: "text-blue-400",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center"
              >
                <s.icon className={`w-6 h-6 ${s.color} mx-auto mb-2`} />
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                <p className="text-gray-400 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Review mistakes */}
          {history.filter((h) => !h.correct).length > 0 && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mb-6">
              <h3 className="text-red-300 font-bold mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Review These — You Missed Them
              </h3>
              <div className="space-y-3">
                {history
                  .filter((h) => !h.correct)
                  .map((h, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full ${DIFFICULTY_CONFIG[h.challenge.difficulty].bg} ${DIFFICULTY_CONFIG[h.challenge.difficulty].color}`}
                        >
                          {h.challenge.difficulty}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {h.challenge.category}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {h.challenge.language}
                        </span>
                      </div>
                      <p className="text-white text-sm font-mono mb-2 line-clamp-2">
                        {h.challenge.content}
                      </p>
                      <p className="text-yellow-300 text-xs">
                        <span className="font-bold">
                          Why it's {h.challenge.verdict}:
                        </span>{" "}
                        {h.challenge.teach}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => startLab(filter)}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-2xl font-bold transition-all hover:scale-[1.02]"
            >
              <RefreshCw className="w-5 h-5" />
              Train Again
            </button>
            <button
              onClick={() => setScreen("landing")}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-2xl font-bold transition-all"
            >
              <BookOpen className="w-5 h-5" />
              Change Level
            </button>
            <Link
              to="/detect"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-bold transition-all hover:scale-[1.02]"
            >
              <Shield className="w-5 h-5" />
              Scan Real Threats
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── LAB ───────────────────────────────────────────────────────────────────
  if (!ch) return null;
  const diffCfg = DIFFICULTY_CONFIG[ch.difficulty];
  const correct =
    answered !== null && answered !== "timeout" && answered === ch.verdict;
  const wrong =
    answered !== null && (answered === "timeout" || answered !== ch.verdict);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-3xl" />
      </div>
      <Nav />

      <div className="relative z-10 container mx-auto px-4 pt-28 pb-20 max-w-3xl">
        {/* Header bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-sm font-medium">
              {current + 1} / {challenges.length}
            </span>
            <span
              className={`text-xs font-bold px-2 py-1 rounded-full ${diffCfg.bg} ${diffCfg.color} border ${diffCfg.border}`}
            >
              {diffCfg.label}
            </span>
            {streak > 1 && (
              <div className="flex items-center gap-1 bg-orange-500/20 border border-orange-400/30 px-2 py-1 rounded-full">
                <Flame className="w-3 h-3 text-orange-400" />
                <span className="text-orange-300 text-xs font-bold">
                  {streak}x
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-white font-bold">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>{score}</span>
            </div>
            <div
              className={`flex items-center gap-1 font-bold text-sm ${timeLeft <= 10 ? "text-red-400 animate-pulse" : "text-white"}`}
            >
              <Clock className="w-4 h-4" />
              <span>{timeLeft}s</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="w-full bg-white/10 rounded-full h-1.5 mb-8">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-300"
            style={{ width: `${((current + 1) / challenges.length) * 100}%` }}
          />
        </div>

        {/* Challenge card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              <TypeIcon className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 text-sm font-semibold">
                {ch.type}
              </span>
            </div>
            <span className="text-gray-500 text-sm">·</span>
            <span className="text-gray-400 text-sm">{ch.language}</span>
            <span className="text-gray-500 text-sm">·</span>
            <span className="text-gray-400 text-sm">{ch.category}</span>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-2xl p-5 mb-4">
            <p className="text-white font-mono text-sm leading-relaxed whitespace-pre-wrap break-all">
              {ch.content}
            </p>
          </div>

          {/* Hint */}
          {!showHint ? (
            <button
              onClick={() => {
                setShowHint(true);
                setHintsUsed((h) => h + 1);
              }}
              className="text-yellow-400 text-xs hover:text-yellow-300 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              Show hint (-5 pts)
            </button>
          ) : (
            <div className="flex items-start gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3">
              <Sparkles className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-yellow-300 text-sm">{ch.hint}</p>
            </div>
          )}
        </div>

        {/* Answer buttons */}
        {answered === null ? (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleAnswer("phishing")}
              className="group flex flex-col items-center gap-2 p-6 bg-red-500/10 border-2 border-red-500/30 hover:border-red-400 hover:bg-red-500/20 rounded-2xl text-white font-bold transition-all hover:scale-[1.03]"
            >
              <AlertTriangle className="w-8 h-8 text-red-400 group-hover:scale-110 transition-transform" />
              <span className="text-lg">PHISHING</span>
              <span className="text-red-300 text-xs">This is an attack</span>
            </button>
            <button
              onClick={() => handleAnswer("safe")}
              className="group flex flex-col items-center gap-2 p-6 bg-green-500/10 border-2 border-green-500/30 hover:border-green-400 hover:bg-green-500/20 rounded-2xl text-white font-bold transition-all hover:scale-[1.03]"
            >
              <CheckCircle className="w-8 h-8 text-green-400 group-hover:scale-110 transition-transform" />
              <span className="text-lg">SAFE</span>
              <span className="text-green-300 text-xs">This is legitimate</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Result */}
            <div
              className={`rounded-2xl p-5 border-2 ${correct ? "bg-green-500/10 border-green-400" : "bg-red-500/10 border-red-400"}`}
            >
              <div className="flex items-center gap-3 mb-3">
                {correct ? (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-400" />
                )}
                <span
                  className={`text-lg font-bold ${correct ? "text-green-300" : "text-red-300"}`}
                >
                  {answered === "timeout"
                    ? "Time's up!"
                    : correct
                      ? "Correct!"
                      : "Not quite"}
                </span>
                {correct && (
                  <span className="ml-auto text-yellow-400 font-bold text-sm">
                    +
                    {DIFFICULTY_CONFIG[ch.difficulty].points +
                      (timeLeft > 20 ? 5 : timeLeft > 10 ? 2 : 0) -
                      (showHint ? 5 : 0)}{" "}
                    pts
                  </span>
                )}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                {ch.teach}
              </p>
            </div>

            {/* AI verdict */}
            {scanning ? (
              <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-blue-300 text-sm">
                  EndPhishAI scanning...
                </span>
              </div>
            ) : (
              apiVerdict && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-300 text-sm font-semibold">
                      EndPhishAI Analysis
                    </span>
                    <span
                      className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${
                        apiVerdict.verdict === "phishing"
                          ? "bg-red-500/20 text-red-300"
                          : apiVerdict.verdict === "suspicious"
                            ? "bg-orange-500/20 text-orange-300"
                            : "bg-green-500/20 text-green-300"
                      }`}
                    >
                      {apiVerdict.verdict?.toUpperCase()}{" "}
                      {apiVerdict.score > 0
                        ? `${Math.round(apiVerdict.score * 100)}%`
                        : ""}
                    </span>
                  </div>
                  {apiVerdict.reason && (
                    <p className="text-gray-400 text-xs">{apiVerdict.reason}</p>
                  )}
                </div>
              )
            )}

            <button
              onClick={nextChallenge}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl font-bold transition-all hover:scale-[1.02]"
            >
              {current >= challenges.length - 1 ? (
                <>
                  <Trophy className="w-5 h-5" />
                  See Results
                </>
              ) : (
                <>
                  <ArrowRight className="w-5 h-5" />
                  Next Challenge
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
