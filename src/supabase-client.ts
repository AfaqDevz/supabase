import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID
const supabaseAPI = process.env.NEXT_PUBLIC_SUPABASE_API_KEY

export const supabase = createClient(supabaseURL as string, supabaseAPI as string);