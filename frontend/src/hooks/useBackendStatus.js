import { useState, useEffect } from "react";

export const useBackendStatus = () => {
  const [backendStatus, setBackendStatus] = useState("checking");

  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/");
        if (response.ok) {
          setBackendStatus("online");
        } else {
          setBackendStatus("offline");
        }
      } catch (error) {
        setBackendStatus("offline");
      }
    };

    checkBackendStatus();
  }, []);

  return backendStatus;
};
