// 센터 기본 정보 / 사업영역 / 통계 — 정적 콘텐츠
export const CENTER = {
  name: 'AI교육센터',
  org: '기본사회위원회',
  fullName: '기본사회위원회 산하 AI교육센터',
  tagline: '모두를 위한 AI 교육,\n지역에서 시작합니다',
  intro:
    '기본사회위원회 산하 AI교육센터는 전국 각 지역의 AI강사를 양성하고, 시민·재직자·공공기관이 인공지능을 실제 업무와 삶에 활용할 수 있도록 교육을 기획·운영합니다. 모집과 강의 개설을 한 곳에서 진행합니다.',
  email: 'edu@basic.or.kr',
  tel: '02-0000-0000',
  address: '서울특별시 중구 세종대로 110, 기본사회위원회 AI교육센터',
}

export const PILLARS = [
  {
    key: 'instructor',
    icon: '🎓',
    title: 'AI강사 양성',
    desc: '지역별 AI강사 양성과정을 통해 현장에서 가르칠 수 있는 전문 강사를 배출합니다. 수료 후 강의 개설·연계까지 지원합니다.',
  },
  {
    key: 'applied',
    icon: '🤖',
    title: 'AI 활용 교육',
    desc: '생성형 AI, 데이터, 업무 자동화 등 실무에 바로 쓰는 인공지능 활용 교육을 시민·재직자 대상으로 기획·운영합니다.',
  },
  {
    key: 'public',
    icon: '🏛️',
    title: '관공서 기초교육',
    desc: '공공기관·관공서 구성원을 위한 AI 리터러시 필수 기초교육을 표준 커리큘럼으로 정기 운영합니다.',
  },
]

export const STATS = [
  { num: '17', unit: '개', label: '운영 지역' },
  { num: '1,200', unit: '명+', label: '누적 수료생' },
  { num: '85', unit: '개+', label: '개설 과정' },
  { num: '120', unit: '명', label: '양성 강사' },
]

// 교육과정 카테고리
export const CATEGORIES = [
  { key: 'instructor', label: 'AI강사 양성과정', color: 'accent' },
  { key: 'applied', label: 'AI 활용 교육', color: 'success' },
  { key: 'public', label: '관공서 기초교육', color: 'warn' },
]

export const categoryLabel = (key) =>
  CATEGORIES.find((c) => c.key === key)?.label || '기타'
export const categoryColor = (key) =>
  CATEGORIES.find((c) => c.key === key)?.color || 'muted'
