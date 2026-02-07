# 📝 커밋 로그 시스템

이 폴더는 Claude가 작업한 모든 커밋에 대한 상세 내역을 저장합니다.

## 📂 폴더 구조

```
.claude-commits/
├── 2025-11-27/           # 날짜별 폴더 (YYYY-MM-DD 형식)
│   └── daily-log.md      # 해당 날짜의 모든 커밋 기록
├── 2025-11-28/
│   └── daily-log.md
├── archive/              # 14일 이상 지난 커밋 아카이브
│   ├── 2025-11-summary.md
│   └── 2025-12-summary.md
└── README.md             # 이 파일
```

## 📋 daily-log.md 형식

각 날짜 폴더의 `daily-log.md`는 다음 형식을 따릅니다:

```markdown
# YYYY-MM-DD 작업 일지

## 📊 오늘의 작업 요약
- 총 커밋 수: N개
- 주요 작업: ...
- 소요 시간: ...

## 📝 커밋 내역

### [HH:MM] 커밋 메시지
**커밋 해시**: `abc1234`

#### 🎯 작업 내용
...

#### 💡 의도 및 배경
...

#### 🔧 기술적 변경사항
...

#### ⚠️ 주의사항
...

#### 🔗 관련 항목
...
```

## 🔄 아카이브 정책

- **기준**: 14일 이상 지난 커밋
- **처리**: 월별 요약 문서로 통합
- **위치**: `archive/YYYY-MM-summary.md`
- **내용**: 주요 변경사항 요약 + git log 참조

## 🎯 목적

1. **맥락 유지**: Claude가 작업 시작 전 최근 작업 맥락 파악
2. **작업 기록**: 게임 개발사 스타일의 체계적인 커밋 로그
3. **협업 지원**: 다른 개발자가 프로젝트 진행 상황 이해
4. **품질 관리**: 모든 변경사항의 의도와 배경 문서화

## 📖 사용 방법

### Claude 작업 시작 시
```bash
# 최근 커밋 로그 확인
ls -lt .claude-commits/ | head -5
cat .claude-commits/YYYY-MM-DD/daily-log.md
```

### 커밋 후
Claude가 자동으로 해당 날짜 폴더에 커밋 내역을 기록합니다.

### 아카이브 확인
```bash
cat .claude-commits/archive/YYYY-MM-summary.md
```

## 🔗 관련 문서

- `claude.md`: Claude 작업 가이드 전체
- `CLAUDE_SETUP.md`: 대화 기록 동기화 가이드
- `.claude-history/`: 대화 기록 백업

---

**작성일**: 2025-11-27
**프로젝트**: 아이온2야.com
