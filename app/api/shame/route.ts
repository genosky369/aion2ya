import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// IP 추출 함수 (Vercel 환경 대응)
function getClientIP(request: NextRequest): string {
  // Vercel/Cloudflare 환경에서는 x-forwarded-for 사용
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // 여러 IP가 있을 경우 첫 번째가 실제 클라이언트 IP
    return forwardedFor.split(',')[0].trim();
  }

  // x-real-ip 헤더 확인
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // 로컬 개발 환경
  return '127.0.0.1';
}

// 오늘 날짜의 시작 시간 (UTC 기준 한국 시간 00:00)
function getTodayStart(): string {
  const now = new Date();
  // 한국 시간 기준 오늘 00:00:00
  const koreaOffset = 9 * 60 * 60 * 1000; // UTC+9
  const koreaTime = new Date(now.getTime() + koreaOffset);
  koreaTime.setUTCHours(0, 0, 0, 0);
  const todayStart = new Date(koreaTime.getTime() - koreaOffset);
  return todayStart.toISOString();
}

// POST: 박제 게시글 작성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { player_id, server, race, reason, screenshot_url } = body;

    // 유효성 검사
    if (!player_id || !server || !race || !reason) {
      return NextResponse.json(
        { success: false, error: '모든 필수 항목을 입력해주세요.' },
        { status: 400 }
      );
    }

    // 클라이언트 IP 추출
    const clientIP = getClientIP(request);
    const todayStart = getTodayStart();

    // === 제한 체크 1: 오늘 이 IP로 작성한 글이 3개 미만인지 확인 ===
    const { data: todayPosts, error: countError } = await supabase
      .from('shame_posts')
      .select('id')
      .eq('ip_address', clientIP)
      .gte('created_at', todayStart);

    if (countError) {
      console.error('글 수 조회 오류:', countError);
      return NextResponse.json(
        { success: false, error: '서버 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    if (todayPosts && todayPosts.length >= 3) {
      return NextResponse.json(
        {
          success: false,
          error: '하루에 최대 3개까지만 박제할 수 있습니다. 내일 다시 시도해주세요.',
          errorType: 'DAILY_LIMIT_EXCEEDED'
        },
        { status: 429 }
      );
    }

    // === 제한 체크 2: 같은 IP로 같은 (player_id + server) 신고 이력이 없는지 확인 ===
    const { data: existingReport, error: duplicateError } = await supabase
      .from('shame_posts')
      .select('id')
      .eq('ip_address', clientIP)
      .eq('player_id', player_id)
      .eq('server', server)
      .limit(1);

    if (duplicateError) {
      console.error('중복 체크 오류:', duplicateError);
      return NextResponse.json(
        { success: false, error: '서버 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    if (existingReport && existingReport.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `이미 ${server} 서버의 "${player_id}" 유저를 신고하셨습니다. 같은 유저를 중복으로 신고할 수 없습니다.`,
          errorType: 'DUPLICATE_REPORT'
        },
        { status: 409 }
      );
    }

    // === 제한 통과: 게시글 생성 ===
    const { data: newPost, error: insertError } = await supabase
      .from('shame_posts')
      .insert([
        {
          player_id: player_id.trim(),
          server,
          race,
          reason: reason.trim(),
          screenshot_url: screenshot_url || null,
          report_count: 1,
          ip_address: clientIP,
        },
      ])
      .select()
      .single();

    if (insertError) {
      console.error('게시글 작성 오류:', insertError);
      return NextResponse.json(
        { success: false, error: '박제 등록에 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, post: newPost },
      { status: 201 }
    );
  } catch (error) {
    console.error('박제 작성 오류:', error);
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
