# 🤖 Claude Code 대화 기록 동기화 가이드

이 문서는 여러 PC에서 Claude Code 대화 기록을 동기화하는 방법을 설명합니다.

---

## 📁 대화 기록 위치

대화 기록은 프로젝트 폴더 안에 저장됩니다:
```
aion2ya/.claude-history/history.jsonl
```

---

## 🏠 현재 PC에서 작업 종료 시

### 1. 대화 기록 백업
```bash
cp ~/.claude/history.jsonl .claude-history/
```

### 2. Git에 저장
```bash
git add .claude-history/
git commit -m "Update Claude conversation history"
git push
```

**또는 Claude에게 이렇게 요청하세요:**
```
"대화 기록 백업하고 Git에 올려줘"
```

---

## 💻 다른 PC로 이동 시

### 1. 프로젝트 클론 (최초 1회만)
```bash
cd C:\Users\사용자이름\Desktop
git clone https://github.com/genosky369/aion2ya.git
cd aion2ya
npm install
```

### 2. 최신 코드 받기
```bash
git pull
```

### 3. 대화 기록 복원
```bash
cp .claude-history/history.jsonl ~/.claude/history.jsonl
```

**또는 Claude에게 이렇게 요청하세요:**
```
"Git에서 받아줘"
"대화 기록 복원해줘"
```

### 4. Claude Code 재시작
- VS Code에서 Claude Code 확장 재시작
- 또는 VS Code 자체를 재시작

---

## 🔄 일상적인 워크플로우

### 🏠 집 PC → 🏢 회사 PC로 이동

#### 집에서 (작업 종료)
```
나: "작업 끝났어. 대화 기록 백업하고 Git에 올려줘"
```

#### 회사에서 (작업 시작)
```
나: "Git에서 받아줘"
나: "대화 기록 복원해줘"
```

### 🏢 회사 PC → 🏠 집 PC로 이동

#### 회사에서 (작업 종료)
```
나: "작업 끝났어. 대화 기록 백업하고 Git에 올려줘"
```

#### 집에서 (작업 시작)
```
나: "Git에서 받아줘"
나: "대화 기록 복원해줘"
```

---

## ⚡ 빠른 명령어 모음

### 백업 + Push
```bash
cp ~/.claude/history.jsonl .claude-history/ && git add .claude-history/ && git commit -m "Update conversation history" && git push
```

### Pull + 복원
```bash
git pull && cp .claude-history/history.jsonl ~/.claude/history.jsonl
```

---

## 🚨 문제 해결

### 대화 기록이 복원되지 않을 때
1. Claude Code 완전히 종료
2. 대화 기록 다시 복원
   ```bash
   cp .claude-history/history.jsonl ~/.claude/history.jsonl
   ```
3. Claude Code 재시작

### 대화 기록 파일이 없을 때
```bash
# 수동으로 백업
mkdir -p .claude-history
cp ~/.claude/history.jsonl .claude-history/
git add .claude-history/
git commit -m "Add Claude conversation history"
git push
```

---

## 📝 주의사항

1. **항상 작업 시작 전에 `git pull` 먼저!**
   - 다른 PC에서 한 작업을 받아야 합니다

2. **작업 종료 시 대화 기록 백업 잊지 마세요!**
   - 안 그러면 다른 PC에서 이전 대화를 볼 수 없습니다

3. **민감한 정보 주의**
   - 대화 기록에는 코드와 대화 내용이 모두 포함됩니다
   - private repository 사용 권장

---

## 💡 팁

### VSCode에서 간편하게
1. **터미널 단축키**: Ctrl + ` (백틱)
2. **명령어 히스토리**: 위/아래 화살표
3. **여러 터미널**: Ctrl + Shift + `

### Git 별칭 설정 (선택사항)
```bash
# 백업 명령 별칭
git config --global alias.backup-claude "!cp ~/.claude/history.jsonl .claude-history/ && git add .claude-history/ && git commit -m 'Update Claude history' && git push"

# 복원 명령 별칭
git config --global alias.restore-claude "!git pull && cp .claude-history/history.jsonl ~/.claude/history.jsonl"

# 사용법
git backup-claude
git restore-claude
```

---

## ✅ 체크리스트

### 새 PC 설정 (최초 1회)
- [ ] Git 설치
- [ ] Node.js 설치
- [ ] Claude Code 설치
- [ ] 프로젝트 클론
- [ ] npm install
- [ ] 대화 기록 복원
- [ ] Claude Code 재시작

### 일상적인 작업
- [ ] 작업 시작: git pull
- [ ] 작업 시작: 대화 기록 복원
- [ ] 작업 중: 코딩...
- [ ] 작업 종료: 대화 기록 백업
- [ ] 작업 종료: git push

---

## 🆘 도움말

문제가 생기면 Claude Code에서 이렇게 물어보세요:
```
"대화 기록 백업 어떻게 해?"
"대화 기록 복원 어떻게 해?"
"Git 명령어 도움말"
```

---

**작성일**: 2025-11-11
**프로젝트**: 아이온2야.com
