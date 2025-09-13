import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = 'https://zqanmjigtoehzzggnyly.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxYW5tamlndG9laHp6Z2dueWx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3OTMwODcsImV4cCI6MjA3MzM2OTA4N30.F2Wr091ZmkzPOGkQoC5LjdHl2zrzHGrezs2yWD1S08Q';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);