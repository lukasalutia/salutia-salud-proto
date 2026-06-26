import { Home, Heart, Plus, BookOpen, User } from "lucide-react";

export function BottomNav() {
  return (
    <div
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[393px]
                 bg-white border-t border-[#f0f4f8]"
      style={{ boxShadow: "0 -4px 20px rgba(40,52,124,0.06)" }}
    >
      <div className="flex items-center justify-around px-4 pt-2 pb-5">

        {/* Inicio */}
        <button className="flex flex-col items-center gap-1 min-w-[48px] cursor-pointer">
          <Home size={22} style={{ color: "#c7d5e0" }} />
          <span className="text-[10px]" style={{ color: "#c7d5e0", fontFamily: "var(--font-poppins)" }}>
            Inicio
          </span>
        </button>

        {/* Salud — ACTIVE */}
        <button className="flex flex-col items-center gap-1 min-w-[48px] cursor-pointer">
          <Heart size={22} style={{ color: "#2b4c9c" }} />
          <span
            className="text-[10px] font-semibold"
            style={{ color: "#2b4c9c", fontFamily: "var(--font-poppins)" }}
          >
            Salud
          </span>
          {/* Active indicator */}
          <div className="w-4 h-0.5 rounded-full -mt-0.5" style={{ background: "#2b4c9c" }} />
        </button>

        {/* CTA + */}
        <button
          className="flex items-center justify-center w-12 h-12 rounded-full -mt-5 shadow-lg
                     active:scale-95 transition-transform cursor-pointer"
          style={{ background: "linear-gradient(135deg, #2b4c9c 0%, #28347c 100%)" }}
        >
          <Plus size={22} strokeWidth={2.5} style={{ color: "white" }} />
        </button>

        {/* Historial */}
        <button className="flex flex-col items-center gap-1 min-w-[48px] cursor-pointer">
          <BookOpen size={22} style={{ color: "#c7d5e0" }} />
          <span className="text-[10px]" style={{ color: "#c7d5e0", fontFamily: "var(--font-poppins)" }}>
            Historial
          </span>
        </button>

        {/* Perfil */}
        <button className="flex flex-col items-center gap-1 min-w-[48px] cursor-pointer">
          <User size={22} style={{ color: "#c7d5e0" }} />
          <span className="text-[10px]" style={{ color: "#c7d5e0", fontFamily: "var(--font-poppins)" }}>
            Perfil
          </span>
        </button>

      </div>
    </div>
  );
}
