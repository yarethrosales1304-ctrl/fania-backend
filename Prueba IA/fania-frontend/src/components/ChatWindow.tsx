import brainLogo from "../assets/brain.jpg";
import type {
  ChatMessageData,
} from "../types/chat";

import ChatMessage from "./ChatMessage";

interface ChatWindowProps {
  messages: ChatMessageData[];
  loading: boolean;
}

export default function ChatWindow({
  messages,
  loading,
}: ChatWindowProps) {

  if (messages.length === 0) {

    return (
      <div className="chat-window flex flex-1 items-center justify-center px-6 pb-32">

        <div className="max-w-2xl text-center">

          <div
            className="badge appear appear--pop mx-auto mb-6"
            style={{ "--d": "0.1s" } as React.CSSProperties}
          >
            <svg width="14" height="16" viewBox="0 0 24 24" fill="white" style={{ filter: "drop-shadow(0 0 3px rgba(255,255,255,0.45))" }}>
              <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z" />
            </svg>
            Asistente de Ciberseguridad
          </div>

          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-zinc-100">
            <span
              className="headline-line appear appear--mask"
              style={{ "--d": "0.24s" } as React.CSSProperties}
            >
              ¿En qué puedo <span className="font-serif-accent">ayudarte</span>
            </span>
            <span
              className="headline-line appear appear--mask"
              style={{ "--d": "0.38s" } as React.CSSProperties}
            >
              hoy?
            </span>
          </h2>

          <p
            className="appear appear--soft mt-3 text-sm leading-6 text-zinc-500"
            style={{ "--d": "0.5s" } as React.CSSProperties}
          >
            Soy FanIA, tu asistente inteligente de
            ciberseguridad empresarial.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="chat-window flex flex-col gap-6 px-4 md:px-8 flex-1 overflow-y-auto w-full max-w-5xl mx-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_100%)] [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_100%)] relative z-10">

      {/* Spacer invisible para evitar la máscara superior */}
      <div className="h-24 w-full shrink-0"></div>

      {messages.map(
        (message) => (
          <ChatMessage
            key={message.id}
            message={message}
          />
        )
      )}

      {loading && (

        <div className="flex justify-start gap-4 items-start">

          <img
            src={brainLogo}
            alt="FanIA"
            className="mt-0.5 h-10 w-10 shrink-0 object-contain mix-blend-screen"
          />

          <div className="max-w-[75%] rounded-2xl rounded-tl-sm border border-white/5 bg-black/40 px-5 py-4 text-sm leading-relaxed text-gray-200 backdrop-blur-md">

            <div className="mb-2 font-serif text-lg italic text-white">
                FanIA
            </div>

            <div className="text-gray-400">
                ● ● ● &nbsp; FanIA está analizando...
            </div>

          </div>

        </div>

      )}

      {/* Spacer invisible inferior para liberar la barra flotante */}
      <div className="h-40 w-full shrink-0 pointer-events-none"></div>

    </div>
  );
}
