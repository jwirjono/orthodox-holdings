import React from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Briefcase,
  BarChart3,
  ChevronRight,
  ArrowRight,
  Landmark,
  Percent,
  Umbrella,
  Hourglass,
  Banknote,
  Building2,
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useTranslation } from '../../i18n';
import { useNavigation } from '../../navigation';
import { Counter, SectionHeading } from './WealthPrimitives';
import { WealthConsultationForm } from './WealthConsultationForm';
import aboutPhoto from '../../assets/images/wealth/owm-about.jpeg';

/** Icons for `t.wealth.problem.cards`, in order. */
const PROBLEM_ICONS = [BarChart3, ShieldCheck, Briefcase];

/** Icons for `t.wealth.services.items`, in order. */
const SERVICE_ICONS = [
  Landmark,
  ShieldCheck,
  Percent,
  Umbrella,
  Hourglass,
  Banknote,
  Building2,
  BarChart3,
];

const scrollToContact = () => {
  document.getElementById('wealth-contact')?.scrollIntoView({ behavior: 'smooth' });
};

/**
 * Orthodox Wealth Management — the personal financial planning arm of Orthodox
 * Holding. Previously a standalone site; now the `wealth` view of this app.
 */
export const WealthManagementPage: React.FC = () => {
  const t = useTranslation();
  const { navigateView } = useNavigation();

  return (
    <div className="bg-[#0a0a0a] selection:bg-gold selection:text-black">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070"
            className="w-full h-full object-cover opacity-20 grayscale"
            alt={t.wealth.hero.imageAlt}
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/70 to-[#0a0a0a]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-10 md:px-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light mt-4 mb-4 sm:mb-10 leading-[1.1]">
              {t.wealth.hero.titleLine1}
              <br />
              <span className="italic font-sans">{t.wealth.hero.titleLine2}</span>
            </h1>
            <div className="text-base sm:text-md md:text-lg text-white/60 max-w-2xl mx-auto mb-10 sm:mb-16 font-light leading-relaxed px-4 space-y-4">
              {t.wealth.hero.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16 max-w-2xl mx-auto mt-9 sm:mt-18">
            {t.wealth.hero.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <Counter value={stat.value} suffix={stat.suffix} duration={2 + i * 0.5} />
                <p className="uppercase tracking-[0.2em] text-[10px] sm:text-xs mt-3 font-semibold">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The problem we solve */}
      <section className="py-24 bg-[#0f0f0f] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-10 md:px-20 lg:px-32">
          <SectionHeading subtitle={t.wealth.problem.eyebrow}>
            {t.wealth.problem.headingLine1} <br />
            {t.wealth.problem.headingLine2}
          </SectionHeading>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {t.wealth.problem.cards.map((card, i) => {
              const Icon = PROBLEM_ICONS[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-panel p-8 group hover:border-gold/50 transition-all cursor-pointer h-full flex flex-col"
                  onClick={scrollToContact}
                >
                  <Icon className="w-10 h-10 mb-6 group-hover:scale-110 transition-transform" />

                  <h3 className="text-2xl mb-4 min-h-[64px]">{card.title}</h3>

                  <p className="text-white/50 mb-8 font-light leading-relaxed grow">
                    {card.description}
                  </p>

                  <button
                    type="button"
                    className="flex items-center gap-2 text-sm uppercase tracking-widest font-semibold group-hover:gap-4 transition-all mt-auto"
                  >
                    {card.cta} <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it should work — structured financial flow */}
      <section className="py-28 bg-[#0f0f0f] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-10 md:px-20 lg:px-32">
          <div className="text-center mb-20">
            <SectionHeading subtitle={t.wealth.flow.eyebrow}>{t.wealth.flow.heading}</SectionHeading>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-6">
            {t.wealth.flow.steps.map((step, i) => (
              <div key={i} className="flex items-center">
                <div className="text-center group">
                  <div className="font-sans text-3xl text-white/20 group-hover:text-gold transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="mt-2 text-sm uppercase tracking-[0.2em] text-white/70">{step}</div>
                </div>

                {i < t.wealth.flow.steps.length - 1 && (
                  <div className="hidden md:block w-16 h-px bg-white/10 mx-6" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-20 text-center max-w-3xl mx-auto">
            <p className="text-white/70 font-light text-lg leading-relaxed">
              {t.wealth.flow.closing}
            </p>
          </div>

          {/* Cross-sell into the business advisory arm */}
          <div className="mt-16 pt-10 border-t border-white/10 text-center max-w-3xl mx-auto">
            <p className="text-white/50 font-light text-sm leading-relaxed">
              {t.wealth.flow.corporateNote}
            </p>
            <button
              type="button"
              onClick={() => navigateView('business')}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 border border-white/50 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-black transition-all"
            >
              <span>{t.wealth.flow.corporateNoteCta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section id="about" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-10 md:px-20 lg:px-32">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}>
              <SectionHeading subtitle={t.wealth.about.eyebrow}>
                {t.wealth.about.heading}
              </SectionHeading>
              <div className="space-y-6 text-white/70 font-light text-md leading-relaxed">
                {t.wealth.about.paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative mb-[250px]"
            >
              <img
                src={aboutPhoto}
                className="w-full h-[500px] object-cover relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
                alt={t.wealth.about.imageAlt}
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our expertise */}
      <section id="services" className="py-24 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-10 md:px-20 lg:px-32">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <SectionHeading>{t.wealth.services.heading}</SectionHeading>
            <p className="text-white/60 font-light leading-relaxed">{t.wealth.services.intro}</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 items-stretch">
            {t.wealth.services.items.map((item, i) => {
              const Icon = SERVICE_ICONS[i];
              return (
                <div key={i} className="flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 border border-gold/30 flex items-center justify-center mb-6 rotate-45 group hover:bg-gold transition-all">
                    <Icon className="w-8 h-8 rotate-[-45deg] group-hover:text-black transition-colors" />
                  </div>

                  <h4 className="text-lg font-medium mb-3 min-h-[56px]">{item.title}</h4>

                  <p className="text-white/50 text-sm font-light leading-relaxed grow">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center max-w-3xl mx-auto">
            <p className="text-white/70 font-light text-lg leading-relaxed">
              {t.wealth.services.closing}
            </p>
          </div>
        </div>
      </section>

      {/* Why Orthodox */}
      <section className="py-28 bg-[#0f0f0f] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-10 md:px-20 lg:px-32">
          <div className="text-center mb-20">
            <SectionHeading subtitle={t.wealth.why.eyebrow}>
              {t.wealth.why.headingLine1} <br />
              {t.wealth.why.headingLine2}
            </SectionHeading>
          </div>

          <div className="space-y-16">
            {t.wealth.why.items.map((item, i) => (
              <div key={i} className="grid md:grid-cols-12 gap-6 md:gap-10 items-start group">
                <div className="md:col-span-2">
                  <span className="font-sans text-4xl text-white/20 group-hover:text-gold transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="md:col-span-10">
                  <h3 className="text-2xl md:text-3xl mb-4 group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/60 font-light leading-relaxed max-w-3xl">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center max-w-3xl mx-auto">
            <p className="text-white/70 font-light text-lg leading-relaxed">
              {t.wealth.why.closing}
            </p>
          </div>
        </div>
      </section>

      {/* Our strategic process */}
      <section id="process" className="py-24">
        <div className="max-w-7xl mx-auto px-10 md:px-20 lg:px-32">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <SectionHeading subtitle={t.wealth.process.eyebrow}>
              {t.wealth.process.heading}
            </SectionHeading>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 items-stretch">
            {t.wealth.process.steps.map((item, i) => (
              <div key={i} className="flex flex-col h-full group">
                <span className="font-sans text-4xl text-white/20 group-hover:text-gold transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h5 className="text-xl mt-4 mb-3">{item.title}</h5>
                <p className="text-white/50 font-light leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <p className="font-sans text-xl md:text-2xl text-white/30 my-16 md:my-20 px-4 md:px-0 text-center max-w-4xl mx-auto">
            {t.wealth.process.closing}
          </p>

          {/* Testimonials */}
          <div className="max-w-3xl mx-auto">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              loop
              className="pb-12 md:pb-10"
            >
              {t.wealth.testimonials.map((item, i) => (
                <SwiperSlide key={i}>
                  <div className="p-8 border border-white/10 bg-white/5 text-white/80 text-center w-full max-w-2xl h-[260px] mx-auto flex flex-col justify-center">
                    <p className="italic text-md leading-relaxed line-clamp-6">“{item.quote}”</p>

                    <p className="mt-6 text-white not-italic font-medium uppercase tracking-widest text-xs">
                      — {item.author} <br />
                      {item.role}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Private consultation */}
      <section id="wealth-contact" className="py-24 bg-[#0f0f0f] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-10 md:px-16">
          <div className="text-center mb-16">
            <SectionHeading subtitle={t.wealth.contact.eyebrow}>
              {t.wealth.contact.heading}
            </SectionHeading>

            <p className="text-white/60 font-light leading-relaxed mt-6">
              {t.wealth.contact.introLine1}
              <br />
              {t.wealth.contact.introLine2}
            </p>

            <div className="w-auto h-px bg-white/70 mx-auto my-6" />

            <p className="text-white/90 font-light tracking-[0.15em] uppercase">
              {t.wealth.contact.brand}
            </p>
            <p className="text-white/40 text-sm mt-2">{t.wealth.contact.brandTagline}</p>
          </div>

          <WealthConsultationForm />
        </div>
      </section>
    </div>
  );
};
