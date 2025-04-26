
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Line, ComposedChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VoiceElement } from "../VoiceElement";

interface CustomerFlowBarChartProps {
  data: Array<{
    customer: string;
    flowUnits: number;
    totalCost: number;
  }>;
  whatScript?: string;
  howScript?: string;
  decisionScript?: string;
}

export const CustomerFlowBarChart = ({
  data,
  whatScript,
  howScript,
  decisionScript
}: CustomerFlowBarChartProps) => {
  const formatYAxis = (tickItem: number) => {
    return `${(tickItem / 1000).toFixed(0)}k`;
  };
  
  const formatCostYAxis = (tickItem: number) => {
    return `$${(tickItem / 1000).toFixed(0)}k`;
  };
  
  return (
    <VoiceElement
      whatScript={whatScript}
      howScript={howScript}
      decisionScript={decisionScript}
    >
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-600">Flow Units and Cost by Customer Name</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={data}
                margin={{ top: 20, right: 20, bottom: 20, left: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="customer" tick={{ fontSize: 10 }} />
                <YAxis 
                  yAxisId="left" 
                  tickFormatter={formatYAxis} 
                  label={{ value: 'Flow Units', angle: -90, position: 'insideLeft' }} 
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  tickFormatter={formatCostYAxis}
                  label={{ value: 'Total Cost', angle: 90, position: 'insideRight' }} 
                />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === "flowUnits") {
                      return [`${value.toLocaleString()} units`, "Flow Units"];
                    } else if (name === "totalCost") {
                      return [`$${value.toLocaleString()}`, "Total Cost"];
                    }
                    return [value, name];
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="flowUnits" fill="#8884d8" name="Flow Units" />
                <Line yAxisId="right" type="monotone" dataKey="totalCost" stroke="#ff7300" name="Total Cost" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </VoiceElement>
  );
};
