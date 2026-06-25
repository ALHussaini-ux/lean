import React from 'react';
import { ArrowRight } from 'lucide-react';

interface AramcoButtonProps {
  id?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  children: React.ReactNode;
  variant?: 'white' | 'orange' | 'dark' | 'outline' | 'full-orange';
  className?: string;
}

export default function AramcoButton({
  id,
  onClick,
  type = 'button',
  children,
  variant = 'orange',
  className = ''
}: AramcoButtonProps) {
  // Base classes - clean flex alignment, responsive cursor pointers, letter spacing
  const baseClasses = "group inline-flex items-center justify-between gap-4 font-sans font-medium text-sm md:text-base tracking-wide transition-all duration-300 cursor-pointer select-none text-left outline-none";

  // Default color schema inspired by Aramco design language
  let textColor = "text-white";
  let circleBorderColor = "border-white/40 group-hover:border-white";
  let arrowColor = "text-white";
  let hoverCircleBg = "group-hover:bg-white/10";

  if (variant === 'orange') {
    textColor = "text-white";
    circleBorderColor = "border-brand-orange/50 group-hover:border-brand-orange";
    arrowColor = "text-brand-orange";
    hoverCircleBg = "group-hover:bg-brand-orange/10";
  } else if (variant === 'full-orange') {
    textColor = "text-white";
    circleBorderColor = "border-brand-orange group-hover:border-white";
    arrowColor = "text-white";
    hoverCircleBg = "bg-brand-orange group-hover:bg-opacity-90";
  } else if (variant === 'dark') {
    textColor = "text-brand-dark font-semibold";
    circleBorderColor = "border-brand-dark/30 group-hover:border-brand-dark";
    arrowColor = "text-brand-dark";
    hoverCircleBg = "group-hover:bg-brand-dark/5";
  } else if (variant === 'outline') {
    textColor = "text-neutral-300 group-hover:text-white";
    circleBorderColor = "border-neutral-700 group-hover:border-white";
    arrowColor = "text-neutral-300 group-hover:text-white";
    hoverCircleBg = "group-hover:bg-white/10";
  } else if (variant === 'white') {
    // Exact copy of Aramco screenshot button (thin white circle, thin white arrow, white text)
    textColor = "text-white";
    circleBorderColor = "border-white";
    arrowColor = "text-white";
    hoverCircleBg = "group-hover:bg-white/10";
  }

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${className}`}
    >
      <span className={`${textColor} transition-colors duration-300 font-sans tracking-wide`}>
        {children}
      </span>
      <div 
        className={`w-10 h-10 md:w-12 md:h-12 rounded-full border ${circleBorderColor} flex items-center justify-center shrink-0 transition-all duration-300 ${hoverCircleBg}`}
      >
        <ArrowRight 
          className={`w-4.5 h-4.5 md:w-5 md:h-5 ${arrowColor} transition-transform duration-300 group-hover:translate-x-1`} 
        />
      </div>
    </button>
  );
}
