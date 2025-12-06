'use client';

import { useEffect, useRef } from 'react';

/**
 * 방문자 추적 컴포넌트
 * 페이지 로드 시 방문자 기록을 서버에 전송
 * 하루에 한 번만 기록 (로컬스토리지로 중복 방지)
 */
export default function VisitorTracker() {
  const hasTracked = useRef(false);

  useEffect(() => {
    // 이미 추적했으면 스킵
    if (hasTracked.current) return;

    // 한국 시간 기준 오늘 날짜
    const now = new Date();
    const kstOffset = 9 * 60; // KST는 UTC+9
    const kstTime = new Date(now.getTime() + kstOffset * 60 * 1000);
    const today = kstTime.toISOString().split('T')[0];

    // 로컬스토리지에서 마지막 방문 날짜 확인
    const lastVisitDate = localStorage.getItem('last_visit_date');

    // 오늘 이미 기록했으면 스킵 (클라이언트 측 중복 방지)
    if (lastVisitDate === today) {
      hasTracked.current = true;
      return;
    }

    // 방문자 기록 전송
    const trackVisit = async () => {
      try {
        const response = await fetch('/api/visitors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // 성공 시 로컬스토리지에 오늘 날짜 저장
          localStorage.setItem('last_visit_date', today);
          hasTracked.current = true;
        }
      } catch (error) {
        // 실패해도 사용자 경험에 영향 없음
        console.error('Failed to track visit:', error);
      }
    };

    trackVisit();
  }, []);

  // 렌더링 없음 (보이지 않는 컴포넌트)
  return null;
}
