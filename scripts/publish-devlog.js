#!/usr/bin/env node

/**
 * 개발일지 퍼블리시 스크립트
 * PM 에이전트가 생성한 JSON 파일을 Supabase에 업로드한다.
 *
 * 사용법: node scripts/publish-devlog.js .claude/devlogs/2026-02-08.json
 */

const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://dqzdjcdkqiozkdddquir.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxemRqY2RrcWlvemtkZGRxdWlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNTc2NjcsImV4cCI6MjA3OTgzMzY2N30.5shYvV0wWrPg99ce2eDD9SelVPPkVaQrSCxNPGxD8QU";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function main() {
  const jsonPath = process.argv[2];

  if (!jsonPath) {
    console.error("사용법: node scripts/publish-devlog.js <json-file-path>");
    console.error("예시:  node scripts/publish-devlog.js .claude/devlogs/2026-02-08.json");
    process.exit(1);
  }

  const absPath = path.resolve(jsonPath);
  if (!fs.existsSync(absPath)) {
    console.error(`파일을 찾을 수 없습니다: ${absPath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(absPath, "utf-8");
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    console.error("JSON 파싱 실패:", e.message);
    process.exit(1);
  }

  // 필수 필드 검증
  const required = ["date", "title", "summary", "content"];
  for (const field of required) {
    if (!data[field]) {
      console.error(`필수 필드가 누락되었습니다: ${field}`);
      process.exit(1);
    }
  }

  console.log(`개발일지 업로드 중... (${data.date})`);

  // devlogs 테이블에 upsert (같은 날짜면 덮어쓰기)
  const { data: devlog, error: devlogError } = await supabase
    .from("devlogs")
    .upsert(
      {
        date: data.date,
        title: data.title,
        summary: data.summary,
        content: data.content,
        tags: data.tags || [],
      },
      { onConflict: "date" }
    )
    .select()
    .single();

  if (devlogError) {
    console.error("devlogs 업로드 실패:", devlogError.message);
    process.exit(1);
  }

  console.log(`devlog 저장 완료 (id: ${devlog.id})`);

  // work_items가 있으면 업로드
  if (data.work_items && data.work_items.length > 0) {
    // 기존 work_items 삭제 후 재삽입
    const { error: deleteError } = await supabase
      .from("devlog_work_items")
      .delete()
      .eq("devlog_id", devlog.id);

    if (deleteError) {
      console.error("기존 work_items 삭제 실패:", deleteError.message);
      process.exit(1);
    }

    const workItems = data.work_items.map((item, index) => ({
      devlog_id: devlog.id,
      category: item.category,
      title: item.title,
      description: item.description || "",
      order_index: index,
    }));

    const { error: itemsError } = await supabase
      .from("devlog_work_items")
      .insert(workItems);

    if (itemsError) {
      console.error("work_items 업로드 실패:", itemsError.message);
      process.exit(1);
    }

    console.log(`work_items ${workItems.length}건 저장 완료`);
  }

  console.log(`\n개발일지 발행 완료!`);
  console.log(`날짜: ${data.date}`);
  console.log(`제목: ${data.title}`);
  console.log(`태그: ${(data.tags || []).join(", ")}`);
}

main().catch((err) => {
  console.error("오류 발생:", err);
  process.exit(1);
});
