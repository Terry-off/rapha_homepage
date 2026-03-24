export const siteInfo = {
  name: '라파연세통증의원',
  englishName: 'RAPHA YONSEI PAIN CLINIC',
  phone: '032-327-8119',
  address: '경기도 부천시 원미구 상동로 81, 6층',
  addressDetail: [
    '7호선 부천 상동역 3번 출구에서 도보 5분 거리에 있습니다.',
    '차량 이용 시 건물 내 주차가 가능합니다.'
  ],
  logo: 'https://cdn.imweb.me/thumbnail/20260306/5eec4111c4b03.png',
  blogUrl: 'https://blog.naver.com/rapha_yonsei',
  mapImage: 'https://cdn.imweb.me/thumbnail/20251120/a11ad42f9a18b.png',
  doctorImage: 'https://cdn.imweb.me/thumbnail/20251201/599afc7c6c00a.jpg',
  xrayImage: 'https://cdn.imweb.me/thumbnail/20251120/3ce810e8b7b70.jpg'
};

export const menuTree = [
  {
    label: '병원소개',
    href: '/service',
    children: [
      { label: '의료진', href: '/21' },
      { label: '진료안내', href: '/24' },
      { label: '오시는길', href: '/23' }
    ]
  },
  {
    label: '프롤로치료',
    href: '/prolo',
    children: [
      { label: '프롤로 주사치료', href: '/25' },
      { label: '프롤로 칼럼', href: '/26' }
    ]
  },
  {
    label: '관절클리닉',
    href: '/download',
    children: [
      { label: '손목터널증후군', href: '/27' },
      { label: '테니스/골프엘보', href: '/28' },
      { label: '족저근막염', href: '/29' },
      { label: '이상근증후군', href: '/30' },
      { label: '천장관절증후군', href: '/31' },
      { label: '퇴행성관절염', href: '/32' }
    ]
  },
  {
    label: '어깨클리닉',
    href: '/news',
    children: [
      { label: '오십견', href: '/33' },
      { label: '석회화건염', href: '/34' },
      { label: '회전근개파열', href: '/35' },
      { label: '어깨충돌증후군', href: '/36' }
    ]
  },
  {
    label: '척추클리닉',
    href: '/37',
    children: [
      { label: '목디스크', href: '/38' },
      { label: '척추관협착증', href: '/39' },
      { label: '척추수술 후 통증증후군', href: '/40' }
    ]
  }
];

const createOverviewPage = ({
  slug,
  title,
  kicker,
  lead,
  description,
  heroImage,
  cards,
  highlights
}) => ({
  slug,
  kind: 'overview',
  title,
  kicker,
  lead,
  description,
  heroImage,
  cards,
  highlights
});

const createDetailPage = ({
  slug,
  category,
  title,
  kicker,
  lead,
  description,
  heroImage,
  body = [],
  symptoms = [],
  carePoints = [],
  imageSections = [],
  note = ''
}) => ({
  slug,
  kind: 'detail',
  category,
  title,
  kicker,
  lead,
  description,
  heroImage,
  body,
  symptoms,
  carePoints,
  imageSections,
  note
});

const jointCondition = (overrides) =>
  createDetailPage({
    kicker: 'JOINT CLINIC',
    category: '관절클리닉',
    body: [
      '정밀 문진과 초음파 기반 진단으로 통증의 원인을 세밀하게 확인합니다.',
      '필요한 부위에만 정확한 강도로 프롤로 치료를 적용해 회복을 돕습니다.'
    ],
    symptoms: [
      '움직일 때 특정 관절 부위에서 통증이 반복됩니다.',
      '자세나 사용량에 따라 저림, 당김, 뻣뻣함이 심해집니다.',
      '통증 때문에 일상 동작의 범위가 줄어들기 시작합니다.'
    ],
    carePoints: [
      '통증 부위만이 아니라 연결된 인대, 근육, 관절의 사용 패턴까지 함께 봅니다.',
      '필요한 경우 초음파 유도하 주사치료로 정확도를 높입니다.',
      '재발을 줄이기 위해 생활 습관과 움직임 관리까지 안내합니다.'
    ],
    ...overrides
  });

