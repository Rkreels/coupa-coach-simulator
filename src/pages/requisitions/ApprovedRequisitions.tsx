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
import { DetailViewDialog } from '@/components/ui/detail-view-dialog';

const ApprovedRequisitionsPage = () => {
  const { requisitions, metrics } = useEnterpriseRequisitions();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [viewOpen, setViewOpen] = useState(false);

  const approvedRequisitions = requisitions.filter(req => req.status === 'approved');
  const handleView = (item: any) => { setSelectedItem(item); setViewOpen(true); };
  const handleCreatePO = (req: any) => { toast({ title: 'Purchase Order Created', description: `PO created for ${req.id}.` }); };
  const handleExport = (req: any) => {
    const blob = new Blob([JSON.stringify(req, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `${req.id}.json`; a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Exported', description: `${req.id} exported.` });
  };

  const columns: any[] = [
    { key: 'id', header: 'Req ID', render: (value: string) => <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /><span className="font-mono text-sm">{value}</span></div> },
    { key: 'title', header: 'Title', sortable: true },
    { key: 'requestor', header: 'Requestor', sortable: true },
    { key: 'department', header: 'Department', sortable: true },
    { key: 'totalAmount', header: 'Amount', render: (value: number, item: any) => `${item.currency} ${value.toLocaleString()}` },
    { key: 'approvedDate', header: 'Approved Date', sortable: true },
    { key: 'neededByDate', header: 'Needed By', sortable: true }
  ];

  const filteredRequisitions = approvedRequisitions.filter(req =>
    req.id.toLowerCase().includes(searchTerm.toLowerCase()) || req.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const viewSections = selectedItem ? [
    { title: 'Approved Requisition', fields: [
      { label: 'ID', value: selectedItem.id },
      { label: 'Status', value: 'Approved', type: 'badge' as const, badgeColor: 'bg-green-100 text-green-800' },
      { label: 'Title', value: selectedItem.title, span: 2 },
      { label: 'Requestor', value: typeof selectedItem.requestor === 'object' ? selectedItem.requestor.displayName : selectedItem.requestor },
      { label: 'Department', value: typeof selectedItem.department === 'object' ? selectedItem.department.name : selectedItem.department },
      { label: 'Amount', value: `${selectedItem.currency} ${selectedItem.totalAmount.toLocaleString()}` },
      { label: 'Approver', value: selectedItem.approver || 'System' },
      { label: 'Approved Date', value: selectedItem.approvedDate },
      { label: 'Needed By', value: selectedItem.neededByDate },
    ]}
  ] : [];

  return (
    <ApplicationLayout pageTitle="Approved Requisitions">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">Approved Requisitions</h2>
            <Badge className="bg-green-100 text-green-800">{approvedRequisitions.length} Approved</Badge>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><CheckCircle className="h-5 w-5 text-green-500" /><div><p className="text-sm text-gray-500">Approved</p><p className="text-lg font-semibold">{metrics.approved}</p></div></div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><ShoppingCart className="h-5 w-5 text-blue-500" /><div><p className="text-sm text-gray-500">Ready for PO</p><p className="text-lg font-semibold">{approvedRequisitions.length}</p></div></div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><FileText className="h-5 w-5 text-purple-500" /><div><p className="text-sm text-gray-500">Total Value</p><p className="text-lg font-semibold">${approvedRequisitions.reduce((s, r) => s + r.totalAmount, 0).toLocaleString()}</p></div></div></CardContent></Card>
        </div>
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Ready for PO Creation</CardTitle>
              <div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" /><Input placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 w-64" /></div>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable data={filteredRequisitions} columns={columns} searchTerm={searchTerm} onSearchChange={setSearchTerm}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleView(item)}><Eye className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" className="text-blue-600" onClick={() => handleCreatePO(item)}><ShoppingCart className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => handleExport(item)}><Download className="h-4 w-4" /></Button>
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

export default ApprovedRequisitionsPage;