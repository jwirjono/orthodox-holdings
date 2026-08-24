import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

/** Counts up to `value` once the element scrolls into view. */
export const Counter: React.FC<{ value: number; suffix?: string; duration?: number }> = ({
  value,
  suffix = '',
  duration = 2,
}) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const increment = value / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="font-sans text-4xl md:text-6xl font-light">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export const SectionHeading: React.FC<{
  children: React.ReactNode;
  subtitle?: string;
}> = ({ children, subtitle }) => (
  <div className="mb-12">
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="uppercase tracking-[0.3em] text-xs font-semibold mb-4"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-5xl font-light leading-tight"
    >
      {children}
    </motion.h2>
  </div>
);

export const CustomSelect: React.FC<{
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder: string;
}> = ({ value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-gold outline-none transition-all flex items-center justify-between group"
      >
        <span className={cn(value ? 'text-white' : 'text-white/30')}>{value || placeholder}</span>
        <ChevronDown className={cn('w-4 h-4 transition-transform duration-300', isOpen && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-[110]" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full mt-1 bg-[#121212] border border-white/10 z-[120] shadow-2xl overflow-hidden"
            >
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'w-full text-left px-4 py-3 text-sm transition-colors hover:bg-gold hover:text-black',
                    value === option ? 'bg-white/5' : 'text-white/70'
                  )}
                >
                  {option}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
