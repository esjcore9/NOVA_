import React from 'react';
import clsx from 'clsx';
import './Container.css';

export interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'lg',
  className,
}) => {
  return (
    <div className={clsx('nova-container', `nova-container--${size}`, className)}>
      {children}
    </div>
  );
};
