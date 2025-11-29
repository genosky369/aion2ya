// 게시글 타입
export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  isAdmin: boolean;
  isPinned: boolean;
  password: string; // 해시화된 비밀번호
  date: string;
  views: number;
  commentCount: number;
  type: 'board' | 'suggestion';
}

// 댓글 타입
export interface Comment {
  id: string;
  postId: string;
  content: string;
  author: string;
  isAdmin: boolean;
  password: string; // 해시화된 비밀번호
  date: string;
}

// FAQ 타입
export interface FAQ {
  id: number;
  question: string;
  answer: string;
  order: number;
}

// 유튜브 비디오 타입
export interface YoutubeVideo {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
}

// 글쓰기 폼 데이터 타입
export interface PostFormData {
  title: string;
  content: string;
  author: string;
  password: string;
  type: 'board' | 'suggestion';
}

// 댓글 폼 데이터 타입
export interface CommentFormData {
  content: string;
  author: string;
  password: string;
  postId: string;
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
