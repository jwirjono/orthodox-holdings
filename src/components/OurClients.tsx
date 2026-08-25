import React, { useMemo } from 'react';
import { Building2 } from 'lucide-react';
import { useTranslation } from '../i18n';

/** Seconds per full loop for each row. Alternating directions keep the rows from
 *  reading as one solid block sliding across the screen. */
const ROWS = [
  { duration: 68, direction: 'left' },
  { duration: 86, direction: 'right' },
  { duration: 76, direction: 'left' },
] as const;

type ClientItem = { name: string; engagement: string };

const ClientCard: React.FC<{ item: ClientItem }> = ({ item }) => (
  <div className="w-[240px] sm:w-[290px] h-full border border-neutral-800 bg-neutral-900/50 px-5 py-4 flex items-start gap-3">
    <Building2 className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
    <div className="min-w-0">
      <div className="text-sm text-neutral-100 font-light leading-snug truncate">{item.name}</div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mt-1.5 truncate">
        {item.engagement}
      </div>
    </div>
  </div>
);

export const OurClients: React.FC = () => {
  const t = useTranslation();

  // Round-robin so each row gets an even share regardless of the item count.
  const rows = useMemo(
    () => ROWS.map((_, row) => t.ourClients.items.filter((_item, i) => i % ROWS.length === row)),
    [t]
  );

  return (
    <section
      id="our-clients"
      className="py-24 bg-[#080808] text-white border-b border-neutral-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 pb-6 border-b border-neutral-800">
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">
            {t.ourClients.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white uppercase mb-3">
            {t.ourClients.title}
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 font-light max-w-3xl leading-relaxed">
            {t.ourClients.subtitle}
          </p>
        </div>
      </div>

      {/* Three read-only rows. `pointer-events-none` keeps the whole band inert:
          nothing here is clickable, hoverable, or selectable. */}
      <div className="marquee-mask space-y-4 pointer-events-none select-none">
        {rows.map((items, row) => {
          const { duration, direction } = ROWS[row];

          return (
            <ul
              key={row}
              className={`marquee-track ${
                direction === 'left' ? 'marquee-track-left' : 'marquee-track-right'
              }`}
              style={{ ['--marquee-duration' as string]: `${duration}s` }}
            >
              {/* The list is rendered twice; the copy is hidden from assistive
                  tech so the client names are announced only once. */}
              {[0, 1].map((copy) =>
                items.map((item, i) => (
                  <li
                    key={`${copy}-${i}`}
                    className="pr-4 sm:pr-5 shrink-0"
                    aria-hidden={copy === 1 || undefined}
                  >
                    <ClientCard item={item} />
                  </li>
                ))
              )}
            </ul>
          );
        })}
      </div>
    </section>
  );
};
