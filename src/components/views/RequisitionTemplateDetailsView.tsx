
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Edit, Trash2, Copy, Play, Star, Users, Clock, FileText } from 'lucide-react';

const RequisitionTemplateDetailsView = ({ 
  template, 
  onEdit, 
  onDelete, 
  onDuplicate, 
  onUse 
}) => {
  if (!template) return null;

  const totalTemplateValue = template.templateData.lineItems.reduce(
    (sum, item) => sum + (item.quantity * item.unitPrice), 
    0
  );

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Template Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold">{template.name}</h3>
            {template.isDefault && <Star className="h-5 w-5 text-yellow-500" />}
          </div>
          <p className="text-gray-600">{template.description}</p>
          <div className="flex gap-2">
            <Badge className="bg-purple-100 text-purple-800">
              {template.category}
            </Badge>
            <Badge className="bg-blue-100 text-blue-800">
              {template.department}
            </Badge>
            <Badge className={template.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
              {template.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={onUse} className="bg-green-600 hover:bg-green-700">
            <Play className="h-4 w-4 mr-2" />
            Use Template
          </Button>
          <Button variant="outline" onClick={onDuplicate}>
            <Copy className="h-4 w-4 mr-2" />
            Duplicate
          </Button>
          <Button variant="outline" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" onClick={onDelete} className="text-red-600 hover:text-red-700">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <Separator />

      {/* Template Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Usage Count</p>
                <p className="text-xl font-bold">{template.usageCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Last Used</p>
                <p className="text-xl font-bold">{template.lastUsed || 'Never'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-500">Template Value</p>
                <p className="text-xl font-bold">${totalTemplateValue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Template Content */}
      <Card>
        <CardHeader>
          <CardTitle>Template Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Default Title</label>
              <p className="text-sm">{template.templateData.title || 'No default title'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Default Priority</label>
              <div className="mt-1">
                <Badge className={getPriorityColor(template.templateData.priority)}>
                  {template.templateData.priority.charAt(0).toUpperCase() + template.templateData.priority.slice(1)}
                </Badge>
              </div>
            </div>
          </div>
          
          {template.templateData.description && (
            <div>
              <label className="text-sm font-medium text-gray-500">Default Description</label>
              <p className="text-sm mt-1">{template.templateData.description}</p>
            </div>
          )}
          
          {template.templateData.justification && (
            <div>
              <label className="text-sm font-medium text-gray-500">Default Justification</label>
              <p className="text-sm mt-1">{template.templateData.justification}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Line Items */}
      <Card>
        <CardHeader>
          <CardTitle>Template Line Items ({template.templateData.lineItems.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {template.templateData.lineItems.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No default line items configured</p>
          ) : (
            <div className="space-y-3">
              {template.templateData.lineItems.map((item, index) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.description}</h4>
                      <div className="flex gap-4 mt-2 text-sm text-gray-600">
                        <span>Qty: {item.quantity}</span>
                        <span>Unit Price: ${item.unitPrice.toFixed(2)}</span>
                        <span>Total: ${(item.quantity * item.unitPrice).toFixed(2)}</span>
                      </div>
                      {item.category && (
                        <Badge className="bg-gray-100 text-gray-800 mt-2">
                          {item.category}
                        </Badge>
                      )}
                      {item.specifications && (
                        <p className="text-sm text-gray-600 mt-2">
                          Specifications: {item.specifications}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="border-t pt-3 mt-4">
                <div className="flex justify-between items-center font-medium">
                  <span>Total Template Value:</span>
                  <span>${totalTemplateValue.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Template Metadata */}
      <Card>
        <CardHeader>
          <CardTitle>Template Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <label className="font-medium text-gray-500">Created By</label>
              <p>{template.createdBy}</p>
            </div>
            <div>
              <label className="font-medium text-gray-500">Created Date</label>
              <p>{template.createdDate}</p>
            </div>
            <div>
              <label className="font-medium text-gray-500">Last Modified</label>
              <p>{template.lastModified}</p>
            </div>
            <div>
              <label className="font-medium text-gray-500">Template ID</label>
              <p className="font-mono">{template.id}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { RequisitionTemplateDetailsView };
