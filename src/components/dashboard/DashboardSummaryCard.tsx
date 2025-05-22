
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface DashboardSummaryCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  description?: string;
}

export const DashboardSummaryCard: React.FC<DashboardSummaryCardProps> = ({
  title,
  value,
  change,
  trend = 'neutral',
  icon,
  description
}) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            
            {(change !== undefined && trend !== 'neutral') && (
              <div className="flex items-center mt-1">
                <span className={`text-xs font-medium flex items-center ${
                  trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {trend === 'up' ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(change)}%
                </span>
                {description && (
                  <span className="text-xs text-muted-foreground ml-1">
                    {description}
                  </span>
                )}
              </div>
            )}
            
            {(change === undefined && description) && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          
          {icon && (
            <div className="rounded-md bg-muted p-2 h-8 w-8 flex items-center justify-center">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
