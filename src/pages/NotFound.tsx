import PageMetadata from '../components/PageMetadata';
import { Button } from '../components/ui';
import { Lines, Page, Reveal } from '../lib/motion';

export default function NotFound() {
  return (
    <Page>
      <PageMetadata title="Page not found | Lean System" description="This page doesn't exist." noindex />
      <section className="container-x flex min-h-[80vh] flex-col justify-center pt-36 pb-24">
        <p className="eyebrow">404</p>
        <Lines
          as="h1"
          immediate
          className="display mt-6 text-[clamp(2.75rem,7.5vw,6.5rem)]"
          lines={['This page', <span className="text-muted">doesn’t exist.</span>]}
        />
        <Reveal delay={0.3} className="mt-10">
          <Button to="/">Back to home</Button>
        </Reveal>
      </section>
    </Page>
  );
}
