type RiskChartColor = "red" | "yellow" | "green";

interface RiskStatusChartProps {
  color: RiskChartColor;
  title: string;
  score: number;
  description: string;
  path: string;
}

const colorStyles = {
  red: {
    border: "border-red-500/30",
    dot: "bg-red-500",
    text: "text-red-400",
    stroke: "#ef4444",
  },
  yellow: {
    border: "border-yellow-500/30",
    dot: "bg-yellow-500",
    text: "text-yellow-400",
    stroke: "#eab308",
  },
  green: {
    border: "border-emerald-500/30",
    dot: "bg-emerald-500",
    text: "text-emerald-400",
    stroke: "#10b981",
  },
} satisfies Record<
  RiskChartColor,
  {
    border: string;
    dot: string;
    text: string;
    stroke: string;
  }
>;

export default function RiskStatusChart({
  color,
  title,
  score,
  description,
  path,
}: RiskStatusChartProps) {
  const styles = colorStyles[color];

  return (
    <div
      className={`flex w-full flex-col gap-4 rounded-2xl border bg-[#161616]/90 p-5 shadow-2xl backdrop-blur-xl ${styles.border}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${styles.dot}`} />
          <span
            className={`text-sm font-semibold uppercase tracking-wider ${styles.text}`}
          >
            {title}
          </span>
        </div>
        <span className="font-mono text-xs text-gray-400">
          Risk Score: {String(score).padStart(2, "0")}
        </span>
      </div>

      <div className="relative flex h-36 w-full items-center justify-center rounded-xl bg-black/40 p-2">
        <svg
          className="h-full w-full overflow-visible"
          viewBox="0 0 500 150"
          role="img"
          aria-label={`Gráfica de estado ${title}`}
        >
          <path
            d={path}
            fill="none"
            stroke={styles.stroke}
            strokeWidth="2.5"
          />
        </svg>
      </div>

      <p className="text-xs text-gray-400">{description}</p>
    </div>
  );
}
