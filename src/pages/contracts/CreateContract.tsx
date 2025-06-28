
import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useContracts } from '../../hooks/useContracts';
import { useToast } from '@/hooks/use-toast';
import { Save, Send, FileText } from 'lucide-react';

const CreateContractPage = () => {
  const { addContract } = useContracts();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    type: 'service' as const,
    supplier: '',
    supplierId: '',
    value: '',
    currency: 'USD',
    startDate: '',
    endDate: '',
    department: '',
    owner: 'Current User',
    description: '',
    terms: [] as string[],
    autoRenewal: false,
    notificationDays: '90',
    riskLevel: 'low' as const,
    notes: ''
  });

  const [newTerm, setNewTerm] = useState('');

  const handleAddTerm = () => {
    if (newTerm.trim()) {
      setFormData({
        ...formData,
        terms: [...formData.terms, newTerm.trim()]
      });
      setNewTerm('');
    }
  };

  const handleRemoveTerm = (index: number) => {
    setFormData({
      ...formData,
      terms: formData.terms.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (action: 'save' | 'submit') => {
    const contractData = {
      ...formData,
      status: action === 'save' ? 'draft' as const : 'pending' as const,
      value: Number(formData.value) || 0,
      notificationDays: Number(formData.notificationDays) || 90,
      attachments: [],
      complianceStatus: 'under-review' as const,
      createdDate: new Date().toISOString().split('T')[0]
    };

    addContract(contractData);
    
    toast({
      title: action === 'save' ? 'Contract Saved' : 'Contract Submitted',
      description: `Contract has been ${action === 'save' ? 'saved as draft' : 'submitted for approval'}.`
    });
  };

  return (
    <ApplicationLayout pageTitle="Create Contract">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Create New Contract</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleSubmit('save')}>
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button onClick={() => handleSubmit('submit')}>
              <Send className="h-4 w-4 mr-2" />
              Submit for Approval
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Contract Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter contract title"
                  required
                />
              </div>
              <div>
                <Label htmlFor="type">Contract Type</Label>
                <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="purchase">Purchase Agreement</SelectItem>
                    <SelectItem value="service">Service Agreement</SelectItem>
                    <SelectItem value="master">Master Agreement</SelectItem>
                    <SelectItem value="framework">Framework Contract</SelectItem>
                    <SelectItem value="nda">Non-Disclosure Agreement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="supplier">Supplier</Label>
                <Input
                  id="supplier"
                  value={formData.supplier}
                  onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  placeholder="Enter supplier name"
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Financial & Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="value">Contract Value</Label>
                  <Input
                    id="value"
                    type="number"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="riskLevel">Risk Level</Label>
                <Select value={formData.riskLevel} onValueChange={(value: any) => setFormData({ ...formData, riskLevel: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Contract Terms & Conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the contract purpose and scope..."
                  rows={3}
                />
              </div>
              <div>
                <Label>Contract Terms</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTerm}
                    onChange={(e) => setNewTerm(e.target.value)}
                    placeholder="Add contract term..."
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTerm()}
                  />
                  <Button type="button" onClick={handleAddTerm}>Add</Button>
                </div>
                <div className="space-y-2">
                  {formData.terms.map((term, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm">{term}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveTerm(index)}
                        className="text-red-600"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="autoRenewal"
                  checked={formData.autoRenewal}
                  onCheckedChange={(checked) => setFormData({ ...formData, autoRenewal: !!checked })}
                />
                <Label htmlFor="autoRenewal">Enable auto-renewal</Label>
              </div>
              <div>
                <Label htmlFor="notificationDays">Notification Days Before Expiry</Label>
                <Input
                  id="notificationDays"
                  type="number"
                  value={formData.notificationDays}
                  onChange={(e) => setFormData({ ...formData, notificationDays: e.target.value })}
                  placeholder="90"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ApplicationLayout>
  );
};

export default CreateContractPage;
