import { useState } from "react";
import { Download, FileText, Shield, CheckCircle } from "lucide-react";
import {
  generateBeautifulPDF,
  generateProfessionalTextReport,
} from "./ReportGenerator";

export default function ActionButtons({ result }) {
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "" }),
      3000
    );
  };

  const downloadPDF = () => {
    try {
      const doc = generateBeautifulPDF(result);
      const filename = `EndPhishAI_Security_Report_${Date.now()}.pdf`;
      doc.save(filename);
      showNotification(
        " Professional PDF report downloaded successfully!",
        "success"
      );
    } catch (error) {
      console.error("PDF generation failed:", error);
      showNotification(
        " PDF generation failed. Downloading text report instead.",
        "error"
      );
      setTimeout(downloadTextReport, 1000);
    }
  };

  const downloadTextReport = () => {
    try {
      const textReport = generateProfessionalTextReport(result);
      const blob = new Blob([textReport], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `EndPhishAI_Report_${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showNotification(" Text report downloaded successfully!", "success");
    } catch (error) {
      showNotification(" Failed to download text report", "error");
    }
  };

  return (
    <div className="space-y-4">
      {/* Notification */}
      {notification.show && (
        <div
          className={`relative animate-fade-in backdrop-blur-xl border rounded-2xl p-4 ${
            notification.type === "error"
              ? "bg-red-500/20 border-red-400/30"
              : "bg-green-500/20 border-green-400/30"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            {notification.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <Shield className="w-5 h-5 text-red-400" />
            )}
            <p
              className={`font-medium ${
                notification.type === "error"
                  ? "text-red-300"
                  : "text-green-300"
              }`}
            >
              {notification.message}
            </p>
          </div>
        </div>
      )}

      {/* SINGLE DOWNLOAD BUTTON - Clean and Professional */}
      <div className="text-center">
        <button
          onClick={downloadPDF}
          className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 hover:scale-[1.02] shadow-lg hover:shadow-xl overflow-hidden mx-auto"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/10 to-purple-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

          <Download className="w-5 h-5 relative z-10" />
          <span className="relative z-10">Download Security Report</span>
        </button>

        <p className="text-gray-400 text-sm mt-2">
          Download a detailed PDF security report for your records
        </p>
      </div>

      {/* Security Info - UPDATED */}
      <div className="bg-blue-500/10 border border-blue-400/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-blue-200 text-sm">
              <strong>Secure Local Generation:</strong> All reports are
              generated locally in your browser. No data is stored, shared, or
              transmitted to external servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
