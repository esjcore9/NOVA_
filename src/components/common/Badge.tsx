import React from 'react';
import clsx from 'clsx';
import './Badge.css';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'violet' | 'blue' | 'lavender' | 'outline' | 'subtle';
  dot?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'violet',
  dot = false,
  icon,
  className,
}) => {
  return (
    <span className={clsx('nova-badge', `nova-badge--${variant}`, className)}>
      {dot && <span className="nova-badge__dot" />}
      {icon && <span className="nova-badge__icon">{icon}</span>}
      <span className="nova-badge__text">{children}</span>
    </span>
  );
};
