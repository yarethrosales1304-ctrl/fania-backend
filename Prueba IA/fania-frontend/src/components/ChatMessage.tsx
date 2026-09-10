import brainLogo from "../assets/brain.jpg";
import type { ChatMessageData } from "../types/chat";
import IncidentAlertChart from "./IncidentAlertChart";
import RiskIndicator from "./RiskIndicator";
import TechnicalDetails from "./TechnicalDetails";

interface ChatMessageProps {
  message: ChatMessageData;
}

export default function ChatMessage({
  message,
}: ChatMessageProps) {
  const isUser = message.role === "user";

  // Mensaje del usuario
  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-white/10 px-5 py-3 text-sm font-medium leading-relaxed text-white">
          {message.message}
        </div>
      </div>
    );
  }

  // Mensaje de FanIA
  return (
    <div className="flex items-start justify-start gap-4">

      {/* Avatar Custom IA con Mix Blend (Mensajes) */}
      <img
        src={brainLogo}
        alt="FanIA"
        className="mt-0.5 h-10 w-10 shrink-0 object-contain mix-blend-screen"
      />

      <div className="flex w-full max-w-3xl flex-col bg-transparent px-2 py-4 text-sm leading-relaxed text-gray-200">

        <div className="mb-2 font-serif text-lg italic text-white">
          FanIA
        </div>

        <div className="whitespace-pre-wrap">
          {message.message}
        </div>

        {message.response && (
          <>
            {message.response.risk_level && (
              <div className="mt-4">
                <IncidentAlertChart
                  level={message.response.risk_level}
                />
              </div>
            )}

            <RiskIndicator
              riskLevel={message.response.risk_level}
            />

            <TechnicalDetails
              response={message.response}
            />
          </>
        )}
      </div>
    </div>
  );
}