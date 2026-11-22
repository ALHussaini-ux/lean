import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import PageMetadata from '../components/PageMetadata';
import { Button, Eyebrow } from '../components/ui';
import { Lines, Page, Reveal, scrollToTarget, useLenis } from '../lib/motion';
import { SERVICES, Service } from '../data';

function ServiceBlock({ s, i, onActive }: { s: Service; i: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: '-45% 0px -50% 0px' });
  useEffect(() => {
    if (inView) onActive(i);
  }, [inView, i, onActive]);

  return (
    <section ref={ref} id={s.slug} className="scroll-mt-28 border-t border-line pt-10 pb-20 md:pb-28">
      <p className="font-mono text-[13px] text-muted">0{i + 1}</p>
      <Lines className="mt-4 text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.03em]" lines={[s.title]} />
      <Reveal className="mt-6">
        <p className="lede max-w-2xl">{s.summary}</p>
      </Reveal>
      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal delay={0.05}>
          <p className="text-ink-2 leading-relaxed">{s.detail}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow mb-4">Included</p>
          <ul className="border-t border-line">
            {s.includes.map((item) => (
              <li key={item} className="flex gap-4 border-b border-line py-3.5 text-[15px] text-ink-2">
                <span className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-accent" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export default function Services() {
  const [active, setActive] = useState(0);
  const lenis = useLenis();

  return (
    <Page>
      <PageMetadata
        title="Services | Lean System"
        description="Google and Meta ads, project landing pages, lead tracking and weekly reporting for real estate developers in Hyderabad."
      />

      <section className="container-x pt-36 md:pt-44 pb-20 md:pb-28">
        <Eyebrow>Services</Eyebrow>
        <Lines
          as="h1"
          immediate
          delay={0.1}
          className="display mt-8 text-[clamp(2.75rem,7.5vw,6.5rem)]"
          lines={['Everything between', 'the ad and the visit.']}
        />
        <Reveal delay={0.4} className="mt-10 max-w-xl">
          <p className="lede">
            Most projects need all four. If you already have a good website or a CRM your team likes, we’ll work with
            it instead of replacing it.
          </p>
        </Reveal>
      </section>

      <div className="container-x grid grid-cols-1 gap-10 md:grid-cols-12 pb-12">
        <aside className="hidden md:block md:col-span-3">
          <nav className="sticky top-32" aria-label="Services">
            <ul className="space-y-3">
              {SERVICES.map((s, i) => (
                <li key={s.slug}>
                  <a
                    href={`#${s.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToTarget(lenis, s.slug);
                    }}
                    className={`flex items-center gap-3 text-[15px] transition-colors duration-300 ${
                      active === i ? 'text-ink' : 'text-faint hover:text-muted'
                    }`}
                  >
                    <span
                      className={`h-px bg-current transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        active === i ? 'w-8' : 'w-3'
                      }`}
                    />
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <div className="md:col-span-9">
          {SERVICES.map((s, i) => (
            <ServiceBlock key={s.slug} s={s} i={i} onActive={setActive} />
          ))}
        </div>
      </div>

      <section className="border-t border-line bg-paper-2">
        <div className="container-x grid grid-cols-1 gap-10 py-20 md:py-28 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Lines
              className="h-section"
              lines={['Not sure what you need?', <span className="text-muted">Start with a 30-minute call.</span>]}
            />
          </div>
          <Reveal className="md:col-span-4 md:flex md:justify-end">
            <Button to="/contact">Book a call</Button>
          </Reveal>
        </div>
      </section>
    </Page>
  );
}
