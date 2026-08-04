import React, { SVGProps } from 'react';
import { motion } from 'motion/react';

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  size?: number | string;
  className?: string;
  strokeWidth?: number | string;
}

// Helper base props generator
const getBaseProps = (size: number | string = 24, strokeWidth: number | string = 1.75, className = '') => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: Number(strokeWidth),
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: `inline-block shrink-0 align-middle ${className}`,
});

// Transition presets matching ItsHover motion design
const subtleSpring = { type: 'spring', stiffness: 400, damping: 25 };
const smoothEase = { duration: 0.25, ease: [0.16, 1, 0.3, 1] };

/**
 * ArrowRight - ItsHover style
 * Smooth path extension + tip slide on hover
 */
export const ArrowRight: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <motion.path
      d="M5 12h14"
      variants={{
        initial: { d: 'M5 12h14' },
        hover: { d: 'M4 12h16' },
      }}
      transition={smoothEase}
    />
    <motion.path
      d="M12 5l7 7-7 7"
      variants={{
        initial: { x: 0 },
        hover: { x: 2.5 },
      }}
      transition={subtleSpring}
    />
  </motion.svg>
);

/**
 * ArrowLeft - ItsHover style
 */
export const ArrowLeft: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <motion.path
      d="M19 12H5"
      variants={{
        initial: { d: 'M19 12H5' },
        hover: { d: 'M20 12H4' },
      }}
      transition={smoothEase}
    />
    <motion.path
      d="M12 19l-7-7 7-7"
      variants={{
        initial: { x: 0 },
        hover: { x: -2.5 },
      }}
      transition={subtleSpring}
    />
  </motion.svg>
);

/**
 * ArrowUpRight / ExternalLink - ItsHover style
 */
export const ExternalLink: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <motion.path
      d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
    />
    <motion.path
      d="M15 3h6v6"
      variants={{
        initial: { x: 0, y: 0 },
        hover: { x: 2, y: -2 },
      }}
      transition={subtleSpring}
    />
    <motion.path
      d="M10 14L21 3"
      variants={{
        initial: { x: 0, y: 0 },
        hover: { x: 2, y: -2 },
      }}
      transition={subtleSpring}
    />
  </motion.svg>
);

/**
 * Check - ItsHover style
 */
export const Check: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <motion.polyline
      points="20 6 9 17 4 12"
      variants={{
        initial: { scale: 1 },
        hover: { scale: 1.1 },
      }}
      transition={subtleSpring}
    />
  </motion.svg>
);

/**
 * CheckCircle / CheckCircle2 - ItsHover style
 */
export const CheckCircle: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <circle cx="12" cy="12" r="10" />
    <motion.path
      d="m9 12 2 2 4-4"
      variants={{
        initial: { scale: 1 },
        hover: { scale: 1.18 },
      }}
      transition={subtleSpring}
    />
  </motion.svg>
);

export const CheckCircle2 = CheckCircle;

/**
 * Sparkles - ItsHover style
 */
export const Sparkles: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <motion.path
      d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"
      variants={{
        initial: { scale: 1, rotate: 0 },
        hover: { scale: 1.12, rotate: 12 },
      }}
      transition={subtleSpring}
    />
    <motion.path
      d="M5 3v4M3 5h4"
      variants={{
        initial: { opacity: 0.7, scale: 0.9 },
        hover: { opacity: 1, scale: 1.1 },
      }}
      transition={subtleSpring}
    />
  </motion.svg>
);

/**
 * Zap - ItsHover style
 */
export const Zap: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <motion.polygon
      points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"
      variants={{
        initial: { scale: 1, y: 0 },
        hover: { scale: 1.1, y: -1 },
      }}
      transition={subtleSpring}
    />
  </motion.svg>
);

/**
 * Target - ItsHover style
 */
export const Target: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <motion.circle
      cx="12"
      cy="12"
      r="2"
      variants={{
        initial: { scale: 1 },
        hover: { scale: 1.4 },
      }}
      transition={subtleSpring}
    />
  </motion.svg>
);

/**
 * Rocket - ItsHover style
 */
export const Rocket: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <motion.path
      d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
    />
    <motion.path
      d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"
      variants={{
        initial: { x: 0, y: 0 },
        hover: { x: 2, y: -2 },
      }}
      transition={subtleSpring}
    />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </motion.svg>
);

