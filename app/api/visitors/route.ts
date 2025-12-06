import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// 방문자 ID 생성을 위한 해시 함수
async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex.substring(0, 32); // 32자리로 자르기
}

// 오늘 날짜를 한국 시간 기준으로 가져오기 (UTC+9)
function getTodayKST(): string {
  const now = new Date();
  const kstOffset = 9 * 60; // KST는 UTC+9
  const kstTime = new Date(now.getTime() + kstOffset * 60 * 1000);
  return kstTime.toISOString().split('T')[0]; // YYYY-MM-DD 형식
}

// POST: 방문자 기록
export async function POST(request: NextRequest) {
  try {
    // IP 주소와 User-Agent로 방문자 식별
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referrer = request.headers.get('referer') || null;

    // 방문자 고유 ID 생성 (IP + User-Agent 조합의 해시)
    const visitorId = await hashString(`${ip}-${userAgent}`);

    // 한국 시간 기준 오늘 날짜
    const today = getTodayKST();

    // 오늘 이미 방문했는지 확인
    const { data: existingVisit, error: selectError } = await supabase
      .from('daily_visitors')
      .select('id, visit_count')
      .eq('visitor_id', visitorId)
      .eq('visit_date', today)
      .single();

    if (selectError && selectError.code !== 'PGRST116') {
      // PGRST116은 "no rows returned" 에러 - 새 방문자
      console.error('Select error:', selectError);
    }

    if (existingVisit) {
      // 재방문: visit_count 증가, last_visit_at 업데이트
      const { error: updateError } = await supabase
        .from('daily_visitors')
        .update({
          visit_count: existingVisit.visit_count + 1,
          last_visit_at: new Date().toISOString(),
        })
        .eq('id', existingVisit.id);

      if (updateError) {
        console.error('Update error:', updateError);
        return NextResponse.json({ error: 'Failed to update visit' }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        isNewVisitor: false,
        visitCount: existingVisit.visit_count + 1
      });
    } else {
      // 새 방문자: 레코드 생성
      const { error: insertError } = await supabase
        .from('daily_visitors')
        .insert({
          visitor_id: visitorId,
          visit_date: today,
          user_agent: userAgent.substring(0, 500), // 길이 제한
          referrer: referrer?.substring(0, 500),
        });

      if (insertError) {
        console.error('Insert error:', insertError);
        return NextResponse.json({ error: 'Failed to record visit' }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        isNewVisitor: true,
        visitCount: 1
      });
    }
  } catch (error) {
    console.error('Visitor tracking error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET: 오늘 방문자 통계 (관리자용)
export async function GET(request: NextRequest) {
  try {
    const today = getTodayKST();

    // 오늘 순방문자 수
    const { count: todayVisitors, error: todayError } = await supabase
      .from('daily_visitors')
      .select('*', { count: 'exact', head: true })
      .eq('visit_date', today);

    if (todayError) {
      console.error('Today visitors error:', todayError);
      return NextResponse.json({ error: 'Failed to fetch today visitors' }, { status: 500 });
    }

    // 어제 순방문자 수 (비교용)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKST = new Date(yesterday.getTime() + 9 * 60 * 60 * 1000);
    const yesterdayStr = yesterdayKST.toISOString().split('T')[0];

    const { count: yesterdayVisitors, error: yesterdayError } = await supabase
      .from('daily_visitors')
      .select('*', { count: 'exact', head: true })
      .eq('visit_date', yesterdayStr);

    // 총 누적 방문자 수
    const { count: totalVisitors, error: totalError } = await supabase
      .from('daily_visitors')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({
      today: todayVisitors || 0,
      yesterday: yesterdayVisitors || 0,
      total: totalVisitors || 0,
      date: today,
    });
  } catch (error) {
    console.error('Get visitors error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
