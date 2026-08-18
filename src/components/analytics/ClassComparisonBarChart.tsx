import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';

interface ClassStat {
  className: string;
  total: number;
  present: number;
  absent: number;
  rate: number;
}

interface ClassComparisonBarChartProps {
  data: ClassStat[];
  title?: string;
  subtitle?: string;
}

export const ClassComparisonBarChart: React.FC<ClassComparisonBarChartProps> = ({
  data,
  title = 'Class-wise Attendance Distribution',
  subtitle = 'Comparative rate of student attendance across grades',
}) => {
  return (
    <Card>
      <CardHeader title={title} subtitle={subtitle} />
      <CardContent>
        <div className="space-y-3.5">
          {data.map((item) => {
            const isHigh = item.rate >= 92;
            const isLow = item.rate < 88;

            return (
              <div key={item.className} className="text-xs">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800 w-20">{item.className}</span>
                    <span className="text-[11px] text-slate-400">
                      ({item.present}/{item.total} Present)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-bold ${
                        isHigh
                          ? 'text-emerald-600'
                          : isLow
                          ? 'text-rose-600'
                          : 'text-indigo-600'
                      }`}
                    >
                      {item.rate}%
                    </span>
                  </div>
                </div>

                {/* Bar */}
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isHigh
                        ? 'bg-emerald-500'
                        : isLow
                        ? 'bg-rose-500'
                        : 'bg-indigo-600'
                    }`}
                    style={{ width: `${Math.min(100, Math.max(0, item.rate))}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
