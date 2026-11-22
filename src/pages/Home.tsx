import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ResponseCompare, SERVICE_GRAPHICS } from '../components/graphics';
import PageMetadata from '../components/PageMetadata';
import { ArrowIcon, Button, Eyebrow } from '../components/ui';
import { EASE, Lines, Page, Reveal, ScrollText } from '../lib/motion';
import { FAQS, PRINCIPLES, SERVICES, STEPS } from '../data';

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

const JOURNEY = [
  { time: '0:00', label: 'Buyer searches “3 BHK in Kokapet” and clicks your ad' },
  { time: '0:40', label: 'Enquires on your project page' },
  { time: '0:41', label: 'Gets your brochure instantly' },
  { time: '0:41', label: 'Your sales team is alerted' },
  { time: 'Same day', label: 'Called back. Site visit booked.' },
];

function Journey() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const last = JOURNEY.length - 1;
  const [step, setStep] = useState(reduce ? last : -1);

  // Walk through the steps, hold on "visit booked", then start again
  useEffect(() => {
    if (reduce || !inView) return;
    let i = -1;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i = i >= last ? -1 : i + 1;
      setStep(i);
      timer = setTimeout(tick, i === last ? 3200 : i === -1 ? 700 : 1100);
    };
    timer = setTimeout(tick, 900);
    return () => clearTimeout(timer);
  }, [inView, reduce, last]);

  const progress = Math.max(0, step) / last;

  return (
    <div ref={ref} className="relative">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <p className="eyebrow">What should happen to every enquiry</p>
        <p className="text-[13px] tabular-nums text-muted" aria-hidden="true">
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle animate-pulse" />
          {step >= 0 ? JOURNEY[step].time : '0:00'}
        </p>
      </div>
      <div className="relative">
        {/* Track: horizontal on desktop, vertical on phones */}
        <div className="absolute left-0 right-0 top-[5px] hidden h-px bg-line md:block" aria-hidden="true" />
        <motion.div
          className="absolute left-0 right-0 top-[5px] hidden h-px origin-left bg-ink md:block"
          aria-hidden="true"
          animate={{ scaleX: progress }}
          transition={{ duration: step === -1 ? 0.4 : 1, ease: [0.65, 0, 0.35, 1] }}
        />
        <div className="absolute bottom-2 left-[5px] top-2 w-px bg-line md:hidden" aria-hidden="true" />
        <motion.div
          className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-ink md:hidden"
          aria-hidden="true"
          animate={{ scaleY: progress }}
          transition={{ duration: step === -1 ? 0.4 : 1, ease: [0.65, 0, 0.35, 1] }}
        />
        <ol className="relative grid grid-cols-1 gap-6 md:grid-cols-5 md:gap-6">
          {JOURNEY.map((s, i) => {
            const active = i <= step;
            const current = i === step;
            const final = i === last;
            return (
              <li key={i} className="flex gap-5 md:block">
                <span className="relative z-10 mt-[1px] block h-[11px] w-[11px] shrink-0 md:mt-0">
                  <span
                    className={`absolute inset-0 rounded-full border transition-colors duration-500 ${
                      active ? (final ? 'border-accent bg-accent' : 'border-ink bg-ink') : 'border-ink/40 bg-paper'
                    }`}
                  />
                  <AnimatePresence>
                    {current && (
                      <motion.span
                        key={step}
                        className={`absolute inset-0 rounded-full ${final ? 'bg-accent' : 'bg-ink'}`}
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 3.2, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    )}
                  </AnimatePresence>
                </span>
                <div className={`md:mt-5 transition-opacity duration-500 ${active || step === -1 ? 'opacity-100' : 'opacity-40'}`}>
                  <p className="text-[12px] tabular-nums text-muted">{s.time}</p>
                  <p className="mt-1 text-[15px] leading-snug text-ink-2 md:pr-4">{s.label}</p>
                  {final && (
                    <motion.span
                      animate={{ opacity: step === last ? 1 : 0, y: step === last ? 0 : 4 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-[12px] font-medium text-accent-dark"
                    >
                      ✓ Visit booked
                    </motion.span>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section ref={ref} className="relative pt-36 md:pt-44 pb-20 md:pb-28">
      <motion.div style={{ y, opacity }} className="container-x">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
        >
          <Eyebrow>Lead generation for real estate · Hyderabad</Eyebrow>
        </motion.div>

        <Lines
          as="h1"
          immediate
          delay={0.15}
          className="display mt-8 text-[clamp(3rem,9.5vw,8.75rem)]"
          lines={[
            'Real estate leads,',
            <>
              handled <span className="serif-accent text-accent">properly.</span>
            </>,
          ]}
        />

        <div className="mt-10 md:mt-14 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
          <motion.p
            className="lede md:col-span-6 lg:col-span-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55, ease: EASE }}
          >
            We run your Google and Meta ads, build the page buyers land on, and make sure every enquiry is answered
            and followed up. Built for developers who want more site visits, not more clicks.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-3 md:col-span-6 lg:col-span-7 md:justify-end"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: EASE }}
          >
            <Button to="/contact">Book a call</Button>
            <Button to="/services" variant="outline" arrow={false}>
              See what we do
            </Button>
          </motion.div>
        </div>

        <div className="mt-20 md:mt-28 border-t border-line pt-8">
          <Journey />
        </div>
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Statement                                                                   */
/* -------------------------------------------------------------------------- */

function Statement() {
  return (
    <section className="py-24 md:py-40">
      <div className="container-x grid grid-cols-1 gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <Eyebrow index="01">The problem</Eyebrow>
        </div>
        <div className="md:col-span-9">
          <ScrollText
            className="text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium leading-[1.12] tracking-[-0.03em]"
            text="Most developers don’t have a lead problem. They have a follow-up problem. Enquiries come in from five places, sit in a WhatsApp group, and get a call back two days later, after the buyer has already visited someone else’s site."
          />
          <Reveal className="mt-10 md:mt-14 max-w-md">
            <p className="text-muted leading-relaxed">
              So we don’t just run ads. We look after the whole path, from the search to the site visit, and fix
              the leaks in between.
            </p>
          </Reveal>
          <Reveal className="mt-16 md:mt-24 border-t border-line pt-10">
            <ResponseCompare />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Services                                                                    */
/* -------------------------------------------------------------------------- */

function Services() {
  const [active, setActive] = useState(0);
  const Graphic = SERVICE_GRAPHICS[SERVICES[active].slug];

  return (
    <section className="py-24 md:py-32 border-t border-line">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-3">
            <Eyebrow index="02">What we do</Eyebrow>
          </div>
          <Lines className="h-section md:col-span-6" lines={['Four things,', 'done well.']} />
          <Reveal className="md:col-span-3 md:text-right">
            <Link to="/services" className="inline-flex items-center gap-2 text-[15px] link-underline">
              All the details <ArrowIcon className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 md:mt-20 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <ul className="border-t border-line lg:col-span-7">
            {SERVICES.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={i * 0.05} className="border-b border-line">
                <Link
                  to={`/services#${s.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group grid grid-cols-12 gap-4 py-8 md:py-9"
                >
                  <span className={`col-span-2 text-[13px] tabular-nums pt-2 transition-colors duration-300 ${active === i ? 'text-accent' : 'text-muted'}`}>
                    0{i + 1}
                  </span>
                  <span className="col-span-10">
                    <span
                      className={`block text-[26px] md:text-[30px] font-medium tracking-[-0.025em] leading-tight transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        active === i ? 'translate-x-1 text-ink' : 'text-ink/55'
                      }`}
                    >
                      {s.title}
                    </span>
                    <span className="mt-2 block max-w-md text-muted leading-relaxed">{s.summary}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>

          <div className="hidden lg:block lg:col-span-5">
            <div className="sticky top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <Graphic />
                </motion.div>
              </AnimatePresence>
              <p className="mt-4 text-[13px] text-muted">{SERVICES[active].title}: how it works</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Process                                                                     */
/* -------------------------------------------------------------------------- */

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.6'] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="py-24 md:py-32 bg-paper-2">
      <div className="container-x grid grid-cols-1 gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <Eyebrow index="03">How it works</Eyebrow>
            <Lines className="h-section mt-8" lines={['Live in three weeks.', <span className="text-muted">Better every week after.</span>]} />
            <Reveal delay={0.2} className="mt-8 max-w-sm">
              <p className="text-muted leading-relaxed">
                No six-week strategy phase. We get the basics right fast, then improve from real data.
              </p>
            </Reveal>
          </div>
        </div>

        <div ref={ref} className="relative md:col-span-6 md:col-start-7">
          <div className="absolute left-0 top-2 bottom-2 w-px bg-line" aria-hidden="true" />
          <motion.div
            style={{ scaleY }}
            className="absolute left-0 top-2 bottom-2 w-px origin-top bg-ink"
            aria-hidden="true"
          />
          <ol className="space-y-16 md:space-y-24">
            {STEPS.map((step, i) => (
              <Reveal as="li" key={step.title} className="relative pl-10 md:pl-14">
                <span className="absolute left-[-5px] top-[7px] h-[11px] w-[11px] rounded-full border border-ink bg-paper-2" />
                <p className="font-mono text-[13px] text-muted">{step.when}</p>
                <h3 className="mt-3 text-[28px] md:text-[36px] font-medium tracking-[-0.03em] leading-tight">
                  <span className="text-faint mr-3">{i + 1}.</span>
                  {step.title}
                </h3>
                <p className="mt-4 max-w-md text-ink-2 leading-relaxed">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Principles                                                                  */
/* -------------------------------------------------------------------------- */

function Principles() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <Eyebrow index="04">How we work</Eyebrow>
          </div>
          <Lines className="h-section md:col-span-9" lines={['A few things we', 'won’t compromise on.']} />
        </div>

        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-9 md:col-start-4 grid grid-cols-1 sm:grid-cols-2 gap-x-12">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 0.1} className="border-t border-line py-8">
                <h3 className="text-[20px] font-medium tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-3 text-muted leading-relaxed">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* FAQ                                                                         */
/* -------------------------------------------------------------------------- */

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 md:py-32 border-t border-line">
      <div className="container-x grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-3">
          <Eyebrow index="05">Questions</Eyebrow>
        </div>
        <div className="md:col-span-9">
          <Lines className="h-section" lines={['Things people ask', 'on the first call.']} />
          <ul className="mt-14 border-t border-line">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal as="li" key={f.q} delay={i * 0.04} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="text-[19px] md:text-[22px] font-medium tracking-[-0.02em]">{f.q}</span>
                    <span className="relative h-4 w-4 shrink-0" aria-hidden="true">
                      <span className="absolute left-0 top-1/2 h-px w-4 bg-ink" />
                      <span
                        className={`absolute left-1/2 top-0 h-4 w-px bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isOpen ? 'scale-y-0' : 'scale-y-100'
                        }`}
                      />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 text-muted leading-relaxed">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Page>
      <PageMetadata
        title="Lean System | Real Estate Lead Generation in Hyderabad"
        description="Lean System runs Google and Meta ads, builds project landing pages and sets up lead tracking for real estate developers in Hyderabad, so every enquiry gets followed up."
      />
      <Hero />
      <Statement />
      <Services />
      <Process />
      <Principles />
      <FAQ />
    </Page>
  );
}
