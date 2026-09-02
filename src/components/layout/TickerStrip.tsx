import React from "react";
import { cn } from "@/lib/utils";

interface TickerStripProps {
  text: string;
  textUrdu?: string;
  direction?: "ltr" | "rtl";
  className?: string;
  speed?: "slow" | "normal" | "fast";
  accentColor?: boolean;
}

export function TickerStrip({
  text,
  textUrdu,
  direction = "ltr",
  className,
  speed = "normal",
  accentColor = false,
}: TickerStripProps) {
  const speedDuration = { slow: "45s", normal: "30s", fast: "18s" }[speed];

  return (
    <div
      className={cn(
        "overflow-hidden py-1.5 border-y",
        "bg-glass-bg/40 backdrop-blur-sm",
        className
      )}
      style={{ borderColor: "hsl(var(--glass-border)/0.15)" }}
    >
      <div
        className={cn(
          "whitespace-nowrap inline-block",
          accentColor ? "text-accent-primary" : "text-text-secondary",
          "text-xs font-medium"
        )}
        style={{
          animation: direction === "rtl"
            ? `ticker-scroll-rtl ${speedDuration} linear infinite`
            : `ticker-scroll ${speedDuration} linear infinite`,
        }}
      >
        {text}
        {textUrdu && <span className="ml-8 urdu text-xs">{textUrdu}</span>}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {text}
        {textUrdu && <span className="ml-8 urdu text-xs">{textUrdu}</span>}
      </div>
    </div>
  );
}
