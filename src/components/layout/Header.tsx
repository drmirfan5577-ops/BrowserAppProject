import React from "react";
import { Menu, Palette, Bookmark, Download, Shield, Wifi, Moon } from "lucide-react";
import { useBrowser } from "@/contexts/BrowserContext";
import { RotatingLogo } from "@/components/features/RotatingLogo";
import { DigitalClock } from "@/components/features/DigitalClock";
import { TickerStrip } from "@/components/layout/TickerStrip";
import { GlassButton } from "@/components/ui/GlassButton";

export function Header() {
  const {
    headerLine1, headerLine2, headerLine3,
    tickerMessages,
    setSidebarOpen,
    setBookmarkManagerOpen,
    setDownloadManagerOpen,
    setThemePickerOpen,
    adBlockEnabled, setAdBlockEnabled,
    vpnEnabled, setVpnEnabled,
    isIncognito, setIsIncognito,
  } = useBrowser();

  const top1 = tickerMessages.find(t => t.position === "top1");
  const top2 = tickerMessages.find(t => t.position === "top2");

  return (
    <header className="sticky top-0 z-40 flex flex-col">
      {/* Ticker 1 */}
      {top1 && (
        <TickerStrip
          text={top1.text}
          textUrdu={top1.textUrdu}
          accentColor
          speed="slow"
        />
      )}

      {/* Main header bar */}
      <div
        className="glass-card rounded-none border-x-0 px-4 py-3"
        style={{ borderColor: "hsl(var(--glass-border)/0.2)" }}
      >
        <div className="flex items-center gap-3 max-w-screen-2xl mx-auto">
          {/* Logo + Branding */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <RotatingLogo size="sm" />
            <div className="hidden sm:block">
              <div className="urdu text-xs text-accent-primary font-medium opacity-90 leading-tight">
                {headerLine1}
              </div>
              <div className="font-orbitron text-sm font-bold neon-text leading-tight tracking-wide">
                {headerLine2}
              </div>
              <div className="urdu text-xs text-text-secondary leading-tight">
                {headerLine3}
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Clock */}
          <div className="hidden lg:block">
            <DigitalClock />
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Quick actions */}
          <div className="flex items-center gap-1.5">
            <GlassButton
              size="sm"
              onClick={() => setAdBlockEnabled(!adBlockEnabled)}
              className={adBlockEnabled ? "border-green-500/50 text-green-400" : ""}
              title={adBlockEnabled ? "Ad Block ON" : "Ad Block OFF"}
            >
              <Shield className="w-3.5 h-3.5" />
            </GlassButton>

            <GlassButton
              size="sm"
              onClick={() => setVpnEnabled(!vpnEnabled)}
              className={vpnEnabled ? "border-blue-400/50 text-blue-400" : ""}
              title={vpnEnabled ? "VPN ON" : "VPN OFF"}
            >
              <Wifi className="w-3.5 h-3.5" />
            </GlassButton>

            <GlassButton
              size="sm"
              onClick={() => setIsIncognito(!isIncognito)}
              className={isIncognito ? "border-purple-400/50 text-purple-400" : ""}
              title={isIncognito ? "Incognito ON" : "Incognito OFF"}
            >
              <Moon className="w-3.5 h-3.5" />
            </GlassButton>

            <GlassButton size="sm" onClick={() => setThemePickerOpen(true)} title="Themes">
              <Palette className="w-3.5 h-3.5" />
            </GlassButton>

            <GlassButton size="sm" onClick={() => setBookmarkManagerOpen(true)} title="Bookmarks">
              <Bookmark className="w-3.5 h-3.5" />
            </GlassButton>

            <GlassButton size="sm" onClick={() => setDownloadManagerOpen(true)} title="Downloads">
              <Download className="w-3.5 h-3.5" />
            </GlassButton>

            <GlassButton size="sm" onClick={() => setSidebarOpen(true)} title="Menu">
              <Menu className="w-4 h-4" />
            </GlassButton>
          </div>
        </div>
      </div>

      {/* Ticker 2 */}
      {top2 && (
        <TickerStrip
          text={top2.text}
          textUrdu={top2.textUrdu}
          direction="rtl"
          speed="normal"
        />
      )}
    </header>
  );
}
