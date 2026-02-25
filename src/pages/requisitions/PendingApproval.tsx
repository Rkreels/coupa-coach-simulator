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
import { DetailViewDialog } from '@/components/ui/detail-view-dialog';

const PendingApprovalPage = () => {
  const { requisitions, approveRequisition, rejectRequisition, metrics } = useEnterpriseRequisitions();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [viewOpen, setViewOpen] = useState(false);

  const pendingRequisitions = requisitions.filter(req => req.status === 'pending_approval');
  const handleView = (item: any) => { setSelectedItem(item); setViewOpen(true); };
  const handleApprove = (req: any) => { approveRequisition(req.id, 'Current User', 'Approved'); toast({ title: 'Requisition Approved', description: `${req.id} approved.` }); };
  const handleReject = (req: any) => { rejectRequisition(req.id, 'Current User', 'Rejected'); toast({ title: 'Requisition Rejected', variant: 'destructive' }); };

  const columns: any[] = [
    { key: 'id', header: 'Req ID', render: (value: string) => <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-yellow-500" /><span className="font-mono text-sm">{value}</span></div> },
    { key: 'title', header: 'Title', sortable: true },
    { key: 'requestor', header: 'Requestor', sortable: true },
    { key: 'department', header: 'Department', sortable: true },
    { key: 'urgency', header: 'Priority', render: (value: string) => {
      if (!value) return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
      const colors: Record<string, string> = { critical: 'bg-red-100 text-red-800', high: 'bg-orange-100 text-orange-800', medium: 'bg-yellow-100 text-yellow-800', low: 'bg-green-100 text-green-800' };
      return <Badge className={colors[value] || 'bg-gray-100 text-gray-800'}>{value.charAt(0).toUpperCase() + value.slice(1)}</Badge>;
    }},
    { key: 'totalAmount', header: 'Amount', render: (value: number, item: any) => `${item.currency} ${value.toLocaleString()}` },
    { key: 'neededByDate', header: 'Needed By', sortable: true }
  ];

  const filteredRequisitions = pendingRequisitions.filter(req =>
    req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const viewSections = selectedItem ? [
    { title: 'Requisition Details', fields: [
      { label: 'ID', value: selectedItem.id },
      { label: 'Status', value: 'Pending Approval', type: 'badge' as const, badgeColor: 'bg-yellow-100 text-yellow-800' },
      { label: 'Title', value: selectedItem.title, span: 2 },
      { label: 'Requestor', value: typeof selectedItem.requestor === 'object' ? selectedItem.requestor.displayName : selectedItem.requestor },
      { label: 'Department', value: typeof selectedItem.department === 'object' ? selectedItem.department.name : selectedItem.department },
      { label: 'Priority', value: selectedItem.urgency, type: 'badge' as const },
      { label: 'Amount', value: `${selectedItem.currency} ${selectedItem.totalAmount.toLocaleString()}` },
      { label: 'Needed By', value: selectedItem.neededByDate },
      { label: 'Submitted', value: selectedItem.submittedDate },
    ]}
  ] : [];

  return (
    <ApplicationLayout pageTitle="Pending Approval">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">Pending Approval</h2>
            <Badge className="bg-yellow-100 text-yellow-800">{pendingRequisitions.length} Awaiting</Badge>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><Clock className="h-5 w-5 text-yellow-500" /><div><p className="text-sm text-gray-500">Pending</p><p className="text-lg font-semibold">{metrics.pending}</p></div></div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><AlertCircle className="h-5 w-5 text-red-500" /><div><p className="text-sm text-gray-500">Critical</p><p className="text-lg font-semibold">{pendingRequisitions.filter(r => r.urgency === 'critical').length}</p></div></div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><FileText className="h-5 w-5 text-blue-500" /><div><p className="text-sm text-gray-500">Total Value</p><p className="text-lg font-semibold">${pendingRequisitions.reduce((s, r) => s + r.totalAmount, 0).toLocaleString()}</p></div></div></CardContent></Card>
        </div>
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Requisitions Awaiting Approval</CardTitle>
              <div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" /><Input placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 w-64" /></div>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable data={filteredRequisitions} columns={columns} searchTerm={searchTerm} onSearchChange={setSearchTerm}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleView(item)}><Eye className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" className="text-green-600" onClick={() => handleApprove(item)}><CheckCircle className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleReject(item)}><X className="h-4 w-4" /></Button>
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>
      <DetailViewDialog open={viewOpen} onOpenChange={setViewOpen} title={selectedItem?.title || ''} subtitle={selectedItem?.id} sections={viewSections} />
    </ApplicationLayout>
  );
};

export default PendingApprovalPage;