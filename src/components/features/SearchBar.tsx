import React, { useState, useRef } from "react";
import { Search, ArrowRight, X } from "lucide-react";
import { useBrowser } from "@/contexts/BrowserContext";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const { openBrowser, isIncognito } = useBrowser();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (!query.trim()) return;
    const q = query.trim();
    let url: string;

    if (/^https?:\/\//i.test(q)) {
      url = q;
    } else if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}/.test(q)) {
      url = `https://${q}`;
    } else {
      url = `https://www.google.com/search?q=${encodeURIComponent(q)}`;
    }

    openBrowser(url);
    setQuery("");
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div
        className="flex items-center gap-2 px-4 py-3 rounded-2xl transition-all duration-200"
        style={{
          background: "hsl(var(--glass-bg) / 0.8)",
          backdropFilter: "blur(16px)",
          border: `1px solid hsl(var(--glass-border) / ${query ? "0.6" : "0.3"})`,
          boxShadow: query ? "0 0 20px hsl(var(--accent-glow) / 0.2)" : "none",
        }}
      >
        {/* Google logo */}
        <img
          src="https://www.google.com/favicon.ico"
          alt="Google"
          className="w-4 h-4 flex-shrink-0 opacity-70"
        />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKey}
          placeholder={isIncognito ? "🔒 Incognito Search..." : "Search Google or enter URL..."}
          className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder:text-text-muted text-sm"
          style={{ color: "hsl(var(--text-primary))" }}
        />

        {query && (
          <button
            onClick={() => { setQuery(""); inputRef.current?.focus(); }}
            className="p-1 rounded-lg hover:bg-glass-bg transition-colors"
          >
            <X className="w-3.5 h-3.5 text-text-muted" />
          </button>
        )}

        <button
          onClick={handleSearch}
          className="glass-button-primary px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-medium min-h-[36px]"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Search</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Hint text */}
      <p className="text-center mt-1.5 text-xs text-text-muted">
        Google Search · URL Navigation · {isIncognito ? "🔒 Incognito Mode Active" : "Press Enter to browse"}
      </p>
    </div>
  );
}
