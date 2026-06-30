"use client";

import { useState } from "react";

/* ── Types ── */
interface DataPoint { label: string; value: number }
interface Metric {
  id: string;
  name: string;
  unit: string;
  range: { min: number; max: number };
  data: DataPoint[];
  lineColor: string;
  lastStatus: "verde" | "amarillo" | "rojo";
}

/* ── Data ── */
const metrics: Metric[] = [
  {
    id: "glucosa",
    name: "Glucosa",
    unit: "mg/dL",
    range: { min: 70, max: 100 },
    data: [
      { label: "Ene", value: 105 },
      { label: "Feb", value: 98 },
      { label: "Mar", value: 110 },
      { label: "Abr", value: 103 },
      { label: "May", value: 95 },
      { label: "Jun", value: 99 },
    ],
    lineColor: "#2b4c9c",
    lastStatus: "verde",
  },
  {
    id: "colesterol",
    name: "Colesterol",
    unit: "mg/dL",
    range: { min: 0, max: 200 },
    data: [
      { label: "Nov", value: 225 },
      { label: "Ene", value: 215 },
      { label: "Mar", value: 207 },
      { label: "Jun", value: 192 },
    ],
    lineColor: "#16a34a",
    lastStatus: "verde",
  },
  {
    id: "hemoglobina",
    name: "Hemoglobina",
    unit: "g/dL",
    range: { min: 13.5, max: 17.5 },
    data: [
      { label: "Ene", value: 14.8 },
      { label: "Mar", value: 14.5 },
      { label: "Jun", value: 13.9 },
    ],
    lineColor: "#c07a1e",
    lastStatus: "amarillo",
  },
];

/* ── SVG path helper (catmull-rom → cubic bezier) ── */
function smoothPath(pts: [number, number][], tension = 0.35): string {
  if (pts.length === 1) return `M ${pts[0][0]},${pts[0][1]}`;
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? pts[i + 1];
    const cp1x = p1[0] + (p2[0] - p0[0]) * tension;
    const cp1y = p1[1] + (p2[1] - p0[1]) * tension;
    const cp2x = p2[0] - (p3[0] - p1[0]) * tension;
    const cp2y = p2[1] - (p3[1] - p1[1]) * tension;
    d += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2[0]},${p2[1]}`;
  }
  return d;
}

/* ── Mini Chart ── */
function MiniChart({ metric }: { metric: Metric }) {
  const W = 290, H = 76, padX = 10, padY = 10;
  const cW = W - 2 * padX;
  const cH = H - 2 * padY;

  const vals = metric.data.map((d) => d.value);
  const dataMin = Math.min(...vals);
  const dataMax = Math.max(...vals);
  const span = dataMax - dataMin || 1;
  const vizMin = dataMin - span * 0.25;
  const vizMax = dataMax + span * 0.25;
  const vizSpan = vizMax - vizMin;

  const toX = (i: number) =>
    padX + (metric.data.length === 1 ? cW / 2 : (i / (metric.data.length - 1)) * cW);
  const toY = (v: number) => padY + cH - ((v - vizMin) / vizSpan) * cH;

  const pts: [number, number][] = metric.data.map((d, i) => [toX(i), toY(d.value)]);
  const line = smoothPath(pts);
  const area = `${line} L ${pts[pts.length - 1][0]},${H} L ${pts[0][0]},${H} Z`;

  const bandTop = Math.max(padY, toY(metric.range.max));
  const bandBot = Math.min(H, toY(metric.range.min));

  const gradId = `area-${metric.id}`;

  return (
    <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={metric.lineColor} stopOpacity="0.2" />
          <stop offset="100%" stopColor={metric.lineColor} stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {bandBot > bandTop && (
        <rect x={padX} y={bandTop} width={cW} height={bandBot - bandTop}
              fill="#16a34a" fillOpacity="0.07" rx="3" />
      )}

      <path d={area} fill={`url(#${gradId})`} />

      <path d={line} stroke={metric.lineColor} strokeWidth="2.2" fill="none"
            strokeLinecap="round" strokeLinejoin="round" className="chart-line" />

      {pts.map(([x, y], i) => {
        const isLast = i === pts.length - 1;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={isLast ? 5.5 : 3.5}
                    fill="white" stroke={metric.lineColor} strokeWidth="2" />
            {isLast && <circle cx={x} cy={y} r={3} fill={metric.lineColor} />}
          </g>
        );
      })}
    </svg>
  );
}

