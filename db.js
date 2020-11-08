import pkg from '@supabase/supabase-js';
const { createClient } = pkg;

// Initialize 
const supabaseUrl = 'https://eilfpkgdgcqwxfbzvhiq.supabase.co';
const supabaseKey = process.env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;