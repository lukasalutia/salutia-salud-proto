"use client";

import { useState } from "react";
import { SaluInsightCard } from "./components/SaluInsightCard";
import { EvolucionSection } from "./components/EvolucionSection";
import { ResultadosSection } from "./components/ResultadosSection";
import { VacunasSection } from "./components/VacunasSection";
import { MedicacionSection } from "./components/MedicacionSection";
import { BottomNav } from "./components/BottomNav";

/* ── Salutia isotipo inline SVG ── */
function SalutiaIsotipo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="18" fill="white" fillOpacity="0.15" />
      <circle cx="18" cy="18" r="13" fill="white" fillOpacity="0.12" />
      {/* S-pulse shape */}
      <path
        d="M8 22 L12 10 L16 18 L20 12 L24 18 L28 14"
        stroke="white"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Header ── */
function Header() {
  return (
    <div
      className="px-5 pt-12 pb-6"
      style={{ background: "linear-gradient(140deg, #2b4c9c 0%, #28347c 100%)" }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p
            className="text-[12px] font-medium"
            style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-poppins)" }}
          >
            Buenos días
          </p>
          <h1
            className="text-[26px] font-bold mt-0.5 leading-tight"
            style={{ color: "white", fontFamily: "var(--font-inter)" }}
          >
            Juan
          </h1>
          <p
            className="text-[12px] mt-0.5"
            style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-poppins)" }}
          >
            Tu resumen de salud
          </p>
        </div>
        <SalutiaIsotipo />
      </div>
    </div>
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
    <div className="mx-4 mt-3 mb-0.5">
      <div className="flex gap-1 bg-[#e8f4fb] rounded-xl p-1">
        <button
          onClick={() => onChange(false)}
          className="flex-1 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200 cursor-pointer"
          style={
            !isRich
              ? { background: "white", color: "#28347c", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", fontFamily: "var(--font-inter)" }
              : { color: "#999", fontFamily: "var(--font-inter)" }
          }
        >
          Poca data
        </button>
        <button
          onClick={() => onChange(true)}
          className="flex-1 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200 cursor-pointer"
          style={
            isRich
              ? { background: "white", color: "#28347c", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", fontFamily: "var(--font-inter)" }
              : { color: "#999", fontFamily: "var(--font-inter)" }
          }
        >
          Historial rico
        </button>
      </div>
      <p
        className="text-[9px] text-center mt-1"
        style={{ color: "#bbb", fontFamily: "var(--font-poppins)" }}
      >
        PROTO · toggle de estados
      </p>
    </div>
  );
}

/* ── Section divider ── */
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="mx-4 my-5 flex items-center gap-3">
      <div className="h-px flex-1" style={{ background: "#eef2f8" }} />
      <span
        className="text-[10px] font-semibold uppercase tracking-widest"
        style={{ color: "#c7d5e0", fontFamily: "var(--font-inter)" }}
      >
        {label}
      </span>
      <div className="h-px flex-1" style={{ background: "#eef2f8" }} />
    </div>
  );
}

/* ── Page ── */
export default function SaludPage() {
  const [isRich, setIsRich] = useState(false);

  return (
    <div className="flex flex-col min-h-dvh" style={{ background: "#f5f8fc" }}>
      <Header />

      <div className="flex-1 overflow-y-auto pb-28" style={{ WebkitOverflowScrolling: "touch" }}>
        <ProtoToggle isRich={isRich} onChange={setIsRich} />

        {/* ── Bloque A: Análisis ── */}
        <div className="mt-4">
          <SaluInsightCard isRich={isRich} />
        </div>

        <EvolucionSection isRich={isRich} />
        <ResultadosSection isRich={isRich} />

        <SectionDivider label="Seguimiento" />

        {/* ── Bloque B: Utilitario ── */}
        <VacunasSection isRich={isRich} />
        <MedicacionSection isRich={isRich} />
      </div>

      <BottomNav />
    </div>
  );
}