/**
 * TrendingUp - ItsHover style
 */
export const TrendingUp: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <motion.polyline
      points="22 7 13.5 15.5 8.5 10.5 2 17"
      variants={{
        initial: { y: 0 },
        hover: { y: -1 },
      }}
      transition={subtleSpring}
    />
    <motion.polyline
      points="16 7 22 7 22 13"
      variants={{
        initial: { x: 0, y: 0 },
        hover: { x: 2, y: -2 },
      }}
      transition={subtleSpring}
    />
  </motion.svg>
);

/**
 * BarChart3 / LineChart - ItsHover style
 */
export const BarChart3: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <path d="M3 3v18h18" />
    <motion.path
      d="M18 17V9"
      variants={{ initial: { scaleY: 1 }, hover: { scaleY: 1.15 } }}
      transition={subtleSpring}
    />
    <motion.path
      d="M13 17V5"
      variants={{ initial: { scaleY: 1 }, hover: { scaleY: 1.2 } }}
      transition={subtleSpring}
    />
    <motion.path
      d="M8 17v-3"
      variants={{ initial: { scaleY: 1 }, hover: { scaleY: 1.25 } }}
      transition={subtleSpring}
    />
  </motion.svg>
);

export const LineChart: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <path d="M3 3v18h18" />
    <motion.path
      d="m19 9-5 5-4-4-3 3"
      variants={{
        initial: { pathLength: 1, y: 0 },
        hover: { y: -1.5 },
      }}
      transition={subtleSpring}
    />
  </motion.svg>
);

/**
 * MessageSquare - ItsHover style
 */
export const MessageSquare: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <motion.path
      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      variants={{
        initial: { scale: 1, rotate: 0 },
        hover: { scale: 1.08, rotate: -4 },
      }}
      transition={subtleSpring}
    />
  </motion.svg>
);

/**
 * Database - ItsHover style
 */
export const Database: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <motion.path
      d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"
      variants={{
        initial: { y: 0 },
        hover: { y: -1 },
      }}
      transition={subtleSpring}
    />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </motion.svg>
);

/**
 * Server - ItsHover style
 */
export const Server: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <motion.rect
      x="2"
      y="2"
      width="20"
      height="8"
      rx="2"
      ry="2"
      variants={{ initial: { y: 0 }, hover: { y: -1 } }}
      transition={subtleSpring}
    />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </motion.svg>
);

/**
 * Layers - ItsHover style
 */
export const Layers: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <motion.polygon
      points="12 2 2 7 12 12 22 7 12 2"
      variants={{
        initial: { y: 0 },
        hover: { y: -2 },
      }}
      transition={subtleSpring}
    />
    <polyline points="2 12 12 17 22 12" />
    <polyline points="2 17 12 22 22 17" />
  </motion.svg>
);

/**
 * Cpu - ItsHover style
 */
export const Cpu: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <motion.rect
      x="9"
      y="9"
      width="6"
      height="6"
      variants={{
        initial: { scale: 1 },
        hover: { scale: 1.15 },
      }}
      transition={subtleSpring}
    />
    <path d="M15 2v2M9 2v2M15 20v2M9 20v2M20 15h2M20 9h2M2 15h2M2 9h2" />
  </motion.svg>
);

/**
 * Phone - ItsHover style
 */
export const Phone: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <motion.path
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
      variants={{
        initial: { rotate: 0 },
        hover: { rotate: [0, -10, 10, -5, 0] },
      }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    />
  </motion.svg>
);

/**
 * Mail - ItsHover style
 */
export const Mail: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <motion.path
      d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
      variants={{
        initial: { y: 0 },
        hover: { y: -1.5 },
      }}
      transition={subtleSpring}
    />
  </motion.svg>
);

/**
 * MapPin - ItsHover style
 */
export const MapPin: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <motion.path
      d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
      variants={{
        initial: { y: 0 },
        hover: { y: -2.5 },
      }}
      transition={subtleSpring}
    />
    <circle cx="12" cy="10" r="3" />
  </motion.svg>
);

/**
 * Calendar - ItsHover style
 */
export const Calendar: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <rect width="18" height="18" x="3" y="4" rx="2" id="calendar-body" />
    <motion.path
      d="M16 2v4M8 2v4M3 10h18"
      variants={{
        initial: { y: 0 },
        hover: { y: -1 },
      }}
      transition={subtleSpring}
    />
  </motion.svg>
);

