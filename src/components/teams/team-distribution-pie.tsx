"use client"

import { Pie, PieChart, PieLabelRenderProps, PieSectorShapeProps, Sector } from 'recharts';

const data = [
  { name: 'Delta', value: 55 },
  { name: 'Alpha', value: 34 },
  { name: 'Canary', value: 11 },
];

const RADIAN = Math.PI / 180;
const COLORS = ['#84cc16', '#3b82f6', '#f97316'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > ncx ? 'start' : 'end'} dominantBaseline="central">
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

const MyCustomPie = (props: PieSectorShapeProps) => {
  return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
};


export default function TeamDistributionPie() {
  return (
    <PieChart
      style={{ width: '100%', maxWidth: '500px', maxHeight: '20vh', aspectRatio: 1 }}
      responsive
    >
      <Pie
        data={data}
        labelLine={false}
        label={renderCustomizedLabel}
        fill="#8884d8"
        dataKey="value"
        isAnimationActive={true}
        shape={MyCustomPie}
      />
    </PieChart>
  );
}
