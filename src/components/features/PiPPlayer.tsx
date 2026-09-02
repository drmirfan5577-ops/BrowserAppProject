import React, { useState, useRef, useCallback, useEffect } from "react";
import { X, Maximize2, Minimize2, Volume2, VolumeX, Move } from "lucide-react";
import { useBrowser } from "@/contexts/BrowserContext";

export function PiPPlayer() {
  const { pipOpen, pipUrl, closePiP } = useBrowser();
  const [pos, setPos] = useState({ x: window.innerWidth - 340, y: window.innerHeight - 260 });
  const [size, setSize] = useState({ w: 320, h: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
  }, [pos]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newX = Math.max(0, Math.min(window.innerWidth - size.w, e.clientX - dragOffset.current.x));
      const newY = Math.max(0, Math.min(window.innerHeight - size.h, e.clientY - dragOffset.current.y));
      setPos({ x: newX, y: newY });
    };
    const handleMouseUp = () => setIsDragging(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, size]);

  const toggleMaximize = () => {
    if (isMaximized) {
      setPos({ x: window.innerWidth - 340, y: window.innerHeight - 260 });
      setSize({ w: 320, h: 200 });
    } else {
      setPos({ x: 0, y: 0 });
      setSize({ w: window.innerWidth, h: window.innerHeight });
    }
    setIsMaximized(!isMaximized);
  };

  if (!pipOpen) return null;

  return (
    <div
      ref={containerRef}
      className="fixed z-50 glass-card neon-border overflow-hidden shadow-2xl"
      style={{
        left: pos.x,
        top: pos.y,
        width: size.w,
        height: size.h,
        cursor: isDragging ? "grabbing" : "default",
        transition: isDragging ? "none" : "all 0.2s ease",
        userSelect: "none",
      }}
    >
      {/* Header / drag handle */}
      <div
        className="flex items-center justify-between px-3 py-2 flex-shrink-0"
        style={{
          background: "hsl(var(--bg-secondary)/0.9)",
          borderBottom: "1px solid hsl(var(--glass-border)/0.2)",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <Move className="w-3.5 h-3.5 text-text-muted" />
          <span className="text-xs text-text-secondary font-medium truncate max-w-[120px]">PiP Player</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1 rounded hover:bg-glass-bg transition-colors"
          >
            {isMuted
              ? <VolumeX className="w-3.5 h-3.5 text-text-muted" />
              : <Volume2 className="w-3.5 h-3.5 text-text-secondary" />
            }
          </button>
          <button
            onClick={toggleMaximize}
            className="p-1 rounded hover:bg-glass-bg transition-colors"
          >
            {isMaximized
              ? <Minimize2 className="w-3.5 h-3.5 text-text-secondary" />
              : <Maximize2 className="w-3.5 h-3.5 text-text-secondary" />
            }
          </button>
          <button
            onClick={closePiP}
            className="p-1 rounded hover:bg-red-500/20 transition-colors"
          >
            <X className="w-3.5 h-3.5 text-text-secondary hover:text-red-400" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden" style={{ height: "calc(100% - 44px)" }}>
        <iframe
          src={pipUrl}
          className="w-full h-full border-none"
          title="PiP Player"
          allow="autoplay; fullscreen"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
        />
      </div>
    </div>
  );
}
