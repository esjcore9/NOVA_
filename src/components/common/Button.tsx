import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';
import './Button.css';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'glass' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  glow?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  children,
  glow = false,
  className,
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={clsx(
        'nova-btn',
        `nova-btn--${variant}`,
        `nova-btn--${size}`,
        glow && 'nova-btn--glow',
        className
      )}
      {...props}
    >
      {leftIcon && <span className="nova-btn__icon nova-btn__icon--left">{leftIcon}</span>}
      <span className="nova-btn__text">{children}</span>
      {rightIcon && <span className="nova-btn__icon nova-btn__icon--right">{rightIcon}</span>}
    </motion.button>
  );
};
