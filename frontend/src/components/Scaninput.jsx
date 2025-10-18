import { Target, Shield, Loader, WifiOff } from "lucide-react";

export const ScanInput = ({
  input,
  setInput,
  loading,
  backendStatus,
  scanProgress,
  onScan,
  onKeyPress,
}) => {
  return (
    <div className="relative mb-6 sm:mb-8">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl sm:rounded-3xl blur-xl"></div>
      <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-2xl">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
          <label className="block text-xs sm:text-sm font-semibold text-gray-200">
            Paste suspicious URL or message
          </label>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="e.g., http://secure-bank-verify.com/login or suspicious message text..."
          className="w-full h-28 sm:h-32 md:h-40 px-4 sm:px-5 py-3 sm:py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all resize-none text-sm sm:text-base text-white placeholder-gray-500"
          disabled={loading}
        />

        {loading && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm text-blue-300 font-medium">
                Analyzing with AI...
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
            onClick={onScan}
            disabled={loading || !input.trim() || backendStatus === "offline"}
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
                <span>Scanning...</span>
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Scan for Threats</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
