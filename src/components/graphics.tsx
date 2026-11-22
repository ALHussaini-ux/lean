import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { EASE } from '../lib/motion';

/* -------------------------------------------------------------------------- */
/* Shared                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * A looping clock (ms) that only runs while the element is on screen.
 * With reduced motion it returns `still`, a moment where the scene is complete.
 */
function useCycle(cycle: number, still: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();
  const [t, setT] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const start = Date.now();
    setT(0);
    const id = setInterval(() => setT((Date.now() - start) % cycle), 80);
    return () => clearInterval(id);
  }, [inView, reduce, cycle]);

  return { ref, t: reduce ? still : t };
}

function Frame({ children, className = '', label }: { children: React.ReactNode; className?: string; label: string }) {
  return (
    <figure
      aria-label={label}
      className={`relative w-full overflow-hidden rounded-2xl border border-line bg-card ${className}`}
    >
      {children}
    </figure>
  );
}

const show = (on: boolean, y = 8) => ({ opacity: on ? 1 : 0, y: on ? 0 : y });

/* -------------------------------------------------------------------------- */
/* 1. Ads: a search is typed, your ad is picked, junk searches are blocked     */
/* -------------------------------------------------------------------------- */

const QUERY = '3 bhk flats in kokapet';
const BLOCKED = ['flat for rent', 'PG near me', 'under 30 lakhs'];

export function AdsGraphic({ className = 'aspect-[4/3]' }: { className?: string }) {
  const { ref, t } = useCycle(8200, 6000);
  const typed = QUERY.slice(0, Math.min(QUERY.length, Math.floor((t / 1500) * QUERY.length)));
  const results = t > 1800;
  const picked = t > 3000;
  const ripple = t > 3000 && t < 3900;
  const end = t > 7700;

  return (
    <Frame className={className} label="Animation: a buyer searches for a flat, clicks your ad, and searches for rentals are blocked">
      <motion.div ref={ref} animate={{ opacity: end ? 0 : 1 }} transition={{ duration: 0.4 }} className="absolute inset-0 flex flex-col justify-center gap-4 p-[6%]">
        {/* Search box */}
        <div className="flex h-11 items-center gap-3 rounded-full border border-line bg-paper px-4 text-[14px] shadow-[0_1px_0_rgba(0,0,0,0.03)]">
          <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-muted" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.5 10.5 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="truncate">{typed}</span>
          <span className={`-ml-2 h-4 w-px bg-ink ${t > 1500 ? 'opacity-0' : 'animate-pulse'}`} />
        </div>

        {/* Results */}
        <div className="space-y-2.5">
          <motion.div
            animate={{ ...show(results), borderColor: picked ? 'var(--color-accent)' : 'var(--color-line)' }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative overflow-hidden rounded-xl border bg-paper p-3.5"
          >
            <p className="text-[11px] text-muted">
              <span className="font-medium text-ink">Sponsored</span> · yourproject.in
            </p>
            <p className="mt-1 text-[14px] font-medium leading-snug tracking-[-0.01em]">3 &amp; 4 BHK in Kokapet · Site visits this weekend</p>
            <AnimatePresence>
              {ripple && (
                <motion.span
                  key="ripple"
                  className="absolute right-6 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-accent/25"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 3, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              )}
            </AnimatePresence>
          </motion.div>
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              animate={show(results)}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: EASE }}
              className="rounded-xl px-3.5 py-2"
            >
              <div className="h-2 w-1/3 rounded-full bg-paper-2" />
              <div className="mt-2 h-2.5 w-3/4 rounded-full bg-paper-2" />
            </motion.div>
          ))}
        </div>

        {/* Blocked searches */}
        <div className="flex flex-wrap items-center gap-2">
          <motion.span animate={show(t > 4200, 4)} className="mr-1 text-[12px] text-muted">
            Not shown for
          </motion.span>
          {BLOCKED.map((b, i) => {
            const on = t > 4400 + i * 450;
            return (
              <motion.span
                key={b}
                animate={show(on, 4)}
                transition={{ duration: 0.4, ease: EASE }}
                className="relative rounded-full border border-line px-3 py-1 text-[12px] text-muted"
              >
                {b}
                <motion.span
                  className="absolute left-2.5 right-2.5 top-1/2 h-px origin-left bg-accent"
                  animate={{ scaleX: on && t > 4700 + i * 450 ? 1 : 0 }}
                  transition={{ duration: 0.35 }}
                />
              </motion.span>
            );
          })}
        </div>
      </motion.div>
    </Frame>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Landing page: a project page builds itself, a visit gets requested       */
