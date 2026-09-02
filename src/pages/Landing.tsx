import React, { useState } from "react";
import {
  Globe, Shield, Palette, Layers, Play, ChevronRight,
  Download, Monitor, Zap, Lock,
  BookOpen, Clock, Grid3X3, Volume2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { RotatingLogo } from "@/components/features/RotatingLogo";
import heroBg from "@/assets/hero-bg.jpg";

const FEATURES = [
  {
    icon: Palette,
    emoji: "🎨",
    title: "16 Glassy Themes",
    titleUrdu: "سولہ شیشہ نما تھیمز",
    desc: "10 luminous + 6 dark background themes with full glassmorphism and neon glow effects.",
  },
  {
    icon: Globe,
    emoji: "🌐",
    title: "Full WebView Browser",
    titleUrdu: "مکمل ویب براؤزر",
    desc: "Google Search integration, URL navigation, tabs, ad blocking, and incognito mode.",
  },
  {
    icon: Layers,
    emoji: "📦",
    title: "5 Content Hubs",
    titleUrdu: "پانچ مواد ہبز",
    desc: "Islamic, News, AI Tools, Social Media, and General — 20 apps each, 100 total.",
  },
  {
    icon: Play,
    emoji: "🎬",
    title: "PiP Floating Player",
    titleUrdu: "پی آئی پی فلوٹنگ پلیئر",
    desc: "Draggable picture-in-picture video player. Watch while you browse.",
  },
  {
    icon: BookOpen,
    emoji: "📚",
    title: "Bookmark Manager",
    titleUrdu: "بک مارک مینیجر",
    desc: "Full CRUD bookmarks with folder organization and quick search.",
  },
  {
    icon: Download,
    emoji: "⬇️",
    title: "Download Manager",
    titleUrdu: "ڈاؤن لوڈ مینیجر",
    desc: "Track, open, share and delete downloads with status tracking.",
  },
  {
    icon: Shield,
    emoji: "🛡️",
    title: "Ad Blocker + VPN",
    titleUrdu: "اشتہار بلاکر + وی پی این",
    desc: "Built-in ad blocking and VPN toggles for private, clean browsing.",
  },
  {
    icon: Lock,
    emoji: "🔒",
    title: "Admin Panel",
    titleUrdu: "ایڈمن پینل",
    desc: "Password-protected admin with theme creator, app editor, and settings.",
  },
  {
    icon: Clock,
    emoji: "⏰",
    title: "Digital Clock",
    titleUrdu: "ڈیجیٹل گھڑی",
    desc: "Glowing real-time clock with Hijri calendar date display.",
  },
  {
    icon: Volume2,
    emoji: "📜",
    title: "7 Animated Tickers",
    titleUrdu: "سات متحرک ٹکرز",
    desc: "Two top + five bottom scrolling ticker strips in English and Urdu.",
  },
  {
    icon: Grid3X3,
    emoji: "📱",
    title: "4-Row App Grid",
    titleUrdu: "چار قطار ایپ گرڈ",
    desc: "16 quick-access app icons in 4 rows. Rows 3 & 4 fully customizable.",
  },
  {
    icon: Zap,
    emoji: "⚡",
    title: "Bilingual UI",
    titleUrdu: "دو لسانی انٹرفیس",
    desc: "Complete English + Urdu interface throughout the entire application.",
  },
];

const HUBS_PREVIEW = [
  { id: "islamic", icon: "☪️", name: "Islamic", nameUrdu: "اسلامی", count: 20, color: "#00cc66" },
  { id: "news", icon: "📰", name: "News", nameUrdu: "خبریں", count: 20, color: "#4285f4" },
  { id: "ai", icon: "🤖", name: "AI Tools", nameUrdu: "اے آئی", count: 20, color: "#00a67e" },
  { id: "social", icon: "🌐", name: "Social", nameUrdu: "سوشل", count: 20, color: "#e1306c" },
  { id: "general", icon: "⚡", name: "General", nameUrdu: "عمومی", count: 20, color: "#ff8800" },
];

const THEMES_PREVIEW = [
  { name: "Royal Blue", preview: "linear-gradient(135deg,#0a1628,#2d6aff)" },
  { name: "Crimson Gold", preview: "linear-gradient(135deg,#1a0505,#ff3d3d)" },
  { name: "Emerald", preview: "linear-gradient(135deg,#021a0a,#00cc66)" },
  { name: "Violet Pink", preview: "linear-gradient(135deg,#0f0218,#cc44ff)" },
  { name: "Dark Nebula", preview: "linear-gradient(135deg,#0a020f,#270830)" },
  { name: "Sapphire", preview: "linear-gradient(135deg,#030a1a,#4477ff)" },
];

export default function Landing() {
  const navigate = useNavigate();


  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(180deg, hsl(220 60% 5%) 0%, hsl(225 55% 8%) 50%, hsl(220 50% 6%) 100%)",
        color: "hsl(0 0% 97%)",
        "--bg-primary": "220 60% 5%",
        "--bg-secondary": "225 55% 8%",
        "--glass-bg": "220 50% 12%",
        "--glass-border": "210 80% 55%",
        "--accent-primary": "210 100% 60%",
        "--accent-secondary": "250 100% 70%",
        "--accent-glow": "210 100% 65%",
        "--text-primary": "0 0% 97%",
        "--text-secondary": "210 30% 75%",
        "--text-muted": "210 20% 55%",
      } as React.CSSProperties}
    >
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between"
        style={{ background: "rgba(10,16,40,0.8)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(100,180,255,0.1)" }}>
        <div className="flex items-center gap-3">
          <RotatingLogo size="sm" />
          <div>
            <p className="font-orbitron text-sm font-bold" style={{ color: "hsl(210 100% 65%)", textShadow: "0 0 12px hsl(210 100% 65%/0.6)" }}>
              EvEr SmArT BrOwSeR
            </p>
            <p className="urdu text-xs" style={{ color: "hsl(210 30% 65%)" }}>ذہین براؤزر</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <GlassButton onClick={() => navigate("/")}>
            <Monitor className="w-3.5 h-3.5 mr-1.5" />
            Launch App
          </GlassButton>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})`, opacity: 0.4 }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,16,40,0.3) 0%, rgba(10,16,40,0.7) 60%, rgba(10,16,40,1) 100%)" }} />

        {/* Animated bg circles */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${(i + 1) * 200}px`,
              height: `${(i + 1) * 200}px`,
              border: "1px solid hsl(210 100% 60%)",
              animation: `spin-ring ${(i + 1) * 6}s linear infinite`,
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          />
        ))}

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-20">
          <div className="flex justify-center mb-8" style={{ animation: "float 3s ease-in-out infinite" }}>
            <RotatingLogo size="lg" />
          </div>

          <div className="urdu text-lg mb-2 opacity-80" style={{ color: "hsl(45 100% 65%)" }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </div>

          <h1
            className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight"
            style={{
              color: "hsl(210 100% 70%)",
              textShadow: "0 0 30px hsl(210 100% 60%/0.7), 0 0 80px hsl(210 100% 60%/0.3)",
            }}
          >
            EvEr SmArT<br />BrOwSeR
          </h1>

          <p
            className="urdu text-2xl sm:text-3xl mb-6"
            style={{ color: "hsl(210 40% 80%)", textShadow: "0 0 15px hsl(210 100% 60%/0.3)" }}
          >
            ذہین براؤزر
          </p>

          <p className="text-base sm:text-lg text-gray-300 mb-3 max-w-2xl mx-auto leading-relaxed">
            A next-generation bilingual browser with 16 glassy themes, Islamic content hubs,
            PiP video player, and advanced privacy features.
          </p>
          <p className="urdu text-sm text-gray-400 mb-10">
            سولہ شیشہ نما تھیمز · اسلامی مواد ہبز · پرائیویسی فیچرز
          </p>

          {/* CTA buttons */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={() => navigate("/")}
              className="px-8 py-4 rounded-2xl font-bold text-base transition-all duration-200 hover:scale-105 flex items-center gap-2"
              style={{
                background: "hsl(210 100% 60%)",
                boxShadow: "0 0 30px hsl(210 100% 60%/0.5)",
                color: "white",
              }}
            >
              <Globe className="w-5 h-5" />
              Launch Browser
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/hubs")}
              className="px-8 py-4 rounded-2xl font-bold text-base transition-all duration-200 hover:scale-105 flex items-center gap-2"
              style={{
                background: "rgba(33,100,200,0.2)",
                border: "1px solid rgba(100,180,255,0.4)",
                color: "hsl(210 80% 75%)",
              }}
            >
              <Layers className="w-5 h-5" />
              Explore Hubs
            </button>
          </div>

          {/* Stats */}
          <div className="mt-14 flex items-center justify-center gap-8 flex-wrap">
            {[
              { value: "16", label: "Themes", labelUrdu: "تھیمز" },
              { value: "100", label: "Hub Apps", labelUrdu: "ایپس" },
              { value: "7", label: "Tickers", labelUrdu: "ٹکرز" },
              { value: "EN+UR", label: "Bilingual", labelUrdu: "دو لسانی" },
            ].map(stat => (
              <div key={stat.value} className="text-center">
                <p
                  className="font-orbitron text-3xl font-black"
                  style={{ color: "hsl(210 100% 65%)", textShadow: "0 0 12px hsl(210 100% 60%/0.6)" }}
                >
                  {stat.value}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
                <p className="urdu text-[10px]" style={{ color: "hsl(210 30% 55%)" }}>{stat.labelUrdu}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50">
          <p className="text-xs text-gray-400">Scroll to explore</p>
          <div className="w-px h-8 bg-gradient-to-b from-blue-400 to-transparent" />
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-orbitron text-3xl font-bold mb-2" style={{ color: "hsl(210 100% 65%)" }}>
              ✨ Features
            </h2>
            <p className="urdu text-lg" style={{ color: "hsl(210 30% 70%)" }}>خصوصیات</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feat, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl transition-all duration-200 hover:scale-102 hover:-translate-y-1 group"
                style={{
                  background: "rgba(20,35,70,0.6)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(100,180,255,0.15)",
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform"
                    style={{ background: "rgba(100,180,255,0.1)", border: "1px solid rgba(100,180,255,0.2)" }}
                  >
                    {feat.emoji}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-white mb-0.5">{feat.title}</h3>
                    <p className="urdu text-xs mb-2" style={{ color: "hsl(210 30% 65%)" }}>{feat.titleUrdu}</p>
                    <p className="text-xs text-gray-400 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Content Hubs ── */}
      <section className="py-20 px-6" style={{ background: "rgba(0,0,0,0.2)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-orbitron text-3xl font-bold mb-2" style={{ color: "hsl(210 100% 65%)" }}>
            📦 Content Hubs
          </h2>
          <p className="urdu text-lg mb-12" style={{ color: "hsl(210 30% 70%)" }}>مواد ہبز · 5 ہبز · 100 ایپس</p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {HUBS_PREVIEW.map(hub => (
              <div
                key={hub.id}
                onClick={() => navigate("/hubs")}
                className="p-5 rounded-2xl cursor-pointer transition-all duration-200 hover:scale-105 hover:-translate-y-1"
                style={{
                  background: `linear-gradient(135deg, ${hub.color}22, ${hub.color}11)`,
                  border: `1px solid ${hub.color}44`,
                }}
              >
                <div className="text-4xl mb-3">{hub.icon}</div>
                <p className="text-sm font-bold text-white">{hub.name}</p>
                <p className="urdu text-xs mt-0.5" style={{ color: hub.color }}>{hub.nameUrdu}</p>
                <p className="text-[10px] text-gray-400 mt-2">{hub.count} apps</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/hubs")}
            className="mt-8 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-105 flex items-center gap-2 mx-auto"
            style={{ background: "rgba(33,100,200,0.3)", border: "1px solid rgba(100,180,255,0.4)", color: "hsl(210 80% 75%)" }}
          >
            Explore All 5 Hubs
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ── Themes ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-orbitron text-3xl font-bold mb-2" style={{ color: "hsl(210 100% 65%)" }}>
            🎨 16 Glassy Themes
          </h2>
          <p className="urdu text-lg mb-12" style={{ color: "hsl(210 30% 70%)" }}>سولہ شیشہ نما تھیمز</p>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {THEMES_PREVIEW.map((t, i) => (
              <div
                key={i}
                onClick={() => navigate("/")}
                className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105"
              >
                <div className="h-20" style={{ background: t.preview }} />
                <div className="p-2" style={{ background: "rgba(0,0,0,0.6)" }}>
                  <p className="text-[10px] text-white text-center font-medium truncate">{t.name}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-400 mt-4">+ 10 more themes available in the app</p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, hsl(210 100% 60%/0.08) 0%, transparent 70%)" }}
        />
        <div className="relative z-10 max-w-2xl mx-auto">
          <RotatingLogo size="lg" />
          <div className="mt-6">
            <h2 className="font-orbitron text-3xl font-black mb-2" style={{ color: "hsl(210 100% 70%)" }}>
              Start Browsing Now
            </h2>
            <p className="urdu text-xl mb-6" style={{ color: "hsl(210 40% 75%)" }}>ابھی براؤز کریں</p>
            <p className="text-gray-400 mb-8">No installation needed · Works in your browser · Free to use</p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button
                onClick={() => navigate("/")}
                className="px-10 py-4 rounded-2xl font-bold text-base transition-all duration-200 hover:scale-105 flex items-center gap-3"
                style={{ background: "hsl(210 100% 60%)", boxShadow: "0 0 40px hsl(210 100% 60%/0.4)", color: "white" }}
              >
                <Globe className="w-5 h-5" />
                Open Browser
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 px-6 text-center border-t" style={{ borderColor: "rgba(100,180,255,0.1)" }}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <RotatingLogo size="sm" />
          <span className="font-orbitron text-sm font-bold" style={{ color: "hsl(210 100% 65%)" }}>
            EvEr SmArT BrOwSeR
          </span>
        </div>
        <p className="urdu text-sm text-gray-500 mb-1">ذہین براؤزر · v1.0</p>
        <p className="text-xs text-gray-600">
          Built with ❤️ · 16 Themes · Bilingual EN+UR · 5 Content Hubs
        </p>
      </footer>
    </div>
  );
}
