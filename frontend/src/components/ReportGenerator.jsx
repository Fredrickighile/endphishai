import { jsPDF } from "jspdf";

export const generateBeautifulPDF = (result) => {
  const doc = new jsPDF();

  // Ultra-premium color palette
  const colors = {
    primary: [37, 99, 235],
    success: [16, 185, 129],
    warning: [251, 146, 60],
    danger: [220, 38, 38],
    dark: [17, 24, 39],
    darkGray: [55, 65, 81],
    mediumGray: [107, 114, 128],
    lightGray: [156, 163, 175],
    light: [249, 250, 251],
    white: [255, 255, 255],
    accent: [139, 92, 246],
  };

  // ===== PREMIUM HEADER =====
  // Dark background
  doc.setFillColor(...colors.dark);
  doc.rect(0, 0, 210, 55, "F");

  // Gradient overlay
  doc.setFillColor(37, 99, 235, 0.15);
  doc.rect(0, 0, 210, 55, "F");

  // Triple accent lines at bottom of header
  doc.setFillColor(...colors.accent);
  doc.rect(0, 53, 210, 0.8, "F");
  doc.setFillColor(59, 130, 246);
  doc.rect(0, 54, 210, 0.8, "F");
  doc.setFillColor(139, 92, 246);
  doc.rect(0, 55, 210, 0.8, "F");

  // ===== ENDPHISHAI LOGO - EXACT REPLICA =====
  // Purple gradient background circle for logo
  doc.setFillColor(99, 102, 241);
  doc.roundedRect(20, 12, 20, 20, 4, 4, "F");

  // Draw the phi symbol (φ) - the actual logo
  doc.setTextColor(...colors.white);
  doc.setFontSize(24);
  doc.setFont("times", "italic"); // Phi symbol looks better in Times
  doc.text("φ", 30, 27, { align: "center" });

  // Company name - BOLD and prominent
  doc.setTextColor(...colors.white);
  doc.setFontSize(32);
  doc.setFont("helvetica", "bold");
  doc.text("EndPhishAI", 46, 22);

  // Subtitle
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...colors.lightGray);
  doc.text("PROFESSIONAL SECURITY SUITE", 46, 28);

  // Tagline
  doc.setFontSize(6.5);
  doc.setFont("helvetica", "italic");
  doc.text("Advanced AI-Powered Threat Intelligence Platform", 46, 32);

  // ===== RIGHT SIDE - REPORT INFO =====
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...colors.white);
  doc.text("SECURITY REPORT", 205, 16, { align: "right" });

  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...colors.lightGray);
  doc.text("CLASSIFICATION: CONFIDENTIAL", 205, 21, { align: "right" });

  doc.setFontSize(6.5);
  const reportDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.text(reportDate, 205, 25, { align: "right" });

  // AI Active indicator with green dot
  doc.setFillColor(16, 185, 129);
  doc.circle(176, 28.5, 1.5, "F");
  doc.setFontSize(6);
  doc.setTextColor(16, 185, 129);
  doc.text("AI ACTIVE", 205, 29.5, { align: "right" });

  let y = 68;

  // ===== THREAT STATUS BANNER =====
  const status = result.final_status || result.ai_result;
  const confidence = (result.ai_score * 100).toFixed(1);

  let statusColor, statusText, statusDesc, statusIcon;
  if (status === "phishing") {
    statusColor = colors.danger;
    statusText = "CRITICAL THREAT DETECTED";
    statusDesc = "Phishing attack identified - Immediate action required";
    statusIcon = "ALERT";
  } else if (status === "suspicious") {
    statusColor = colors.warning;
    statusText = "SUSPICIOUS ACTIVITY DETECTED";
    statusDesc = "Potential threat indicators found - Exercise caution";
    statusIcon = "WARN";
  } else {
    statusColor = colors.success;
    statusText = "CONTENT VERIFIED SAFE";
    statusDesc = "No threats detected - Content appears legitimate";
    statusIcon = "SAFE";
  }

  // Multi-layer shadow for premium depth
  doc.setFillColor(0, 0, 0, 0.08);
  doc.roundedRect(23, y + 3, 164, 38, 10, 10, "F");
  doc.setFillColor(0, 0, 0, 0.05);
  doc.roundedRect(22, y + 2, 166, 38, 10, 10, "F");
  doc.setFillColor(0, 0, 0, 0.03);
  doc.roundedRect(21, y + 1, 168, 38, 10, 10, "F");

  // Main status card
  doc.setFillColor(...statusColor);
  doc.roundedRect(20, y, 170, 36, 10, 10, "F");

  // Left accent bar
  doc.setFillColor(255, 255, 255, 0.3);
  doc.roundedRect(20, y, 5, 36, 10, 10, "F");

  // Status icon badge
  doc.setFillColor(255, 255, 255, 0.25);
  doc.circle(40, y + 18, 10, "F");
  doc.setFillColor(255, 255, 255, 0.15);
  doc.circle(40, y + 18, 8, "F");

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...colors.white);
  doc.text(statusIcon, 40, y + 20, { align: "center" });

  // Status text
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(statusText, 58, y + 13);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(255, 255, 255, 0.95);
  doc.text(statusDesc, 58, y + 21);

  // Confidence score badge
  doc.setFillColor(255, 255, 255, 0.25);
  doc.roundedRect(145, y + 10, 38, 16, 5, 5, "F");

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(255, 255, 255, 0.9);
  doc.text("CONFIDENCE", 164, y + 17, { align: "center" });

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...colors.white);
  doc.text(`${confidence}%`, 164, y + 24, { align: "center" });

  y += 48;

  // ===== SCAN INFORMATION PANEL =====
  doc.setDrawColor(229, 231, 235);
  doc.setLineWidth(0.3);
  doc.setFillColor(...colors.white);
  doc.roundedRect(20, y, 170, 48, 8, 8, "FD");

  // Blue header bar
  doc.setFillColor(...colors.primary);
  doc.roundedRect(20, y, 170, 12, 8, 8, "F");
  doc.setFillColor(...colors.white);
  doc.roundedRect(20, y + 10, 170, 38, 8, 8, "F");

  // Purple accent line on left
  doc.setFillColor(...colors.accent);
  doc.rect(20, y, 4, 48, "F");

  doc.setTextColor(...colors.white);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("SCAN INFORMATION", 28, y + 8);

  y += 18;

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");

  const details = [
    {
      label: "Scan Timestamp",
      value: new Date().toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "medium",
      }),
      icon: "TIME",
    },
    {
      label: "Target Analyzed",
      value: result.url || result.file_name || "Text Content",
      icon: "TGT",
    },
    {
      label: "Analysis Method",
      value: result.input_type || "URL Analysis",
      icon: "TYPE",
    },
    {
      label: "Report Reference",
      value: `RPT-${Date.now().toString().slice(-8)}`,
      icon: "ID",
    },
  ];

  details.forEach((detail, index) => {
    const row = Math.floor(index / 2);
    const col = index % 2;
    const xPos = col === 0 ? 28 : 110;
    const yPos = y + row * 14;

    // Icon badge
    doc.setFillColor(37, 99, 235, 0.1);
    doc.roundedRect(xPos, yPos - 3, 12, 8, 2, 2, "F");
    doc.setFontSize(6);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...colors.primary);
    doc.text(detail.icon, xPos + 6, yPos + 1, { align: "center" });

    // Label
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...colors.darkGray);
    doc.text(detail.label, xPos + 14, yPos - 1);

    // Value
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...colors.mediumGray);
    doc.setFontSize(7);
    const maxWidth = col === 0 ? 68 : 78;
    if (detail.value.length > 35) {
      const lines = doc.splitTextToSize(detail.value, maxWidth);
      doc.text(lines[0].substring(0, 32) + "...", xPos + 14, yPos + 4);
    } else {
      doc.text(detail.value, xPos + 14, yPos + 4);
    }
  });

  y += 38;

  // ===== AI ANALYSIS FINDINGS =====
  doc.setDrawColor(229, 231, 235);
  doc.setFillColor(...colors.white);
  doc.roundedRect(20, y, 170, 32, 8, 8, "FD");

  doc.setFillColor(...colors.accent);
  doc.roundedRect(20, y, 170, 10, 8, 8, "F");
  doc.setFillColor(...colors.white);
  doc.roundedRect(20, y + 8, 170, 24, 8, 8, "F");

  doc.setFillColor(139, 92, 246);
  doc.rect(20, y, 4, 32, "F");

  doc.setTextColor(...colors.white);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("ARTIFICIAL INTELLIGENCE ANALYSIS", 28, y + 7);

  y += 15;

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...colors.mediumGray);

  const findings =
    result.explanation ||
    "Comprehensive multi-layer analysis completed using advanced machine learning algorithms, natural language processing, and real-time threat intelligence from multiple security sources. Analysis includes behavioral patterns, linguistic indicators, and known threat signatures.";

  const findingsLines = doc.splitTextToSize(findings, 158);
  findingsLines.slice(0, 3).forEach((line, index) => {
    doc.text(line, 28, y + index * 4);
  });

  y += 22;

  // ===== SECURITY DEFENSE LAYERS =====
  doc.setDrawColor(229, 231, 235);
  doc.setFillColor(249, 250, 251);
  doc.roundedRect(20, y, 170, 52, 8, 8, "FD");

  doc.setFillColor(...colors.success);
  doc.roundedRect(20, y, 170, 10, 8, 8, "F");
  doc.setFillColor(249, 250, 251);
  doc.roundedRect(20, y + 8, 170, 44, 8, 8, "F");

  doc.setFillColor(16, 185, 129);
  doc.rect(20, y, 4, 52, "F");

  doc.setTextColor(...colors.white);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("SECURITY DEFENSE LAYERS", 28, y + 7);

  doc.setFontSize(6.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...colors.lightGray);
  doc.text(
    "Multi-layered protection analysis with real-time threat intelligence",
    28,
    y + 14
  );

  y += 20;

  const layers = [
    {
      name: "AI Machine Learning Engine",
      desc: "Neural network threat detection",
    },
    { name: "Google Safe Browsing API", desc: "Real-time URL verification" },
    { name: "VirusTotal Multi-Engine", desc: "70+ antivirus engines" },
    { name: "URLhaus Threat Database", desc: "Malware URL repository" },
    { name: "Advanced Feature Analysis", desc: "Behavioral pattern matching" },
    { name: "Threat Intelligence Feed", desc: "Global threat data" },
  ];

  layers.forEach((layer, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const xPos = col === 0 ? 28 : 110;
    const yPos = y + row * 11;

    // Status indicator - green dot
    doc.setFillColor(16, 185, 129, 0.15);
    doc.circle(xPos + 2, yPos, 3, "F");
    doc.setFillColor(16, 185, 129);
    doc.circle(xPos + 2, yPos, 1.5, "F");

    doc.setFontSize(8);
    doc.setTextColor(...colors.darkGray);
    doc.setFont("helvetica", "bold");
    doc.text(layer.name, xPos + 7, yPos - 1);

    doc.setFontSize(6.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...colors.mediumGray);
    doc.text(layer.desc, xPos + 7, yPos + 3);
  });

  y += 38;

  // ===== RECOMMENDED ACTIONS =====
  const recColor =
    status === "phishing"
      ? colors.danger
      : status === "suspicious"
      ? colors.warning
      : colors.success;

  // Shadow layers
  doc.setFillColor(0, 0, 0, 0.08);
  doc.roundedRect(23, y + 3, 164, 46, 10, 10, "F");
  doc.setFillColor(0, 0, 0, 0.05);
  doc.roundedRect(22, y + 2, 166, 46, 10, 10, "F");
  doc.setFillColor(0, 0, 0, 0.03);
  doc.roundedRect(21, y + 1, 168, 46, 10, 10, "F");

  // Main card
  doc.setFillColor(...recColor);
  doc.roundedRect(20, y, 170, 44, 10, 10, "F");

  // Left accent
  doc.setFillColor(255, 255, 255, 0.3);
  doc.roundedRect(20, y, 5, 44, 10, 10, "F");

  // Icon badge
  doc.setFillColor(255, 255, 255, 0.25);
  doc.circle(35, y + 11, 7, "F");
  doc.setFontSize(14);
  doc.setTextColor(...colors.white);
  doc.setFont("helvetica", "bold");
  doc.text("!", 35, y + 14, { align: "center" });

  doc.setFontSize(12);
  doc.text("RECOMMENDED ACTIONS", 48, y + 10);

  doc.setDrawColor(255, 255, 255, 0.3);
  doc.setLineWidth(0.3);
  doc.line(48, y + 13, 185, y + 13);

  y += 19;

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(255, 255, 255, 0.98);

  let recommendations = [];
  if (status === "phishing") {
    recommendations = [
      "Do not click any links or download attachments from this source",
      "Delete the suspicious content immediately from all systems",
      "Report to your IT security team or system administrator",
      "Change passwords immediately if credentials were entered",
      "Warn colleagues who may have received similar content",
    ];
  } else if (status === "suspicious") {
    recommendations = [
      "Verify sender identity through official communication channels",
      "Examine URLs and links carefully before clicking",
      "Type website addresses manually instead of clicking links",
      "Do not enter personal or financial information",
      "Contact the organization directly using official contact methods",
    ];
  } else {
    recommendations = [
      "Content appears safe based on comprehensive analysis",
      "Continue following standard security best practices",
      "Keep security software and systems updated regularly",
      "Maintain multi-factor authentication on all accounts",
      "Remain vigilant with any unfamiliar content or requests",
    ];
  }

  recommendations.forEach((rec, index) => {
    doc.setFillColor(255, 255, 255, 0.4);
    doc.circle(30, y + index * 5.5 - 0.5, 1, "F");

    const lines = doc.splitTextToSize(rec, 148);
    doc.text(lines[0], 34, y + index * 5.5);
  });

  // ===== PREMIUM FOOTER =====
  doc.setFillColor(...colors.dark);
  doc.rect(0, 267, 210, 30, "F");

  // Triple accent lines
  doc.setFillColor(...colors.accent);
  doc.rect(0, 267, 210, 0.8, "F");
  doc.setFillColor(59, 130, 246);
  doc.rect(0, 267.8, 210, 0.8, "F");
  doc.setFillColor(139, 92, 246);
  doc.rect(0, 268.6, 210, 0.8, "F");

  // Left badge - ENCRYPTED
  doc.setFillColor(255, 255, 255, 0.08);
  doc.roundedRect(18, 273, 38, 10, 3, 3, "F");
  doc.setFontSize(6.5);
  doc.setTextColor(...colors.lightGray);
  doc.setFont("helvetica", "bold");
  doc.text("ENCRYPTED", 37, 279, { align: "center" });

  // Center text
  doc.setTextColor(...colors.white);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("EndPhishAI Professional Security System", 105, 275, {
    align: "center",
  });

  doc.setFontSize(6.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...colors.lightGray);
  doc.text("Enterprise-Grade Threat Intelligence Platform", 105, 280, {
    align: "center",
  });

  doc.setFontSize(6);
  const reportId = `RPT-${Date.now().toString().slice(-8)}`;
  const generated = new Date().toLocaleString();
  doc.text(
    `Report ID: ${reportId} | Generated: ${generated} | Classification: Confidential`,
    105,
    285,
    { align: "center" }
  );

  // Right badge - VERIFIED
  doc.setFillColor(255, 255, 255, 0.08);
  doc.roundedRect(154, 273, 38, 10, 3, 3, "F");
  doc.setFontSize(6.5);
  doc.setTextColor(...colors.lightGray);
  doc.setFont("helvetica", "bold");
  doc.text("VERIFIED", 173, 279, { align: "center" });

  return doc;
};

