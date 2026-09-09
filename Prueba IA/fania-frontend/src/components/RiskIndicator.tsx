import type {
  RiskLevel,
} from "../types/chat";

interface RiskIndicatorProps {
  riskLevel: RiskLevel;
}

export default function RiskIndicator({
  riskLevel,
}: RiskIndicatorProps) {

  if (!riskLevel) {
    return null;
  }

  if (riskLevel === "YELLOW") {
    return (
      <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-2 rounded-xl flex items-center gap-3 w-max mx-auto mb-4 relative z-10 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-amber-400 shrink-0"
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <div className="flex flex-col">
          <span className="font-bold text-xs md:text-sm tracking-wide">
            ¡ADVERTENCIA DE SEGURIDAD!
          </span>
          <span className="text-[11px] md:text-xs text-amber-400/80">
            Comportamiento Sospechoso Detectado
          </span>
        </div>
      </div>
    );
  }

  if (riskLevel === "GREEN") {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-xl flex items-center gap-3 w-max mx-auto mb-4 relative z-10 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-emerald-400 shrink-0"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <div className="flex flex-col">
          <span className="font-bold text-xs md:text-sm tracking-wide">
            SISTEMA ESTABLE Y SEGURO
          </span>
          <span className="text-[11px] md:text-xs text-emerald-400/80">
            Sin Amenazas Detectadas
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-red-500/25 bg-gradient-to-r from-red-500/15 to-red-500/5 px-3 py-1.5 text-xs font-medium tracking-[-0.01em] text-red-300">
      <span className="h-2 w-2 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.7)]" />
      Alerta crítica
    </div>
  );
}