/**
 * Clock - ItsHover style
 */
export const Clock: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <circle cx="12" cy="12" r="10" />
    <motion.polyline
      points="12 6 12 12 16 14"
      variants={{
        initial: { rotate: 0 },
        hover: { rotate: 45 },
      }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{ originX: '12px', originY: '12px' }}
    />
  </motion.svg>
);

/**
 * Users / User - ItsHover style
 */
export const Users: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <motion.path
      d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
      variants={{
        initial: { x: 0 },
        hover: { x: 1.5 },
      }}
      transition={subtleSpring}
    />
  </motion.svg>
);

export const User: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <motion.circle
      cx="12"
      cy="7"
      r="4"
      variants={{
        initial: { y: 0 },
        hover: { y: -1.5 },
      }}
      transition={subtleSpring}
    />
  </motion.svg>
);

/**
 * Shield / ShieldCheck / ShieldAlert - ItsHover style
 */
export const Shield: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <motion.path
      d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
      variants={{
        initial: { scale: 1 },
        hover: { scale: 1.06 },
      }}
      transition={subtleSpring}
    />
  </motion.svg>
);

export const ShieldCheck: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <motion.path
      d="m9 12 2 2 4-4"
      variants={{
        initial: { scale: 1 },
        hover: { scale: 1.18 },
      }}
      transition={subtleSpring}
    />
  </motion.svg>
);

export const ShieldAlert: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </motion.svg>
);

/**
 * Lock - ItsHover style
 */
export const Lock: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <motion.path
      d="M7 11V7a5 5 0 0 1 10 0v4"
      variants={{
        initial: { y: 0 },
        hover: { y: -2 },
      }}
      transition={subtleSpring}
    />
  </motion.svg>
);

/**
 * Smartphone / AppWindow / Globe / MousePointer - ItsHover style
 */
export const Smartphone: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <motion.rect
      width="14"
      height="20"
      x="5"
      y="2"
      rx="2"
      ry="2"
      variants={{ initial: { y: 0 }, hover: { y: -1.5 } }}
      transition={subtleSpring}
    />
    <path d="M12 18h.01" />
  </motion.svg>
);

export const AppWindow: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <motion.path
      d="M10 4v16"
      variants={{ initial: { opacity: 0.5 }, hover: { opacity: 1 } }}
    />
    <circle cx="5" cy="8" r="1" />
    <circle cx="5" cy="12" r="1" />
  </motion.svg>
);

export const Globe: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <motion.circle
      cx="12"
      cy="12"
      r="10"
      variants={{ initial: { rotate: 0 }, hover: { rotate: 20 } }}
      transition={subtleSpring}
    />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
  </motion.svg>
);

export const MousePointer: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <motion.path
      d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"
      variants={{ initial: { x: 0, y: 0 }, hover: { x: 2, y: 2 } }}
      transition={subtleSpring}
    />
    <path d="m13 13 6 6" />
  </motion.svg>
);

/**
 * FileText / BookOpen / Share2 / Copy / HelpCircle / Info / Eye - ItsHover style
 */
export const FileText: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a1 1 0 0 0 1 1h4" />
    <motion.path
      d="M10 9H8M16 13H8M16 17H8"
      variants={{ initial: { x: 0 }, hover: { x: 1.5 } }}
      transition={subtleSpring}
    />
  </motion.svg>
);

export const BookOpen: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <motion.path
      d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
      variants={{ initial: { rotateY: 0 }, hover: { rotateY: -15 } }}
      transition={subtleSpring}
    />
  </motion.svg>
);

export const Share2: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" x2="15.42" y1="10.51" y2="6.49" />
    <line x1="8.59" x2="15.42" y1="13.49" y2="17.51" />
  </motion.svg>
);

export const Copy: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <motion.path
      d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
      variants={{ initial: { x: 0, y: 0 }, hover: { x: -1.5, y: -1.5 } }}
      transition={subtleSpring}
    />
  </motion.svg>
);

export const HelpCircle: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <circle cx="12" cy="12" r="10" />
    <motion.path
      d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
      variants={{ initial: { y: 0 }, hover: { y: -1 } }}
    />
    <line x1="12" x2="12.01" y1="17" y2="17" />
  </motion.svg>
);

