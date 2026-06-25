import { useState, useEffect } from "react";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export const useBackendStatus = () => {
  const [backendStatus, setBackendStatus] = useState("checking");

  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        const response = await fetch(`${API_BASE_URL}/health`, {
          signal: controller.signal,
        });
        clearTimeout(timeout);
        setBackendStatus(response.ok ? "online" : "offline");
      } catch {
        setBackendStatus("offline");
      }
    };
    checkBackendStatus();
  }, []);

  return backendStatus;
};
