import React from "react";
import { useBrowser } from "@/contexts/BrowserContext";
import { APP_GRID_ROW1, APP_GRID_ROW2 } from "@/constants/config";
import type { AppItem } from "@/types";

function AppIcon({ app }: { app: AppItem }) {
  const { openBrowser } = useBrowser();

  return (
    <button
      onClick={() => openBrowser(app.url)}
      className="flex flex-col items-center gap-1.5 group transition-all duration-200 p-2 rounded-xl hover:bg-glass-bg/50"
      title={app.name}
    >
      <div
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${app.color}33 0%, ${app.color}22 100%)`,
          border: `1px solid ${app.color}44`,
          boxShadow: `0 2px 12px ${app.color}22`,
        }}
      >
        {app.icon}
      </div>
      <span className="text-[10px] text-text-secondary group-hover:text-text-primary transition-colors font-medium text-center leading-tight max-w-[56px] truncate">
        {app.name}
      </span>
    </button>
  );
}

function AppRow({ apps, label, labelUrdu }: { apps: AppItem[]; label: string; labelUrdu: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2 px-1">
        <div className="h-px flex-1" style={{ background: "hsl(var(--glass-border)/0.2)" }} />
        <span className="text-[10px] text-text-muted font-medium">{label}</span>
        <span className="urdu text-[10px] text-text-muted">{labelUrdu}</span>
        <div className="h-px flex-1" style={{ background: "hsl(var(--glass-border)/0.2)" }} />
      </div>
      <div className="grid grid-cols-4 gap-1">
        {apps.map((app) => (
          <AppIcon key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}

export function AppsGrid() {
  const { row3Apps, row4Apps } = useBrowser();

  return (
    <div className="space-y-3">
      <AppRow apps={APP_GRID_ROW1} label="Row 1" labelUrdu="قطار ۱" />
      <AppRow apps={APP_GRID_ROW2} label="Row 2" labelUrdu="قطار ۲" />
      <AppRow apps={row3Apps} label="Row 3 (Custom)" labelUrdu="قطار ۳" />
      <AppRow apps={row4Apps} label="Row 4 (Custom)" labelUrdu="قطار ۴" />
    </div>
  );
}
