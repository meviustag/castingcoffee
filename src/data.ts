import { Product, ArtistIP } from './types';

export const PRODUCTS: Product[] = [
  // Cafe Edition (B2B / 업소용 원두)
  {
    id: 'cafe-01',
    category: 'cafe',
    name: 'Cafe Signature Blend "Stage Light"',
    subtitle: '에스프레소 블렌드 No.1 - 화사함 & 밸런스',
    description: '오렌지 필의 산뜻한 아로마와 브라운 슈가의 은은한 단맛, 실키한 마우스필이 어우러져 한 잔의 화려한 무대를 연상시킵니다.',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Seller',
    details: {
      origin: 'Ethiopia 40%, Colombia 40%, Brazil 20%',
      roastLevel: 'Medium Light (미디엄 라이트)',
      notes: ['Orange Peel (오렌지 껍질)', 'Brown Sugar (황설탕)', 'Silky Body (실키한 바디)'],
      weight: '1kg (업소용)',
      brewingGuide: '에스프레소 추출 온도 93℃, 추출 시간 26초 내외, 추출량 36-40g 권장'
    }
  },
  {
    id: 'cafe-02',
    category: 'cafe',
    name: 'Cafe Dark Blend "Spotlight"',
    subtitle: '에스프레소 블렌드 No.2 - 묵직함 & 리치',
    description: '다크 초콜릿의 묵직한 풍미와 구운 견과류의 쌉싸름하고 고소한 후미, 뛰어난 바디감으로 우유와 베리에이션 음료에 극상의 조화를 보여줍니다.',
    price: 36000,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    details: {
      origin: 'Brazil 50%, Colombia 30%, India Robusta Specialty 20%',
      roastLevel: 'Medium Dark (미디엄 다크)',
      notes: ['Dark Chocolate (다크 초콜릿)', 'Roasted Almond (구운 아몬드)', 'Heavy Body (묵직한 바디)'],
      weight: '1kg (업소용)',
      brewingGuide: '에스프레소 추출 온도 92℃, 리치하고 두꺼운 크레마 추출을 목표로 추출량 32g 권장'
    }
  },

  // Home Cafe (홈카페용 싱글오리진/블렌드 원두)
  {
    id: 'home-01',
    category: 'home',
    name: 'Ethiopia Yirgacheffe G1 "Aria"',
    subtitle: '스페셜티 싱글오리진 - 에티오피아 예가체프 G1 아리차 내추럴',
    description: '한 편의 오페라 아리아처럼 우아하게 울려 퍼지는 자스민의 꽃향기와 잘 익은 블루베리의 새콤달콤함이 매력적인 프리미엄 싱글오리진 원두입니다.',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
    badge: 'Seasonal',
    details: {
      origin: 'Ethiopia Yirgacheffe Aricha G1 (Natural)',
      roastLevel: 'Light (라이트 로스트)',
      notes: ['Jasmine (자스민)', 'Blueberry (블루베리)', 'Honey Sweetness (꿀의 단맛)'],
      weight: '200g',
      brewingGuide: '핸드드립 하리오 V60 추천: 원두 18g, 물 92℃, 250ml 추출 (3회 분할 주수)'
    }
  },
  {
    id: 'home-02',
    category: 'home',
    name: 'Colombia Huila Specialty "Chopin"',
    subtitle: '스페셜티 싱글오리진 - 콜롬비아 윌라 수프리모',
    description: '쇼팽의 피아노 녹턴처럼 부드럽고 섬세한 텍스처. 밀크 초콜릿의 부드러움과 잘 익은 사과의 잔잔한 산미가 데일리 홈카페를 아늑하게 채워줍니다.',
    price: 16000,
    image: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=800&q=80',
    details: {
      origin: 'Colombia Huila Region (Washed)',
      roastLevel: 'Medium (미디엄 로스트)',
      notes: ['Milk Chocolate (밀크 초콜릿)', 'Red Apple (붉은 사과)', 'Roasted Hazelnut (구운 헤이즐넛)'],
      weight: '200g',
      brewingGuide: '칼리타 웨이브 추천: 원두 20g, 물 91℃, 280ml 추출'
    }
  },
  {
    id: 'home-03',
    category: 'home',
    name: 'Casting House Blend "Prelude"',
    subtitle: '캐스팅 하우스 시그니처 블렌드 - 전주곡',
    description: '모든 사람의 일상의 첫 시작인 커피를 위해 탄생한 하우스 블렌드입니다. 고소함과 부드러움, 호불호 없는 최고의 밸런스를 캐스팅했습니다.',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    badge: 'Signature',
    details: {
      origin: 'Colombia 50%, Brazil 30%, Ethiopia 20%',
      roastLevel: 'Medium (미디엄 로스트)',
      notes: ['Brown Sugar (갈색 설탕)', 'Walnut (호두)', 'Clean Finish (깔끔한 후미)'],
      weight: '200g',
      brewingGuide: '가정용 브루잉 머신, 모카포트, 에스프레소 머신 등 모든 도구에 훌륭하게 어울립니다.'
    }
  },

  // Drip Bag (개별 드립백 에디션)
  {
    id: 'drip-01',
    category: 'drip',
    name: 'Drip Bag Collection "Encore" (10P)',
    subtitle: '프리미엄 블렌드 드립백 에디션',
    description: '무대의 열띤 앵콜 요청처럼, 매 순간 다시 마시고 싶은 기분 좋은 여운을 드립니다. 필터 드립백 개별 포장으로 언제 어디서든 간편하게 완성하는 무대.',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular',
    details: {
      origin: 'Casting House Blend "Prelude" 100%',
      roastLevel: 'Medium (미디엄 로스트)',
      notes: ['Milk Chocolate (밀크 초콜릿)', 'Toasted Almond (구운 아몬드)', 'Caramel (카라멜)'],
      weight: '10g x 10개입',
      brewingGuide: '봉투를 개봉해 컵에 거치한 후, 뜨거운 물(90~92℃) 150~180ml를 3~4회 나누어 천천히 부어주세요.'
    }
  },
  {
    id: 'drip-02',
    category: 'drip',
    name: 'Single Origin Drip Bag "Soloist" (10P)',
    subtitle: '에티오피아 예가체프 스페셜티 드립백',
    description: '솔로 아티스트의 독무대처럼 하나의 원두가 가진 독보적인 화려함을 극대화했습니다. 향긋하고 세련된 자스민과 피치 노트의 상큼함.',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=800&q=80',
    details: {
      origin: 'Ethiopia Yirgacheffe Aricha G1 (Natural)',
      roastLevel: 'Light Medium (라이트 미디엄)',
      notes: ['Floral (꽃향기)', 'Peach (복숭아)', 'Black Tea (홍차)'],
      weight: '10g x 10개입',
      brewingGuide: '봉투를 개봉해 컵에 거치한 후, 뜨거운 물(92℃) 160ml를 나누어 붓고 약 20초간 뜸을 들이면 더욱 향긋합니다.'
    }
  },

  // Artist & Goods (굿즈 & 콜라보레이션 상품)
  {
    id: 'goods-01',
    category: 'goods',
    name: 'Casting x K-POP Rising Star Photocard Drip Pack',
    subtitle: '아티스트 한정판 드립백 팩 (드립백 5P + 한정 포토카드 2종 랜덤)',
    description: 'K-POP 리그 1위로 캐스팅된 아티스트의 미공개 한정 스페셜 포토카드 수록! 최고급 스페셜티 원두 드립백 5봉과 함께 소장하는 특별한 컬렉션입니다.',
    price: 24000,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    badge: 'Limited Edition',
    details: {
      origin: 'Specialty Selection Drip Bag 5P',
      notes: ['Sweet Jasmine', 'Orange Zest', 'Rich Caramel'],
      weight: '10g x 5개입 + 한정판 포토카드 슬리브 팩 1개',
      brewingGuide: '포토카드 개봉 시 주의해주세요! 드립백은 개별 포장되어 있어 신선도가 장기간 유지됩니다.'
    }
  },
  {
    id: 'goods-02',
    category: 'goods',
    name: 'Casting Signature Orange Mug',
    subtitle: '캐스팅커피 시그니처 머그',
    description: 'Blank Street의 미니멀 무드에 캐스팅커피의 키 컬러인 오렌지 타이포그래피를 매트하고 두꺼운 도자기에 각인한 시그니처 머그컵입니다.',
    price: 16000,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
    details: {
      weight: '350ml (12oz)',
      notes: ['High Quality Ceramic (고급 도자기)', 'Matte Finish (무광 처리)', 'Dishwasher Safe (식기세척기 가능)'],
      brewingGuide: '열 보존율이 뛰어나 에스프레소 베리에이션 음료나 따뜻한 부르잉 커피를 서빙하기에 최적의 제품입니다.'
    }
  },
  {
    id: 'goods-03',
    category: 'goods',
    name: 'Thermal Tumbler "The Stage"',
    subtitle: '더 스테이지 하이엔드 텀블러',
    description: '더블월 이중 진공 구조로 최강의 보온/보냉 성능을 자랑하는 프리미엄 텀블러. 캐스팅 메탈 실버 바디에 오렌지 로고로 모던함을 더했습니다.',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    details: {
      weight: '470ml (16oz)',
      notes: ['Stainless Steel 304 (스테인리스)', 'Double-wall Vacuum (이중 진공)', 'Splash-proof Lid (밀폐형 리드)'],
      brewingGuide: '테이크아웃 할인 혜택을 이용할 때 가장 적합한 한정판 텀블러입니다.'
    }
  }
];

