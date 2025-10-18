export const shareReport = async (result) => {
  const textReport = generateTextReport(result);

  if (navigator.share) {
    try {
      await navigator.share({
        title: "EndPhishAI Security Report",
        text: textReport,
        url: window.location.href,
      });
      return { success: true, message: "Report shared successfully!" };
    } catch (error) {
      if (error.name !== "AbortError") {
        return { success: false, message: "Share cancelled or failed" };
      }
    }
  } else {
    // Fallback: Copy to clipboard
    return copyToClipboard(textReport);
  }
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return { success: true, message: "Report copied to clipboard!" };
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    return { success: true, message: "Report copied to clipboard!" };
  }
};

export const shareToEmail = (result) => {
  const subject = `EndPhishAI Security Report - ${result.final_status.toUpperCase()} Detection`;
  const body = generateTextReport(result);

  const mailtoLink = `mailto:?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;

  return { success: true, message: "Opening email client..." };
};
