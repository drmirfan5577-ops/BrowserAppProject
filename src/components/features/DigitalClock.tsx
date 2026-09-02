import React from "react";
import { useDigitalClock } from "@/hooks/useDigitalClock";

export function DigitalClock() {
  const clock = useDigitalClock();

  return (
    <div className="text-center select-none">
      {/* Main time display */}
      <div className="flex items-baseline justify-center gap-1">
        <span
          className="font-orbitron text-3xl lg:text-4xl font-bold neon-text"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {clock.hours}:{clock.minutes}
        </span>
        <div className="flex flex-col items-start ml-1">
          <span className="font-orbitron text-xs font-bold neon-text opacity-80">{clock.ampm}</span>
          <span
            className="font-orbitron text-xs font-bold neon-text opacity-50"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {clock.seconds}
          </span>
        </div>
      </div>

      {/* Date row */}
      <div className="mt-1 flex flex-col items-center gap-0.5">
        <p className="text-xs text-text-secondary font-medium">
          {clock.day}, {clock.date}
        </p>
        <p className="text-[10px] text-text-muted">
          {clock.hijriDate}
        </p>
      </div>
    </div>
  );
}
