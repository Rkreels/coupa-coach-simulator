
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Sample spend data
const spendData = [
  { name: 'Jan', direct: 4000, indirect: 2400 },
  { name: 'Feb', direct: 3000, indirect: 1398 },
  { name: 'Mar', direct: 2000, indirect: 9800 },
  { name: 'Apr', direct: 2780, indirect: 3908 },
  { name: 'May', direct: 1890, indirect: 4800 },
  { name: 'Jun', direct: 2390, indirect: 3800 },
  { name: 'Jul', direct: 3490, indirect: 4300 },
];

const config = {
  direct: {
    label: "Direct",
    color: "#2563eb",
  },
  indirect: {
    label: "Indirect",
    color: "#60a5fa",
  }
};

export const SpendChart = () => {
  return (
    <div className="h-[300px] w-full">
      <ChartContainer config={config}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={spendData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <ChartTooltipContent
                      active={active}
                      payload={payload}
                    />
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Bar 
              dataKey="direct" 
              fill="var(--color-direct)" 
              radius={[4, 4, 0, 0]} 
              name="Direct Spend"
            />
            <Bar 
              dataKey="indirect" 
              fill="var(--color-indirect)" 
              radius={[4, 4, 0, 0]} 
              name="Indirect Spend"
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};
