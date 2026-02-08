import { describe, it, expect } from 'vitest';
import { createClient } from '@supabase/supabase-js';

describe('Supabase Integration', () => {
  it('should connect to Supabase with valid credentials', async () => {
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

    expect(supabaseUrl).toBeDefined();
    expect(supabaseKey).toBeDefined();

    const supabase = createClient(supabaseUrl!, supabaseKey!);
    
    // Test connection by fetching auth status
    const { data, error } = await supabase.auth.getSession();
    
    // Should not throw error - connection is valid
    expect(error).toBeNull();
  });

  it('should have valid Supabase URL format', () => {
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    expect(supabaseUrl).toMatch(/^https:\/\/.*\.supabase\.co$/);
  });

  it('should have valid Supabase anon key format', () => {
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
    expect(supabaseKey).toBeDefined();
    expect(supabaseKey?.length).toBeGreaterThan(20);
  });
});
