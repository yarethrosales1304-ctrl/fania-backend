import { useState } from "react";

import type {
  ChatResponse,
} from "../types/chat";

interface TechnicalDetailsProps {
  response: ChatResponse;
}

export default function TechnicalDetails({
  response,
}: TechnicalDetailsProps) {

  const [open, setOpen] =
    useState(false);

  return (
    <div className="mt-4">

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="text-sm tracking-[-0.01em] text-zinc-500 transition hover:text-zinc-200"
      >
        {open ? "⌃" : "⌄"} Ver detalles técnicos
      </button>

      {open && (

        <div className="appear appear--soft mt-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">

          <div className="grid gap-4 sm:grid-cols-2">

            <div>
              <p className="text-xs uppercase text-zinc-600">
                Risk Score
              </p>

              <p className="mt-1 text-sm text-zinc-300">
                {response.risk_score ??
                  "No disponible"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-zinc-600">
                Conversation ID
              </p>

              <p className="mt-1 text-sm text-zinc-300">
                {response.conversation_id ??
                  "No disponible"}
              </p>
            </div>

          </div>

          {response.technical_evidence &&
            response.technical_evidence.length > 0 && (

              <div className="mt-5">

                <h4 className="text-xs uppercase text-zinc-600">
                  Evidencias
                </h4>

                <div className="mt-2 space-y-2">

                  {response
                    .technical_evidence
                    .map(
                      (evidence, index) => (

                        <div
                          key={index}
                          className="rounded-lg bg-white/[0.02] p-3"
                        >

                          <p className="text-sm text-zinc-300">
                            {evidence.title}
                          </p>

                          <p className="mt-1 text-xs text-zinc-500">
                            {evidence.description}
                          </p>

                        </div>

                      )
                    )}

                </div>

              </div>

            )}

          {response.sources &&
            response.sources.length > 0 && (

              <div className="mt-5">

                <h4 className="text-xs uppercase text-zinc-600">
                  Fuentes consultadas
                </h4>

                <div className="mt-2 flex flex-wrap gap-2">

                  {response.sources.map(
                    (source, index) => (

                      <span
                        key={index}
                        className="rounded-md bg-white/[0.03] px-2 py-1 text-xs text-zinc-400"
                      >
                        {source}
                      </span>

                    )
                  )}

                </div>

              </div>

            )}

        </div>

      )}

    </div>
  );
}