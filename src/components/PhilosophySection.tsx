import { MapPin, Flame, Users, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { STORIES } from '../data';

interface PhilosophySectionProps {
  philosophyImage1?: string;
  philosophyImage2?: string;
  philosophyImage3?: string;
}

export default function PhilosophySection({
  philosophyImage1,
  philosophyImage2,
  philosophyImage3,
}: PhilosophySectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // High quality images for the 3 stages
  const philosophyImages = [
    philosophyImage1 || 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1000&q=80', // origin
    philosophyImage2 || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80', // roasting point
    philosophyImage3 || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80'  // people/artists
  ];

  const icons = [
    <MapPin className="w-5 h-5" />,
    <Flame className="w-5 h-5" />,
    <Users className="w-5 h-5" />
  ];

  return (
    <section className="bg-[#EFF3FD] py-16 md:py-24 border-b border-[#EBE8E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Headings */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs font-black tracking-[0.2em] text-[#FF5C00] uppercase block mb-3">
            01 / BRAND ESSENCE
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl tracking-tight text-[#1C1A17] mb-4">
            Casting: We Do Not Just Roast.
          </h2>
          <p className="font-sans font-medium text-sm sm:text-base text-[#5C564E] leading-relaxed">
            한 잔의 커피가 전해지는 모든 단계는 한 편의 완벽한 영화를 제작하기 위한 캐스팅 과정과 닮아 있습니다. 우리는 최상의 조합을 찾아 여정을 떠납니다.
          </p>
        </div>

        {/* Core Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Side: Dynamic Elegant Image */}
          <div className="lg:col-span-6 relative flex flex-col justify-center">
            <div className="relative aspect-video lg:aspect-[4/3] w-full overflow-hidden shadow-2xl border border-[#EBE8E2]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  src={philosophyImages[activeIndex]}
                  alt={STORIES[activeIndex].title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {/* Glowing Corner Badge */}
              <div className="absolute top-4 right-4 bg-[#1C1A17] text-[#EFF3FD] font-mono text-[9px] font-black tracking-widest px-3 py-1.5 uppercase">
                SCENE 0{activeIndex + 1}
              </div>

              {/* Bottom Blue Accented Overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#FF5C00]" />
            </div>

            {/* Micro details */}
            <div className="flex justify-between items-center mt-4 font-mono text-[10px] text-[#8C8375] px-2 font-medium">
              <span>CASTING SPECIFICATION COFFEE CO.</span>
              <span className="text-[#FF5C00] font-black tracking-wider">SECURED & TRACED</span>
            </div>
          </div>

          {/* Right Side: Tab Selectors and Texts */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-4">
            {STORIES.map((story, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={story.title}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full text-left p-6 border transition-all duration-300 flex items-start space-x-4 cursor-pointer relative ${
                    isActive
                      ? 'bg-white border-[#FF5C00] shadow-md translate-x-1'
                      : 'bg-transparent border-[#EBE8E2] hover:border-[#1C1A17]/30 hover:bg-[#F8FAFD]'
                  }`}
                  id={`philosophy-card-${idx}`}
                >
                  {/* Active Indicator Bar */}
                  {isActive && (
                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#FF5C00]" />
                  )}

                  {/* Icon Frame */}
                  <div className={`p-2.5 rounded-none border flex items-center justify-center transition-colors duration-300 ${
                    isActive ? 'bg-[#FF5C00]/10 border-[#FF5C00]/30 text-[#FF5C00]' : 'bg-[#F8FAFD] border-[#EBE8E2] text-[#8C8375]'
                  }`}>
                    {icons[idx]}
                  </div>

                  {/* Descriptions */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[11px] font-black text-[#FF5C00]">0{idx + 1}</span>
                      <h3 className="font-sans font-black text-base text-[#1C1A17] tracking-tight">
                        {story.title}
                      </h3>
                      {idx === 2 && (
                        <span className="inline-flex items-center text-[9px] font-mono font-black tracking-widest bg-[#FFE600] text-black px-1.5 py-0.5 rounded-none uppercase animate-pulse">
                          <Sparkles className="w-2.5 h-2.5 mr-0.5" />
                          VISION
                        </span>
                      )}
                    </div>
                    <p className="font-sans font-bold text-xs text-[#5C564E] tracking-wide">
                      {story.subtitle}
                    </p>
                    
                    {/* Expandable description under active card */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.p
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: 'auto', opacity: 1, marginTop: 8 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          className="font-sans font-medium text-xs sm:text-sm text-[#5C564E] leading-relaxed pr-2 overflow-hidden"
                        >
                          {story.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
