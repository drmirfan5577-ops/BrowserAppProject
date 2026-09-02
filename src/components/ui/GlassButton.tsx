import React from "react";
import { cn } from "@/lib/utils";

interface GlassButtonProps {
  children: React.ReactNode;
  className?: string;
  primary?: boolean;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  title?: string;
}

export function GlassButton({
  children,
  className,
  primary = false,
  size = "md",
  onClick,
  type = "button",
  disabled = false,
  title,
}: GlassButtonProps) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs rounded-lg",
    md: "px-4 py-2 text-sm rounded-xl",
    lg: "px-6 py-3 text-base rounded-xl",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        sizeClasses[size],
        "font-medium transition-all duration-200 focus:outline-none focus:ring-2",
        "focus:ring-accent-primary/50 disabled:opacity-40 disabled:cursor-not-allowed",
        primary ? "glass-button-primary" : "glass-button",
        className
      )}
    >
      {children}
    </button>
  );
}
