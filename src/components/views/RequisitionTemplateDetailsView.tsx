
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, Copy, Play, Star, Users, Clock } from 'lucide-react';

interface RequisitionTemplateDetailsViewProps {
  template: any;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onUse: () => void;
}

export const RequisitionTemplateDetailsView: React.FC<RequisitionTemplateDetailsViewProps> = ({
  template,
  onEdit,
  onDelete,
  onDuplicate,
  onUse
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-semibold">{template.name}</h3>
            {template.isDefault && <Star className="h-5 w-5 text-yellow-500" />}
          </div>
          <p className="text-gray-600">{template.description}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={onUse} className="bg-green-600 hover:bg-green-700">
            <Play className="h-4 w-4 mr-2" />
            Use Template
          </Button>
          <Button variant="outline" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" onClick={onDuplicate}>
            <Copy className="h-4 w-4 mr-2" />
            Duplicate
          </Button>
          <Button variant="outline" onClick={onDelete} className="text-red-600">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Badge className="bg-purple-100 text-purple-800">{template.category}</Badge>
            </div>
            <p className="text-sm text-gray-500 mt-1">Category</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-gray-500" />
              <span className="font-semibold">{template.usageCount}</span>
            </div>
            <p className="text-sm text-gray-500">Times Used</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-gray-500" />
              <span className="font-semibold">{template.lastUsed || 'Never'}</span>
            </div>
            <p className="text-sm text-gray-500">Last Used</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Template Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Department</label>
              <p>{template.department}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Created By</label>
              <p>{template.createdBy}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Created Date</label>
              <p>{template.createdDate}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Estimated Total</label>
              <p className="font-semibold">{template.currency} {template.estimatedTotal.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {template.lineItems && template.lineItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Template Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {template.lineItems.map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-medium">{item.description}</p>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{template.currency} {item.estimatedPrice.toFixed(2)}</p>
                    {item.preferredSupplier && (
                      <p className="text-sm text-gray-500">{item.preferredSupplier}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
