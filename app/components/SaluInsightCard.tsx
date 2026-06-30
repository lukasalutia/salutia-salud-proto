"use client";

import Image from "next/image";
import { Plus, ArrowRight, Sparkles } from "lucide-react";

const insights = [
  {
    text: "Tu colesterol total bajó 12% en 6 meses.",
    detail: "Seguís en rango normal. Muy buen progreso.",
    dot: "#16a34a",
  },
  {
    text: "Tu ácido úrico subió a 7.2 mg/dL.",
    detail: "No es urgente, pero mencionáselo al médico.",
    dot: "#c07a1e",
  },
];

export function SaluInsightCard({ isRich }: { isRich: boolean }) {
  const pct = 25; // 2 de 8 estudios

  return (
    <section
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-blue to-brand-navy
                 p-5 text-white shadow-[0_8px_32px_rgba(43,76,156,0.22)]"
    >
      <span aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/[0.04]" />
      <span aria-hidden className="absolute -left-12 -bottom-16 h-44 w-44 rounded-full bg-white/[0.03]" />

      {isRich ? (
        /* ── Estado B: Salu activo con insights reales ── */
        <div className="relative flex gap-2">
          <div className="flex-1 min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 ring-1 ring-white/15 mb-3">
              <Sparkles className="h-3 w-3 text-white/70" strokeWidth={2.5} />
              <span className="text-[10px] font-bold uppercase tracking-wide text-white/70">
                Salu analizó tus estudios
              </span>
            </span>

            <div className="flex flex-col gap-2.5">
              {insights.map((ins, i) => (
                <div key={i} className="flex gap-2.5 items-start">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: ins.dot }} />
                  <div>
                    <p className="font-heading text-white text-[13px] font-bold leading-snug">{ins.text}</p>
                    <p className="text-white/50 text-[11px] mt-0.5">{ins.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-4 flex items-center gap-1 text-[11px] font-bold text-white active:opacity-70 transition-opacity cursor-pointer">
              Ver resumen completo <ArrowRight size={12} />
            </button>
          </div>

          <div className="shrink-0 w-[72px] self-end -mb-1">
            <Image
              src="/salu-clipboard.png"
              alt=""
              width={302}
              height={368}
              className="w-full h-auto pointer-events-none select-none"
              priority
            />
          </div>
        </div>
      ) : (
        /* ── Estado A: Onboarding / poca data ── */
        <div className="relative">
          <div className="flex gap-2 items-start">
            <div className="flex-1 min-w-0">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 ring-1 ring-white/15 mb-3">
                <Sparkles className="h-3 w-3 text-white/70" strokeWidth={2.5} />
                <span className="text-[10px] font-bold uppercase tracking-wide text-white/70">
                  Empezando tu perfil
                </span>
              </span>

              <p className="font-heading text-white text-[15px] font-bold leading-snug">
                Cargá tus primeros estudios y empiezo a analizar tu salud.
              </p>
            </div>

            <div className="shrink-0 w-[80px] -mt-2 -mr-1">
              <Image
                src="/salu-clipboard.png"
                alt=""
                width={302}
                height={368}
                className="w-full h-auto pointer-events-none select-none"
                priority
              />
            </div>
          </div>

          {/* Completitud */}
          <div className="mt-4">
            <div className="flex justify-between mb-1.5">
              <span className="text-[11px] text-white/50">2 de 8 estudios cargados</span>
              <span className="text-[11px] font-bold text-brand-orange">{pct}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/12">
              <div
                className="h-1.5 rounded-full bg-brand-orange transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* CTA */}
          <button
            className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-2xl
                       bg-white text-[14px] font-bold text-brand-navy
                       active:scale-[0.98] transition-transform cursor-pointer"
          >
            <Plus size={16} strokeWidth={2.5} />
            Cargar estudio
          </button>
        </div>
      )}
    </section>
  );
}
