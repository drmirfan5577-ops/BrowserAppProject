import React, { useState } from "react";
import { PERSONALITY_FIGURES } from "@/constants/config";
import { GlassModal } from "@/components/ui/GlassModal";

export function PersonalityBar() {
  const [selected, setSelected] = useState<typeof PERSONALITY_FIGURES[0] | null>(null);

  return (
    <>
      <div className="flex items-center justify-center gap-4 py-2">
        {PERSONALITY_FIGURES.map((figure) => (
          <button
            key={figure.id}
            onClick={() => setSelected(figure)}
            className="flex flex-col items-center gap-1 group transition-all duration-200"
            title={figure.name}
          >
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{
                  background: "radial-gradient(circle, hsl(var(--accent-primary)/0.4) 0%, transparent 70%)",
                  transform: "scale(1.3)",
                }}
              />
              <img
                src={figure.image}
                alt={figure.name}
                className="w-12 h-12 rounded-full object-cover border-2 group-hover:border-accent-primary transition-all duration-200 relative z-10"
                style={{ borderColor: "hsl(var(--glass-border)/0.5)" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${figure.name}&background=random&size=64`;
                }}
              />
            </div>
            <span className="text-[10px] text-text-muted group-hover:text-text-secondary transition-colors">
              {figure.nameUrdu}
            </span>
          </button>
        ))}
      </div>

      <GlassModal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name}
        titleUrdu={selected?.nameUrdu}
        size="sm"
      >
        {selected && (
          <div className="flex flex-col items-center gap-4 py-2">
            <img
              src={selected.image}
              alt={selected.name}
              className="w-24 h-24 rounded-full object-cover border-2"
              style={{ borderColor: "hsl(var(--accent-primary)/0.6)" }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${selected.name}&background=random&size=128`;
              }}
            />
            <div className="text-center">
              <h3 className="text-xl font-bold neon-text">{selected.name}</h3>
              <p className="text-sm text-text-secondary mt-1">{selected.title}</p>
            </div>
            <blockquote className="text-center text-sm text-text-secondary italic border-l-2 pl-4"
              style={{ borderColor: "hsl(var(--accent-primary)/0.5)" }}>
              "{selected.quote}"
            </blockquote>
          </div>
        )}
      </GlassModal>
    </>
  );
}
