import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { ThemeId, Bookmark, Download, Tab } from "@/types";
import { DEFAULT_THEME } from "@/constants/theme";
import { APP_GRID_ROW3, APP_GRID_ROW4, TICKER_MESSAGES } from "@/constants/config";

interface BrowserContextType {
  // Theme
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;

  // Browser
  currentUrl: string;
  setCurrentUrl: (url: string) => void;
  browserOpen: boolean;
  openBrowser: (url: string) => void;
  closeBrowser: () => void;
  isIncognito: boolean;
  setIsIncognito: (v: boolean) => void;
  adBlockEnabled: boolean;
  setAdBlockEnabled: (v: boolean) => void;
  vpnEnabled: boolean;
  setVpnEnabled: (v: boolean) => void;

  // Tabs
  tabs: Tab[];
  activeTabId: string;
  addTab: (url?: string) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;

  // Bookmarks
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Omit<Bookmark, "id" | "createdAt">) => void;
  removeBookmark: (id: string) => void;

  // Downloads
  downloads: Download[];
  addDownload: (download: Omit<Download, "id" | "createdAt">) => void;
  removeDownload: (id: string) => void;

  // PiP
  pipOpen: boolean;
  pipUrl: string;
  openPiP: (url: string) => void;
  closePiP: () => void;

  // UI state
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  bookmarkManagerOpen: boolean;
  setBookmarkManagerOpen: (v: boolean) => void;
  downloadManagerOpen: boolean;
  setDownloadManagerOpen: (v: boolean) => void;
  themePickerOpen: boolean;
  setThemePickerOpen: (v: boolean) => void;

  // App grid rows 3 & 4 (editable)
  row3Apps: AppItem[];
  row4Apps: AppItem[];

  // Tickers
  tickerMessages: typeof TICKER_MESSAGES;
  setTickerMessages: (msgs: typeof TICKER_MESSAGES) => void;

  // Branding
  headerLine1: string;
  headerLine2: string;
  headerLine3: string;
  setHeaderLine1: (v: string) => void;
  setHeaderLine2: (v: string) => void;
  setHeaderLine3: (v: string) => void;
}

const BrowserContext = createContext<BrowserContextType | null>(null);

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn("Failed to save to localStorage:", key);
  }
}

export function BrowserProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(() => loadFromStorage("esb_theme", DEFAULT_THEME));
  const [currentUrl, setCurrentUrl] = useState("https://www.google.com");
  const [browserOpen, setBrowserOpen] = useState(false);
  const [isIncognito, setIsIncognito] = useState(false);
  const [adBlockEnabled, setAdBlockEnabled] = useState(() => loadFromStorage("esb_adblock", true));
  const [vpnEnabled, setVpnEnabled] = useState(() => loadFromStorage("esb_vpn", false));
  const [tabs, setTabs] = useState<Tab[]>([{ id: "1", url: "https://www.google.com", title: "Google", isIncognito: false }]);
  const [activeTabId, setActiveTabId] = useState("1");
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => loadFromStorage("esb_bookmarks", []));
  const [downloads, setDownloads] = useState<Download[]>(() => loadFromStorage("esb_downloads", []));
  const [pipOpen, setPipOpen] = useState(false);
  const [pipUrl, setPipUrl] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookmarkManagerOpen, setBookmarkManagerOpen] = useState(false);
  const [downloadManagerOpen, setDownloadManagerOpen] = useState(false);
  const [themePickerOpen, setThemePickerOpen] = useState(false);
  const [row3Apps] = useState(APP_GRID_ROW3);
  const [row4Apps] = useState(APP_GRID_ROW4);
  const [tickerMessages, setTickerMessages] = useState(TICKER_MESSAGES);
  const [headerLine1, setHeaderLine1] = useState("بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ");
  const [headerLine2, setHeaderLine2] = useState("EvEr SmArT BrOwSeR");
  const [headerLine3, setHeaderLine3] = useState("ذہین براؤزر");

  // Apply theme to DOM
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    saveToStorage("esb_theme", theme);
  }, [theme]);

  useEffect(() => { saveToStorage("esb_bookmarks", bookmarks); }, [bookmarks]);
  useEffect(() => { saveToStorage("esb_downloads", downloads); }, [downloads]);
  useEffect(() => { saveToStorage("esb_adblock", adBlockEnabled); }, [adBlockEnabled]);
  useEffect(() => { saveToStorage("esb_vpn", vpnEnabled); }, [vpnEnabled]);

  const setTheme = useCallback((t: ThemeId) => setThemeState(t), []);

  const openBrowser = useCallback((url: string) => {
    setCurrentUrl(url);
    setBrowserOpen(true);
  }, []);

  const closeBrowser = useCallback(() => setBrowserOpen(false), []);

  const addTab = useCallback((url = "https://www.google.com") => {
    const id = Date.now().toString();
    const newTab: Tab = { id, url, title: "New Tab", isIncognito };
    setTabs(prev => [...prev, newTab]);
    setActiveTabId(id);
    setCurrentUrl(url);
  }, [isIncognito]);

  const closeTab = useCallback((id: string) => {
    setTabs(prev => {
      const remaining = prev.filter(t => t.id !== id);
      if (remaining.length === 0) {
        setBrowserOpen(false);
        return [{ id: "1", url: "https://www.google.com", title: "Google", isIncognito: false }];
      }
      return remaining;
    });
  }, []);

  const addBookmark = useCallback((bm: Omit<Bookmark, "id" | "createdAt">) => {
    const newBm: Bookmark = { ...bm, id: Date.now().toString(), createdAt: Date.now() };
    setBookmarks(prev => [...prev, newBm]);
  }, []);

  const removeBookmark = useCallback((id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  }, []);

  const addDownload = useCallback((dl: Omit<Download, "id" | "createdAt">) => {
    const newDl: Download = { ...dl, id: Date.now().toString(), createdAt: Date.now() };
    setDownloads(prev => [newDl, ...prev]);
  }, []);

  const removeDownload = useCallback((id: string) => {
    setDownloads(prev => prev.filter(d => d.id !== id));
  }, []);

  const openPiP = useCallback((url: string) => {
    setPipUrl(url);
    setPipOpen(true);
  }, []);

  const closePiP = useCallback(() => setPipOpen(false), []);

  return (
    <BrowserContext.Provider value={{
      theme, setTheme,
      currentUrl, setCurrentUrl,
      browserOpen, openBrowser, closeBrowser,
      isIncognito, setIsIncognito,
      adBlockEnabled, setAdBlockEnabled,
      vpnEnabled, setVpnEnabled,
      tabs, activeTabId, addTab, closeTab, setActiveTab: setActiveTabId,
      bookmarks, addBookmark, removeBookmark,
      downloads, addDownload, removeDownload,
      pipOpen, pipUrl, openPiP, closePiP,
      sidebarOpen, setSidebarOpen,
      bookmarkManagerOpen, setBookmarkManagerOpen,
      downloadManagerOpen, setDownloadManagerOpen,
      themePickerOpen, setThemePickerOpen,
      row3Apps, row4Apps,
      tickerMessages, setTickerMessages,
      headerLine1, headerLine2, headerLine3,
      setHeaderLine1, setHeaderLine2, setHeaderLine3,
    }}>
      {children}
    </BrowserContext.Provider>
  );
}

export function useBrowser() {
  const ctx = useContext(BrowserContext);
  if (!ctx) throw new Error("useBrowser must be used within BrowserProvider");
  return ctx;
}
