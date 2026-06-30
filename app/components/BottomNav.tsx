import { Home, Activity, Plus, FileText, User } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { key: "home", label: "Inicio", icon: Home, active: false },
  { key: "health", label: "Salud", icon: Activity, active: true },
  { key: "upload", label: "", icon: Plus, active: false },
  { key: "history", label: "Historial", icon: FileText, active: false },
  { key: "profile", label: "Perfil", icon: User, active: false },
];

export function BottomNav() {
  return (
    <nav
      aria-label="Navegación principal"
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[393px] z-40 px-4 pb-4 pt-2"
    >
      <div className="relative flex h-16 items-center justify-around rounded-3xl bg-white shadow-[0_-4px_24px_rgba(40,52,124,0.08)] ring-1 ring-black/[0.04]">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          if (tab.key === "upload") {
            return (
              <button
                key={tab.key}
                className="-mt-8 flex h-14 w-14 items-center justify-center rounded-full
                           bg-brand-orange text-white shadow-lg shadow-brand-orange/40
                           active:scale-95 transition-transform cursor-pointer"
              >
                <Plus className="h-6 w-6" strokeWidth={2.5} />
              </button>
            );
          }
          return (
            <button
              key={tab.key}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium cursor-pointer",
                tab.active ? "text-brand-blue" : "text-brand-navy/40",
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={tab.active ? 2.4 : 1.8} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
