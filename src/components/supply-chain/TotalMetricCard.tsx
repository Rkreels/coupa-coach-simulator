
import { Card, CardContent } from "@/components/ui/card";
import { VoiceElement } from "../VoiceElement";

interface TotalMetricCardProps {
  title: string;
  value: string | number;
  whatScript?: string;
  howScript?: string;
  decisionScript?: string;
}

export const TotalMetricCard = ({
  title,
  value,
  whatScript,
  howScript,
  decisionScript
}: TotalMetricCardProps) => {
  // Format value if it's a number
  const formattedValue = typeof value === 'number' 
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(value)
    : value;

  return (
    <VoiceElement
      whatScript={whatScript}
      howScript={howScript}
      decisionScript={decisionScript}
    >
      <Card className="bg-white">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-1">{title}</p>
            <p className="text-coupa-blue font-semibold text-2xl">{formattedValue}</p>
          </div>
        </CardContent>
      </Card>
    </VoiceElement>
  );
};
