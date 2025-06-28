
import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { useToast } from '@/hooks/use-toast';
import { FileText, Plus, Copy, Edit, Eye, Trash2 } from 'lucide-react';

interface ContractTemplate {
  id: string;
  name: string;
  type: string;
  description: string;
  category: string;
  usageCount: number;
  lastUsed: string;
  createdBy: string;
  createdDate: string;
  isDefault: boolean;
}

const ContractTemplatesPage = () => {
  const { toast } = useToast();
  const [templates] = useState<ContractTemplate[]>([
    {
      id: 'TPL-001',
      name: 'Master Service Agreement',
      type: 'master',
      description: 'Standard master service agreement template',
      category: 'Services',
      usageCount: 45,
      lastUsed: '2024-01-15',
      createdBy: 'System',
      createdDate: '2024-01-01',
      isDefault: true
    },
    {
      id: 'TPL-002',
      name: 'Purchase Order Template',
      type: 'purchase',
      description: 'Standard purchase order contract template',
      category: 'Procurement',
      usageCount: 78,
      lastUsed: '2024-01-20',
      createdBy: 'John Smith',
      createdDate: '2024-01-05',
      isDefault: true
    },
    {
      id: 'TPL-003',
      name: 'NDA Template',
      type: 'nda',
      description: 'Non-disclosure agreement template',
      category: 'Legal',
      usageCount: 23,
      lastUsed: '2024-01-18',
      createdBy: 'Legal Team',
      createdDate: '2024-01-03',
      isDefault: false
    }
  ]);

  const handleUseTemplate = (templateId: string) => {
    toast({
      title: 'Template Selected',
      description: 'Contract template has been loaded for use.'
    });
  };

  const handleDuplicate = (templateId: string) => {
    toast({
      title: 'Template Duplicated',
      description: 'Template has been duplicated successfully.'
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

  const columns = [
    { 
      key: 'name', 
      header: 'Template Name', 
      sortable: true,
      render: (value, item) => (
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-gray-400" />
          <span>{value}</span>
          {item.isDefault && (
            <Badge variant="outline" className="text-xs">Default</Badge>
          )}
        </div>
      )
    },
    {
      key: 'type',
      header: 'Type',
      render: (value, item) => (
        <Badge className={getTypeColor(item.type)}>
          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
        </Badge>
      )
    },
    { key: 'category', header: 'Category', sortable: true },
    { key: 'usageCount', header: 'Usage Count', sortable: true },
    { key: 'lastUsed', header: 'Last Used', sortable: true },
    { key: 'createdBy', header: 'Created By', sortable: true }
  ];

  return (
    <ApplicationLayout pageTitle="Contract Templates">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Contract Templates</h2>
          <div className="flex gap-2">
            <Badge className="bg-blue-100 text-blue-800">
              <FileText className="h-4 w-4 mr-1" />
              {templates.length} Templates
            </Badge>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Template Library</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={templates}
              columns={columns}
              searchTerm=""
              onSearchChange={() => {}}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-blue-600"
                    onClick={() => handleUseTemplate(item.id)}
                  >
                    Use Template
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDuplicate(item.id)}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Duplicate
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  {!item.isDefault && (
                    <Button variant="outline" size="sm" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
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

export default ContractTemplatesPage;