const shoulderCondition = (overrides) =>
  createDetailPage({
    kicker: 'SHOULDER CLINIC',
    category: '어깨클리닉',
    body: [
      '어깨는 회전근개와 관절낭, 주변 근육이 함께 움직이는 구조라 정확한 감별이 중요합니다.',
      '라파연세통증의원은 움직임 제한과 통증 패턴을 함께 살펴 과하지 않게 치료 방향을 정합니다.'
    ],
    symptoms: [
      '팔을 들거나 뒤로 돌릴 때 통증과 제한이 있습니다.',
      '밤에 어깨 통증이 심해져 수면이 불편합니다.',
      '팔을 쓰고 난 뒤 뻐근함과 힘 빠짐이 반복됩니다.'
    ],
    carePoints: [
      '관절낭, 회전근개, 석회성 변화 등 원인 구조를 구분해서 진료합니다.',
      '초음파 확인 후 필요한 부위에만 주사치료를 시행합니다.',
      '회복 이후 다시 굳지 않도록 단계별 사용 지침을 같이 안내합니다.'
    ],
    ...overrides
  });

const spineCondition = (overrides) =>
  createDetailPage({
    kicker: 'SPINE CLINIC',
    category: '척추클리닉',
    body: [
      '척추 통증은 디스크 자체뿐 아니라 주변 인대와 관절, 근육의 불안정성과도 연결될 수 있습니다.',
      '증상 양상과 자세 변화를 함께 확인해 수술 여부 이전에 필요한 보존적 치료를 우선 검토합니다.'
    ],
    symptoms: [
      '앉거나 걷는 자세에 따라 통증 강도가 달라집니다.',
      '허리 또는 목 통증과 함께 방사통, 저림이 동반됩니다.',
      '오래 서 있거나 걸으면 불편이 빠르게 심해집니다.'
    ],
    carePoints: [
      'MRI, X-ray, 초음파, 신체 진찰을 함께 보며 구조적 원인을 확인합니다.',
      '시술 여부는 통증 양상과 회복 목표를 고려해 신중하게 결정합니다.',
      '반복 재발을 줄이기 위한 생활 패턴 조정과 재활 가이드도 함께 안내합니다.'
    ],
    ...overrides
  });

