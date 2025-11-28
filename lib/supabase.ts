import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 데이터베이스 타입 정의
export interface ShamePost {
  id: number;
  player_id: string;
  server: string;
  race: string;
  reason: string;
  screenshot_url?: string;
  report_count: number;
  created_at: string;
  updated_at: string;
}

export interface Update {
  id: number;
  title: string;
  content: string;
  category: string;
  created_at: string;
  updated_at: string;
  author_id: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  is_admin: boolean;
  password: string;
  post_type: 'board' | 'suggestion';
  views: number;
  comment_count: number;
  created_at: string;
}
