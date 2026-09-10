import { useState } from "react";
import { PanelLeft } from "lucide-react";

import brainLogo from "./assets/brain.jpg";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";

import { sendMessage } from "./services/faniaApi";

import type {
  ChatMessageData,
} from "./types/chat";

export default function App() {

  const [messages, setMessages] =
    useState<ChatMessageData[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [conversations, setConversations] =
    useState<string[]>([]);

  const [isSidebarOpen, setIsSidebarOpen] =
    useState(true);

  async function handleSend(
    message: string
  ) {

    const userMessage: ChatMessageData = {
      id: crypto.randomUUID(),
      role: "user",
      message,
      timestamp: new Date(),
    };

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    if (messages.length === 0) {

      setConversations((current) => [
        message.slice(0, 35),
        ...current,
      ]);

    }

    setLoading(true);

    try {

      const response =
        await sendMessage(message);

      const assistantMessage:
        ChatMessageData = {

        id: crypto.randomUUID(),

        role: "assistant",

        message: response.message,

        response,

        timestamp: new Date(),
      };

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);

    } catch (error) {

      console.error(error);

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),

          role: "assistant",

          message:
            "No pude comunicarme con el servicio de FanIA.",

          timestamp: new Date(),
        },
      ]);

    } finally {

      setLoading(false);

    }
  }

  function handleNewChat() {
    setMessages([]);
  }

  return (
    <div className="app-shell flex h-screen w-full bg-[#0a0a0a] text-white overflow-hidden relative">

      {/* Overlay oscuro móvil */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-md z-[90]"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        onNewChat={handleNewChat}
        onClose={() => setIsSidebarOpen(false)}
        conversations={conversations}
        isOpen={isSidebarOpen}
      />

      <div className="flex-1 relative flex flex-col h-full min-w-0">

        <button
          type="button"
          onClick={() => setIsSidebarOpen((current) => !current)}
          className="absolute left-6 top-6 z-50 hidden rounded-xl border border-white/5 bg-black/20 p-2 text-gray-400 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white md:flex"
          title="Alternar panel lateral"
          aria-label="Alternar panel lateral"
        >
          <PanelLeft className="h-5 w-5" strokeWidth={1.5} />
        </button>

        <div className="relative z-40 flex w-full items-center justify-between border-b border-white/10 bg-[#111111] px-4 py-3 md:hidden">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSidebarOpen((current) => !current)}
              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              title="Alternar panel lateral"
              aria-label="Alternar panel lateral"
            >
              <PanelLeft className="h-6 w-6" strokeWidth={1.5} />
            </button>

            <div className="flex items-center gap-2">
              <img
                src={brainLogo}
                alt="FanIA"
                className="h-7 w-7 object-contain mix-blend-screen"
              />
              <span className="text-lg font-semibold tracking-wide text-white">
                FanIA
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleNewChat}
            className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
          >
            Nuevo chat
          </button>
        </div>

        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center w-full px-6 z-10">
            <div className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full flex items-center gap-2 mb-20 backdrop-blur-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-200">
                Asistente de Ciberseguridad
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white text-center tracking-tight">
              ¿En qué puedo ayudarte <br /> hoy?
            </h1>
          </div>
        ) : (
          <ChatWindow
            messages={messages}
            loading={loading}
          />
        )}

        <ChatInput
          onSend={handleSend}
          disabled={loading}
        />

      </div>

      <div className="hero-video" aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div className="hero-video-fade" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

    </div>
  );
}