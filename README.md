# 아이온2야.com

> 아이온2 커뮤니티 & 정보 사이트

## 🎮 프로젝트 소개

아이온2 게임 정보 제공, 패키지 효율 계산, 커뮤니티 운영을 위한 종합 정보 사이트입니다.

### 주요 기능

- ✅ **메인 페이지**: FAQ, 유튜브 영상, 출시 정보 3단 레이아웃
- ✅ **게시판**: 관리자 전용 공지사항 게시판
- ✅ **건의사항**: 모든 유저가 익명으로 작성 가능한 게시판
- ✅ **검색 기능**: 제목/내용 통합 검색
- 🚧 **패키지 효율 계산기**: 준비 중 (킬러 콘텐츠)

## 🛠 기술 스택

- **프론트엔드**: Next.js 15, React 19, TypeScript
- **스타일링**: Tailwind CSS
- **아이콘**: lucide-react
- **데이터베이스**: JSON 파일 기반 (Phase 1) → Supabase (Phase 2)
- **배포**: Vercel

## 📁 프로젝트 구조

```
aion2ya/
├── app/                      # Next.js App Router
│   ├── page.tsx             # 메인 페이지
│   ├── board/               # 게시판
│   │   ├── page.tsx        # 목록
│   │   └── write/page.tsx  # 글쓰기
│   ├── suggestion/          # 건의사항
│   │   ├── page.tsx
│   │   └── write/page.tsx
│   ├── calculator/          # 패키지 효율 계산기
│   │   └── page.tsx
│   └── api/                 # API Routes
│       └── posts/route.ts
├── components/              # React 컴포넌트
│   ├── Header.tsx          # 헤더/네비게이션
│   ├── FAQSection.tsx      # FAQ 섹션
│   ├── YoutubeVideos.tsx   # 유튜브 영상
│   ├── SideInfo.tsx        # 우측 정보
│   └── PostCard.tsx        # 게시글 카드
├── lib/                     # 유틸리티 함수
│   ├── constants.ts        # 상수 (FAQ, 유튜브 등)
│   ├── utils.ts            # 헬퍼 함수
│   └── storage.ts          # 데이터 저장소
├── types/                   # TypeScript 타입
│   └── index.ts
└── data/                    # JSON 데이터 파일
    ├── posts.json
    └── comments.json
```

## 🚀 시작하기

### 1. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

### 2. 빌드

```bash
npm run build
```

### 3. 프로덕션 실행

```bash
npm start
```

## 🔑 관리자 기능

### 관리자 비밀번호

- 비밀번호: `admin1234` (글쓰기 시 입력)
- 관리자로 인증 시 자동으로 "관리자" 닉네임과 빨간색 배지 표시

### 권한

- **게시판**: 관리자만 글 작성 가능
- **건의사항**: 모든 유저 작성 가능 (익명)

## 📊 데이터 관리

### 현재 (Phase 1)

- JSON 파일 기반 로컬 스토리지
- 파일 위치: `data/posts.json`, `data/comments.json`

### 향후 (Phase 2)

- Supabase PostgreSQL 연동 예정
- 실시간 기능 지원
- 이미지 업로드 기능

## 🎨 디자인 시스템

### 색상 팔레트

```css
/* 배경 */
--gray-900: #111827;  /* 메인 배경 */
--gray-800: #1F2937;  /* 카드 배경 */
--gray-700: #374151;  /* 서브 카드 */

/* 강조색 */
--blue-600: #2563EB;  /* 네비게이션, 버튼 */
--red-600: #DC2626;   /* 관리자 배지 */
--yellow-400: #FBBF24; /* 오픈채팅 */
```

## 📱 반응형 디자인

- **모바일 우선** 디자인
- 데스크톱: 3단 레이아웃
- 태블릿/모바일: 세로 스택

## 🔐 보안

- ✅ 비밀번호 bcrypt 해싱 (10 rounds)
- ✅ XSS 방어
- 🚧 CSRF 토큰 (추가 예정)
- 🚧 Rate Limiting (추가 예정)

## 📅 로드맵

### Phase 1: MVP (완료) ✅

- [x] 메인 페이지 3단 레이아웃
- [x] 게시판/건의사항 기능
- [x] 검색 기능
- [x] JSON 기반 데이터 관리

### Phase 2: 출시 준비 (예정)

- [ ] Supabase 연동
- [ ] 댓글 기능
- [ ] 도메인 연결 (aion2ya.com)
- [ ] Google AdSense 적용
- [ ] SEO 최적화

### Phase 3: 확장 (예정)

- [ ] 패키지 효율 계산기 개발
- [ ] 유튜브 API 연동 (최신 영상 자동 업데이트)
- [ ] 오픈채팅 링크 연결
- [ ] 관리자 대시보드
- [ ] 통계/분석

## 🌐 배포

### Vercel 배포

1. GitHub 저장소 연결
2. Vercel에서 자동 배포
3. 환경변수 설정 (Phase 2 이후)

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
ADMIN_PASSWORD=your_admin_password
```

## 📈 목표 지표

### 초기 목표 (출시 후 1개월)

- DAU: 500명
- MAU: 2,000명
- 페이지뷰: 10,000/일
- 광고 수익: 월 10만원+

## 🤝 기여

이 프로젝트는 아이온2 커뮤니티를 위한 팬 사이트입니다.

## 📄 라이선스

본 사이트는 NCSOFT와 무관한 팬 사이트입니다.

## 📞 문의

- 웹사이트: https://www.aion2ya.com
- 건의사항: 사이트 내 건의사항 게시판 이용

---

**🎮 아이온2 정식 출시: 2025년 11월 19일**
