import bcrypt from 'bcryptjs';
import { ADMIN_PASSWORD } from './constants';

// 비밀번호 해싱
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// 비밀번호 검증
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// 관리자 여부 확인
export function isAdmin(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

// 날짜 포맷팅 (YYYY-MM-DD HH:mm)
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// 상대 시간 표시 (방금 전, 1분 전, 1시간 전 등)
export function getRelativeTime(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return '방금 전';
  if (diffMins < 60) return `${diffMins}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  if (diffDays < 7) return `${diffDays}일 전`;

  return formatDate(date);
}

// 텍스트 검색 (제목 + 내용)
export function searchText(query: string, title: string, content: string): boolean {
  const lowerQuery = query.toLowerCase();
  return title.toLowerCase().includes(lowerQuery) ||
         content.toLowerCase().includes(lowerQuery);
}

// ID 생성 (타임스탬프 + 랜덤)
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Tailwind CSS 클래스 병합 헬퍼
export function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
