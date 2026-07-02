import React, { useState, FormEvent } from 'react';
import { Vote, Star, Globe, TrendingUp, CheckCircle, Ticket, Store, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ARTISTS } from '../data';
import { ArtistIP } from '../types';

interface KPopLeagueProps {
  onShowNotification: (message: string) => void;
  onNavigateToContact: () => void;
  artists?: ArtistIP[];
  onUpdateArtists?: (artists: ArtistIP[]) => void;
}

export default function KPopLeague({
  onShowNotification,
  onNavigateToContact,
  artists: propArtists,
  onUpdateArtists,
}: KPopLeagueProps) {
  const [localArtists, setLocalArtists] = useState<ArtistIP[]>(ARTISTS);

  const artists = propArtists || localArtists;
  const setArtists = (updater: ArtistIP[] | ((prev: ArtistIP[]) => ArtistIP[])) => {
    const updated = typeof updater === 'function' ? updater(artists) : updater;
    if (onUpdateArtists) {
      onUpdateArtists(updated);
    } else {
      setLocalArtists(updated);
    }
  };
  const [votedId, setVotedId] = useState<string | null>(null);
  const [ticketInput, setTicketInput] = useState('');
  const [userTickets, setUserTickets] = useState(3); // Default daily tickets
  const [selectedArtistForInfo, setSelectedArtistForInfo] = useState<ArtistIP | null>(null);

  // Voting action
  const handleVote = (artistId: string) => {
    if (userTickets <= 0) {
      onShowNotification('투표권이 부족합니다! 매장 음료 영수증이나 드립백 QR코드를 인증해 투표권을 충전하세요.');
      return;
    }

    setArtists(prev => prev.map(art => {
      if (art.id === artistId) {
        return { ...art, votes: art.votes + 1 };
      }
      return art;
    }));

    setUserTickets(prev => prev - 1);
    setVotedId(artistId);
    onShowNotification(`"${artists.find(a => a.id === artistId)?.name}" 팀에 소중한 1표가 투표되었습니다.`);

    // Reset floating vote effect after a short delay
    setTimeout(() => {
      setVotedId(null);
    }, 1500);
  };

  // Receipt ticket charging mock action
  const handleChargeTickets = (e: FormEvent) => {
    e.preventDefault();
    if (!ticketInput.trim()) return;

    if (ticketInput.length < 5) {
      onShowNotification('올바른 영수증 번호 혹은 시리얼 번호를 입력하세요.');
      return;
    }

    setUserTickets(prev => prev + 5);
    setTicketInput('');
    onShowNotification('스페셜 음료 영수증 인증 성공! 5장의 아티스트 투표권이 충전되었습니다.');
  };

  const totalVotes = artists.reduce((sum, art) => sum + art.votes, 0);

  // Global Expansion Data
  const regions = [
    { name: '중국 웨이하이 (Weihai)', desc: '글로벌 1호 플래그십 매장 오픈완료', status: 'active' },
    { name: '말레이시아 쿠알라룸푸르', desc: '쿠알라룸푸르 센트럴 역세권 입점 예정', status: 'pending' },
    { name: '몽골 울란바토르', desc: '몽골 국립대 직영 2개점 마스터 가맹 예정', status: 'pending' },
    { name: '태국 방콕', desc: '방콕 시암 스퀘어 미디어 스페셜 스토어 조인', status: 'pending' }
  ];

  return (
    <div className="bg-[#EFF3FD] py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP LEAGUE INTRODUCTION */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs font-black tracking-[0.2em] text-[#FF5C00] uppercase block">
            03 / GLOBAL MOVEMENT - K-POP LEAGUE COFFEE
          </span>
          <h1 className="font-sans font-black text-3xl sm:text-5xl tracking-tight text-[#1C1A17]">
            커피 한 잔으로 시작되는<br />K-POP 아티스트의 무대
          </h1>
          <p className="font-sans font-medium text-sm sm:text-base text-[#5C564E] leading-relaxed">
            신인 아티스트에게는 전 세계로 뻗어나가는 홍보의 무대를, 점주님께는 한류 강력 마케팅 효과를 무상으로, 글로벌 팬덤에게는 투표와 한정판 포토카드의 즐거움을 제공하는 전방위 상생 커피 메타버스 브랜드입니다.
          </p>
        </div>

        {/* WEIHAI 1ST STORE SHOWCASE & BENEFIT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 border-b border-[#EBE8E2] pb-16">
          {/* Left: Store Showcase Visual */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/10] bg-neutral-900 overflow-hidden border border-[#EBE8E2] shadow-2xl">
              {/* Overlay with subtle cyber neon vibe but holding minimalist palette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80"
                alt="Weihai China Flagship Store Interior"
                className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 contrast-110"
                referrerPolicy="no-referrer"
              />
              {/* Floating label */}
              <div className="absolute bottom-4 left-4 z-20 text-white">
                <span className="font-mono text-[9px] text-[#FFE600] font-black tracking-widest uppercase block mb-1">GLOBAL FIRST</span>
                <h3 className="font-sans font-black text-lg tracking-tight">China Weihai Flagship Store (웨이하이 1호점)</h3>
                <p className="font-sans text-[11px] text-[#EFF3FD]/80 mt-1">대형 미디어 월 투표 연계 스크린과 K-POP 음악이 상시 송출되는 글로벌 프랜차이즈 거점</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="border border-[#EBE8E2] p-4 bg-[#F8FAFD] text-center">
                <span className="font-mono text-xl sm:text-2xl font-black text-[#FF5C00] block">1,200+</span>
                <span className="font-sans text-[10px] text-[#5C564E] font-bold">DAILY VISITORS</span>
              </div>
              <div className="border border-[#EBE8E2] p-4 bg-[#F8FAFD] text-center">
                <span className="font-mono text-xl sm:text-2xl font-black text-[#1C1A17] block">98.4%</span>
                <span className="font-sans text-[10px] text-[#5C564E] font-bold">VOTE PARTICIPATION</span>
              </div>
            </div>
          </div>

          {/* Right: Explanations of why Casting Coffee is unique */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#1C1A17] rounded-none text-white font-mono text-xs font-bold tracking-widest">
              <Award className="w-3.5 h-3.5 text-[#FFE600]" />
              <span>FRANCHISE INOVATION MODEL</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-[#FF5C00]/10 border border-[#FF5C00]/30 flex items-center justify-center text-[#FF5C00] font-mono text-xs font-black flex-shrink-0 mt-0.5">
                  A
                </div>
                <div>
                  <h3 className="font-sans font-black text-base text-[#1C1A17] tracking-tight">신인 아티스트: 전 세계로 퍼져나가는 전광판과 컵홀더</h3>
                  <p className="font-sans text-xs sm:text-sm text-[#5C564E] mt-1 leading-relaxed">
                    공중파 음악방송 외에 마땅한 대외 홍보 수단이 적은 소형 기획사 라이징 스타들에게 전 매장 미디어월과 수십만 장의 컵홀더, 한정판 콜라보 드립백을 통해 전 세계 팬들과 스킨십할 수 있는 무대를 제공합니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-[#FF5C00]/10 border border-[#FF5C00]/30 flex items-center justify-center text-[#FF5C00] font-mono text-xs font-black flex-shrink-0 mt-0.5">
                  P
                </div>
                <div>
                  <h3 className="font-sans font-black text-base text-[#1C1A17] tracking-tight">점주 마케팅 비용 ZERO: 팬덤이 찾아오는 랜드마크화</h3>
                  <p className="font-sans text-xs sm:text-sm text-[#5C564E] mt-1 leading-relaxed">
                    지역 커뮤니티 내 치열한 카페 광고 경쟁 속에서, K-POP 리그 스페셜 드립백과 포토카드를 구매하려는 글로벌 한류 팬덤의 자발적인 순례 성지화를 유도하여 홍보비 없이도 압도적 매출을 수성하게 돕습니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-[#FF5C00]/10 border border-[#FF5C00]/30 flex items-center justify-center text-[#FF5C00] font-mono text-xs font-black flex-shrink-0 mt-0.5">
                  F
                </div>
                <div>
                  <h3 className="font-sans font-black text-base text-[#1C1A17] tracking-tight">글로벌 팬덤: 일상 속에서 투표하고 한정 굿즈를 소장하다</h3>
                  <p className="font-sans text-xs sm:text-sm text-[#5C564E] mt-1 leading-relaxed">
                    단순한 커피 소비를 넘어 자신이 동경하는 아티스트를 투표하고, 드립백 패키지 디자인을 변경시키고, 미공개 리미티드 실물 포토카드를 손에 쥐는 능동적이고 트렌디한 엔터테인먼트적 소비 문화를 창출합니다.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onNavigateToContact}
              className="mt-4 px-6 py-3 bg-[#1C1A17] hover:bg-[#FF5C00] text-white font-sans font-bold text-xs tracking-widest transition-colors duration-300"
              id="kpop-franchise-btn"
            >
              B2B 글로벌 가맹 / 제휴 신청 접수 →
            </button>
          </div>
        </div>

        {/* INTERACTIVE K-POP LEAGUE LIVE VOTING SYSTEM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Candidates & Interactive Voting */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#EBE8E2] p-5">
              <div>
                <h3 className="font-sans font-black text-lg text-[#1C1A17] flex items-center space-x-2">
                  <Vote className="w-5 h-5 text-[#FF5C00]" />
                  <span>K-POP LEAGUE SEASON 1 LIVE VOTE</span>
                </h3>
                <p className="font-sans text-xs text-[#5C564E] mt-0.5">최종 1위에 오른 아티스트는 다음 시즌 전용 드립백 패키지 앰버서더로 발탁됩니다.</p>
              </div>

              {/* Ticket Status */}
              <div className="flex items-center space-x-3 bg-[#F8FAFD] border border-[#EBE8E2] px-4 py-2 text-xs">
                <Ticket className="w-4 h-4 text-[#FF5C00]" />
                <span className="font-sans font-bold text-[#5C564E]">나의 투표권:</span>
                <span className="font-mono font-black text-sm text-[#FF5C00]">{userTickets}장</span>
              </div>
            </div>

            {/* Candidates Card Stack */}
            <div className="space-y-4">
              {artists.map((artist) => {
                const votePercentage = totalVotes > 0 ? (artist.votes / totalVotes) * 100 : 0;
                const isVoted = votedId === artist.id;
                
                return (
                  <div
                    key={artist.id}
                    className="relative bg-white border border-[#EBE8E2] p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 hover:border-[#1C1A17] transition-all duration-300"
                    id={`artist-candidate-${artist.id}`}
                  >
                    {/* Candidate Visual & Descriptions */}
                    <div className="flex items-center space-x-4 flex-1">
                      {/* Image frame */}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-[#F8FAFD] border border-[#EBE8E2] overflow-hidden flex-shrink-0">
                        <img
                          src={artist.image}
                          alt={artist.name}
                          className="w-full h-full object-cover grayscale"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Name tags */}
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="font-mono text-[9px] bg-[#FF5C00] text-white px-1.5 py-0.5 font-bold uppercase tracking-wider">
                            CANDIDATE
                          </span>
                          {votePercentage === Math.max(...artists.map(a => totalVotes > 0 ? (a.votes / totalVotes) * 100 : 0)) && (
                            <span className="font-mono text-[9px] bg-[#1C1A17] text-white px-1.5 py-0.5 font-bold uppercase tracking-wider flex items-center">
                              <Star className="w-2.5 h-2.5 mr-0.5 text-[#FFE600] fill-[#FFE600]" />
                              1st PLACE
                            </span>
                          )}
                        </div>
                        <h4 className="font-sans font-black text-base sm:text-lg text-[#1C1A17] tracking-tight">
                          {artist.name}
                        </h4>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {artist.tags.map(t => (
                            <span key={t} className="font-sans text-[10px] text-[#8C8375] font-bold">
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Voting status bar (Live dynamic width) */}
                    <div className="flex-1 max-w-xs space-y-1">
                      <div className="flex justify-between font-mono text-[11px] font-bold text-[#5C564E]">
                        <span>SCORE</span>
                        <span>{artist.votes.toLocaleString()}표 ({votePercentage.toFixed(1)}%)</span>
                      </div>
                      
                      {/* Progress bar container */}
                      <div className="h-2 bg-[#F8FAFD] border border-[#EBE8E2] w-full relative overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${votePercentage}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full bg-[#FF5C00]"
                        />
                      </div>
                    </div>

                    {/* Vote Action button */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedArtistForInfo(artist)}
                        className="p-3 bg-[#F8FAFD] border border-[#EBE8E2] text-[#5C564E] hover:text-[#1C1A17] hover:border-[#1C1A17] transition-all duration-300"
                        title="Artist Profile"
                      >
                        <TrendingUp className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleVote(artist.id)}
                        disabled={userTickets <= 0}
                        className={`relative px-6 py-3 font-sans font-black text-xs tracking-widest flex items-center space-x-1.5 transition-all duration-300 overflow-hidden cursor-pointer ${
                          userTickets <= 0
                            ? 'bg-[#F0EDE7] text-[#8C8375] border border-[#EBE8E2] cursor-not-allowed'
                            : 'bg-[#FF5C00] hover:bg-[#1C1A17] text-white shadow-md'
                        }`}
                      >
                        <Star className="w-3.5 h-3.5" />
                        <span>VOTE</span>
                        
                        {/* Interactive floating vote icon animation */}
                        <AnimatePresence>
                          {isVoted && (
                            <motion.span
                              initial={{ y: 0, opacity: 1, scale: 1 }}
                              animate={{ y: -40, opacity: 0, scale: 1.5 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 flex items-center justify-center text-white pointer-events-none font-bold"
                            >
                              +1 Vote!
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Ticket charging panel & Leaderboard rules */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Ticket charger box */}
            <div className="bg-white border border-[#EBE8E2] p-6 space-y-4">
              <div className="space-y-1">
                <h3 className="font-sans font-black text-base text-[#1C1A17] flex items-center space-x-2">
                  <Ticket className="w-4.5 h-4.5 text-[#FF5C00]" />
                  <span>투표권 충전소 (Ticket Charger)</span>
                </h3>
                <p className="font-sans text-[11px] text-[#5C564E] leading-relaxed">
                  매장 영수증 하단의 고유 번호 혹은 한정판 드립백 패키지 안쪽 시리얼 넘버를 입력해 추가 투표권을 획득하세요.
                </p>
              </div>

              {/* Form Input */}
              <form onSubmit={handleChargeTickets} className="space-y-3 pt-2">
                <input
                  type="text"
                  placeholder="예: REC-240208-8798"
                  value={ticketInput}
                  onChange={(e) => setTicketInput(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F8FAFD] border border-[#EBE8E2] text-xs font-mono font-bold focus:outline-none focus:border-[#FF5C00] focus:bg-white"
                />
                
                <button
                  type="submit"
                  className="w-full py-3 bg-[#1C1A17] hover:bg-[#FF5C00] text-white font-sans font-bold text-xs tracking-widest transition-colors duration-300 cursor-pointer"
                >
                  인증하고 투표권 받기 (+5P)
                </button>
              </form>

              <div className="text-[10px] text-[#8C8375] font-sans pt-1 leading-snug flex items-start space-x-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                <span>기본으로 매일 3장의 데일리 무료 투표권이 리셋되어 증정됩니다.</span>
              </div>
            </div>

            {/* Global Expansion highlighting map-dots */}
            <div className="bg-white border border-[#EBE8E2] p-6 space-y-4">
              <h3 className="font-sans font-black text-base text-[#1C1A17] flex items-center space-x-2">
                <Globe className="w-4.5 h-4.5 text-[#FF5C00]" />
                <span>글로벌 익스팬션 현황 (MAP)</span>
              </h3>
              
              <div className="space-y-3">
                {regions.map((reg) => (
                  <div key={reg.name} className="flex justify-between items-start border-b border-[#F8FAFD] pb-2 last:border-b-0">
                    <div>
                      <h4 className="font-sans font-bold text-xs text-[#1C1A17]">{reg.name}</h4>
                      <p className="font-sans text-[11px] text-[#5C564E]">{reg.desc}</p>
                    </div>
                    
                    <span className={`font-mono text-[9px] font-black tracking-widest px-2 py-0.5 uppercase ${
                      reg.status === 'active' ? 'bg-[#FFE600] text-black font-bold' : 'bg-[#F8FAFD] text-[#8C8375] border border-[#EBE8E2]'
                    }`}>
                      {reg.status === 'active' ? 'active' : 'pending'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Franchise direct link callout */}
              <div className="pt-2">
                <div className="p-4 bg-[#FF5C00]/5 border-l-2 border-[#FF5C00] space-y-2">
                  <span className="font-sans font-black text-[10px] text-[#FF5C00] block">FRANCHISE INQUIRY</span>
                  <p className="font-sans text-[11px] text-[#5C564E] leading-relaxed">
                    중국 산동성을 시작으로 한 글로벌 유통망과 K-POP 마케팅 솔루션을 매장에 결합하세요.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ARTIST INFO DIALOG MODAL */}
        <AnimatePresence>
          {selectedArtistForInfo && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedArtistForInfo(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-xs"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative bg-white border border-[#EBE8E2] w-full max-w-md p-6 shadow-2xl z-10 space-y-4"
              >
                {/* Visual */}
                <div className="aspect-video w-full bg-[#F8FAFD] overflow-hidden border border-[#EBE8E2] relative">
                  <img
                    src={selectedArtistForInfo.image}
                    alt={selectedArtistForInfo.name}
                    className="w-full h-full object-cover grayscale"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#FF5C00] text-white font-mono text-[9px] font-black tracking-widest px-2 py-0.5">
                    PROFILE
                  </div>
                </div>

                {/* Info Text */}
                <div className="space-y-2">
                  <h3 className="font-sans font-black text-xl text-[#1C1A17] tracking-tight">{selectedArtistForInfo.name}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedArtistForInfo.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 bg-[#F8FAFD] border border-[#EBE8E2] rounded-none font-sans text-[10px] text-[#5C564E]">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-[#5C564E] leading-relaxed pt-2">
                    {selectedArtistForInfo.description}
                  </p>
                </div>

                {/* Score and actions */}
                <div className="flex justify-between items-center border-t border-[#EBE8E2] pt-4">
                  <span className="font-mono text-xs text-[#5C564E] font-bold">
                    CUMULATIVE VOTES: <strong className="text-[#FF5C00] font-black">{selectedArtistForInfo.votes.toLocaleString()}</strong>
                  </span>
                  
                  <button
                    onClick={() => setSelectedArtistForInfo(null)}
                    className="px-4 py-2 bg-[#1C1A17] hover:bg-[#FF5C00] text-white font-sans font-bold text-xs tracking-wider transition-colors"
                  >
                    확인
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
