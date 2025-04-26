
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VoiceElement } from "../VoiceElement";

interface ProductFlowChartProps {
  data: Array<{
    product: string;
    value: number;
  }>;
  whatScript?: string;
  howScript?: string;
  decisionScript?: string;
}

export const ProductFlowChart = ({
  data,
  whatScript,
  howScript,
  decisionScript
}: ProductFlowChartProps) => {
  // Colors for the pie chart segments
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c'];
  
  return (
    <VoiceElement
      whatScript={whatScript}
      howScript={howScript}
      decisionScript={decisionScript}
    >
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-600">Flow Units by Product</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </VoiceElement>
  );
};
