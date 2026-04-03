-- ============================================
-- PART 1: ENUMS AND BASIC TABLES
-- ============================================
-- Run this FIRST

-- ============================================
-- STEP 1: CREATE ENUMS
-- ============================================

DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('user', 'admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE subscription_tier AS ENUM ('free', 'pro');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE post_type AS ENUM ('question', 'resource', 'discussion');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ============================================
-- STEP 2: CREATE TABLES
-- ============================================

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  name TEXT,
  email TEXT,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_signed_in TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subscription_tier subscription_tier NOT NULL DEFAULT 'free',
  usage_count INTEGER NOT NULL DEFAULT 0,
  last_reset_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Analysis results table
CREATE TABLE IF NOT EXISTS analysis_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  ticker TEXT NOT NULL,
  result_image_url TEXT,
  analysis_data TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  post_type post_type NOT NULL,
  category TEXT NOT NULL,
  likes_count INTEGER NOT NULL DEFAULT 0,
  comments_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Likes table
CREATE TABLE IF NOT EXISTS likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT like_target_check CHECK (
    (post_id IS NOT NULL AND comment_id IS NULL) OR
    (post_id IS NULL AND comment_id IS NOT NULL)
  )
);

-- Bookmarks table
CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Verification
SELECT 'Tables created successfully!' as status;
