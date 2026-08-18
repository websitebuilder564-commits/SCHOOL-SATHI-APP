import React, { ReactNode } from 'react';
import { Card } from './Card';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  iconBgColor?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
  id?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  iconBgColor = 'bg-blue-50 text-blue-600',
  trend,
  className = '',
  id,
  onClick,
}) => {
  return (
    <Card id={id} onClick={onClick} className={`overflow-hidden ${className}`}>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</span>
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBgColor}`}>
            {icon}
          </div>
        </div>

        <div className="mt-3">
          <div className="text-2xl font-bold text-slate-900 tracking-tight">{value}</div>
          
          {(subtitle || trend) && (
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
              {trend && (
                <span
                  className={`font-semibold inline-flex items-center ${
                    trend.isPositive ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {trend.isPositive ? '↑' : '↓'} {trend.value}
                </span>
              )}
              {subtitle && <span>{subtitle}</span>}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