export const Info: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="16" y2="12" />
    <line x1="12" x2="12.01" y1="8" y2="8" />
  </motion.svg>
);

export const Eye: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <motion.circle
      cx="12"
      cy="12"
      r="3"
      variants={{ initial: { scale: 1 }, hover: { scale: 1.25 } }}
      transition={subtleSpring}
    />
  </motion.svg>
);

/**
 * Menu / X / Plus / Minus / Chevrons
 */
export const Menu: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <line x1="4" x2="20" y1="6" y2="6" />
    <motion.line
      x1="4"
      x2="20"
      y1="12"
      y2="12"
      variants={{ initial: { scaleX: 1 }, hover: { scaleX: 0.8 } }}
      transition={subtleSpring}
    />
    <line x1="4" x2="20" y1="18" y2="18" />
  </motion.svg>
);

export const X: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <motion.g
      variants={{ initial: { rotate: 0 }, hover: { rotate: 90 } }}
      transition={subtleSpring}
      style={{ originX: '12px', originY: '12px' }}
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </motion.g>
  </motion.svg>
);

export const Plus: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <motion.path
      d="M5 12h14M12 5v14"
      variants={{ initial: { scale: 1 }, hover: { scale: 1.15 } }}
      transition={subtleSpring}
    />
  </motion.svg>
);

export const Minus: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <motion.path
      d="M5 12h14"
      variants={{ initial: { scale: 1 }, hover: { scale: 1.15 } }}
      transition={subtleSpring}
    />
  </motion.svg>
);

export const ChevronDown: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <motion.path
      d="m6 9 6 6 6-6"
      variants={{ initial: { y: 0 }, hover: { y: 2 } }}
      transition={subtleSpring}
    />
  </motion.svg>
);

export const ChevronUp: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <motion.path
      d="m18 15-6-6-6 6"
      variants={{ initial: { y: 0 }, hover: { y: -2 } }}
      transition={subtleSpring}
    />
  </motion.svg>
);

export const ChevronRight: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <motion.path
      d="m9 18 6-6-6-6"
      variants={{ initial: { x: 0 }, hover: { x: 2 } }}
      transition={subtleSpring}
    />
  </motion.svg>
);

/**
 * Bot / RefreshCw / Building2 / Briefcase / Settings / AlertTriangle
 */
export const Bot: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <rect width="18" height="12" x="3" y="8" rx="2" />
    <path d="M12 2v6" />
    <motion.circle
      cx="12"
      cy="2"
      r="1"
      variants={{ initial: { scale: 1 }, hover: { scale: 1.5 } }}
    />
    <circle cx="8" cy="14" r="1" />
    <circle cx="16" cy="14" r="1" />
  </motion.svg>
);

export const RefreshCw: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <motion.path
      d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"
      variants={{ initial: { rotate: 0 }, hover: { rotate: 180 } }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      style={{ originX: '12px', originY: '12px' }}
    />
  </motion.svg>
);

export const Building2: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
    <path d="M6 12H4a2 2 0 0 0-2 2v8h20v-8a2 2 0 0 0-2-2h-2" />
    <motion.path
      d="M10 6h4M10 10h4M10 14h4M10 18h4"
      variants={{ initial: { opacity: 0.7 }, hover: { opacity: 1 } }}
    />
  </motion.svg>
);

export const Briefcase: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
    <motion.path
      d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
      variants={{ initial: { y: 0 }, hover: { y: -1 } }}
    />
  </motion.svg>
);

export const Settings: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <motion.path
      d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
      variants={{ initial: { rotate: 0 }, hover: { rotate: 60 } }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      style={{ originX: '12px', originY: '12px' }}
    />
    <circle cx="12" cy="12" r="3" />
  </motion.svg>
);

export const AlertTriangle: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" x2="12" y1="9" y2="13" />
    <line x1="12" x2="12.01" y1="17" y2="17" />
  </motion.svg>
);

export const Activity: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.75, className = '', ...props }) => (
  <motion.svg
    {...getBaseProps(size, strokeWidth, className)}
    initial="initial"
    whileHover="hover"
    {...(props as any)}
  >
    <motion.polyline
      points="22 12 18 12 15 21 9 3 6 12 2 12"
      variants={{ initial: { y: 0, scaleY: 1 }, hover: { y: -1, scaleY: 1.15 } }}
      transition={subtleSpring}
    />
  </motion.svg>
);
