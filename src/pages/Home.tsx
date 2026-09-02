import React from "react";
import { useBrowser } from "@/contexts/BrowserContext";
import { Header } from "@/components/layout/Header";
import { TickerStrip } from "@/components/layout/TickerStrip";
import { SearchBar } from "@/components/features/SearchBar";
import { AppsGrid } from "@/components/features/AppsGrid";
import { PersonalityBar } from "@/components/features/PersonalityBar";
import { GlassCard } from "@/components/ui/GlassCard";

export default function Home() {
  const { tickerMessages, isIncognito, adBlockEnabled, vpnEnabled } = useBrowser();

  const bottomTickers = tickerMessages.filter(t => t.position.startsWith("bottom"));

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "hsl(var(--bg-primary))" }}
    >
      <Header />

      {/* Main content */}
      <main className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-6 gap-5">
        {/* Status indicators */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {adBlockEnabled && (
            <span className="px-3 py-1 rounded-full text-xs font-medium glass-card border border-green-500/30 text-green-400">
              🛡️ Ad Block ON
            </span>
          )}
          {vpnEnabled && (
            <span className="px-3 py-1 rounded-full text-xs font-medium glass-card border border-blue-500/30 text-blue-400">
              🔒 VPN ON
            </span>
          )}
          {isIncognito && (
            <span className="px-3 py-1 rounded-full text-xs font-medium glass-card border border-purple-500/30 text-purple-400">
              🌙 Incognito
            </span>
          )}
        </div>

        {/* Search bar */}
        <SearchBar />

        {/* Apps grid */}
        <GlassCard className="p-4">
          <AppsGrid />
        </GlassCard>

        {/* Personality bar */}
        <GlassCard className="p-3">
          <p className="text-xs text-text-muted text-center mb-2 font-medium">
            Historical Figures · <span className="urdu">تاریخی شخصیات</span>
          </p>
          <PersonalityBar />
        </GlassCard>
      </main>

      {/* Bottom tickers */}
      <footer className="mt-auto">
        {bottomTickers.map((ticker, i) => (
          <TickerStrip
            key={ticker.id}
            text={ticker.text}
            textUrdu={ticker.textUrdu}
            direction={i % 2 === 0 ? "ltr" : "rtl"}
            speed={i % 3 === 0 ? "slow" : i % 3 === 1 ? "normal" : "fast"}
            accentColor={i === 0}
          />
        ))}
      </footer>
    </div>
  );
}
