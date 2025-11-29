import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { hashPassword, verifyPassword, isAdmin, generateId } from '@/lib/utils';

// GET: 특정 게시글의 댓글 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json(
        { success: false, error: '게시글 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const { data: comments, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('댓글 조회 오류:', error);
      return NextResponse.json(
        { success: false, error: '댓글을 불러오는데 실패했습니다.' },
        { status: 500 }
      );
    }

    // 프론트엔드 형식에 맞게 변환
    const formattedComments = (comments || []).map(comment => ({
      id: comment.id,
      postId: comment.post_id,
      content: comment.content,
      author: comment.author,
      isAdmin: comment.is_admin,
      date: comment.created_at,
    }));

    return NextResponse.json({ success: true, comments: formattedComments });
  } catch (error) {
    console.error('댓글 조회 오류:', error);
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// POST: 댓글 작성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId, content, author, password } = body;

    // 유효성 검사
    if (!postId || !content || !author || !password) {
      return NextResponse.json(
        { success: false, error: '모든 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 관리자 여부 확인
    const isAdminUser = isAdmin(password);

    // 비밀번호 해싱
    const hashedPassword = await hashPassword(password);

    // 댓글 생성
    const newComment = {
      id: generateId(),
      post_id: postId,
      content: content.trim(),
      author: isAdminUser ? '관리자' : author.trim(),
      is_admin: isAdminUser,
      password: hashedPassword,
    };

    const { error } = await supabase
      .from('comments')
      .insert([newComment]);

    if (error) {
      console.error('댓글 작성 오류:', error);
      return NextResponse.json(
        { success: false, error: '댓글 작성에 실패했습니다.' },
        { status: 500 }
      );
    }

    // 게시글의 댓글 수 증가
    await supabase.rpc('increment_comment_count', { post_id: postId });

    return NextResponse.json({
      success: true,
      comment: {
        ...newComment,
        postId: newComment.post_id,
        isAdmin: newComment.is_admin,
        date: new Date().toISOString(),
      }
    }, { status: 201 });
  } catch (error) {
    console.error('댓글 작성 오류:', error);
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// DELETE: 댓글 삭제
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const password = searchParams.get('password');

    if (!id || !password) {
      return NextResponse.json(
        { success: false, error: 'ID와 비밀번호를 입력해주세요.' },
        { status: 400 }
      );
    }

    const { data: comment, error: fetchError } = await supabase
      .from('comments')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !comment) {
      return NextResponse.json(
        { success: false, error: '댓글을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 관리자 비밀번호 체크
    const isAdminPassword = isAdmin(password);

    if (isAdminPassword) {
      await supabase.from('comments').delete().eq('id', id);
      // 게시글의 댓글 수 감소
      await supabase.rpc('decrement_comment_count', { post_id: comment.post_id });
      return NextResponse.json({ success: true, deletedBy: 'admin' });
    }

    // 작성자 비밀번호 체크
    const isPasswordValid = await verifyPassword(password, comment.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: '비밀번호가 일치하지 않습니다.' },
        { status: 403 }
      );
    }

    await supabase.from('comments').delete().eq('id', id);
    // 게시글의 댓글 수 감소
    await supabase.rpc('decrement_comment_count', { post_id: comment.post_id });

    return NextResponse.json({ success: true, deletedBy: 'author' });
  } catch (error) {
    console.error('댓글 삭제 오류:', error);
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
