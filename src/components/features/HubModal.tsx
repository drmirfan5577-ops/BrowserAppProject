import React, { useState } from "react";
import { Search } from "lucide-react";
import { GlassModal } from "@/components/ui/GlassModal";
import { useBrowser } from "@/contexts/BrowserContext";
import type { Hub, AppItem } from "@/types";

interface HubModalProps {
  hub: Hub | null;
  onClose: () => void;
}

function HubAppItem({ app }: { app: AppItem }) {
  const { openBrowser } = useBrowser();

  return (
    <button
      onClick={() => openBrowser(app.url)}
      className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 hover:bg-glass-bg/70 group"
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-200 group-hover:scale-110"
        style={{
          background: `linear-gradient(135deg, ${app.color}33, ${app.color}22)`,
          border: `1px solid ${app.color}44`,
        }}
      >
        {app.icon}
      </div>
      <div className="text-center">
        <p className="text-xs font-medium text-text-primary leading-tight">{app.name}</p>
        <p className="urdu text-[10px] text-text-muted mt-0.5 leading-tight">{app.nameUrdu}</p>
      </div>
    </button>
  );
}

export function HubModal({ hub, onClose }: HubModalProps) {
  const [search, setSearch] = useState("");

  if (!hub) return null;

  const filtered = hub.apps.filter(
    (app) =>
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.nameUrdu.includes(search)
  );

  return (
    <GlassModal
      isOpen={!!hub}
      onClose={onClose}
      title={`${hub.icon} ${hub.name}`}
      titleUrdu={hub.nameUrdu}
      size="xl"
    >
      {/* Search */}
      <div className="mb-4">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{
            background: "hsl(var(--glass-bg)/0.6)",
            border: "1px solid hsl(var(--glass-border)/0.3)",
          }}
        >
          <Search className="w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${hub.name} apps...`}
            className="flex-1 bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-muted"
          />
        </div>
      </div>

      {/* Apps grid */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-1">
        {filtered.map((app) => (
          <HubAppItem key={app.id} app={app} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-8 text-text-muted">
            No apps found for "{search}"
          </div>
        )}
      </div>

      <p className="text-xs text-text-muted text-center mt-4">
        {filtered.length} apps · Tap to open in browser
      </p>
    </GlassModal>
  );
}
