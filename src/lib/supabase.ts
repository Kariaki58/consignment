import { createClient } from '@supabase/supabase-js';

// Provide fallback strings so the app doesn't crash at startup if the env variables are missing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key';

// Normal client for client-side usage (uses Anon Key, respects RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for server-side ONLY usage (uses Service Key, bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
