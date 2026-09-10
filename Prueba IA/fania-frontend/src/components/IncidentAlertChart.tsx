import {
  Area,
  AreaChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ShieldCheck, TriangleAlert } from "lucide-react";

import type { RiskLevel } from "../types/chat";

type Scenario = "RED" | "YELLOW" | "GREEN";

interface ChartRow {
  time: string;
  anomalo: number;
  n1: number;
  n2: number;
  n3: number;
  n4: number;
}

interface ScenarioConfig {
  /** Color principal de la curva y el relleno */
  accent: string;
  gradientId: string;
  /** Tope del eje Y para que la forma se lea bien en cada escenario */
  yMax: number;
  card: {
    icon: typeof TriangleAlert;
    title: string;
    subtitle: string;
    border: string;
    shadow: string;
    iconColor: string;
  };
  data: ChartRow[];
}

/* Escenario 1 — ALERTA CRÍTICA (rojo): pico de exfiltración muy marcado. */
const RED_DATA: ChartRow[] = [
  { time: "", anomalo: 2.0, n1: 0.5, n2: 1.0, n3: 0.2, n4: 0.8 },
  { time: "", anomalo: 2.4, n1: 0.7, n2: 0.8, n3: 0.4, n4: 0.9 },
  { time: "", anomalo: 1.8, n1: 0.3, n2: 0.6, n3: 0.2, n4: 0.5 },
  { time: "", anomalo: 2.9, n1: 0.8, n2: 0.4, n3: 0.5, n4: 0.8 },
  { time: "", anomalo: 2.1, n1: 0.4, n2: 0.7, n3: 0.3, n4: 0.6 },
  { time: "15", anomalo: 2.8, n1: 0.9, n2: 0.5, n3: 0.4, n4: 0.7 },
  { time: "", anomalo: 3.4, n1: 0.6, n2: 0.9, n3: 0.5, n4: 0.6 },
  { time: "", anomalo: 2.5, n1: 0.4, n2: 0.7, n3: 0.2, n4: 0.4 },
  { time: "", anomalo: 4.5, n1: 1.0, n2: 1.2, n3: 0.8, n4: 1.1 },
  { time: "", anomalo: 19.0, n1: 3.2, n2: 2.5, n3: 1.8, n4: 2.0 },
  { time: "", anomalo: 15.5, n1: 2.5, n2: 1.8, n3: 1.2, n4: 1.5 },
  { time: "14:32", anomalo: 20.0, n1: 3.8, n2: 2.9, n3: 1.9, n4: 2.4 },
  { time: "", anomalo: 6.0, n1: 1.5, n2: 1.0, n3: 0.7, n4: 1.2 },
  { time: "", anomalo: 3.5, n1: 0.8, n2: 0.6, n3: 0.4, n4: 0.8 },
  { time: "", anomalo: 4.2, n1: 0.9, n2: 0.5, n3: 0.3, n4: 0.7 },
  { time: "", anomalo: 2.8, n1: 0.5, n2: 0.8, n3: 0.2, n4: 0.5 },
  { time: "", anomalo: 3.6, n1: 0.7, n2: 0.4, n3: 0.5, n4: 0.9 },
  { time: "", anomalo: 3.0, n1: 0.4, n2: 0.7, n3: 0.3, n4: 0.6 },
];

/* Escenario 2 — PREVENCIÓN (amarillo): elevación moderada y sostenida,
   sin pico crítico. Algo a vigilar antes de que escale. */
