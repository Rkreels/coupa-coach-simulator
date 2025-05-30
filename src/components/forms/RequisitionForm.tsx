
import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Save, Send, X } from 'lucide-react';
import { Requisition, RequisitionLineItem } from '../../hooks/useRequisitions';

interface RequisitionFormProps {
  requisition?: Requisition;
  onSubmit: (data: Partial<Requisition>, action: 'save' | 'submit') => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export const RequisitionForm: React.FC<RequisitionFormProps> = ({
  requisition,
  onSubmit,
  onCancel,
  isEditing = false
}) => {
  const [action, setAction] = useState<'save' | 'submit'>('save');
  
  const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm<Requisition>({
    defaultValues: requisition || {
      title: '',
      department: '',
      description: '',
      justification: '',
      category: 'Office Supplies',
      priority: 'medium',
      currency: 'USD',
      totalAmount: 0,
      requestedDate: new Date().toISOString().split('T')[0],
      neededByDate: '',
      lineItems: [],
      attachments: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'lineItems'
  });

  const watchedLineItems = watch('lineItems');

  React.useEffect(() => {
    const total = watchedLineItems?.reduce((sum, item) => sum + (item.totalPrice || 0), 0) || 0;
    setValue('totalAmount', total);
  }, [watchedLineItems, setValue]);

  const handleFormSubmit = (data: Requisition) => {
    onSubmit(data, action);
  };

  const addLineItem = () => {
    append({
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
      category: 'General',
      needByDate: watch('neededByDate') || ''
    });
  };

  const updateLineItemTotal = (index: number) => {
    const quantity = watch(`lineItems.${index}.quantity`) || 0;
    const unitPrice = watch(`lineItems.${index}.unitPrice`) || 0;
    setValue(`lineItems.${index}.totalPrice`, quantity * unitPrice);
  };

  const categories = [
    'Office Supplies', 'IT Equipment', 'Software', 'Furniture', 
    'Marketing Materials', 'Travel', 'Professional Services', 'Other'
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
    { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800' }
  ];

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Header Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {isEditing ? 'Edit Requisition' : 'Create New Requisition'}
            {requisition?.status && (
              <Badge className={`${
                requisition.status === 'approved' ? 'bg-green-100 text-green-800' :
                requisition.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                requisition.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                'bg-red-100 text-red-800'
              }`}>
                {requisition.status.charAt(0).toUpperCase() + requisition.status.slice(1)}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <Input 
                {...register('title', { required: 'Title is required' })}
                placeholder="Enter requisition title"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Department *</label>
              <Input 
                {...register('department', { required: 'Department is required' })}
                placeholder="Enter department"
              />
              {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <Select onValueChange={(value) => setValue('category', value)} defaultValue={watch('category')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <Select onValueChange={(value) => setValue('priority', value as any)} defaultValue={watch('priority')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map(priority => (
                    <SelectItem key={priority.value} value={priority.value}>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${priority.color}`}>
                          {priority.label}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Needed By Date *</label>
              <Input 
                type="date"
                {...register('neededByDate', { required: 'Needed by date is required' })}
              />
              {errors.neededByDate && <p className="text-red-500 text-sm mt-1">{errors.neededByDate.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Currency</label>
              <Select onValueChange={(value) => setValue('currency', value)} defaultValue={watch('currency')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea 
              {...register('description')}
              placeholder="Enter description"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Business Justification *</label>
            <Textarea 
              {...register('justification', { required: 'Business justification is required' })}
              placeholder="Explain why this requisition is needed"
              rows={3}
            />
            {errors.justification && <p className="text-red-500 text-sm mt-1">{errors.justification.message}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Line Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Line Items
            <Button type="button" onClick={addLineItem} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Item
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {fields.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No line items added yet. Click "Add Item" to get started.</p>
          ) : (
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Item {index + 1}</h4>
                    <Button 
                      type="button" 
                      onClick={() => remove(index)} 
                      variant="ghost" 
                      size="sm"
                      className="text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-medium mb-1">Description *</label>
                      <Input 
                        {...register(`lineItems.${index}.description`, { required: true })}
                        placeholder="Item description"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Quantity *</label>
                      <Input 
                        type="number"
                        {...register(`lineItems.${index}.quantity`, { 
                          required: true, 
                          min: 1,
                          onChange: () => updateLineItemTotal(index)
                        })}
                        placeholder="1"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Unit Price *</label>
                      <Input 
                        type="number"
                        step="0.01"
                        {...register(`lineItems.${index}.unitPrice`, { 
                          required: true, 
                          min: 0,
                          onChange: () => updateLineItemTotal(index)
                        })}
                        placeholder="0.00"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Category</label>
                      <Select onValueChange={(value) => setValue(`lineItems.${index}.category`, value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Need By Date</label>
                      <Input 
                        type="date"
                        {...register(`lineItems.${index}.needByDate`)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Part Number</label>
                      <Input 
                        {...register(`lineItems.${index}.partNumber`)}
                        placeholder="Optional"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Total Price</label>
                      <Input 
                        type="number"
                        step="0.01"
                        {...register(`lineItems.${index}.totalPrice`)}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {fields.length > 0 && (
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Total Amount:</span>
                <span className="text-xl font-bold">${watch('totalAmount')?.toFixed(2) || '0.00'}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-between">
        <Button type="button" onClick={onCancel} variant="outline">
          <X className="h-4 w-4 mr-1" />
          Cancel
        </Button>
        
        <div className="flex gap-2">
          <Button 
            type="submit" 
            variant="outline"
            onClick={() => setAction('save')}
          >
            <Save className="h-4 w-4 mr-1" />
            Save as Draft
          </Button>
          
          <Button 
            type="submit"
            onClick={() => setAction('submit')}
          >
            <Send className="h-4 w-4 mr-1" />
            Submit for Approval
          </Button>
        </div>
      </div>
    </form>
  );
};
