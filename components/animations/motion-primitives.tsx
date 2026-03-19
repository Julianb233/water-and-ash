'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ReactNode, useRef } from 'react';

// ─── Reduced Motion Hook ──────────────────────────────────────────
// Wraps framer-motion's useReducedMotion for consistent use across components
export { useReducedMotion } from 'motion/react';

// ─── Fade In (scroll-triggered) ───────────────────────────────────
interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  className,
  direction = 'up',
}: FadeInProps) {
  const prefersReduced = useReducedMotion();

  const directionOffset = {
    up: { x: 0, y: 30 },
    down: { x: 0, y: -30 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
    none: { x: 0, y: 0 },
  };

  const offset = directionOffset[direction];

  return (
    <motion.div
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: prefersReduced ? 0.2 : duration,
        delay: prefersReduced ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger Container ────────────────────────────────────────────
interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.12,
  className,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger Item ─────────────────────────────────────────────────
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: prefersReduced ? 0.15 : 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Scale In ─────────────────────────────────────────────────────
interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function ScaleIn({ children, delay = 0, className }: ScaleInProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: prefersReduced ? 0.15 : 0.6,
        delay: prefersReduced ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Parallax Section (scroll-linked movement) ───────────────────
interface ParallaxProps {
  children: ReactNode;
  speed?: number; // negative = slower, positive = faster
  className?: string;
}

export function Parallax({ children, speed = -0.15, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : speed * 200]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Animated Button Wrapper ─────────────────────────────────────
interface AnimatedButtonProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedButton({ children, className }: AnimatedButtonProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Wave Divider (SVG section separator) ─────────────────────────
interface WaveDividerProps {
  className?: string;
  fill?: string;
  flip?: boolean;
  variant?: 'gentle' | 'dramatic' | 'double';
}

export function WaveDivider({
  className = '',
  fill = 'currentColor',
  flip = false,
  variant = 'gentle',
}: WaveDividerProps) {
  const prefersReduced = useReducedMotion();

  const paths = {
    gentle:
      'M0,64 C320,120 640,20 960,80 C1280,140 1440,40 1440,40 L1440,0 L0,0 Z',
    dramatic:
      'M0,96 C240,160 480,0 720,96 C960,192 1200,32 1440,96 L1440,0 L0,0 Z',
    double:
      'M0,64 C180,110 360,30 540,80 C720,130 900,20 1080,70 C1260,120 1440,50 1440,50 L1440,0 L0,0 Z',
  };

  return (
    <div
      className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''} ${className}`}
      aria-hidden="true"
    >
      <motion.svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="relative block w-full h-[60px] sm:h-[80px] md:h-[100px]"
        initial={prefersReduced ? {} : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.path
          d={paths[variant]}
          fill={fill}
          initial={prefersReduced ? {} : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: prefersReduced ? 0 : 1.2,
            ease: 'easeInOut',
          }}
        />
      </motion.svg>
    </div>
  );
}

// ─── Counter Animation ────────────────────────────────────────────
interface CountUpProps {
  value: string;
  className?: string;
}

export function CountUp({ value, className }: CountUpProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.span
      initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={className}
    >
      {value}
    </motion.span>
  );
}

// ─── Float Animation (subtle continuous motion) ──────────────────
interface FloatProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
}

export function Float({
  children,
  className,
  amplitude = 8,
  duration = 4,
}: FloatProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      animate={{ y: [-amplitude, amplitude, -amplitude] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
