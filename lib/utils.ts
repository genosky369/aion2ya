import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import bcrypt from 'bcryptjs'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 비밀번호 해싱
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

// 비밀번호 검증
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// 관리자 확인
export function isAdmin(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
  return password === adminPassword
}

// ID 생성
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// 상대 시간 포맷
export function getRelativeTime(date: string | Date): string {
  const now = new Date()
  const past = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return '방금 전'
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes}분 전`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours}시간 전`
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days}일 전`
  } else if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000)
    return `${months}개월 전`
  } else {
    const years = Math.floor(diffInSeconds / 31536000)
    return `${years}년 전`
  }
}
