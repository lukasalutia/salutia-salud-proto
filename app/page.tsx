"use client";

import { useState } from "react";
import { SaluInsightCard } from "./components/SaluInsightCard";
import { EvolucionSection } from "./components/EvolucionSection";
import { TrackingNavCards } from "./components/TrackingNavCards";
import { BottomNav } from "./components/BottomNav";
import { BrandLogo } from "@/components/brand-logo";

/* ── Header ── */
function Header() {
  return (
    <header className="flex items-center justify-between px-4 pt-12 pb-1">
      <div className="flex items-center gap-3">
        <img
          src="/salu-waving.png"
          alt=""
          aria-hidden
          style={{ height: 44, width: "auto", flexShrink: 0 }}
        />
        <div>
          <p className="text-[11px] font-semibold text-brand-navy/40 uppercase tracking-wide">
            Buenos días
          </p>
          <h1 className="font-heading text-[20px] font-bold text-brand-navy leading-tight">
            Juan
          </h1>
        </div>
      </div>
      <BrandLogo variant="isotype" size={32} />
    </header>
  );
}

/* ── Proto toggle ── */
function ProtoToggle({
  isRich,
  onChange,
}: {
  isRich: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="mx-4 mt-3 mb-1">
      <div className="flex gap-1 bg-white rounded-xl p-1 ring-1 ring-brand-navy/[0.06] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
        <button
          onClick={() => onChange(false)}
          className="flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-200 cursor-pointer"
          style={
            !isRich
              ? { background: "#28347c", color: "white" }
              : { color: "#9aa7c2" }
          }
        >
          Poca data
        </button>
        <button
          onClick={() => onChange(true)}
          className="flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-200 cursor-pointer"
          style={
            isRich
              ? { background: "#28347c", color: "white" }
              : { color: "#9aa7c2" }
          }
        >
          Historial rico
        </button>
      </div>
      <p className="text-[9px] text-center mt-1 text-brand-navy/30">
        PROTO · toggle de estados
      </p>
    </div>
  );
}

/* ── Page ── */
export default function SaludPage() {
  const [isRich, setIsRich] = useState(false);

  return (
    <div className="flex flex-col min-h-dvh bg-[#f2f5fb]">
      <Header />

      <div className="flex-1 overflow-y-auto pb-28" style={{ WebkitOverflowScrolling: "touch" }}>
        <ProtoToggle isRich={isRich} onChange={setIsRich} />

        <div className="px-4 flex flex-col gap-4 mt-3">
          <SaluInsightCard isRich={isRich} />
          <EvolucionSection isRich={isRich} />
          <TrackingNavCards />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
