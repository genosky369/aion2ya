import { Post, Comment } from '@/types';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');
const COMMENTS_FILE = path.join(DATA_DIR, 'comments.json');

// 데이터 디렉토리 확인 및 생성
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// 파일이 없으면 빈 배열로 초기화
function ensureFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]), 'utf-8');
  }
}

// 게시글 로드
export function loadPosts(): Post[] {
  try {
    ensureDataDir();
    ensureFile(POSTS_FILE);
    const data = fs.readFileSync(POSTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('게시글 로드 오류:', error);
    return [];
  }
}

// 게시글 저장
export function savePosts(posts: Post[]): void {
  try {
    ensureDataDir();
    fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2), 'utf-8');
  } catch (error) {
    console.error('게시글 저장 오류:', error);
  }
}

// 댓글 로드
export function loadComments(): Comment[] {
  try {
    ensureDataDir();
    ensureFile(COMMENTS_FILE);
    const data = fs.readFileSync(COMMENTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('댓글 로드 오류:', error);
    return [];
  }
}

// 댓글 저장
export function saveComments(comments: Comment[]): void {
  try {
    ensureDataDir();
    fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2), 'utf-8');
  } catch (error) {
    console.error('댓글 저장 오류:', error);
  }
}

// 특정 타입의 게시글 가져오기
export function getPostsByType(type: 'board' | 'suggestion'): Post[] {
  const posts = loadPosts();
  return posts.filter((post) => post.type === type).sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

// ID로 게시글 찾기
export function getPostById(id: string): Post | undefined {
  const posts = loadPosts();
  return posts.find((post) => post.id === id);
}

// 게시글 추가
export function addPost(post: Post): void {
  const posts = loadPosts();
  posts.push(post);
  savePosts(posts);
}

// 게시글 업데이트
export function updatePost(id: string, updates: Partial<Post>): boolean {
  const posts = loadPosts();
  const index = posts.findIndex((post) => post.id === id);

  if (index === -1) return false;

  posts[index] = { ...posts[index], ...updates };
  savePosts(posts);
  return true;
}

// 게시글 삭제
export function deletePost(id: string): boolean {
  const posts = loadPosts();
  const filteredPosts = posts.filter((post) => post.id !== id);

  if (filteredPosts.length === posts.length) return false;

  savePosts(filteredPosts);
  return true;
}

// 특정 게시글의 댓글 가져오기
export function getCommentsByPostId(postId: string): Comment[] {
  const comments = loadComments();
  return comments.filter((comment) => comment.postId === postId).sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
}

// 댓글 추가
export function addComment(comment: Comment): void {
  const comments = loadComments();
  comments.push(comment);
  saveComments(comments);

  // 게시글의 댓글 수 업데이트
  const posts = loadPosts();
  const postIndex = posts.findIndex((post) => post.id === comment.postId);
  if (postIndex !== -1) {
    posts[postIndex].commentCount += 1;
    savePosts(posts);
  }
}

// 댓글 삭제
export function deleteComment(id: string): boolean {
  const comments = loadComments();
  const comment = comments.find((c) => c.id === id);

  if (!comment) return false;

  const filteredComments = comments.filter((c) => c.id !== id);
  saveComments(filteredComments);

  // 게시글의 댓글 수 업데이트
  const posts = loadPosts();
  const postIndex = posts.findIndex((post) => post.id === comment.postId);
  if (postIndex !== -1) {
    posts[postIndex].commentCount = Math.max(0, posts[postIndex].commentCount - 1);
    savePosts(posts);
  }

  return true;
}
