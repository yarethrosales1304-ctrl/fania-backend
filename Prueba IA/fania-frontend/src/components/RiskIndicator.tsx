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

  const config = {

    GREEN: {
      label: "Todo en orden",
      className:
        "border-emerald-500/25 bg-gradient-to-r from-emerald-500/15 to-emerald-500/5 text-emerald-300",
      dot: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]",
    },

    YELLOW: {
      label: "Alerta preventiva",
      className:
        "border-yellow-500/25 bg-gradient-to-r from-yellow-500/15 to-yellow-500/5 text-yellow-300",
      dot: "bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.7)]",
    },

    RED: {
      label: "Alerta crítica",
      className:
        "border-red-500/25 bg-gradient-to-r from-red-500/15 to-red-500/5 text-red-300",
      dot: "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.7)]",
    },

  };

  const current =
    config[riskLevel];

  return (
    <div
      className={`mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium tracking-[-0.01em] ${current.className}`}
    >

      <span
        className={`h-2 w-2 rounded-full ${current.dot}`}
      />

      {current.label}

    </div>
  );
}