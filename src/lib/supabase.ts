
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables are missing. Please check your Supabase integration.');
  console.error('Expected variables: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY');
  console.error('Current values:', { 
    url: supabaseUrl ? 'Set' : 'Missing', 
    key: supabaseAnonKey ? 'Set' : 'Missing' 
  });
  
  // Create a dummy client to prevent the app from crashing
  export const supabase = createClient('https://placeholder.supabase.co', 'placeholder-key');
} else {
  export const supabase = createClient(supabaseUrl, supabaseAnonKey);
}
