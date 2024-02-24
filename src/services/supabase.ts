import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://bbsfgdcrncsbtjtlfvoy.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJic2ZnZGNybmNzYnRqdGxmdm95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg3OTE0MjAsImV4cCI6MjAyNDM2NzQyMH0.sZMGSYu2OGTupJzHyVNHreICz6MSWY1c6oq0bnN4Z60`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
