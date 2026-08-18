import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  id?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', id, onClick }) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`bg-white border border-slate-200/90 rounded-xl shadow-xs transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-slate-300 hover:shadow-sm' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  action?: ReactNode;
  className?: string;
}> = ({ title, subtitle, action, className = '' }) => {
  return (
    <div className={`flex items-start justify-between p-5 border-b border-slate-100 ${className}`}>
      <div>
        <h3 className="text-base font-semibold text-slate-900 leading-tight">{title}</h3>
        {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
      </div>
      {action && <div className="ml-4 shrink-0">{action}</div>}
    </div>
  );
};

export const CardContent: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <div className={`p-5 ${className}`}>{children}</div>;
};

export const CardFooter: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <div className={`p-4 bg-slate-50/60 border-t border-slate-100 rounded-b-xl ${className}`}>{children}</div>;
};
