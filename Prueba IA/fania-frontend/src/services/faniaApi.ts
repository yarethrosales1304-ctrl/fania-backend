import type { ChatResponse, RiskLevel } from "../types/chat";

const API_URL =
  import.meta.env.VITE_FANIA_API_URL ||
  "http://127.0.0.1:8000";

const USE_MOCK =
  import.meta.env.VITE_FANIA_USE_MOCK === "true";

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

interface MockScenario {
  risk_level: RiskLevel;
  risk_score: number;
  summary: string;
  technical_evidence: NonNullable<ChatResponse["technical_evidence"]>;
  suggested_actions: NonNullable<ChatResponse["suggested_actions"]>;
  sources: string[];
}

/*
 * Escenarios de prueba. En modo mock el mensaje del usuario elige la gráfica:
 *   "1" -> alerta crítica (roja)
 *   "2" -> prevención (amarilla)
 *   "3" -> estable (verde)
 * Cualquier otro texto cae en el escenario crítico por defecto.
 */
const MOCK_SCENARIOS: Record<"1" | "2" | "3", MockScenario> = {
  "1": {
    risk_level: "RED",
    risk_score: 90,
    summary:
      "Se identificaron comportamientos fuera del patrón esperado durante las últimas 24 horas.",
    technical_evidence: [
      {
        title: "Actividad anómala",
        description:
          "Se detectó un comportamiento fuera del patrón establecido.",
        value: "Últimas 24 horas",
        severity: "HIGH",
      },
    ],
    suggested_actions: [
      {
        title: "Revisar eventos",
        description:
          "Validar los eventos asociados con la actividad detectada.",
      },
    ],
    sources: ["Security Events", "Behavioral Baseline"],
  },
  "2": {
    risk_level: "YELLOW",
    risk_score: 45,
    summary:
      "Se detectó una anomalía leve y sostenida en puertos de red secundarios. Conviene aplicar medidas de prevención antes de que escale.",
    technical_evidence: [
      {
        title: "Tráfico elevado moderado",
        description:
          "Incremento gradual del tráfico saliente sin llegar a niveles críticos.",
        value: "Últimas 6 horas",
        severity: "MEDIUM",
      },
    ],
    suggested_actions: [
      {
        title: "Reforzar monitorización",
        description:
          "Aumentar la frecuencia de muestreo en los segmentos afectados y revisar reglas de firewall.",
      },
    ],
    sources: ["Security Events", "Network Telemetry"],
  },
  "3": {
    risk_level: "GREEN",
    risk_score: 5,
    summary:
      "El flujo de datos se mantiene dentro de los parámetros normales de operación. No se detectaron amenazas.",
    technical_evidence: [
      {
        title: "Línea base estable",
        description:
          "El tráfico de red se ajusta al comportamiento histórico esperado.",
        value: "Últimas 24 horas",
        severity: "LOW",
      },
    ],
    suggested_actions: [
      {
        title: "Mantener supervisión rutinaria",
        description:
          "No se requiere acción. Continuar con la monitorización periódica habitual.",
      },
    ],
    sources: ["Behavioral Baseline", "Network Telemetry"],
  },
};

function pickMockScenario(message: string): MockScenario {
  const text = message.trim().toLowerCase();

  // 1) Exacto: el mensaje es solo el número (opcionalmente con un punto).
  const exact = text.match(/^([123])\.?$/);
  if (exact) {
    return MOCK_SCENARIOS[exact[1] as "1" | "2" | "3"];
  }

  // 2) Por palabra clave, para pruebas con frases naturales.
  if (/(previen|prevenc|amaril|advertenc|sospech)/.test(text)) {
    return MOCK_SCENARIOS["2"];
  }
  if (/(estable|verde|correcto|seguro|sin amenaza|normal)/.test(text)) {
    return MOCK_SCENARIOS["3"];
  }

  // 3) Por defecto: alerta crítica.
  return MOCK_SCENARIOS["1"];
}

function getMockResponse(
  message: string
): ChatResponse {

  const scenario = pickMockScenario(message);

  return {
    role: "assistant",
    assistant: "FanIA",

    message:
      `He analizado tu consulta:\n\n` +
      `"${message}"\n\n` +
      scenario.summary,

    risk_level: scenario.risk_level,

    risk_score: scenario.risk_score,

    conversation_id: "MOCK-CONV-001",

    technical_evidence: scenario.technical_evidence,

    suggested_actions: scenario.suggested_actions,

    sources: scenario.sources,
  };
}

export async function sendMessage(
  message: string
): Promise<ChatResponse> {

  if (USE_MOCK) {
    await wait(1500);

    return getMockResponse(message);
  }

  const response = await fetch(
    `${API_URL}/chat`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        message,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "No fue posible comunicarse con FanIA"
    );
  }

  return response.json();
}