import { ArrowRight, Sparkles, Coffee } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface HeroSectionProps {
  onNavigateToShop: () => void;
  onNavigateToKPop: () => void;
  brandName1?: string;
  brandName2?: string;
  heroBadge?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDesc?: string;
  heroImage?: string;
}

export default function HeroSection({
  onNavigateToShop,
  onNavigateToKPop,
  brandName1 = 'CASTING',
  brandName2 = 'COFFEE',
  heroBadge,
  heroTitle,
  heroSubtitle,
  heroDesc,
  heroImage,
}: HeroSectionProps) {
  // Option A vs Option B copy toggle
  const [copyOption, setCopyOption] = useState<'A' | 'B'>('A');

  const copyData = {
    A: {
      badge: heroBadge || 'BRAND ESSENCE',
      title: heroTitle || "We Don't Just Roast. We Cast.",
      subtitle: heroSubtitle || '우리는 단순히 로스팅하지 않습니다. 우리는 캐스팅합니다.',
      desc: heroDesc || "산지의 테루아부터 최적의 로스팅 포인트까지, 캐스팅커피는 오직 완벽한 한 잔을 위해 모든 과정을 '캐스팅'합니다. 이제 당신의 일상에 가장 어울리는 커피를 캐스팅해 보세요."
    },
    B: {
      badge: 'GLOBAL & K-POP EXPANSION',
      title: "The Stage of Coffee, Casted for You.",
      subtitle: '당신을 위해 캐스팅된, 커피의 무대.',
      desc: `전 세계의 원두와 아티스트, 그리고 K-POP의 에너지가 만나는 곳. 카페, 홈카페, 드립백을 넘어 당신이 동경하는 전문가들의 취향까지 그대로 캐스팅한 단 하나의 커피 브랜드를 만나보세요.`
    }
  };

  const currentCopy = copyData[copyOption];

  return (
    <section className="relative bg-[#EFF3FD] py-12 md:py-24 overflow-hidden border-b border-[#EBE8E2]">
      {/* Decorative Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#F0EDE7_1px,transparent_1px),linear-gradient(to_bottom,#F0EDE7_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      {/* Interactive Copy Switcher Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12 relative z-10">
        <div className="inline-flex items-center p-1.5 bg-[#F0EDE7] rounded-full text-xs font-mono font-bold tracking-wider">
          <span className="px-3 text-[#5C564E] uppercase hidden sm:inline">PREVIEW COPYWRITING:</span>
          <button
            onClick={() => setCopyOption('A')}
            className={`px-4 py-2 rounded-full transition-all duration-300 font-sans font-bold cursor-pointer ${
              copyOption === 'A'
                ? 'bg-[#1C1A17] text-[#EFF3FD] shadow-md'
                : 'text-[#5C564E] hover:text-[#1C1A17]'
            }`}
          >
            Option A (Customizable)
          </button>
          <button
            onClick={() => setCopyOption('B')}
            className={`px-4 py-2 rounded-full transition-all duration-300 font-sans font-bold cursor-pointer ${
              copyOption === 'B'
                ? 'bg-[#1C1A17] text-[#EFF3FD] shadow-md'
                : 'text-[#5C564E] hover:text-[#1C1A17]'
            }`}
          >
            Option B
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Copy Panel */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={copyOption}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#FF5C00]/10 rounded-full border border-[#FF5C00]/20 text-[#FF5C00] font-mono text-xs font-bold tracking-widest">
                <Coffee className="w-3.5 h-3.5 animate-pulse" />
                <span>{currentCopy.badge}</span>
              </div>

              {/* Headings */}
              <div className="space-y-2.5">
                <h1 className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#1C1A17] leading-tight max-w-xl">
                  {currentCopy.title}
                </h1>
                <p className="font-sans font-bold text-lg sm:text-xl text-[#FF5C00] tracking-wide">
                  {currentCopy.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="font-sans font-medium text-base text-[#5C564E] leading-relaxed max-w-lg">
                {currentCopy.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dual Track CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <button
              onClick={onNavigateToShop}
              className="px-8 py-4.5 bg-[#FF5C00] hover:bg-[#E05200] text-white font-sans font-black text-sm tracking-widest rounded-none shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2.5 group cursor-pointer"
              id="hero-cta-shop"
            >
              <span>SHOP THE COLLECTION</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={onNavigateToKPop}
              className="px-8 py-4.5 bg-transparent hover:bg-[#1C1A17]/5 text-[#1C1A17] hover:text-[#1C1A17] font-sans font-black text-sm tracking-widest rounded-none border-2 border-[#1C1A17] transition-all duration-300 flex items-center justify-center space-x-2.5 group cursor-pointer"
              id="hero-cta-kpop"
            >
              <span>DISCOVER K-POP LEAGUE</span>
              <Sparkles className="w-4 h-4 text-[#FFE600]" />
            </button>
          </div>
        </div>

        {/* Right Atmospheric Imagery Layer */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          <div className="relative w-full max-w-md aspect-square bg-[#F8FAFD] border border-[#EBE8E2] p-6 shadow-2xl flex flex-col justify-between overflow-hidden group">
            
            {/* Ambient overlay shadows */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17]/40 via-transparent to-transparent opacity-60 z-10" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#FF5C00]/10 rounded-full filter blur-3xl opacity-50 -mr-16 -mt-16 group-hover:opacity-75 transition-opacity duration-500" />
            
            {/* Visual content: roasting/drip bag with K-POP overlay */}
            <motion.img
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
              src={heroImage || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"}
              alt="Casting Specialty Roasting & Brewing"
              className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />

            {/* Top Tag */}
            <div className="relative z-20 flex justify-between items-start">
              <span className="font-mono text-[10px] bg-[#1C1A17] text-white px-2 py-1 font-bold tracking-widest uppercase">
                SEASON PRELUDE
              </span>
              <span className="font-mono text-[10px] text-[#1C1A17] font-bold bg-[#FFE600] px-2 py-1 tracking-widest">
                STAGE-01
              </span>
            </div>

            {/* Inner Overlap Label mimicking a vinyl record sleeve / coffee pack label */}
            <div className="relative z-20 bg-[#F8FAFD] p-4 border-l-4 border-[#FF5C00] shadow-md max-w-[85%] self-start mt-20">
              <span className="font-mono text-[9px] text-[#FF5C00] tracking-widest font-black block mb-0.5 uppercase">
                {brandName1} {brandName2}
              </span>
              <h3 className="font-sans font-black text-sm tracking-tight text-[#1C1A17]">SPARK NO.1: THE STAGE</h3>
              <p className="font-sans text-[10px] text-[#5C564E] mt-1 line-clamp-2">
                중국 웨이하이 글로벌 매장부터 당신의 홈카페까지, 아이돌 감성과 스페셜티 싱글오리진의 완벽한 조화.
              </p>
            </div>

            {/* Footnote */}
            <div className="relative z-20 text-white flex justify-between items-center font-mono text-[9px] font-bold tracking-wider pt-6 border-t border-white/20">
              <span>LATITUDE: 37.5665° N (SEOUL)</span>
              <span>WEIHAI 1ST STORE OPEN</span>
            </div>
          </div>

          {/* Background Floating Yellow Accent */}
          <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-[#FFE600]/10 rounded-full border border-[#FFE600]/20 -z-10 animate-bounce" style={{ animationDuration: '6s' }} />
        </div>

      </div>
    </section>
  );
}
