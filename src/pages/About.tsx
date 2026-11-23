import PageMetadata from '../components/PageMetadata';
import { PAGES } from '../seo';
import { Button, Eyebrow } from '../components/ui';
import { Lines, Page, Reveal, ScrollText } from '../lib/motion';
import { PRINCIPLES } from '../data';

export default function About() {
  return (
    <Page>
      <PageMetadata meta={PAGES.about} />

      <section className="container-x pt-36 md:pt-44 pb-20 md:pb-32">
        <Eyebrow>About</Eyebrow>
        <Lines
          as="h1"
          immediate
          delay={0.1}
          className="display mt-8 text-[clamp(2.75rem,7.5vw,6.5rem)]"
          lines={['Ads, pages', <span className="text-muted">and follow-up.</span>]}
        />
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12">
          <Reveal delay={0.4} className="md:col-span-6 md:col-start-7">
            <p className="lede">
              Lean System runs ads on Google and Meta, builds the pages people land on, and sets up the tracking
              that makes sure every enquiry gets a reply. We keep the setup simple, report on what actually happened,
              and improve it every week.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line py-24 md:py-36">
        <div className="container-x grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <Eyebrow index="01">Why only real estate</Eyebrow>
          </div>
          <div className="md:col-span-9">
            <ScrollText
              className="text-[clamp(1.6rem,3.2vw,2.75rem)] font-medium leading-[1.15] tracking-[-0.03em]"
              text="Selling a flat isn’t like selling shoes. Buyers take months to decide, compare five projects, visit three, and talk to their family before they book. Marketing that works for a quick online purchase falls apart here."
            />
            <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12">
              <Reveal>
                <p className="text-muted leading-relaxed">
                  Focusing on one industry means we already know the questions buyers ask, which searches are worth
                  paying for in each micro-market, and where leads usually get lost between marketing and sales.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-muted leading-relaxed">
                  It also means we understand launch timelines, RERA details, channel partners and how a builder’s
                  sales team actually works day to day, so we fit into it instead of adding another tool nobody opens.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper py-24 md:py-32">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="eyebrow !text-faint flex items-center gap-3">
                <span className="text-paper">02</span>
                <span className="h-px w-6 bg-paper/20" aria-hidden="true" />
                <span>Principles</span>
              </p>
            </div>
            <Lines className="h-section md:col-span-9" lines={['What you can', 'hold us to.']} />
          </div>
          <ol className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-9 md:col-start-4">
              {PRINCIPLES.map((p, i) => (
                <Reveal as="li" key={p.title} className="grid grid-cols-12 gap-4 border-t border-paper/15 py-8 md:py-10">
                  <span className="col-span-2 font-mono text-[13px] text-faint pt-1.5">0{i + 1}</span>
                  <h3 className="col-span-10 md:col-span-4 text-[22px] md:text-[26px] font-medium tracking-[-0.025em] leading-tight">
                    {p.title}
                  </h3>
                  <p className="col-span-10 col-start-3 md:col-span-6 md:col-start-auto text-faint leading-relaxed">{p.body}</p>
                </Reveal>
              ))}
            </div>
          </ol>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Lines className="h-section" lines={['Good systems', 'make selling easier.']} />
            <Reveal delay={0.2} className="mt-6 max-w-md">
              <p className="text-muted leading-relaxed">
                If your next launch is coming up, or your current one could use more site visits, let’s talk it through.
              </p>
            </Reveal>
          </div>
          <Reveal className="md:col-span-4 md:flex md:justify-end">
            <Button to="/contact">Book a call</Button>
          </Reveal>
        </div>
      </section>
    </Page>
  );
}
