-- 방문자 추적 테이블
-- 일일 순방문자 수를 추적하기 위한 테이블
-- visitor_id는 브라우저 fingerprint 또는 익명 UUID를 저장

CREATE TABLE IF NOT EXISTS daily_visitors (
  id BIGSERIAL PRIMARY KEY,
  visitor_id VARCHAR(64) NOT NULL,  -- 익명 방문자 식별자 (해시값)
  visit_date DATE NOT NULL DEFAULT CURRENT_DATE,
  first_visit_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  last_visit_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  visit_count INTEGER DEFAULT 1,  -- 해당 날짜 방문 횟수
  user_agent TEXT,
  referrer TEXT,
  UNIQUE(visitor_id, visit_date)  -- 같은 날 같은 방문자는 하나의 레코드
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_daily_visitors_date ON daily_visitors(visit_date DESC);
CREATE INDEX IF NOT EXISTS idx_daily_visitors_visitor_id ON daily_visitors(visitor_id);

-- RLS 설정
ALTER TABLE daily_visitors ENABLE ROW LEVEL SECURITY;

-- 누구나 방문 기록 추가 가능
CREATE POLICY "Anyone can insert visitor"
  ON daily_visitors FOR INSERT
  WITH CHECK (true);

-- 방문 기록 업데이트 (재방문 시 카운트 증가)
CREATE POLICY "Anyone can update own visitor record"
  ON daily_visitors FOR UPDATE
  USING (true);

-- 읽기는 관리자만 (선택사항 - 현재는 모두 허용)
CREATE POLICY "Anyone can read visitors for now"
  ON daily_visitors FOR SELECT
  USING (true);

-- 일일 방문자 통계 뷰 (선택사항)
CREATE OR REPLACE VIEW daily_visitor_stats AS
SELECT
  visit_date,
  COUNT(DISTINCT visitor_id) as unique_visitors,
  SUM(visit_count) as total_visits
FROM daily_visitors
GROUP BY visit_date
ORDER BY visit_date DESC;
