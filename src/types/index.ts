export type ThemeId =
  | "crimson_gold"
  | "emerald_green"
  | "royal_blue"
  | "ruby_red"
  | "violet_pink"
  | "sapphire"
  | "rose_gold"
  | "sunset_orange"
  | "mint_fresh"
  | "ocean_deep"
  | "dark_abyss"
  | "dark_crimson"
  | "dark_ocean"
  | "dark_forest"
  | "dark_gold"
  | "dark_nebula";

export interface Theme {
  id: ThemeId;
  name: string;
  nameUrdu: string;
  emoji: string;
  isDark: boolean;
  preview: string; // gradient CSS
}

export interface AppItem {
  id: string;
  name: string;
  nameUrdu: string;
  icon: string; // lucide icon name or emoji
  url: string;
  color: string;
  category?: string;
}

export interface Hub {
  id: string;
  name: string;
  nameUrdu: string;
  icon: string;
  color: string;
  apps: AppItem[];
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  folder: string;
  createdAt: number;
}

export interface Download {
  id: string;
  name: string;
  url: string;
  size?: string;
  status: "completed" | "pending" | "failed";
  createdAt: number;
}

export interface TickerMessage {
  id: string;
  text: string;
  textUrdu: string;
  position: "top1" | "top2" | "bottom1" | "bottom2" | "bottom3" | "bottom4" | "bottom5";
}

export interface BrowserState {
  currentUrl: string;
  currentTitle: string;
  isLoading: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
  isIncognito: boolean;
  adBlockEnabled: boolean;
}

export interface Tab {
  id: string;
  url: string;
  title: string;
  favicon?: string;
  isIncognito: boolean;
}

export interface PersonalityFigure {
  id: string;
  name: string;
  nameUrdu: string;
  title: string;
  image: string;
  quote: string;
}
