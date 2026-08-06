export type InputMode = "text" | "upload" | "record";

export type OutputLanguage = 
  | "English"
  | "Tamil"
  | "Telugu"
  | "Malayalam"
  | "Kannada"
  | "Bengali"
  | "Marathi"
  | "Gujarati"
  | "Punjabi";

export type ReplyLanguage = "Hinglish" | "English" | "Hindi" | OutputLanguage;

export type ReplyTone = 
  | "Friendly"
  | "Professional"
  | "Slightly strict"
  | "Short"
  | "Detailed"
  | "Polite"
  | "Casual seller style";

export type CustomerIntent =
  | "Request"
  | "Question"
  | "Complaint"
  | "Greeting"
  | "Purchase"
  | "Delivery Inquiry"
  | "Login"
  | "Gaming"
  | "Support"
  | "Asking for OTP"
  | "Asking for login credentials"
  | "Password issue"
  | "Game not opening"
  | "Download issue"
  | "Installation issue"
  | "Payment question"
  | "Price negotiation"
  | "Refund request"
  | "Asking for availability"
  | "Asking for setup help"
  | "Account logged out"
  | "Requesting a new code"
  | "Reporting an error"
  | "General question"
  | "Unknown intent";

export type DialectCategory =
  | "Hinglish"
  | "Tanglish"
  | "Mixed (Hinglish + Tanglish)"
  | "Standard English"
  | "Hindi (Devanagari)"
  | "Tamil (Script)"
  | "Pure Code/Technical";

export type SentimentCategory =
  | "Calm"
  | "Confused"
  | "Urgent"
  | "Angry"
  | "Suspicious"
  | "Happy"
  | "Polite"
  | "Frustrated"
  | "Neutral";

export interface ExtractedEntities {
  games: string[];
  brands: string[];
  technical_terms: string[];
  prices: string[];
  order_ids: string[];
  urls: string[];
  usernames: string[];
  phone_numbers: string[];
  emojis: string[];
}

export interface SemanticMeaningGraph {
  primary_intent: string;
  secondary_intents: string[];
  action_requested: string;
  subjects: string[];
  platforms: string[];
  constraints: string[];
  user_state: string;
  summary_flow: string[];
}

export type ChatRegister = 
  | "WhatsApp"
  | "Discord"
  | "Telegram"
  | "Customer Support"
  | "Gaming"
  | "Professional"
  | "Social Media";

export interface TranslationRequest {
  text: string;
  output_language: OutputLanguage;
  reply_language: ReplyLanguage;
  reply_tone: ReplyTone;
  audio_url?: string;
  file_name?: string;
  conversation_history?: string[];
}

export interface ProviderMetadata {
  provider: ProviderType;
  fallback_used: boolean;
  model?: string;
  quality_score: number;
  latency_ms?: number;
}

export interface TranslationResult {
  id: string;
  original_text: string;
  cleaned_text: string;
  translated_text: string;
  simple_meaning: string;
  detected_language: string;
  detected_dialect: DialectCategory;
  chat_register?: ChatRegister;
  output_language: OutputLanguage;
  intent: CustomerIntent;
  sentiment: SentimentCategory;
  confidence_score: number;
  entities: ExtractedEntities;
  meaning_graph: SemanticMeaningGraph;
  reasoning_passes: number;
  grammar_validated: boolean;
  candidates?: string[];
  selected_candidate_index?: number;
  context_resolved_text?: string;
  suggested_reply: string;
  reply_language: ReplyLanguage;
  reply_tone: ReplyTone;
  provider_metadata?: ProviderMetadata;
  audio_file_path?: string;
  duration_seconds?: number;
  created_at: string;
}

export interface ConversationMessage {
  id: string;
  conversation_id: string;
  sender: "customer" | "seller" | "system";
  input_type: "text" | "voice";
  original_text: string;
  cleaned_text?: string;
  translated_text?: string;
  suggested_reply?: string;
  intent?: CustomerIntent;
  sentiment?: SentimentCategory;
  audio_file_path?: string;
  created_at: string;
}

export interface Conversation {
  id: string;
  user_id?: string;
  customer_name: string;
  customer_phone_alias: string;
  title: string;
  status: "Open" | "Resolved" | "Pending";
  summary: string;
  messages: ConversationMessage[];
  created_at: string;
  updated_at: string;
}

export type ProviderType = "gemini" | "openai" | "local" | "rule-fallback";

export interface ProviderTranslationRequest {
  text: string;
  output_language: OutputLanguage;
  reply_language: ReplyLanguage;
  reply_tone: ReplyTone;
  conversation_history?: string[];
  masked_text?: string;
  entities?: ExtractedEntities;
}

export interface ProviderTranslationResponse {
  translated_text: string;
  detected_language: string;
  detected_dialect: DialectCategory;
  intent: CustomerIntent;
  sentiment: SentimentCategory;
  chat_register?: ChatRegister;
  candidates: string[];
  quality_score: number;
  provider_name: ProviderType;
}

export interface TranslationProvider {
  name: ProviderType;
  translate(request: ProviderTranslationRequest): Promise<ProviderTranslationResponse>;
}


