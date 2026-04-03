-- =====================================================
-- KOD ODASI SUPABASE SCHEMA (CHAT STYLE)
-- Finans Kodu - Real-time Chat System
-- =====================================================

-- 1. USERS TABLE (Supabase Auth Integration)
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  avatar_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. KOD ODASI MESSAGES TABLE (Chat Messages)
-- =====================================================
CREATE TABLE IF NOT EXISTS kod_odasi_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. KOD ODASI CATEGORIES TABLE (Optional)
-- =====================================================
CREATE TABLE IF NOT EXISTS kod_odasi_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Real-time subscription için index
CREATE INDEX IF NOT EXISTS idx_kod_odasi_messages_created_at 
ON kod_odasi_messages(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_kod_odasi_messages_user_id 
ON kod_odasi_messages(user_id);

CREATE INDEX IF NOT EXISTS idx_users_auth_id 
ON users(auth_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE kod_odasi_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE kod_odasi_categories ENABLE ROW LEVEL SECURITY;

-- USERS POLICIES
DROP POLICY IF EXISTS "Users can view their own profile" ON users;
CREATE POLICY "Users can view their own profile"
ON users FOR SELECT
USING (auth.uid() = auth_id);

DROP POLICY IF EXISTS "Users can view all profiles" ON users;
CREATE POLICY "Users can view all profiles"
ON users FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON users;
CREATE POLICY "Users can insert their own profile"
ON users FOR INSERT
WITH CHECK (auth.uid() = auth_id);

DROP POLICY IF EXISTS "Users can update their own profile" ON users;
CREATE POLICY "Users can update their own profile"
ON users FOR UPDATE
USING (auth.uid() = auth_id);

-- MESSAGES POLICIES
DROP POLICY IF EXISTS "Anyone can read messages" ON kod_odasi_messages;
CREATE POLICY "Anyone can read messages"
ON kod_odasi_messages FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert messages" ON kod_odasi_messages;
CREATE POLICY "Authenticated users can insert messages"
ON kod_odasi_messages FOR INSERT
WITH CHECK (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

DROP POLICY IF EXISTS "Users can update their own messages" ON kod_odasi_messages;
CREATE POLICY "Users can update their own messages"
ON kod_odasi_messages FOR UPDATE
USING (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

DROP POLICY IF EXISTS "Users can delete their own messages" ON kod_odasi_messages;
CREATE POLICY "Users can delete their own messages"
ON kod_odasi_messages FOR DELETE
USING (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

-- CATEGORIES POLICIES
DROP POLICY IF EXISTS "Anyone can read categories" ON kod_odasi_categories;
CREATE POLICY "Anyone can read categories"
ON kod_odasi_categories FOR SELECT
USING (true);

-- =====================================================
-- TRIGGERS FOR UPDATED_AT
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_kod_odasi_messages_updated_at ON kod_odasi_messages;
CREATE TRIGGER update_kod_odasi_messages_updated_at BEFORE UPDATE ON kod_odasi_messages
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- REALTIME PUBLICATION
-- =====================================================

-- Enable realtime for messages table
ALTER PUBLICATION supabase_realtime ADD TABLE kod_odasi_messages;

-- =====================================================
-- SETUP INSTRUCTIONS
-- =====================================================
-- 1. Run this SQL in Supabase Dashboard > SQL Editor
-- 2. Go to Authentication > Providers > Email and enable it
-- 3. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment
-- 4. Test authentication flow before using chat
-- =====================================================
