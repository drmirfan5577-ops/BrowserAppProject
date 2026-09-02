import React, { useState } from "react";
import { Trash2, ExternalLink, FolderOpen, Plus, Search } from "lucide-react";
import { GlassModal } from "@/components/ui/GlassModal";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { useBrowser } from "@/contexts/BrowserContext";
import type { Bookmark } from "@/types";

export function BookmarkManager() {
  const { bookmarkManagerOpen, setBookmarkManagerOpen, bookmarks, removeBookmark, openBrowser, addBookmark } = useBrowser();
  const [search, setSearch] = useState("");
  const [activeFolder, setActiveFolder] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newFolder, setNewFolder] = useState("General");

  const folders = ["All", ...Array.from(new Set(bookmarks.map(b => b.folder)))];
  const filtered = bookmarks.filter(b => {
    const matchFolder = activeFolder === "All" || b.folder === activeFolder;
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.url.toLowerCase().includes(search.toLowerCase());
    return matchFolder && matchSearch;
  });

  const handleAdd = () => {
    if (!newTitle.trim() || !newUrl.trim()) return;
    addBookmark({ title: newTitle, url: newUrl.startsWith("http") ? newUrl : `https://${newUrl}`, folder: newFolder });
    setNewTitle(""); setNewUrl(""); setShowAdd(false);
  };

  const formatDate = (ts: number) => new Date(ts).toLocaleDateString();

  return (
    <GlassModal
      isOpen={bookmarkManagerOpen}
      onClose={() => setBookmarkManagerOpen(false)}
      title="📚 Bookmarks"
      titleUrdu="بک مارکس"
      size="lg"
    >
      {/* Search + Add */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl glass-card">
          <Search className="w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search bookmarks..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-muted"
          />
        </div>
        <GlassButton onClick={() => setShowAdd(!showAdd)} primary>
          <Plus className="w-4 h-4" />
        </GlassButton>
      </div>

      {/* Add form */}
      {showAdd && (
        <GlassCard className="p-4 mb-4 space-y-3">
          <p className="text-sm font-medium text-text-primary">Add Bookmark</p>
          <input
            type="text"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            placeholder="Title"
            className="w-full bg-transparent border rounded-lg px-3 py-2 text-sm text-text-primary outline-none placeholder:text-text-muted"
            style={{ borderColor: "hsl(var(--glass-border)/0.3)" }}
          />
          <input
            type="text"
            value={newUrl}
            onChange={e => setNewUrl(e.target.value)}
            placeholder="URL (e.g. https://google.com)"
            className="w-full bg-transparent border rounded-lg px-3 py-2 text-sm text-text-primary outline-none placeholder:text-text-muted"
            style={{ borderColor: "hsl(var(--glass-border)/0.3)" }}
          />
          <input
            type="text"
            value={newFolder}
            onChange={e => setNewFolder(e.target.value)}
            placeholder="Folder name"
            className="w-full bg-transparent border rounded-lg px-3 py-2 text-sm text-text-primary outline-none placeholder:text-text-muted"
            style={{ borderColor: "hsl(var(--glass-border)/0.3)" }}
          />
          <div className="flex gap-2">
            <GlassButton onClick={handleAdd} primary>Save</GlassButton>
            <GlassButton onClick={() => setShowAdd(false)}>Cancel</GlassButton>
          </div>
        </GlassCard>
      )}

      {/* Folder tabs */}
      <div className="flex gap-1 mb-4 overflow-x-auto pb-1">
        {folders.map(f => (
          <button
            key={f}
            onClick={() => setActiveFolder(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex-shrink-0 transition-all ${
              activeFolder === f
                ? "bg-accent-primary/20 border border-accent-primary/40 text-accent-primary"
                : "glass-button"
            }`}
          >
            <FolderOpen className="w-3 h-3 inline mr-1" />
            {f}
          </button>
        ))}
      </div>

      {/* Bookmarks list */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-8 text-text-muted">
            <p className="text-4xl mb-2">📚</p>
            <p className="text-sm">No bookmarks yet</p>
            <p className="urdu text-xs mt-1">ابھی تک کوئی بک مارک نہیں</p>
          </div>
        ) : (
          filtered.map(bm => (
            <GlassCard key={bm.id} className="p-3 flex items-center gap-3">
              <img
                src={`https://www.google.com/s2/favicons?domain=${new URL(bm.url).hostname}&sz=32`}
                alt=""
                className="w-6 h-6 rounded flex-shrink-0"
                onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{bm.title}</p>
                <p className="text-xs text-text-muted truncate">{bm.url}</p>
                <p className="text-[10px] text-text-muted">{bm.folder} · {formatDate(bm.createdAt)}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => { openBrowser(bm.url); setBookmarkManagerOpen(false); }}
                  className="p-1.5 rounded-lg glass-button"
                  title="Open"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => removeBookmark(bm.id)}
                  className="p-1.5 rounded-lg glass-button hover:text-red-400"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </GlassCard>
          ))
        )}
      </div>

      <p className="text-xs text-text-muted text-center mt-4">
        {bookmarks.length} bookmark{bookmarks.length !== 1 ? "s" : ""} saved
      </p>
    </GlassModal>
  );
}
