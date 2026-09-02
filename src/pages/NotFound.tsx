import React from "react";
import { useNavigate } from "react-router-dom";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { RotatingLogo } from "@/components/features/RotatingLogo";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "hsl(var(--bg-primary))" }}
    >
      <GlassCard className="p-10 text-center max-w-md">
        <RotatingLogo size="md" />
        <h1 className="font-orbitron text-6xl font-black neon-text mt-6 mb-2">404</h1>
        <p className="text-lg font-semibold text-text-primary mb-1">Page Not Found</p>
        <p className="urdu text-sm text-text-secondary mb-6">صفحہ نہیں ملا</p>
        <GlassButton onClick={() => navigate("/")} primary>
          ← Back to Home
        </GlassButton>
      </GlassCard>
    </div>
  );
}
