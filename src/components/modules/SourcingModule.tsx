
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ApplicationLayout } from '../ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { FormDialog } from '@/components/ui/form-dialog';
import { Plus, FileText, Award, TrendingDown, Calendar } from 'lucide-react';

export const SourcingModule: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const [dialogOpen, setDialogOpen] = useState(false);

  // Mock data for sourcing events
  const sourcingEvents = [
    { id: 'RFQ-001', title: 'Office Supplies RFQ', type: 'RFQ', status: 'active', bidders: 5, endDate: '2024-01-15' },
    { id: 'RFP-002', title: 'IT Services RFP', type: 'RFP', status: 'evaluation', bidders: 8, endDate: '2024-01-20' },
    { id: 'RFI-003', title: 'Cloud Services RFI', type: 'RFI', status: 'draft', bidders: 0, endDate: '2024-01-25' }
  ];

  const getPageContent = () => {
    if (path.includes('/rfqs')) {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Request for Quotes (RFQs)</h2>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create RFQ
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-gray-500">Active RFQs</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">45</p>
                  <p className="text-sm text-gray-500">Total Responses</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-gray-500">Pending Awards</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent RFQs</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={sourcingEvents.filter(event => event.type === 'RFQ')}
                columns={[
                  { key: 'id', header: 'RFQ ID', sortable: true },
                  { key: 'title', header: 'Title', sortable: true },
                  { 
                    key: 'status', 
                    header: 'Status',
                    render: (value: string) => (
                      <Badge variant={value === 'active' ? 'default' : value === 'evaluation' ? 'secondary' : 'outline'}>
                        {value}
                      </Badge>
                    )
                  },
                  { key: 'bidders', header: 'Bidders', sortable: true },
                  { key: 'endDate', header: 'End Date', sortable: true }
                ]}
                searchTerm=""
                onSearchChange={() => {}}
                onSort={() => {}}
                sortConfig={{ key: null, direction: 'asc' }}
              />
            </CardContent>
          </Card>
        </div>
      );
    }

    if (path.includes('/rfps')) {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Request for Proposals (RFPs)</h2>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create RFP
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Active RFPs</p>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500">Awarded</p>
                    <p className="text-2xl font-bold">23</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-sm text-gray-500">Avg. Savings</p>
                    <p className="text-2xl font-bold">15%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-500">Closing Soon</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    if (path.includes('/savings')) {
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Savings Tracking</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">$2.4M</p>
                  <p className="text-sm text-gray-500">Total Savings (YTD)</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">18%</p>
                  <p className="text-sm text-gray-500">Average Savings</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">156</p>
                  <p className="text-sm text-gray-500">Sourcing Events</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Savings by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['IT Services', 'Office Supplies', 'Professional Services', 'Facilities'].map((category) => (
                  <div key={category} className="flex justify-between items-center p-3 border rounded">
                    <span className="font-medium">{category}</span>
                    <div className="text-right">
                      <span className="font-bold text-green-600">$485K</span>
                      <Badge variant="outline" className="ml-2">22%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    // Default sourcing events page
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Sourcing Events</h2>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold">45</p>
                <p className="text-sm text-gray-500">Total Events</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">12</p>
                <p className="text-sm text-gray-500">Active</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">28</p>
                <p className="text-sm text-gray-500">Completed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">5</p>
                <p className="text-sm text-gray-500">In Evaluation</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Sourcing Events</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={sourcingEvents}
              columns={[
                { key: 'id', header: 'Event ID', sortable: true },
                { key: 'title', header: 'Title', sortable: true },
                { key: 'type', header: 'Type', sortable: true },
                { 
                  key: 'status', 
                  header: 'Status',
                  render: (value: string) => (
                    <Badge variant={value === 'active' ? 'default' : value === 'evaluation' ? 'secondary' : 'outline'}>
                      {value}
                    </Badge>
                  )
                },
                { key: 'bidders', header: 'Bidders', sortable: true },
                { key: 'endDate', header: 'End Date', sortable: true }
              ]}
              searchTerm=""
              onSearchChange={() => {}}
              onSort={() => {}}
              sortConfig={{ key: null, direction: 'asc' }}
            />
          </CardContent>
        </Card>
      </div>
    );
  };

  const getPageTitle = () => {
    if (path.includes('/rfis')) return 'Request for Information';
    if (path.includes('/rfps')) return 'Request for Proposals';
    if (path.includes('/rfqs')) return 'Request for Quotes';
    if (path.includes('/auctions')) return 'Reverse Auctions';
    if (path.includes('/awards')) return 'Sourcing Awards';
    if (path.includes('/savings')) return 'Savings Tracking';
    if (path.includes('/templates')) return 'Event Templates';
    return 'Sourcing Events';
  };

  return (
    <ApplicationLayout pageTitle={getPageTitle()}>
      <div className="space-y-6">
        {getPageContent()}

        <FormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title="Create Sourcing Event"
          fields={[
            { name: 'title', label: 'Event Title', type: 'text' as const, required: true },
            { name: 'type', label: 'Event Type', type: 'select' as const, required: true, options: [
              { value: 'rfq', label: 'Request for Quote' },
              { value: 'rfp', label: 'Request for Proposal' },
              { value: 'rfi', label: 'Request for Information' },
              { value: 'auction', label: 'Reverse Auction' }
            ]},
            { name: 'category', label: 'Category', type: 'text' as const, required: true },
            { name: 'description', label: 'Description', type: 'textarea' as const, required: true },
            { name: 'endDate', label: 'End Date', type: 'date' as const, required: true }
          ]}
          values={{}}
          onValuesChange={() => {}}
          onSubmit={() => setDialogOpen(false)}
          submitText="Create Event"
        />
      </div>
    </ApplicationLayout>
  );
};
