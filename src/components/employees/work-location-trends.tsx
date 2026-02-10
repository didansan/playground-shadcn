"use client"

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {ValueType} from "recharts/types/component/DefaultTooltipContent";

const data = [
  {
    name: "Jan",
    office: 82,
    wfh: 44,
  },
  {
    name: "Feb",
    office: 80,
    wfh: 40,
  },
  {
    name: "Mar",
    office: 83,
    wfh: 42,
  },
  {
    name: "Apr",
    office: 50,
    wfh: 50,
  },
  {
    name: "May",
    office: 40,
    wfh: 60,
  },
  {
    name: "Jun",
    office: 60,
    wfh: 40,
  },
  {
    name: "Jul",
    office: 55,
    wfh: 55,
  },
  {
    name: "Aug",
    office: 49,
    wfh: 61,
  },
  {
    name: "Sep",
    office: 44,
    wfh: 70,
  },
  {
    name: "Oct",
    office: 40,
    wfh: 40,
  },
  {
    name: "Nov",
    office: 50,
    wfh: 50,
  },
  {
    name: "Dec",
    office: 50,
    wfh: 50,
  },
];


export default function WorkLocationTrends() {
  const label = (value: ValueType|undefined) => {
    return value === "wfh" ? "Work from home" : "Work from office";
  }

  return (
      <BarChart
        className="[&_.recharts-tooltip-cursor]:fill-zinc-200"
        style={{width: '100%', maxHeight: '70vh', aspectRatio: 1.618}}
        responsive
        data={data}
        margin={{
          top: 20,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name" stroke="#888888" fontSize={12}/>
        <YAxis width="auto" stroke="#888888" fontSize={12}/>
        <Tooltip
          separator=": "
          labelClassName="font-bold"
          wrapperClassName="!text-xs dark:!bg-black dark:!border-border"
          formatter={(value, name) => {
            return [value, label(name)]
          }}
        />
        <Legend iconType="circle" formatter={(value) => <div>{label(value)}</div>}/>
        <Bar dataKey="office" stackId="a" fill="#ec4899" background/>
        <Bar dataKey="wfh" stackId="a" fill="#6b7280" background/>
      </BarChart>
  );
}
