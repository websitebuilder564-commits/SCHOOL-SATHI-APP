import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';

interface DataPoint {
  label: string;
  rate: number;
  secondary?: number;
}

interface AttendanceAreaChartProps {
  data: DataPoint[];
  title?: string;
  subtitle?: string;
  height?: number;
}

export const AttendanceAreaChart: React.FC<AttendanceAreaChartProps> = ({
  data,
  title = 'Institutional Attendance Trends',
  subtitle = 'Weekly & monthly percentage variance across all departments',
  height = 200,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (data.length === 0) return null;

  const minRate = 80;
  const maxRate = 100;
  const chartWidth = 500;
  const paddingX = 40;
  const paddingY = 25;
  const usableWidth = chartWidth - paddingX * 2;
  const usableHeight = height - paddingY * 2;

  // Calculate coordinates for points
  const points = data.map((d, idx) => {
    const x = paddingX + (idx / (data.length - 1 || 1)) * usableWidth;
    const normalizedY = (d.rate - minRate) / (maxRate - minRate);
    const y = height - paddingY - normalizedY * usableHeight;
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    if (idx === 0) return `M ${pt.x} ${pt.y}`;
    const prev = points[idx - 1];
    const cx1 = prev.x + (pt.x - prev.x) / 2;
    const cy1 = prev.y;
    const cx2 = prev.x + (pt.x - prev.x) / 2;
    const cy2 = pt.y;
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  return (
    <Card>
      <CardHeader title={title} subtitle={subtitle} />
      <CardContent>
        <div className="relative w-full overflow-hidden">
          <svg
            viewBox={`0 0 ${chartWidth} ${height}`}
            className="w-full h-auto overflow-visible select-none"
          >
            <defs>
              <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[80, 85, 90, 95, 100].map((val) => {
              const y = height - paddingY - ((val - minRate) / (maxRate - minRate)) * usableHeight;
              return (
                <g key={val}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={chartWidth - paddingX}
                    y2={y}
                    stroke="#e2e8f0"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={paddingX - 8}
                    y={y + 3}
                    textAnchor="end"
                    className="text-[10px] fill-slate-400 font-medium"
                  >
                    {val}%
                  </text>
                </g>
              );
            })}

            {/* Filled Area */}
            <path d={areaD} fill="url(#attendanceGradient)" />

            {/* Line Path */}
            <path d={pathD} fill="none" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" />

            {/* Points & Interactive Nodes */}
            {points.map((pt, idx) => (
              <g
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-pointer"
              >
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={hoveredIdx === idx ? 6 : 4}
                  className={`transition-all duration-150 ${
                    hoveredIdx === idx ? 'fill-indigo-600 stroke-4 stroke-indigo-100' : 'fill-white stroke-2 stroke-indigo-600'
                  }`}
                />
                <text
                  x={pt.x}
                  y={height - 6}
                  textAnchor="middle"
                  className="text-[10px] fill-slate-500 font-medium"
                >
                  {pt.label}
                </text>
              </g>
            ))}
          </svg>

          {/* Hover Tooltip display */}
          {hoveredIdx !== null && (
            <div
              className="absolute top-2 right-4 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg pointer-events-none"
            >
              <div className="font-semibold">{data[hoveredIdx].label}</div>
              <div className="text-indigo-300 font-bold text-sm">{data[hoveredIdx].rate}% Attendance</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
