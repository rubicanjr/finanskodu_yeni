-- =====================================================
-- KOD ODASI SUPABASE SCHEMA
-- Finans Kodu - Community Forum Tables
-- =====================================================

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
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- POSTS POLICIES
-- Everyone can read posts
CREATE POLICY "Posts are viewable by everyone" 
  ON posts FOR SELECT 
  USING (true);

-- Authenticated users can insert posts
CREATE POLICY "Authenticated users can create posts" 
  ON posts FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

-- Users can update their own posts
CREATE POLICY "Users can update their own posts" 
  ON posts FOR UPDATE 
  USING (auth.uid()::text = user_id);

-- Users can delete their own posts
CREATE POLICY "Users can delete their own posts" 
  ON posts FOR DELETE 
  USING (auth.uid()::text = user_id);

-- REACTIONS POLICIES
-- Everyone can read reactions
CREATE POLICY "Reactions are viewable by everyone" 
  ON reactions FOR SELECT 
  USING (true);

-- Authenticated users can add reactions
CREATE POLICY "Authenticated users can add reactions" 
  ON reactions FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

-- Users can delete their own reactions
CREATE POLICY "Users can delete their own reactions" 
  ON reactions FOR DELETE 
  USING (auth.uid()::text = user_id);

-- COMMENTS POLICIES
-- Everyone can read comments
CREATE POLICY "Comments are viewable by everyone" 
  ON comments FOR SELECT 
  USING (true);

-- Authenticated users can add comments
CREATE POLICY "Authenticated users can add comments" 
  ON comments FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

-- Users can delete their own comments
CREATE POLICY "Users can delete their own comments" 
  ON comments FOR DELETE 
  USING (auth.uid()::text = user_id);

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
-- SEED DATA (Optional - for testing)
-- =====================================================

-- Insert sample posts (uncomment if you want test data)
/*
INSERT INTO posts (user_id, username, avatar_url, category, title, content) VALUES
  ('user1', 'Ahmet Yılmaz', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmet', 'Soru', 'Excel''de XIRR fonksiyonu nasıl kullanılır?', 'Merhaba, yatırım getirilerimi hesaplarken XIRR fonksiyonunu kullanmam gerekiyor ama tam olarak nasıl çalıştığını anlamadım. Yardımcı olabilir misiniz?'),
  ('user2', 'Zeynep Kaya', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zeynep', 'Kaynak', 'Finansal Modelleme için En İyi Kaynaklar', 'Finansal modelleme öğrenmek isteyenler için harika bir kaynak listesi hazırladım: 1) Wall Street Prep 2) CFI (Corporate Finance Institute) 3) Macabacus Excel eklentisi'),
  ('user3', 'Mehmet Demir', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mehmet', 'Tartışma', 'AI finans departmanlarını nasıl değiştirecek?', 'Sizce yapay zeka araçları finans profesyonellerinin işini kolaylaştırır mı yoksa işsiz mi bırakır? ChatGPT, Copilot gibi araçlar hakkında ne düşünüyorsunuz?');
*/

-- =====================================================
-- IMPORTANT NOTES FOR SETUP
-- =====================================================
-- 1. Run this SQL in your Supabase SQL Editor
-- 2. Make sure you have enabled "Enable Row Level Security" in Supabase Dashboard
-- 3. Update VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file
-- 4. Test authentication flow before enabling post creation
-- =====================================================
