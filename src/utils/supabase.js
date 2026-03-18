import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://prrrfowftrksecudtgwy.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_TJT8Iere9btXxPhDm_knMQ_kgxqzWL7';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
