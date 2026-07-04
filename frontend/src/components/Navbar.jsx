import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Brain,
  Scan,
  BookOpen,
  Code,
  Info,
  Menu,
  X,
  Shield,
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: "Home", icon: null },
    { to: "/detect", label: "Detect", icon: <Scan className="w-4 h-4" /> },
    {
      to: "/threatlab",
      label: "Threat Lab",
      icon: <BookOpen className="w-4 h-4" />,
    },
    { to: "/api", label: "API", icon: <Code className="w-4 h-4" /> },
    { to: "/about", label: "About", icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl blur-xl" />
          <div className="relative bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl px-6 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl blur-md opacity-75" />
                  <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <span className="text-white font-bold text-xl tracking-tight">
                    EndPhishAI
                  </span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400 text-xs font-medium">
                      AI Active
                    </span>
                  </div>
                </div>
              </Link>

              {/* Desktop links */}
              <div className="hidden lg:flex items-center gap-1">
                {links.map((link) => {
                  const active =
                    location.pathname === link.to ||
                    (link.to === "/threatlab" &&
                      location.pathname === "/learn");
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium flex items-center gap-2 ${
                        active
                          ? "text-white bg-white/10"
                          : "text-gray-300 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile toggle */}
              <button
                onClick={() => setOpen(!open)}
                className="lg:hidden text-white p-2 hover:bg-white/10 rounded-xl transition-all"
              >
                {open ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Mobile menu */}
            {open && (
              <div className="lg:hidden mt-4 pt-4 border-t border-white/10 space-y-1">
                {links.map((link) => {
                  const active = location.pathname === link.to;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        active
                          ? "text-white bg-white/10"
                          : "text-gray-300 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