export const ARTISTS: ArtistIP[] = [
  {
    id: 'art-01',
    name: 'LUCID (루시드)',
    groupName: 'LUCID',
    votes: 48920,
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    description: '청량한 이지리스닝 시티팝과 트렌디한 스트릿 패션으로 글로벌 주목을 받고 있는 신인 5인조 보이그룹. 무대의 청량한 에너지를 커피의 싱그러움으로 캐스팅합니다.',
    tags: ['청량함', '시티팝', '스트릿비주얼', '보이그룹'],
  },
  {
    id: 'art-02',
    name: 'SOLARIS (솔라리스)',
    groupName: 'SOLARIS',
    votes: 52140,
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    description: '몽환적이고 강렬한 신스웨이브 사운드와 독보적인 걸크러시 퍼포먼스를 자랑하는 4인조 실력파 걸그룹. 리치하고 다크한 캐스팅커피의 깊이를 대변합니다.',
    tags: ['몽환적', '신스웨이브', '걸크러시', '걸그룹'],
  },
  {
    id: 'art-03',
    name: 'VIVID (비비드)',
    groupName: 'VIVID',
    votes: 39810,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    description: '키치하고 톡톡 튀는 하이-틴 감성과 컬러풀한 컨셉으로 Z세대의 워너비로 급부상한 6인조 다국적 걸그룹. 화사한 스페셜티 예가체프 아리차와 가장 닮은 아티스트입니다.',
    tags: ['Z세대워너비', '키치감성', '톡톡튀는', '걸그룹'],
  },
  {
    id: 'art-04',
    name: 'X-LIMIT (엑스리미트)',
    groupName: 'X-LIMIT',
    votes: 43210,
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80',
    description: '파워풀하고 거친 힙합 퍼포먼스와 자체 프로듀싱 능력을 겸비해 한계 없는 음악적 성장을 보이는 7인조 보이그룹. 에스프레소의 다크 블렌드와 같은 강력한 후미를 선사합니다.',
    tags: ['힙합퍼포먼스', '자체프로듀싱', '에너지', '보이그룹'],
  }
];