export const pages = {
  service: createOverviewPage({
    slug: 'service',
    title: '병원소개',
    kicker: siteInfo.englishName,
    lead: '정통 프롤로 치료를 바탕으로 통증의 원인을 끝까지 살피는 진료를 지향합니다.',
    description:
      '라파연세통증의원은 단순히 아픈 부위만 보는 것이 아니라, 왜 반복되는지까지 함께 확인하는 진단 중심 클리닉입니다.',
    heroImage: siteInfo.doctorImage,
    cards: [
      {
        title: '의료진',
        text: '허철령 대표원장의 이력과 진료 철학을 확인하실 수 있습니다.',
        href: '/21',
        image: siteInfo.doctorImage
      },
      {
        title: '진료안내',
        text: '진료시간, 비수술 중심 진료과목, 상담 흐름을 한눈에 확인할 수 있습니다.',
        href: '/24',
        image: siteInfo.xrayImage
      },
      {
        title: '오시는길',
        text: '상동역 3번 출구에서 5분, 건물 내 주차가 가능한 위치입니다.',
        href: '/23',
        image: siteInfo.mapImage
      }
    ],
    highlights: [
      '13년 동안 프롤로를 집중해온 진료 경험',
      '통증 원인을 놓치지 않는 진단 중심 접근',
      '모든 시술을 원장이 직접 진행하는 책임 진료'
    ]
  }),
  '21': createDetailPage({
    slug: '21',
    category: '병원소개',
    title: '의료진',
    kicker: siteInfo.englishName,
    lead: '허철령 대표원장이 직접 진단부터 치료, 사후 관리까지 이어지는 책임 진료를 지향합니다.',
    description:
      '통증 원인을 끝까지 찾고, 환자의 생활 패턴에 맞춘 현실적인 회복 계획을 제안합니다.',
    heroImage: siteInfo.doctorImage,
    body: [
      '13년 동안 프롤로를 집중하며 쌓아온 경험과 한 분 한 분의 통증을 이해하려는 진심을 바탕으로 진료합니다.',
      '단순히 아픈 부위만 보는 것이 아니라, 통증을 만드는 구조적 문제를 꼼꼼히 분석합니다. 근육, 인대, 관절의 움직임을 세밀하게 확인해 환자마다 다른 원인을 정확히 찾아내는 데 집중합니다.',
      '직업과 운동, 생활 리듬까지 함께 살펴 현실적인 회복 전략을 설계하고, 필요한 시술만 과하지 않게 직접 시행합니다.',
      '프롤로 치료의 핵심은 어디에, 어떻게, 얼마나 정확히 넣는가에 있습니다. 라파연세통증의원은 해부학적 구조를 세밀하게 분석하고 초음파로 정확한 위치를 확인해 필요한 부위에만 시술합니다.'
    ],
    symptoms: [
      '대한 마취통증의학과학회 정회원',
      '대한 근골격계초음파학회 정회원',
      '미국 존스홉킨스대학 의과대학 교환교수',
      '건국대학교 의과대학 교수 / 아주대학교 의과대학 교수 역임'
    ],
    carePoints: [
      '통증 원인을 끝까지 찾아가는 진단 중심 진료',
      '환자의 생활 패턴을 고려한 현실적인 치료 계획',
      '모든 시술을 원장이 직접 진행하는 책임 진료',
      '정확한 부위와 깊이를 중시하는 프롤로 전문 접근'
    ],
    imageSections: [
      { src: siteInfo.doctorImage, alt: '허철령 대표원장 진료 장면' },
      { src: siteInfo.xrayImage, alt: '정밀 진단 장면' }
    ]
  }),
  '24': createDetailPage({
    slug: '24',
    category: '병원소개',
    title: '진료안내',
    kicker: siteInfo.englishName,
    lead: '비수술 중심 진료과목과 진료시간, 내원 동선을 한눈에 확인할 수 있도록 정리했습니다.',
    description:
      '허리, 손팔, 목, 무릎, 어깨, 발 통증까지 통증 양상에 맞춘 진료를 진행합니다.',
    heroImage: siteInfo.mapImage,
    body: [
      '비수술 중심 진료과목으로 허리통증, 손팔통증, 목통증, 무릎통증, 어깨통증, 발통증을 보고 있습니다.',
      '라파연세통증의원은 예약 상담 이후 내원 시 통증 부위와 생활 패턴을 함께 확인하고, 필요 시 초음파를 활용해 세밀하게 진단합니다.'
    ],
    symptoms: [
      '월요일 - 금요일 09:00 - 18:00',
      '수요일 / 토요일 09:00 - 13:00',
      '일요일 및 공휴일 휴진'
    ],
    carePoints: [
      '허리통증: 약해진 허리를 다시 튼튼하게 돕습니다.',
      '손팔통증: 손과 팔의 힘을 되돌려 일상 기능을 살립니다.',
      '목통증: 굳은 목을 풀고 움직임을 되찾아줍니다.',
      '어깨통증: 올라가지 않는 어깨의 기능 회복을 돕습니다.'
    ],
    imageSections: [{ src: siteInfo.mapImage, alt: '라파연세통증의원 위치 안내' }]
  }),
  '23': createDetailPage({
    slug: '23',
    category: '병원소개',
    title: '오시는길',
    kicker: siteInfo.englishName,
    lead: '부천 상동역 3번 출구에서 도보 5분, 건물 내 주차가 가능한 위치에 있습니다.',
    description: siteInfo.address,
    heroImage: siteInfo.mapImage,
    body: [
      '라파연세통증의원은 경기도 부천시 원미구 상동로 81, 6층에 위치해 있습니다.',
      '지하철과 차량 모두 접근이 편리하며, 내원 전 문의가 필요하시면 대표번호로 연락 주시면 됩니다.'
    ],
    symptoms: siteInfo.addressDetail,
    carePoints: [
      '대표번호: 032-327-8119',
      '상담 및 예약 문의는 진료시간 내 순차적으로 안내드립니다.',
      '건물 내 주차 가능 여부와 혼잡 시간은 유선 문의 시 더 빠르게 확인하실 수 있습니다.'
    ],
    imageSections: [{ src: siteInfo.mapImage, alt: '라파연세통증의원 오시는 길' }]
  }),
  prolo: createOverviewPage({
    slug: 'prolo',
    title: '프롤로치료',
    kicker: siteInfo.englishName,
    lead: '몸이 스스로 회복할 수 있도록 약해진 구조를 강화하는 재생의학적 접근입니다.',
    description:
      '라파연세통증의원은 정통 프롤로의 원리를 바탕으로, 꼭 필요한 부위에만 정확하게 치료를 적용합니다.',
    heroImage: 'https://cdn.imweb.me/thumbnail/20251120/f56218023e777.png',
    cards: [
      {
        title: '프롤로 주사치료',
        text: '프롤로 치료의 원리, 장점, 적용 대상과 주의사항을 확인하실 수 있습니다.',
        href: '/25',
        image: 'https://cdn.imweb.me/thumbnail/20251120/f56218023e777.png'
      },
      {
        title: '프롤로 칼럼',
        text: '허박사의 프롤로 이야기와 라파연세통증의원의 진료 철학을 정리했습니다.',
        href: '/26',
        image: 'https://cdn.imweb.me/thumbnail/20251120/5d6bf3d46fc78.png'
      }
    ],
    highlights: [
      '초음파 기반 진단과 시술 정확도',
      '조직 재생과 기능 회복을 함께 고려하는 치료 계획',
      '프롤로 원리와 정통성을 지키는 책임 진료'
    ]
  }),
  '25': createDetailPage({
    slug: '25',
    category: '프롤로치료',
    title: '프롤로 주사치료',
    kicker: siteInfo.englishName,
    lead: '프롤로로 무너진 인체의 탑을 다시 견고하게 세우는 치료 철학을 바탕으로 합니다.',
    description:
      '약해진 인대와 힘줄을 강화해 통증을 줄이고 기능 회복을 돕는 재생의학적 치료입니다.',
    heroImage: 'https://cdn.imweb.me/thumbnail/20251120/f56218023e777.png',
    body: [
      '인체는 오래된 석탑처럼 풍파와 질병을 겪으며 조금씩 약해질 수 있습니다. 라파연세통증의원은 무너진 인체의 탑을 다시 세우듯, 통증의 원인을 정확히 진단하고 체계적으로 회복을 돕습니다.',
      '표면적으로 보이는 통증 뒤에는 숨겨진 불안정성이 있을 수 있습니다. 한 부분의 문제가 다른 부위 통증으로 이어질 수 있기 때문에 구조 전체를 함께 봅니다.',
      '석탑을 한 층 한 층 쌓아 올리듯, 단계적이고 체계적인 접근으로 환자의 건강을 회복시킵니다. 빠른 호전만이 아니라 재발을 줄이는 안정적인 회복을 목표로 합니다.'
    ],
    symptoms: [
      '인대나 힘줄을 강화시키는 주사치료로 알려져 있습니다.',
      '시술 시간이 비교적 짧고 일상 복귀가 빠른 편입니다.',
      '절개 및 큰 흉터 없이 필요한 부위에만 치료가 가능합니다.',
      '고령자, 임산부, 고혈압, 당뇨 환자도 상태에 따라 시술 가능합니다.'
    ],
    carePoints: [
      '초음파 유도하 정밀 시술로 정확도를 높입니다.',
      '근육, 인대, 힘줄의 직접적인 재생을 유도해 만성 통증 원인을 다룹니다.',
      '반복적인 시술 여부는 통증 양상과 회복 속도를 보고 결정합니다.',
      '원리상 시술 후 일시적인 염증 반응과 뻐근함이 나타날 수 있습니다.'
    ],
    imageSections: [
      { src: 'https://cdn.imweb.me/thumbnail/20251120/78c17a43550e9.png', alt: '미륵사지석탑 이미지' },
      { src: 'https://cdn.imweb.me/thumbnail/20251120/be6b94f6f31e7.jpg', alt: '복원된 석탑 이미지' },
      { src: 'https://cdn.imweb.me/thumbnail/20251120/f56218023e777.png', alt: '프롤로치료 안내 이미지' },
      { src: 'https://cdn.imweb.me/thumbnail/20251120/b1cb12fde8713.png', alt: '프롤로 치료 대상 안내 이미지' },
      { src: 'https://cdn.imweb.me/thumbnail/20251120/0a78fbf778f29.png', alt: '프롤로 치료 장점 이미지' },
      { src: 'https://cdn.imweb.me/thumbnail/20251120/cececf3434990.png', alt: '프롤로 치료 유의사항 이미지' },
      { src: 'https://cdn.imweb.me/thumbnail/20251120/5d6bf3d46fc78.png', alt: '프롤로 30000례 이미지' },
      { src: 'https://cdn.imweb.me/thumbnail/20251120/f012863e16980.png', alt: '해외에서도 찾아오는 신뢰 이미지' },
      { src: 'https://cdn.imweb.me/thumbnail/20251120/3cacde0280506.png', alt: '소개와 후기가 많은 이유 이미지' }
    ]
  }),
  '26': createDetailPage({
    slug: '26',
    category: '프롤로치료',
    title: '프롤로 칼럼',
    kicker: siteInfo.englishName,
    lead: '프롤로 치료의 정통성과 원리를 지키는 라파연세통증의원의 진료 철학을 칼럼 형식으로 정리했습니다.',
    description: '허박사의 프롤로 이야기와 진료 철학, 치료 기준을 요약했습니다.',
    heroImage: 'https://cdn.imweb.me/thumbnail/20251120/5d6bf3d46fc78.png',
    body: [
      '시술이 늘어나고 대중적인 관심이 높아져도 지키고 싶은 것은 프롤로 치료의 정통성과 원리입니다.',
      '프롤로는 단순히 약물을 주입하는 주사치료가 아니라, 몸이 스스로 회복할 수 있도록 약해진 구조를 강화하는 치료입니다.',
      '라파연세통증의원은 과도하거나 불필요한 시술을 지양하고, 적정 용량과 적정 횟수, 적정 강도를 바탕으로 환자에게 꼭 필요한 치료만 제공합니다.'
    ],
    symptoms: [
      '정확한 진단과 세밀한 시술이 프롤로의 핵심입니다.',
      '재발을 줄이기 위해 통증 원인이 되는 구조를 함께 봅니다.',
      '생활 습관과 움직임 패턴을 고려해 치료 방향을 정합니다.'
    ],
    carePoints: [
      '허박사의 프롤로 이야기는 블로그에서도 계속 업데이트되고 있습니다.',
      '심화 칼럼과 실제 진료 사례는 네이버 블로그를 통해 확인하실 수 있습니다.'
    ],
    note: '더 많은 프롤로 이야기와 진료 소식은 네이버 블로그에서 이어집니다.'
  }),
  download: createOverviewPage({
    slug: 'download',
    title: '관절클리닉',
    kicker: siteInfo.englishName,
    lead: '손목부터 발까지, 반복 사용과 자세 불균형으로 생기는 관절 통증을 비수술적으로 살핍니다.',
    description:
      '손목터널증후군, 테니스/골프엘보, 족저근막염, 이상근증후군, 천장관절증후군, 퇴행성관절염 진료 안내입니다.',
    heroImage: 'https://cdn.imweb.me/thumbnail/20251120/b1cb12fde8713.png',
    cards: [
      { title: '손목터널증후군', text: '손저림과 야간 통증, 집기 어려움을 진단합니다.', href: '/27', image: 'https://cdn.imweb.me/thumbnail/20251120/92f4e4b2c2db6.png' },
      { title: '테니스/골프엘보', text: '팔꿈치 바깥쪽 또는 안쪽 통증을 구분해 진료합니다.', href: '/28', image: 'https://cdn.imweb.me/thumbnail/20251120/b1cb12fde8713.png' },
      { title: '족저근막염', text: '첫걸음 통증과 발바닥 긴장을 단계적으로 살핍니다.', href: '/29', image: 'https://cdn.imweb.me/thumbnail/20251120/3e538009a533e.png' },
      { title: '이상근증후군', text: '엉덩이와 다리로 퍼지는 통증을 정밀하게 감별합니다.', href: '/30', image: 'https://cdn.imweb.me/thumbnail/20251120/b1cb12fde8713.png' },
      { title: '천장관절증후군', text: '골반과 허리 경계 부위 통증을 함께 확인합니다.', href: '/31', image: 'https://cdn.imweb.me/thumbnail/20251120/4de5e54065992.png' },
      { title: '퇴행성관절염', text: '관절 기능과 통증 정도에 맞춰 보존적 치료를 안내합니다.', href: '/32', image: 'https://cdn.imweb.me/thumbnail/20251120/07c33d0ffb156.png' }
    ],
    highlights: [
      '통증 부위와 함께 사용하는 자세, 보행, 반복 동작을 함께 확인합니다.',
      '필요 시 초음파와 영상 검사를 병행해 원인을 찾습니다.',
      '시술 이후에도 재발 방지를 위한 생활 관리까지 함께 안내합니다.'
    ]
  }),
  '27': jointCondition({
    slug: '27',
    title: '손목터널증후군',
    lead: '손저림, 밤에 심해지는 통증, 손의 힘 빠짐이 반복된다면 손목 주변 신경과 구조를 함께 확인해야 합니다.',
    description: '수근관 주변의 압박과 반복 사용 패턴을 함께 살펴 원인을 찾습니다.',
    heroImage: 'https://cdn.imweb.me/thumbnail/20251120/92f4e4b2c2db6.png',
    imageSections: [{ src: 'https://cdn.imweb.me/thumbnail/20251118/1069708225db5.png', alt: '손목터널증후군 안내 이미지' }],
    note: '야간 저림과 손의 힘 저하는 손목뿐 아니라 팔 전체 사용 패턴과 함께 확인하는 것이 중요합니다.'
  }),
  '28': jointCondition({
    slug: '28',
    title: '테니스/골프엘보',
    lead: '팔꿈치를 쓰는 동작 뒤 통증이 심해지거나, 물건을 쥘 때 힘이 떨어진다면 반복 사용 손상을 의심해볼 수 있습니다.',
    description: '팔꿈치 힘줄과 전완부 근육의 사용 패턴을 함께 봅니다.',
    heroImage: 'https://cdn.imweb.me/thumbnail/20251120/b1cb12fde8713.png'
  }),
  '29': jointCondition({
    slug: '29',
    title: '족저근막염',
    lead: '아침 첫걸음 통증이나 오래 서 있는 뒤 발바닥 통증이 심하다면 발의 지지 구조를 함께 확인해야 합니다.',
    description: '발바닥 근막과 종아리, 발목의 긴장을 함께 살펴봅니다.',
    heroImage: 'https://cdn.imweb.me/thumbnail/20251120/3e538009a533e.png'
  }),
  '30': jointCondition({
    slug: '30',
    title: '이상근증후군',
    lead: '엉덩이 깊숙한 통증이나 다리 쪽으로 이어지는 불편이 있다면 이상근과 주변 신경 압박 여부를 확인합니다.',
    description: '허리와 골반, 둔부 사용 패턴을 함께 보며 감별합니다.',
    heroImage: 'https://cdn.imweb.me/thumbnail/20251120/b1cb12fde8713.png'
  }),
  '31': jointCondition({
    slug: '31',
    title: '천장관절증후군',
    lead: '골반 뒤쪽과 허리 경계 부위 통증이 반복되면 천장관절의 움직임과 불안정성을 함께 확인합니다.',
    description: '골반 정렬과 걷기 패턴, 주변 인대 긴장을 함께 봅니다.',
    heroImage: 'https://cdn.imweb.me/thumbnail/20251120/4de5e54065992.png'
  }),
  '32': jointCondition({
    slug: '32',
    title: '퇴행성관절염',
    lead: '관절 마모가 의심되더라도 통증 강도와 기능 저하는 사람마다 다르기 때문에 맞춤형 판단이 중요합니다.',
    description: '관절 상태와 사용 범위, 생활 불편을 같이 보고 치료 방향을 정합니다.',
    heroImage: 'https://cdn.imweb.me/thumbnail/20251120/07c33d0ffb156.png'
  }),
  news: createOverviewPage({
    slug: 'news',
    title: '어깨클리닉',
    kicker: siteInfo.englishName,
    lead: '어깨는 원인이 서로 비슷해 보여도 회전근개, 관절낭, 석회화 여부에 따라 치료 방향이 달라집니다.',
    description:
      '오십견, 석회화건염, 회전근개파열, 어깨충돌증후군을 비수술 중심으로 감별하고 치료합니다.',
    heroImage: 'https://cdn.imweb.me/thumbnail/20251120/b4ca52fb02acb.png',
    cards: [
      { title: '오십견', text: '굳은 어깨와 움직임 제한을 단계적으로 봅니다.', href: '/33', image: 'https://cdn.imweb.me/thumbnail/20251120/b4ca52fb02acb.png' },
      { title: '석회화건염', text: '염증과 석회 위치를 정확히 확인해 통증을 조절합니다.', href: '/34', image: 'https://cdn.imweb.me/thumbnail/20251120/b1cb12fde8713.png' },
      { title: '회전근개파열', text: '어깨 힘줄의 손상 정도와 기능 저하를 함께 봅니다.', href: '/35', image: 'https://cdn.imweb.me/thumbnail/20251120/b1cb12fde8713.png' },
      { title: '어깨충돌증후군', text: '올릴 때 아픈 어깨의 충돌 패턴과 구조를 확인합니다.', href: '/36', image: 'https://cdn.imweb.me/thumbnail/20251120/b1cb12fde8713.png' }
    ],
    highlights: [
      '어깨는 회전근개, 관절낭, 관절 주변 근육을 함께 봐야 정확합니다.',
      '통증 부위보다 움직임 제한 방향과 생활 패턴이 중요한 단서가 됩니다.',
      '필요 이상으로 과하지 않게, 기능 회복 중심으로 치료합니다.'
    ]
  }),
  '33': shoulderCondition({
    slug: '33',
    title: '오십견',
    lead: '어깨가 굳고 밤에 통증이 심하며, 팔이 잘 올라가지 않는다면 관절낭의 염증과 제한을 함께 확인합니다.',
    description: '움직임 제한 방향과 통증 패턴을 함께 봅니다.',
    heroImage: 'https://cdn.imweb.me/thumbnail/20251120/b4ca52fb02acb.png'
  }),
  '34': shoulderCondition({
    slug: '34',
    title: '석회화건염',
    lead: '갑자기 심한 어깨 통증이 생기거나 특정 동작에서 찌르는 듯 아프다면 석회 위치와 염증 정도를 함께 확인합니다.',
    description: '석회 침착 위치와 주변 힘줄 상태를 같이 봅니다.',
    heroImage: 'https://cdn.imweb.me/thumbnail/20251120/b1cb12fde8713.png'
  }),
  '35': shoulderCondition({
    slug: '35',
    title: '회전근개파열',
    lead: '어깨 힘이 빠지고 특정 방향으로 팔을 들기 어렵다면 회전근개 손상 여부를 세밀하게 확인해야 합니다.',
    description: '힘줄 손상 범위와 움직임 보상 패턴을 함께 봅니다.',
    heroImage: 'https://cdn.imweb.me/thumbnail/20251120/b1cb12fde8713.png'
  }),
  '36': shoulderCondition({
    slug: '36',
    title: '어깨충돌증후군',
    lead: '팔을 들 때 걸리는 느낌과 통증이 반복된다면 어깨 공간의 충돌 패턴을 확인해야 합니다.',
    description: '반복 동작과 회전근개, 견갑 움직임을 함께 살펴봅니다.',
    heroImage: 'https://cdn.imweb.me/thumbnail/20251120/b1cb12fde8713.png'
  }),
  '37': createOverviewPage({
    slug: '37',
    title: '척추클리닉',
    kicker: siteInfo.englishName,
    lead: '목과 허리 통증은 디스크만이 아니라 주변 인대와 관절, 근육 긴장이 함께 작용하는 경우가 많습니다.',
    description:
      '목디스크, 척추관협착증, 척추수술 후 통증증후군을 수술 전후 맥락까지 함께 보고 진료합니다.',
    heroImage: 'https://cdn.imweb.me/thumbnail/20251120/e137ddbf17dbe.png',
    cards: [
      { title: '목디스크', text: '목 통증과 방사통, 팔 저림을 함께 감별합니다.', href: '/38', image: 'https://cdn.imweb.me/thumbnail/20251120/e137ddbf17dbe.png' },
      { title: '척추관협착증', text: '걷거나 서 있을 때 심해지는 허리 통증과 다리 증상을 봅니다.', href: '/39', image: 'https://cdn.imweb.me/thumbnail/20251120/b1cb12fde8713.png' },
      { title: '척추수술 후 통증증후군', text: '수술 이후에도 남는 통증 원인을 정밀하게 찾습니다.', href: '/40', image: 'https://cdn.imweb.me/thumbnail/20251120/b1cb12fde8713.png' }
    ],
    highlights: [
      '수술 전후 여부와 상관없이 현재 통증 원인을 다시 정리합니다.',
      '신경 증상과 움직임 제한, 일상 기능 저하를 함께 봅니다.',
      '필요 시 보존적 치료를 우선 검토하고 단계적으로 접근합니다.'
    ]
  }),
  '38': spineCondition({
    slug: '38',
    title: '목디스크',
    lead: '목 통증과 팔 저림, 두통이 함께 나타난다면 경추 디스크와 주변 조직 상태를 함께 확인해야 합니다.',
    description: '목 주변 근육과 신경 긴장, 자세 패턴까지 함께 살펴봅니다.',
    heroImage: 'https://cdn.imweb.me/thumbnail/20251120/e137ddbf17dbe.png'
  }),
  '39': spineCondition({
    slug: '39',
    title: '척추관협착증',
    lead: '서 있거나 걸을 때 다리가 당기고 쉬면 덜해지는 증상이 있다면 척추관협착 양상을 확인합니다.',
    description: '보행 거리 변화와 자세에 따른 증상 차이를 중요하게 봅니다.',
    heroImage: 'https://cdn.imweb.me/thumbnail/20251120/b1cb12fde8713.png'
  }),
  '40': spineCondition({
    slug: '40',
    title: '척추수술 후 통증증후군',
    lead: '수술 이후에도 통증이 계속된다면 현재 남아 있는 구조적 자극과 기능 저하를 다시 정리해야 합니다.',
    description: '수술 부위와 주변 보상 움직임, 남은 통증 양상을 함께 확인합니다.',
    heroImage: 'https://cdn.imweb.me/thumbnail/20251120/b1cb12fde8713.png'
  })
};

