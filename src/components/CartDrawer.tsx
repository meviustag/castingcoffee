import { X, Trash2, ShoppingBag, CreditCard, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onShowNotification: (message: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onShowNotification
}: CartDrawerProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Compute total price
  const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Simulated checkout flow
  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      onShowNotification('주문이 완료되었습니다! 가상 결제가 성료되었습니다.');
    }, 2000);
  };

  const handleFinishCheckout = () => {
    onClearCart();
    setCheckoutComplete(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
          />

          {/* Drawer Body Panel */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-[#EFF3FD] border-l border-[#EBE8E2] shadow-2xl flex flex-col justify-between"
            >
              
              {/* Header */}
              <div className="px-6 py-5 border-b border-[#EBE8E2] flex items-center justify-between bg-white">
                <div className="flex items-center space-x-2.5">
                  <ShoppingBag className="w-5 h-5 text-[#FF5C00]" />
                  <h2 className="font-sans font-black text-base text-[#1C1A17] tracking-wider uppercase">
                    YOUR SELECTIONS ({cartItems.length})
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-[#F8FAFD] border border-[#EBE8E2] text-[#5C564E] hover:text-[#1C1A17] transition-colors"
                  aria-label="Close Cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Middle Section: Scrollable Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <AnimatePresence mode="wait">
                  {checkoutComplete ? (
                    /* Success checkout state visual */
                    <motion.div
                      key="checkout-success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col items-center justify-center text-center space-y-5 py-8"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-500/15 border-2 border-green-500 flex items-center justify-center text-green-600">
                        <Check className="w-8 h-8" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-sans font-black text-xl text-[#1C1A17]">주문 및 가상 결제 완료</h3>
                        <p className="font-sans text-xs text-[#5C564E] max-w-xs leading-relaxed">
                          주문이 임시 완료되었습니다! 데모 환경이므로 실제 대금 결제나 원두 실제 배송은 이루어지지 않습니다.
                        </p>
                      </div>
                      <button
                        onClick={handleFinishCheckout}
                        className="w-full py-3.5 bg-[#FF5C00] hover:bg-[#E05200] text-white font-sans font-black text-xs tracking-widest transition-colors"
                      >
                        쇼핑 계속하기
                      </button>
                    </motion.div>
                  ) : cartItems.length === 0 ? (
                    /* Empty state visual */
                    <motion.div
                      key="cart-empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16"
                    >
                      <div className="w-12 h-12 rounded-full border border-dashed border-[#8C8375] flex items-center justify-center text-[#8C8375]">
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-sans font-black text-sm text-[#1C1A17]">장바구니가 비어 있습니다.</p>
                        <p className="font-sans text-xs text-[#8C8375]">오직 완벽한 맛을 캐스팅한 원두와 드립백을 담아보세요.</p>
                      </div>
                      <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-[#1C1A17] hover:bg-[#FF5C00] text-white font-sans font-bold text-xs tracking-wider transition-colors"
                      >
                        돌아가기
                      </button>
                    </motion.div>
                  ) : (
                    /* Current items list */
                    <motion.div
                      key="cart-items-list"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                    >
                      {cartItems.map((item) => (
                        <motion.div
                          layout
                          key={item.product.id}
                          exit={{ opacity: 0, x: -30 }}
                          className="flex items-start space-x-4 p-4 bg-white border border-[#EBE8E2] hover:border-[#1C1A17]/30 transition-colors"
                        >
                          {/* Image */}
                          <div className="w-16 h-16 bg-[#F8FAFD] border border-[#EBE8E2] overflow-hidden flex-shrink-0">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 space-y-1">
                            <span className="font-mono text-[9px] text-[#FF5C00] font-black tracking-widest uppercase block">
                              {item.product.category}
                            </span>
                            <h4 className="font-sans font-black text-xs sm:text-sm text-[#1C1A17] tracking-tight leading-snug line-clamp-1">
                              {item.product.name}
                            </h4>
                            <p className="font-mono text-xs text-[#5C564E]">
                              ₩{item.product.price.toLocaleString()}
                            </p>

                            {/* Quantity buttons and remove action */}
                            <div className="flex items-center justify-between pt-2">
                              {/* Selector */}
                              <div className="flex items-center border border-[#EBE8E2] bg-[#F8FAFD]">
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                  className="px-2 py-1 font-mono text-xs hover:bg-white transition-colors"
                                >
                                  -
                                </button>
                                <span className="px-3 font-mono text-xs font-bold text-[#1C1A17]">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                  className="px-2 py-1 font-mono text-xs hover:bg-white transition-colors"
                                >
                                  +
                                </button>
                              </div>

                              {/* Remove */}
                              <button
                                onClick={() => onRemoveItem(item.product.id)}
                                className="p-1.5 text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all duration-200"
                                title="Remove item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Footer Section: Totals & Checkout */}
              {!checkoutComplete && cartItems.length > 0 && (
                <div className="px-6 py-6 border-t border-[#EBE8E2] bg-white space-y-4">
                  
                  {/* Summary */}
                  <div className="space-y-2">
                    <div className="flex justify-between font-sans text-xs text-[#5C564E]">
                      <span>상품 총합계 (Subtotal)</span>
                      <span>₩{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-sans text-xs text-[#5C564E]">
                      <span>배송비 (Shipping fee)</span>
                      <span className="text-green-600 font-bold">무료 배송 (FREE)</span>
                    </div>
                    
                    <div className="border-t border-[#EBE8E2] pt-3 flex justify-between font-sans text-base text-[#1C1A17] font-black">
                      <span>최종 주문 금액 (Total)</span>
                      <span className="font-mono text-[#FF5C00]">₩{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full py-4 bg-[#FF5C00] hover:bg-[#E05200] disabled:bg-[#F0EDE7] disabled:text-[#8C8375] text-white font-sans font-black text-xs tracking-widest transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>{isCheckingOut ? '결제 요청 처리중... PLEASE WAIT' : `SECURE CHECKOUT — ₩${totalPrice.toLocaleString()}`}</span>
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
