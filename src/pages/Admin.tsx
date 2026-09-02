import React, { useState } from "react";
import {
  Lock, Shield, Wifi, Eye, EyeOff, Settings, Palette,
  Type, BarChart3, Key, CheckCircle, AlertCircle,
  Moon, RefreshCw
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { useBrowser } from "@/contexts/BrowserContext";
import { ADMIN_PASSWORD_KEY, DEFAULT_ADMIN_PASSWORD } from "@/constants/config";
import { THEMES } from "@/constants/theme";

// ─── Login Screen ─────────────────────────────────────────────────────────────
function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const handleLogin = () => {
    const stored = localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_ADMIN_PASSWORD;
    if (password === stored) {
      onLogin();
    } else {
      setError("Incorrect password. Default: 1122");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <GlassCard className={`p-8 w-full max-w-sm text-center ${shake ? "animate-bounce" : ""}`}>
        <div
          className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
          style={{ background: "hsl(var(--accent-primary)/0.2)", border: "1px solid hsl(var(--accent-primary)/0.4)" }}
        >
          <Lock className="w-8 h-8 text-accent-primary" />
        </div>
        <h2 className="text-xl font-bold neon-text font-orbitron mb-1">Admin Panel</h2>
        <p className="urdu text-sm text-text-secondary mb-6">ایڈمن پینل</p>

        <div className="relative mb-4">
          <input
            type={showPw ? "text" : "password"}
            value={password}
            onChange={e => { setPassword(e.target.value); setError(""); }}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            placeholder="Enter password..."
            className="w-full px-4 py-3 pr-12 rounded-xl text-sm text-text-primary outline-none"
            style={{
              background: "hsl(var(--glass-bg)/0.7)",
              border: `1px solid ${error ? "hsl(0 80% 60%/0.5)" : "hsl(var(--glass-border)/0.3)"}`,
            }}
            autoFocus
          />
          <button
            onClick={() => setShowPw(!showPw)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
          >
            {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-xl text-xs text-red-400"
            style={{ background: "hsl(0 80% 60%/0.1)", border: "1px solid hsl(0 80% 60%/0.3)" }}>
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            {error}
          </div>
        )}

        <GlassButton onClick={handleLogin} primary className="w-full justify-center py-3">
          <Lock className="w-4 h-4 mr-2" />
          Login to Admin
        </GlassButton>

        <p className="text-xs text-text-muted mt-4">Default password: <span className="text-accent-primary font-mono">1122</span></p>
        <p className="urdu text-xs text-text-muted mt-1">ڈیفالٹ پاس ورڈ: ۱۱۲۲</p>
      </GlassCard>
    </div>
  );
}

// ─── Admin Section Types ──────────────────────────────────────────────────────
type AdminSection =
  | "overview"
  | "themes"
  | "branding"
  | "tickers"
  | "stats"
  | "security";

// ─── Main Admin Panel ─────────────────────────────────────────────────────────
function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<AdminSection>("overview");
  const {
    adBlockEnabled, setAdBlockEnabled,
    vpnEnabled, setVpnEnabled,
    isIncognito, setIsIncognito,
    theme, setTheme, setThemePickerOpen,
    bookmarks, downloads,
    headerLine1, headerLine2, headerLine3,
    setHeaderLine1, setHeaderLine2, setHeaderLine3,
    tickerMessages, setTickerMessages,
  } = useBrowser();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwMsg, setPwMsg] = useState("");

  const navItems = [
    { id: "overview" as AdminSection, icon: Settings, label: "Overview", labelUrdu: "جائزہ" },
    { id: "themes" as AdminSection, icon: Palette, label: "Themes", labelUrdu: "تھیمز" },
    { id: "branding" as AdminSection, icon: Type, label: "Branding", labelUrdu: "برانڈنگ" },
    { id: "tickers" as AdminSection, icon: RefreshCw, label: "Tickers", labelUrdu: "ٹکرز" },
    { id: "stats" as AdminSection, icon: BarChart3, label: "Stats", labelUrdu: "اعداد و شمار" },
    { id: "security" as AdminSection, icon: Key, label: "Security", labelUrdu: "سیکیورٹی" },
  ];

  const handlePasswordChange = () => {
    if (newPassword.length < 4) { setPwMsg("Minimum 4 characters"); return; }
    if (newPassword !== confirmPassword) { setPwMsg("Passwords do not match"); return; }
    localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword);
    setPwMsg("✓ Password updated successfully!");
    setNewPassword(""); setConfirmPassword("");
    setTimeout(() => setPwMsg(""), 3000);
  };

  const currentTheme = THEMES.find(t => t.id === theme);

  return (
    <div className="flex gap-4 max-w-5xl mx-auto w-full px-4 py-6">
      {/* Sidebar nav */}
      <aside className="w-48 flex-shrink-0 hidden md:block">
        <GlassCard className="p-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 mb-1 ${
                activeSection === item.id
                  ? "bg-accent-primary/20 border border-accent-primary/30 text-accent-primary"
                  : "hover:bg-glass-bg/50 text-text-secondary hover:text-text-primary"
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium">{item.label}</p>
                <p className="urdu text-[10px] opacity-70">{item.labelUrdu}</p>
              </div>
            </button>
          ))}
        </GlassCard>
      </aside>

      {/* Mobile nav */}
      <div className="md:hidden overflow-x-auto pb-2 w-full flex gap-2 mb-4" style={{ scrollbarWidth: "none" }}>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all ${
              activeSection === item.id
                ? "bg-accent-primary/20 border border-accent-primary/30 text-accent-primary"
                : "glass-button"
            }`}
          >
            <item.icon className="w-3.5 h-3.5" />
            {item.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 fade-in">
        {/* ── Overview ── */}
        {activeSection === "overview" && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold neon-text font-orbitron">Overview</h2>
              <p className="urdu text-sm text-text-secondary mt-0.5">جائزہ</p>
            </div>

            {/* Toggle cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: "Ad Blocker", labelUrdu: "اشتہار بلاکر", value: adBlockEnabled, set: setAdBlockEnabled, icon: Shield, color: "green" },
                { label: "VPN", labelUrdu: "وی پی این", value: vpnEnabled, set: setVpnEnabled, icon: Wifi, color: "blue" },
                { label: "Incognito", labelUrdu: "خفیہ موڈ", value: isIncognito, set: setIsIncognito, icon: Moon, color: "purple" },
              ].map(({ label, labelUrdu, value, set, icon: Icon, color }) => (
                <GlassCard key={label} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{label}</p>
                      <p className="urdu text-xs text-text-muted">{labelUrdu}</p>
                    </div>
                    <Icon className={`w-5 h-5 ${value ? `text-${color}-400` : "text-text-muted"}`} />
                  </div>
                  <button
                    onClick={() => set(!value)}
                    className={`w-12 h-6 rounded-full transition-all duration-300 relative ${
                      value ? `bg-${color}-500` : "bg-glass-border/30"
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${value ? "left-7" : "left-1"}`} />
                  </button>
                  <p className={`text-xs font-medium mt-2 ${value ? `text-${color}-400` : "text-text-muted"}`}>
                    {value ? "Active" : "Inactive"}
                  </p>
                </GlassCard>
              ))}
            </div>

            {/* Active theme */}
            <GlassCard className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-text-primary">Active Theme</p>
                  <p className="text-lg font-bold neon-text mt-1">
                    {currentTheme?.emoji} {currentTheme?.name}
                  </p>
                  <p className="urdu text-sm text-text-secondary">{currentTheme?.nameUrdu}</p>
                </div>
                <div
                  className="w-16 h-16 rounded-2xl"
                  style={{ background: currentTheme?.preview }}
                />
              </div>
              <GlassButton onClick={() => setThemePickerOpen(true)} className="mt-3">
                <Palette className="w-3.5 h-3.5 mr-2" />
                Change Theme
              </GlassButton>
            </GlassCard>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Bookmarks", value: bookmarks.length, icon: "📚" },
                { label: "Downloads", value: downloads.length, icon: "⬇️" },
              ].map(stat => (
                <GlassCard key={stat.label} className="p-4 text-center">
                  <p className="text-3xl mb-1">{stat.icon}</p>
                  <p className="text-2xl font-bold neon-text font-orbitron">{stat.value}</p>
                  <p className="text-xs text-text-muted">{stat.label}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* ── Themes ── */}
        {activeSection === "themes" && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold neon-text font-orbitron">Theme Selector</h2>
              <p className="urdu text-sm text-text-secondary mt-0.5">تھیم انتخاب · 16 تھیمز</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {THEMES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`rounded-2xl overflow-hidden transition-all duration-200 hover:scale-105 text-left ${
                    theme === t.id ? "ring-2 ring-white/70 shadow-xl" : ""
                  }`}
                >
                  <div className="h-16" style={{ background: t.preview }} />
                  <div className="p-3" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white">{t.emoji} {t.name}</p>
                        <p className="urdu text-[10px] text-white/50">{t.nameUrdu}</p>
                      </div>
                      {theme === t.id && <CheckCircle className="w-4 h-4 text-green-400" />}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Branding ── */}
        {activeSection === "branding" && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold neon-text font-orbitron">Branding</h2>
              <p className="urdu text-sm text-text-secondary mt-0.5">برانڈنگ تبدیل کریں</p>
            </div>
            <GlassCard className="p-4 space-y-4">
              <div>
                <label className="block text-xs text-text-muted mb-1 font-medium">Header Line 1 (Arabic/Urdu)</label>
                <input
                  type="text"
                  value={headerLine1}
                  onChange={e => setHeaderLine1(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                  style={{
                    background: "hsl(var(--glass-bg)/0.7)",
                    border: "1px solid hsl(var(--glass-border)/0.3)",
                    color: "hsl(var(--text-primary))",
                    direction: "rtl",
                    fontFamily: "serif",
                  }}
                />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1 font-medium">Header Line 2 (English Title)</label>
                <input
                  type="text"
                  value={headerLine2}
                  onChange={e => setHeaderLine2(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                  style={{
                    background: "hsl(var(--glass-bg)/0.7)",
                    border: "1px solid hsl(var(--glass-border)/0.3)",
                    color: "hsl(var(--text-primary))",
                  }}
                />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1 font-medium">Header Line 3 (Urdu Subtitle)</label>
                <input
                  type="text"
                  value={headerLine3}
                  onChange={e => setHeaderLine3(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                  style={{
                    background: "hsl(var(--glass-bg)/0.7)",
                    border: "1px solid hsl(var(--glass-border)/0.3)",
                    color: "hsl(var(--text-primary))",
                    direction: "rtl",
                  }}
                />
              </div>
            </GlassCard>

            {/* Live preview */}
            <GlassCard className="p-4">
              <p className="text-xs text-text-muted mb-3">Live Preview</p>
              <div>
                <p className="urdu text-xs text-accent-primary font-medium">{headerLine1}</p>
                <p className="font-orbitron text-sm font-bold neon-text">{headerLine2}</p>
                <p className="urdu text-xs text-text-secondary">{headerLine3}</p>
              </div>
            </GlassCard>
          </div>
        )}

        {/* ── Tickers ── */}
        {activeSection === "tickers" && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold neon-text font-orbitron">Ticker Messages</h2>
              <p className="urdu text-sm text-text-secondary mt-0.5">ٹکر پیغامات · 7 ٹکرز</p>
            </div>
            <div className="space-y-3">
              {tickerMessages.map((ticker, idx) => (
                <GlassCard key={ticker.id} className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded-lg text-xs font-mono text-accent-primary"
                      style={{ background: "hsl(var(--accent-primary)/0.15)", border: "1px solid hsl(var(--accent-primary)/0.3)" }}>
                      {ticker.position}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-[10px] text-text-muted mb-1">English Text</label>
                      <input
                        type="text"
                        value={ticker.text}
                        onChange={e => {
                          const updated = [...tickerMessages];
                          updated[idx] = { ...ticker, text: e.target.value };
                          setTickerMessages(updated);
                        }}
                        className="w-full px-3 py-2 rounded-xl text-xs outline-none"
                        style={{
                          background: "hsl(var(--glass-bg)/0.7)",
                          border: "1px solid hsl(var(--glass-border)/0.3)",
                          color: "hsl(var(--text-primary))",
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-text-muted mb-1">Urdu Text (اردو)</label>
                      <input
                        type="text"
                        value={ticker.textUrdu}
                        onChange={e => {
                          const updated = [...tickerMessages];
                          updated[idx] = { ...ticker, textUrdu: e.target.value };
                          setTickerMessages(updated);
                        }}
                        className="w-full px-3 py-2 rounded-xl text-xs outline-none"
                        style={{
                          background: "hsl(var(--glass-bg)/0.7)",
                          border: "1px solid hsl(var(--glass-border)/0.3)",
                          color: "hsl(var(--text-primary))",
                          direction: "rtl",
                        }}
                      />
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* ── Stats ── */}
        {activeSection === "stats" && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold neon-text font-orbitron">Statistics</h2>
              <p className="urdu text-sm text-text-secondary mt-0.5">اعداد و شمار</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Total Bookmarks", labelUrdu: "کل بک مارکس", value: bookmarks.length, icon: "📚", color: "blue" },
                { label: "Total Downloads", labelUrdu: "کل ڈاؤن لوڈز", value: downloads.length, icon: "⬇️", color: "green" },
                { label: "Themes Available", labelUrdu: "دستیاب تھیمز", value: 16, icon: "🎨", color: "purple" },
                { label: "Content Hubs", labelUrdu: "مواد ہبز", value: 5, icon: "🌐", color: "orange" },
                { label: "Hub Apps Total", labelUrdu: "کل ایپس", value: 100, icon: "📱", color: "red" },
                { label: "Ticker Strips", labelUrdu: "ٹکر پٹیاں", value: 7, icon: "📜", color: "cyan" },
              ].map(stat => (
                <GlassCard key={stat.label} className="p-4 text-center">
                  <p className="text-3xl mb-2">{stat.icon}</p>
                  <p className="text-3xl font-bold neon-text font-orbitron">{stat.value}</p>
                  <p className="text-xs text-text-secondary font-medium mt-1">{stat.label}</p>
                  <p className="urdu text-[10px] text-text-muted">{stat.labelUrdu}</p>
                </GlassCard>
              ))}
            </div>

            {/* Bookmarks by folder */}
            {bookmarks.length > 0 && (
              <GlassCard className="p-4">
                <p className="text-sm font-semibold text-text-primary mb-3">Bookmarks by Folder</p>
                {Array.from(new Set(bookmarks.map(b => b.folder))).map(folder => {
                  const count = bookmarks.filter(b => b.folder === folder).length;
                  const pct = Math.round((count / bookmarks.length) * 100);
                  return (
                    <div key={folder} className="mb-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-text-secondary">{folder}</span>
                        <span className="text-text-muted">{count}</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ background: "hsl(var(--glass-bg))" }}>
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${pct}%`, background: "hsl(var(--accent-primary))" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </GlassCard>
            )}
          </div>
        )}

        {/* ── Security ── */}
        {activeSection === "security" && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold neon-text font-orbitron">Security</h2>
              <p className="urdu text-sm text-text-secondary mt-0.5">سیکیورٹی</p>
            </div>
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "hsl(var(--accent-primary)/0.2)", border: "1px solid hsl(var(--accent-primary)/0.4)" }}>
                  <Key className="w-5 h-5 text-accent-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Change Admin Password</p>
                  <p className="urdu text-xs text-text-muted">پاس ورڈ تبدیل کریں</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-text-muted mb-1">New Password (min 4 chars)</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="New password..."
                    className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                    style={{
                      background: "hsl(var(--glass-bg)/0.7)",
                      border: "1px solid hsl(var(--glass-border)/0.3)",
                      color: "hsl(var(--text-primary))",
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-muted mb-1">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password..."
                    className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                    style={{
                      background: "hsl(var(--glass-bg)/0.7)",
                      border: "1px solid hsl(var(--glass-border)/0.3)",
                      color: "hsl(var(--text-primary))",
                    }}
                  />
                </div>
              </div>

              {pwMsg && (
                <div className={`mt-3 flex items-center gap-2 px-3 py-2 rounded-xl text-xs ${
                  pwMsg.startsWith("✓")
                    ? "text-green-400 bg-green-500/10 border border-green-500/30"
                    : "text-red-400 bg-red-500/10 border border-red-500/30"
                }`}>
                  {pwMsg.startsWith("✓") ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                  {pwMsg}
                </div>
              )}

              <GlassButton onClick={handlePasswordChange} primary className="mt-4 w-full justify-center py-3">
                <Key className="w-4 h-4 mr-2" />
                Update Password
              </GlassButton>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Admin Page ───────────────────────────────────────────────────────────────
export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "hsl(var(--bg-primary))" }}>
      <Header />
      <main className="flex-1">
        {!isLoggedIn ? (
          <AdminLogin onLogin={() => setIsLoggedIn(true)} />
        ) : (
          <AdminDashboard />
        )}
      </main>
    </div>
  );
}
