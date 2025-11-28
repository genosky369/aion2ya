-- ============================================================================
-- AION2YA.COM 데이터베이스 스키마
-- 생성일: 2025-11-28
-- 설명: 시뮬레이터 + 커뮤니티 시스템
-- ============================================================================

-- ============================================================================
-- 1. 게시판 시스템
-- ============================================================================

-- 게시글 테이블
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category VARCHAR(20) NOT NULL CHECK (category IN ('notice', 'free', 'suggestion')),
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  author_name VARCHAR(50) NOT NULL DEFAULT 'Anonymous',
  password_hash VARCHAR(255), -- 비회원 글 삭제용
  view_count INTEGER DEFAULT 0,
  is_admin BOOLEAN DEFAULT FALSE,
  is_pinned BOOLEAN DEFAULT FALSE, -- 공지사항 상단 고정
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET -- IPv4/IPv6 지원
);

-- 댓글 테이블 (DC인사이드 스타일)
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE, -- 대댓글
  nickname VARCHAR(20) NOT NULL,
  password_hash VARCHAR(255) NOT NULL, -- bcrypt 해시
  content TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET
);

-- ============================================================================
-- 2. 인플루언서 시스템
-- ============================================================================

-- 인플루언서 정보
CREATE TABLE IF NOT EXISTS influencers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL UNIQUE,
  chzzk_channel_id VARCHAR(100),
  chzzk_url VARCHAR(255),
  youtube_channel_id VARCHAR(100),
  youtube_url VARCHAR(255),
  profile_image_url VARCHAR(255),
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 유튜브 영상 목록
CREATE TABLE IF NOT EXISTS youtube_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  influencer_id UUID NOT NULL REFERENCES influencers(id) ON DELETE CASCADE,
  video_id VARCHAR(20) NOT NULL UNIQUE, -- 유튜브 영상 ID
  title VARCHAR(255) NOT NULL,
  description TEXT,
  thumbnail_url VARCHAR(255),
  published_at TIMESTAMP WITH TIME ZONE,
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  is_aion2_related BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 3. 인덱스 생성 (성능 최적화)
-- ============================================================================

-- 게시글 인덱스
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_pinned ON posts(is_pinned, created_at DESC);

-- 댓글 인덱스
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);

-- 인플루언서 인덱스
CREATE INDEX IF NOT EXISTS idx_influencers_name ON influencers(name);
CREATE INDEX IF NOT EXISTS idx_influencers_active ON influencers(is_active, display_order);

-- 유튜브 영상 인덱스
CREATE INDEX IF NOT EXISTS idx_youtube_videos_influencer ON youtube_videos(influencer_id);
CREATE INDEX IF NOT EXISTS idx_youtube_videos_published ON youtube_videos(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_youtube_videos_video_id ON youtube_videos(video_id);

-- ============================================================================
-- 4. RLS (Row Level Security) 정책
-- ============================================================================

-- RLS 활성화
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE influencers ENABLE ROW LEVEL SECURITY;
ALTER TABLE youtube_videos ENABLE ROW LEVEL SECURITY;

-- 게시글: 모두 읽기 가능
CREATE POLICY "Anyone can view posts"
  ON posts FOR SELECT
  USING (true);

-- 게시글: 모두 작성 가능
CREATE POLICY "Anyone can create posts"
  ON posts FOR INSERT
  WITH CHECK (true);

-- 댓글: 모두 읽기 가능
CREATE POLICY "Anyone can view comments"
  ON comments FOR SELECT
  USING (true);

-- 댓글: 모두 작성 가능
CREATE POLICY "Anyone can create comments"
  ON comments FOR INSERT
  WITH CHECK (true);

-- 인플루언서: 모두 읽기 가능
CREATE POLICY "Anyone can view influencers"
  ON influencers FOR SELECT
  USING (true);

-- 유튜브 영상: 모두 읽기 가능
CREATE POLICY "Anyone can view youtube videos"
  ON youtube_videos FOR SELECT
  USING (true);

-- ============================================================================
-- 5. 트리거 (자동 업데이트)
-- ============================================================================

-- updated_at 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 게시글 updated_at 트리거
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 댓글 updated_at 트리거
CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 인플루언서 updated_at 트리거
CREATE TRIGGER update_influencers_updated_at
  BEFORE UPDATE ON influencers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 6. 초기 데이터
-- ============================================================================

-- 기본 인플루언서: 포셔
INSERT INTO influencers (name, description, display_order) VALUES
  ('포셔', '아이온2 대표 스트리머', 1)
ON CONFLICT (name) DO NOTHING;

-- ============================================================================
-- 완료!
-- ============================================================================

-- 테이블 목록 확인
DO $$
BEGIN
  RAISE NOTICE '=== 생성된 테이블 ===';
  RAISE NOTICE '1. posts (게시글)';
  RAISE NOTICE '2. comments (댓글)';
  RAISE NOTICE '3. influencers (인플루언서)';
  RAISE NOTICE '4. youtube_videos (유튜브 영상)';
  RAISE NOTICE '';
  RAISE NOTICE '✅ 스키마 생성 완료!';
END $$;
