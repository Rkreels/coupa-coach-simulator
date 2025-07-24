
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, AlertCircle, CheckCircle, XCircle, Eye } from 'lucide-react';
import { Link } from "react-router-dom";
import { useApprovalWorkflow } from '../../hooks/useApprovalWorkflow';
import { ApprovalWorkflowDialog } from '../approvals/ApprovalWorkflowDialog';

export const ApprovalQueueWidget = () => {
  const { getWorkflowsForApprover, approveStep, rejectWorkflow } = useApprovalWorkflow();
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const pendingApprovals = getWorkflowsForApprover();

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Urgent</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Low</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Normal</Badge>;
    }
  };

  const handleViewWorkflow = (workflow) => {
    setSelectedWorkflow(workflow);
    setIsDialogOpen(true);
  };

  const handleQuickApprove = async (workflow) => {
    const currentStep = workflow.steps[workflow.currentStep];
    if (currentStep) {
      await approveStep(workflow.id, currentStep.id, 'Quick approval from dashboard');
    }
  };

  const handleQuickReject = async (workflow) => {
    const currentStep = workflow.steps[workflow.currentStep];
    if (currentStep) {
      await rejectWorkflow(workflow.id, currentStep.id, 'Rejected from dashboard');
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Approval Queue</CardTitle>
          <Badge>{pendingApprovals.length}</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendingApprovals.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <p className="text-sm">No pending approvals</p>
            </div>
          ) : (
            pendingApprovals.slice(0, 3).map((workflow) => (
              <div key={workflow.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-b-0">
                <div className="shrink-0 mt-1">
                  <FileText className="h-5 w-5 text-blue-500" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-sm">{workflow.documentId}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {workflow.requestorName} • {workflow.documentType.replace('_', ' ')}
                      </p>
                    </div>
                    {getPriorityBadge(workflow.priority)}
                  </div>
                  
                  <p className="text-sm font-medium mt-1">
                    {workflow.currency} {workflow.totalAmount.toLocaleString()}
                  </p>
                  
                  <div className="flex gap-1 mt-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-7 px-2 text-xs"
                      onClick={() => handleViewWorkflow(workflow)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-7 px-2 text-xs text-red-600"
                      onClick={() => handleQuickReject(workflow)}
                    >
                      <XCircle className="h-3 w-3 mr-1" />
                      Reject
                    </Button>
                    <Button 
                      size="sm" 
                      className="h-7 px-2 text-xs"
                      onClick={() => handleQuickApprove(workflow)}
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <Link to="/approvals">View All Approvals</Link>
          </Button>
        </CardFooter>
      </Card>

      <ApprovalWorkflowDialog
        workflow={selectedWorkflow}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};
