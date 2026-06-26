import { ChevronRight } from "lucide-react";

interface Med {
  nombre: string;
  dosis: string;
  horarios: string[];
  nota?: string;
  accent: string;
}

const medsRich: Med[] = [
  { nombre: "Enalapril",   dosis: "10 mg",  horarios: ["8:00", "20:00"],  nota: "Con agua",        accent: "#7c3aed" },
  { nombre: "Aspirina",    dosis: "100 mg", horarios: ["8:00"],            nota: "Con el desayuno", accent: "#2b4c9c" },
  { nombre: "Metformina",  dosis: "500 mg", horarios: ["8:00", "20:00"],  nota: "Con comidas",     accent: "#0891b2" },
];

const medsPoor: Med[] = [
  { nombre: "Enalapril",  dosis: "10 mg", horarios: ["8:00", "20:00"], accent: "#7c3aed" },
];

export function MedicacionSection({ isRich }: { isRich: boolean }) {
  const items = isRich ? medsRich : medsPoor;

  return (
    <div className="mx-4 mt-4 mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[15px] font-bold"
            style={{ color: "#28347c", fontFamily: "var(--font-inter)" }}>
          Medicación activa
        </h2>
        <button className="flex items-center gap-0.5 text-[12px] font-semibold cursor-pointer"
                style={{ color: "#2b4c9c", fontFamily: "var(--font-inter)" }}>
          Ver todo <ChevronRight size={12} />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {items.map((med, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-[#f0f4f8] p-3.5 flex items-center gap-3
                       active:bg-[#f8fafc] transition-colors cursor-pointer"
          >
            {/* Color pill indicator */}
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${med.accent}18` }}
            >
              <div className="w-3 h-3 rounded-full" style={{ background: med.accent }} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-1.5">
                <p className="text-[13px] font-semibold"
                   style={{ color: "#333", fontFamily: "var(--font-inter)" }}>
                  {med.nombre}
                </p>
                <span className="text-[11px]"
                      style={{ color: "#aaa", fontFamily: "var(--font-poppins)" }}>
                  {med.dosis}
                </span>
              </div>

              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                {med.horarios.map((h, j) => (
                  <span
                    key={j}
                    className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                    style={{ background: "#e8f4fb", color: "#2b4c9c", fontFamily: "var(--font-inter)" }}
                  >
                    {h}
                  </span>
                ))}
                {med.nota && (
                  <span className="text-[11px]"
                        style={{ color: "#bbb", fontFamily: "var(--font-poppins)" }}>
                    · {med.nota}
                  </span>
                )}
              </div>
            </div>

            <ChevronRight size={14} style={{ color: "#d1d5db" }} className="flex-shrink-0" />
          </div>
        ))}

        <button
          className="p-3.5 rounded-xl border border-dashed text-[12px] font-semibold
                     text-center active:bg-[#e8f4fb] transition-colors cursor-pointer"
          style={{ borderColor: "#c7d7e8", color: "#2b4c9c", fontFamily: "var(--font-inter)" }}
        >
          + Agregar medicamento
        </button>
      </div>
    </div>
  );
}