export const STORIES = [
  {
    title: 'Casting the Origin',
    subtitle: '원산지의 테루아를 캐스팅하다',
    description: '전 세계 고산지대의 소규모 농장들과 직접 거래(Direct Trade)하여, 토양의 미세 기후(Terroir)가 길러낸 독보적인 고유의 아로마를 가진 최상급 마이크로랏 생두만을 철저하게 선별하여 캐스팅합니다.'
  },
  {
    title: 'Casting the Point',
    subtitle: '완벽함을 부르는 원두의 절정',
    description: '원두가 품고 있는 잠재력을 백 퍼센트 이끌어내는 불과 시간의 마술. 컴퓨터 제어를 통한 정밀 로스팅 프로파일 기술로 원두마다 가장 화려하게 꽃피는 로스팅 포인트 구간을 캐스팅해 일정하고 기복 없는 프리미엄 플레이버를 보장합니다.'
  },
  {
    title: 'Casting the People',
    subtitle: '다양한 직업군의 취향을 디자인하다',
    description: '우리는 다음 단계로 나아갑니다. 향후 현대무용수, 미니멀 작곡가, 건축가, 작가 등 자신만의 세계를 견고히 쌓아가는 각 분야 전문가들을 직접 캐스팅하여, 그들의 감각과 고뇌가 빚어낸 맞춤형 원두 브랜드를 런칭하는 전방위적인 취향 크리에이티브 비전을 제시합니다.'
  }
];

