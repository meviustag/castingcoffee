import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Settings, RefreshCw, Image, Edit, FileText, Check, Coffee, Users, Plus, Award } from 'lucide-react';
import { Product, ArtistIP } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  brandName1: string;
  brandName2: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDesc: string;
  heroImage: string;
  contactPhone: string;
  contactB2bEmail: string;
  contactCollabEmail: string;
  onUpdateBrand: (l1: string, l2: string) => void;
  onUpdateHero: (badge: string, title: string, subtitle: string, desc: string, image: string) => void;
  onUpdateContact: (phone: string, b2b: string, collab: string) => void;
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
  artists: ArtistIP[];
  onUpdateArtists: (artists: ArtistIP[]) => void;
  onResetDefaults: () => void;
  onShowNotification: (msg: string) => void;
}

// Highly stylized Unsplash photo presets that look professional for coffee and K-Pop
const PHOTO_PRESETS = [
  { name: '원두 수확 & 테루아', url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80' },
  { name: '스마트 로스팅 블렌딩', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80' },
  { name: '향긋한 에티오피아 드립', url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80' },
  { name: '부드러운 콜롬비아 드립', url: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=800&q=80' },
  { name: '모닝 홈카페 하우스블렌드', url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80' },
  { name: '프리미엄 드립백 앙코르', url: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80' },
  { name: '스페셜티 솔로이스트 컵', url: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=800&q=80' },
  { name: '포토카드 슬리브 & 굿즈', url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80' },
  { name: '시그니처 매트 오렌지 머그', url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80' },
  { name: '더 스테이지 메탈 텀블러', url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80' },
  { name: 'K-POP 루시드 보이즈', url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80' },
  { name: 'K-POP 솔라리스 스테이지', url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80' },
  { name: 'K-POP 비비드 라이팅스', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80' },
  { name: 'K-POP 엑스리미트 퍼포먼스', url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80' },
];

type Tab = 'brand' | 'product' | 'artist' | 'system';

export default function AdminPanel({
  isOpen,
  onClose,
  brandName1,
  brandName2,
  heroBadge,
  heroTitle,
  heroSubtitle,
  heroDesc,
  heroImage,
  contactPhone,
  contactB2bEmail,
  contactCollabEmail,
  onUpdateBrand,
  onUpdateHero,
  onUpdateContact,
  products,
  onUpdateProducts,
  artists,
  onUpdateArtists,
  onResetDefaults,
  onShowNotification,
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('brand');

  // Tab 1: Brand & Hero local states
  const [localBrand1, setLocalBrand1] = useState(brandName1);
  const [localBrand2, setLocalBrand2] = useState(brandName2);
  const [localHeroBadge, setLocalHeroBadge] = useState(heroBadge);
  const [localHeroTitle, setLocalHeroTitle] = useState(heroTitle);
  const [localHeroSubtitle, setLocalHeroSubtitle] = useState(heroSubtitle);
  const [localHeroDesc, setLocalHeroDesc] = useState(heroDesc);
  const [localHeroImage, setLocalHeroImage] = useState(heroImage);

  // Tab 1: Footer Contact local states
  const [localContactPhone, setLocalContactPhone] = useState(contactPhone);
  const [localContactB2bEmail, setLocalContactB2bEmail] = useState(contactB2bEmail);
  const [localContactCollabEmail, setLocalContactCollabEmail] = useState(contactCollabEmail);

  // Tab 2: Product local states
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [prodName, setProdName] = useState('');
  const [prodSubtitle, setProdSubtitle] = useState('');
  const [prodPrice, setProdPrice] = useState<number>(0);
  const [prodDesc, setProdDesc] = useState('');
  const [prodImage, setProdImage] = useState('');
  const [prodBadge, setProdBadge] = useState('');
  const [prodOrigin, setProdOrigin] = useState('');
  const [prodWeight, setProdWeight] = useState('');
  const [prodRoast, setProdRoast] = useState('');
  const [prodNotes, setProdNotes] = useState<string>('');
  const [prodGuide, setProdGuide] = useState('');

  // Tab 3: Artist local states
  const [selectedArtistId, setSelectedArtistId] = useState<string>('');
  const [artName, setArtName] = useState('');
  const [artVotes, setArtVotes] = useState<number>(0);
  const [artImage, setArtImage] = useState('');
  const [artDesc, setArtDesc] = useState('');

  // Sync state when props change or active product changes
  useEffect(() => {
    setLocalBrand1(brandName1);
    setLocalBrand2(brandName2);
    setLocalHeroBadge(heroBadge);
    setLocalHeroTitle(heroTitle);
    setLocalHeroSubtitle(heroSubtitle);
    setLocalHeroDesc(heroDesc);
    setLocalHeroImage(heroImage);
    setLocalContactPhone(contactPhone);
    setLocalContactB2bEmail(contactB2bEmail);
    setLocalContactCollabEmail(contactCollabEmail);
  }, [brandName1, brandName2, heroBadge, heroTitle, heroSubtitle, heroDesc, heroImage, contactPhone, contactB2bEmail, contactCollabEmail]);

  // Handle product selection change
  useEffect(() => {
    if (products.length > 0) {
      const currentId = selectedProductId || products[0].id;
      if (!selectedProductId) setSelectedProductId(currentId);
      
      const p = products.find(x => x.id === currentId);
      if (p) {
        setProdName(p.name);
        setProdSubtitle(p.subtitle);
        setProdPrice(p.price);
        setProdDesc(p.description);
        setProdImage(p.image);
        setProdBadge(p.badge || '');
        setProdOrigin(p.details.origin || '');
        setProdWeight(p.details.weight || '');
        setProdRoast(p.details.roastLevel || '');
        setProdNotes((p.details.notes || []).join(', '));
        setProdGuide(p.details.brewingGuide || '');
      }
    }
  }, [selectedProductId, products]);

  // Handle artist selection change
  useEffect(() => {
    if (artists.length > 0) {
      const currentId = selectedArtistId || artists[0].id;
      if (!selectedArtistId) setSelectedArtistId(currentId);

      const a = artists.find(x => x.id === currentId);
      if (a) {
        setArtName(a.name);
        setArtVotes(a.votes);
        setArtImage(a.image);
        setArtDesc(a.description);
      }
    }
  }, [selectedArtistId, artists]);

  const handleSaveBrandAndHero = () => {
    onUpdateBrand(localBrand1.trim(), localBrand2.trim());
    onUpdateHero(
      localHeroBadge.trim(),
      localHeroTitle.trim(),
      localHeroSubtitle.trim(),
      localHeroDesc.trim(),
      localHeroImage.trim()
    );
    onUpdateContact(
      localContactPhone.trim(),
      localContactB2bEmail.trim(),
      localContactCollabEmail.trim()
    );
    onShowNotification('상호명, 메인 타이틀 및 고객문의 정보가 성공적으로 반영되었습니다.');
  };

  const handleSaveProduct = () => {
    const updatedProducts = products.map(p => {
      if (p.id === selectedProductId) {
        return {
          ...p,
          name: prodName.trim(),
          subtitle: prodSubtitle.trim(),
          price: Number(prodPrice),
          description: prodDesc.trim(),
          image: prodImage.trim(),
          badge: prodBadge.trim() || undefined,
          details: {
            ...p.details,
            origin: prodOrigin.trim() || undefined,
            weight: prodWeight.trim() || undefined,
            roastLevel: prodRoast.trim() || undefined,
            notes: prodNotes.split(',').map(n => n.trim()).filter(Boolean),
            brewingGuide: prodGuide.trim() || undefined
          }
        };
      }
      return p;
    });
    onUpdateProducts(updatedProducts);
    onShowNotification(`"${prodName}" 상품 정보가 성공적으로 수정되었습니다.`);
  };

  const handleSaveArtist = () => {
    const updatedArtists = artists.map(a => {
      if (a.id === selectedArtistId) {
        return {
          ...a,
          name: artName.trim(),
          votes: Number(artVotes),
          image: artImage.trim(),
          description: artDesc.trim(),
        };
      }
      return a;
    });
    onUpdateArtists(updatedArtists);
    onShowNotification(`"${artName}" 아티스트 정보가 성공적으로 수정되었습니다.`);
  };

  const handleReset = () => {
    if (window.confirm('모든 상호, 텍스트, 이미지 및 상품 데이터를 초기 기본값으로 되돌리시겠습니까?')) {
      onResetDefaults();
      onClose();
    }
  };

  const applyPresetImage = (url: string, target: 'hero' | 'product' | 'artist') => {
    if (target === 'hero') {
      setLocalHeroImage(url);
    } else if (target === 'product') {
      setProdImage(url);
    } else if (target === 'artist') {
      setArtImage(url);
    }
    onShowNotification('선택하신 고화질 프리미엄 이미지가 입력란에 반영되었습니다.');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1C1A17] z-50 pointer-events-auto"
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-2xl bg-[#FCFBF9] text-[#1C1A17] z-50 shadow-2xl border-l border-[#EBE8E2] flex flex-col pointer-events-auto overflow-hidden"
            id="admin-settings-panel"
          >
            {/* Header */}
            <div className="px-6 py-5 bg-[#1C1A17] text-white flex items-center justify-between border-b border-neutral-800">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FF5C00] flex items-center justify-center text-white">
                  <Settings className="w-4.5 h-4.5 animate-spin" style={{ animationDuration: '6s' }} />
                </div>
                <div>
                  <h2 className="font-sans font-black text-sm tracking-widest uppercase">
                    CASTING ADMIN CONTROL PANEL
                  </h2>
                  <p className="font-mono text-[9px] text-[#FF5C00] tracking-wider uppercase font-black">
                    수정 즉시 전체 페이지 실시간 렌더링 반영
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-[#EBE8E2] bg-[#F0EDE7]/50 font-sans font-bold text-xs">
              <button
                onClick={() => setActiveTab('brand')}
                className={`flex-1 py-4 text-center border-b-2 tracking-wider flex items-center justify-center space-x-1.5 transition-colors cursor-pointer ${
                  activeTab === 'brand'
                    ? 'border-[#FF5C00] text-[#FF5C00] bg-white font-black'
                    : 'border-transparent text-[#5C564E] hover:text-[#1C1A17] hover:bg-[#F0EDE7]/30'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">상호 & 메인</span>
                <span className="sm:hidden">상호</span>
              </button>
              <button
                onClick={() => setActiveTab('product')}
                className={`flex-1 py-4 text-center border-b-2 tracking-wider flex items-center justify-center space-x-1.5 transition-colors cursor-pointer ${
                  activeTab === 'product'
                    ? 'border-[#FF5C00] text-[#FF5C00] bg-white font-black'
                    : 'border-transparent text-[#5C564E] hover:text-[#1C1A17] hover:bg-[#F0EDE7]/30'
                }`}
              >
                <Coffee className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">제품 메뉴 관리</span>
                <span className="sm:hidden">제품</span>
              </button>
              <button
                onClick={() => setActiveTab('artist')}
                className={`flex-1 py-4 text-center border-b-2 tracking-wider flex items-center justify-center space-x-1.5 transition-colors cursor-pointer ${
                  activeTab === 'artist'
                    ? 'border-[#FF5C00] text-[#FF5C00] bg-white font-black'
                    : 'border-transparent text-[#5C564E] hover:text-[#1C1A17] hover:bg-[#F0EDE7]/30'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">아티스트 투표</span>
                <span className="sm:hidden">투표</span>
              </button>
              <button
                onClick={() => setActiveTab('system')}
                className={`flex-1 py-4 text-center border-b-2 tracking-wider flex items-center justify-center space-x-1.5 transition-colors cursor-pointer ${
                  activeTab === 'system'
                    ? 'border-[#FF5C00] text-[#FF5C00] bg-white font-black'
                    : 'border-transparent text-[#5C564E] hover:text-[#1C1A17] hover:bg-[#F0EDE7]/30'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">시스템 리셋</span>
                <span className="sm:hidden">리셋</span>
              </button>
            </div>

            {/* Scrollable Workspace */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
              
              {/* TAB 1: Brand & Hero Settings */}
              {activeTab === 'brand' && (
                <div className="space-y-6">
                  <div className="bg-[#FF5C00]/5 p-4 border-l-2 border-[#FF5C00] rounded-none">
                    <span className="font-mono text-[9px] text-[#FF5C00] font-black tracking-widest block uppercase mb-1">BRAND IDENTITY & HERO COPY</span>
                    <p className="font-sans text-[11px] text-[#5C564E] leading-relaxed">
                      매장의 가판 상호명과, 첫 메인화면에 번갈아 나오는 슬로건 문구, 대표 이미지를 손쉽게 변경할 수 있습니다.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-sans font-black text-sm tracking-tight text-[#1C1A17] border-b border-[#EBE8E2] pb-1.5 uppercase">
                      01 / 상호명 변경 (Brand Business Name)
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-sans font-bold text-xs text-[#5C564E] block">상호 첫째 줄 (영어 대문자 권장)</label>
                        <input
                          type="text"
                          value={localBrand1}
                          onChange={(e) => setLocalBrand1(e.target.value)}
                          className="w-full px-3 py-2 border border-[#EBE8E2] text-xs font-black bg-[#F8FAFD] focus:outline-none focus:border-[#FF5C00] focus:bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-sans font-bold text-xs text-[#5C564E] block">상호 둘째 줄 (영어 대문자 권장)</label>
                        <input
                          type="text"
                          value={localBrand2}
                          onChange={(e) => setLocalBrand2(e.target.value)}
                          className="w-full px-3 py-2 border border-[#EBE8E2] text-xs font-black bg-[#F8FAFD] focus:outline-none focus:border-[#FF5C00] focus:bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-sans font-black text-sm tracking-tight text-[#1C1A17] border-b border-[#EBE8E2] pb-1.5 uppercase">
                      02 / 메인 히어로 텍스트 & 사진 (Hero Content)
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-1">
                        <label className="font-sans font-bold text-xs text-[#5C564E] block">상단 소형 뱃지 (Badge)</label>
                        <input
                          type="text"
                          value={localHeroBadge}
                          onChange={(e) => setLocalHeroBadge(e.target.value)}
                          className="w-full px-3 py-2 border border-[#EBE8E2] text-xs bg-[#F8FAFD] focus:outline-none focus:border-[#FF5C00] focus:bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-sans font-bold text-xs text-[#5C564E] block">메인 한글 타이틀 (Hero Title)</label>
                        <input
                          type="text"
                          value={localHeroTitle}
                          onChange={(e) => setLocalHeroTitle(e.target.value)}
                          className="w-full px-3 py-2 border border-[#EBE8E2] text-xs bg-[#F8FAFD] focus:outline-none focus:border-[#FF5C00] focus:bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-sans font-bold text-xs text-[#5C564E] block">메인 서브 슬로건 (Hero Subtitle)</label>
                        <input
                          type="text"
                          value={localHeroSubtitle}
                          onChange={(e) => setLocalHeroSubtitle(e.target.value)}
                          className="w-full px-3 py-2 border border-[#EBE8E2] text-xs bg-[#F8FAFD] focus:outline-none focus:border-[#FF5C00] focus:bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-sans font-bold text-xs text-[#5C564E] block">메인 상세 문장 설명 (Hero Description)</label>
                        <textarea
                          rows={3}
                          value={localHeroDesc}
                          onChange={(e) => setLocalHeroDesc(e.target.value)}
                          className="w-full px-3 py-2 border border-[#EBE8E2] text-xs bg-[#F8FAFD] focus:outline-none focus:border-[#FF5C00] focus:bg-white resize-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-sans font-bold text-xs text-[#5C564E] block">메인 사진 이미지 주소 (Hero Image URL)</label>
                        <input
                          type="text"
                          value={localHeroImage}
                          onChange={(e) => setLocalHeroImage(e.target.value)}
                          className="w-full px-3 py-2 border border-[#EBE8E2] text-xs font-mono bg-[#F8FAFD] focus:outline-none focus:border-[#FF5C00] focus:bg-white"
                        />
                        <div className="text-[10px] text-neutral-500 font-sans">
                          * Unsplash 등 고화질 절대 주소를 입력하거나 아래 제공되는 프리미엄 커피/아이돌 고화질 프리셋을 원클릭 적용해보세요.
                        </div>
                      </div>
                    </div>

                    {/* Image Presets Selector for Hero */}
                    <div className="space-y-2 pt-2">
                      <span className="font-sans font-bold text-[10px] text-neutral-400 block uppercase">RECOMMENDED PHOTO PRESETS (클릭 시 이미지 즉시 적용)</span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {PHOTO_PRESETS.slice(0, 7).map((p) => (
                          <button
                            key={p.name}
                            type="button"
                            onClick={() => applyPresetImage(p.url, 'hero')}
                            className="p-1.5 border border-[#EBE8E2] bg-[#F8FAFD] hover:bg-[#FF5C00]/5 hover:border-[#FF5C00] text-left rounded-none transition-colors duration-200"
                          >
                            <div className="h-10 w-full overflow-hidden mb-1 bg-gray-200">
                              <img src={p.url} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                            </div>
                            <span className="font-sans text-[9px] font-bold text-[#1C1A17] block truncate leading-tight">{p.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 03 / 고객문의 정보 변경 (Business Inquiries Settings) */}
                    <div className="space-y-4 pt-4 border-t border-[#EBE8E2]">
                      <h3 className="font-sans font-black text-sm tracking-tight text-[#1C1A17] border-b border-[#EBE8E2] pb-1.5 uppercase">
                        03 / 고객 및 제휴 문의처 변경 (Business Inquiries)
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-1">
                          <label className="font-sans font-bold text-xs text-[#5C564E] block">가맹상담실 직통 연락처</label>
                          <input
                            type="text"
                            value={localContactPhone}
                            onChange={(e) => setLocalContactPhone(e.target.value)}
                            className="w-full px-3 py-2 border border-[#EBE8E2] text-xs bg-[#F8FAFD] focus:outline-none focus:border-[#FF5C00] focus:bg-white"
                            placeholder="02-543-1202 | 평일 09:30 - 18:00"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-sans font-bold text-xs text-[#5C564E] block">원두 정기 납품 & 도매 제휴 이메일</label>
                          <input
                            type="text"
                            value={localContactB2bEmail}
                            onChange={(e) => setLocalContactB2bEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-[#EBE8E2] text-xs font-mono bg-[#F8FAFD] focus:outline-none focus:border-[#FF5C00] focus:bg-white"
                            placeholder="b2b@castingcoffee.com"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-sans font-bold text-xs text-[#5C564E] block">IP 콜라보 및 제휴 기획팀 이메일</label>
                          <input
                            type="text"
                            value={localContactCollabEmail}
                            onChange={(e) => setLocalContactCollabEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-[#EBE8E2] text-xs font-mono bg-[#F8FAFD] focus:outline-none focus:border-[#FF5C00] focus:bg-white"
                            placeholder="collaboration@castingcoffee.com"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleSaveBrandAndHero}
                    className="w-full py-3.5 bg-[#FF5C00] hover:bg-[#E05200] text-white font-sans font-black text-xs tracking-widest transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>상호 및 메인 정보 적용하기</span>
                  </button>
                </div>
              )}

              {/* TAB 2: Product Menu Management */}
              {activeTab === 'product' && (
                <div className="space-y-6">
                  <div className="bg-[#FF5C00]/5 p-4 border-l-2 border-[#FF5C00] rounded-none">
                    <span className="font-mono text-[9px] text-[#FF5C00] font-black tracking-widest block uppercase mb-1">PRODUCT MENU MANAGEMENT</span>
                    <p className="font-sans text-[11px] text-[#5C564E] leading-relaxed">
                      온라인 숍에 노출되는 에디션 상품의 이름, 가격, 소제목, 제품 상세 내용 및 사진을 실시간으로 편집/수정할 수 있습니다.
                    </p>
                  </div>

                  {/* Dropdown Selector */}
                  <div className="space-y-1 bg-[#F8FAFD] p-4 border border-[#EBE8E2]">
                    <label className="font-sans font-black text-xs text-[#1C1A17] block">수정할 상품 선택 (Select Product)</label>
                    <select
                      value={selectedProductId}
                      onChange={(e) => setSelectedProductId(e.target.value)}
                      className="w-full px-3 py-2 border border-[#EBE8E2] text-xs font-bold bg-white focus:outline-none focus:border-[#FF5C00]"
                    >
                      {products.map(p => (
                        <option key={p.id} value={p.id}>
                          [{p.category.toUpperCase()}] {p.name} - ₩{p.price.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Product Form fields */}
                  <div className="space-y-4">
                    <h3 className="font-sans font-black text-sm tracking-tight text-[#1C1A17] border-b border-[#EBE8E2] pb-1.5 uppercase">
                      선택 상품 편집 (Editing Product details)
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-sans font-bold text-xs text-[#5C564E] block">상품 한글/영문 이름</label>
                        <input
                          type="text"
                          value={prodName}
                          onChange={(e) => setProdName(e.target.value)}
                          className="w-full px-3 py-2 border border-[#EBE8E2] text-xs bg-[#F8FAFD] focus:outline-none focus:border-[#FF5C00] focus:bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-sans font-bold text-xs text-[#5C564E] block">소제목 / 부가설명 뱃지</label>
                        <input
                          type="text"
                          value={prodSubtitle}
                          onChange={(e) => setProdSubtitle(e.target.value)}
                          className="w-full px-3 py-2 border border-[#EBE8E2] text-xs bg-[#F8FAFD] focus:outline-none focus:border-[#FF5C00] focus:bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-sans font-bold text-xs text-[#5C564E] block">소비자 판매가 (₩ 원화 정수만)</label>
                        <input
                          type="number"
                          value={prodPrice}
                          onChange={(e) => setProdPrice(Number(e.target.value))}
                          className="w-full px-3 py-2 border border-[#EBE8E2] text-xs bg-[#F8FAFD] focus:outline-none focus:border-[#FF5C00] focus:bg-white font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-sans font-bold text-xs text-[#5C564E] block">코너 뱃지 (예: Signature / Seasonal)</label>
                        <input
                          type="text"
                          value={prodBadge}
                          onChange={(e) => setProdBadge(e.target.value)}
                          className="w-full px-3 py-2 border border-[#EBE8E2] text-xs bg-[#F8FAFD] focus:outline-none focus:border-[#FF5C00] focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-sans font-bold text-xs text-[#5C564E] block">한 줄 대표 설명 (Description)</label>
                      <textarea
                        rows={2}
                        value={prodDesc}
                        onChange={(e) => setProdDesc(e.target.value)}
                        className="w-full px-3 py-2 border border-[#EBE8E2] text-xs bg-[#F8FAFD] focus:outline-none focus:border-[#FF5C00] focus:bg-white resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-sans font-bold text-xs text-[#5C564E] block">생두 원산지 (Origin)</label>
                        <input
                          type="text"
                          value={prodOrigin}
                          onChange={(e) => setProdOrigin(e.target.value)}
                          className="w-full px-3 py-2 border border-[#EBE8E2] text-xs bg-[#F8FAFD] focus:outline-none focus:border-[#FF5C00] focus:bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-sans font-bold text-xs text-[#5C564E] block">중량 규격 (Weight)</label>
                        <input
                          type="text"
                          value={prodWeight}
                          onChange={(e) => setProdWeight(e.target.value)}
                          className="w-full px-3 py-2 border border-[#EBE8E2] text-xs bg-[#F8FAFD] focus:outline-none focus:border-[#FF5C00] focus:bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-sans font-bold text-xs text-[#5C564E] block">로스팅 강도 (Roast Level)</label>
                        <input
                          type="text"
                          value={prodRoast}
                          onChange={(e) => setProdRoast(e.target.value)}
                          className="w-full px-3 py-2 border border-[#EBE8E2] text-xs bg-[#F8FAFD] focus:outline-none focus:border-[#FF5C00] focus:bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-sans font-bold text-xs text-[#5C564E] block">테이스팅 노트 (쉼표구분 입력)</label>
                        <input
                          type="text"
                          value={prodNotes}
                          onChange={(e) => setProdNotes(e.target.value)}
                          placeholder="Jasmine, Blueberry, Honey"
                          className="w-full px-3 py-2 border border-[#EBE8E2] text-xs bg-[#F8FAFD] focus:outline-none focus:border-[#FF5C00] focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-sans font-bold text-xs text-[#5C564E] block">커피 추출 추천 가이드 (Brewing Guide)</label>
                      <input
                        type="text"
                        value={prodGuide}
                        onChange={(e) => setProdGuide(e.target.value)}
                        className="w-full px-3 py-2 border border-[#EBE8E2] text-xs bg-[#F8FAFD] focus:outline-none focus:border-[#FF5C00] focus:bg-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-sans font-bold text-xs text-[#5C564E] block">상품 사진 이미지 주소 (Product Image URL)</label>
                      <input
                        type="text"
                        value={prodImage}
                        onChange={(e) => setProdImage(e.target.value)}
                        className="w-full px-3 py-2 border border-[#EBE8E2] text-xs font-mono bg-[#F8FAFD] focus:outline-none focus:border-[#FF5C00] focus:bg-white"
                      />
                    </div>

                    {/* Image Presets Selector for Product */}
                    <div className="space-y-2 pt-2">
                      <span className="font-sans font-bold text-[10px] text-neutral-400 block uppercase">PRODUCT PHOTO PRESETS (클릭 시 이미지 변경)</span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {PHOTO_PRESETS.slice(0, 10).map((p) => (
                          <button
                            key={p.name}
                            type="button"
                            onClick={() => applyPresetImage(p.url, 'product')}
                            className="p-1 border border-[#EBE8E2] bg-[#F8FAFD] hover:bg-[#FF5C00]/5 hover:border-[#FF5C00] text-left rounded-none transition-colors duration-200"
                          >
                            <div className="h-8 w-full overflow-hidden bg-gray-200 mb-1">
                              <img src={p.url} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                            </div>
                            <span className="font-sans text-[8px] font-bold text-[#1C1A17] block truncate leading-tight">{p.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleSaveProduct}
                    className="w-full py-3.5 bg-[#FF5C00] hover:bg-[#E05200] text-white font-sans font-black text-xs tracking-widest transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>상품 수정 완료 저장하기</span>
                  </button>
                </div>
              )}

              {/* TAB 3: Artist Settings */}
              {activeTab === 'artist' && (
                <div className="space-y-6">
                  <div className="bg-[#FF5C00]/5 p-4 border-l-2 border-[#FF5C00] rounded-none">
                    <span className="font-mono text-[9px] text-[#FF5C00] font-black tracking-widest block uppercase mb-1">K-POP CANDIDATE MANAGEMENT</span>
                    <p className="font-sans text-[11px] text-[#5C564E] leading-relaxed">
                      K-POP 리그 탭의 실시간 투표에 참여 중인 아티스트들의 이름, 누적 투표수(인위적 조정 가능), 이미지 및 프로필 소개를 직접 바꿀 수 있습니다.
                    </p>
                  </div>

                  {/* Dropdown Selector */}
                  <div className="space-y-1 bg-[#F8FAFD] p-4 border border-[#EBE8E2]">
                    <label className="font-sans font-black text-xs text-[#1C1A17] block">수정할 아티스트 선택 (Select Artist)</label>
                    <select
                      value={selectedArtistId}
                      onChange={(e) => setSelectedArtistId(e.target.value)}
                      className="w-full px-3 py-2 border border-[#EBE8E2] text-xs font-bold bg-white focus:outline-none focus:border-[#FF5C00]"
                    >
                      {artists.map(a => (
                        <option key={a.id} value={a.id}>
                          {a.name} (현재 누적 {a.votes.toLocaleString()}표)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Artist Form fields */}
                  <div className="space-y-4">
                    <h3 className="font-sans font-black text-sm tracking-tight text-[#1C1A17] border-b border-[#EBE8E2] pb-1.5 uppercase">
                      선택 아티스트 프로필 편집 (Editing Artist details)
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-sans font-bold text-xs text-[#5C564E] block">아티스트/그룹명</label>
                        <input
                          type="text"
                          value={artName}
                          onChange={(e) => setArtName(e.target.value)}
                          className="w-full px-3 py-2 border border-[#EBE8E2] text-xs bg-[#F8FAFD] focus:outline-none focus:border-[#FF5C00] focus:bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-sans font-bold text-xs text-[#5C564E] block">누적 강제 득표 수 (Votes Count)</label>
                        <input
                          type="number"
                          value={artVotes}
                          onChange={(e) => setArtVotes(Number(e.target.value))}
                          className="w-full px-3 py-2 border border-[#EBE8E2] text-xs bg-[#F8FAFD] focus:outline-none focus:border-[#FF5C00] focus:bg-white font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-sans font-bold text-xs text-[#5C564E] block">그룹 소개 및 상세 설명 (Description)</label>
                      <textarea
                        rows={3}
                        value={artDesc}
                        onChange={(e) => setArtDesc(e.target.value)}
                        className="w-full px-3 py-2 border border-[#EBE8E2] text-xs bg-[#F8FAFD] focus:outline-none focus:border-[#FF5C00] focus:bg-white resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-sans font-bold text-xs text-[#5C564E] block">아티스트 사진 이미지 주소 (Artist Image URL)</label>
                      <input
                        type="text"
                        value={artImage}
                        onChange={(e) => setArtImage(e.target.value)}
                        className="w-full px-3 py-2 border border-[#EBE8E2] text-xs font-mono bg-[#F8FAFD] focus:outline-none focus:border-[#FF5C00] focus:bg-white"
                      />
                    </div>

                    {/* Image Presets Selector for Artist */}
                    <div className="space-y-2 pt-2">
                      <span className="font-sans font-bold text-[10px] text-neutral-400 block uppercase">K-POP ARTIST PHOTO PRESETS (클릭 시 이미지 변경)</span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {PHOTO_PRESETS.slice(10, 14).map((p) => (
                          <button
                            key={p.name}
                            type="button"
                            onClick={() => applyPresetImage(p.url, 'artist')}
                            className="p-1 border border-[#EBE8E2] bg-[#F8FAFD] hover:bg-[#FF5C00]/5 hover:border-[#FF5C00] text-left rounded-none transition-colors duration-200"
                          >
                            <div className="h-8 w-full overflow-hidden bg-gray-200 mb-1">
                              <img src={p.url} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                            </div>
                            <span className="font-sans text-[8px] font-bold text-[#1C1A17] block truncate leading-tight">{p.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleSaveArtist}
                    className="w-full py-3.5 bg-[#FF5C00] hover:bg-[#E05200] text-white font-sans font-black text-xs tracking-widest transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>아티스트 수정 완료 저장하기</span>
                  </button>
                </div>
              )}

              {/* TAB 4: System Reset */}
              {activeTab === 'system' && (
                <div className="space-y-6 py-4">
                  <div className="bg-red-50 p-5 border-l-4 border-red-500 space-y-2 text-[#1C1A17]">
                    <span className="font-sans font-black text-xs text-red-600 block">DANGER AREA / 데이터 초기화</span>
                    <p className="font-sans text-xs text-[#5C564E] leading-relaxed">
                      상호명, 상품 메뉴의 이름, 가격, 이미지, K-POP 아티스트의 득표수 등 로컬 스토리지에 캐싱된 모든 수정 정보가 삭제되고 본사 오리지널 초안 데이터로 순식간에 복원됩니다.
                    </p>
                  </div>

                  <div className="bg-[#FAF9F6] border border-[#EBE8E2] p-6 space-y-4 text-center">
                    <RefreshCw className="w-8 h-8 text-neutral-400 mx-auto animate-spin" style={{ animationDuration: '4s' }} />
                    <div className="space-y-1">
                      <h4 className="font-sans font-black text-sm text-[#1C1A17]">본사 오리지널 템플릿 복원</h4>
                      <p className="font-sans text-xs text-[#5C564E] max-w-sm mx-auto leading-relaxed">
                        실험 도중 레이아웃이 어긋나거나 기본 상품 사양을 복구하고 싶을 때 안전한 원클릭 복원을 추천합니다.
                      </p>
                    </div>

                    <button
                      onClick={handleReset}
                      className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-sans font-black text-xs tracking-widest transition-colors inline-flex items-center space-x-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>원래 기본 데이터로 전체 초기화하기</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Footer Close */}
            <div className="p-4 border-t border-[#EBE8E2] bg-[#F8FAFD] flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#1C1A17] hover:bg-[#FF5C00] text-white font-sans font-bold text-xs tracking-wider transition-colors"
              >
                닫기 (CLOSE)
              </button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
