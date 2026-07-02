import { Eye, Plus, Check, ShoppingCart, Coffee, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { PRODUCTS } from '../data';
import { Product } from '../types';

interface ShopGridProps {
  onAddToCart: (product: Product, quantity: number) => void;
  onShowNotification: (message: string) => void;
  embedded?: boolean; // If true, behaves as Section 3 of the main page (minimalist 4-grid)
  onCategorySelectedFromEmbed?: (category: 'cafe' | 'home' | 'drip' | 'goods') => void;
  products?: Product[];
}

export default function ShopGrid({ onAddToCart, onShowNotification, embedded = false, onCategorySelectedFromEmbed, products = PRODUCTS }: ShopGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'cafe' | 'home' | 'drip' | 'goods'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalQuantity, setModalQuantity] = useState(1);

  // Filter products
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'ALL EDITIONS' },
    { id: 'cafe', label: 'FOR CAFÉ (업소용)' },
    { id: 'home', label: 'FOR HOME (홈카페)' },
    { id: 'drip', label: 'DRIP BAG (드립백)' },
    { id: 'goods', label: 'ARTIST GOODS (굿즈)' }
  ];

  // Minimalist 4 Editions for the Home Page storyboard
  const embeddedCategories = [
    {
      id: 'cafe',
      title: 'For Café',
      korTitle: '카페용 에스프레소 에디션',
      desc: '스마트 로스터리가 빚어낸 균일한 프리미엄 블렌드 원두 (B2B 벌크)',
      bgImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'home',
      title: 'For Home',
      korTitle: '홈카페 스페셜티 원두',
      desc: '일상의 공간을 나만의 특별한 무대로 만들어줄 싱글오리진 원두',
      bgImage: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'drip',
      title: 'Drip Bag',
      korTitle: '프리미엄 드립백 라인',
      desc: '언제 어디서나 봉투를 뜯고 물만 부으면 완벽하게 피어나는 풍미',
      bgImage: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'goods',
      title: 'Artist Goods',
      korTitle: '아이돌 콜라보 & 굿즈',
      desc: '시즌 1위 캐스팅 아티스트의 한정판 포토카드 슬리브 팩과 에디션 머그',
      bgImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    }
  ];

  const handleAddToCart = (product: Product, qty: number) => {
    onAddToCart(product, qty);
    onShowNotification(`"${product.name}" ${qty}개가 장바구니에 추가되었습니다.`);
    if (selectedProduct) {
      setSelectedProduct(null);
    }
  };

  // If embedded, display the 4-split story card grid
  if (embedded) {
    return (
      <section className="bg-[#EFF3FD] py-16 md:py-24 border-b border-[#EBE8E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Headings */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="font-mono text-xs font-black tracking-[0.2em] text-[#FF5C00] uppercase block mb-3">
                02 / FOUR EDITIONS
              </span>
              <h2 className="font-sans font-black text-3xl tracking-tight text-[#1C1A17]">
                Casting Coffee Lineup
              </h2>
            </div>
            <p className="font-sans font-medium text-xs sm:text-sm text-[#5C564E] max-w-md mt-4 md:mt-0 leading-relaxed">
              업소용 납품 원두부터 가정용 싱글오리진, 간편한 드립백, 그리고 아이돌 콜라보 굿즈까지. 당신에게 어울리는 최고의 에디션을 캐스팅하세요.
            </p>
          </div>

          {/* 4-split Grid Card Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {embeddedCategories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => onCategorySelectedFromEmbed && onCategorySelectedFromEmbed(cat.id as any)}
                className="group relative h-[400px] bg-white border border-[#EBE8E2] overflow-hidden p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-[#FF5C00] shadow-sm hover:shadow-xl"
                id={`embed-cat-card-${cat.id}`}
              >
                {/* Background image fade-in */}
                <div className="absolute inset-0 bg-neutral-900/40 z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                <img
                  src={cat.bgImage}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />

                {/* Top Corner Number */}
                <div className="relative z-20 flex justify-between items-start">
                  <span className="font-mono text-sm text-[#EFF3FD] font-bold group-hover:text-[#FFE600] transition-colors duration-300">
                    EDITION 0{idx + 1}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-[#EFF3FD]/30 flex items-center justify-center text-[#EFF3FD] group-hover:bg-[#FF5C00] group-hover:border-[#FF5C00] transition-all duration-300">
                    <Plus className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Information */}
                <div className="relative z-20 text-white space-y-2">
                  <span className="font-mono text-[10px] bg-[#FF5C00] text-white px-2 py-0.5 tracking-widest font-black uppercase inline-block">
                    {cat.id}
                  </span>
                  <h3 className="font-sans font-black text-2xl tracking-tight leading-none">
                    {cat.title}
                  </h3>
                  <p className="font-sans font-bold text-xs text-[#EFF3FD]/90">
                    {cat.korTitle}
                  </p>
                  <p className="font-sans text-[11px] text-[#EBE8E2]/80 leading-snug line-clamp-2 pt-1">
                    {cat.desc}
                  </p>
                  
                  {/* Visual Arrow link indicator on hover */}
                  <div className="flex items-center space-x-1.5 font-mono text-[10px] font-bold text-[#FFE600] pt-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span>EXPLORE THE LIST</span>
                    <span>→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    );
  }

  // Otherwise, full SHOP tab system
  return (
    <div className="bg-[#EFF3FD] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SHOP header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-xs font-black tracking-[0.2em] text-[#FF5C00] uppercase block mb-3">
            CASTING COFFEE ONLINE SHOP
          </span>
          <h1 className="font-sans font-black text-4xl sm:text-5xl tracking-tight text-[#1C1A17] mb-4">
            Curated Specialty Selection
          </h1>
          <p className="font-sans font-medium text-sm sm:text-base text-[#5C564E] leading-relaxed">
            전 세계 고산지 산지에서 엄격하게 테루아를 심사해 발굴한 프리미엄 스페셜티 원두와 드립백 컬렉션, 한정 아티스트 제휴 굿즈를 소장해 보세요.
          </p>
        </div>

        {/* Navigation Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-5 py-2.5 font-sans font-bold text-xs tracking-widest transition-all duration-300 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#1C1A17] text-white shadow-md'
                  : 'bg-white text-[#5C564E] hover:text-[#1C1A17] border border-[#EBE8E2]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-white border border-[#EBE8E2] p-5 flex flex-col justify-between hover:border-[#FF5C00] transition-colors duration-300 hover:shadow-lg"
                id={`shop-item-${product.id}`}
              >
                {/* Product Image & Badges */}
                <div className="relative aspect-square w-full bg-[#F8FAFD] overflow-hidden mb-5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Image overlay color gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Absolute Badges */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-[#FFE600] text-[#1C1A17] font-mono text-[9px] font-black tracking-widest px-2.5 py-1 uppercase">
                      {product.badge}
                    </div>
                  )}

                  <div className="absolute top-3 right-3 bg-[#1C1A17] text-[#EFF3FD] font-mono text-[9px] font-black tracking-widest px-2 py-1 uppercase">
                    {product.category}
                  </div>

                  {/* Quick-action overlay panel on desktop hover */}
                  <div className="absolute inset-x-0 bottom-0 bg-black/65 backdrop-blur-xs p-3 flex justify-center items-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setModalQuantity(1);
                      }}
                      className="flex-1 py-2 bg-white text-[#1C1A17] hover:bg-[#FF5C00] hover:text-white font-sans font-black text-xs tracking-widest transition-colors duration-200 flex items-center justify-center space-x-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>DETAILS</span>
                    </button>
                    <button
                      onClick={() => handleAddToCart(product, 1)}
                      className="p-2 bg-[#FF5C00] hover:bg-[#E05200] text-white font-sans text-xs transition-colors duration-200"
                      title="Add one to cart"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Text Info */}
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-[#FF5C00] font-black tracking-widest block uppercase">
                    {product.subtitle}
                  </span>
                  <h3 className="font-sans font-black text-lg text-[#1C1A17] tracking-tight leading-snug group-hover:text-[#FF5C00] transition-colors duration-200 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#5C564E] leading-relaxed line-clamp-2 h-10">
                    {product.description}
                  </p>
                </div>

                {/* Price and Action row */}
                <div className="flex items-center justify-between border-t border-[#EBE8E2] mt-5 pt-4">
                  <span className="font-mono text-base font-black text-[#1C1A17]">
                    ₩{product.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setModalQuantity(1);
                    }}
                    className="md:hidden px-4 py-2 bg-[#1C1A17] text-white font-sans font-bold text-xs tracking-wider flex items-center space-x-1"
                  >
                    <span>자세히 보기</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Product Detail Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-xs"
              />

              {/* Modal Body */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="relative bg-[#F8FAFD] border border-[#EBE8E2] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 z-10 grid grid-cols-1 md:grid-cols-12 gap-8"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 p-1 rounded-full hover:bg-[#F8FAFD] border border-[#EBE8E2] transition-colors duration-200"
                >
                  <span className="font-sans text-xs font-black tracking-widest text-[#5C564E] hover:text-[#1C1A17] block px-2.5 py-1">CLOSE ✕</span>
                </button>

                {/* Left Side Column: Large Image */}
                <div className="md:col-span-5 flex flex-col justify-start space-y-4">
                  <div className="aspect-square bg-[#F8FAFD] border border-[#EBE8E2] overflow-hidden">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  {/* Info specs list */}
                  <div className="bg-[#F8FAFD] p-4 border-l-2 border-[#FF5C00] space-y-2">
                    <span className="font-mono text-[9px] text-[#FF5C00] font-black tracking-widest block">SPECIFICATION</span>
                    {selectedProduct.details.weight && (
                      <div className="flex justify-between font-sans text-xs text-[#5C564E]">
                        <span className="font-bold">중량 (Weight)</span>
                        <span>{selectedProduct.details.weight}</span>
                      </div>
                    )}
                    {selectedProduct.details.roastLevel && (
                      <div className="flex justify-between font-sans text-xs text-[#5C564E]">
                        <span className="font-bold">로스팅 포인트</span>
                        <span>{selectedProduct.details.roastLevel}</span>
                      </div>
                    )}
                    {selectedProduct.details.origin && (
                      <div className="flex justify-between font-sans text-xs text-[#5C564E]">
                        <span className="font-bold">원두 원산지</span>
                        <span className="text-right max-w-[60%] line-clamp-1">{selectedProduct.details.origin}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side Column: Descriptions & Actions */}
                <div className="md:col-span-7 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="font-mono text-xs text-[#FF5C00] font-black tracking-widest block uppercase">
                      {selectedProduct.subtitle}
                    </span>
                    <h2 className="font-sans font-black text-2xl md:text-3xl tracking-tight text-[#1C1A17] leading-tight">
                      {selectedProduct.name}
                    </h2>
                    <p className="font-sans font-semibold text-lg text-[#FF5C00] font-mono">
                      ₩{selectedProduct.price.toLocaleString()}
                    </p>
                    
                    <p className="font-sans text-sm text-[#5C564E] leading-relaxed">
                      {selectedProduct.description}
                    </p>

                    {/* Flavour notes */}
                    {selectedProduct.details.notes && (
                      <div className="space-y-2 pt-2">
                        <span className="font-mono text-[10px] text-[#1C1A17] font-black tracking-widest block">FLAVOR CHARACTERISTICS</span>
                        <div className="flex flex-wrap gap-2">
                          {selectedProduct.details.notes.map((note) => (
                            <span key={note} className="px-3 py-1 bg-white border border-[#EBE8E2] rounded-none font-sans font-bold text-xs text-[#5C564E]">
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Brewing Guide */}
                    {selectedProduct.details.brewingGuide && (
                      <div className="space-y-2 pt-2 bg-[#F0EDE7]/30 p-3 border border-[#EBE8E2]">
                        <div className="flex items-center space-x-1.5 text-[#1C1A17]">
                          <BookOpen className="w-4 h-4 text-[#FF5C00]" />
                          <span className="font-sans font-black text-xs tracking-wide">BREWING / ESPRESSO GUIDE</span>
                        </div>
                        <p className="font-sans text-xs text-[#5C564E] leading-relaxed">
                          {selectedProduct.details.brewingGuide}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Order quantity & Add to cart actions */}
                  <div className="border-t border-[#EBE8E2] pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[#EBE8E2] bg-white">
                      <button
                        onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                        className="px-4 py-2 font-mono text-sm hover:bg-[#F8FAFD] transition-colors"
                      >
                        -
                      </button>
                      <span className="px-6 font-mono text-sm font-bold text-[#1C1A17]">
                        {modalQuantity}
                      </span>
                      <button
                        onClick={() => setModalQuantity(modalQuantity + 1)}
                        className="px-4 py-2 font-mono text-sm hover:bg-[#F8FAFD] transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={() => handleAddToCart(selectedProduct, modalQuantity)}
                      className="flex-1 px-8 py-3.5 bg-[#FF5C00] hover:bg-[#E05200] text-white font-sans font-black text-xs tracking-widest transition-colors flex items-center justify-center space-x-2.5"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>ADD TO CART — ₩{(selectedProduct.price * modalQuantity).toLocaleString()}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
