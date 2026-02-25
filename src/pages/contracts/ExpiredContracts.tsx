import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { useContracts } from '../../hooks/useContracts';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, RotateCcw, Eye, Trash2 } from 'lucide-react';
import { DetailViewDialog } from '@/components/ui/detail-view-dialog';

const ExpiredContractsPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const { contracts, updateContract, deleteContract } = useContracts();
  const expiredContracts = contracts.filter(c => c.status === 'expired');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [viewOpen, setViewOpen] = useState(false);

  const handleView = (item: any) => { setSelectedItem(item); setViewOpen(true); };
  const handleRenew = (id: string) => {
    const today = new Date();
    const newEnd = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
    updateContract(id, { status: 'active', startDate: today.toISOString().split('T')[0], endDate: newEnd.toISOString().split('T')[0] });
    toast({ title: 'Contract Renewed', description: 'Renewed for another year.' });
  };
  const handleArchive = (id: string) => {
    deleteContract(id);
    toast({ title: 'Contract Archived' });
  };

  const getTypeColor = (type: string) => ({ master: 'bg-blue-100 text-blue-800', service: 'bg-green-100 text-green-800', purchase: 'bg-purple-100 text-purple-800', framework: 'bg-orange-100 text-orange-800', nda: 'bg-gray-100 text-gray-800' }[type] || 'bg-gray-100 text-gray-800');

  const columns: any[] = [
    { key: 'title', header: 'Contract Title', sortable: true },
    { key: 'type', header: 'Type', render: (_: any, item: any) => <Badge className={getTypeColor(item.type)}>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</Badge> },
    { key: 'supplier', header: 'Supplier', sortable: true },
    { key: 'value', header: 'Value', render: (v: any, item: any) => `${item.currency} ${v.toLocaleString()}` },
    { key: 'endDate', header: 'Expired Date', sortable: true },
    { key: 'department', header: 'Department', sortable: true }
  ];

  const viewSections = selectedItem ? [
    { title: 'Expired Contract Details', fields: [
      { label: 'Contract ID', value: selectedItem.id },
      { label: 'Status', value: 'Expired', type: 'badge' as const, badgeColor: 'bg-red-100 text-red-800' },
      { label: 'Title', value: selectedItem.title, span: 2 },
      { label: 'Supplier', value: selectedItem.supplier },
      { label: 'Department', value: selectedItem.department },
      { label: 'Value', value: `${selectedItem.currency} ${selectedItem.value.toLocaleString()}` },
      { label: 'Owner', value: selectedItem.owner },
      { label: 'Start Date', value: selectedItem.startDate },
      { label: 'End Date', value: selectedItem.endDate },
      { label: 'Description', value: selectedItem.description, span: 2 },
    ]}
  ] : [];

  return (
    <ApplicationLayout pageTitle="Expired Contracts">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Expired Contracts</h2>
          <Badge className="bg-red-100 text-red-800"><AlertCircle className="h-4 w-4 mr-1" />{expiredContracts.length} Expired</Badge>
        </div>
        <Card>
          <CardHeader><CardTitle>Contract Renewal Management</CardTitle></CardHeader>
          <CardContent>
            <DataTable data={expiredContracts} columns={columns} searchTerm={searchTerm} onSearchChange={setSearchTerm}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" onClick={() => handleView(item)}><Eye className="h-4 w-4 mr-1" />View</Button>
                  <Button variant="outline" size="sm" className="text-blue-600" onClick={() => handleRenew(item.id)}><RotateCcw className="h-4 w-4 mr-1" />Renew</Button>
                  <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleArchive(item.id)}><Trash2 className="h-4 w-4 mr-1" />Archive</Button>
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

export default ExpiredContractsPage;