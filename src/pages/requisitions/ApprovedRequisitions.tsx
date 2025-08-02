import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { useEnterpriseRequisitions } from '../../hooks/useEnterpriseRequisitions';
import { useToast } from '@/hooks/use-toast';
import { Search, Eye, ShoppingCart, Download, CheckCircle, FileText } from 'lucide-react';

const ApprovedRequisitionsPage = () => {
  const { 
    requisitions, 
    metrics 
  } = useEnterpriseRequisitions();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const approvedRequisitions = requisitions.filter(req => req.status === 'approved');

  const handleCreatePO = (requisition: any) => {
    toast({
      title: 'Purchase Order Created',
      description: `PO created for requisition ${requisition.id}.`
    });
  };

  const handleExport = (requisition: any) => {
    toast({
      title: 'Export Started',
      description: `Exporting requisition ${requisition.id}.`
    });
  };

  const columns = [
    { 
      key: 'id' as const, 
      header: 'Req ID', 
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span className="font-mono text-sm">{value}</span>
        </div>
      )
    },
    { key: 'title' as const, header: 'Title', sortable: true },
    { key: 'requestor' as const, header: 'Requestor', sortable: true },
    { key: 'department' as const, header: 'Department', sortable: true },
    { 
      key: 'totalAmount' as const, 
      header: 'Amount',
      render: (value: number, item: any) => `${item.currency} ${value.toLocaleString()}`
    },
    { key: 'approvedDate' as const, header: 'Approved Date', sortable: true },
    { key: 'neededByDate' as const, header: 'Needed By', sortable: true },
    { 
      key: 'approver' as const, 
      header: 'Approved By',
      render: (value: string) => value || 'System'
    }
  ];

  const filteredRequisitions = approvedRequisitions.filter(req =>
    req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.requestor?.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.department?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ApplicationLayout pageTitle="Approved Requisitions">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">Approved Requisitions</h2>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {approvedRequisitions.length} Approved
            </Badge>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500">Approved</p>
                  <p className="text-lg font-semibold">{metrics.approved}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Ready for PO</p>
                  <p className="text-lg font-semibold">
                    {approvedRequisitions.filter(r => !r.purchaseOrderId).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-500">Total Value</p>
                  <p className="text-lg font-semibold">
                    ${approvedRequisitions.reduce((sum, r) => sum + r.totalAmount, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Ready for Purchase Order Creation</CardTitle>
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
                    onClick={() => handleCreatePO(item)}
                    className="text-blue-600 hover:text-blue-700"
                    title="Create Purchase Order"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleExport(item)}
                    title="Export"
                  >
                    <Download className="h-4 w-4" />
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

export default ApprovedRequisitionsPage;