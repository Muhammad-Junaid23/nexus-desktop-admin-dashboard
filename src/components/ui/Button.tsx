'use client';

import { cn } from '@/lib/utils';

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'default' | 'outline' | 'danger' | 'inactive' | 'active';
  className?: string;
  disabled?: boolean;
};

const baseStyles = 'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200';

const variantStyles = {
  default: 'bg-blue-600 text-white hover:bg-blue-700',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  inactive: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100',
  active: 'bg-blue-600 text-white border border-blue-600',
};

export default function Button({ children, onClick, type = 'button', variant = 'default', className = '', disabled = false }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={cn(
        baseStyles,
        variantStyles[variant] ?? variantStyles.default,
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
