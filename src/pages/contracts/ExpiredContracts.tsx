
import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { useContracts } from '../../hooks/useContracts';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, RotateCcw, Eye, FileText, Trash2 } from 'lucide-react';

const ExpiredContractsPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const { contracts, updateContract, deleteContract } = useContracts();
  const expiredContracts = contracts.filter(contract => contract.status === 'expired');

  const handleRenew = (contractId: string) => {
    const today = new Date();
    const newEndDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
    
    updateContract(contractId, { 
      status: 'active',
      startDate: today.toISOString().split('T')[0],
      endDate: newEndDate.toISOString().split('T')[0],
      renewalDate: today.toISOString().split('T')[0]
    });
    
    toast({
      title: 'Contract Renewed',
      description: 'Contract has been renewed for another year.'
    });
  };

  const handleArchive = (contractId: string) => {
    deleteContract(contractId);
    toast({
      title: 'Contract Archived',
      description: 'Contract has been moved to archive.'
    });
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
    { key: 'endDate', header: 'Expired Date', sortable: true },
    { key: 'department', header: 'Department', sortable: true }
  ];

  return (
    <ApplicationLayout pageTitle="Expired Contracts">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Expired Contracts</h2>
          <Badge className="bg-red-100 text-red-800">
            <AlertCircle className="h-4 w-4 mr-1" />
            {expiredContracts.length} Expired
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Contract Renewal Management</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={expiredContracts}
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
                    <FileText className="h-4 w-4 mr-1" />
                    Documents
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-blue-600"
                    onClick={() => handleRenew(item.id)}
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Renew
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-600"
                    onClick={() => handleArchive(item.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Archive
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

export default ExpiredContractsPage;
