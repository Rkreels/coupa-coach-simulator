
import React from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { useRequisitions } from '../../hooks/useRequisitions';
import { FileText, Edit, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MyRequisitionsPage = () => {
  const { allRequisitions } = useRequisitions();
  const myRequisitions = allRequisitions.filter(req => req.requestor === 'Current User' || req.requestor === 'Sarah Johnson');

  const getStatusBadge = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={colors[status] || 'bg-gray-100 text-gray-800'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const columns = [
    { 
      key: 'id' as const, 
      header: 'Req ID', 
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-gray-400" />
          <span className="font-mono text-sm">{value}</span>
        </div>
      )
    },
    { key: 'title' as const, header: 'Title', sortable: true },
    { 
      key: 'status' as const, 
      header: 'Status', 
      render: (value: string) => getStatusBadge(value)
    },
    { 
      key: 'totalAmount' as const, 
      header: 'Amount',
      render: (value: number, item: any) => `${item.currency} ${value.toLocaleString()}`
    },
    { key: 'neededByDate' as const, header: 'Needed By', sortable: true },
    { key: 'lastModified' as const, header: 'Last Modified', sortable: true }
  ];

  return (
    <ApplicationLayout pageTitle="My Requisitions">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">My Requisitions</h2>
          <Badge className="bg-blue-100 text-blue-800">
            {myRequisitions.length} Total
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Requisitions</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={myRequisitions}
              columns={columns}
              searchTerm=""
              onSearchChange={() => {}}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  {(item.status === 'draft' || item.status === 'rejected') && (
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
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

export default MyRequisitionsPage;
