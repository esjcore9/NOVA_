import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';
import './GlassCard.css';

export interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  variant?: 'default' | 'surface' | 'glow' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className,
  ...props
}) => {
  return (
    <motion.div
      className={clsx(
        'nova-card',
        `nova-card--${variant}`,
        `nova-card--p-${padding}`,
        className
      )}
      {...props}
    >
      <div className="nova-card__inner">
        {children}
      </div>
    </motion.div>
  );
};
