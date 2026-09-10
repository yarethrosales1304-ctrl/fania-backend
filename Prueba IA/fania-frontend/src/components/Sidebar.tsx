import faniaIcon from "../assets/fania-icon.png";

interface SidebarProps {
  onNewChat: () => void;
  onClose: () => void;
  conversations: string[];
  isOpen: boolean;
}

export default function Sidebar({
  onNewChat,
  onClose,
  conversations,
  isOpen,
}: SidebarProps) {

  return (
    <aside className={`fixed md:relative top-0 left-0 h-[100dvh] md:h-full z-[100] md:z-10 bg-[#111111] md:bg-black/40 backdrop-blur-3xl border-r border-white/10 transition-all duration-300 ease-in-out flex flex-col shrink-0 ${isOpen ? "w-[280px] translate-x-0" : "w-0 -translate-x-full md:translate-x-0 overflow-hidden border-none"}`}>
      <div className="w-[280px] h-full flex flex-col p-6">

      {/* Header del Sidebar */}
      <div className="mb-8 flex items-center gap-3 px-2">

        {/* Símbolo FanIA */}
        <img
          src={faniaIcon}
          alt="FanIA"
          className="h-12 w-12 shrink-0 object-contain transition-all hover:scale-105"
        />

        {/* Contenedor de Texto */}
        <div className="flex flex-col justify-center">

          <div className="flex items-baseline">
            <span className="font-serif text-3xl italic leading-none text-white">Fan</span>
            <span className="font-serif text-3xl italic leading-none text-white/50">IA</span>
          </div>

          <span className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.25em] text-gray-500">
            Cyber Intelligence
          </span>

        </div>
      </div>

      <div
        className="appear appear--btn"
        style={{ "--d": "0.18s" } as React.CSSProperties}
      >

        <button
          onClick={onNewChat}
          className="mt-8 mb-6 flex w-full items-center justify-center rounded-lg border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-zinc-100 transition-colors hover:bg-white/10"
        >
          + Nuevo chat
        </button>

      </div>

      <div
        className="appear appear--soft flex-1 overflow-y-auto"
        style={{ "--d": "0.3s" } as React.CSSProperties}
      >

        <span className="mb-4 block w-full px-1 text-center text-xs font-semibold uppercase tracking-widest text-gray-500">
          Historial
        </span>

        <div className="space-y-1">

          {conversations.map(
            (conversation, index) => (
              <button
                key={index}
                onClick={onClose}
                className="w-full truncate cursor-pointer rounded-lg px-2 py-2 text-center text-sm text-gray-300 transition-colors hover:bg-white/5"
              >
                {conversation}
              </button>
            )
          )}

        </div>

      </div>

      <div
        className="appear appear--soft border-t border-white/[0.08] pt-4"
        style={{ "--d": "0.4s" } as React.CSSProperties}
      >

        <div className="liquid-glass-history flex items-center gap-3 rounded-xl border border-white/[0.08] p-3">

          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(52,211,153,0.6)]" />

          <div>
            <p className="text-xs text-zinc-400">
              Sistema operativo
            </p>

            <p className="text-[10px] tracking-[-0.01em] text-zinc-600">
              FanIA Intelligence Core
            </p>
          </div>

        </div>

      </div>

      </div>
    </aside>
  );
}
