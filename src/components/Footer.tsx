import { Link } from 'react-router-dom';
import { ArrowIcon, Wordmark } from './ui';
import { Reveal } from '../lib/motion';

export default function Footer({ showCta = true }: { showCta?: boolean }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      <div className={`container-x pb-10 ${showCta ? 'pt-24 md:pt-32' : 'pt-16'}`}>
        {showCta && (
        <Reveal>
          <p className="eyebrow !text-faint">Have a project launching soon?</p>
          <Link
            to="/contact"
            className="group mt-5 inline-flex items-end gap-4 md:gap-6 text-[clamp(2.75rem,8vw,7rem)] font-medium leading-[0.95] tracking-[-0.045em]"
          >
            <span>
              Let&apos;s talk<span className="text-accent">.</span>
            </span>
            <ArrowIcon className="mb-[0.18em] h-[0.5em] w-[0.5em] -rotate-45 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-0" />
          </Link>
        </Reveal>
        )}

        <div className={`${showCta ? 'mt-20 md:mt-28 border-t border-paper/15 pt-10' : ''} grid grid-cols-2 gap-y-10 gap-x-6 md:grid-cols-12 text-[15px]`}>
          <div className="col-span-2 md:col-span-5">
            <Wordmark className="text-paper" />
            <p className="mt-4 max-w-xs text-faint leading-relaxed">
              Ads, landing pages and lead tracking for real estate developers in Hyderabad.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow !text-faint mb-4">Pages</p>
            <ul className="space-y-2">
              {[
                ['/services', 'Services'],
                ['/about', 'About'],
                ['/blog', 'Journal'],
                ['/contact', 'Contact'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="link-underline">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow !text-faint mb-4">Contact</p>
            <ul className="space-y-2">
              <li>
                <a href="mailto:hello@leansystem.co" className="link-underline">hello@leansystem.co</a>
              </li>
              <li className="text-faint">Hyderabad, Telangana</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 text-[13px] text-faint sm:flex-row sm:justify-between">
          <p>© {year} Lean System</p>
          <p>Built in Hyderabad</p>
        </div>
      </div>
    </footer>
  );
}