/* -------------------------------------------------------------------------- */

function Skyline() {
  return (
    <svg viewBox="0 0 120 70" className="h-full w-full" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1">
        <rect x="14" y="22" width="22" height="48" />
        <rect x="40" y="8" width="26" height="62" />
        <rect x="70" y="30" width="18" height="40" />
        <rect x="92" y="18" width="16" height="52" />
      </g>
      <g fill="currentColor" opacity="0.5">
        {[14, 24, 34, 44, 54].map((y) => (
          <React.Fragment key={y}>
            <rect x="45" y={y} width="5" height="4" />
            <rect x="56" y={y} width="5" height="4" />
          </React.Fragment>
        ))}
        {[28, 38, 48, 58].map((y) => (
          <React.Fragment key={y}>
            <rect x="19" y={y} width="4" height="4" />
            <rect x="27" y={y} width="4" height="4" />
            <rect x="96" y={y - 4} width="3" height="4" />
            <rect x="102" y={y - 4} width="3" height="4" />
          </React.Fragment>
        ))}
      </g>
    </svg>
  );
}

export function PageGraphic({ className = 'aspect-[4/3]' }: { className?: string }) {
  const { ref, t } = useCycle(8000, 5200);
  const step = (ms: number) => t > ms;
  const sent = step(4600);
  const end = t > 7500;

  return (
    <Frame className={className} label="Animation: a fast project page loads on a phone and a site visit is requested">
      <motion.div ref={ref} animate={{ opacity: end ? 0 : 1 }} transition={{ duration: 0.4 }} className="absolute inset-0 flex items-center justify-center gap-[6%] p-[6%]">
        {/* Phone */}
        <div className="relative h-[92%] aspect-[9/17] overflow-hidden rounded-[22px] border border-ink/80 bg-paper p-[5%]">
          <div className="mx-auto mb-[6%] h-1 w-1/4 rounded-full bg-ink/15" />
          <motion.div
            animate={{ opacity: step(200) ? 1 : 0, scale: step(200) ? 1 : 0.96 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="aspect-[12/7] w-full rounded-lg bg-paper-2 p-[6%] text-ink/60"
          >
            <Skyline />
          </motion.div>
          <motion.div animate={show(step(600))} transition={{ duration: 0.5, ease: EASE }} className="mt-[7%] space-y-1.5">
            <div className="h-2.5 w-4/5 rounded-full bg-ink" />
            <div className="h-1.5 w-3/5 rounded-full bg-ink/20" />
          </motion.div>
          <div className="mt-[7%] flex gap-1.5">
            {['2 BHK', '3 BHK', '4 BHK'].map((c, i) => (
              <motion.span
                key={c}
                animate={show(step(900 + i * 150), 4)}
                transition={{ duration: 0.4, ease: EASE }}
                className="rounded-full border border-line px-1.5 py-0.5 text-[9px] text-ink-2"
              >
                {c}
              </motion.span>
            ))}
          </div>

          {/* Enquiry sheet */}
          <motion.div
            animate={{ y: step(2300) ? '0%' : '105%' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="absolute inset-x-0 bottom-0 rounded-t-2xl border-t border-line bg-card p-[7%] shadow-[0_-8px_24px_rgba(20,20,18,0.06)]"
          >
            <p className="text-[10px] font-medium">Book a site visit</p>
            {[0, 1].map((i) => (
              <div key={i} className="mt-2 h-5 rounded-md border border-line px-1.5 flex items-center">
                <motion.div
                  className="h-1 rounded-full bg-ink/50"
                  animate={{ width: step(2900 + i * 500) ? (i ? '45%' : '65%') : '0%' }}
                  transition={{ duration: 0.45 }}
                />
              </div>
            ))}
            <motion.div
              animate={{ backgroundColor: sent ? 'var(--color-accent)' : 'var(--color-ink)', scale: step(4300) && !sent ? 0.96 : 1 }}
              transition={{ duration: 0.25 }}
              className="mt-2.5 flex h-6 items-center justify-center rounded-full text-[9px] font-medium text-paper"
            >
              {sent ? '✓ Visit requested' : 'Request visit'}
            </motion.div>
          </motion.div>
        </div>

        {/* Annotations */}
        <div className="hidden w-[34%] space-y-4 sm:block">
          {[
            { at: 1200, label: 'Loads in under 2 seconds' },
            { at: 2400, label: 'Form one thumb away' },
            { at: 4700, label: 'Enquiry lands on your board' },
          ].map((a) => (
            <motion.div key={a.label} animate={show(step(a.at), 6)} transition={{ duration: 0.5, ease: EASE }} className="flex items-start gap-2.5">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <p className="text-[13px] leading-snug text-ink-2">{a.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Frame>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Lead tracking: a new enquiry moves across the board                      */
/* -------------------------------------------------------------------------- */

const COLUMNS = ['New', 'Contacted', 'Visit booked'];

function GhostCard({ w = '70%' }: { w?: string }) {
  return (
    <div className="rounded-lg border border-line bg-paper p-2.5">
      <div className="h-1.5 rounded-full bg-ink/15" style={{ width: w }} />
      <div className="mt-1.5 h-1.5 w-2/5 rounded-full bg-ink/10" />
    </div>
  );
}

export function BoardGraphic({ className = 'aspect-[4/3]' }: { className?: string }) {
  const { ref, t } = useCycle(8000, 5400);
  const id = useId();
  const visible = t > 300 && t < 7500;
  const col = t < 2400 ? 0 : t < 4600 ? 1 : 2;
  const alert = t > 500 && t < 2300;
  const booked = col === 2;

  const ghosts = [['72%', '55%'], ['64%'], ['58%']];

  return (
    <Frame className={className} label="Animation: a new enquiry arrives, the sales team is alerted, and the lead moves to visit booked">
      <div ref={ref} className="absolute inset-0 flex flex-col p-[6%]">
        <div className="relative h-8">
          <AnimatePresence>
            {alert && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="absolute right-0 top-0 flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-[11px] text-paper"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                New enquiry · sales team alerted
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <LayoutGroup id={id}>
          <div className="mt-3 grid flex-1 grid-cols-3 gap-2.5">
            {COLUMNS.map((name, c) => (
              <div key={name} className="flex flex-col gap-2 rounded-xl bg-paper-2/70 p-2">
                <p className="flex items-center justify-between px-0.5 text-[11px] text-muted">
                  {name}
                  {c === 2 && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                </p>
                {visible && col === c && (
                  <motion.div
                    layoutId="lead"
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className={`rounded-lg border bg-card p-2.5 shadow-[0_6px_16px_rgba(20,20,18,0.08)] ${booked ? 'border-accent' : 'border-ink/30'}`}
                  >
                    <p className="text-[11px] font-medium leading-tight">3 BHK · Kokapet</p>
                    <p className="mt-1 text-[10px] text-muted">{booked ? 'Sat, 11:00 am' : c === 1 ? 'Called · brochure sent' : 'via Google Ads · just now'}</p>
                  </motion.div>
                )}
                {ghosts[c].map((w, i) => (
                  <motion.div layout key={i} transition={{ duration: 0.6, ease: EASE }}>
                    <GhostCard w={w} />
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </LayoutGroup>
      </div>
    </Frame>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Reporting: site visits up, cost per visit down, plus what changed        */
/* -------------------------------------------------------------------------- */

const BARS = [34, 42, 40, 55, 63, 74];
const COST = [78, 70, 72, 58, 50, 42];

export function ReportGraphic({ className = 'aspect-[4/3]' }: { className?: string }) {
  const { ref, t } = useCycle(9000, 6000);
  const end = t > 8500;
  const W = 300;
  const H = 130;
  const step = W / BARS.length;
  const pts = COST.map((v, i) => `${i * step + step / 2},${H - (v / 100) * H}`).join(' ');

  return (
    <Frame className={className} label="Animation: a weekly report where site visits rise and cost per visit falls">
      <motion.div ref={ref} animate={{ opacity: end ? 0 : 1 }} transition={{ duration: 0.4 }} className="absolute inset-0 flex flex-col p-[6%]">
        <div className="flex items-baseline justify-between">
          <p className="text-[14px] font-medium tracking-[-0.01em]">Weekly report</p>
          <div className="flex gap-4 text-[11px] text-muted">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-ink" />Site visits</span>
            <span className="flex items-center gap-1.5"><span className="h-px w-3 bg-accent" />Cost per visit</span>
          </div>
        </div>

        <div className="mt-4 min-h-0 flex-1">
        <svg viewBox={`0 0 ${W} ${H + 18}`} preserveAspectRatio="xMidYMid meet" className="h-full w-full overflow-visible" aria-hidden="true">
          {[0.25, 0.5, 0.75, 1].map((g) => (
            <line key={g} x1="0" x2={W} y1={H - g * H} y2={H - g * H} stroke="var(--color-line)" strokeWidth="0.75" />
          ))}
          {BARS.map((v, i) => {
            const h = (v / 100) * H;
            const grown = t > 200 + i * 140;
            return (
              <motion.rect
                key={i}
                x={i * step + step * 0.25}
                width={step * 0.5}
                rx="2"
                fill="var(--color-ink)"
                fillOpacity={i === BARS.length - 1 ? 1 : 0.85}
                animate={{ height: grown ? h : 0, y: grown ? H - h : H }}
                transition={{ duration: 0.7, ease: EASE }}
              />
            );
          })}
          <motion.polyline
            points={pts}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ pathLength: t > 1300 ? 1 : 0 }}
            transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
          />
          {t > 2600 && (
            <motion.circle
              cx={(BARS.length - 1) * step + step / 2}
              cy={H - (COST[COST.length - 1] / 100) * H}
              r="4"
              fill="var(--color-card)"
              stroke="var(--color-accent)"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            />
          )}
          {BARS.map((_, i) => (
            <text key={i} x={i * step + step / 2} y={H + 14} textAnchor="middle" fontSize="9" fill="var(--color-muted)">
              W{i + 1}
            </text>
          ))}
        </svg>
        </div>

        <div className="mt-4 shrink-0 space-y-1.5 border-t border-line pt-3">
          {['Paused 6 searches that brought renters', 'Moved budget to the better-performing ad'].map((note, i) => (
            <motion.p key={note} animate={show(t > 3000 + i * 600, 4)} transition={{ duration: 0.45, ease: EASE }} className="flex items-center gap-2 text-[12px] text-ink-2">
              <span className="text-accent">→</span>
              {note}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </Frame>
  );
}

export const SERVICE_GRAPHICS: Record<string, (p: { className?: string }) => React.ReactElement> = {
  ads: AdsGraphic,
  'landing-pages': PageGraphic,
  'lead-tracking': BoardGraphic,
  reporting: ReportGraphic,
};

/* -------------------------------------------------------------------------- */
/* Response time comparison (scroll-linked)                                    */
/* -------------------------------------------------------------------------- */

export function ResponseCompare() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.35'] });
  const slow = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const fast = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const fastLabel = useTransform(scrollYProgress, [0.08, 0.2], [0, 1]);
  const slowLabel = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  const rows = [
    { who: 'Typical follow-up', time: '1–2 days', note: 'By then the buyer has seen two other projects.', bar: reduce ? 1 : slow, label: reduce ? 1 : slowLabel, tone: 'bg-ink/25', width: '100%' },
    { who: 'With Lean System', time: 'Under a minute', note: 'Brochure sent instantly. Sales team alerted.', bar: reduce ? 1 : fast, label: reduce ? 1 : fastLabel, tone: 'bg-accent', width: '6%' },
  ];

  return (
    <div ref={ref} className="space-y-8">
      <p className="eyebrow">Time until the buyer hears back</p>
      {rows.map((r) => (
        <div key={r.who} className="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-center">
          <p className="text-[15px] font-medium md:col-span-3">{r.who}</p>
          <div className="relative h-2 rounded-full bg-paper-2 md:col-span-6">
            <motion.div className={`absolute inset-y-0 left-0 origin-left rounded-full ${r.tone}`} style={{ width: r.width, scaleX: r.bar }} />
          </div>
          <motion.div style={{ opacity: r.label }} className="md:col-span-3">
            <p className="text-[15px] font-medium">{r.time}</p>
            <p className="text-[13px] leading-snug text-muted">{r.note}</p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero: enquiries arriving from across west Hyderabad                         */
/* -------------------------------------------------------------------------- */

// Positions are in a 640 × 440 space, shared by the SVG lines and the HTML labels.
const MAP_W = 640;
const MAP_H = 440;
const AREAS = [
  { name: 'Kokapet', x: 150, y: 262 },
  { name: 'Gachibowli', x: 262, y: 190 },
  { name: 'Tellapur', x: 92, y: 140 },
  { name: 'Kondapur', x: 318, y: 112 },
  { name: 'Narsingi', x: 214, y: 330 },
  { name: 'Financial District', x: 200, y: 222 },
  { name: 'Kukatpally', x: 420, y: 64 },
  { name: 'Manikonda', x: 300, y: 276 },
];
const SALES = { x: 488, y: 236 };
const CONFIGS = ['3 BHK', '2 BHK', '4 BHK', 'Villa', '3 BHK', 'Plot'];
const SOURCES = ['Google Ads', 'Meta', 'Google Ads', 'Your website'];

function curve(a: { x: number; y: number }) {
  const cx = (a.x + SALES.x) / 2;
  const cy = Math.min(a.y, SALES.y) - 70;
  return { d: `M${a.x},${a.y} Q${cx},${cy} ${SALES.x},${SALES.y}`, cx, cy };
}

function bezierPoints(a: { x: number; y: number }, steps = 14) {
  const { cx, cy } = curve(a);
  const xs: number[] = [];
  const ys: number[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    xs.push((1 - t) ** 2 * a.x + 2 * (1 - t) * t * cx + t ** 2 * SALES.x);
    ys.push((1 - t) ** 2 * a.y + 2 * (1 - t) * t * cy + t ** 2 * SALES.y);
  }
  return { xs, ys };
}

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

interface Enquiry {
  id: number;
  area: number;
  config: string;
  source: string;
}

const ORDER = [1, 0, 3, 5, 2, 7, 4, 6];
const makeEnquiry = (id: number): Enquiry => ({
  id,
  area: ORDER[id % ORDER.length],
  config: CONFIGS[id % CONFIGS.length],
  source: SOURCES[id % SOURCES.length],
});

export function HeroMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [events, setEvents] = useState<Enquiry[]>(() => [makeEnquiry(0), makeEnquiry(1)]);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = setInterval(() => {
      setEvents((prev) => [...prev.slice(-3), makeEnquiry(prev[prev.length - 1].id + 1)]);
    }, 1900);
    return () => clearInterval(id);
  }, [inView, reduce]);

  const latest = events[events.length - 1];
  const recent = events.slice(-2);
  const feed = events.slice(-2).reverse();

  return (
    <figure
      ref={ref}
      aria-label="Animation: enquiries from areas across west Hyderabad travel to your sales team"
      className="relative w-full overflow-hidden rounded-2xl border border-line bg-card"
      style={{ aspectRatio: `${MAP_W} / ${MAP_H}` }}
    >
      <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <pattern id="hero-dots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="var(--color-line)" />
          </pattern>
        </defs>
        <rect width={MAP_W} height={MAP_H} fill="url(#hero-dots)" />

        {/* Outer Ring Road */}
        <motion.ellipse
          cx="300"
          cy="215"
          rx="270"
          ry="178"
          fill="none"
          stroke="var(--color-ink)"
          strokeOpacity="0.14"
          strokeWidth="6"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
        />
        {/* A couple of arterial roads */}
        <path d="M30,300 C160,250 300,240 620,210" fill="none" stroke="var(--color-ink)" strokeOpacity="0.07" strokeWidth="3" />
        <path d="M240,20 C260,160 250,300 300,430" fill="none" stroke="var(--color-ink)" strokeOpacity="0.07" strokeWidth="3" />

        {/* Enquiry paths */}
        <AnimatePresence>
          {recent.map((e) => {
            const a = AREAS[e.area];
            const { xs, ys } = bezierPoints(a);
            return (
              <motion.g key={e.id} initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
                <motion.path
                  d={curve(a).d}
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="1.5"
                  strokeDasharray="3 4"
                  initial={reduce ? false : { pathLength: 0, opacity: 0.9 }}
                  animate={{ pathLength: 1, opacity: e.id === latest.id ? 0.9 : 0.25 }}
                  transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
                />
                {!reduce && (
                  <motion.circle
                    r="4.5"
                    fill="var(--color-accent)"
                    initial={{ cx: xs[0], cy: ys[0], opacity: 1 }}
                    animate={{ cx: xs, cy: ys, opacity: [1, 1, 0] }}
                    transition={{ duration: 1, ease: [0.65, 0, 0.35, 1], opacity: { duration: 1.2, times: [0, 0.8, 1] } }}
                  />
                )}
              </motion.g>
            );
          })}
        </AnimatePresence>
      </svg>

      {/* ORR label */}
      <span className="absolute text-[10px] tracking-wide text-faint" style={{ left: pct(548, MAP_W), top: pct(96, MAP_H) }}>
        ORR
      </span>

      {/* Areas */}
      {AREAS.map((a, i) => {
        const active = latest.area === i;
        return (
          <div key={a.name} className="absolute" style={{ left: pct(a.x, MAP_W), top: pct(a.y, MAP_H) }}>
            <span className="absolute -left-[4px] -top-[4px] block h-2 w-2">
              <span className={`absolute inset-0 rounded-full transition-colors duration-500 ${active ? 'bg-accent' : 'bg-ink/50'}`} />
              <AnimatePresence>
                {active && !reduce && (
                  <motion.span
                    key={latest.id}
                    className="absolute inset-0 rounded-full bg-accent"
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 5, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.3, ease: 'easeOut' }}
                  />
                )}
              </AnimatePresence>
            </span>
            <span
              className={`absolute left-2 top-1 hidden whitespace-nowrap text-[11px] transition-colors duration-500 sm:block ${
                active ? 'text-ink' : 'text-muted'
              }`}
            >
              {a.name}
            </span>
          </div>
        );
      })}

      {/* Sales team node */}
      <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: pct(SALES.x, MAP_W), top: pct(SALES.y, MAP_H) }}>
        <motion.div
          key={latest.id}
          initial={reduce ? false : { scale: 1 }}
          animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
          transition={{ duration: 0.5, delay: 0.95 }}
          className="relative flex items-center gap-2 whitespace-nowrap rounded-full bg-ink py-1.5 pl-2 pr-3 text-[11px] font-medium text-paper sm:text-[12px]"
        >
          <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-paper/15">
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden="true">
              <path d="M3 13.5V12a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1.5M8 7a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </span>
          <span className="hidden sm:inline">Your sales team</span>
          <span className="sm:hidden">Sales team</span>
          <AnimatePresence>
            {!reduce && (
              <motion.span
                key={latest.id}
                className="absolute -right-2 -top-2 rounded-full bg-accent px-1.5 py-0.5 text-[10px] text-paper"
                initial={{ opacity: 0, y: 4, scale: 0.6 }}
                animate={{ opacity: [0, 1, 1, 0], y: [4, 0, 0, -4], scale: 1 }}
                transition={{ duration: 1.4, delay: 0.9, times: [0, 0.15, 0.75, 1] }}
              >
                +1
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Live feed */}
      <div className="absolute bottom-4 right-4 hidden w-[min(240px,40%)] sm:block">
        <ul className="flex flex-col gap-1.5">
          <AnimatePresence initial={false}>
            {feed.map((e, i) => (
              <motion.li
                key={e.id}
                layout
                initial={{ opacity: 0, y: -10, scale: 0.97 }}
                animate={{ opacity: i === 0 ? 1 : 0.55, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, ease: EASE, delay: i === 0 && !reduce ? 0.9 : 0 }}
                className="flex items-center gap-2.5 rounded-xl border border-line bg-paper/95 px-3 py-2 shadow-[0_6px_18px_rgba(20,20,18,0.06)] backdrop-blur"
              >
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${i === 0 ? 'bg-accent' : 'bg-ink/30'}`} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11px] font-medium sm:text-[12px]">
                    {e.config} · {AREAS[e.area].name}
                  </span>
                  <span className="block truncate text-[10px] text-muted sm:text-[11px]">via {e.source}</span>
                </span>
                <span className="shrink-0 text-[10px] text-muted">{i === 0 ? 'now' : '2s'}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </figure>
  );
}
