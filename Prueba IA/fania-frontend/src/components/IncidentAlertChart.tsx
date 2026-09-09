import {
  Area,
  AreaChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TriangleAlert } from "lucide-react";

const data = [
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

export default function SecurityAlertWidget() {
  return (
    <div className="mx-auto mb-6 mt-4 flex w-full max-w-2xl flex-col items-center bg-transparent">
      <div className="relative z-10 mb-10 flex items-center gap-4 rounded-xl border border-red-500/60 bg-[#161616] px-6 py-3 shadow-[0_0_35px_rgba(239,68,68,0.55)] backdrop-blur-md">
        <TriangleAlert className="h-7 w-7 text-red-500" strokeWidth={2} />
        <div className="flex flex-col">
          <span className="text-[15px] font-bold uppercase leading-tight tracking-wide text-white">
            ¡Alerta Crítica de Seguridad!
          </span>
          <span className="text-[13px] text-gray-300">
            Posible Exfiltración de Datos Detectada
          </span>
        </div>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 25 }}>
            <defs>
              <linearGradient id="glowRed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.7} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
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
              domain={[0, 20]}
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
              itemStyle={{ color: "#ef4444" }}
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
              stroke="#ef4444"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#glowRed)"
              dot={false}
              activeDot={{ r: 4, fill: "#ef4444" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
