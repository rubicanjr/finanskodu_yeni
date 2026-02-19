-- ============================================
-- PART 2: INDEXES AND CONSTRAINTS
-- ============================================
-- Run this SECOND (after part 1)

-- ============================================
-- INDEXES FOR USERS
-- ============================================
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- ============================================
-- INDEXES FOR PROFILES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_tier ON profiles(subscription_tier);

-- ============================================
-- INDEXES FOR ANALYSIS_RESULTS
-- ============================================
CREATE INDEX IF NOT EXISTS idx_analysis_results_user_id ON analysis_results(user_id);
CREATE INDEX IF NOT EXISTS idx_analysis_results_ticker ON analysis_results(ticker);
CREATE INDEX IF NOT EXISTS idx_analysis_results_created_at ON analysis_results(created_at DESC);

-- ============================================
-- INDEXES FOR POSTS
-- ============================================
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_post_type ON posts(post_type);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);

-- ============================================
-- INDEXES FOR COMMENTS
-- ============================================
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent_comment_id ON comments(parent_comment_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);

-- ============================================
-- INDEXES FOR LIKES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_likes_user_id ON likes(user_id);
CREATE INDEX IF NOT EXISTS idx_likes_post_id ON likes(post_id);
CREATE INDEX IF NOT EXISTS idx_likes_comment_id ON likes(comment_id);

-- ============================================
-- INDEXES FOR BOOKMARKS
-- ============================================
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_post_id ON bookmarks(post_id);

-- ============================================
-- UNIQUE CONSTRAINTS
-- ============================================
-- Prevent duplicate likes
DO $$ BEGIN
  ALTER TABLE likes ADD CONSTRAINT unique_user_post_like UNIQUE(user_id, post_id);
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  ALTER TABLE likes ADD CONSTRAINT unique_user_comment_like UNIQUE(user_id, comment_id);
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Prevent duplicate bookmarks
DO $$ BEGIN
  ALTER TABLE bookmarks ADD CONSTRAINT unique_user_post_bookmark UNIQUE(user_id, post_id);
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Verification
SELECT 'Indexes and constraints created successfully!' as status;
