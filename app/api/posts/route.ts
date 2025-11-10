import { NextRequest, NextResponse } from 'next/server';
import { Post, PostFormData } from '@/types';
import { getPostsByType, addPost, getPostById, updatePost, deletePost } from '@/lib/storage';
import { hashPassword, isAdmin, generateId } from '@/lib/utils';

// GET: 게시글 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as 'board' | 'suggestion' | null;
    const id = searchParams.get('id');

    // 특정 게시글 조회
    if (id) {
      const post = getPostById(id);
      if (!post) {
        return NextResponse.json(
          { success: false, error: '게시글을 찾을 수 없습니다.' },
          { status: 404 }
        );
      }

      // 조회수 증가
      updatePost(id, { views: post.views + 1 });
      const updatedPost = getPostById(id);

      return NextResponse.json({ success: true, post: updatedPost });
    }

    // 게시글 목록 조회
    if (!type || (type !== 'board' && type !== 'suggestion')) {
      return NextResponse.json(
        { success: false, error: '유효하지 않은 타입입니다.' },
        { status: 400 }
      );
    }

    const posts = getPostsByType(type);
    return NextResponse.json({ success: true, posts });
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
    const body: PostFormData = await request.json();
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

    // 게시판은 관리자만 작성 가능
    if (type === 'board' && !isAdminUser) {
      return NextResponse.json(
        { success: false, error: '게시판은 관리자만 작성할 수 있습니다.' },
        { status: 403 }
      );
    }

    // 비밀번호 해싱
    const hashedPassword = await hashPassword(password);

    // 게시글 생성
    const newPost: Post = {
      id: generateId(),
      title: title.trim(),
      content: content.trim(),
      author: isAdminUser ? '관리자' : author.trim(),
      isAdmin: isAdminUser,
      password: hashedPassword,
      date: new Date().toISOString(),
      views: 0,
      commentCount: 0,
      type,
    };

    addPost(newPost);

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

    const post = getPostById(id);
    if (!post) {
      return NextResponse.json(
        { success: false, error: '게시글을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 비밀번호 확인
    const { verifyPassword } = await import('@/lib/utils');
    const isPasswordValid = await verifyPassword(password, post.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: '비밀번호가 일치하지 않습니다.' },
        { status: 403 }
      );
    }

    deletePost(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('게시글 삭제 오류:', error);
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
