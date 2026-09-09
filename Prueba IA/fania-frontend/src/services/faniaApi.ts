import type { ChatResponse } from "../types/chat";

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

function getMockResponse(
  message: string
): ChatResponse {

  return {
    role: "assistant",
    assistant: "FanIA",

    message:
      `He analizado tu consulta:\n\n` +
      `"${message}"\n\n` +
      `Se identificaron comportamientos fuera del patrón esperado durante las últimas 24 horas.`,

    risk_level: "RED",

    risk_score: 90,

    conversation_id: "MOCK-CONV-001",

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

    sources: [
      "Security Events",
      "Behavioral Baseline",
    ],
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