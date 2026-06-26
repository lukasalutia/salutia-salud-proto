import { ChevronRight, FileText } from "lucide-react";

interface Resultado {
  nombre: string;
  detalle: string;
  fecha: string;
  status: "verde" | "amarillo" | "rojo";
}

const resultadosRich: Resultado[] = [
  { nombre: "Hemograma completo",  detalle: "Todos los valores en rango",       fecha: "hace 3 días",   status: "verde"    },
  { nombre: "Perfil lipídico",     detalle: "LDL levemente elevado · 128 mg/dL", fecha: "hace 1 mes",    status: "amarillo" },
  { nombre: "TSH (tiroides)",      detalle: "Dato de hace 8 meses — actualizá", fecha: "hace 8 meses",  status: "rojo"     },
];

const resultadosPoor: Resultado[] = [
  { nombre: "Hemograma completo", detalle: "Todos los valores normales", fecha: "hace 3 días", status: "verde" },
];

const statusCfg = {
  verde:   { color: "#16a34a", bg: "#f0fdf4", label: "Normal"  },
  amarillo:{ color: "#d97706", bg: "#fffbeb", label: "Vigilar" },
  rojo:    { color: "#dc2626", bg: "#fef2f2", label: "Revisar" },
};

function ResultadoCard({ item }: { item: Resultado }) {
  const cfg = statusCfg[item.status];
  return (
    <div className="flex items-center gap-3 p-3.5 bg-white rounded-xl border border-[#f0f4f8]
                    active:bg-[#f8fafc] transition-colors cursor-pointer">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
           style={{ background: cfg.bg }}>
        <FileText size={16} style={{ color: cfg.color }} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold truncate"
           style={{ color: "#333", fontFamily: "var(--font-inter)" }}>
          {item.nombre}
        </p>
        <p className="text-[11px] mt-0.5 truncate"
           style={{ color: "#888", fontFamily: "var(--font-poppins)" }}>
          {item.detalle}
        </p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full"
             style={{ background: cfg.bg }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.color }} />
          <span className="text-[10px] font-semibold"
                style={{ color: cfg.color, fontFamily: "var(--font-inter)" }}>
            {cfg.label}
          </span>
        </div>
        <ChevronRight size={14} style={{ color: "#d1d5db" }} />
      </div>
    </div>
  );
}

export function ResultadosSection({ isRich }: { isRich: boolean }) {
  const items = isRich ? resultadosRich : resultadosPoor;

  return (
    <div className="mx-4 mt-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[15px] font-bold"
            style={{ color: "#28347c", fontFamily: "var(--font-inter)" }}>
          Últimos resultados
        </h2>
        <button className="flex items-center gap-0.5 text-[12px] font-semibold cursor-pointer"
                style={{ color: "#2b4c9c", fontFamily: "var(--font-inter)" }}>
          Ver todos <ChevronRight size={12} />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {items.map((item, i) => <ResultadoCard key={i} item={item} />)}

        {!isRich && (
          <button
            className="p-3.5 rounded-xl border border-dashed text-[12px] font-semibold
                       text-center active:bg-[#e8f4fb] transition-colors cursor-pointer"
            style={{ borderColor: "#c7d7e8", color: "#2b4c9c", fontFamily: "var(--font-inter)" }}
          >
            + Cargar análisis de sangre
          </button>
        )}
      </div>
    </div>
  );
}
