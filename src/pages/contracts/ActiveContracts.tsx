
import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { useContracts } from '../../hooks/useContracts';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Eye, Edit, FileText, Calendar, AlertTriangle } from 'lucide-react';

const ActiveContractsPage = () => {
  const { toast } = useToast();
  const { contracts, updateContract } = useContracts();
  const activeContracts = contracts.filter(contract => contract.status === 'active');

  const handleRenew = (contractId: string) => {
    updateContract(contractId, { status: 'renewed' });
    toast({
      title: 'Contract Renewed',
      description: 'Contract has been renewed successfully.'
    });
  };

  const isExpiringSoon = (endDate: string, notificationDays: number) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffDays = Math.ceil((end.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return diffDays <= notificationDays;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      master: 'bg-blue-100 text-blue-800',
      service: 'bg-green-100 text-green-800',
      purchase: 'bg-purple-100 text-purple-800',
      framework: 'bg-orange-100 text-orange-800',
      nda: 'bg-gray-100 text-gray-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const [searchTerm, setSearchTerm] = useState('');

  const columns: any[] = [
    { key: 'title', header: 'Contract Title', sortable: true },
    {
      key: 'type',
      header: 'Type',
      render: (value: any, item: any) => (
        <Badge className={getTypeColor(item.type)}>
          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
        </Badge>
      )
    },
    { key: 'supplier', header: 'Supplier', sortable: true },
    { 
      key: 'value', 
      header: 'Value',
      render: (value: any, item: any) => `${item.currency} ${value.toLocaleString()}`
    },
    { key: 'startDate', header: 'Start Date', sortable: true },
    { 
      key: 'endDate', 
      header: 'End Date', 
      sortable: true,
      render: (value: any, item: any) => (
        <div className="flex items-center gap-2">
          <span>{value}</span>
          {isExpiringSoon(item.endDate, item.notificationDays) && (
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          )}
        </div>
      )
    },
    { key: 'department', header: 'Department', sortable: true }
  ];

  return (
    <ApplicationLayout pageTitle="Active Contracts">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Active Contracts</h2>
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-4 w-4 mr-1" />
            {activeContracts.length} Active
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Contract Portfolio Management</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={activeContracts}
              columns={columns}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-1" />
                    Documents
                  </Button>
                  {isExpiringSoon(item.endDate, item.notificationDays) && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-blue-600"
                      onClick={() => handleRenew(item.id)}
                    >
                      <Calendar className="h-4 w-4 mr-1" />
                      Renew
                    </Button>
                  )}
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>
    </ApplicationLayout>
  );
};

export default ActiveContractsPage;
