import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, XCircle, Clock, User, FileText, DollarSign, Calendar } from 'lucide-react';
import { ApprovalWorkflow, useApprovalWorkflow } from '../../hooks/useApprovalWorkflow';
import { useAuth } from '../../contexts/AuthContext';

interface ApprovalWorkflowDialogProps {
  workflow: ApprovalWorkflow | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove?: (workflowId: string, stepId: string, comments?: string) => void;
  onReject?: (workflowId: string, stepId: string, comments: string) => void;
}

export const ApprovalWorkflowDialog: React.FC<ApprovalWorkflowDialogProps> = ({
  workflow,
  isOpen,
  onClose,
  onApprove,
  onReject
}) => {
  const [comments, setComments] = useState('');
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const { user } = useAuth();
  const { approveStep, rejectWorkflow } = useApprovalWorkflow();

  if (!workflow) return null;

  const currentStep = workflow.steps[workflow.currentStep];
  const canApprove = user && currentStep && 
    (currentStep.approverRole === user.role || currentStep.approverUserId === user.id) &&
    currentStep.status === 'pending';

  const handleApprove = async () => {
    if (!canApprove || !currentStep) return;

    setIsApproving(true);
    try {
      const success = approveStep(workflow.id, currentStep.id, comments || undefined);
      if (success) {
        onApprove?.(workflow.id, currentStep.id, comments || undefined);
        onClose();
        setComments('');
      }
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = async () => {
    if (!canApprove || !currentStep || !comments.trim()) return;

    setIsRejecting(true);
    try {
      const success = rejectWorkflow(workflow.id, currentStep.id, comments);
      if (success) {
        onReject?.(workflow.id, currentStep.id, comments);
        onClose();
        setComments('');
      }
    } finally {
      setIsRejecting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800'
    };

    return (
      <Badge className={variants[status] || variants.pending}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      urgent: 'bg-red-100 text-red-800',
      high: 'bg-orange-100 text-orange-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };

    return (
      <Badge className={variants[priority] || variants.medium}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Approval Workflow - {workflow.documentId}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Document Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Document Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Document ID</p>
                    <p className="font-medium">{workflow.documentId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Requestor</p>
                    <p className="font-medium">{workflow.requestorName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-medium">{workflow.currency} {workflow.totalAmount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Submitted</p>
                    <p className="font-medium">{new Date(workflow.createdDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                {getStatusBadge(workflow.status)}
                {getPriorityBadge(workflow.priority)}
                <Badge variant="outline">{workflow.documentType.replace('_', ' ').toUpperCase()}</Badge>
              </div>

              {workflow.businessJustification && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">Business Justification</p>
                  <p className="text-sm bg-gray-50 p-3 rounded-md">{workflow.businessJustification}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Approval Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Approval Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workflow.steps.map((step, index) => (
                  <div key={step.id} className="relative">
                    <div className={`flex items-start gap-4 p-4 rounded-lg border-2 ${
                      index === workflow.currentStep && step.status === 'pending' 
                        ? 'border-blue-200 bg-blue-50' 
                        : 'border-gray-200'
                    }`}>
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-gray-200">
                        {getStatusIcon(step.status)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Step {step.order + 1}: {step.approverRole}</h4>
                            {step.approverName && (
                              <p className="text-sm text-gray-500">Approved by: {step.approverName}</p>
                            )}
                          </div>
                          {getStatusBadge(step.status)}
                        </div>
                        
                        {step.approvedDate && (
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(step.approvedDate).toLocaleString()}
                          </p>
                        )}
                        
                        {step.comments && (
                          <div className="mt-2 p-2 bg-gray-100 rounded text-sm">
                            <p className="font-medium text-gray-700">Comments:</p>
                            <p className="text-gray-600">{step.comments}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {index < workflow.steps.length - 1 && (
                      <div className="absolute left-7 top-full w-0.5 h-4 bg-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Approval Actions */}
          {canApprove && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Action Required</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="comments">Comments (Optional for approval, required for rejection)</Label>
                    <Textarea
                      id="comments"
                      placeholder="Add your comments..."
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleApprove}
                      disabled={isApproving || isRejecting}
                      className="flex-1"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {isApproving ? 'Approving...' : 'Approve'}
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={handleReject}
                      disabled={isApproving || isRejecting || !comments.trim()}
                      className="flex-1"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      {isRejecting ? 'Rejecting...' : 'Reject'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};