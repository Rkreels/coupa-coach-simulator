
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VoiceElement } from "../VoiceElement";

interface FlowUnitsCostScatterProps {
  data: Array<{
    source: string;
    flowUnits: number;
    cost: number;
  }>;
  whatScript?: string;
  howScript?: string;
  decisionScript?: string;
}

export const FlowUnitsCostScatter = ({
  data,
  whatScript,
  howScript,
  decisionScript
}: FlowUnitsCostScatterProps) => {
  const formatYAxis = (tickItem: number) => {
    return `$${(tickItem / 1000000).toFixed(0)}M`;
  };
  
  const formatXAxis = (tickItem: number) => {
    return `${tickItem}M`;
  };
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
          <p className="font-semibold">{payload[0].payload.source}</p>
          <p>Flow Units: {payload[0].payload.flowUnits}M</p>
          <p>Total Cost: ${(payload[0].payload.cost / 1000000).toFixed(2)}M</p>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <VoiceElement
      whatScript={whatScript}
      howScript={howScript}
      decisionScript={decisionScript}
    >
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-600">Flow Units and Cost by Source Name</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  type="number" 
                  dataKey="flowUnits" 
                  name="Flow Units" 
                  unit="M"
                  tickFormatter={formatXAxis}
                  label={{ value: 'Flow Units', position: 'insideBottom', offset: -10 }} 
                />
                <YAxis 
                  type="number" 
                  dataKey="cost" 
                  name="Total Cost" 
                  unit="$"
                  tickFormatter={formatYAxis}
                  label={{ value: 'Total Cost', angle: -90, position: 'insideLeft' }} 
                />
                <ZAxis range={[60, 60]} />
                <Tooltip content={<CustomTooltip />} />
                <Scatter name="Source" data={data} fill="#8884d8" shape="circle" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </VoiceElement>
  );
};
