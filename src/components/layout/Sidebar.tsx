import React from "react";
import { X, Home, Grid3X3, Settings, Info, Globe, Shield, Wifi, Moon, Palette, Bookmark, Download } from "lucide-react";
import { useBrowser } from "@/contexts/BrowserContext";
import { GlassButton } from "@/components/ui/GlassButton";
import { useNavigate, useLocation } from "react-router-dom";

export function Sidebar() {
  const {
    sidebarOpen, setSidebarOpen,
    adBlockEnabled, setAdBlockEnabled,
    vpnEnabled, setVpnEnabled,
    isIncognito, setIsIncognito,
    setBookmarkManagerOpen,
    setDownloadManagerOpen,
    setThemePickerOpen,
    theme,
  } = useBrowser();

  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", labelUrdu: "ہوم", path: "/" },
    { icon: Grid3X3, label: "Hubs", labelUrdu: "ہبز", path: "/hubs" },
    { icon: Settings, label: "Admin", labelUrdu: "ایڈمن", path: "/admin" },
    { icon: Globe, label: "Website", labelUrdu: "ویب سائٹ", path: "/landing" },
  ];

  const handleNav = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };

  if (!sidebarOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
      <div className="relative w-72 h-full glass-card rounded-none border-l-0 border-t-0 border-b-0 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "hsl(var(--glass-border)/0.2)" }}>
          <div>
            <p className="font-orbitron font-bold neon-text text-sm">EvEr SmArT BrOwSeR</p>
            <p className="urdu text-xs text-text-secondary">ذہین براؤزر</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 glass-button rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                  isActive
                    ? "bg-accent-primary/20 border border-accent-primary/40 text-accent-primary"
                    : "glass-button"
                }`}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="urdu text-xs text-text-muted">{item.labelUrdu}</p>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Quick toggles */}
        <div className="px-4 py-3 border-t border-b" style={{ borderColor: "hsl(var(--glass-border)/0.2)" }}>
          <p className="text-xs text-text-muted mb-3 font-medium">Quick Settings</p>
          <div className="space-y-2">
            <button
              onClick={() => setAdBlockEnabled(!adBlockEnabled)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl glass-button"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Ad Blocker</span>
              </div>
              <div className={`w-10 h-5 rounded-full transition-all duration-200 relative ${adBlockEnabled ? "bg-green-500" : "bg-glass-border/30"}`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 ${adBlockEnabled ? "left-5" : "left-0.5"}`} />
              </div>
            </button>

            <button
              onClick={() => setVpnEnabled(!vpnEnabled)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl glass-button"
            >
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4" />
                <span className="text-sm">VPN</span>
              </div>
              <div className={`w-10 h-5 rounded-full transition-all duration-200 relative ${vpnEnabled ? "bg-blue-500" : "bg-glass-border/30"}`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 ${vpnEnabled ? "left-5" : "left-0.5"}`} />
              </div>
            </button>

            <button
              onClick={() => setIsIncognito(!isIncognito)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl glass-button"
            >
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4" />
                <span className="text-sm">Incognito</span>
              </div>
              <div className={`w-10 h-5 rounded-full transition-all duration-200 relative ${isIncognito ? "bg-purple-500" : "bg-glass-border/30"}`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 ${isIncognito ? "left-5" : "left-0.5"}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="px-4 py-3 space-y-2">
          <button
            onClick={() => { setThemePickerOpen(true); setSidebarOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl glass-button text-left"
          >
            <Palette className="w-4 h-4" />
            <span className="text-sm">Themes (16)</span>
          </button>
          <button
            onClick={() => { setBookmarkManagerOpen(true); setSidebarOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl glass-button text-left"
          >
            <Bookmark className="w-4 h-4" />
            <span className="text-sm">Bookmarks</span>
          </button>
          <button
            onClick={() => { setDownloadManagerOpen(true); setSidebarOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl glass-button text-left"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm">Downloads</span>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-auto p-4 border-t" style={{ borderColor: "hsl(var(--glass-border)/0.2)" }}>
          <p className="text-xs text-text-muted text-center">
            Theme: <span className="text-accent-primary font-medium">{theme.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</span>
          </p>
          <p className="urdu text-xs text-text-muted text-center mt-1">EvEr SmArT BrOwSeR v1.0</p>
        </div>
      </div>
    </div>
  );
}
