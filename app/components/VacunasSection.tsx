import { ChevronRight } from "lucide-react";

interface Vacuna {
  nombre: string;
  dosis: string;
  nota: string;
  status: "aldia" | "proximo" | "pendiente";
}

const vacunasRich: Vacuna[] = [
  { nombre: "COVID-19",        dosis: "Bivalente",  nota: "Actualizada",         status: "aldia"    },
  { nombre: "Gripe",           dosis: "Anual",      nota: "Vence en 3 meses",    status: "proximo"  },
  { nombre: "Fiebre amarilla", dosis: "1ra dosis",  nota: "Sin aplicar",         status: "pendiente"},
];

const vacunasPoor: Vacuna[] = [
  { nombre: "Gripe",       dosis: "Anual",    nota: "Actualizada",    status: "aldia"    },
  { nombre: "Hepatitis B", dosis: "3ra dosis", nota: "Sin aplicar",  status: "pendiente"},
];

const statusCfg = {
  aldia:    { label: "Al día",        color: "#16a34a", bg: "#f0fdf4", dotFill: "#16a34a" },
  proximo:  { label: "Vence pronto",  color: "#d97706", bg: "#fffbeb", dotFill: "#d97706" },
  pendiente:{ label: "Pendiente",     color: "#dc2626", bg: "#fef2f2", dotFill: "#dc2626" },
};

export function VacunasSection({ isRich }: { isRich: boolean }) {
  const items = isRich ? vacunasRich : vacunasPoor;

  return (
    <div className="mx-4 mt-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[15px] font-bold"
            style={{ color: "#28347c", fontFamily: "var(--font-inter)" }}>
          Vacunas
        </h2>
        <button className="flex items-center gap-0.5 text-[12px] font-semibold cursor-pointer"
                style={{ color: "#2b4c9c", fontFamily: "var(--font-inter)" }}>
          Ver libreta <ChevronRight size={12} />
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#f0f4f8] overflow-hidden">
        {items.map((item, i) => {
          const cfg = statusCfg[item.status];
          return (
            <div
              key={i}
              className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer active:bg-[#f8fafc] transition-colors
                          ${i < items.length - 1 ? "border-b border-[#f5f7fa]" : ""}`}
            >
              {/* Status indicator dot */}
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                   style={{ background: cfg.bg }}>
                <div className="w-3 h-3 rounded-full" style={{ background: cfg.dotFill }} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold"
                   style={{ color: "#333", fontFamily: "var(--font-inter)" }}>
                  {item.nombre}
                </p>
                <p className="text-[11px] mt-0.5"
                   style={{ color: "#999", fontFamily: "var(--font-poppins)" }}>
                  {item.dosis} · {item.nota}
                </p>
              </div>

              <span
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                style={{ color: cfg.color, background: cfg.bg, fontFamily: "var(--font-inter)" }}
              >
                {cfg.label}
              </span>
            </div>
          );
        })}

        {/* Footer CTA */}
        <div className="px-4 py-3 border-t border-[#f5f7fa]">
          <button
            className="w-full text-center text-[12px] font-semibold cursor-pointer"
            style={{ color: "#2b4c9c", fontFamily: "var(--font-inter)" }}
          >
            + Registrar vacuna
          </button>
        </div>
      </div>
    </div>
  );
}
