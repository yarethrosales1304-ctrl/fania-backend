export type RiskLevel =
  | "GREEN"
  | "YELLOW"
  | "RED"
  | null;

export interface ChatResponse {
  role: "assistant";
  assistant: string;
  message: string;
  risk_level: RiskLevel;
  risk_score?: number | null;

  conversation_id?: string;

  technical_evidence?: TechnicalEvidence[];
  suggested_actions?: SuggestedAction[];
  sources?: string[];
}

export interface TechnicalEvidence {
  title?: string;
  description?: string;
  value?: string;
  severity?: string;
}

export interface SuggestedAction {
  title?: string;
  description?: string;
}

export interface ChatMessageData {
  id: string;
  role: "user" | "assistant";
  message: string;
  response?: ChatResponse;
  timestamp: Date;
}