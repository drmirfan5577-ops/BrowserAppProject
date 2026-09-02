import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrowserProvider } from "@/contexts/BrowserContext";

// Pages
import Home from "@/pages/Home";
import Hubs from "@/pages/Hubs";
import Admin from "@/pages/Admin";
import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";

// Global overlays
import { BrowserView } from "@/components/features/BrowserView";
import { PiPPlayer } from "@/components/features/PiPPlayer";
import { BookmarkManager } from "@/components/features/BookmarkManager";
import { DownloadManager } from "@/components/features/DownloadManager";
import { ThemePicker } from "@/components/features/ThemePicker";
import { Sidebar } from "@/components/layout/Sidebar";

function AppShell() {
  return (
    <>
      {/* Page routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hubs" element={<Hubs />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Global overlays (rendered outside routes so they persist) */}
      <BrowserView />
      <PiPPlayer />
      <BookmarkManager />
      <DownloadManager />
      <ThemePicker />
      <Sidebar />
    </>
  );
}

export default function App() {
  return (
    <BrowserProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </BrowserProvider>
  );
}
