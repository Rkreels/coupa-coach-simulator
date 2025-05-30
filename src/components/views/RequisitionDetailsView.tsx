
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FileText, User, Calendar, DollarSign, Package, Edit, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Requisition } from '../../hooks/useRequisitions';

interface RequisitionDetailsViewProps {
  requisition: Requisition;
  onEdit: () => void;
  onDelete: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  canEdit?: boolean;
  canApprove?: boolean;
}

export const RequisitionDetailsView: React.FC<RequisitionDetailsViewProps> = ({
  requisition,
  onEdit,
  onDelete,
  onApprove,
  onReject,
  canEdit = true,
  canApprove = false
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{requisition.title}</CardTitle>
              <p className="text-gray-600 mt-1">{requisition.id}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(requisition.status)}>
                {requisition.status.charAt(0).toUpperCase() + requisition.status.slice(1)}
              </Badge>
              <Badge className={getPriorityColor(requisition.priority)}>
                {requisition.priority.charAt(0).toUpperCase() + requisition.priority.slice(1)} Priority
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Requestor</p>
                <p className="font-medium">{requisition.requestor}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Package className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium">{requisition.department}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Needed By</p>
                <p className="font-medium">{new Date(requisition.neededByDate).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-medium">{requisition.currency} {requisition.totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Description and Justification */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{requisition.description || 'No description provided'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Business Justification</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{requisition.justification}</p>
          </CardContent>
        </Card>
      </div>

      {/* Line Items */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Line Items ({requisition.lineItems.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {requisition.lineItems.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No line items</p>
          ) : (
            <div className="space-y-4">
              {requisition.lineItems.map((item, index) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{item.description}</h4>
                    <span className="font-bold">{requisition.currency} {item.totalPrice.toLocaleString()}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Quantity:</span> {item.quantity}
                    </div>
                    <div>
                      <span className="font-medium">Unit Price:</span> {requisition.currency} {item.unitPrice}
                    </div>
                    <div>
                      <span className="font-medium">Category:</span> {item.category}
                    </div>
                    {item.partNumber && (
                      <div>
                        <span className="font-medium">Part #:</span> {item.partNumber}
                      </div>
                    )}
                  </div>
                  
                  {item.needByDate && (
                    <div className="mt-2 text-sm text-gray-600">
                      <span className="font-medium">Need by:</span> {new Date(item.needByDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              ))}
              
              <Separator />
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-medium">Total Amount:</span>
                <span className="text-xl font-bold">{requisition.currency} {requisition.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Created</p>
                <p className="text-sm text-gray-500">{new Date(requisition.requestedDate).toLocaleDateString()}</p>
              </div>
            </div>
            
            {requisition.submittedDate && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium">Submitted</p>
                  <p className="text-sm text-gray-500">{new Date(requisition.submittedDate).toLocaleDateString()}</p>
                </div>
              </div>
            )}
            
            {requisition.approvedDate && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Approved by {requisition.approver}</p>
                  <p className="text-sm text-gray-500">{new Date(requisition.approvedDate).toLocaleDateString()}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Last modified: {new Date(requisition.lastModified).toLocaleDateString()}
        </div>
        
        <div className="flex gap-2">
          {canApprove && requisition.status === 'pending' && (
            <>
              <Button onClick={onReject} variant="outline" className="text-red-600">
                <XCircle className="h-4 w-4 mr-1" />
                Reject
              </Button>
              <Button onClick={onApprove} className="text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                Approve
              </Button>
            </>
          )}
          
          {canEdit && (
            <>
              <Button onClick={onEdit} variant="outline">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button onClick={onDelete} variant="outline" className="text-red-600">
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
