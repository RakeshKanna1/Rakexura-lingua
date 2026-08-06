-- ====================================================================
-- RAKEXURA LINGUA - HINGLISH VOICE & CHAT TRANSLATOR DATABASE SCHEMA
-- ====================================================================

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT,
  default_output_language TEXT DEFAULT 'English',
  default_reply_language TEXT DEFAULT 'Hinglish',
  default_reply_tone TEXT DEFAULT 'Friendly',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TRANSLATIONS TABLE
CREATE TABLE IF NOT EXISTS public.translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  input_type TEXT NOT NULL CHECK (input_type IN ('text', 'upload', 'record')),
  original_text TEXT NOT NULL,
  cleaned_text TEXT,
  translated_text TEXT NOT NULL,
  input_language TEXT DEFAULT 'Hinglish',
  output_language TEXT NOT NULL DEFAULT 'English',
  intent TEXT,
  sentiment TEXT,
  confidence_score NUMERIC(3, 2) DEFAULT 0.95,
  suggested_reply TEXT,
  reply_language TEXT DEFAULT 'Hinglish',
  reply_tone TEXT DEFAULT 'Friendly',
  audio_file_path TEXT,
  duration_seconds NUMERIC(6, 2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CONVERSATIONS TABLE
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL DEFAULT 'Customer',
  customer_phone_alias TEXT NOT NULL,
  title TEXT NOT NULL,
  status TEXT DEFAULT 'Open' CHECK (status IN ('Open', 'Resolved', 'Pending')),
  summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CONVERSATION MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.conversation_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender TEXT NOT NULL CHECK (sender IN ('customer', 'seller', 'system')),
  input_type TEXT DEFAULT 'text' CHECK (input_type IN ('text', 'voice')),
  original_text TEXT NOT NULL,
  translated_text TEXT,
  suggested_reply TEXT,
  audio_file_path TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. USAGE LOGS TABLE
CREATE TABLE IF NOT EXISTS public.usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  operation_type TEXT NOT NULL,
  provider TEXT NOT NULL,
  processing_time_ms INTEGER NOT NULL,
  success BOOLEAN DEFAULT true,
  error_code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_logs ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ & INSERT POLICIES
CREATE POLICY "Users access own profile" ON public.profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Public write translations" ON public.translations FOR ALL USING (true);
CREATE POLICY "Public write conversations" ON public.conversations FOR ALL USING (true);
CREATE POLICY "Public write messages" ON public.conversation_messages FOR ALL USING (true);
CREATE POLICY "Public write logs" ON public.usage_logs FOR ALL USING (true);
