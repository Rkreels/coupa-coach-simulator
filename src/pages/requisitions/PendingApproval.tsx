import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { useEnterpriseRequisitions } from '../../hooks/useEnterpriseRequisitions';
import { useToast } from '@/hooks/use-toast';
import { Search, Eye, CheckCircle, X, Clock, FileText, AlertCircle } from 'lucide-react';

const PendingApprovalPage = () => {
  const { 
    requisitions, 
    approveRequisition, 
    rejectRequisition,
    metrics 
  } = useEnterpriseRequisitions();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const pendingRequisitions = requisitions.filter(req => req.status === 'pending_approval');

  const handleApprove = (requisition: any) => {
    approveRequisition(requisition.id, 'Current User', 'Approved via bulk action');
    toast({
      title: 'Requisition Approved',
      description: `Requisition ${requisition.id} has been approved successfully.`
    });
  };

  const handleReject = (requisition: any) => {
    rejectRequisition(requisition.id, 'Current User', 'Rejected - does not meet criteria');
    toast({
      title: 'Requisition Rejected',
      description: `Requisition ${requisition.id} has been rejected.`,
      variant: 'destructive'
    });
  };

  const columns = [
    { 
      key: 'id' as const, 
      header: 'Req ID', 
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-yellow-500" />
          <span className="font-mono text-sm">{value}</span>
        </div>
      )
    },
    { key: 'title' as const, header: 'Title', sortable: true },
    { key: 'requestor' as const, header: 'Requestor', sortable: true },
    { key: 'department' as const, header: 'Department', sortable: true },
    { 
      key: 'priority' as const, 
      header: 'Priority',
      render: (value: string) => {
        if (!value) return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
        
        return (
          <Badge className={
            value === 'urgent' ? 'bg-red-100 text-red-800' :
            value === 'high' ? 'bg-orange-100 text-orange-800' :
            value === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Badge>
        );
      }
    },
    { 
      key: 'totalAmount' as const, 
      header: 'Amount',
      render: (value: number, item: any) => `${item.currency} ${value.toLocaleString()}`
    },
    { key: 'neededByDate' as const, header: 'Needed By', sortable: true },
    { key: 'submittedDate' as const, header: 'Submitted', sortable: true }
  ];

  const filteredRequisitions = pendingRequisitions.filter(req =>
    req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.requestor?.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.department?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ApplicationLayout pageTitle="Pending Approval">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">Pending Approval</h2>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              {pendingRequisitions.length} Awaiting
            </Badge>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-500">Pending</p>
                  <p className="text-lg font-semibold">{metrics.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-sm text-gray-500">Urgent Priority</p>
                  <p className="text-lg font-semibold">
                    {pendingRequisitions.filter(r => r.priority === 'urgent').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Total Value</p>
                  <p className="text-lg font-semibold">
                    ${pendingRequisitions.reduce((sum, r) => sum + r.totalAmount, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Requisitions Awaiting Approval</CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search requisitions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              data={filteredRequisitions}
              columns={columns}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" title="View Details">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleApprove(item)}
                    className="text-green-600 hover:text-green-700"
                    title="Approve"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleReject(item)}
                    className="text-red-600 hover:text-red-700"
                    title="Reject"
                  >
                    <X className="h-4 w-4" />
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

export default PendingApprovalPage;