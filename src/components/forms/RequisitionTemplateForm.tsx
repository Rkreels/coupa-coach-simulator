import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2 } from 'lucide-react';

const RequisitionTemplateForm = ({ template, onSubmit, onCancel, isEditing }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    department: '',
    isDefault: false,
    isActive: true,
    templateData: {
      title: '',
      description: '',
      justification: '',
      priority: 'medium',
      category: '',
      lineItems: [],
      approvalWorkflow: [],
      notifications: [],
      customFields: {}
    }
  });

  useEffect(() => {
    if (template && isEditing) {
      setFormData(template);
    }
  }, [template, isEditing]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTemplateDataChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      templateData: {
        ...prev.templateData,
        [field]: value
      }
    }));
  };

  const addLineItem = () => {
    const newLineItem = {
      id: `LI-${Date.now()}`,
      description: '',
      quantity: 1,
      unitPrice: 0,
      category: '',
      supplier: '',
      partNumber: '',
      specifications: ''
    };

    handleTemplateDataChange('lineItems', [
      ...formData.templateData.lineItems,
      newLineItem
    ]);
  };

  const updateLineItem = (index, field, value) => {
    const updatedLineItems = [...formData.templateData.lineItems];
    updatedLineItems[index] = {
      ...updatedLineItems[index],
      [field]: value
    };
    handleTemplateDataChange('lineItems', updatedLineItems);
  };

  const removeLineItem = (index) => {
    const updatedLineItems = formData.templateData.lineItems.filter((_, i) => i !== index);
    handleTemplateDataChange('lineItems', updatedLineItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const templateData = {
      ...formData,
      createdBy: isEditing ? (template?.createdBy || 'Current User') : 'Current User'
    };
    
    onSubmit(templateData);
  };

  const categories = [
    'Office Supplies',
    'IT Equipment',
    'Marketing',
    'Facilities',
    'Travel',
    'Training',
    'Software',
    'Hardware',
    'Services',
    'Other'
  ];

  const departments = [
    'General',
    'IT',
    'Marketing',
    'Sales',
    'Finance',
    'HR',
    'Operations',
    'Legal',
    'R&D'
  ];

  const priorities = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Template Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Template Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Template Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter template name"
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter template description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="department">Department</Label>
              <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="isDefault"
                  checked={formData.isDefault}
                  onCheckedChange={(checked) => handleInputChange('isDefault', checked)}
                />
                <Label htmlFor="isDefault">Default Template</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => handleInputChange('isActive', checked)}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Template Content */}
      <Card>
        <CardHeader>
          <CardTitle>Template Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="templateTitle">Default Title</Label>
              <Input
                id="templateTitle"
                value={formData.templateData.title}
                onChange={(e) => handleTemplateDataChange('title', e.target.value)}
                placeholder="Default requisition title"
              />
            </div>
            <div>
              <Label htmlFor="priority">Default Priority</Label>
              <Select 
                value={formData.templateData.priority} 
                onValueChange={(value) => handleTemplateDataChange('priority', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map(priority => (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="templateDescription">Default Description</Label>
            <Textarea
              id="templateDescription"
              value={formData.templateData.description}
              onChange={(e) => handleTemplateDataChange('description', e.target.value)}
              placeholder="Default requisition description"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="justification">Default Justification</Label>
            <Textarea
              id="justification"
              value={formData.templateData.justification}
              onChange={(e) => handleTemplateDataChange('justification', e.target.value)}
              placeholder="Default business justification"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Line Items */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Default Line Items</CardTitle>
            <Button type="button" onClick={addLineItem} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {formData.templateData.lineItems.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No line items added. Click "Add Item" to create template line items.
            </p>
          ) : (
            <div className="space-y-4">
              {formData.templateData.lineItems.map((item, index) => (
                <div key={item.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <Badge>Item {index + 1}</Badge>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLineItem(index)}
                      className="text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Description</Label>
                      <Input
                        value={item.description}
                        onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                        placeholder="Item description"
                      />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Input
                        value={item.category}
                        onChange={(e) => updateLineItem(index, 'category', e.target.value)}
                        placeholder="Item category"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateLineItem(index, 'quantity', parseInt(e.target.value) || 0)}
                        min="1"
                      />
                    </div>
                    <div>
                      <Label>Unit Price</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => updateLineItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                        min="0"
                      />
                    </div>
                    <div>
                      <Label>Total</Label>
                      <Input
                        value={`$${(item.quantity * item.unitPrice).toFixed(2)}`}
                        disabled
                        className="bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {isEditing ? 'Update Template' : 'Create Template'}
        </Button>
      </div>
    </form>
  );
};

export { RequisitionTemplateForm };
