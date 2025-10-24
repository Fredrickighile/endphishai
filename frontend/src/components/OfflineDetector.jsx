import { useState, useEffect } from "react";
import { WifiOff, Wifi } from "lucide-react";

export default function OfflineDetector() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowToast(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!showToast) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
      <div
        className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border ${
          isOnline
            ? "bg-green-500/20 border-green-400/50"
            : "bg-red-500/20 border-red-400/50"
        }`}
      >
        {isOnline ? (
          <>
            <Wifi className="w-6 h-6 text-green-400" />
            <div>
              <p className="text-green-300 font-bold">Back Online!</p>
              <p className="text-green-200 text-sm">Full features restored</p>
            </div>
          </>
        ) : (
          <>
            <WifiOff className="w-6 h-6 text-red-400" />
            <div>
              <p className="text-red-300 font-bold">You're Offline</p>
              <p className="text-red-200 text-sm">
                Basic detection still works
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
