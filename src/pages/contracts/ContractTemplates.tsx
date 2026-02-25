import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { useToast } from '@/hooks/use-toast';
import { FileText, Plus, Copy, Edit, Eye, Trash2 } from 'lucide-react';
import { DetailViewDialog } from '@/components/ui/detail-view-dialog';
import { FormDialog } from '@/components/ui/form-dialog';

interface ContractTemplate {
  id: string; name: string; type: string; description: string; category: string; usageCount: number; lastUsed: string; createdBy: string; createdDate: string; isDefault: boolean;
}

const ContractTemplatesPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [templates, setTemplates] = useState<ContractTemplate[]>([
    { id: 'TPL-001', name: 'Master Service Agreement', type: 'master', description: 'Standard master service agreement template for ongoing service relationships', category: 'Services', usageCount: 45, lastUsed: '2024-01-15', createdBy: 'System', createdDate: '2024-01-01', isDefault: true },
    { id: 'TPL-002', name: 'Purchase Order Template', type: 'purchase', description: 'Standard purchase order contract template for procurement activities', category: 'Procurement', usageCount: 78, lastUsed: '2024-01-20', createdBy: 'John Smith', createdDate: '2024-01-05', isDefault: true },
    { id: 'TPL-003', name: 'NDA Template', type: 'nda', description: 'Non-disclosure agreement for confidential partnerships', category: 'Legal', usageCount: 23, lastUsed: '2024-01-18', createdBy: 'Legal Team', createdDate: '2024-01-03', isDefault: false },
    { id: 'TPL-004', name: 'Framework Agreement', type: 'framework', description: 'Multi-year framework agreement for strategic suppliers', category: 'Strategic', usageCount: 12, lastUsed: '2024-01-10', createdBy: 'Procurement', createdDate: '2024-01-02', isDefault: false },
    { id: 'TPL-005', name: 'Service Level Agreement', type: 'service', description: 'SLA template with uptime and response time guarantees', category: 'IT Services', usageCount: 34, lastUsed: '2024-02-01', createdBy: 'IT Dept', createdDate: '2023-12-15', isDefault: true },
  ]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const handleView = (item: any) => { setSelectedItem(item); setViewOpen(true); };
  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setFormValues({ name: item.name, description: item.description, category: item.category, type: item.type });
    setEditOpen(true);
  };
  const handleEditSubmit = () => {
    if (selectedItem) {
      setTemplates(templates.map(t => t.id === selectedItem.id ? { ...t, ...formValues } : t));
      toast({ title: 'Template Updated' });
      setEditOpen(false);
    }
  };
  const handleDuplicate = (item: any) => {
    const newTemplate = { ...item, id: `TPL-${String(templates.length + 1).padStart(3, '0')}`, name: `${item.name} (Copy)`, isDefault: false, usageCount: 0 };
    setTemplates([...templates, newTemplate]);
    toast({ title: 'Template Duplicated', description: `${item.name} has been duplicated.` });
  };
  const handleDelete = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
    toast({ title: 'Template Deleted', variant: 'destructive' });
  };
  const handleUse = (item: any) => {
    setTemplates(templates.map(t => t.id === item.id ? { ...t, usageCount: t.usageCount + 1, lastUsed: new Date().toISOString().split('T')[0] } : t));
    toast({ title: 'Template Loaded', description: `${item.name} loaded for new contract.` });
  };

  const editFields = [
    { name: 'name', label: 'Template Name', type: 'text' as const, required: true },
    { name: 'category', label: 'Category', type: 'text' as const, required: true },
    { name: 'type', label: 'Type', type: 'select' as const, options: [
      { value: 'master', label: 'Master' }, { value: 'service', label: 'Service' }, { value: 'purchase', label: 'Purchase' }, { value: 'framework', label: 'Framework' }, { value: 'nda', label: 'NDA' }
    ]},
    { name: 'description', label: 'Description', type: 'textarea' as const }
  ];

  const getTypeColor = (type: string) => ({ master: 'bg-blue-100 text-blue-800', service: 'bg-green-100 text-green-800', purchase: 'bg-purple-100 text-purple-800', framework: 'bg-orange-100 text-orange-800', nda: 'bg-gray-100 text-gray-800' }[type] || 'bg-gray-100 text-gray-800');

  const columns: any[] = [
    { key: 'name', header: 'Template Name', sortable: true, render: (value: any, item: any) => <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-gray-400" /><span>{value}</span>{item.isDefault && <Badge variant="outline" className="text-xs">Default</Badge>}</div> },
    { key: 'type', header: 'Type', render: (_: any, item: any) => <Badge className={getTypeColor(item.type)}>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</Badge> },
    { key: 'category', header: 'Category', sortable: true },
    { key: 'usageCount', header: 'Usage', sortable: true },
    { key: 'lastUsed', header: 'Last Used', sortable: true },
    { key: 'createdBy', header: 'Created By', sortable: true }
  ];

  const viewSections = selectedItem ? [
    { title: 'Template Details', fields: [
      { label: 'Template ID', value: selectedItem.id },
      { label: 'Type', value: selectedItem.type, type: 'badge' as const, badgeColor: getTypeColor(selectedItem.type) },
      { label: 'Name', value: selectedItem.name, span: 2 },
      { label: 'Category', value: selectedItem.category },
      { label: 'Default', value: selectedItem.isDefault ? 'Yes' : 'No' },
      { label: 'Description', value: selectedItem.description, span: 2 },
    ]},
    { title: 'Usage Statistics', fields: [
      { label: 'Usage Count', value: selectedItem.usageCount },
      { label: 'Last Used', value: selectedItem.lastUsed },
      { label: 'Created By', value: selectedItem.createdBy },
      { label: 'Created Date', value: selectedItem.createdDate },
    ]}
  ] : [];

  return (
    <ApplicationLayout pageTitle="Contract Templates">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Contract Templates</h2>
          <div className="flex gap-2">
            <Badge className="bg-blue-100 text-blue-800"><FileText className="h-4 w-4 mr-1" />{templates.length} Templates</Badge>
            <Button onClick={() => { setSelectedItem(null); setFormValues({ name: '', description: '', category: '', type: 'service' }); setEditOpen(true); }}><Plus className="h-4 w-4 mr-2" />Create Template</Button>
          </div>
        </div>
        <Card>
          <CardHeader><CardTitle>Template Library</CardTitle></CardHeader>
          <CardContent>
            <DataTable data={templates} columns={columns} searchTerm={searchTerm} onSearchChange={setSearchTerm}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" onClick={() => handleView(item)}><Eye className="h-4 w-4 mr-1" />Preview</Button>
                  <Button variant="outline" size="sm" className="text-blue-600" onClick={() => handleUse(item)}>Use</Button>
                  <Button variant="outline" size="sm" onClick={() => handleDuplicate(item)}><Copy className="h-4 w-4 mr-1" />Duplicate</Button>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(item)}><Edit className="h-4 w-4 mr-1" />Edit</Button>
                  {!item.isDefault && <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4" /></Button>}
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>
      <DetailViewDialog open={viewOpen} onOpenChange={setViewOpen} title={selectedItem?.name || ''} subtitle={selectedItem?.id} sections={viewSections} />
      <FormDialog open={editOpen} onOpenChange={setEditOpen} title={selectedItem ? `Edit Template - ${selectedItem.id}` : 'Create New Template'} fields={editFields} values={formValues} onValuesChange={setFormValues} onSubmit={handleEditSubmit} submitText={selectedItem ? 'Update' : 'Create'} />
    </ApplicationLayout>
  );
};

export default ContractTemplatesPage;