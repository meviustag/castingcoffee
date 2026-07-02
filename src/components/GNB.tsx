import { ShoppingBag, Menu, X, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface GNBProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  brandName1?: string;
  brandName2?: string;
  onOpenAdmin?: () => void;
}

export default function GNB({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  brandName1 = 'CASTING',
  brandName2 = 'COFFEE',
  onOpenAdmin,
}: GNBProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'HOME' },
    { id: 'shop', label: 'SHOP' },
    { id: 'story', label: 'OUR STORY' },
    { id: 'kpop', label: 'K-POP LEAGUE' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    // Smooth scroll to top when changing primary sections
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const firstLetter = brandName1 ? brandName1.trim().charAt(0).toUpperCase() : 'C';

  return (
    <nav className="sticky top-0 z-40 bg-[#FCFBF9]/95 backdrop-blur-md border-b border-[#EBE8E2] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <button
              onClick={() => handleTabClick('home')}
              className="flex items-center space-x-2 group cursor-pointer"
              id="gnb-logo"
            >
              <div className="w-8 h-8 rounded-full bg-[#FF5C00] flex items-center justify-center text-white font-bold text-lg tracking-tighter transition-transform duration-300 group-hover:rotate-12">
                {firstLetter}
              </div>
              <div className="text-left">
                <span className="font-sans font-black text-xl tracking-tight text-[#1C1A17] block leading-none uppercase">
                  {brandName1}
                </span>
                <span className="font-mono text-[9px] tracking-[0.25em] text-[#FF5C00] uppercase block font-semibold leading-none mt-1">
                  {brandName2}
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`relative py-2 font-sans font-bold text-sm tracking-widest cursor-pointer transition-colors duration-300 ${
                    isActive ? 'text-[#FF5C00]' : 'text-[#5C564E] hover:text-[#1C1A17]'
                  }`}
                  id={`gnb-item-${item.id}`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeGnbBorder"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF5C00]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right GNB Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Admin Settings Action */}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="p-2.5 rounded-full hover:bg-[#FAF9F6] border border-[#EBE8E2] text-neutral-600 hover:text-[#FF5C00] transition-all duration-300 flex items-center justify-center cursor-pointer group"
                id="gnb-admin-btn"
                title="관리자 설정 (Admin settings)"
              >
                <Settings className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full hover:bg-[#FAF9F6] border border-[#EBE8E2] text-[#1C1A17] transition-all duration-300 flex items-center justify-center cursor-pointer group"
              id="gnb-cart-btn"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-5 h-5 transition-transform duration-300 group-hover:scale-105 group-hover:text-[#FF5C00]" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 min-w-[20px] h-[20px] rounded-full bg-[#FFE600] text-black font-mono text-[10px] font-bold flex items-center justify-center px-1 border-2 border-[#FCFBF9]"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#5C564E] hover:text-[#1C1A17] hover:bg-[#FAF9F6] border border-[#EBE8E2] transition-colors duration-300"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#EFF3FD] border-t border-[#EBE8E2]"
          >
            <div className="px-2 pt-3 pb-6 space-y-2">
              {menuItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg font-sans font-bold text-base tracking-widest transition-all duration-200 ${
                      isActive
                        ? 'bg-[#FF5C00]/5 text-[#FF5C00] border-l-4 border-[#FF5C00]'
                        : 'text-[#5C564E] hover:bg-[#F8FAFD] hover:text-[#1C1A17]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              {/* Mobile Admin Settings */}
              {onOpenAdmin && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="block w-full text-left px-4 py-3 text-sm font-sans font-bold tracking-widest text-[#FF5C00] hover:bg-[#FAF9F6] flex items-center space-x-2 border-t border-[#EBE8E2]/60 pt-4 mt-2"
                >
                  <Settings className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>ADMIN SETTINGS (관리자 모드)</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
