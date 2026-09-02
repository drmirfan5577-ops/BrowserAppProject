import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface GlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  titleUrdu?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}

export function GlassModal({
  isOpen,
  onClose,
  title,
  titleUrdu,
  children,
  size = "md",
  className,
}: GlassModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-[95vw] max-h-[95vh]",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className={cn(
          "relative w-full glass-card neon-border fade-in",
          "flex flex-col max-h-[90vh]",
          sizeClasses[size],
          className
        )}
      >
        {/* Header */}
        {(title || titleUrdu) && (
          <div className="flex items-center justify-between p-4 border-b border-glass-border/20">
            <div>
              {title && <h2 className="text-lg font-bold text-text-primary">{title}</h2>}
              {titleUrdu && <p className="text-sm text-text-secondary urdu">{titleUrdu}</p>}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg glass-button min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
