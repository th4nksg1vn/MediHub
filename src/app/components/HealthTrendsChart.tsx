import React from "react";

type Point = { x: string | number; y: number };

export default function HealthTrendsChart({ data }: { data: Point[] }) {
  if (!data || data.length === 0) {
    return <div className="card">No trend data available</div>;
  }

  // Simple SVG sparkline
  const values = data.map((d) => d.y);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const width = 400;
  const height = 80;

  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((d.y - min) / (max - min || 1)) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="card">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <polyline
          fill="none"
          stroke="#0b74de"
          strokeWidth={2}
          points={points}
        />
      </svg>
    </div>
  );
}
