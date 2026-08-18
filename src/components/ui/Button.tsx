import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-xs focus-visible:ring-indigo-500',
    secondary: 'bg-slate-800 hover:bg-slate-900 active:bg-black text-white shadow-xs focus-visible:ring-slate-700',
    outline: 'bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 active:bg-slate-100 focus-visible:ring-slate-400',
    danger: 'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white shadow-xs focus-visible:ring-rose-500',
    ghost: 'bg-transparent hover:bg-slate-100 active:bg-slate-200 text-slate-700 focus-visible:ring-slate-400',
    success: 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-xs focus-visible:ring-emerald-500',
  };

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5 font-medium',
    md: 'text-sm px-4 py-2 rounded-xl gap-2 font-medium',
    lg: 'text-base px-5 py-2.5 rounded-xl gap-2.5 font-semibold',
  };

  return (
    <button
      className={`inline-flex items-center justify-center transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