export const FRANCHISE_ADVANTAGES = [
  {
    num: '01',
    title: 'K-POP IP 무상 송출 & 연계 마케팅',
    desc: '매달 팬덤이 직접 투표하는 글로벌 라이징 K-POP 아티스트의 고화질 MV 및 비주얼이 매장 내 대형 디스플레이와 컵홀더에 송출되어, 점주님의 별도 마케팅 비용 부담 없이 강력한 팬덤의 유입을 이끕니다.'
  },
  {
    num: '02',
    title: '글로벌 유통망과 탄탄한 원료 공급',
    desc: '중국 웨이하이 1호점을 바탕으로 검증된 신속한 생두 직수입 및 최첨단 스마트 로스터리 허브를 보유하여, 업계 최저 원가 수준에서 균일하고 완벽한 품질의 에디션 원두를 매일 아침 공급받을 수 있습니다.'
  },
  {
    num: '03',
    title: 'B2B 스마트 주문 시스템',
    desc: '스마트폰 전용 어플리케이션을 통해 간편 발주 및 물류 배송 상태를 직관적으로 추적하며, 업소별 커피 머신 압력, 온도 세팅 데이터를 원격 진단하여 원두 고유의 퍼포먼스를 항상 일정하게 서빙할 수 있도록 케어합니다.'
  }
];

export const FAQS = [
  {
    q: 'B2B 업소용 원두 납품 시 샘플 신청이 가능한가요?',
    a: '네, 가능합니다. CONTACT 메뉴의 제휴 문의를 작성해 주시거나 카카오톡 채널을 통해 사업자 등록증 사본을 보내주시면, 캐스팅커피 시그니처 블렌드 2종(Stage Light / Spotlight) 샘플 원두(각 200g)를 즉시 무료로 배송해 드립니다.'
  },
  {
    q: 'K-POP LEAGUE 아티스트 IP 투표는 언제 반영되나요?',
    a: 'K-POP 리그 투표는 3개월 단위로 시즌제로 운영됩니다. 각 시즌의 누적 1위 아티스트는 다음 시즌 동안 캐스팅커피 글로벌 매장의 전용 드립백 패키지 및 굿즈 일러스트, 매장 미디어 월의 스페셜 앰버서더로 공식 캐스팅되어 무대에 오르게 됩니다.'
  },
  {
    q: '중국 웨이하이 점에 이어 국내외 추가 가맹 개설 절차는 어떻게 되나요?',
    a: '저희는 아시아 핵심 전진기지인 중국 웨이하이 1호점을 성공적으로 연 데 이어 말레이시아, 몽골, 태국 등 주요 거점 파트너십을 체결했습니다. 국내 가맹 또한 미니멀리즘 인테리어 컨셉과 투표형 키오스크 솔루션을 세트로 지원하며, 신청서 접수 후 상권 분석-점주 아카데미 매칭 단계로 빠르게 순조롭게 진행됩니다.'
  }
];
