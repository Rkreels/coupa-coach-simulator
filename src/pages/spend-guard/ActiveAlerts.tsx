import React from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { AlertTriangle, Shield, Eye, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ActiveAlertsPage = () => {
  const { toast } = useToast();

  const activeAlerts = [
    {
      id: "RISK-001",
      type: "Duplicate Invoice",
      level: "high",
      description: "Invoice INV-2023-056 appears to be a duplicate of INV-2023-042",
      source: "Invoice Processing",
      detected: "2023-05-15",
      amount: "$1,250.00",
      supplier: "TechCorp Inc."
    },
    {
      id: "RISK-002", 
      type: "Price Variance",
      level: "medium",
      description: "Item price increased by 18% compared to last purchase",
      source: "Purchase Orders",
      detected: "2023-05-20",
      amount: "$850.00",
      supplier: "Office Solutions"
    },
    {
      id: "RISK-003",
      type: "Approval Bypass",
      level: "high", 
      description: "Purchase order PO-2023-089 bypassed required approval steps",
      source: "Approval Workflow",
      detected: "2023-05-22",
      amount: "$3,200.00",
      supplier: "Global Supplies"
    }
  ];

  const handleResolve = (alert: any) => {
    toast({
      title: "Alert Resolved",
      description: `Risk alert ${alert.id} has been marked as resolved.`,
    });
  };

  const handleDismiss = (alert: any) => {
    toast({
      title: "Alert Dismissed", 
      description: `Risk alert ${alert.id} has been dismissed.`,
      variant: "destructive"
    });
  };

  const getRiskLevelBadge = (level: string) => {
    const colors = {
      high: 'bg-red-50 text-red-700 border-red-200',
      medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      low: 'bg-green-50 text-green-700 border-green-200'
    };
    
    return (
      <Badge variant="outline" className={colors[level as keyof typeof colors]}>
        {level.charAt(0).toUpperCase() + level.slice(1)}
      </Badge>
    );
  };

  const columns: any[] = [
    { key: 'id' as const, header: 'Alert ID', sortable: true },
    { key: 'type' as const, header: 'Type', sortable: true },
    { 
      key: 'level' as const, 
      header: 'Risk Level', 
      render: (value: string) => getRiskLevelBadge(value)
    },
    { key: 'description' as const, header: 'Description' },
    { key: 'source' as const, header: 'Source', sortable: true },
    { key: 'supplier' as const, header: 'Supplier', sortable: true },
    { key: 'amount' as const, header: 'Amount', sortable: true },
    { key: 'detected' as const, header: 'Detected', sortable: true }
  ];

  return (
    <ApplicationLayout pageTitle="Active Alerts">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Active Risk Alerts</h2>
          <Badge className="bg-red-100 text-red-800">
            <AlertTriangle className="h-4 w-4 mr-1" />
            {activeAlerts.length} Active
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">High Risk</p>
                  <h3 className="text-2xl font-bold text-red-600">2</h3>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Medium Risk</p>
                  <h3 className="text-2xl font-bold text-yellow-600">1</h3>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Shield className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Amount at Risk</p>
                  <h3 className="text-2xl font-bold text-purple-600">$5,300</h3>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Alert Details</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={activeAlerts}
              columns={columns}
              searchTerm=""
              onSearchChange={() => {}}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleResolve(item)}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Resolve
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDismiss(item)}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Dismiss
                  </Button>
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>
    </ApplicationLayout>
  );
};

export default ActiveAlertsPage;