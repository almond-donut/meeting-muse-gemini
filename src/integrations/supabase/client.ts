// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vvdhmfoojahuddhucslp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2ZGhtZm9vamFodWRkaHVjc2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMTk3OTQsImV4cCI6MjA2NTU5NTc5NH0.Fw3YPNCWrXnuzU3CAh3vMpVkk52DrqZubcHBtm2E2Xk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);