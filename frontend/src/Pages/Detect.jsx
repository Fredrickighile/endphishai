// Detect.jsx - FIXED VERSION (No TypeScript errors)
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ThreatBanner } from "../components/threatbanner";
import { ProtectionLayers } from "../components/protectionLayer";
import { BackendStatus } from "../components/BackendStatus";
import { SMSAlertSection } from "../components/SMSAlertSection";
import { useBackendStatus } from "../hooks/useBackendStatus";
import ActionButtons from "../components/ActionButtons";
import EnhancedContentDisplay from "../components/EnhancedContentDisplay";
import {
  Shield,
  AlertTriangle,
  Brain,
  Menu,
  X,
  Scan,
  Activity,
  BookOpen,
  Info,
  Mail,
  MessageSquare,
  Link2,
  Zap,
  Sparkles,
  Lock,
  Target,
  Loader,
  WifiOff,
  FileText,
  Upload,
  AlertCircle,
  CheckCircle,
  Globe,
} from "lucide-react";

export default function Detect() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [scanProgress, setScanProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scanMode, setScanMode] = useState("url");
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const [useContentAnalysis, setUseContentAnalysis] = useState(false);
  const [contentAnalysisLoading, setContentAnalysisLoading] = useState(false);
  const fileInputRef = useRef(null);
  const backendStatus = useBackendStatus();

  const handleTabSwitch = (newMode) => {
    setScanMode(newMode);
    setInput("");
    setResult(null);
    setError("");
    setSelectedFile(null);
    setFilePreview("");
    setUseContentAnalysis(false);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileExtension = file.name.toLowerCase().split(".").pop();
    const allowedExtensions = ["pdf", "txt", "csv", "html", "docx"];

    if (!allowedExtensions.includes(fileExtension)) {
      setError(
        `File type .${fileExtension} not supported. Allowed: PDF, TXT, CSV, HTML, DOCX`
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit");
      return;
    }

    setError("");
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setFilePreview(`📄 ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
    };
    reader.readAsDataURL(file);
  };

  const scanFile = async () => {
    if (!selectedFile) {
      setError("Please select a file first");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setScanProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("http://127.0.0.1:8000/upload-file", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setScanProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Server error: ${response.status}`
        );
      }

      const data = await response.json();
      setResult(data);

      setTimeout(() => setLoading(false), 500);
    } catch (err) {
      setLoading(false);
      setError(err.message);
      setScanProgress(0);
    }
  };

  const scanUrl = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);
    setScanProgress(0);

    if (useContentAnalysis && input.startsWith("http")) {
      setContentAnalysisLoading(true);
    }

    try {
      const progressInterval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const requestBody = {
        url: input.trim(),
      };

      if (useContentAnalysis && input.startsWith("http")) {
        requestBody.content_analysis = true;
      }

      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      clearInterval(progressInterval);
      setScanProgress(100);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);

      setTimeout(() => {
        setLoading(false);
        setContentAnalysisLoading(false);
      }, 500);
    } catch (err) {
      setLoading(false);
      setContentAnalysisLoading(false);
      setError(err.message);
      setScanProgress(0);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      if (scanMode === "file") {
        scanFile();
      } else {
        scanUrl();
      }
    }
  };

  const getPlaceholder = () => {
    switch (scanMode) {
      case "url":
        return "Paste suspicious URL here...\n\nExamples:\n• http://secure-bank-verify.tk/login\n• https://paypal-security.xyz/confirm";
      case "email":
        return "Paste the ENTIRE email content here (including sender, subject, and body)...\n\nExample:\nFrom: security@paypal-verify.com\nSubject: Urgent: Verify your account\nBody: Your PayPal account will be suspended...";
      case "message":
        return "Paste suspicious SMS or WhatsApp message here...\n\nExamples:\n• 'Your M-Pesa account has been locked. Click here to verify...'\n• 'You won $50,000! Claim now at...'";
      case "file":
        return "Upload PDF, TXT, CSV, or HTML files for analysis...";
      default:
        return "Paste content to scan...";
    }
  };

  const getLabel = () => {
    switch (scanMode) {
      case "url":
        return "🔗 Paste suspicious URL or link";
      case "email":
        return "📧 Paste full email content (sender, subject, body)";
      case "message":
        return "💬 Paste SMS, WhatsApp, or text message";
      case "file":
        return "📁 Upload document for analysis";
      default:
        return "Paste content to scan";
    }
  };

  const getExampleText = () => {
    switch (scanMode) {
      case "url":
        return "Perfect for checking suspicious links in emails, messages, or social media";
      case "email":
        return "Our AI analyzes sender patterns, urgency tactics, and phishing indicators in the full email context";
      case "message":
        return "Detects smishing (SMS phishing) and malicious WhatsApp/Telegram messages";
      case "file":
        return "Upload PDF invoices, text documents, CSV files, or HTML pages. We extract and analyze all text content.";
      default:
        return "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const ContentAnalysisToggle = () => {
    if (scanMode !== "url") return null;

    return (
      <div className="mt-4 p-4 bg-blue-500/10 border border-blue-400/20 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Globe className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">
                Deep Content Analysis
              </h4>
              <p className="text-blue-300 text-xs">
                Scan actual webpage content for hidden threats (takes 10-15
                seconds)
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={useContentAnalysis}
              onChange={(e) => setUseContentAnalysis(e.target.checked)}
              className="sr-only peer"
              disabled={loading}
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {contentAnalysisLoading && (
          <div className="mt-3 flex items-center gap-2 text-blue-300 text-sm">
            <Loader className="w-4 h-4 animate-spin" />
            Scanning webpage content... This may take 10-15 seconds
          </div>
        )}
      </div>
    );
  };

  const SecurityTips = () => (
    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mt-8">
      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
        <Shield className="w-5 h-5 text-blue-400" />
        AI Security Tips
      </h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex items-start gap-3 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
          <Zap className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-300">
            Always verify sender identity before clicking any links
          </p>
        </div>
        <div className="flex items-start gap-3 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
          <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-300">
            Check for spelling errors and suspicious URLs
          </p>
        </div>
        <div className="flex items-start gap-3 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
          <Lock className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-300">
            Look for HTTPS and valid security certificates
          </p>
        </div>
        <div className="flex items-start gap-3 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-300">
            Never share passwords or OTPs via email or SMS
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-1/4 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl">
              <div className="px-4 sm:px-6 py-3">
                <div className="flex items-center justify-between">
                  <Link to="/" className="flex items-center gap-2 sm:gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl blur-md opacity-75"></div>
                      <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl">
                        <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <span className="text-white font-bold text-lg sm:text-xl tracking-tight">
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
                      className="px-4 py-2 text-white bg-white/10 rounded-xl transition-all duration-300 text-sm font-medium flex items-center gap-2"
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
                    aria-label="Toggle menu"
                  >
                    {mobileMenuOpen ? (
                      <X className="w-6 h-6" />
                    ) : (
                      <Menu className="w-6 h-6" />
                    )}
                  </button>
                </div>

                {mobileMenuOpen && (
                  <div className="lg:hidden mt-4 pt-4 border-t border-white/10 space-y-2 animate-slide-down">
                    <Link
                      to="/"
                      className="block px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all duration-300 text-sm font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      to="/detect"
                      className="px-4 py-3 text-white bg-white/10 rounded-xl transition-all duration-300 text-sm font-medium flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Scan className="w-4 h-4" />
                      Detect Threats
                    </Link>
                    <Link
                      to="/learn"
                      className="px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all duration-300 text-sm font-medium flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <BookOpen className="w-4 h-4" />
                      Learn Security
                    </Link>
                    <Link
                      to="/about"
                      className="px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all duration-300 text-sm font-medium flex items-center gap-2"
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

      {/* Backend Status Indicator */}
      <BackendStatus backendStatus={backendStatus} />

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-5xl relative z-10 pt-28 sm:pt-32 pb-16">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-blue-400/30 text-blue-300 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium mb-6 shadow-lg shadow-blue-500/10">
            <div className="relative">
              <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <span className="hidden sm:inline">
              AI-Powered Threat Detection • URLs • Emails • Messages • Files
            </span>
            <span className="sm:hidden">Multi-Format AI Scanner</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            <span className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Advanced
            </span>
            <br className="sm:hidden" />{" "}
            <span className="inline-block">Threat Scanner</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            Analyze URLs, emails, messages, and files for phishing threats with
            our multi-format AI scanner
          </p>
        </div>

        {/* TABS */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl"></div>
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2">
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => handleTabSwitch("url")}
                  className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    scanMode === "url"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Link2 className="w-4 h-4" />
                  <span className="hidden sm:inline">URL</span>
                  <span className="sm:hidden">URL</span>
                </button>

                <button
                  onClick={() => handleTabSwitch("email")}
                  className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    scanMode === "email"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span className="hidden sm:inline">Email</span>
                  <span className="sm:hidden">Email</span>
                </button>

                <button
                  onClick={() => handleTabSwitch("message")}
                  className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    scanMode === "message"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="hidden sm:inline">SMS</span>
                  <span className="sm:hidden">SMS</span>
                </button>

                <button
                  onClick={() => handleTabSwitch("file")}
                  className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    scanMode === "file"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">File</span>
                  <span className="sm:hidden">File</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tab Description */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400">{getExampleText()}</p>
          </div>
        </div>

        {/* Scan Input - ENHANCED */}
        <div className="relative mb-6 sm:mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl sm:rounded-3xl blur-xl"></div>
          <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-2xl">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              <label className="block text-xs sm:text-sm font-semibold text-gray-200">
                {getLabel()}
              </label>
            </div>

            {scanMode === "file" ? (
              /* FILE UPLOAD SECTION */
              <div className="space-y-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".pdf,.txt,.csv,.html"
                  className="hidden"
                />

                {!selectedFile ? (
                  <div
                    onClick={triggerFileInput}
                    className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-400/50 transition-all duration-300 hover:bg-white/5"
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-white font-medium mb-2">
                      Upload Document
                    </p>
                    <p className="text-gray-400 text-sm">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                      PDF, TXT, CSV, HTML, DOCX up to 5MB
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* File Preview */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="w-8 h-8 text-blue-400" />
                          <div>
                            <p className="text-white font-medium">
                              {selectedFile.name}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {(selectedFile.size / 1024).toFixed(1)} KB •{" "}
                              {selectedFile.type || "Unknown type"}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedFile(null);
                            setFilePreview("");
                          }}
                          className="text-red-400 hover:text-red-300 p-2 transition-all"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Supported Files Info */}
                    <div className="bg-blue-500/10 border border-blue-400/20 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-300 text-sm font-medium">
                          Supported Files
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-gray-300">PDF Documents</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-gray-300">
                            Text Files (.txt)
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-gray-300">CSV Data</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-gray-300">HTML Pages</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-gray-300">
                            Word Documents (.docx)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* TEXT INPUT SECTION */
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={getPlaceholder()}
                className={`w-full px-4 sm:px-5 py-3 sm:py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all resize-none text-sm sm:text-base text-white placeholder-gray-500 ${
                  scanMode === "url" ? "h-28 sm:h-32" : "h-48 sm:h-56"
                }`}
                disabled={loading}
              />
            )}

            {/* CONTENT ANALYSIS TOGGLE */}
            {scanMode === "url" && <ContentAnalysisToggle />}

            {loading && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm text-blue-300 font-medium">
                    {scanMode === "file"
                      ? "Analyzing file content..."
                      : contentAnalysisLoading
                      ? "Deep scanning webpage..."
                      : "Analyzing with AI..."}
                  </span>
                  <span className="text-xs sm:text-sm text-blue-300 font-bold">
                    {Math.round(scanProgress)}%
                  </span>
                </div>
                <div className="relative w-full bg-white/10 backdrop-blur-sm rounded-full h-2 sm:h-3 overflow-hidden border border-white/20">
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent animate-scan"></div>
                  </div>
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 transition-all duration-300 rounded-full"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6">
              <button
                onClick={scanMode === "file" ? scanFile : scanUrl}
                disabled={
                  loading ||
                  backendStatus === "offline" ||
                  (scanMode === "file" ? !selectedFile : !input.trim())
                }
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-5 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base lg:text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/50 flex items-center justify-center gap-2 sm:gap-3"
              >
                {backendStatus === "offline" ? (
                  <>
                    <WifiOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Server Offline</span>
                  </>
                ) : loading ? (
                  <>
                    <Loader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    <span>
                      {scanMode === "file"
                        ? "Analyzing File..."
                        : contentAnalysisLoading
                        ? "Deep Scanning..."
                        : "Scanning..."}
                    </span>
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>
                      {scanMode === "file"
                        ? "Analyze File"
                        : "Scan for Threats"}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="relative mb-6 animate-fade-in">
            <div className="absolute inset-0 bg-red-500/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-gradient-to-br from-red-500/20 to-red-600/10 backdrop-blur-xl border border-red-400/30 p-5 rounded-2xl">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
                <p className="text-base text-red-300 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Section - ENHANCED */}
        {result && (
          <div className="space-y-6 animate-fade-in">
            <ThreatBanner result={result} />

            {/* Enhanced Content Display Component */}
            <EnhancedContentDisplay result={result} />

            {/* File-specific results */}
            {result.input_type === "file" && (
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-xl"></div>
                <div className="relative bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6">
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-400" />
                    File Analysis Details
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="text-gray-400 text-sm mb-1">File Name</p>
                      <p className="text-white font-medium">
                        {result.file_name}
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="text-gray-400 text-sm mb-1">File Type</p>
                      <p className="text-white font-medium">
                        {result.file_type}
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="text-gray-400 text-sm mb-1">URLs Found</p>
                      <p className="text-white font-medium">
                        {result.urls_count}
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="text-gray-400 text-sm mb-1">Text Length</p>
                      <p className="text-white font-medium">
                        {result.extracted_text_length} characters
                      </p>
                    </div>
                  </div>

                  {/* URLs Found */}
                  {result.urls_found && result.urls_found.length > 0 && (
                    <div className="mt-4">
                      <p className="text-gray-400 text-sm mb-2">
                        URLs Found in File:
                      </p>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {result.urls_found.map((url, index) => (
                          <div
                            key={index}
                            className="bg-white/5 rounded-lg p-3"
                          >
                            <p className="text-blue-300 text-sm break-all">
                              {url}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Dangerous URLs */}
                  {result.dangerous_urls &&
                    result.dangerous_urls.length > 0 && (
                      <div className="mt-4 p-4 bg-red-500/10 border border-red-400/20 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="w-5 h-5 text-red-400" />
                          <span className="text-red-300 font-bold">
                            Dangerous URLs Detected!
                          </span>
                        </div>
                        {result.dangerous_urls.map((danger, index) => (
                          <div key={index} className="text-red-200 text-sm">
                            • {danger.url} - Flagged by {danger.threat}
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            )}

            <ProtectionLayers result={result} />
            <SMSAlertSection result={result} />
            <ActionButtons result={result} />
          </div>
        )}

        {/* Security Tips */}
        <SecurityTips />
      </div>
    </div>
  );
}
