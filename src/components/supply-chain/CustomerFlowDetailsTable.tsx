
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { VoiceElement } from "../VoiceElement";

interface CustomerFlowDetail {
  source: string;
  customer: string;
  product: string;
  mode: string;
  period: string;
  totalFlowUnits: number;
  totalCost: number;
  averageFlowCostPerUnit: number;
}

interface CustomerFlowDetailsTableProps {
  data: CustomerFlowDetail[];
  whatScript?: string;
  howScript?: string;
  decisionScript?: string;
}

export const CustomerFlowDetailsTable = ({
  data,
  whatScript,
  howScript,
  decisionScript
}: CustomerFlowDetailsTableProps) => {
  const formatNumber = (num: number) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(num);
  };

  return (
    <VoiceElement
      whatScript={whatScript}
      howScript={howScript}
      decisionScript={decisionScript}
    >
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-600">Customer Flow Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-3">
            {["Source Name", "Customer Name", "Product Name", "Mode Name", "Period Name"].map((label) => (
              <div key={label} className="relative flex-1 min-w-[150px]">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={label}
                  className="pl-8 pr-3 py-1 w-full text-sm border border-gray-300 rounded"
                />
              </div>
            ))}
          </div>

          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source Name</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Mode Name</TableHead>
                  <TableHead>Period Name</TableHead>
                  <TableHead className="text-right">Total Flow Units</TableHead>
                  <TableHead className="text-right">Total Cost</TableHead>
                  <TableHead className="text-right">Average Flow Cost Per Unit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="font-medium">
                  <TableCell colSpan={5}>Totals</TableCell>
                  <TableCell className="text-right">38,128,200.00</TableCell>
                  <TableCell className="text-right">{formatCurrency(107837134.72)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(2.83)}</TableCell>
                </TableRow>
                {data.map((flow, index) => (
                  <TableRow key={index}>
                    <TableCell>{flow.source}</TableCell>
                    <TableCell>{flow.customer}</TableCell>
                    <TableCell>{flow.product}</TableCell>
                    <TableCell>{flow.mode}</TableCell>
                    <TableCell>{flow.period}</TableCell>
                    <TableCell className="text-right">{formatNumber(flow.totalFlowUnits)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(flow.totalCost)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(flow.averageFlowCostPerUnit)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </VoiceElement>
  );
};
