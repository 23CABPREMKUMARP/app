import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co").replace(/\/$/, "");
export const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key";

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Custom Supabase Fetch Client (Deprecated in favor of full SDK client `supabase`)
 * Used to interact with Supabase REST API directly for legacy routes.
 */
export async function supabaseFetch(table: string, method: "GET" | "POST" | "PATCH" | "DELETE" = "GET", body?: any, query?: string) {
  const url = `${supabaseUrl}/rest/v1/${table}${query ? `?${query}` : ""}`;
  
  const headers: HeadersInit = {
    "apikey": supabaseKey,
    "Authorization": `Bearer ${supabaseKey}`,
    "Content-Type": "application/json"
  };

  if (method !== "GET") {
    Object.assign(headers, { "Prefer": "return=representation" });
  }

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    const error = await response.json();
    console.error(`Supabase Fetch Error [${table}]:`, error);
    throw new Error(error.message || "Unknown Supabase Error");
  }

  return response.json();
}
