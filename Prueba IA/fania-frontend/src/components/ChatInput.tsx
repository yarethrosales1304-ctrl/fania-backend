import React, { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import {
  ChevronDown,
  Check,
  FileText,
  Image as ImageIcon,
  Paperclip,
  X,
} from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({
  onSend,
  disabled = false,
}: ChatInputProps) {

  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showLevelMenu, setShowLevelMenu] = useState(false);
  const [responseLevel, setResponseLevel] = useState("Detallada");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setShowAttachMenu(false);
    }
    event.target.value = "";
  };

  // Enviar mensaje
  function handleSubmit() {
    const text = message.trim();

    // No enviar mensajes vacíos
    if (!text || disabled) {
      return;
    }

    onSend(text);

    setMessage("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  // Detectar Enter y Shift + Enter
  function handleKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>
  ) {

    // Enter = enviar
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      handleSubmit();
    }

    // Shift + Enter = salto de línea
  }

  return (
    <div className="absolute bottom-12 left-0 z-50 flex w-full justify-center px-4 md:px-8 pointer-events-none">
      <div className="pointer-events-auto flex w-full max-w-3xl items-end gap-2 rounded-2xl border border-white/10 bg-[#1a1a1a]/80 p-2 shadow-xl backdrop-blur-md transition-all focus-within:border-white/20">
        {/* Contenedor del Menú de Adjuntos (Lado Izquierdo) */}
        <div className="relative mb-0.5 ml-1 flex shrink-0 items-center">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={imageInputRef}
            onChange={handleFileSelect}
          />
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt,.csv"
            className="hidden"
            ref={docInputRef}
            onChange={handleFileSelect}
          />

          {showAttachMenu && (
            <div className="animate-in fade-in slide-in-from-bottom-2 absolute bottom-12 left-0 z-50 flex w-40 flex-col rounded-xl border border-purple-500/20 bg-[#161616]/95 p-1.5 shadow-[0_0_20px_rgba(139,92,246,0.1)] backdrop-blur-xl duration-200">
              <button
                type="button"
                onClick={() => {
                  imageInputRef.current?.click();
                  setShowAttachMenu(false);
                }}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-purple-500/15 hover:text-purple-300"
              >
                <ImageIcon className="h-4 w-4" /> Foto
              </button>
              <button
                type="button"
                onClick={() => {
                  docInputRef.current?.click();
                  setShowAttachMenu(false);
                }}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-purple-500/15 hover:text-purple-300"
              >
                <FileText className="h-4 w-4" /> Documento
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowAttachMenu((current) => !current)}
            className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
              showAttachMenu
                ? "bg-purple-500/20 text-purple-400"
                : "text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
            title="Adjuntar archivo"
          >
            <Paperclip className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Contenedor Central: Vista Previa y Textarea */}
        <div className="flex min-w-0 flex-1 flex-col">
          {selectedFile && (
            <div className="animate-in fade-in slide-in-from-bottom-1 mt-2 mb-1 ml-1 flex w-max max-w-full items-center gap-2 rounded-lg border border-purple-500/20 bg-purple-500/10 px-3 py-1.5">
              <span className="max-w-[150px] truncate text-xs text-purple-200 md:max-w-[200px]">
                {selectedFile.name}
              </span>
              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="text-purple-400 transition-colors hover:text-white"
                title="Quitar archivo"
              >
                <X className="h-3.5 w-3.5" strokeWidth={2.5} />
              </button>
            </div>
          )}

          <textarea
            value={message}
            ref={textareaRef}
            rows={1}
            placeholder="Escribe..."
            disabled={disabled}
            className="min-h-[40px] max-h-32 w-full resize-none overflow-y-auto bg-transparent px-2 py-2 text-base leading-relaxed text-white outline-none placeholder:text-gray-500"
            onChange={(event) => setMessage(event.target.value)}
            onInput={(event) => {
              event.currentTarget.style.height = "auto";
              event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
            }}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="relative mr-1 flex shrink-0 items-center">
          {showLevelMenu && (
            <div className="animate-in fade-in slide-in-from-bottom-2 absolute bottom-14 right-0 z-50 flex w-72 flex-col rounded-2xl border border-white/10 bg-[#1e1e1e]/95 p-2 shadow-2xl backdrop-blur-xl duration-200">
              {[
                { id: "Simple", desc: "Explicación fácil y sin tecnicismos" },
                {
                  id: "Resumida",
                  desc: "Puntos importantes y recomendaciones principales",
                },
                {
                  id: "Detallada",
                  desc: "Métrica, hipótesis MITRE, CVEs, fuentes y evidencia técnica.",
                },
              ].map((level) => (
                <button
                  key={level.id}
                  type="button"
                  onClick={() => {
                    setResponseLevel(level.id);
                    setShowLevelMenu(false);
                  }}
                  className="flex w-full items-start gap-3 rounded-xl p-3 text-left transition-colors hover:bg-white/10"
                >
                  <div className="w-5 shrink-0 pt-0.5">
                    {responseLevel === level.id && (
                      <Check className="h-5 w-5 text-white" strokeWidth={2.5} />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-white">
                      {level.id}
                    </span>
                    <span className="text-xs leading-snug text-gray-400">
                      {level.desc}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowLevelMenu((current) => !current)}
            className={`flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-medium transition-colors ${
              showLevelMenu
                ? "bg-white/15 text-white"
                : "text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
            title={`Nivel de respuesta: ${responseLevel}`}
          >
            {responseLevel}
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                showLevelMenu ? "rotate-180" : ""
              }`}
              strokeWidth={1.5}
            />
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={disabled || !message.trim()}
          className="mr-1 mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Enviar mensaje"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        </button>
      </div>
    </div>
  );
}