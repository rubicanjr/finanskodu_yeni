-- =====================================================
-- KOD ODASI SUPABASE SCHEMA (MANUS AUTH COMPATIBLE)
-- Finans Kodu - Community Forum Tables
-- =====================================================

-- IMPORTANT: This schema is compatible with Manus Auth (NOT Supabase Auth)
-- RLS policies use user_id TEXT field instead of auth.uid()

-- 1. POSTS TABLE (Forum Posts)
-- =====================================================
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  username TEXT NOT NULL,
  avatar_url TEXT,
  category TEXT NOT NULL CHECK (category IN ('Soru', 'Kaynak', 'Tartışma')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);

-- 2. REACTIONS TABLE (Likes, Bookmarks)
-- =====================================================
CREATE TABLE IF NOT EXISTS reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('like', 'bookmark')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, user_id, reaction_type)
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_reactions_post_id ON reactions(post_id);
CREATE INDEX IF NOT EXISTS idx_reactions_user_id ON reactions(user_id);

-- 3. COMMENTS TABLE (Post Comments)
-- =====================================================
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  username TEXT NOT NULL,
  avatar_url TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- SIMPLIFIED FOR MANUS AUTH COMPATIBILITY
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- POSTS POLICIES (Simplified - everyone can read, anon key can write)
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Posts are viewable by everyone" ON posts;
DROP POLICY IF EXISTS "Authenticated users can create posts" ON posts;
DROP POLICY IF EXISTS "Users can update their own posts" ON posts;
DROP POLICY IF EXISTS "Users can delete their own posts" ON posts;

-- Everyone can read posts
CREATE POLICY "Posts are viewable by everyone" 
  ON posts FOR SELECT 
  USING (true);

-- Allow INSERT with anon key (backend will validate auth)
CREATE POLICY "Allow post creation" 
  ON posts FOR INSERT 
  WITH CHECK (true);

-- Allow UPDATE for own posts (based on user_id field)
CREATE POLICY "Users can update their own posts" 
  ON posts FOR UPDATE 
  USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Allow DELETE for own posts (based on user_id field)
CREATE POLICY "Users can delete their own posts" 
  ON posts FOR DELETE 
  USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- REACTIONS POLICIES (Simplified)
DROP POLICY IF EXISTS "Reactions are viewable by everyone" ON reactions;
DROP POLICY IF EXISTS "Authenticated users can add reactions" ON reactions;
DROP POLICY IF EXISTS "Users can delete their own reactions" ON reactions;

-- Everyone can read reactions
CREATE POLICY "Reactions are viewable by everyone" 
  ON reactions FOR SELECT 
  USING (true);

-- Allow INSERT with anon key (backend will validate auth)
CREATE POLICY "Allow reaction creation" 
  ON reactions FOR INSERT 
  WITH CHECK (true);

-- Allow DELETE for own reactions
CREATE POLICY "Users can delete their own reactions" 
  ON reactions FOR DELETE 
  USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- COMMENTS POLICIES (Simplified)
DROP POLICY IF EXISTS "Comments are viewable by everyone" ON comments;
DROP POLICY IF EXISTS "Authenticated users can add comments" ON comments;
DROP POLICY IF EXISTS "Users can delete their own comments" ON comments;

-- Everyone can read comments
CREATE POLICY "Comments are viewable by everyone" 
  ON comments FOR SELECT 
  USING (true);

-- Allow INSERT with anon key (backend will validate auth)
CREATE POLICY "Allow comment creation" 
  ON comments FOR INSERT 
  WITH CHECK (true);

-- Allow DELETE for own comments
CREATE POLICY "Users can delete their own comments" 
  ON comments FOR DELETE 
  USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Function to get post with reaction counts
CREATE OR REPLACE FUNCTION get_post_with_stats(post_uuid UUID)
RETURNS JSON AS $$
  SELECT json_build_object(
    'id', p.id,
    'user_id', p.user_id,
    'username', p.username,
    'avatar_url', p.avatar_url,
    'category', p.category,
    'title', p.title,
    'content', p.content,
    'created_at', p.created_at,
    'like_count', (SELECT COUNT(*) FROM reactions WHERE post_id = p.id AND reaction_type = 'like'),
    'bookmark_count', (SELECT COUNT(*) FROM reactions WHERE post_id = p.id AND reaction_type = 'bookmark'),
    'comment_count', (SELECT COUNT(*) FROM comments WHERE post_id = p.id)
  )
  FROM posts p
  WHERE p.id = post_uuid;
$$ LANGUAGE SQL STABLE;

-- =====================================================
-- IMPORTANT SETUP NOTES
-- =====================================================
-- 1. Run this SQL in your Supabase SQL Editor
-- 2. This schema uses SIMPLIFIED RLS policies that allow INSERT with anon key
-- 3. Backend (tRPC) validates authentication before allowing operations
-- 4. Update/Delete policies use JWT claims (if you set up Supabase JWT with Manus)
-- 5. For production, consider implementing custom JWT claims or service role key
-- =====================================================

-- =====================================================
-- TESTING: Verify RLS is working
-- =====================================================
-- Run these queries to test:
-- SELECT * FROM posts; -- Should work (read is public)
-- INSERT INTO posts (user_id, username, category, title, content) VALUES ('test', 'Test User', 'Soru', 'Test', 'Test content'); -- Should work with anon key
-- =====================================================
