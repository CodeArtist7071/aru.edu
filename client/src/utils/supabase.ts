import { createClient } from '@supabase/supabase-js';


const VITE_SUPABASE_URL="https://vqrkyepybgcieeypqimh.supabase.co"
const VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY="sb_publishable_Z6iU-xfJQLOa5wpdm-mwsg_WVgqoo3T"
const supabaseUrl = VITE_SUPABASE_URL;
const supabaseKey = VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}
console.log(supabase);
export default supabase