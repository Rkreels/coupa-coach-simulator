import React from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { SetupNavigation } from '../../components/navigation/SetupNavigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Building, Upload } from 'lucide-react';

const CompanyProfile = () => {
  return (
    <ApplicationLayout 
      pageTitle="Company Profile"
      pageLoadScript="Configure your company information, branding, and organizational details."
    >
      <SetupNavigation />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Building className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold">Basic Information</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" defaultValue="Acme Corporation" />
            </div>
            
            <div>
              <Label htmlFor="legalName">Legal Name</Label>
              <Input id="legalName" defaultValue="Acme Corporation Inc." />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="taxId">Tax ID</Label>
                <Input id="taxId" defaultValue="12-3456789" />
              </div>
              <div>
                <Label htmlFor="dunsNumber">DUNS Number</Label>
                <Input id="dunsNumber" defaultValue="123456789" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="website">Website</Label>
              <Input id="website" defaultValue="https://acmecorp.com" />
            </div>
            
            <div>
              <Label htmlFor="description">Company Description</Label>
              <Textarea id="description" defaultValue="Leading provider of enterprise solutions..." rows={3} />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Address Information</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="address1">Street Address</Label>
              <Input id="address1" defaultValue="123 Business Street" />
            </div>
            
            <div>
              <Label htmlFor="address2">Address Line 2</Label>
              <Input id="address2" defaultValue="Suite 100" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" defaultValue="San Francisco" />
              </div>
              <div>
                <Label htmlFor="state">State/Province</Label>
                <Input id="state" defaultValue="CA" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                <Input id="zipCode" defaultValue="94105" />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input id="country" defaultValue="United States" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue="+1 (555) 123-4567" />
              </div>
              <div>
                <Label htmlFor="fax">Fax</Label>
                <Input id="fax" defaultValue="+1 (555) 123-4568" />
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Branding & Logo</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Company Logo</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Upload your company logo</p>
                <p className="text-xs text-gray-400">PNG, JPG up to 2MB</p>
                <Button variant="outline" className="mt-2">Choose File</Button>
              </div>
            </div>
            
            <div>
              <Label>Brand Colors</Label>
              <div className="mt-2 space-y-3">
                <div className="flex items-center gap-3">
                  <Label className="w-20">Primary:</Label>
                  <div className="w-10 h-10 bg-blue-600 rounded border"></div>
                  <Input defaultValue="#3B82F6" className="w-24" />
                </div>
                <div className="flex items-center gap-3">
                  <Label className="w-20">Secondary:</Label>
                  <div className="w-10 h-10 bg-gray-600 rounded border"></div>
                  <Input defaultValue="#6B7280" className="w-24" />
                </div>
                <div className="flex items-center gap-3">
                  <Label className="w-20">Accent:</Label>
                  <div className="w-10 h-10 bg-green-600 rounded border"></div>
                  <Input defaultValue="#10B981" className="w-24" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="flex justify-end mt-6 space-x-3">
        <Button variant="outline">Reset</Button>
        <Button>Save Changes</Button>
      </div>
    </ApplicationLayout>
  );
};

export default CompanyProfile;