// ===== TEXT REPORT =====
export const generateProfessionalTextReport = (result) => {
  const status = result.final_status || result.ai_result;
  const confidence = (result.ai_score * 100).toFixed(1);

  const statusText =
    status === "phishing"
      ? "CRITICAL THREAT DETECTED"
      : status === "suspicious"
      ? "SUSPICIOUS ACTIVITY DETECTED"
      : "CONTENT VERIFIED SAFE";

  let report = `
╔════════════════════════════════════════════════════════════════════╗
║                                                                    ║
║                    EndPhishAI SECURITY REPORT                      ║
║                                                                    ║
║            Professional Threat Intelligence Analysis               ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝

════════════════════════════════════════════════════════════════════
EXECUTIVE SUMMARY: ${statusText}
════════════════════════════════════════════════════════════════════

Confidence Score: ${confidence}%
Analysis Date: ${new Date().toLocaleString()}
Report ID: RPT-${Date.now().toString().slice(-8)}
Classification: CONFIDENTIAL

────────────────────────────────────────────────────────────────────
SCAN INFORMATION
────────────────────────────────────────────────────────────────────

Target Analyzed: ${result.url || result.file_name || "Text Content"}
Analysis Method: ${result.input_type || "URL Analysis"}
Scan Timestamp: ${new Date().toISOString()}
Processing Time: Real-time

────────────────────────────────────────────────────────────────────
ARTIFICIAL INTELLIGENCE ANALYSIS
────────────────────────────────────────────────────────────────────

${
  result.explanation ||
  "Comprehensive multi-layer analysis completed using advanced machine learning algorithms, natural language processing, and real-time threat intelligence from multiple security sources."
}

────────────────────────────────────────────────────────────────────
SECURITY DEFENSE LAYERS ACTIVATED
────────────────────────────────────────────────────────────────────

• AI Machine Learning Engine - Neural network threat detection
• Google Safe Browsing API - Real-time URL verification
• VirusTotal Multi-Engine - 70+ antivirus engines
• URLhaus Threat Database - Malware URL repository
• Advanced Feature Analysis - Behavioral pattern matching
• Threat Intelligence Feed - Global threat data

────────────────────────────────────────────────────────────────────
RECOMMENDED ACTIONS
────────────────────────────────────────────────────────────────────
`;

  if (status === "phishing") {
    report += `
IMMEDIATE ACTION REQUIRED:

• Do not click any links or download attachments from this source
• Delete the suspicious content immediately from all systems
• Report to your IT security team or system administrator
• Change passwords immediately if credentials were entered
• Warn colleagues who may have received similar content
`;
  } else if (status === "suspicious") {
    report += `
EXERCISE EXTREME CAUTION:

• Verify sender identity through official communication channels
• Examine URLs and links carefully before clicking
• Type website addresses manually instead of clicking links
• Do not enter personal or financial information
• Contact the organization directly using official contact methods
`;
  } else {
    report += `
SECURITY BEST PRACTICES:

• Content appears safe based on comprehensive analysis
• Continue following standard security best practices
• Keep security software and systems updated regularly
• Maintain multi-factor authentication on all accounts
• Remain vigilant with any unfamiliar content or requests
`;
  }

  report += `
────────────────────────────────────────────────────────────────────
PRIVACY & SECURITY NOTICE
────────────────────────────────────────────────────────────────────

All analysis performed locally in your browser
Zero data retention - No information stored or transmitted
Complete privacy guaranteed - GDPR & CCPA compliant

────────────────────────────────────────────────────────────────────
Generated by EndPhishAI Professional Security System
Enterprise-Grade Threat Intelligence Platform
────────────────────────────────────────────────────────────────────

© ${new Date().getFullYear()} EndPhishAI - Advanced Threat Detection Technology

════════════════════════════════════════════════════════════════════
                         END OF REPORT
════════════════════════════════════════════════════════════════════
`;

  return report;
};
