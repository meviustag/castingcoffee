import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Mail, Phone, MapPin, Check, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS } from '../data';
import { InquiryFormData } from '../types';

interface ContactSectionProps {
  onShowNotification: (message: string) => void;
}

interface ContactSectionProps {
  onShowNotification: (message: string) => void;
  hqName?: string;
  hqAddress?: string;
  hqContact?: string;
  hqHours?: string;
  hqMapImage?: string;
  roasteryName?: string;
  roasteryAddress?: string;
  roasteryContact?: string;
  roasteryHours?: string;
  roasteryMapImage?: string;
}

export default function ContactSection({
  onShowNotification,
  hqName = '캐스팅커피 크리에이티브 스튜디오',
  hqAddress = '서울특별시 성동구 아차산로 17길 49, 3층',
  hqContact = '02-543-1202 | contact@castingcoffee.com',
  hqHours = 'MON - FRI : 09:00 - 18:00 (WEEKENDS CLOSED)',
  hqMapImage = '',
  roasteryName = '캐스팅커피 테크니컬 스마트 팩토리',
  roasteryAddress = '경기도 남양주시 화도읍 수레로 112번길 18',
  roasteryContact = '031-591-1203 | roastery@castingcoffee.com',
  roasteryHours = 'MON - SAT : 08:00 - 17:00 (SUNDAY CLOSED)',
  roasteryMapImage = '',
}: ContactSectionProps) {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    inquiryType: 'franchise',
    message: ''
  });

  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      onShowNotification('필수 항목을 모두 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);

    // Simulate Server-side submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onShowNotification('문의 사항이 성공적으로 등록되었습니다. 담당자가 빠른 시일 내에 연락드리겠습니다.');
      console.log('Submitted B2B/Franchise inquiry data:', formData);
    }, 1500);
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      companyName: '',
      email: '',
      phone: '',
      inquiryType: 'franchise',
      message: ''
    });
    setIsSubmitted(false);
  };

  // Location Hub Data
  const officeLocations = [
    {
      role: 'HEADQUARTERS (본사)',
      name: hqName,
      address: hqAddress,
      contact: hqContact,
      hours: hqHours,
      mapImage: hqMapImage,
    },
    {
      role: 'SMART ROASTING HUB (로스터리)',
      name: roasteryName,
      address: roasteryAddress,
      contact: roasteryContact,
      hours: roasteryHours,
      mapImage: roasteryMapImage,
    }
  ];

  return (
    <div className="bg-[#EFF3FD] py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADERS */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs font-black tracking-[0.2em] text-[#FF5C00] uppercase block">
            04 / PARTNERSHIP & FRANCHISE
          </span>
          <h1 className="font-sans font-black text-3xl sm:text-5xl tracking-tight text-[#1C1A17]">
            함께 만들어가는 완벽한 무대
          </h1>
          <p className="font-sans font-medium text-sm sm:text-base text-[#5C564E] leading-relaxed">
            B2B 원두 정기 납품(샘플 신청), 글로벌 가맹점 개설 상담, K-POP 아티스트와의 한정 콜라보 제안 등 캐스팅커피와의 특별한 동행을 기다립니다.
          </p>
        </div>

        {/* INTERACTIVE INQUIRY FORM & LOCATION DETAILS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-24">
          
          {/* Left Column: Inquiry Form */}
          <div className="lg:col-span-7 bg-white border border-[#EBE8E2] p-6 md:p-8 flex flex-col justify-between shadow-sm">
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="border-b border-[#EBE8E2] pb-4">
                    <h2 className="font-sans font-black text-lg text-[#1C1A17]">Inquiry Form (상담 신청서)</h2>
                    <p className="font-sans text-xs text-[#5C564E] mt-0.5">상세히 작성해주실수록 더욱 신속하고 명확한 맞춤형 안내를 전해드립니다.</p>
                  </div>

                  {/* Form Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="font-sans font-bold text-xs text-[#5C564E] block">
                        성함 / 담당자명 <span className="text-[#FF5C00]">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="홍길동"
                        className="w-full px-4 py-3 bg-[#F8FAFD] border border-[#EBE8E2] text-xs font-semibold focus:outline-none focus:border-[#FF5C00] focus:bg-white"
                      />
                    </div>

                    {/* Company */}
                    <div className="space-y-1">
                      <label className="font-sans font-bold text-xs text-[#5C564E] block">
                        회사명 / 가맹상권명 <span className="text-gray-400">(선택)</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="예: 캐스팅스토어 성수점"
                        className="w-full px-4 py-3 bg-[#F8FAFD] border border-[#EBE8E2] text-xs font-semibold focus:outline-none focus:border-[#FF5C00] focus:bg-white"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="font-sans font-bold text-xs text-[#5C564E] block">
                        이메일 주소 <span className="text-[#FF5C00]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="example@castingcoffee.com"
                        className="w-full px-4 py-3 bg-[#F8FAFD] border border-[#EBE8E2] text-xs font-semibold focus:outline-none focus:border-[#FF5C00] focus:bg-white"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                      <label className="font-sans font-bold text-xs text-[#5C564E] block">
                        연락처 (Phone) <span className="text-[#FF5C00]">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="010-0000-0000"
                        className="w-full px-4 py-3 bg-[#F8FAFD] border border-[#EBE8E2] text-xs font-semibold focus:outline-none focus:border-[#FF5C00] focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Inquiry Type Select */}
                  <div className="space-y-1">
                    <label className="font-sans font-bold text-xs text-[#5C564E] block">
                      문의 목적 / 유형 <span className="text-[#FF5C00]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#F8FAFD] border border-[#EBE8E2] text-xs font-semibold focus:outline-none focus:border-[#FF5C00] focus:bg-white appearance-none cursor-pointer"
                      >
                        <option value="franchise">국내외 가맹점 개설 개점 상담 (B2C 창업)</option>
                        <option value="b2b">B2B 원두 정기 납품 & 납품 무료 샘플 상담</option>
                        <option value="collaboration">K-POP 아티스트 IP 및 브랜드 제휴 제안</option>
                        <option value="other">기타 비즈니스 협업 제안</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#5C564E]">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Message textarea */}
                  <div className="space-y-1">
                    <label className="font-sans font-bold text-xs text-[#5C564E] block">
                      상세 문의 내용 <span className="text-[#FF5C00]">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="구상하고 계신 가맹점의 상권 위치, 예상 창업 자금 혹은 카페의 에스프레소 머신 기종과 납품 수량 예상치 등을 적어주시면 빠른 피드백에 큰 도움이 됩니다."
                      className="w-full px-4 py-3 bg-[#F8FAFD] border border-[#EBE8E2] text-xs font-semibold focus:outline-none focus:border-[#FF5C00] focus:bg-white resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4.5 bg-[#FF5C00] hover:bg-[#E05200] disabled:bg-[#F0EDE7] disabled:text-[#8C8375] text-white font-sans font-black text-xs tracking-widest transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">접수 처리중... PLEASE WAIT</span>
                    ) : (
                      <>
                        <span>SUBMIT PARTNERSHIP FORM</span>
                        <span>→</span>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                /* Success Message Dialog Screen inside form container */
                <motion.div
                  key="success-screen"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center text-green-600">
                    <Check className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-sans font-black text-2xl text-[#1C1A17] tracking-tight">상담 문의 등록 완료</h3>
                    <p className="font-sans text-xs sm:text-sm text-[#5C564E] max-w-md leading-relaxed">
                      귀하의 가중한 파트너십 제안서가 정상적으로 접수되었습니다. 담당 에스프레소 큐레이터 및 글로벌 체인 개발 실무자가 확인 후 최대 24시간 내에 기재해주신 이메일 및 연락처로 연락을 전해드리겠습니다.
                    </p>
                  </div>

                  <button
                    onClick={handleResetForm}
                    className="px-6 py-3 bg-[#1C1A17] hover:bg-[#FF5C00] text-white font-sans font-bold text-xs tracking-widest transition-colors duration-300"
                  >
                    새로운 문의 추가 작성하기
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Right Column: Locations list */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            {officeLocations.map((loc) => (
              <div key={loc.role} className="bg-white border border-[#EBE8E2] p-6 space-y-4 shadow-sm flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="font-mono text-[9px] bg-[#1C1A17] text-white px-2.5 py-0.5 font-bold tracking-widest uppercase inline-block">
                    {loc.role}
                  </span>
                  
                  <h3 className="font-sans font-black text-lg text-[#1C1A17] tracking-tight">
                    {loc.name}
                  </h3>

                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-start space-x-2 text-xs text-[#5C564E]">
                      <MapPin className="w-4 h-4 text-[#FF5C00] flex-shrink-0 mt-0.5" />
                      <span className="font-sans font-medium">{loc.address}</span>
                    </div>

                    <div className="flex items-start space-x-2 text-xs text-[#5C564E]">
                      <Phone className="w-4 h-4 text-[#FF5C00] flex-shrink-0 mt-0.5" />
                      <span className="font-mono">{loc.contact}</span>
                    </div>

                    <div className="flex items-start space-x-2 text-xs text-[#5C564E]">
                      <Clock className="w-4 h-4 text-[#FF5C00] flex-shrink-0 mt-0.5" />
                      <span className="font-sans">{loc.hours}</span>
                    </div>
                  </div>
                </div>

                {/* Styled static placeholder map representation or custom map/location image */}
                {loc.mapImage ? (
                  <div className="h-36 w-full border border-[#EBE8E2] relative overflow-hidden mt-4 group">
                    <img
                      src={loc.mapImage}
                      alt={`${loc.name} Location Guide`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 bg-[#1C1A17]/80 backdrop-blur-sm text-white font-mono text-[8px] px-2 py-0.5 tracking-wider uppercase">
                      MAP GUIDE IMAGE
                    </div>
                  </div>
                ) : (
                  <div className="h-28 w-full bg-[#F8FAFD] border border-[#EBE8E2] relative overflow-hidden mt-4 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#EBE8E2_1px,transparent_1px),linear-gradient(to_bottom,#EBE8E2_1px,transparent_1px)] bg-[size:10px_10px] opacity-20" />
                    <div className="w-4 h-4 rounded-full bg-[#FF5C00]/20 flex items-center justify-center border border-[#FF5C00] relative">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF5C00] animate-ping absolute" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF5C00]" />
                    </div>
                    <span className="font-mono text-[9px] font-bold text-[#8C8375] absolute bottom-2 right-2">GPS SIGNAL LOCKED</span>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

        {/* FAQ ACCORDION COMPONENT */}
        <div className="max-w-4xl mx-auto border-t border-[#EBE8E2] pt-16">
          <div className="text-center mb-10">
            <h2 className="font-sans font-black text-2xl tracking-tight text-[#1C1A17]">자주 묻는 질문 (FAQ)</h2>
            <p className="font-sans text-xs text-[#5C564E] mt-1">캐스팅커피의 납품, 가맹 조건, 리그 투표 등에 관한 가장 잦은 질문들을 압축했습니다.</p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-white border border-[#EBE8E2] overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex justify-between items-center font-sans font-black text-sm tracking-tight text-[#1C1A17] hover:bg-[#F8FAFD] transition-colors cursor-pointer"
                  >
                    <span>Q. {faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#FF5C00]" /> : <ChevronDown className="w-4 h-4 text-[#5C564E]" />}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-[#EBE8E2]/50 bg-[#F8FAFD] overflow-hidden"
                      >
                        <p className="p-5 font-sans font-medium text-xs sm:text-sm text-[#5C564E] leading-relaxed">
                          A. {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
