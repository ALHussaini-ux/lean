import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import PageMetadata from '../components/PageMetadata';
import { PAGES, postMeta } from '../seo';
import { ArrowIcon, Button, Eyebrow } from '../components/ui';
import { Lines, Page, Reveal } from '../lib/motion';
import { POSTS } from '../posts';
import NotFound from './NotFound';

export function BlogIndex() {
  return (
    <Page>
      <PageMetadata meta={PAGES.blog} />
      <section className="container-x pt-36 md:pt-44 pb-24 md:pb-32">
        <Eyebrow>Journal</Eyebrow>
        <Lines
          as="h1"
          immediate
          delay={0.1}
          className="display mt-8 text-[clamp(2.75rem,7.5vw,6.5rem)]"
          lines={['Notes from', 'the work.']}
        />
        <Reveal delay={0.4} className="mt-8 max-w-lg">
          <p className="lede">Practical things we’ve learned about selling property online. No fluff.</p>
        </Reveal>

        {POSTS.length === 0 ? (
          <Reveal delay={0.5} className="mt-20 md:mt-28 border-y border-line">
            <p className="py-10 md:py-12 text-[15px] text-muted">Nothing published yet.</p>
          </Reveal>
        ) : (
          <ul className="mt-20 md:mt-28 border-t border-line">
            {POSTS.map((post, i) => (
              <Reveal as="li" key={post.slug} delay={i * 0.06} className="border-b border-line">
                <Link to={`/blog/${post.slug}`} className="group grid grid-cols-12 gap-4 py-10 md:py-12">
                  <div className="col-span-12 md:col-span-3 flex gap-4 md:block font-mono text-[13px] text-muted">
                    <p>{post.date}</p>
                    <p className="md:mt-1">{post.category}</p>
                  </div>
                  <div className="col-span-12 md:col-span-8">
                    <h2 className="text-[26px] md:text-[34px] font-medium leading-[1.12] tracking-[-0.03em] transition-colors duration-300 group-hover:text-accent">
                      {post.title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-muted leading-relaxed">{post.summary}</p>
                  </div>
                  <div className="hidden md:flex md:col-span-1 justify-end pt-3">
                    <ArrowIcon className="h-5 w-5 -translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        )}
      </section>
    </Page>
  );
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = POSTS.find((p) => p.slug === slug);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  const [copied, setCopied] = useState(false);

  if (!post) return <NotFound />;

  const others = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  const share = async () => {
    const url = `https://www.leansystem.co/blog/${post.slug}`;
    try {
      if (navigator.share) await navigator.share({ title: post.title, url });
      else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      /* share cancelled */
    }
  };

  return (
    <Page>
      <PageMetadata meta={postMeta(post)} />
      <motion.div style={{ scaleX: progress }} className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-accent" aria-hidden="true" />

      <article className="container-x pt-36 md:pt-44 pb-24">
        <div className="mx-auto max-w-[720px]">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[14px] text-muted hover:text-ink transition-colors">
            <ArrowIcon className="h-4 w-4 rotate-180" /> Journal
          </Link>
          <p className="mt-10 font-mono text-[13px] text-muted">
            {post.category} · {post.date} · {post.readTime}
          </p>
          <Lines
            as="h1"
            immediate
            delay={0.1}
            className="mt-5 text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.035em]"
            lines={[post.title]}
          />
          <Reveal delay={0.3}>
            <p className="mt-8 text-[20px] leading-relaxed text-ink-2 border-l-2 border-accent pl-5">{post.summary}</p>
          </Reveal>

          <Reveal delay={0.4} className="article-body mt-14 border-t border-line pt-12">
            {post.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>

          <div className="mt-16 flex items-center justify-between border-t border-line pt-6 text-[14px]">
            <span className="text-muted">Lean System</span>
            <button type="button" onClick={share} className="text-muted hover:text-ink transition-colors">
              {copied ? 'Link copied' : 'Share'}
            </button>
          </div>

          <div className="mt-20 rounded-2xl bg-ink p-8 md:p-12 text-paper">
            <p className="text-[26px] md:text-[32px] font-medium leading-tight tracking-[-0.03em]">
              Want us to look at your current setup?
            </p>
            <p className="mt-3 text-faint">A 30-minute call. We’ll tell you honestly what we’d change.</p>
            <Button to="/contact" variant="light" className="mt-8">
              Book a call
            </Button>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="border-t border-line">
          <div className="container-x py-20">
            <p className="eyebrow mb-8">Keep reading</p>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              {others.map((p) => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="group block border-t border-line pt-6">
                  <p className="font-mono text-[13px] text-muted">{p.category}</p>
                  <p className="mt-3 text-[22px] font-medium leading-snug tracking-[-0.02em] transition-colors group-hover:text-accent">
                    {p.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Page>
  );
}
