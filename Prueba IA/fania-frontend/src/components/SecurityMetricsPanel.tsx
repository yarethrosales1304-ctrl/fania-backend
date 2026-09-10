import RiskStatusChart from "./RiskStatusChart";

const metrics = [
  {
    color: "red" as const,
    title: "Alerta crítica",
    score: 90,
    description:
      "Se detectó un comportamiento fuera del patrón establecido (Posible exfiltración).",
    path: "M 0 120 Q 120 110, 200 90 T 350 30 T 500 100",
  },
  {
    color: "yellow" as const,
    title: "Sospecha",
    score: 45,
    description:
      "Anomalía leve en puertos de red secundarios. Requiere supervisión.",
    path: "M 0 100 Q 150 120, 250 80 T 400 90 T 500 70",
  },
  {
    color: "green" as const,
    title: "Estable",
    score: 5,
    description:
      "Flujo de datos dentro de los parámetros normales de operación corporativa.",
    path: "M 0 110 Q 100 105, 250 115 T 400 110 T 500 108",
  },
];

export default function SecurityMetricsPanel() {
  return (
    <div className="my-4 flex w-full max-w-2xl flex-col gap-6">
      {metrics.map((metric) => (
        <RiskStatusChart key={metric.color} {...metric} />
      ))}
    </div>
  );
}
