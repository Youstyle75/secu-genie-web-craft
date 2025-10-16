import React, { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/**
 * Interactive Button with micro-interactions
 * Provides smooth scale and hover effects
 */
interface InteractiveButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'subtle';
}

export const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  variant = 'default',
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        'transition-all duration-200 ease-in-out cursor-pointer',
        variant === 'default' && 'hover:scale-[1.02] active:scale-[0.98]',
        variant === 'subtle' && 'hover:bg-secondary/50',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * Floating Card with hover lift effect
 */
export const FloatingCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'card transition-all duration-300 ease-in-out',
        'hover:shadow-xl hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * Pulse Badge for notifications and alerts
 */
export const PulseBadge: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <span className={cn('relative inline-flex', className)}>
      <span className="flex h-3 w-3 absolute -top-1 -right-1">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-danger"></span>
      </span>
      {children}
    </span>
  );
};

/**
 * Shimmer Loading Effect
 */
export const ShimmerLoader: React.FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <div
      className={cn(
        'animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent',
        'bg-[length:200%_100%]',
        className
      )}
    />
  );
};
