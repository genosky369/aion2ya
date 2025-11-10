import { FAQ, YoutubeVideo } from '@/types';

// 관리자 비밀번호 (추후 환경변수로 이전)
export const ADMIN_PASSWORD = 'admin1234';

// FAQ 데이터 (루리웹 기반)
export const FAQ_DATA: FAQ[] = [
  {
    id: 1,
    question: 'PvE와 PvP 콘텐츠가 있나요?',
    answer: '네! 아이온2는 PvE(던전, 레이드)와 PvP(전장, 공성전) 콘텐츠를 모두 제공합니다. 플레이 스타일에 맞게 선택할 수 있습니다.',
    order: 1
  },
  {
    id: 2,
    question: '자동 사냥 기능이 있나요?',
    answer: '네, 자동 사냥 기능이 제공됩니다. 스킬 자동 사용, 포션 자동 사용 등의 편의 기능이 포함되어 있습니다.',
    order: 2
  },
  {
    id: 3,
    question: '만렙까지 얼마나 걸리나요?',
    answer: 'CBT 기준 약 40-50시간 정도 소요됩니다. 자동사냥을 활용하면 더 빠르게 달성 가능합니다.',
    order: 3
  },
  {
    id: 4,
    question: '거래소가 있나요?',
    answer: '네, 유저 간 아이템 거래가 가능한 거래소 시스템이 있습니다. 대부분의 아이템이 거래 가능합니다.',
    order: 4
  },
  {
    id: 5,
    question: '멤버십(월정액) 시스템이 있나요?',
    answer: '베이직 멤버십과 프리미엄 멤버십이 있으며, 각각 다양한 혜택을 제공합니다. 완전 무과금 플레이도 가능합니다.',
    order: 5
  },
  {
    id: 6,
    question: '서버는 통합 서버인가요?',
    answer: '네, 전체 유저가 하나의 서버에서 플레이합니다. 서버 선택 걱정 없이 친구들과 바로 플레이 가능합니다.',
    order: 6
  },
  {
    id: 7,
    question: '직업은 몇 개인가요?',
    answer: '출시 시점에는 4개 직업(검사, 궁수, 마법사, 사제)이 제공되며, 추후 업데이트로 추가 예정입니다.',
    order: 7
  },
  {
    id: 8,
    question: '파티 플레이가 필수인가요?',
    answer: '솔로 플레이도 충분히 가능하지만, 던전과 레이드는 파티 플레이 시 더 효율적입니다.',
    order: 8
  },
  {
    id: 9,
    question: '캐릭터 커스터마이징은?',
    answer: '얼굴, 헤어스타일, 체형 등 다양한 커스터마이징 옵션이 제공됩니다. 염색 시스템도 지원됩니다.',
    order: 9
  },
  {
    id: 10,
    question: '길드 시스템이 있나요?',
    answer: '네, 길드(군단) 시스템이 있으며 길드 전용 콘텐츠와 혜택이 제공됩니다.',
    order: 10
  },
  {
    id: 11,
    question: 'PC방 혜택이 있나요?',
    answer: 'PC방에서 플레이 시 경험치 보너스 등 다양한 혜택이 제공될 예정입니다.',
    order: 11
  },
  {
    id: 12,
    question: '모바일과 PC 연동이 되나요?',
    answer: '네, 크로스 플랫폼을 지원하여 PC와 모바일에서 같은 계정으로 플레이 가능합니다.',
    order: 12
  },
  {
    id: 13,
    question: '사전 등록 보상은?',
    answer: '사전 등록 인원 수에 따라 다양한 보상이 제공됩니다. 공식 홈페이지에서 확인하세요!',
    order: 13
  },
  {
    id: 14,
    question: '요구 사양은?',
    answer: 'PC: Windows 10 이상, 8GB RAM 권장. 모바일: Android 8.0 이상, iOS 13.0 이상 권장.',
    order: 14
  }
];

// 유튜브 비디오 데이터
export const YOUTUBE_VIDEOS: YoutubeVideo[] = [
  {
    id: 'Y0OrNb7SJx0',
    title: '아이온2 공식 트레일러',
    url: 'https://www.youtube.com/watch?v=Y0OrNb7SJx0',
    thumbnail: 'https://img.youtube.com/vi/Y0OrNb7SJx0/maxresdefault.jpg'
  },
  {
    id: 'edR3km1e3Lk',
    title: '아이온2 게임플레이 영상',
    url: 'https://www.youtube.com/watch?v=edR3km1e3Lk',
    thumbnail: 'https://img.youtube.com/vi/edR3km1e3Lk/maxresdefault.jpg'
  },
  {
    id: '9xxHRx_VtCM',
    title: '아이온2 직업 소개',
    url: 'https://www.youtube.com/watch?v=9xxHRx_VtCM',
    thumbnail: 'https://img.youtube.com/vi/9xxHRx_VtCM/maxresdefault.jpg'
  },
  {
    id: 'IuK9HIc0FvY',
    title: '아이온2 CBT 하이라이트',
    url: 'https://www.youtube.com/watch?v=IuK9HIc0FvY',
    thumbnail: 'https://img.youtube.com/vi/IuK9HIc0FvY/maxresdefault.jpg'
  }
];

// 사이트 정보
export const SITE_INFO = {
  name: '아이온2야',
  domain: 'www.aion2ya.com',
  description: '아이온2 커뮤니티 & 정보 사이트',
  launchDate: '2025-11-19',
  openChatUrl: '#', // 실제 오픈채팅 링크로 교체
};

// 출시 정보
export const RELEASE_INFO = {
  officialRelease: '2025년 11월 19일',
  preDownload: '2025년 11월 17일',
  platforms: ['Windows', 'Android', 'iOS', 'PS5/Xbox (예정)']
};
