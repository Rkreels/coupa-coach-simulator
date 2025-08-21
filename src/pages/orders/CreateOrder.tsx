
import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useEnterpriseOrders } from '../../hooks/useEnterpriseOrders';
import { useToast } from '@/hooks/use-toast';
import { Save, Send, Plus, X, MapPin, Building, User, FileText, Truck } from 'lucide-react';

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category: string;
}

interface AddressForm {
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const CreateOrderPage = () => {
  const { addOrder } = useEnterpriseOrders();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    supplierId: '',
    supplierName: '',
    type: 'standard',
    currency: 'USD',
    requestedDeliveryDate: '',
    department: '',
    urgency: 'medium',
    paymentTerms: 'Net 30',
    shippingMethod: 'Standard Ground',
    notes: ''
  });

  const [billToAddress, setBillToAddress] = useState<AddressForm>({
    name: 'Accounts Payable Department',
    addressLine1: '123 Corporate Plaza',
    addressLine2: 'Suite 100',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'US'
  });

  const [shipToAddress, setShipToAddress] = useState<AddressForm>({
    name: 'Main Office - Receiving',
    addressLine1: '123 Corporate Plaza',
    addressLine2: 'Loading Dock A',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'US'
  });

  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: '1', description: '', quantity: 1, unitPrice: 0, totalPrice: 0, category: '' }
  ]);

  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
      category: ''
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

  const subtotalAmount = lineItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const taxAmount = subtotalAmount * 0.08; // 8% tax
  const shippingAmount = 50.00; // Fixed shipping
  const totalAmount = subtotalAmount + taxAmount + shippingAmount;

  const handleSubmit = (action: 'save' | 'submit') => {
    if (!formData.title || !formData.supplierName || lineItems.some(item => !item.description)) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    const orderData = {
      title: formData.title,
      description: formData.description,
      status: (action === 'save' ? 'draft' : 'pending_approval') as any,
      type: formData.type as any,
      requisitionIds: [],
      requisitions: [],
      supplierId: formData.supplierId || 'SUP-001',
      supplier: {
        id: formData.supplierId || 'SUP-001',
        name: formData.supplierName,
        displayName: formData.supplierName,
        // Add other required supplier fields with defaults
        number: 'SUPP-000001',
        status: 'active' as const,
        type: 'company' as const,
        subsidiaries: [],
        businessType: [],
        industryType: [],
        size: 'enterprise' as const,
        yearEstablished: 2000,
        taxId: '',
        dunsNumber: '',
        addresses: [],
        contacts: [],
        bankAccounts: [],
        certifications: [],
        capabilities: [],
        commodities: [],
        geographicCoverage: [],
        paymentTerms: { id: 'PT-001', name: 'Net 30', description: '', daysNet: 30, isEarlyPaymentDiscount: false },
        currencies: ['USD'],
        languages: ['English'],
        performanceMetrics: {
          onTimeDeliveryRate: 0,
          qualityScore: 0,
          responseTime: 0,
          defectRate: 0,
          customerSatisfactionScore: 0,
          totalSpend: 0,
          numberOfOrders: 0,
          averageOrderValue: 0,
          lastUpdated: new Date().toISOString()
        },
        riskAssessment: {
          overall: 'low' as const,
          financial: 'low' as const,
          operational: 'low' as const,
          compliance: 'low' as const,
          cyber: 'low' as const,
          geopolitical: 'low' as const,
          environmental: 'low' as const,
          lastAssessedAt: new Date().toISOString(),
          assessedBy: '',
          nextAssessmentDate: new Date().toISOString(),
          mitigationPlans: []
        },
        sustainabilityMetrics: {
          carbonFootprint: 0,
          energyEfficiency: 0,
          wasteReduction: 0,
          recyclingRate: 0,
          sustainableSourcing: 0,
          certifications: [],
          score: 0,
          lastUpdated: new Date().toISOString()
        },
        complianceStatus: {
          overall: 'compliant' as const,
          requirements: [],
          auditFindings: []
        },
        contracts: [],
        catalogs: [],
        integrations: [],
        customFields: [],
        documents: [],
        auditTrail: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        onboardedAt: new Date().toISOString(),
        version: 1
      },
      buyerId: 'USR-001',
      buyer: {
        id: 'USR-001',
        email: 'current.user@company.com',
        firstName: 'Current',
        lastName: 'User',
        displayName: 'Current User',
        department: formData.department,
        title: 'Procurement Specialist',
        costCenter: 'PROC-001',
        location: 'New York',
        status: 'active' as const,
        roles: [],
        permissions: [],
        preferences: {
          language: 'en',
          timezone: 'EST',
          dateFormat: 'MM/DD/YYYY',
          currency: 'USD',
          emailNotifications: true,
          smsNotifications: false,
          theme: 'light' as const
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      currency: formData.currency,
      subtotalAmount,
      taxAmount,
      shippingAmount,
      discountAmount: 0,
      totalAmount,
      paymentTerms: {
        id: 'PT-001',
        name: formData.paymentTerms,
        description: `Payment terms: ${formData.paymentTerms}`,
        daysNet: 30,
        isEarlyPaymentDiscount: false
      },
      deliveryTerms: {
        id: 'DT-001',
        code: 'FOB',
        description: 'Free on Board - Destination',
        incoterm: 'FOB'
      },
      shippingMethod: formData.shippingMethod,
      freightTerms: 'Prepaid',
      billToAddress: {
        id: 'ADDR-BILL',
        type: 'billing' as const,
        ...billToAddress,
        isDefault: true,
        isActive: true
      },
      shipToAddress: {
        id: 'ADDR-SHIP',
        type: 'shipping' as const,
        ...shipToAddress,
        isDefault: false,
        isActive: true
      },
      remitToAddress: {
        id: 'ADDR-REMIT',
        type: 'remit_to' as const,
        name: formData.supplierName,
        addressLine1: 'Supplier Address Line 1',
        city: 'Supplier City',
        state: 'ST',
        postalCode: '00000',
        country: 'US',
        isDefault: true,
        isActive: true
      },
      orderDate: new Date().toISOString(),
      requestedDeliveryDate: formData.requestedDeliveryDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      promisedDeliveryDate: formData.requestedDeliveryDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      expectedDeliveryDate: formData.requestedDeliveryDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      lineItems: [],
      approvalPath: [],
      attachments: [],
      comments: formData.notes ? [{
        id: `COM-${Date.now()}`,
        text: formData.notes,
        authorId: 'USR-001',
        author: {
          id: 'USR-001',
          email: 'current.user@company.com',
          firstName: 'Current',
          lastName: 'User',
          displayName: 'Current User'
        } as any,
        createdAt: new Date().toISOString(),
        isInternal: true,
        attachments: []
      }] : [],
      changeOrders: [],
      receipts: [],
      invoices: [],
      customFields: [],
      revisionNumber: 0,
      isAmendment: false
    };

    addOrder(orderData);
    
    toast({
      title: action === 'save' ? 'Order Saved' : 'Order Submitted',
      description: `Order has been ${action === 'save' ? 'saved as draft' : 'submitted for approval'}.`
    });

    // Reset form
    setFormData({
      title: '',
      description: '',
      supplierId: '',
      supplierName: '',
      type: 'standard',
      currency: 'USD',
      requestedDeliveryDate: '',
      department: '',
      urgency: 'medium',
      paymentTerms: 'Net 30',
      shippingMethod: 'Standard Ground',
      notes: ''
    });
    setLineItems([
      { id: '1', description: '', quantity: 1, unitPrice: 0, totalPrice: 0, category: '' }
    ]);
  };

  return (
    <ApplicationLayout pageTitle="Create Purchase Order">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Create New Purchase Order</h2>
            <p className="text-gray-600">Create a comprehensive purchase order with all required details</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleSubmit('save')}>
              <Save className="h-4 w-4 mr-2" />
              Save as Draft
            </Button>
            <Button onClick={() => handleSubmit('submit')}>
              <Send className="h-4 w-4 mr-2" />
              Submit for Approval
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Order Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Order Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Order Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter descriptive order title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Order Type</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="blanket">Blanket</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="services">Services</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Detailed description of the purchase order"
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Supplier Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Supplier Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="supplierName">Supplier Name *</Label>
                    <Input
                      id="supplierName"
                      value={formData.supplierName}
                      onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
                      placeholder="Enter supplier name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="supplierId">Supplier ID</Label>
                    <Input
                      id="supplierId"
                      value={formData.supplierId}
                      onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
                      placeholder="Supplier identifier"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery & Terms */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Delivery & Payment Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="requestedDeliveryDate">Requested Delivery Date</Label>
                    <Input
                      id="requestedDeliveryDate"
                      type="date"
                      value={formData.requestedDeliveryDate}
                      onChange={(e) => setFormData({ ...formData, requestedDeliveryDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="urgency">Urgency</Label>
                    <Select value={formData.urgency} onValueChange={(value) => setFormData({ ...formData, urgency: value })}>
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
                  <div>
                    <Label htmlFor="paymentTerms">Payment Terms</Label>
                    <Select value={formData.paymentTerms} onValueChange={(value) => setFormData({ ...formData, paymentTerms: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Net 15">Net 15</SelectItem>
                        <SelectItem value="Net 30">Net 30</SelectItem>
                        <SelectItem value="Net 45">Net 45</SelectItem>
                        <SelectItem value="Net 60">Net 60</SelectItem>
                        <SelectItem value="Due on Receipt">Due on Receipt</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="shippingMethod">Shipping Method</Label>
                    <Select value={formData.shippingMethod} onValueChange={(value) => setFormData({ ...formData, shippingMethod: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Standard Ground">Standard Ground</SelectItem>
                        <SelectItem value="Express">Express</SelectItem>
                        <SelectItem value="Next Day">Next Day</SelectItem>
                        <SelectItem value="White Glove">White Glove</SelectItem>
                        <SelectItem value="Freight">Freight</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Line Items */}
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
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="lg:col-span-2">
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
                              <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="IT Hardware">IT Hardware</SelectItem>
                              <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                              <SelectItem value="Furniture">Furniture</SelectItem>
                              <SelectItem value="Services">Services</SelectItem>
                              <SelectItem value="Software">Software</SelectItem>
                            </SelectContent>
                          </Select>
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
                          <Label>Unit Price</Label>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.unitPrice}
                            onChange={(e) => updateLineItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                      </div>
                      
                      <div className="mt-4 text-right">
                        <span className="text-lg font-semibold">
                          Total: {formData.currency} {item.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Addresses & Summary */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formData.currency} {subtotalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%):</span>
                  <span>{formData.currency} {taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{formData.currency} {shippingAmount.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>{formData.currency} {totalAmount.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Bill To Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Bill To Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label htmlFor="billToName">Name</Label>
                  <Input
                    id="billToName"
                    value={billToAddress.name}
                    onChange={(e) => setBillToAddress({ ...billToAddress, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="billToAddress1">Address Line 1</Label>
                  <Input
                    id="billToAddress1"
                    value={billToAddress.addressLine1}
                    onChange={(e) => setBillToAddress({ ...billToAddress, addressLine1: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="billToAddress2">Address Line 2</Label>
                  <Input
                    id="billToAddress2"
                    value={billToAddress.addressLine2}
                    onChange={(e) => setBillToAddress({ ...billToAddress, addressLine2: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="billToCity">City</Label>
                    <Input
                      id="billToCity"
                      value={billToAddress.city}
                      onChange={(e) => setBillToAddress({ ...billToAddress, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="billToState">State</Label>
                    <Input
                      id="billToState"
                      value={billToAddress.state}
                      onChange={(e) => setBillToAddress({ ...billToAddress, state: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="billToPostal">Postal Code</Label>
                    <Input
                      id="billToPostal"
                      value={billToAddress.postalCode}
                      onChange={(e) => setBillToAddress({ ...billToAddress, postalCode: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="billToCountry">Country</Label>
                    <Select value={billToAddress.country} onValueChange={(value) => setBillToAddress({ ...billToAddress, country: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="MX">Mexico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ship To Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  Ship To Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label htmlFor="shipToName">Name</Label>
                  <Input
                    id="shipToName"
                    value={shipToAddress.name}
                    onChange={(e) => setShipToAddress({ ...shipToAddress, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="shipToAddress1">Address Line 1</Label>
                  <Input
                    id="shipToAddress1"
                    value={shipToAddress.addressLine1}
                    onChange={(e) => setShipToAddress({ ...shipToAddress, addressLine1: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="shipToAddress2">Address Line 2</Label>
                  <Input
                    id="shipToAddress2"
                    value={shipToAddress.addressLine2}
                    onChange={(e) => setShipToAddress({ ...shipToAddress, addressLine2: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="shipToCity">City</Label>
                    <Input
                      id="shipToCity"
                      value={shipToAddress.city}
                      onChange={(e) => setShipToAddress({ ...shipToAddress, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="shipToState">State</Label>
                    <Input
                      id="shipToState"
                      value={shipToAddress.state}
                      onChange={(e) => setShipToAddress({ ...shipToAddress, state: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="shipToPostal">Postal Code</Label>
                    <Input
                      id="shipToPostal"
                      value={shipToAddress.postalCode}
                      onChange={(e) => setShipToAddress({ ...shipToAddress, postalCode: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="shipToCountry">Country</Label>
                    <Select value={shipToAddress.country} onValueChange={(value) => setShipToAddress({ ...shipToAddress, country: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="MX">Mexico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Special instructions, delivery notes, or other important information..."
                  rows={4}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ApplicationLayout>
  );
};

export default CreateOrderPage;
