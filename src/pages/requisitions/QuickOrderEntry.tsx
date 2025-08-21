import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useEnterpriseRequisitions } from '../../hooks/useEnterpriseRequisitions';
import { useToast } from '@/hooks/use-toast';
import { Plus, X, ShoppingCart, Save, Send } from 'lucide-react';

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category: string;
  supplier?: string;
}

const QuickOrderEntryPage = () => {
  const { addRequisition } = useEnterpriseRequisitions();
  const { toast } = useToast();
  
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: '1', description: '', quantity: 1, unitPrice: 0, totalPrice: 0, category: '', supplier: '' }
  ]);
  
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    costCenter: '',
    neededByDate: '',
    businessJustification: '',
    priority: 'medium'
  });

  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
      category: '',
      supplier: ''
    };
    setLineItems([...lineItems, newItem]);
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter(item => item.id !== id));
    }
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(items => items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitPrice') {
          updated.totalPrice = updated.quantity * updated.unitPrice;
        }
        return updated;
      }
      return item;
    }));
  };

  const totalAmount = lineItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleSubmit = (action: 'save' | 'submit') => {
    if (!formData.title || !formData.department || lineItems.some(item => !item.description)) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    const requisitionData = {
      title: formData.title,
      description: formData.businessJustification,
      status: (action === 'save' ? 'draft' : 'submitted') as any,
      businessJustification: formData.businessJustification,
      requestorId: 'current-user',
      requestor: {
        id: 'current-user',
        firstName: 'Current',
        lastName: 'User',
        email: 'user@company.com',
        displayName: 'Current User'
      } as any,
      departmentId: 'dept-1',
      department: {
        id: 'dept-1',
        name: formData.department,
        code: formData.department.toUpperCase()
      } as any,
      costCenterId: 'cc-1',
      costCenter: {
        id: 'cc-1',
        name: formData.costCenter || 'Default',
        code: (formData.costCenter || 'DEFAULT').toUpperCase()
      } as any,
      currency: 'USD',
      totalAmount,
      taxAmount: 0,
      shippingAmount: 0,
      discountAmount: 0,
      netAmount: totalAmount,
      urgency: (formData.priority === 'urgent' ? 'critical' : formData.priority) as 'low' | 'medium' | 'high' | 'critical',
      needByDate: formData.neededByDate || new Date().toISOString().split('T')[0],
      deliveryAddress: {} as any,
      billToAddress: {} as any,
      shipToAddress: {} as any,
      approvalPath: [],
      lineItems: lineItems.filter(item => item.description).map((item, index) => ({
        id: `item-${Date.now()}-${index}`,
        lineNumber: index + 1,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
        unitOfMeasure: 'EA',
        status: 'pending' as const,
        category: { id: 'cat-1', name: item.category || 'General' } as any,
        supplier: { id: 'sup-1', name: item.supplier || 'TBD' } as any,
        needByDate: formData.neededByDate || new Date().toISOString().split('T')[0],
        currency: 'USD',
        taxAmount: 0,
        discountAmount: 0,
        netAmount: item.totalPrice
      })) as any,
      attachments: [],
      comments: [],
      tags: [],
      customFields: [],
      isTemplate: false
    };

    addRequisition(requisitionData);
    
    toast({
      title: action === 'save' ? 'Quick Order Saved' : 'Quick Order Submitted',
      description: `Quick order has been ${action === 'save' ? 'saved as draft' : 'submitted for approval'}.`
    });

    // Reset form
    setFormData({
      title: '',
      department: '',
      costCenter: '',
      neededByDate: '',
      businessJustification: '',
      priority: 'medium'
    });
    setLineItems([
      { id: '1', description: '', quantity: 1, unitPrice: 0, totalPrice: 0, category: '', supplier: '' }
    ]);
  };

  return (
    <ApplicationLayout pageTitle="Quick Order Entry">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Quick Order Entry</h2>
          <div className="text-lg font-semibold">
            Total: USD {totalAmount.toLocaleString()}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Details */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Order Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Quick order description"
                  />
                </div>

                <div>
                  <Label htmlFor="department">Department *</Label>
                  <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="costCenter">Cost Center</Label>
                  <Input
                    id="costCenter"
                    value={formData.costCenter}
                    onChange={(e) => setFormData({...formData, costCenter: e.target.value})}
                    placeholder="Cost center code"
                  />
                </div>

                <div>
                  <Label htmlFor="neededBy">Needed By Date</Label>
                  <Input
                    id="neededBy"
                    type="date"
                    value={formData.neededByDate}
                    onChange={(e) => setFormData({...formData, neededByDate: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
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
                  <Label htmlFor="justification">Business Justification</Label>
                  <Textarea
                    id="justification"
                    value={formData.businessJustification}
                    onChange={(e) => setFormData({...formData, businessJustification: e.target.value})}
                    placeholder="Explain the business need for this order"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Line Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Line Items</CardTitle>
                  <Button onClick={addLineItem} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lineItems.map((item, index) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium">Item {index + 1}</h4>
                        {lineItems.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeLineItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <Label>Description *</Label>
                          <Input
                            value={item.description}
                            onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                            placeholder="Item description"
                          />
                        </div>

                        <div>
                          <Label>Category</Label>
                          <Select value={item.category} onValueChange={(value) => updateLineItem(item.id, 'category', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="IT Hardware">IT Hardware</SelectItem>
                              <SelectItem value="IT Software">IT Software</SelectItem>
                              <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                              <SelectItem value="Office Furniture">Office Furniture</SelectItem>
                              <SelectItem value="Services">Services</SelectItem>
                              <SelectItem value="Travel">Travel</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Supplier</Label>
                          <Input
                            value={item.supplier || ''}
                            onChange={(e) => updateLineItem(item.id, 'supplier', e.target.value)}
                            placeholder="Preferred supplier"
                          />
                        </div>

                        <div>
                          <Label>Quantity</Label>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateLineItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                          />
                        </div>

                        <div>
                          <Label>Unit Price (USD)</Label>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.unitPrice}
                            onChange={(e) => updateLineItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <Label>Total Price</Label>
                          <div className="text-lg font-semibold text-right">
                            USD {item.totalPrice.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mt-6">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Order Total:</span>
                    <span>USD {totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => handleSubmit('save')}
                    className="flex-1"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save as Draft
                  </Button>
                  <Button
                    onClick={() => handleSubmit('submit')}
                    className="flex-1"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit for Approval
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ApplicationLayout>
  );
};

export default QuickOrderEntryPage;