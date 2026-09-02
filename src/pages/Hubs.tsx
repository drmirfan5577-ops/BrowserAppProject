import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { GlassCard } from "@/components/ui/GlassCard";
import { HubModal } from "@/components/features/HubModal";
import { HUBS } from "@/constants/config";
import type { Hub } from "@/types";
import { useBrowser } from "@/contexts/BrowserContext";

export default function Hubs() {
  const [selectedHub, setSelectedHub] = useState<Hub | null>(null);
  const { openBrowser } = useBrowser();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "hsl(var(--bg-primary))" }}>
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        {/* Page title */}
        <div className="text-center mb-8">
          <h1 className="font-orbitron text-2xl font-bold neon-text">Content Hubs</h1>
          <p className="urdu text-lg text-text-secondary mt-1">مواد ہبز</p>
          <p className="text-sm text-text-muted mt-2">5 curated hubs · 100 apps total</p>
        </div>

        {/* Hubs grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {HUBS.map((hub) => (
            <GlassCard
              key={hub.id}
              hover
              className="p-6 cursor-pointer"
              onClick={() => setSelectedHub(hub)}
            >
              {/* Hub icon & name */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-5xl mb-3">{hub.icon}</div>
                  <h2 className="text-lg font-bold text-text-primary">{hub.name}</h2>
                  <p className="urdu text-sm text-text-secondary mt-0.5">{hub.nameUrdu}</p>
                </div>
                <div
                  className="px-2 py-1 rounded-lg text-xs font-bold text-white"
                  style={{ background: `${hub.color}44`, border: `1px solid ${hub.color}66` }}
                >
                  {hub.apps.length} apps
                </div>
              </div>

              {/* Preview apps */}
              <div className="flex gap-1.5 flex-wrap">
                {hub.apps.slice(0, 8).map(app => (
                  <span
                    key={app.id}
                    className="text-lg cursor-pointer hover:scale-125 transition-transform"
                    title={app.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      openBrowser(app.url);
                    }}
                  >
                    {app.icon}
                  </span>
                ))}
                {hub.apps.length > 8 && (
                  <span className="text-xs text-text-muted self-center">+{hub.apps.length - 8} more</span>
                )}
              </div>

              {/* CTA */}
              <div className="mt-4 pt-3 border-t" style={{ borderColor: "hsl(var(--glass-border)/0.15)" }}>
                <p className="text-xs text-text-muted">
                  Tap to explore all {hub.apps.length} {hub.name} apps →
                </p>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Info */}
        <div className="mt-8 text-center">
          <GlassCard className="inline-block px-6 py-4">
            <p className="text-sm text-text-secondary">
              🌐 <span className="text-accent-primary font-medium">5 Hubs</span> ·
              Islamic · News · AI · Social · General
            </p>
            <p className="urdu text-xs text-text-muted mt-1">
              پانچ ہبز — اسلامی · خبریں · اے آئی · سوشل · عمومی
            </p>
          </GlassCard>
        </div>
      </main>

      <HubModal hub={selectedHub} onClose={() => setSelectedHub(null)} />
    </div>
  );
}
