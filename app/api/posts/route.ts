import { NextRequest, NextResponse } from 'next/server';
import { supabase, Post } from '@/lib/supabase';
import { hashPassword, isAdmin, generateId } from '@/lib/utils';

// GET: 게시글 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as 'board' | 'suggestion' | null;
    const id = searchParams.get('id');

    // 특정 게시글 조회
    if (id) {
      const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !post) {
        return NextResponse.json(
          { success: false, error: '게시글을 찾을 수 없습니다.' },
          { status: 404 }
        );
      }

      // 조회수 증가
      await supabase
        .from('posts')
        .update({ views: post.views + 1 })
        .eq('id', id);

      // 프론트엔드 형식에 맞게 변환
      const formattedPost = {
        ...post,
        type: post.post_type,
        isAdmin: post.is_admin,
        date: post.created_at,
        commentCount: post.comment_count,
      };

      return NextResponse.json({ success: true, post: formattedPost });
    }

    // 게시글 목록 조회
    if (!type || (type !== 'board' && type !== 'suggestion')) {
      return NextResponse.json(
        { success: false, error: '유효하지 않은 타입입니다.' },
        { status: 400 }
      );
    }

    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .eq('post_type', type)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('게시글 조회 오류:', error);
      return NextResponse.json(
        { success: false, error: '서버 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // 프론트엔드 형식에 맞게 변환
    const formattedPosts = (posts || []).map(post => ({
      ...post,
      type: post.post_type,
      isAdmin: post.is_admin,
      date: post.created_at,
      commentCount: post.comment_count,
    }));

    return NextResponse.json({ success: true, posts: formattedPosts });
  } catch (error) {
    console.error('게시글 조회 오류:', error);
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// POST: 게시글 작성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, author, password, type } = body;

    // 유효성 검사
    if (!title || !content || !author || !password || !type) {
      return NextResponse.json(
        { success: false, error: '모든 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    if (type !== 'board' && type !== 'suggestion') {
      return NextResponse.json(
        { success: false, error: '유효하지 않은 타입입니다.' },
        { status: 400 }
      );
    }

    // 관리자 여부 확인
    const isAdminUser = isAdmin(password);

    // 비밀번호 해싱
    const hashedPassword = await hashPassword(password);

    // 게시글 생성
    const newPost = {
      id: generateId(),
      title: title.trim(),
      content: content.trim(),
      author: isAdminUser ? '관리자' : author.trim(),
      is_admin: isAdminUser,
      password: hashedPassword,
      post_type: type,
      views: 0,
      comment_count: 0,
    };

    const { error } = await supabase
      .from('posts')
      .insert([newPost]);

    if (error) {
      console.error('게시글 작성 오류:', error);
      return NextResponse.json(
        { success: false, error: '게시글 작성에 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, post: newPost }, { status: 201 });
  } catch (error) {
    console.error('게시글 작성 오류:', error);
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// DELETE: 게시글 삭제
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

    const { data: post, error: fetchError } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !post) {
      return NextResponse.json(
        { success: false, error: '게시글을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 1. 관리자 비밀번호 체크 (관리자는 모든 게시글 삭제 가능)
    const isAdminPassword = isAdmin(password);

    if (isAdminPassword) {
      // 관리자 비밀번호가 맞으면 즉시 삭제
      await supabase.from('posts').delete().eq('id', id);
      return NextResponse.json({ success: true, deletedBy: 'admin' });
    }

    // 2. 작성자 비밀번호 체크
    const { verifyPassword } = await import('@/lib/utils');
    const isPasswordValid = await verifyPassword(password, post.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: '비밀번호가 일치하지 않습니다.' },
        { status: 403 }
      );
    }

    await supabase.from('posts').delete().eq('id', id);

    return NextResponse.json({ success: true, deletedBy: 'author' });
  } catch (error) {
    console.error('게시글 삭제 오류:', error);
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
