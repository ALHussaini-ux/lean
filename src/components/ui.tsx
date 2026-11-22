import React from 'react';
import { Link } from 'react-router-dom';

/* The LEAN wordmark, redrawn as vector from the brand kit so it's instant and crisp. */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center select-none ${className}`}>
      <svg viewBox="0 187 1043 244" className="h-[17px] w-auto" role="img" aria-label="Lean System">
        <g fill="currentColor">
          <path d="M8 187h78v175h121v68H8z" />
          <path d="M249 187h204v58H328v35h110v56H328v36h129v58H249z" />
          <path d="M593 187h63l105 243h-83l-54-126-54 126h-83z" />
          <path d="M795 187h66l94 113V187h80v243h-67l-94-112v112h-79z" />
        </g>
      </svg>
    </span>
  );
}

export function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M3 8h10m0 0L8.5 3.5M13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type ButtonVariant = 'solid' | 'outline' | 'light';

const base =
  'group relative inline-flex items-center justify-center gap-2.5 rounded-full h-12 px-6 text-[15px] font-medium tracking-[-0.01em] overflow-hidden transition-colors duration-300 whitespace-nowrap';

const variants: Record<ButtonVariant, string> = {
  solid: 'bg-ink text-paper hover:bg-accent',
  outline: 'border border-ink/15 text-ink hover:border-ink',
  light: 'bg-paper text-ink hover:bg-accent hover:text-paper',
};

interface ButtonProps {
  to?: string;
  href?: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  arrow?: boolean;
  disabled?: boolean;
}

/** Pill button whose arrow slides through on hover. */
export function Button({ to, href, children, variant = 'solid', className = '', type = 'button', onClick, arrow = true, disabled }: ButtonProps) {
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <span className="relative h-4 w-4 overflow-hidden">
          <ArrowIcon className="absolute inset-0 h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-5" />
          <ArrowIcon className="absolute inset-0 h-4 w-4 -translate-x-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
        </span>
      )}
    </>
  );
  const cls = `${base} ${variants[variant]} ${className}`;
  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  if (href) return <a href={href} className={cls} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{inner}</a>;
  return <button type={type} onClick={onClick} className={`${cls} disabled:opacity-50`} disabled={disabled}>{inner}</button>;
}

/** Small section label: "01 — Services" */
export function Eyebrow({ index, children, className = '' }: { index?: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      {index && <span className="text-ink">{index}</span>}
      {index && <span className="h-px w-6 bg-line" aria-hidden="true" />}
      <span>{children}</span>
    </p>
  );
}
