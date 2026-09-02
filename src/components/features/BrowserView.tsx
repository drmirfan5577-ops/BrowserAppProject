import React, { useState, useRef, useCallback } from "react";
import {
  X, ArrowLeft, ArrowRight, RotateCcw, Home, Bookmark, BookmarkCheck,
  Share2, ExternalLink, Shield, Lock, Plus
} from "lucide-react";
import { useBrowser } from "@/contexts/BrowserContext";
import { GlassButton } from "@/components/ui/GlassButton";

export function BrowserView() {
  const {
    browserOpen, closeBrowser, currentUrl, setCurrentUrl,
    isIncognito, adBlockEnabled, addBookmark, bookmarks,
    tabs, activeTabId, addTab, closeTab, setActiveTab,
    openPiP,
  } = useBrowser();

  const [inputUrl, setInputUrl] = useState(currentUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeTab = tabs.find(t => t.id === activeTabId);
  const isBookmarked = bookmarks.some(b => b.url === currentUrl);

  const navigate = useCallback((url: string) => {
    let finalUrl = url;
    if (!/^https?:\/\//i.test(url)) {
      if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}/.test(url)) {
        finalUrl = `https://${url}`;
      } else {
        finalUrl = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
      }
    }
    setCurrentUrl(finalUrl);
    setInputUrl(finalUrl);
    setIsLoading(true);
  }, [setCurrentUrl]);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(inputUrl);
  };

  const handleGoHome = () => {
    navigate("https://www.google.com");
  };

  const handleBack = () => {
    try {
      iframeRef.current?.contentWindow?.history.back();
    } catch {
      console.log("Cannot access iframe history");
    }
  };

  const handleForward = () => {
    try {
      iframeRef.current?.contentWindow?.history.forward();
    } catch {
      console.log("Cannot access iframe history");
    }
  };

  const handleReload = () => {
    setIsLoading(true);
    if (iframeRef.current) {
      iframeRef.current.src = currentUrl;
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ url: currentUrl, title: activeTab?.title || "Page" });
    } else {
      navigator.clipboard.writeText(currentUrl);
    }
  };

  const handleBookmark = () => {
    if (!isBookmarked) {
      addBookmark({
        title: activeTab?.title || currentUrl,
        url: currentUrl,
        folder: "General",
      });
    }
  };

  const handleOpenExternal = () => {
    window.open(currentUrl, "_blank");
  };

  if (!browserOpen) return null;

  return (
    <div className={`fixed inset-0 z-40 flex flex-col ${isIncognito ? "incognito" : ""}`}
      style={{ background: "hsl(var(--bg-primary))" }}
    >
      {/* Browser Chrome */}
      <div
        className="flex-shrink-0 px-3 py-2"
        style={{
          background: isIncognito
            ? "linear-gradient(to right, hsl(270 50% 10%), hsl(270 50% 8%))"
            : "hsl(var(--bg-secondary))",
          borderBottom: "1px solid hsl(var(--glass-border)/0.2)",
        }}
      >
        {/* Tab bar */}
        <div className="flex items-center gap-1 mb-2 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer text-xs transition-all flex-shrink-0 ${
                tab.id === activeTabId
                  ? "bg-accent-primary/20 border border-accent-primary/40 text-accent-primary"
                  : "glass-button text-text-secondary"
              }`}
              style={{ maxWidth: "160px" }}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="truncate max-w-[100px]">{tab.title || "New Tab"}</span>
              {tabs.length > 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); closeTab(tab.id); }}
                  className="hover:text-red-400 flex-shrink-0"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => addTab()}
            className="p-1.5 glass-button rounded-lg flex-shrink-0 min-w-[32px] min-h-[32px] flex items-center justify-center"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Navigation bar */}
        <div className="flex items-center gap-2">
          {/* Nav buttons */}
          <div className="flex items-center gap-1">
            <GlassButton size="sm" onClick={handleBack} title="Back">
              <ArrowLeft className="w-4 h-4" />
            </GlassButton>
            <GlassButton size="sm" onClick={handleForward} title="Forward">
              <ArrowRight className="w-4 h-4" />
            </GlassButton>
            <GlassButton size="sm" onClick={handleReload} title="Reload">
              <RotateCcw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </GlassButton>
            <GlassButton size="sm" onClick={handleGoHome} title="Home">
              <Home className="w-4 h-4" />
            </GlassButton>
          </div>

          {/* URL bar */}
          <form onSubmit={handleUrlSubmit} className="flex-1">
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{
                background: "hsl(var(--glass-bg)/0.7)",
                border: "1px solid hsl(var(--glass-border)/0.3)",
              }}
            >
              {isIncognito ? (
                <Lock className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
              ) : (
                <Shield className={`w-3.5 h-3.5 flex-shrink-0 ${adBlockEnabled ? "text-green-400" : "text-text-muted"}`} />
              )}
              <input
                ref={inputRef}
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                onFocus={() => inputRef.current?.select()}
                className="flex-1 bg-transparent border-none outline-none text-xs text-text-primary min-w-0"
              />
            </div>
          </form>

          {/* Action buttons */}
          <div className="flex items-center gap-1">
            <GlassButton size="sm" onClick={handleBookmark} title="Bookmark">
              {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-yellow-400" /> : <Bookmark className="w-4 h-4" />}
            </GlassButton>
            <GlassButton size="sm" onClick={handleShare} title="Share">
              <Share2 className="w-4 h-4" />
            </GlassButton>
            <GlassButton size="sm" onClick={handleOpenExternal} title="Open in new tab">
              <ExternalLink className="w-4 h-4" />
            </GlassButton>
            <GlassButton size="sm" onClick={closeBrowser} title="Close">
              <X className="w-4 h-4" />
            </GlassButton>
          </div>
        </div>
      </div>

      {/* iframe content */}
      <div className="flex-1 relative overflow-hidden">
        {isLoading && (
          <div className="absolute top-0 left-0 right-0 h-0.5 z-10">
            <div
              className="h-full animate-pulse"
              style={{ background: "hsl(var(--accent-primary))", width: "70%" }}
            />
          </div>
        )}
        <iframe
          ref={iframeRef}
          src={currentUrl}
          className="w-full h-full border-none"
          title="Browser"
          onLoad={() => {
            setIsLoading(false);
            try {
              const title = iframeRef.current?.contentDocument?.title;
              if (title) console.log("Page title:", title);
            } catch {
              // Cross-origin, expected
            }
          }}
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-presentation allow-top-navigation"
        />

        {/* Overlay hint for blocked content */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-card px-4 py-2 text-xs text-text-muted text-center opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
        >
          Some sites may block iframe embedding. Use the external link button.
        </div>
      </div>

      {/* Status bar */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-4 py-1.5"
        style={{
          background: "hsl(var(--bg-secondary))",
          borderTop: "1px solid hsl(var(--glass-border)/0.15)",
        }}
      >
        <div className="flex items-center gap-3">
          {adBlockEnabled && (
            <span className="text-[10px] text-green-400 flex items-center gap-1">
              <Shield className="w-3 h-3" /> Ad Block ON
            </span>
          )}
          {isIncognito && (
            <span className="text-[10px] text-purple-400 flex items-center gap-1">
              <Lock className="w-3 h-3" /> Incognito
            </span>
          )}
        </div>
        <span className="text-[10px] text-text-muted truncate max-w-xs">{currentUrl}</span>
      </div>
    </div>
  );
}