/* ── Status config ── */
const statusCfg = {
  verde:   { color: "#16a34a", bg: "#ecfdf3", label: "Normal" },
  amarillo:{ color: "#c07a1e", bg: "#fef3e2", label: "Vigilar" },
  rojo:    { color: "#d93232", bg: "#fdeded", label: "Revisar" },
};

/* ── Main component ── */
export function EvolucionSection({ isRich }: { isRich: boolean }) {
  const [selectedId, setSelectedId] = useState("glucosa");
  const selected = metrics.find((m) => m.id === selectedId)!;
  const last = selected.data[selected.data.length - 1];
  const scfg = statusCfg[selected.lastStatus];

  if (!isRich) {
    return (
      <div>
        <h2 className="font-heading text-[13px] font-bold uppercase tracking-wide text-brand-navy/40 px-1 mb-3">
          Evolución
        </h2>

        <div className="bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04),0_4px_16px_rgba(43,76,156,0.07)] ring-1 ring-brand-navy/[0.05]">
          <svg width="100%" height="72" viewBox="0 0 290 72" preserveAspectRatio="none">
            <path
              d="M 10,50 C 40,50 50,28 72,28 C 94,28 104,55 145,55 C 180,55 200,30 220,30 C 240,30 260,42 280,38"
              stroke="#dbe3f0" strokeWidth="2" fill="none" strokeDasharray="5 4"
              strokeLinecap="round"
            />
            {[10, 72, 145, 220, 280].map((x, i) => (
              <circle key={i} cx={x} cy={[50, 28, 55, 30, 38][i]} r="4"
                      fill="white" stroke="#dbe3f0" strokeWidth="2" />
            ))}
            <circle cx={10} cy={50} r={5} fill="white" stroke="#2b4c9c" strokeWidth="2.2" />
            <circle cx={10} cy={50} r={3} fill="#2b4c9c" />
          </svg>

          <p className="text-center text-[12px] mt-2 text-brand-navy/45">
            Cargá 2 análisis más para ver tu evolución
          </p>

          <button
            className="mt-3 w-full py-2.5 rounded-xl text-[13px] font-bold
                       bg-brand-surface text-brand-blue active:opacity-70 transition-opacity cursor-pointer"
          >
            + Agregar análisis
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between px-1 mb-3">
        <h2 className="font-heading text-[13px] font-bold uppercase tracking-wide text-brand-navy/40">
          Evolución
        </h2>
      </div>

      {/* Metric picker */}
      <div className="flex gap-2 mb-3 overflow-x-auto pb-0.5 no-scrollbar">
        {metrics.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelectedId(m.id)}
            className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-bold
                       transition-all duration-200 cursor-pointer"
            style={
              selectedId === m.id
                ? { background: "#28347c", color: "white" }
                : { background: "white", color: "#28347c66" }
            }
          >
            {m.name}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04),0_4px_16px_rgba(43,76,156,0.07)] ring-1 ring-brand-navy/[0.05]">
        <div className="flex items-start justify-between mb-1">
          <div className="flex items-baseline gap-1.5">
            <span className="font-heading text-[26px] font-bold text-brand-navy">{last.value}</span>
            <span className="text-[12px] text-brand-navy/40">{selected.unit}</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: scfg.bg }}>
            <div className="w-2 h-2 rounded-full" style={{ background: scfg.color }} />
            <span className="text-[11px] font-bold" style={{ color: scfg.color }}>{scfg.label}</span>
          </div>
        </div>

        <div className="w-full mt-1">
          <MiniChart metric={selected} />
        </div>

        <div className="flex justify-between px-2.5 mt-0.5">
          {selected.data.map((d, i) => (
            <span key={i} className="text-[10px] text-brand-navy/30">{d.label}</span>
          ))}
        </div>

        <div className="mt-2.5 pt-2.5 border-t border-brand-navy/[0.06] flex items-center justify-between">
          <span className="text-[10px] text-brand-navy/35">
            Normal: {selected.range.min}–{selected.range.max} {selected.unit}
          </span>
        </div>
      </div>
    </div>
  );
}
