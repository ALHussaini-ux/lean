import PageMetadata from '../components/PageMetadata';
import ContactForm, { CONTACT_EMAIL } from '../components/ContactForm';
import { Eyebrow } from '../components/ui';
import { Lines, Page, Reveal } from '../lib/motion';

interface ContactProps {
  canonicalPath?: string;
  noindex?: boolean;
}

export default function Contact({ canonicalPath, noindex }: ContactProps) {
  return (
    <Page>
      <PageMetadata
        title="Contact | Lean System"
        description="Tell us about your real estate project. Book a 30-minute call or send an enquiry and we'll reply within one working day."
        canonicalPath={canonicalPath}
        noindex={noindex}
      />

      <section className="container-x pt-36 md:pt-44 pb-24 md:pb-32">
        <Eyebrow>Contact</Eyebrow>
        <Lines
          as="h1"
          immediate
          delay={0.1}
          className="display mt-8 text-[clamp(2.75rem,7.5vw,6.5rem)]"
          lines={['Tell us about', <>your next <span className="serif-accent text-accent">launch.</span></>]}
        />

        <div className="mt-16 md:mt-24 grid grid-cols-1 gap-16 md:grid-cols-12">
          <Reveal delay={0.3} className="md:col-span-4 space-y-10">
            <p className="lede">
              A short call is usually the quickest way to see if we’re a fit. We’ll look at your project, your current
              marketing, and tell you honestly what we’d change.
            </p>
            <div className="space-y-6 border-t border-line pt-8">
              <div>
                <p className="eyebrow">Email</p>
                <a href={`mailto:${CONTACT_EMAIL}`} className="mt-1 inline-block text-[18px] link-underline">
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div>
                <p className="eyebrow">Replies</p>
                <p className="mt-1 text-[18px]">Within one working day</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.45} className="md:col-span-7 md:col-start-6">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </Page>
  );
}
