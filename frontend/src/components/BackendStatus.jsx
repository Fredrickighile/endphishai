import { Wifi, WifiOff } from "lucide-react";

export const BackendStatus = ({ backendStatus }) => {
  if (backendStatus === "checking") return null;

  return (
    <div className="fixed top-20 right-4 z-50">
      <div
        className={`flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-xl border ${
          backendStatus === "online"
            ? "bg-green-500/20 border-green-500/30 text-green-300"
            : "bg-red-500/20 border-red-500/30 text-red-300"
        }`}
      >
        {backendStatus === "online" ? (
          <>
            <Wifi className="w-4 h-4" />
            {/* <span className="text-xs font-medium"></span> */}
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4" />
            <span className="text-xs font-medium"> Offline</span>
          </>
        )}
      </div>
    </div>
  );
};
