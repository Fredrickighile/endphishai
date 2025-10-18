export const isPhishing = (result) => {
  if (!result) return false;
  const pred = result.ai_result?.toLowerCase();
  const finalStatus = result.final_status?.toLowerCase();
  const googleResult = result.google_result?.toLowerCase();
  const virustotalResult = result.virustotal_result?.toLowerCase();
  const phishtankResult = result.phishtank_result?.toLowerCase();
  const urlhausResult = result.urlhaus_result?.toLowerCase();

  return (
    pred === "phishing" ||
    pred === "malicious" ||
    finalStatus === "phishing" ||
    finalStatus === "malicious" ||
    googleResult === "malicious" ||
    virustotalResult === "malicious" ||
    phishtankResult === "malicious" ||
    urlhausResult === "malicious"
  );
};

export const isSuspicious = (result) => {
  if (!result) return false;
  const pred = result.ai_result?.toLowerCase();
  const finalStatus = result.final_status?.toLowerCase();
  const virustotalResult = result.virustotal_result?.toLowerCase();
  const phishtankResult = result.phishtank_result?.toLowerCase();
  const urlhausResult = result.urlhaus_result?.toLowerCase();

  return (
    pred === "suspicious" ||
    finalStatus === "suspicious" ||
    virustotalResult === "suspicious" ||
    phishtankResult === "suspicious" ||
    urlhausResult === "suspicious"
  );
};

export const getDisplayConfidence = (result) => {
  if (!result) return 0;

  if (result.google_result?.toLowerCase() === "malicious") return 99.9;
  if (result.virustotal_result?.toLowerCase() === "malicious") return 95.0;
  if (result.phishtank_result?.toLowerCase() === "malicious") return 98.0;
  if (result.urlhaus_result?.toLowerCase() === "malicious") return 96.0;
  if (result.ai_score && result.ai_score > 0) return result.ai_score * 100;
  if (result.heuristic_score !== undefined && result.heuristic_score !== null)
    return result.heuristic_score * 100;
  if (result.ml_score !== undefined && result.ml_score !== null)
    return result.ml_score * 100;
  if (isPhishing(result)) return 85;
  if (isSuspicious(result)) return 60;
  return 90;
};

export const getThreatLevel = (result) => {
  if (!result) return "unknown";
  if (result.google_result?.toLowerCase() === "malicious") return "critical";
  if (result.virustotal_result?.toLowerCase() === "malicious") return "high";
  if (result.phishtank_result?.toLowerCase() === "malicious") return "high";
  if (result.urlhaus_result?.toLowerCase() === "malicious") return "high";
  if (isPhishing(result)) return "high";
  if (isSuspicious(result)) return "medium";
  return "low";
};

export const getUserFriendlyExplanation = (result) => {
  if (!result) return "";

  if (result.google_result?.toLowerCase() === "malicious") {
    return "This URL has been flagged by Google Safe Browsing as a confirmed threat. It may attempt to steal your personal information, login credentials, or install malware on your device.";
  }

  if (result.virustotal_result?.toLowerCase() === "malicious") {
    return "VirusTotal has detected this URL as malicious across multiple antivirus engines. This is a confirmed security threat that should be avoided.";
  }

  if (result.phishtank_result?.toLowerCase() === "malicious") {
    return "PhishTank has verified this URL as an active phishing site based on community reports. This is a confirmed phishing attempt.";
  }

  if (result.urlhaus_result?.toLowerCase() === "malicious") {
    return "URLhaus has identified this URL as malicious and associated with malware or phishing campaigns. Avoid this site.";
  }

  if (isPhishing(result)) {
    const explanation = result.explanation || result.ai_reason || "";
    if (
      explanation.includes("suspicious TLD") ||
      explanation.includes("domain extension")
    ) {
      return "Our AI detected this uses a suspicious domain commonly associated with phishing attacks. Legitimate companies rarely use these domain types.";
    }
    if (explanation.includes("IP address")) {
      return "This link uses an IP address instead of a proper domain name - a common tactic used by scammers to hide their identity.";
    }
    if (explanation.includes("urgency") || explanation.includes("urgent")) {
      return "Our AI detected urgent language designed to pressure you into acting quickly without thinking. This is a classic phishing tactic.";
    }
    return "Our AI identified multiple patterns commonly used in phishing attacks. This appears to be an attempt to steal your personal information or credentials.";
  }

  if (isSuspicious(result)) {
    return "While not definitively malicious, this content shows characteristics associated with phishing attempts. Exercise caution and verify the source before proceeding.";
  }

  return "Our AI analysis found no indicators of phishing or malicious intent. However, always verify unexpected messages and avoid sharing sensitive information.";
};

export const colors = {
  critical: {
    bg: "bg-red-500/20",
    border: "border-red-500",
    text: "text-red-300",
    icon: "text-red-400",
    gradient: "from-red-500 to-pink-500",
  },
  high: {
    bg: "bg-orange-500/20",
    border: "border-orange-500",
    text: "text-orange-300",
    icon: "text-orange-400",
    gradient: "from-orange-500 to-red-500",
  },
  medium: {
    bg: "bg-yellow-500/20",
    border: "border-yellow-500",
    text: "text-yellow-300",
    icon: "text-yellow-400",
    gradient: "from-yellow-500 to-orange-500",
  },
  low: {
    bg: "bg-green-500/20",
    border: "border-green-500",
    text: "text-green-300",
    icon: "text-green-400",
    gradient: "from-green-500 to-teal-500",
  },
};
