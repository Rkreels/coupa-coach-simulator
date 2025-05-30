
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ApplicationLayout } from '../ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataTable } from '@/components/ui/data-table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useRequisitions, Requisition } from '../../hooks/useRequisitions';
import { RequisitionForm } from '../forms/RequisitionForm';
import { RequisitionDetailsView } from '../views/RequisitionDetailsView';
import { useToast } from '@/hooks/use-toast';
import { Plus, ShoppingCart, FileText, Search, Clock, CheckCircle, Filter, Eye, Edit, Trash2, AlertTriangle } from 'lucide-react';

export const RequisitionsModule: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const { toast } = useToast();
  
  const {
    requisitions,
    allRequisitions,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    addRequisition,
    updateRequisition,
    deleteRequisition,
    getRequisition,
    getMetrics
  } = useRequisitions();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedRequisition, setSelectedRequisition] = useState<Requisition | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const metrics = getMetrics();

  const handleCreateRequisition = (data: Partial<Requisition>, action: 'save' | 'submit') => {
    const requisitionData = {
      ...data,
      requestor: 'Current User', // In real app, this would be the logged-in user
      status: action === 'save' ? 'draft' as const : 'pending' as const,
      requestedDate: new Date().toISOString().split('T')[0],
      submittedDate: action === 'submit' ? new Date().toISOString().split('T')[0] : undefined
    };

    const newReq = addRequisition(requisitionData as Omit<Requisition, 'id' | 'lastModified'>);
    setDialogOpen(false);
    
    toast({
      title: action === 'save' ? 'Requisition Saved' : 'Requisition Submitted',
      description: `Requisition ${newReq.id} has been ${action === 'save' ? 'saved as draft' : 'submitted for approval'}.`
    });
  };

  const handleUpdateRequisition = (data: Partial<Requisition>, action: 'save' | 'submit') => {
    if (!selectedRequisition) return;
    
    const updates = {
      ...data,
      status: action === 'save' ? 'draft' as const : 'pending' as const,
      submittedDate: action === 'submit' ? new Date().toISOString().split('T')[0] : selectedRequisition.submittedDate
    };

    updateRequisition(selectedRequisition.id, updates);
    setDialogOpen(false);
    setDetailsOpen(false);
    setSelectedRequisition(null);
    setIsEditing(false);
    
    toast({
      title: action === 'save' ? 'Requisition Updated' : 'Requisition Resubmitted',
      description: `Requisition ${selectedRequisition.id} has been updated.`
    });
  };

  const handleDeleteRequisition = (requisition: Requisition) => {
    deleteRequisition(requisition.id);
    setDetailsOpen(false);
    setSelectedRequisition(null);
    
    toast({
      title: 'Requisition Deleted',
      description: `Requisition ${requisition.id} has been deleted.`,
      variant: 'destructive'
    });
  };

  const handleApproveRequisition = (requisition: Requisition) => {
    updateRequisition(requisition.id, {
      status: 'approved',
      approver: 'Current User',
      approvedDate: new Date().toISOString().split('T')[0]
    });
    
    toast({
      title: 'Requisition Approved',
      description: `Requisition ${requisition.id} has been approved.`
    });
  };

  const handleRejectRequisition = (requisition: Requisition) => {
    updateRequisition(requisition.id, {
      status: 'rejected',
      approver: 'Current User',
      approvedDate: new Date().toISOString().split('T')[0]
    });
    
    toast({
      title: 'Requisition Rejected',
      description: `Requisition ${requisition.id} has been rejected.`,
      variant: 'destructive'
    });
  };

  const openDetails = (requisition: Requisition) => {
    setSelectedRequisition(requisition);
    setDetailsOpen(true);
  };

  const openEdit = (requisition?: Requisition) => {
    setSelectedRequisition(requisition || null);
    setIsEditing(!!requisition);
    setDialogOpen(true);
    if (requisition) setDetailsOpen(false);
  };

  const getFilteredRequisitions = () => {
    let filtered = requisitions;
    
    if (path.includes('/my')) {
      // Show all for current user
    } else if (path.includes('/pending')) {
      filtered = allRequisitions.filter(r => r.status === 'pending');
    } else if (path.includes('/approved')) {
      filtered = allRequisitions.filter(r => r.status === 'approved');
    } else if (path.includes('/templates')) {
      return []; // Templates would be separate data
    } else if (path.includes('/shopping')) {
      return []; // Shopping catalogs would be separate
    }
    
    return filtered;
  };

  const getPageContent = () => {
    if (path.includes('/templates')) {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Requisition Templates</h2>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Monthly Office Supplies', 'IT Equipment Request', 'Travel Booking', 'Marketing Campaign'].map((template) => (
              <Card key={template} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-base">{template}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">Template</Badge>
                    <Button size="sm" onClick={() => openEdit()}>Use Template</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    if (path.includes('/shopping')) {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Shopping & Catalogs</h2>
            <div className="flex gap-2">
              <Button variant="outline">
                <Search className="h-4 w-4 mr-2" />
                Search Catalogs
              </Button>
              <Button>
                <ShoppingCart className="h-4 w-4 mr-2" />
                View Cart
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Office Supplies', 'IT Equipment', 'Marketing Materials'].map((catalog) => (
              <Card key={catalog} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{catalog}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Browse {catalog.toLowerCase()} catalog</p>
                  <Button variant="outline" className="w-full">
                    Browse Catalog
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    // Default requisitions list view
    const filteredRequisitions = getFilteredRequisitions();

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {path.includes('/my') ? 'My Requisitions' :
             path.includes('/pending') ? 'Pending Approval' :
             path.includes('/approved') ? 'Approved Requisitions' :
             'All Requisitions'}
          </h2>
          <Button onClick={() => openEdit()}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Requisition
          </Button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-2xl font-bold">{metrics.totalRequisitions}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-500">Pending</p>
                  <p className="text-2xl font-bold">{metrics.pendingApproval}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500">Approved</p>
                  <p className="text-2xl font-bold">{metrics.approved}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Drafts</p>
                  <p className="text-2xl font-bold">{metrics.drafted}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search requisitions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Requisitions Table */}
        <Card>
          <CardContent className="p-0">
            <DataTable
              data={filteredRequisitions}
              columns={[
                { 
                  key: 'id', 
                  header: 'Req ID', 
                  sortable: true,
                  render: (value: string) => (
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="font-mono text-sm">{value}</span>
                    </div>
                  )
                },
                { key: 'title', header: 'Title', sortable: true },
                { 
                  key: 'status', 
                  header: 'Status',
                  render: (value: string) => (
                    <Badge className={
                      value === 'approved' ? 'bg-green-100 text-green-800' :
                      value === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      value === 'draft' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }>
                      {value.charAt(0).toUpperCase() + value.slice(1)}
                    </Badge>
                  )
                },
                { 
                  key: 'priority', 
                  header: 'Priority',
                  render: (value: string) => (
                    <Badge className={
                      value === 'urgent' ? 'bg-red-100 text-red-800' :
                      value === 'high' ? 'bg-orange-100 text-orange-800' :
                      value === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }>
                      {value.charAt(0).toUpperCase() + value.slice(1)}
                    </Badge>
                  )
                },
                { key: 'requestor', header: 'Requestor', sortable: true },
                { key: 'department', header: 'Department', sortable: true },
                { 
                  key: 'totalAmount', 
                  header: 'Amount',
                  render: (value: number, item: Requisition) => `${item.currency} ${value.toLocaleString()}`
                },
                { 
                  key: 'neededByDate', 
                  header: 'Needed By',
                  render: (value: string) => new Date(value).toLocaleDateString()
                }
              ]}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onRowClick={openDetails}
              actions={(item: Requisition) => (
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      openDetails(item);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEdit(item);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteRequisition(item);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>
    );
  };

  const getPageTitle = () => {
    if (path.includes('/my')) return 'My Requisitions';
    if (path.includes('/pending')) return 'Pending Approval';
    if (path.includes('/approved')) return 'Approved Requisitions';
    if (path.includes('/templates')) return 'Requisition Templates';
    if (path.includes('/shopping')) return 'Shopping & Catalogs';
    if (path.includes('/quick-order')) return 'Quick Order';
    return 'Requisitions';
  };

  return (
    <ApplicationLayout pageTitle={getPageTitle()}>
      {getPageContent()}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Edit Requisition' : 'Create New Requisition'}
            </DialogTitle>
          </DialogHeader>
          <RequisitionForm
            requisition={selectedRequisition || undefined}
            onSubmit={isEditing ? handleUpdateRequisition : handleCreateRequisition}
            onCancel={() => {
              setDialogOpen(false);
              setSelectedRequisition(null);
              setIsEditing(false);
            }}
            isEditing={isEditing}
          />
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Requisition Details</DialogTitle>
          </DialogHeader>
          {selectedRequisition && (
            <RequisitionDetailsView
              requisition={selectedRequisition}
              onEdit={() => openEdit(selectedRequisition)}
              onDelete={() => handleDeleteRequisition(selectedRequisition)}
              onApprove={() => handleApproveRequisition(selectedRequisition)}
              onReject={() => handleRejectRequisition(selectedRequisition)}
              canEdit={selectedRequisition.status === 'draft' || selectedRequisition.status === 'rejected'}
              canApprove={selectedRequisition.status === 'pending'}
            />
          )}
        </DialogContent>
      </Dialog>
    </ApplicationLayout>
  );
};
