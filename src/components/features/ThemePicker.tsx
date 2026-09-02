import React, { useState } from "react";
import { Check } from "lucide-react";
import { GlassModal } from "@/components/ui/GlassModal";
import { useBrowser } from "@/contexts/BrowserContext";
import { THEMES } from "@/constants/theme";
import type { ThemeId } from "@/types";

export function ThemePicker() {
  const { themePickerOpen, setThemePickerOpen, theme, setTheme } = useBrowser();
  const [filter, setFilter] = useState<"all" | "light" | "dark">("all");

  const filtered = THEMES.filter(t => {
    if (filter === "light") return !t.isDark;
    if (filter === "dark") return t.isDark;
    return true;
  });

  const handleSelect = (id: ThemeId) => {
    setTheme(id);
  };

  return (
    <GlassModal
      isOpen={themePickerOpen}
      onClose={() => setThemePickerOpen(false)}
      title="🎨 Theme Selector"
      titleUrdu="تھیم انتخاب"
      size="lg"
    >
      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {(["all", "light", "dark"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
              filter === f
                ? "glass-button-primary"
                : "glass-button"
            }`}
          >
            {f === "all" ? "All 16" : f === "light" ? "✨ Luminous (10)" : "🌑 Dark (6)"}
          </button>
        ))}
      </div>

      {/* Themes grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filtered.map(t => (
          <button
            key={t.id}
            onClick={() => handleSelect(t.id)}
            className={`relative rounded-2xl overflow-hidden transition-all duration-200 hover:scale-105 ${
              theme === t.id ? "ring-2 ring-white/80 shadow-2xl" : "hover:shadow-lg"
            }`}
          >
            {/* Preview */}
            <div
              className="h-20 w-full"
              style={{ background: t.preview }}
            />

            {/* Glass overlay card */}
            <div
              className="p-3"
              style={{
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-xs font-bold text-white leading-tight">{t.emoji} {t.name}</p>
                  <p className="urdu text-[10px] text-white/60 mt-0.5">{t.nameUrdu}</p>
                </div>
                {theme === t.id && (
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-black" />
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <p className="text-xs text-text-muted text-center mt-6">
        Active: <span className="text-accent-primary font-medium">
          {THEMES.find(t => t.id === theme)?.name}
        </span>
        <span className="urdu ml-2">{THEMES.find(t => t.id === theme)?.nameUrdu}</span>
      </p>
    </GlassModal>
  );
}
