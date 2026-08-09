import React, { useState, useRef, useEffect } from 'react';
import { LEADERSHIP_PROFILES } from '../data/orthodoxData';
import { CheckCircle2, Shield, ChevronLeft, ChevronRight } from 'lucide-react';

export const WhoWeAre: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % LEADERSHIP_PROFILES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + LEADERSHIP_PROFILES.length) % LEADERSHIP_PROFILES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Card dimensions for carousel peek previews
  const isMobile = windowWidth < 640;
  const isDesktop = windowWidth >= 1024;
  const cardWidthPercent = isMobile ? 84 : isDesktop ? 60 : 72;
  const gapPercent = 3;
  const centerOffset = (100 - cardWidthPercent) / 2;
  const translateX = centerOffset - currentIndex * (cardWidthPercent + gapPercent);

  return (
    <section id="whoweare" className="py-24 bg-[#080808] text-white border-b border-neutral-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 pb-6 border-b border-neutral-800">
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">
            Corporate Profile
          </span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white uppercase mb-3">
            ABOUT US
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 font-light max-w-2xl">
            A Strategic Partner for Businesses That Intend to Last
          </p>
        </div>

        {/* Narrative Copy Block */}
        <div className="bg-neutral-900/60 border border-neutral-800 p-8 sm:p-10 mb-16 space-y-6">
          <p className="text-base sm:text-lg text-neutral-200 font-light leading-relaxed">
            Orthodox Business Solutions is the business advisory division of Orthodox Holding, helping entrepreneurs simplify business complexity through integrated finance, accounting, taxation, and strategic advisory.
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-sm text-neutral-300 font-light leading-relaxed pt-4 border-t border-neutral-800">
            <p>
              While many firms solve one problem at a time, we believe business challenges are interconnected. That is why we coordinate accounting, tax, finance, corporate structuring, payroll, and business strategy into one cohesive framework.
            </p>
            <p>
              Through our sister company, Orthodox Wealth Management, our advisory extends beyond the business—helping owners protect, grow, and transfer the wealth their businesses create. Together, we provide one integrated ecosystem supporting both the business and the people behind it.
            </p>
          </div>
        </div>

        {/* Leadership Bios & Carousel */}
        <div className="mb-8">
          {/* Header Row with Nav Controls on the Right */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-800">
            <div className="flex items-center gap-4">
              <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-white uppercase font-sans">
                Leadership
              </h3>
              <span className="text-xs font-mono text-neutral-500 uppercase hidden sm:inline">
                Orthodox Holding Partners
              </span>
            </div>

          </div>

          {/* Carousel Slider with Subtle Previews for Left and Right Cards */}
          <div
            className="relative w-full py-4"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(${translateX}%)`,
              }}
            >
              {LEADERSHIP_PROFILES.map((leader, idx) => {
                const isActive = idx === currentIndex;

                return (
                  <div
                    key={leader.id}
                    onClick={() => {
                      if (!isActive) setCurrentIndex(idx);
                    }}
                    style={{
                      width: `${cardWidthPercent}%`,
                      marginRight: `${gapPercent}%`,
                    }}
                    className={`shrink-0 transition-all duration-500 cursor-pointer ${
                      isActive
                        ? 'opacity-100 scale-100'
                        : 'opacity-30 scale-95 filter blur-[0.3px] hover:opacity-50'
                    }`}
                  >
                    <div
                      className={`border p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 rounded-xs h-full ${
                        isActive
                          ? 'bg-neutral-900 border-neutral-700 shadow-2xl'
                          : 'bg-neutral-950/80 border-neutral-800/80'
                      }`}
                    >
                      <div>
                        {/* Portrait photo */}
                        <div className="relative mb-6 overflow-hidden aspect-[4/3] sm:aspect-square border border-neutral-800 bg-neutral-950 w-full max-w-md mx-auto">
                          <img
                            src={leader.image}
                            alt={leader.name}
                            className={`w-full h-full object-cover object-top transition-all duration-500 ${
                              isActive ? 'grayscale contrast-110' : 'grayscale opacity-75'
                            }`}
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />
                          <div className="absolute bottom-3 left-3 bg-neutral-950/90 border border-neutral-800 px-2.5 py-1 text-[10px] font-mono text-neutral-300 uppercase">
                            {leader.title}
                          </div>
                        </div>

                        {/* Leader Name & Role */}
                        <h4 className="text-xl font-semibold text-white font-sans tracking-tight">
                          {leader.name}
                        </h4>
                        <p className="text-xs font-mono text-neutral-400 mt-1 mb-4">
                          {leader.role}
                        </p>

                        {/* Philosophy Quote */}
                        <div className="p-3 bg-neutral-950 border-l-2 border-white mb-6 text-xs italic font-serif text-neutral-300">
                          "{leader.philosophy}"
                        </div>

                        {/* Credentials List */}
                        <div className="space-y-2 mb-6">
                          <div className="text-[10px] uppercase font-mono text-neutral-500 tracking-wider">
                            Qualifications & Track Record
                          </div>
                          {leader.credentials.map((cred, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-neutral-300 font-light">
                              <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                              <span>{cred}</span>
                            </div>
                          ))}
                        </div>

                        {/* Bio */}
                        <p className="text-xs text-neutral-400 font-light leading-relaxed border-t border-neutral-800 pt-4">
                          {leader.bio}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-neutral-800 text-[10px] font-mono text-neutral-500 uppercase tracking-widest flex items-center justify-between">
                        <span>Advisory Director</span>
                        <Shield className="w-3.5 h-3.5 text-neutral-600" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {LEADERSHIP_PROFILES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 transition-all rounded-full ${
                  currentIndex === idx ? 'w-8 bg-white' : 'w-2 bg-neutral-700 hover:bg-neutral-500'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

