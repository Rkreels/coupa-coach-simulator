import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useRequisitionTemplates } from '../../hooks/useRequisitionTemplates';
import { RequisitionTemplateForm } from '../../components/forms/RequisitionTemplateForm';
import { RequisitionTemplateDetailsView } from '../../components/views/RequisitionTemplateDetailsView';
import { Plus, Search, Eye, Edit, Trash2, Copy, FileText, Clock, Users, Star } from 'lucide-react';

const TemplatesPage = () => {
  const { toast } = useToast();
  const {
    templates,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    getTemplate,
    getMetrics,
    duplicateTemplate,
    useTemplate
  } = useRequisitionTemplates();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const metrics = getMetrics();

  const handleCreateTemplate = (data) => {
    const newTemplate = addTemplate(data);
    setDialogOpen(false);
    
    toast({
      title: 'Template Created',
      description: `Template "${newTemplate.name}" has been created successfully.`
    });
  };

  const handleUpdateTemplate = (data) => {
    if (!selectedTemplate) return;
    
    updateTemplate(selectedTemplate.id, data);
    setDialogOpen(false);
    setDetailsOpen(false);
    setSelectedTemplate(null);
    setIsEditing(false);
    
    toast({
      title: 'Template Updated',
      description: `Template "${data.name}" has been updated.`
    });
  };

  const handleDeleteTemplate = (template) => {
    deleteTemplate(template.id);
    setDetailsOpen(false);
    setSelectedTemplate(null);
    
    toast({
      title: 'Template Deleted',
      description: `Template "${template.name}" has been deleted.`,
      variant: 'destructive'
    });
  };

  const handleDuplicateTemplate = (template) => {
    const duplicated = duplicateTemplate(template.id);
    
    toast({
      title: 'Template Duplicated',
      description: `Template "${duplicated.name}" has been created.`
    });
  };

  const handleUseTemplate = (template) => {
    useTemplate(template.id);
    
    toast({
      title: 'Template Applied',
      description: `Using template "${template.name}" to create new requisition.`
    });
  };

  const openDetails = (template) => {
    setSelectedTemplate(template);
    setDetailsOpen(true);
  };

  const openEdit = (template = null) => {
    setSelectedTemplate(template);
    setIsEditing(!!template);
    setDialogOpen(true);
    if (template) setDetailsOpen(false);
  };

  const columns = [
    { 
      key: 'name',
      header: 'Template Name', 
      sortable: true,
      render: (value, item) => (
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-blue-500" />
          <div>
            <span className="font-medium">{value}</span>
            {item.isDefault && <Star className="h-3 w-3 text-yellow-500 inline ml-1" />}
          </div>
        </div>
      )
    },
    { 
      key: 'category', 
      header: 'Category',
      render: (value) => (
        <Badge className="bg-purple-100 text-purple-800">
          {value}
        </Badge>
      )
    },
    { 
      key: 'department', 
      header: 'Department',
      render: (value) => (
        <Badge className="bg-blue-100 text-blue-800">
          {value}
        </Badge>
      )
    },
    { 
      key: 'usageCount', 
      header: 'Usage Count',
      render: (value) => (
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4 text-gray-500" />
          <span>{value}</span>
        </div>
      )
    },
    { 
      key: 'lastUsed', 
      header: 'Last Used',
      render: (value) => (
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4 text-gray-500" />
          <span>{value || 'Never'}</span>
        </div>
      )
    },
    { key: 'createdBy', header: 'Created By', sortable: true }
  ];

  return (
    <ApplicationLayout pageTitle="Requisition Templates">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Requisition Templates</h2>
          <Button onClick={() => openEdit()}>
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </Button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Total Templates</p>
                  <p className="text-2xl font-bold">{metrics.totalTemplates}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500">Most Used</p>
                  <p className="text-2xl font-bold">{metrics.mostUsedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-500">Default Templates</p>
                  <p className="text-2xl font-bold">{metrics.defaultTemplates}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-500">Avg Usage/Month</p>
                  <p className="text-2xl font-bold">{metrics.avgUsagePerMonth}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Templates Table */}
        <Card>
          <CardContent className="p-0">
            <DataTable
              data={templates}
              columns={columns}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onRowClick={openDetails}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      openDetails(item);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUseTemplate(item);
                    }}
                    className="text-green-600"
                  >
                    Use
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDuplicateTemplate(item);
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEdit(item);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTemplate(item);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Edit Template' : 'Create New Template'}
            </DialogTitle>
          </DialogHeader>
          <RequisitionTemplateForm
            template={selectedTemplate}
            onSubmit={isEditing ? handleUpdateTemplate : handleCreateTemplate}
            onCancel={() => {
              setDialogOpen(false);
              setSelectedTemplate(null);
              setIsEditing(false);
            }}
            isEditing={isEditing}
          />
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Template Details</DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <RequisitionTemplateDetailsView
              template={selectedTemplate}
              onEdit={() => openEdit(selectedTemplate)}
              onDelete={() => handleDeleteTemplate(selectedTemplate)}
              onDuplicate={() => handleDuplicateTemplate(selectedTemplate)}
              onUse={() => handleUseTemplate(selectedTemplate)}
            />
          )}
        </DialogContent>
      </Dialog>
    </ApplicationLayout>
  );
};

export default TemplatesPage;