const YELLOW_DATA: ChartRow[] = [
  { time: "", anomalo: 2.0, n1: 0.6, n2: 0.9, n3: 0.4, n4: 0.7 },
  { time: "", anomalo: 2.4, n1: 0.7, n2: 0.8, n3: 0.5, n4: 0.9 },
  { time: "", anomalo: 2.2, n1: 0.5, n2: 0.7, n3: 0.3, n4: 0.6 },
  { time: "", anomalo: 2.9, n1: 0.9, n2: 0.6, n3: 0.6, n4: 0.9 },
  { time: "", anomalo: 3.3, n1: 0.7, n2: 0.8, n3: 0.5, n4: 0.8 },
  { time: "15", anomalo: 3.8, n1: 1.0, n2: 0.7, n3: 0.6, n4: 0.9 },
  { time: "", anomalo: 4.6, n1: 1.1, n2: 1.0, n3: 0.7, n4: 1.0 },
  { time: "", anomalo: 5.4, n1: 1.3, n2: 1.1, n3: 0.8, n4: 1.1 },
  { time: "", anomalo: 6.8, n1: 1.6, n2: 1.4, n3: 1.0, n4: 1.3 },
  { time: "", anomalo: 8.2, n1: 1.9, n2: 1.6, n3: 1.2, n4: 1.5 },
  { time: "", anomalo: 8.9, n1: 2.0, n2: 1.7, n3: 1.3, n4: 1.6 },
  { time: "16:05", anomalo: 9.3, n1: 2.1, n2: 1.8, n3: 1.4, n4: 1.7 },
  { time: "", anomalo: 8.1, n1: 1.8, n2: 1.5, n3: 1.1, n4: 1.4 },
  { time: "", anomalo: 6.9, n1: 1.5, n2: 1.3, n3: 0.9, n4: 1.2 },
  { time: "", anomalo: 5.7, n1: 1.3, n2: 1.1, n3: 0.8, n4: 1.0 },
  { time: "", anomalo: 4.8, n1: 1.1, n2: 0.9, n3: 0.6, n4: 0.9 },
  { time: "", anomalo: 4.2, n1: 0.9, n2: 0.8, n3: 0.5, n4: 0.8 },
  { time: "", anomalo: 3.8, n1: 0.8, n2: 0.7, n3: 0.5, n4: 0.7 },
];

/* Escenario 3 — ESTABLE (verde): tráfico plano dentro de la línea base,
   sin anomalías. */
const GREEN_DATA: ChartRow[] = [
  { time: "", anomalo: 1.4, n1: 0.5, n2: 0.7, n3: 0.3, n4: 0.6 },
  { time: "", anomalo: 1.6, n1: 0.6, n2: 0.6, n3: 0.4, n4: 0.7 },
  { time: "", anomalo: 1.3, n1: 0.4, n2: 0.5, n3: 0.3, n4: 0.5 },
  { time: "", anomalo: 1.7, n1: 0.6, n2: 0.7, n3: 0.4, n4: 0.6 },
  { time: "", anomalo: 1.5, n1: 0.5, n2: 0.6, n3: 0.3, n4: 0.6 },
  { time: "15", anomalo: 1.9, n1: 0.7, n2: 0.6, n3: 0.4, n4: 0.7 },
  { time: "", anomalo: 1.6, n1: 0.5, n2: 0.7, n3: 0.3, n4: 0.5 },
  { time: "", anomalo: 2.0, n1: 0.7, n2: 0.6, n3: 0.4, n4: 0.7 },
  { time: "", anomalo: 1.7, n1: 0.6, n2: 0.7, n3: 0.4, n4: 0.6 },
  { time: "", anomalo: 2.1, n1: 0.8, n2: 0.7, n3: 0.5, n4: 0.7 },
  { time: "", anomalo: 1.9, n1: 0.6, n2: 0.6, n3: 0.4, n4: 0.6 },
  { time: "14:32", anomalo: 2.3, n1: 0.8, n2: 0.7, n3: 0.5, n4: 0.8 },
  { time: "", anomalo: 2.0, n1: 0.7, n2: 0.6, n3: 0.4, n4: 0.7 },
  { time: "", anomalo: 1.8, n1: 0.6, n2: 0.6, n3: 0.4, n4: 0.6 },
  { time: "", anomalo: 2.0, n1: 0.7, n2: 0.5, n3: 0.3, n4: 0.6 },
  { time: "", anomalo: 1.7, n1: 0.5, n2: 0.7, n3: 0.4, n4: 0.5 },
  { time: "", anomalo: 1.9, n1: 0.6, n2: 0.5, n3: 0.4, n4: 0.7 },
  { time: "", anomalo: 1.8, n1: 0.5, n2: 0.6, n3: 0.3, n4: 0.6 },
];

