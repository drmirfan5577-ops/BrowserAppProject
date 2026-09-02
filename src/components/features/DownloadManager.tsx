import React, { useState } from "react";
import { Trash2, ExternalLink, Download, Search } from "lucide-react";
import { GlassModal } from "@/components/ui/GlassModal";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { useBrowser } from "@/contexts/BrowserContext";

export function DownloadManager() {
  const { downloadManagerOpen, setDownloadManagerOpen, downloads, removeDownload } = useBrowser();
  const [search, setSearch] = useState("");

  const filtered = downloads.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor = { completed: "text-green-400", pending: "text-yellow-400", failed: "text-red-400" };
  const statusLabel = { completed: "✓ Completed", pending: "⏳ Pending", failed: "✗ Failed" };
  const formatDate = (ts: number) => new Date(ts).toLocaleString();

  return (
    <GlassModal
      isOpen={downloadManagerOpen}
      onClose={() => setDownloadManagerOpen(false)}
      title="⬇️ Downloads"
      titleUrdu="ڈاؤن لوڈز"
      size="lg"
    >
      {/* Search */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl glass-card mb-4">
        <Search className="w-4 h-4 text-text-muted" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search downloads..."
          className="flex-1 bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-muted"
        />
      </div>

      {/* List */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-8 text-text-muted">
            <Download className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No downloads yet</p>
            <p className="urdu text-xs mt-1">ابھی تک کوئی ڈاؤن لوڈ نہیں</p>
          </div>
        ) : (
          filtered.map(dl => (
            <GlassCard key={dl.id} className="p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl glass-button flex items-center justify-center flex-shrink-0">
                <Download className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{dl.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-xs font-medium ${statusColor[dl.status]}`}>
                    {statusLabel[dl.status]}
                  </span>
                  {dl.size && <span className="text-xs text-text-muted">· {dl.size}</span>}
                </div>
                <p className="text-[10px] text-text-muted">{formatDate(dl.createdAt)}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => window.open(dl.url, "_blank")}
                  className="p-1.5 rounded-lg glass-button"
                  title="Open"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => removeDownload(dl.id)}
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
        {downloads.length} download{downloads.length !== 1 ? "s" : ""} tracked
      </p>
    </GlassModal>
  );
}
