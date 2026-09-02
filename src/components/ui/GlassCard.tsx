import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className, hover = false, glow = false, onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "glass-card",
        hover && "glass-card-hover cursor-pointer",
        glow && "pulse-glow",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