const SCENARIOS: Record<Scenario, ScenarioConfig> = {
  RED: {
    accent: "#ef4444",
    gradientId: "riskGlowRed",
    yMax: 20,
    card: {
      icon: TriangleAlert,
      title: "¡Alerta Crítica de Seguridad!",
      subtitle: "Posible Exfiltración de Datos Detectada",
      border: "border-red-500/60",
      shadow: "shadow-[0_0_35px_rgba(239,68,68,0.55)]",
      iconColor: "text-red-500",
    },
    data: RED_DATA,
  },
  YELLOW: {
    accent: "#f59e0b",
    gradientId: "riskGlowAmber",
    yMax: 12,
    card: {
      icon: TriangleAlert,
      title: "Advertencia de Seguridad",
      subtitle: "Comportamiento Sospechoso — Requiere Prevención",
      border: "border-amber-500/60",
      shadow: "shadow-[0_0_35px_rgba(245,158,11,0.45)]",
      iconColor: "text-amber-400",
    },
    data: YELLOW_DATA,
  },
  GREEN: {
    accent: "#10b981",
    gradientId: "riskGlowEmerald",
    yMax: 6,
    card: {
      icon: ShieldCheck,
      title: "Sistema Estable y Seguro",
      subtitle: "Sin Amenazas Detectadas",
      border: "border-emerald-500/50",
      shadow: "shadow-[0_0_35px_rgba(16,185,129,0.4)]",
      iconColor: "text-emerald-400",
    },
    data: GREEN_DATA,
  },
};

interface IncidentAlertChartProps {
  /** Escenario a representar. Por defecto "RED" (alerta crítica). */
  level?: RiskLevel;
}

export default function IncidentAlertChart({
  level = "RED",
}: IncidentAlertChartProps) {
  const scenario: Scenario =
    level === "YELLOW" || level === "GREEN" ? level : "RED";
  const config = SCENARIOS[scenario];
  const CardIcon = config.card.icon;

  return (
    <div className="mx-auto mb-6 mt-4 flex w-full max-w-2xl flex-col items-center bg-transparent">
      <div
        className={`relative z-10 mb-10 flex items-center gap-4 rounded-xl border bg-[#161616] px-6 py-3 backdrop-blur-md ${config.card.border} ${config.card.shadow}`}
      >
        <CardIcon
          className={`h-7 w-7 ${config.card.iconColor}`}
          strokeWidth={2}
        />
        <div className="flex flex-col">
          <span className="text-[15px] font-bold uppercase leading-tight tracking-wide text-white">
            {config.card.title}
          </span>
          <span className="text-[13px] text-gray-300">
            {config.card.subtitle}
          </span>
        </div>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={config.data}
            margin={{ top: 10, right: 10, left: 0, bottom: 25 }}
          >
            <defs>
              <linearGradient
                id={config.gradientId}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={config.accent}
                  stopOpacity={0.7}
                />
                <stop
                  offset="100%"
                  stopColor={config.accent}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="time"
              stroke="#ffffff"
              strokeWidth={1}
              tick={{ fill: "#d1d5db", fontSize: 11 }}
              axisLine
              tickLine
              label={{
                value: "Tiempo (Últimas 24h)",
                position: "bottom",
                fill: "#ffffff",
                fontSize: 13,
                dy: 10,
              }}
            />
            <YAxis
              domain={[0, config.yMax]}
              stroke="#ffffff"
              strokeWidth={1}
              tick={{ fill: "#d1d5db", fontSize: 11 }}
              axisLine
              tickLine
              label={{
                value: "Tráfico de Red (GB/s)",
                angle: -90,
                position: "insideLeft",
                fill: "#ffffff",
                fontSize: 13,
                dy: 50,
                dx: -15,
              }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                borderColor: "#333",
              }}
              itemStyle={{ color: config.accent }}
            />

            <Line
              type="monotone"
              dataKey="n1"
              stroke="#ffffff"
              strokeOpacity={0.4}
              strokeWidth={1.5}
              dot={false}
              activeDot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="n2"
              stroke="#ffffff"
              strokeOpacity={0.2}
              strokeWidth={1}
              dot={false}
              activeDot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="n3"
              stroke="#a3a3a3"
              strokeOpacity={0.3}
              strokeWidth={1}
              dot={false}
              activeDot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="n4"
              stroke="#d1d5db"
              strokeOpacity={0.15}
              strokeWidth={1}
              dot={false}
              activeDot={false}
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="anomalo"
              stroke={config.accent}
              strokeWidth={2.5}
              fillOpacity={1}
              fill={`url(#${config.gradientId})`}
              dot={false}
              activeDot={{ r: 4, fill: config.accent }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
