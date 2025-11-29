import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import jwt from 'jsonwebtoken';

// JWT 토큰 검증 헬퍼 함수
function verifyAdminToken(token: string): boolean {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) return false;

    const decoded = jwt.verify(token, JWT_SECRET) as { username: string; role: string };
    return decoded.role === 'admin';
  } catch {
    return false;
  }
}

// POST: 공지 설정 (관리자 전용)
export async function POST(request: NextRequest) {
  try {
    // 관리자 토큰 확인
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const isValidToken = verifyAdminToken(token);

    if (!isValidToken) {
      return NextResponse.json(
        { success: false, error: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { postId, postType } = body;

    if (!postId || !postType) {
      return NextResponse.json(
        { success: false, error: '게시글 ID와 타입이 필요합니다.' },
        { status: 400 }
      );
    }

    // 해당 타입의 모든 공지 해제
    const { error: unpinError } = await supabase
      .from('posts')
      .update({ is_pinned: false })
      .eq('post_type', postType)
      .eq('is_pinned', true);

    if (unpinError) {
      console.error('공지 해제 오류:', unpinError);
      return NextResponse.json(
        { success: false, error: '공지 설정에 실패했습니다.' },
        { status: 500 }
      );
    }

    // 선택한 게시글을 공지로 설정
    const { error: pinError } = await supabase
      .from('posts')
      .update({ is_pinned: true })
      .eq('id', postId);

    if (pinError) {
      console.error('공지 설정 오류:', pinError);
      return NextResponse.json(
        { success: false, error: '공지 설정에 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: '공지로 설정되었습니다.' });
  } catch (error) {
    console.error('공지 설정 오류:', error);
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// DELETE: 공지 해제 (관리자 전용)
export async function DELETE(request: NextRequest) {
  try {
    // 관리자 토큰 확인
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const isValidToken = verifyAdminToken(token);

    if (!isValidToken) {
      return NextResponse.json(
        { success: false, error: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json(
        { success: false, error: '게시글 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    // 공지 해제
    const { error } = await supabase
      .from('posts')
      .update({ is_pinned: false })
      .eq('id', postId);

    if (error) {
      console.error('공지 해제 오류:', error);
      return NextResponse.json(
        { success: false, error: '공지 해제에 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: '공지가 해제되었습니다.' });
  } catch (error) {
    console.error('공지 해제 오류:', error);
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
