import { describe, it, expect } from "vitest";
import { createClient } from "@supabase/supabase-js";
import { ENV } from "./_core/env";

describe("Kod Odası Database Connection", () => {
  it("should connect to Supabase with valid credentials", async () => {
    // Check if environment variables are set
    expect(ENV.supabaseUrl).toBeDefined();
    expect(ENV.supabaseAnonKey).toBeDefined();
    expect(ENV.supabaseUrl).toContain("supabase.co");

    // Create Supabase client
    const supabase = createClient(ENV.supabaseUrl, ENV.supabaseAnonKey);

    // Test connection by querying posts table
    const { data, error } = await supabase
      .from("posts")
      .select("id")
      .limit(1);

    // Should not have error
    expect(error).toBeNull();
    
    // Data should be an array (even if empty)
    expect(Array.isArray(data)).toBe(true);
  }, 10000); // 10 second timeout for network request
});
