
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Save, Send } from 'lucide-react';

interface RequisitionFormProps {
  onSubmit: (data: any, action: 'save' | 'submit') => void;
  onCancel: () => void;
  isEditing: boolean;
  initialData?: any;
}

export const RequisitionForm: React.FC<RequisitionFormProps> = ({
  onSubmit,
  onCancel,
  isEditing,
  initialData
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    justification: initialData?.justification || '',
    department: initialData?.department || '',
    category: initialData?.category || '',
    priority: initialData?.priority || 'medium',
    neededByDate: initialData?.neededByDate || '',
    supplier: initialData?.supplier || '',
    currency: initialData?.currency || 'USD',
    lineItems: initialData?.lineItems || [
      {
        id: '1',
        description: '',
        quantity: 1,
        unitPrice: 0,
        totalPrice: 0,
        category: '',
        needByDate: ''
      }
    ]
  });

  const addLineItem = () => {
    const newItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
      category: '',
      needByDate: ''
    };
    setFormData({
      ...formData,
      lineItems: [...formData.lineItems, newItem]
    });
  };

  const removeLineItem = (id: string) => {
    setFormData({
      ...formData,
      lineItems: formData.lineItems.filter(item => item.id !== id)
    });
  };

  const updateLineItem = (id: string, field: string, value: any) => {
    const updatedItems = formData.lineItems.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitPrice') {
          updated.totalPrice = updated.quantity * updated.unitPrice;
        }
        return updated;
      }
      return item;
    });
    setFormData({ ...formData, lineItems: updatedItems });
  };

  const calculateTotal = () => {
    return formData.lineItems.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  const handleSubmit = (action: 'save' | 'submit') => {
    const totalAmount = calculateTotal();
    onSubmit({ ...formData, totalAmount }, action);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Requisition Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter requisition title"
          />
        </div>
        <div>
          <Label htmlFor="department">Department</Label>
          <Input
            id="department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            placeholder="Enter department"
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Office Supplies">Office Supplies</SelectItem>
              <SelectItem value="IT Equipment">IT Equipment</SelectItem>
              <SelectItem value="Facilities">Facilities</SelectItem>
              <SelectItem value="Services">Services</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="priority">Priority</Label>
          <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="neededByDate">Needed By Date</Label>
          <Input
            id="neededByDate"
            type="date"
            value={formData.neededByDate}
            onChange={(e) => setFormData({ ...formData, neededByDate: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="supplier">Preferred Supplier</Label>
          <Input
            id="supplier"
            value={formData.supplier}
            onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
            placeholder="Enter supplier name"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter detailed description"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="justification">Justification</Label>
        <Textarea
          id="justification"
          value={formData.justification}
          onChange={(e) => setFormData({ ...formData, justification: e.target.value })}
          placeholder="Enter business justification"
          rows={3}
        />
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Line Items</CardTitle>
            <Button type="button" onClick={addLineItem} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {formData.lineItems.map((item, index) => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-2 p-4 border rounded-lg">
                <div className="md:col-span-2">
                  <Input
                    placeholder="Item description"
                    value={item.description}
                    onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) => updateLineItem(item.id, 'quantity', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="Unit Price"
                    value={item.unitPrice}
                    onChange={(e) => updateLineItem(item.id, 'unitPrice', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Input
                    placeholder="Total"
                    value={item.totalPrice.toFixed(2)}
                    readOnly
                    className="bg-gray-100"
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLineItem(item.id)}
                    className="text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-right">
            <p className="text-lg font-semibold">
              Total: {formData.currency} {calculateTotal().toFixed(2)}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" variant="outline" onClick={() => handleSubmit('save')}>
          <Save className="h-4 w-4 mr-2" />
          Save Draft
        </Button>
        <Button type="button" onClick={() => handleSubmit('submit')}>
          <Send className="h-4 w-4 mr-2" />
          Submit for Approval
        </Button>
      </div>
    </div>
  );
};
