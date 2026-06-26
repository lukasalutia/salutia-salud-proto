"use client";

import { Plus, ArrowRight } from "lucide-react";
import { SaluAvatar } from "./SaluAvatar";

const insights = [
  {
    text: "Tu colesterol total bajó 12% en 6 meses.",
    detail: "Seguís en rango normal. Muy buen progreso.",
    dot: "#16a34a",
  },
  {
    text: "Tu ácido úrico subió a 7.2 mg/dL.",
    detail: "No es urgente, pero mencionáselo al médico.",
    dot: "#d97706",
  },
];

export function SaluInsightCard({ isRich }: { isRich: boolean }) {
  const pct = 25; // 2 of 8 studies loaded

  return (
    <div
      className="mx-4 rounded-2xl overflow-hidden"
      style={{ background: "linear-gradient(140deg, #1e2d6b 0%, #28347c 60%, #2b4c9c 100%)" }}
    >
      {isRich ? (
        /* ── Estado B: Salu activo con insights reales ── */
        <div className="p-5">
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0">
              <SaluAvatar size={52} mood="happy" />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                style={{ color: "#22d3ee", fontFamily: "var(--font-inter)" }}
              >
                Salu analizó tus últimos estudios
              </p>
              <div className="flex flex-col gap-2.5">
                {insights.map((ins, i) => (
                  <div key={i} className="flex gap-2.5 items-start">
                    <div
                      className="w-2 h-2 rounded-full mt-1 flex-shrink-0"
                      style={{ background: ins.dot }}
                    />
                    <div>
                      <p
                        className="text-white text-[13px] font-semibold leading-snug"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {ins.text}
                      </p>
                      <p
                        className="text-[11px] mt-0.5"
                        style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-poppins)" }}
                      >
                        {ins.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer link */}
          <button
            className="mt-4 flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
            style={{ color: "#22d3ee", fontFamily: "var(--font-inter)" }}
          >
            Ver resumen completo <ArrowRight size={12} />
          </button>
        </div>
      ) : (
        /* ── Estado A: Onboarding / poca data ── */
        <div className="p-5">
          <div className="flex gap-4 items-start">
            {/* Salu with pulse glow */}
            <div className="flex-shrink-0 relative">
              <div
                className="absolute inset-0 rounded-full salu-pulse"
                style={{
                  background: "radial-gradient(circle, rgba(238,116,47,0.35) 0%, transparent 70%)",
                  transform: "scale(1.5)",
                }}
              />
              <SaluAvatar size={52} mood="thinking" />
            </div>

            <div className="flex-1 min-w-0">
              <p
                className="text-[10px] font-semibold uppercase tracking-widest mb-1.5"
                style={{ color: "#22d3ee", fontFamily: "var(--font-inter)" }}
              >
                Empezando tu perfil
              </p>
              <p
                className="text-white text-[13px] font-semibold leading-snug"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Cargá tus primeros estudios y empiezo a analizar tu salud.
              </p>

              {/* Completitud */}
              <div className="mt-3">
                <div className="flex justify-between mb-1.5">
                  <span
                    className="text-[11px]"
                    style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-poppins)" }}
                  >
                    2 de 8 estudios cargados
                  </span>
                  <span
                    className="text-[11px] font-bold"
                    style={{ color: "#ee742f", fontFamily: "var(--font-inter)" }}
                  >
                    {pct}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.12)" }}>
                  <div
                    className="h-1.5 rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, background: "#ee742f" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
                       text-white text-[13px] font-bold active:scale-95 transition-transform cursor-pointer"
            style={{ background: "#ee742f", fontFamily: "var(--font-inter)" }}
          >
            <Plus size={16} strokeWidth={2.5} />
            Cargar estudio
          </button>
        </div>
      )}
    </div>
  );
}
