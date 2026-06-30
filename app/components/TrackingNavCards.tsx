import { Pill, Syringe, ChevronRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavCardProps {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
}

function NavCard({ icon: Icon, iconBg, iconColor, title, subtitle }: NavCardProps) {
  return (
    <button
      className="text-left flex flex-col gap-3 rounded-2xl bg-white p-4
                 shadow-[0_1px_4px_rgba(0,0,0,0.04),0_4px_16px_rgba(43,76,156,0.07)]
                 ring-1 ring-brand-navy/[0.05]
                 active:scale-[0.98] transition-transform cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl", iconBg, iconColor)}>
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </span>
        <ChevronRight className="h-4 w-4 text-brand-navy/25" />
      </div>
      <div>
        <p className="font-heading text-[14px] font-bold text-brand-navy leading-tight">{title}</p>
        <p className="text-[11px] text-brand-navy/45 mt-1 leading-snug">{subtitle}</p>
      </div>
    </button>
  );
}

export function TrackingNavCards() {
  return (
    <div>
      <h2 className="font-heading text-[13px] font-bold uppercase tracking-wide text-brand-navy/40 px-1 mb-3">
        Seguimiento de tu bienestar
      </h2>
      <div className="grid grid-cols-2 gap-3">
        <NavCard
          icon={Pill}
          iconBg="bg-brand-orange/10"
          iconColor="text-brand-orange"
          title="Plan de medicación"
          subtitle="Tu agenda y progreso de tratamientos"
        />
        <NavCard
          icon={Syringe}
          iconBg="bg-brand-surface"
          iconColor="text-brand-blue"
          title="Vacunas"
          subtitle="Cuáles te faltan por aplicar"
        />
      </div>
    </div>
  );
}
