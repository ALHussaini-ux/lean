import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import PageMetadata from '../components/PageMetadata';
import { PAGES } from '../seo';
import { ArrowIcon, Button, Wordmark } from '../components/ui';
import { EASE, Lines, Page } from '../lib/motion';

/**
 * /hello — the page behind the QR code on the business card. Not indexed.
 */
const EMAIL = 'hello@leansystem.co';
// TODO: replace with the real number before printing more cards.
const PHONE = '+91 98765 43210';

function CopyRow({ label, value, href }: { label: string; value: string; href: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line py-5">
      <div>
        <p className="eyebrow">{label}</p>
        <a href={href} className="mt-1 block text-[18px] link-underline">{value}</a>
      </div>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard?.writeText(value).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          });
        }}
        className="shrink-0 rounded-full border border-line px-4 py-2 text-[13px] text-muted transition-colors hover:border-ink hover:text-ink"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

export default function Hello() {
  return (
    <Page>
      <PageMetadata meta={PAGES.hello} />
      <section className="container-x pt-32 md:pt-40 pb-24">
        <div className="mx-auto max-w-[560px]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex items-center justify-between"
          >
            <Wordmark />
            <span className="eyebrow">Business card</span>
          </motion.div>

          <Lines
            as="h1"
            immediate
            delay={0.15}
            className="display mt-14 text-[clamp(2.75rem,10vw,4.5rem)]"
            lines={['Good to meet you.', <span className="text-muted">Here’s how to reach us.</span>]}
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
          >
            <p className="lede mt-8">
              Lean System helps real estate developers get more site visits from their marketing: ads that reach
              real buyers, a fast page for each project, and a simple way to make sure every enquiry gets a call back.
            </p>

            <div className="mt-10 border-t border-line">
              <CopyRow label="Email" value={EMAIL} href={`mailto:${EMAIL}?subject=Hello%20from%20your%20card`} />
              <CopyRow label="Phone" value={PHONE} href={`tel:${PHONE.replace(/\s+/g, '')}`} />
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href={`tel:${PHONE.replace(/\s+/g, '')}`} className="sm:flex-1">Call us</Button>
              <Button to="/" variant="outline" arrow={false} className="sm:flex-1">
                Visit the website
              </Button>
            </div>

            <Link to="/services" className="mt-10 inline-flex items-center gap-2 text-[14px] text-muted hover:text-ink">
              What we do <ArrowIcon className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Page>
  );
}
