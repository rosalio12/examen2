import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://umgbnyuszlkkahovmgtu.supabase.co";
const supabaseAnoKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtZ2JueXVzemxra2Fob3ZtZ3R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzODAxMzAsImV4cCI6MjA2Njk1NjEzMH0.t7gLeigv2AbVbnE78fk5cRGFi0Z2YTBXiHxSHnr1hLg";


export const supabase = createClient(supabaseUrl, supabaseAnoKey);
