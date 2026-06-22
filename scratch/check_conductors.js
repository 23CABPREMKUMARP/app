const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://naijinoigiogdfpecbmp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5haWppbm9pZ2lvZ2RmcGVjYm1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNDcyOTcsImV4cCI6MjA5MTcyMzI5N30.ugmZKmXlJ_VPyI8nr04Y6EgE5qlnDoH9jrKZVQq3hQ0';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('conductor_assignments').select('*').limit(1);
  if (error) console.log("Error:", error.message);
  else console.log("Table exists, data:", data);
}
check();
