# 🔄 프로젝트 인수인계서

> **작성일**: 2026-02-07
> **작업자**: Claude Code
> **프로젝트**: aion2ya.com 리팩토링

---

## 📋 목차
1. [변경 사항 요약](#변경-사항-요약)
2. [프로젝트 구조](#프로젝트-구조)
3. [기술 스택](#기술-스택)
4. [주요 기능](#주요-기능)
5. [변경된 파일 목록](#변경된-파일-목록)
6. [되돌리는 방법](#되돌리는-방법)
7. [새 프로젝트 시작 가이드](#새-프로젝트-시작-가이드)
8. [데이터베이스 정보](#데이터베이스-정보)
9. [환경 변수](#환경-변수)
10. [배포 정보](#배포-정보)

---

## 📌 변경 사항 요약

### 변경 전
- 메인 도메인(`aion2ya.com`)이 아이온2 커뮤니티 & 시뮬레이터 사이트
- 박제 게시판, 커뮤니티, 시뮬레이터 등 활발한 기능

### 변경 후
- **메인 페이지**: 간단한 "Coming Soon" 페이지로 변경
- **기존 기능**: 모두 그대로 유지되며, 숨겨진 아이콘으로 접근 가능
- **접근 방법**:
  - 푸터 왼쪽 하단의 작은 로고 클릭
  - 또는 직접 URL 입력 (`/legacy-home`)

### 왜 이렇게 했나요?
1. 도메인은 유지하고 싶지만, 새로운 프로젝트를 시작하고 싶음
2. 기존 작업물이 아까워서 완전히 삭제하고 싶지 않음
3. 나중에 필요하면 언제든 되돌릴 수 있도록

---

## 🏗️ 프로젝트 구조

```
aion2ya/
├── app/
│   ├── page.tsx                    # ✨ NEW: Coming Soon 페이지
│   ├── page.aion2ya.tsx           # 🔒 BACKUP: 원래 홈 페이지
│   ├── legacy-home/
│   │   └── page.tsx               # ✨ NEW: 기존 홈 접근용 페이지
│   ├── admin/                      # 관리자 페이지
│   ├── api/                        # API 라우트
│   ├── board/                      # 커뮤니티 게시판
│   │   └── shame/                  # 박제 게시판
│   ├── calculator/                 # 계산기
│   ├── simulator/                  # 시뮬레이터
│   │   ├── pet-comprehension/      # 펫 이해도
│   │   └── manastone/              # 마석/영석
│   ├── suggestion/                 # 건의사항
│   └── updates/                    # 업데이트 내역
├── components/
│   ├── layout/
│   │   ├── Header.tsx             # 🔧 MODIFIED: 조건부 숨김 기능 추가
│   │   └── Footer.tsx             # 🔧 MODIFIED: 숨겨진 아이콘 추가
│   └── ...
├── lib/
│   ├── supabase.ts                # Supabase 클라이언트
│   └── data/                       # 게임 데이터
├── config/
│   └── navigation.ts              # 네비게이션 설정
├── HANDOVER.md                     # ✨ 이 문서
└── CLAUDE.md                       # Claude 작업 가이드
```

---

## 🛠️ 기술 스택

### Frontend
- **Framework**: Next.js 15.5.7 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: lucide-react

### Backend & Database
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage (이미지 업로드)
- **Real-time**: Supabase Realtime (댓글, 좋아요 등)

### Deployment
- **Platform**: Vercel
- **Domain**: aion2ya.com (Vercel에 연결)
- **Environment**: Production, Preview

---

## 🎯 주요 기능

### 1. 커뮤니티
- **위치**: `/board`
- **기능**:
  - 게시글 작성/수정/삭제
  - 댓글 시스템
  - 좋아요 기능
  - 관리자 배지
  - 공지사항 고정
- **DB 테이블**: `posts`, `comments`

### 2. 박제 게시판
- **위치**: `/board/shame`
- **기능**:
  - 비매너 유저 신고 및 검색
  - 신고 횟수 집계
  - 랭킹 시스템
- **DB 테이블**: `shame_posts`

### 3. 시뮬레이터
#### 펫 이해도 시뮬레이터
- **위치**: `/simulator/pet-comprehension`
- **기능**: 펫 스탯 리롤 시뮬레이션 및 기댓값 계산

#### 마석/영석 계산기
- **위치**: `/simulator/manastone`
- **기능**: 자동 각인 기댓값 계산

### 4. 업데이트 내역
- **위치**: `/updates`
- **기능**: 관리자가 작성하는 패치 노트 및 라이브 요약
- **DB 테이블**: `updates`

### 5. 관리자 기능
- **위치**: `/admin`
- **로그인**: `/admin/login`
- **대시보드**: `/admin/dashboard`
- **기능**:
  - 업데이트 작성/수정/삭제
  - 통계 확인
  - 유저 관리 (예정)

---

## 📝 변경된 파일 목록

### 새로 생성된 파일
- `HANDOVER.md` - 이 인수인계서
- `app/page.tsx` (교체됨) - Coming Soon 페이지
- `app/page.aion2ya.tsx` - 원래 홈 페이지 백업
- `app/legacy-home/page.tsx` - 기존 홈 접근용 페이지

### 수정된 파일
- `components/layout/Header.tsx` - 조건부 네비게이션 숨김
- `components/layout/Footer.tsx` - 숨겨진 아이콘 추가

### 변경되지 않은 파일 (기능 유지)
- 모든 `/board` 페이지
- 모든 `/simulator` 페이지
- 모든 `/admin` 페이지
- 모든 `/api` 라우트
- 데이터베이스 설정
- 환경 변수

---

## ⏮️ 되돌리는 방법

### 방법 1: 빠른 복구 (5분)
```bash
# 1. 원래 홈 페이지 복구
mv app/page.tsx app/page.coming-soon.tsx
mv app/page.aion2ya.tsx app/page.tsx

# 2. 임시 페이지 삭제
rm -rf app/legacy-home

# 3. Header와 Footer 되돌리기
git checkout HEAD~1 -- components/layout/Header.tsx
git checkout HEAD~1 -- components/layout/Footer.tsx

# 4. 빌드 및 확인
npm run build
npm run dev
```

### 방법 2: Git으로 완전 복구
```bash
# 이 커밋 이전으로 되돌리기
git log --oneline  # 커밋 해시 확인
git revert [이 작업의 커밋 해시]

# 또는 하드 리셋 (주의: 이후 작업 손실!)
git reset --hard [이전 커밋 해시]
```

### 방법 3: 수동 복구
1. `app/page.aion2ya.tsx` 내용을 복사
2. `app/page.tsx`에 붙여넣기
3. `components/layout/Header.tsx`에서 조건부 로직 제거
4. `components/layout/Footer.tsx`에서 숨겨진 아이콘 제거
5. `app/legacy-home/` 폴더 삭제

---

## 🚀 새 프로젝트 시작 가이드

### 1. 메인 페이지 변경
`app/page.tsx`를 수정하여 새로운 프로젝트의 홈 페이지를 만드세요.

```tsx
// app/page.tsx
export default function HomePage() {
  return (
    <div>
      <h1>새로운 프로젝트</h1>
      {/* 여기에 새로운 내용 추가 */}
    </div>
  );
}
```

### 2. 메타데이터 변경
`app/layout.tsx`의 메타데이터를 새 프로젝트에 맞게 수정하세요.

```tsx
export const metadata: Metadata = {
  title: '새 프로젝트 제목',
  description: '새 프로젝트 설명',
  // ...
};
```

### 3. 기존 기능 제거 (선택사항)
만약 기존 aion2ya 기능이 더 이상 필요 없다면:

```bash
# API 라우트 제거 (선택)
rm -rf app/api/*

# 페이지 제거 (선택)
rm -rf app/board
rm -rf app/simulator
rm -rf app/admin
# ... 등등

# 사용하지 않는 컴포넌트 제거
# (필요한 것만 남기고 삭제)
```

### 4. 새 기능 추가
```bash
# 새 페이지 생성 예시
mkdir -p app/about
echo "export default function AboutPage() { return <div>About</div>; }" > app/about/page.tsx
```

---

## 💾 데이터베이스 정보

### Supabase 프로젝트
- **URL**: 환경 변수 참조 (`NEXT_PUBLIC_SUPABASE_URL`)
- **Key**: 환경 변수 참조 (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)

### 주요 테이블

#### `posts` (커뮤니티 게시글)
```sql
- id: uuid
- title: text
- content: text
- author: text
- post_type: text ('board' | 'suggestion')
- is_admin: boolean
- is_pinned: boolean
- views: integer
- comment_count: integer
- created_at: timestamp
- updated_at: timestamp
```

#### `shame_posts` (박제 게시판)
```sql
- id: bigint
- player_id: text
- server: text
- race: text
- reason: text
- evidence: text
- report_count: integer
- created_at: timestamp
```

#### `updates` (업데이트 내역)
```sql
- id: bigint
- title: text
- content: text
- category: text
- created_at: timestamp
- updated_at: timestamp
```

#### `comments` (댓글)
```sql
- id: uuid
- post_id: uuid (foreign key)
- content: text
- author: text
- created_at: timestamp
```

#### `daily_visitors` (일일 방문자)
```sql
- date: date (primary key)
- count: integer
```

### 데이터 백업 방법
```bash
# Supabase CLI 설치
npm install -g supabase

# 로그인
supabase login

# 프로젝트 연결
supabase link --project-ref [프로젝트 ID]

# 데이터 백업
supabase db dump > backup.sql
```

### 새 프로젝트로 DB 분리하기
만약 새 프로젝트에서 별도의 DB를 사용하고 싶다면:

1. Supabase에서 새 프로젝트 생성
2. `.env.local`에 새 URL과 Key 입력
3. 필요한 테이블만 마이그레이션

---

## 🔐 환경 변수

### 필수 환경 변수 (`.env.local`)
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[프로젝트-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]

# (선택) 관리자 인증
ADMIN_PASSWORD=[관리자 비밀번호]
```

### 환경 변수 관리
- **로컬**: `.env.local` 파일 사용
- **Vercel**: 프로젝트 설정에서 Environment Variables 추가
- **보안**: `.env.local`은 절대 git에 커밋하지 않기 (`.gitignore`에 포함됨)

---

## 🌐 배포 정보

### Vercel 배포 설정
- **프로젝트**: aion2ya
- **Git 연동**: GitHub 리포지토리 자동 배포
- **도메인**: aion2ya.com
- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

### 배포 방법

#### 자동 배포 (권장)
```bash
git add .
git commit -m "커밋 메시지"
git push origin main
# Vercel이 자동으로 배포
```

#### 수동 배포
```bash
# Vercel CLI 설치
npm install -g vercel

# 배포
vercel --prod
```

### 빌드 전 체크리스트
- [ ] `npm run build` 로컬에서 성공하는지 확인
- [ ] TypeScript 에러 없는지 확인 (`npm run type-check`)
- [ ] 환경 변수 Vercel에 등록되어 있는지 확인
- [ ] 데이터베이스 연결 테스트

---

## 📚 추가 문서

### 프로젝트 관련 문서
- `CLAUDE.md` - Claude Code 작업 가이드
- `CLAUDE_SETUP.md` - 대화 기록 동기화 가이드
- `README.md` - 프로젝트 개요
- `ADMIN_GUIDE.md` - 관리자 가이드
- `.claude-commits/` - 상세한 커밋 로그

### 참고 자료
- [Next.js 공식 문서](https://nextjs.org/docs)
- [Supabase 공식 문서](https://supabase.com/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [shadcn/ui 문서](https://ui.shadcn.com)

---

## 🤝 인수인계 체크리스트

### 프로젝트 이해
- [ ] 전체 프로젝트 구조 파악
- [ ] 주요 기능 목록 확인
- [ ] 기술 스택 이해

### 환경 설정
- [ ] Node.js 설치 (v18 이상)
- [ ] 프로젝트 클론 및 `npm install`
- [ ] `.env.local` 파일 설정
- [ ] 로컬 개발 서버 실행 (`npm run dev`)

### 데이터베이스
- [ ] Supabase 프로젝트 접근 권한 확인
- [ ] 테이블 구조 파악
- [ ] 테스트 데이터 확인

### 배포
- [ ] Vercel 계정 접근 권한 확인
- [ ] 도메인 설정 확인
- [ ] 환경 변수 확인

### 문서 읽기
- [ ] 이 인수인계서 전체 읽기
- [ ] `CLAUDE.md` 읽기 (Claude Code 사용 시)
- [ ] `README.md` 읽기

---

## 💬 질문 & 지원

### 자주 묻는 질문

**Q: 원래 아이온2야 사이트로 어떻게 접근하나요?**
A: 푸터 왼쪽 하단의 작은 로고를 클릭하거나, `/legacy-home` URL로 직접 접근하세요.

**Q: 데이터가 손실되나요?**
A: 아니요. 모든 데이터와 기능은 그대로 유지됩니다. 메인 페이지만 변경됩니다.

**Q: 원래대로 되돌리고 싶어요.**
A: 위의 "되돌리는 방법" 섹션을 참조하세요. 5분 안에 복구 가능합니다.

**Q: 새 프로젝트를 시작하려면?**
A: `app/page.tsx`를 수정하고, 필요 없는 기존 페이지들을 제거하세요.

**Q: DB는 어떻게 관리하나요?**
A: Supabase 대시보드에서 관리하거나, SQL 쿼리로 직접 접근할 수 있습니다.

### 연락처
- **개발자**: [연락처 추가]
- **프로젝트 리포지토리**: [GitHub URL]
- **Supabase 프로젝트**: [Supabase 대시보드 URL]

---

## 🎉 마무리

이 문서는 aion2ya 프로젝트를 인수인계받는 분을 위해 작성되었습니다.

### 핵심 요약
1. **메인 페이지만 변경**되었습니다 (Coming Soon)
2. **모든 기능은 그대로** 유지되며, 숨겨진 아이콘으로 접근 가능
3. **언제든 되돌릴 수 있습니다** (백업 파일 보관됨)
4. **새 프로젝트 시작이 쉽습니다** (메인 페이지만 수정하면 됨)

궁금한 점이 있으면 위의 문서를 참조하거나, 코드에 주석으로 상세히 설명되어 있습니다.

**행운을 빕니다! 🚀**

---

**문서 버전**: 1.0
**최종 수정일**: 2026-02-07
**작성자**: Claude Code
