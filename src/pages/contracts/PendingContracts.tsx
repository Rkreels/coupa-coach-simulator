
import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { useContracts } from '../../hooks/useContracts';
import { useToast } from '@/hooks/use-toast';
import { Clock, CheckCircle, XCircle, Eye, FileText, Edit } from 'lucide-react';

const PendingContractsPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const { contracts, updateContract } = useContracts();
  const pendingContracts = contracts.filter(contract => contract.status === 'pending');

  const handleApprove = (contractId: string) => {
    updateContract(contractId, { 
      status: 'active',
      signedDate: new Date().toISOString().split('T')[0]
    });
    toast({
      title: 'Contract Approved',
      description: 'Contract has been approved and activated.'
    });
  };

  const handleReject = (contractId: string) => {
    updateContract(contractId, { status: 'terminated' });
    toast({
      title: 'Contract Rejected',
      description: 'Contract has been rejected.',
      variant: 'destructive'
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
    { key: 'owner', header: 'Contract Owner', sortable: true },
    { key: 'createdDate', header: 'Created Date', sortable: true },
    { key: 'department', header: 'Department', sortable: true }
  ];

  return (
    <ApplicationLayout pageTitle="Pending Contracts">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Contracts Pending Approval</h2>
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="h-4 w-4 mr-1" />
            {pendingContracts.length} Pending
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Contract Approval Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={pendingContracts}
              columns={columns}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Review
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-1" />
                    Documents
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-green-600 hover:text-green-700"
                    onClick={() => handleApprove(item.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleReject(item.id)}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
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

export default PendingContractsPage;
