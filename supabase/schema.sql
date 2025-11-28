-- AION2YA 데이터베이스 스키마

-- 1. 박제 게시판 테이블
CREATE TABLE IF NOT EXISTS shame_posts (
  id BIGSERIAL PRIMARY KEY,
  player_id VARCHAR(50) NOT NULL,
  server VARCHAR(50) NOT NULL,
  race VARCHAR(20) NOT NULL,
  reason TEXT NOT NULL,
  screenshot_url TEXT,
  report_count INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 박제 게시판 인덱스
CREATE INDEX IF NOT EXISTS idx_shame_posts_player_id ON shame_posts(player_id);
CREATE INDEX IF NOT EXISTS idx_shame_posts_server ON shame_posts(server);
CREATE INDEX IF NOT EXISTS idx_shame_posts_created_at ON shame_posts(created_at DESC);

-- 2. 업데이트 게시판 테이블
CREATE TABLE IF NOT EXISTS updates (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  author_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 업데이트 인덱스
CREATE INDEX IF NOT EXISTS idx_updates_created_at ON updates(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_updates_category ON updates(category);

-- 3. 관리자 테이블 (Supabase Auth와 연동)
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Row Level Security (RLS) 설정

-- 박제 게시판: 모두 읽기 가능, 인증된 사용자 작성 가능
ALTER TABLE shame_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read shame posts"
  ON shame_posts FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert shame posts"
  ON shame_posts FOR INSERT
  WITH CHECK (true);

-- 업데이트: 모두 읽기 가능, 관리자만 작성/수정/삭제 가능
ALTER TABLE updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read updates"
  ON updates FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert updates"
  ON updates FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.id = auth.uid()
    )
  );

CREATE POLICY "Only admins can update updates"
  ON updates FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.id = auth.uid()
    )
  );

CREATE POLICY "Only admins can delete updates"
  ON updates FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.id = auth.uid()
    )
  );

-- 관리자 테이블: 관리자만 읽기 가능
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can read admin table"
  ON admins FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.id = auth.uid()
    )
  );

-- 업데이트 시간 자동 갱신 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 트리거 생성
CREATE TRIGGER update_shame_posts_updated_at BEFORE UPDATE ON shame_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_updates_updated_at BEFORE UPDATE ON updates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Storage 버킷 생성 (스크린샷 이미지용)
INSERT INTO storage.buckets (id, name, public)
VALUES ('screenshots', 'screenshots', true)
ON CONFLICT (id) DO NOTHING;

-- Storage 정책: 누구나 업로드 가능, 누구나 읽기 가능
CREATE POLICY "Anyone can upload screenshots"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'screenshots');

CREATE POLICY "Anyone can read screenshots"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'screenshots');
