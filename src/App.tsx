/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowUp, Instagram, Facebook, Share2, Settings, ShieldAlert } from 'lucide-react';

import GNB from './components/GNB';
import HeroSection from './components/HeroSection';
import PhilosophySection from './components/PhilosophySection';
import ShopGrid from './components/ShopGrid';
import KPopLeague from './components/KPopLeague';
import ContactSection from './components/ContactSection';
import CartDrawer from './components/CartDrawer';
import AdminPanel from './components/AdminPanel';

import { Product, CartItem, ArtistIP } from './types';
import { PRODUCTS as DEFAULT_PRODUCTS, ARTISTS as DEFAULT_ARTISTS } from './data';

export default function App() {
  // GNB Active Tab state: 'home' | 'shop' | 'story' | 'kpop' | 'contact'
  const [activeTab, setActiveTab] = useState<string>('home');
  
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  
  // Admin Panel toggle
  const [adminOpen, setAdminOpen] = useState(false);

  // Administrative dynamic states with localStorage fallback
  const [brandName1, setBrandName1] = useState<string>(() => localStorage.getItem('casting_brand_name_1') || 'CASTING');
  const [brandName2, setBrandName2] = useState<string>(() => localStorage.getItem('casting_brand_name_2') || 'COFFEE');
  const [heroBadge, setHeroBadge] = useState<string>(() => localStorage.getItem('casting_hero_badge') || 'BRAND ESSENCE');
  const [heroTitle, setHeroTitle] = useState<string>(() => localStorage.getItem('casting_hero_title') || "We Don't Just Roast. We Cast.");
  const [heroSubtitle, setHeroSubtitle] = useState<string>(() => localStorage.getItem('casting_hero_subtitle') || '우리는 단순히 로스팅하지 않습니다. 우리는 캐스팅합니다.');
  const [heroDesc, setHeroDesc] = useState<string>(() => localStorage.getItem('casting_hero_desc') || "산지의 테루아부터 최적의 로스팅 포인트까지, 캐스팅커피는 오직 완벽한 한 잔을 위해 모든 과정을 '캐스팅'합니다. 이제 당신의 일상에 가장 어울리는 커피를 캐스팅해 보세요.");
  const [heroImage, setHeroImage] = useState<string>(() => localStorage.getItem('casting_hero_image') || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80');

  // Contact States for Footer Business Inquiries
  const [contactPhone, setContactPhone] = useState<string>(() => localStorage.getItem('casting_contact_phone') || '02-543-1202 | 평일 09:30 - 18:00');
  const [contactB2bEmail, setContactB2bEmail] = useState<string>(() => localStorage.getItem('casting_contact_b2b_email') || 'b2b@castingcoffee.com');
  const [contactCollabEmail, setContactCollabEmail] = useState<string>(() => localStorage.getItem('casting_contact_collab_email') || 'collaboration@castingcoffee.com');

  // HQ Address Details
  const [hqName, setHqName] = useState<string>(() => localStorage.getItem('casting_hq_name') || '캐스팅커피 크리에이티브 스튜디오');
  const [hqAddress, setHqAddress] = useState<string>(() => localStorage.getItem('casting_hq_address') || '서울특별시 성동구 아차산로 17길 49, 3층');
  const [hqContact, setHqContact] = useState<string>(() => localStorage.getItem('casting_hq_contact') || '02-543-1202 | contact@castingcoffee.com');
  const [hqHours, setHqHours] = useState<string>(() => localStorage.getItem('casting_hq_hours') || 'MON - FRI : 09:00 - 18:00 (WEEKENDS CLOSED)');
  const [hqMapImage, setHqMapImage] = useState<string>(() => localStorage.getItem('casting_hq_map_image') || 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80');

  // Roastery Address Details
  const [roasteryName, setRoasteryName] = useState<string>(() => localStorage.getItem('casting_roastery_name') || '캐스팅커피 테크니컬 스마트 팩토리');
  const [roasteryAddress, setRoasteryAddress] = useState<string>(() => localStorage.getItem('casting_roastery_address') || '경기도 남양주시 화도읍 수레로 112번길 18');
  const [roasteryContact, setRoasteryContact] = useState<string>(() => localStorage.getItem('casting_roastery_contact') || '031-591-1203 | roastery@castingcoffee.com');
  const [roasteryHours, setRoasteryHours] = useState<string>(() => localStorage.getItem('casting_roastery_hours') || 'MON - SAT : 08:00 - 17:00 (SUNDAY CLOSED)');
  const [roasteryMapImage, setRoasteryMapImage] = useState<string>(() => localStorage.getItem('casting_roastery_map_image') || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80');

  // Layout Showcase & Story Images
  const [teaserImage, setTeaserImage] = useState<string>(() => localStorage.getItem('casting_teaser_image') || 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80');
  const [philosophyImage1, setPhilosophyImage1] = useState<string>(() => localStorage.getItem('casting_phil_image_1') || 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1000&q=80');
  const [philosophyImage2, setPhilosophyImage2] = useState<string>(() => localStorage.getItem('casting_phil_image_2') || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80');
  const [philosophyImage3, setPhilosophyImage3] = useState<string>(() => localStorage.getItem('casting_phil_image_3') || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80');

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('casting_products');
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  });

  const [artists, setArtists] = useState<ArtistIP[]>(() => {
    const saved = localStorage.getItem('casting_artists');
    return saved ? JSON.parse(saved) : DEFAULT_ARTISTS;
  });

  // Preset category for Shop tab filter when clicked from landing page embedded grid
  const [shopCategoryPreset, setShopCategoryPreset] = useState<'all' | 'cafe' | 'home' | 'drip' | 'goods'>('all');

  // Floating Custom Notification state
  const [notifications, setNotifications] = useState<{ id: number; text: string }[]>([]);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Monitor scroll height for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Display Custom Toast
  const triggerNotification = (text: string) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, text }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  // Administrative update functions
  const handleUpdateBrand = (l1: string, l2: string) => {
    setBrandName1(l1);
    setBrandName2(l2);
    localStorage.setItem('casting_brand_name_1', l1);
    localStorage.setItem('casting_brand_name_2', l2);
  };

  const handleUpdateHero = (badge: string, title: string, subtitle: string, desc: string, image: string) => {
    setHeroBadge(badge);
    setHeroTitle(title);
    setHeroSubtitle(subtitle);
    setHeroDesc(desc);
    setHeroImage(image);
    localStorage.setItem('casting_hero_badge', badge);
    localStorage.setItem('casting_hero_title', title);
    localStorage.setItem('casting_hero_subtitle', subtitle);
    localStorage.setItem('casting_hero_desc', desc);
    localStorage.setItem('casting_hero_image', image);
  };

  const handleUpdateContact = (phone: string, b2b: string, collab: string) => {
    setContactPhone(phone);
    setContactB2bEmail(b2b);
    setContactCollabEmail(collab);
    localStorage.setItem('casting_contact_phone', phone);
    localStorage.setItem('casting_contact_b2b_email', b2b);
    localStorage.setItem('casting_contact_collab_email', collab);
  };

  const handleUpdateContactLocations = (
    hqN: string, hqA: string, hqC: string, hqH: string, hqM: string,
    roasteryN: string, roasteryA: string, roasteryC: string, roasteryH: string, roasteryM: string
  ) => {
    setHqName(hqN);
    setHqAddress(hqA);
    setHqContact(hqC);
    setHqHours(hqH);
    setHqMapImage(hqM);

    setRoasteryName(roasteryN);
    setRoasteryAddress(roasteryA);
    setRoasteryContact(roasteryC);
    setRoasteryHours(roasteryH);
    setRoasteryMapImage(roasteryM);

    localStorage.setItem('casting_hq_name', hqN);
    localStorage.setItem('casting_hq_address', hqA);
    localStorage.setItem('casting_hq_contact', hqC);
    localStorage.setItem('casting_hq_hours', hqH);
    localStorage.setItem('casting_hq_map_image', hqM);

    localStorage.setItem('casting_roastery_name', roasteryN);
    localStorage.setItem('casting_roastery_address', roasteryA);
    localStorage.setItem('casting_roastery_contact', roasteryC);
    localStorage.setItem('casting_roastery_hours', roasteryH);
    localStorage.setItem('casting_roastery_map_image', roasteryM);
  };

  const handleUpdateLayoutImages = (
    teaser: string, phil1: string, phil2: string, phil3: string
  ) => {
    setTeaserImage(teaser);
    setPhilosophyImage1(phil1);
    setPhilosophyImage2(phil2);
    setPhilosophyImage3(phil3);

    localStorage.setItem('casting_teaser_image', teaser);
    localStorage.setItem('casting_phil_image_1', phil1);
    localStorage.setItem('casting_phil_image_2', phil2);
    localStorage.setItem('casting_phil_image_3', phil3);
  };

  const handleUpdateProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem('casting_products', JSON.stringify(updatedProducts));
  };

  const handleUpdateArtists = (updatedArtists: ArtistIP[]) => {
    setArtists(updatedArtists);
    localStorage.setItem('casting_artists', JSON.stringify(updatedArtists));
  };

  const handleResetDefaults = () => {
    localStorage.removeItem('casting_brand_name_1');
    localStorage.removeItem('casting_brand_name_2');
    localStorage.removeItem('casting_hero_badge');
    localStorage.removeItem('casting_hero_title');
    localStorage.removeItem('casting_hero_subtitle');
    localStorage.removeItem('casting_hero_desc');
    localStorage.removeItem('casting_hero_image');
    localStorage.removeItem('casting_contact_phone');
    localStorage.removeItem('casting_contact_b2b_email');
    localStorage.removeItem('casting_contact_collab_email');
    localStorage.removeItem('casting_hq_name');
    localStorage.removeItem('casting_hq_address');
    localStorage.removeItem('casting_hq_contact');
    localStorage.removeItem('casting_hq_hours');
    localStorage.removeItem('casting_hq_map_image');
    localStorage.removeItem('casting_roastery_name');
    localStorage.removeItem('casting_roastery_address');
    localStorage.removeItem('casting_roastery_contact');
    localStorage.removeItem('casting_roastery_hours');
    localStorage.removeItem('casting_roastery_map_image');
    localStorage.removeItem('casting_teaser_image');
    localStorage.removeItem('casting_phil_image_1');
    localStorage.removeItem('casting_phil_image_2');
    localStorage.removeItem('casting_phil_image_3');
    localStorage.removeItem('casting_products');
    localStorage.removeItem('casting_artists');

    setBrandName1('CASTING');
    setBrandName2('COFFEE');
    setHeroBadge('BRAND ESSENCE');
    setHeroTitle("We Don't Just Roast. We Cast.");
    setHeroSubtitle('우리는 단순히 로스팅하지 않습니다. 우리는 캐스팅합니다.');
    setHeroDesc("산지의 테루아부터 최적의 로스팅 포인트까지, 캐스팅커피는 오직 완벽한 한 잔을 위해 모든 과정을 '캐스팅'합니다. 이제 당신의 일상에 가장 어울리는 커피를 캐스팅해 보세요.");
    setHeroImage('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80');
    setContactPhone('02-543-1202 | 평일 09:30 - 18:00');
    setContactB2bEmail('b2b@castingcoffee.com');
    setContactCollabEmail('collaboration@castingcoffee.com');

    setHqName('캐스팅커피 크리에이티브 스튜디오');
    setHqAddress('서울특별시 성동구 아차산로 17길 49, 3층');
    setHqContact('02-543-1202 | contact@castingcoffee.com');
    setHqHours('MON - FRI : 09:00 - 18:00 (WEEKENDS CLOSED)');
    setHqMapImage('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80');

    setRoasteryName('캐스팅커피 테크니컬 스마트 팩토리');
    setRoasteryAddress('경기도 남양주시 화도읍 수레로 112번길 18');
    setRoasteryContact('031-591-1203 | roastery@castingcoffee.com');
    setRoasteryHours('MON - SAT : 08:00 - 17:00 (SUNDAY CLOSED)');
    setRoasteryMapImage('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80');

    setTeaserImage('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80');
    setPhilosophyImage1('https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1000&q=80');
    setPhilosophyImage2('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80');
    setPhilosophyImage3('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80');

    setProducts(DEFAULT_PRODUCTS);
    setArtists(DEFAULT_ARTISTS);

    triggerNotification('모든 데이터를 시스템 초기 공장 초기값으로 복원했습니다.');
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    triggerNotification('선택한 상품이 장바구니에서 삭제되었습니다.');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // When a category card in Landing page Section 3 is clicked, redirect to Shop with that filter
  const handleEmbedCategorySelected = (catId: 'cafe' | 'home' | 'drip' | 'goods') => {
    setActiveTab('shop');
    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    triggerNotification(`"${catId.toUpperCase()}" 카테고리로 필터링되었습니다.`);
  };

  // Cart Item count
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const footerLogoLetter = brandName1 ? brandName1.trim().charAt(0).toUpperCase() : 'C';

  return (
    <div className="bg-[#EFF3FD] text-[#1C1A17] min-h-screen font-sans antialiased selection:bg-[#FF5C00]/25 selection:text-[#FF5C00]">
      
      {/* GNB Navigation Header */}
      <GNB
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        brandName1={brandName1}
        brandName2={brandName2}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Primary Container View Swap */}
      <main className="min-h-[70vh]">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Section 1: Hero Banner */}
              <HeroSection
                onNavigateToShop={() => setActiveTab('shop')}
                onNavigateToKPop={() => setActiveTab('kpop')}
                brandName1={brandName1}
                brandName2={brandName2}
                heroBadge={heroBadge}
                heroTitle={heroTitle}
                heroSubtitle={heroSubtitle}
                heroDesc={heroDesc}
                heroImage={heroImage}
              />

              {/* Section 2: Core Concept Brand Philosophy */}
              <PhilosophySection
                philosophyImage1={philosophyImage1}
                philosophyImage2={philosophyImage2}
                philosophyImage3={philosophyImage3}
              />

              {/* Section 3: Four Editions Product Category Grid (Embedded Layout) */}
              <ShopGrid
                onAddToCart={handleAddToCart}
                onShowNotification={triggerNotification}
                embedded={true}
                onCategorySelectedFromEmbed={handleEmbedCategorySelected}
                products={products}
              />

              {/* Section 4: K-POP League Showcase Teaser */}
              <section className="bg-white py-16 md:py-24 border-b border-[#EBE8E2]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6 space-y-6">
                    <span className="font-mono text-xs font-black tracking-[0.2em] text-[#FF5C00] uppercase block">
                      04 / GLOBAL K-POP STAGE
                    </span>
                    <h2 className="font-sans font-black text-3xl tracking-tight text-[#1C1A17]">
                      당신의 한 표가 만드는<br />새로운 커피 에디션
                    </h2>
                    <p className="font-sans font-medium text-sm sm:text-base text-[#5C564E] leading-relaxed">
                      매월 팬들이 직접 투표에 참여해 응원하는 아티스트를 캐스팅합니다. 최종 1위에 선정된 라이징 그룹은 시그니처 드립백 패키지 일러스트와 굿즈 앰버서더로 공식 캐스팅되어 무대에 오르게 됩니다.
                    </p>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                      <button
                        onClick={() => {
                          setActiveTab('kpop');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-6 py-3.5 bg-[#1C1A17] hover:bg-[#FF5C00] text-white font-sans font-black text-xs tracking-widest transition-colors duration-300"
                      >
                        라이브 리그 투표하러 가기 →
                      </button>
                    </div>
                  </div>

                  {/* Graphic Representation */}
                  <div className="lg:col-span-6 relative flex justify-center">
                    <div className="relative aspect-[16/10] w-full max-w-lg bg-[#FAF9F6] border border-[#EBE8E2] overflow-hidden p-6 group">
                      <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900/60 to-transparent z-10" />
                      <img
                        src={teaserImage}
                        alt="K-POP League Dynamic stage representation"
                        className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 contrast-115 transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="relative z-20 text-white flex flex-col justify-between h-full">
                        <span className="font-mono text-[9px] bg-[#FF5C00] text-white px-2 py-0.5 self-start font-bold tracking-widest uppercase">
                          ACTIVE ROUND
                        </span>
                        
                        <div className="space-y-1">
                          <span className="font-sans font-black text-xs block text-[#FF5C00]">NOW STREAMING VOTE</span>
                          <h4 className="font-sans font-black text-lg tracking-tight">Casting League: Season 1 Prelude</h4>
                          <p className="font-sans text-[11px] text-[#FCFBF9]/90">루시드, 솔라리스, 비비드 등 글로벌 신인 보이/걸그룹의 뜨거운 격전지</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'shop' && (
            <motion.div
              key="shop"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <ShopGrid
                onAddToCart={handleAddToCart}
                onShowNotification={triggerNotification}
                products={products}
              />
            </motion.div>
          )}

          {activeTab === 'story' && (
            <motion.div
              key="story"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-12"
            >
              {/* Philosophy Overview */}
              <PhilosophySection
                philosophyImage1={philosophyImage1}
                philosophyImage2={philosophyImage2}
                philosophyImage3={philosophyImage3}
              />

              {/* Rich Narrative / Timeline explaining "Casting" and Expert customization vision */}
              <section className="bg-white py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                  
                  {/* Detailed definitions */}
                  <div className="space-y-6">
                    <span className="font-mono text-xs font-black tracking-[0.2em] text-[#FF5C00] uppercase block text-center">
                      OUR VISION BOARD
                    </span>
                    <h2 className="font-sans font-black text-3xl tracking-tight text-center text-[#1C1A17]">
                      일상 속 전문가의 감각을 캐스팅하다
                    </h2>
                    <p className="font-sans font-medium text-sm sm:text-base text-[#5C564E] leading-relaxed text-center max-w-2xl mx-auto">
                      {brandName1}{brandName2}는 단순한 원두 브랜드를 넘어, 자신만의 곧은 취향을 견지해나가는 이 세상 모든 분야의 아티스트들과 협업하여 취향을 공동 디자인하고 브랜드화하는 문화 컨텐츠 기업입니다.
                    </p>
                  </div>

                  {/* Future Blueprint Timeline */}
                  <div className="relative border-l border-[#EBE8E2] pl-8 ml-4 space-y-10">
                    <div className="relative">
                      {/* Timeline dot */}
                      <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#EFF3FD] border-4 border-[#FF5C00] flex items-center justify-center" />
                      
                      <div className="space-y-2">
                        <span className="font-mono text-xs font-bold text-[#FF5C00]">STAGE 01 — CURRENT</span>
                        <h4 className="font-sans font-black text-lg text-[#1C1A17]">K-POP 글로벌 리그 런칭 & 중국 웨이하이 플래그십</h4>
                        <p className="font-sans text-xs sm:text-sm text-[#5C564E] leading-relaxed">
                          에너지 넘치는 신인 K-POP 아이돌들과 손잡고, 글로벌 팬덤이 자발적으로 투표에 참여해 제품 디자인을 결정하는 소통형 F&B 플랫폼의 성공적인 기반을 아시아 지역에 안착시킵니다.
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      {/* Timeline dot */}
                      <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#FCFBF9] border-4 border-[#1C1A17] flex items-center justify-center" />
                      
                      <div className="space-y-2">
                        <span className="font-mono text-xs font-bold text-[#1C1A17]">STAGE 02 — NEXT SEASON</span>
                        <h4 className="font-sans font-black text-lg text-[#1C1A17]">현대무용수, 소설가와의 감각적 향미 페어링</h4>
                        <p className="font-sans text-xs sm:text-sm text-[#5C564E] leading-relaxed">
                          몸짓으로 공기를 디자인하는 무용수와 언어로 세계를 빚어내는 소설가의 깊은 취향을 깊숙이 탐독합니다. 그들의 철학이 투사된 한정 에스프레소 블렌드를 캐스팅하여 선보입니다.
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      {/* Timeline dot */}
                      <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#FCFBF9] border-4 border-[#EBE8E2] flex items-center justify-center" />
                      
                      <div className="space-y-2">
                        <span className="font-mono text-xs font-bold text-[#8C8375]">STAGE 03 — GLOBAL BLUEPRINT</span>
                        <h4 className="font-sans font-black text-lg text-[#1C1A17]">전 세계 소규모 크리에이터 연합 스토어</h4>
                        <p className="font-sans text-xs sm:text-sm text-[#5C564E] leading-relaxed">
                          말레이시아, 몽골, 태국 등 주요 글로벌 아시아 파트너십 허브 매장을 기반으로 각 국가의 고유 크리에이터들과 독립적인 지역 한정 로컬 레이블 원두를 디자인하고 상생하는 탈중앙형 커피 리그를 전개합니다.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'kpop' && (
            <motion.div
              key="kpop"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <KPopLeague
                onShowNotification={triggerNotification}
                onNavigateToContact={() => setActiveTab('contact')}
                artists={artists}
                onUpdateArtists={handleUpdateArtists}
              />
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <ContactSection
                onShowNotification={triggerNotification}
                hqName={hqName}
                hqAddress={hqAddress}
                hqContact={hqContact}
                hqHours={hqHours}
                hqMapImage={hqMapImage}
                roasteryName={roasteryName}
                roasteryAddress={roasteryAddress}
                roasteryContact={roasteryContact}
                roasteryHours={roasteryHours}
                roasteryMapImage={roasteryMapImage}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER SECTION */}
      <footer className="bg-[#1C1A17] text-[#FCFBF9] border-t border-neutral-800 pt-16 pb-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-neutral-800 pb-12">
            
            {/* Branding Column */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#FF5C00] flex items-center justify-center text-white font-bold text-lg tracking-tighter uppercase">
                  {footerLogoLetter}
                </div>
                <div>
                  <span className="font-sans font-black text-xl tracking-tight block leading-none text-white uppercase">
                    {brandName1}
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.25em] text-[#FF5C00] uppercase block font-semibold leading-none mt-1">
                    {brandName2}
                  </span>
                </div>
              </div>
              
              <p className="font-sans text-xs sm:text-sm text-neutral-400 max-w-sm leading-relaxed">
                우리는 원두의 절정을 선별하고, 원산지의 가치를 발굴하며, 아티스트의 취향을 캐스팅합니다. 커피 한 잔으로 확장되는 특별한 문화적 스테이지를 경험해 보세요.
              </p>

              {/* Social links */}
              <div className="flex items-center space-x-3 pt-2">
                <a href="#" className="p-2 bg-neutral-800 hover:bg-[#FF5C00] text-white rounded-none transition-colors duration-200">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 bg-neutral-800 hover:bg-[#FF5C00] text-white rounded-none transition-colors duration-200">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 bg-neutral-800 hover:bg-[#FF5C00] text-white rounded-none transition-colors duration-200">
                  <Share2 className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Links Column 1 */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-sans font-black text-xs text-[#FF5C00] tracking-widest uppercase">NAVIGATION</h4>
              <ul className="space-y-2.5 text-xs text-neutral-400">
                <li><button onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">HOME (브랜드 홈)</button></li>
                <li><button onClick={() => { setActiveTab('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">ONLINE SHOP (쇼핑몰)</button></li>
                <li><button onClick={() => { setActiveTab('story'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">OUR STORY (비전)</button></li>
                <li><button onClick={() => { setActiveTab('kpop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">K-POP LEAGUE (투표)</button></li>
              </ul>
            </div>

            {/* Links Column 2 */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-sans font-black text-xs text-[#FF5C00] tracking-widest uppercase">BUSINESS INQUIRIES</h4>
              <ul className="space-y-2.5 text-xs text-neutral-400">
                <li><span className="text-white font-bold block">가맹상담실 직통 연락</span> {contactPhone}</li>
                <li><span className="text-white font-bold block">원두 정기 납품 & 도매 제휴</span> {contactB2bEmail}</li>
                <li><span className="text-white font-bold block">IP 콜라보 및 제휴 기획팀</span> {contactCollabEmail}</li>
              </ul>
            </div>

          </div>

          {/* Bottom section */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 font-mono text-[10px]">
            <div className="space-y-1 text-center sm:text-left">
              <p>© 2026 {brandName1.toUpperCase()} {brandName2.toUpperCase()} SPECS COMPANY. ALL RIGHTS RESERVED.</p>
              <p className="text-neutral-600">주식회사 {brandName1}스펙스커피 | 대표자: 홍길동 | 성동구 아차산로 17길 49 | 사업자등록번호: 120-81-00000</p>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">TERMS</a>
              <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
              <a href="#" className="hover:text-white transition-colors">B2B PORTAL</a>
            </div>
          </div>

        </div>
      </footer>

      {/* Cart Drawer Panel Module */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onShowNotification={triggerNotification}
      />

      {/* Admin Panel Sliding Overlay */}
      <AdminPanel
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        brandName1={brandName1}
        brandName2={brandName2}
        heroBadge={heroBadge}
        heroTitle={heroTitle}
        heroSubtitle={heroSubtitle}
        heroDesc={heroDesc}
        heroImage={heroImage}
        contactPhone={contactPhone}
        contactB2bEmail={contactB2bEmail}
        contactCollabEmail={contactCollabEmail}
        onUpdateBrand={handleUpdateBrand}
        onUpdateHero={handleUpdateHero}
        onUpdateContact={handleUpdateContact}
        hqName={hqName}
        hqAddress={hqAddress}
        hqContact={hqContact}
        hqHours={hqHours}
        hqMapImage={hqMapImage}
        roasteryName={roasteryName}
        roasteryAddress={roasteryAddress}
        roasteryContact={roasteryContact}
        roasteryHours={roasteryHours}
        roasteryMapImage={roasteryMapImage}
        onUpdateContactLocations={handleUpdateContactLocations}
        teaserImage={teaserImage}
        philosophyImage1={philosophyImage1}
        philosophyImage2={philosophyImage2}
        philosophyImage3={philosophyImage3}
        onUpdateLayoutImages={handleUpdateLayoutImages}
        products={products}
        onUpdateProducts={handleUpdateProducts}
        artists={artists}
        onUpdateArtists={handleUpdateArtists}
        onResetDefaults={handleResetDefaults}
        onShowNotification={triggerNotification}
      />

      {/* Floating back-to-top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 p-3 bg-[#FF5C00] text-white rounded-none shadow-lg hover:bg-[#1C1A17] transition-colors duration-300 z-30 cursor-pointer animate-pulse"
            title="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Admin Floating Access Trigger (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center space-x-2">
        <button
          onClick={() => setAdminOpen(true)}
          className="p-3 bg-[#1C1A17] hover:bg-[#FF5C00] text-white rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center cursor-pointer group border border-neutral-700 hover:border-transparent"
          title="관리자 설정 모드 실행 (Admin Dashboard)"
        >
          <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform" />
        </button>
      </div>

      {/* Custom Stacked Floating Toasts */}
      <div className="fixed bottom-20 left-6 z-50 flex flex-col space-y-2 max-w-sm pointer-events-none">
        <AnimatePresence>
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              className="bg-[#1C1A17] text-white px-5 py-3.5 shadow-2xl border-l-4 border-[#FF5C00] font-sans font-bold text-xs tracking-wide flex items-center space-x-2.5 pointer-events-auto"
            >
              <Sparkles className="w-4 h-4 text-[#FF5C00] flex-shrink-0 animate-spin" style={{ animationDuration: '3s' }} />
              <span>{notif.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
