import { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

export interface ApprovalStep {
  id: string;
  approverRole: string;
  approverUserId?: string;
  approverName?: string;
  status: 'pending' | 'approved' | 'rejected' | 'skipped';
  approvedDate?: string;
  comments?: string;
  order: number;
}

export interface ApprovalWorkflow {
  id: string;
  documentId: string;
  documentType: 'requisition' | 'purchase_order' | 'invoice' | 'contract';
  requestorId: string;
  requestorName: string;
  totalAmount: number;
  currency: string;
  currentStep: number;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  steps: ApprovalStep[];
  createdDate: string;
  completedDate?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  businessJustification?: string;
}

const initialWorkflows: ApprovalWorkflow[] = [
  {
    id: 'wf-001',
    documentId: 'REQ-2024-001',
    documentType: 'requisition',
    requestorId: 'usr-004',
    requestorName: 'Bob Employee',
    totalAmount: 2500,
    currency: 'USD',
    currentStep: 1,
    status: 'pending',
    priority: 'medium',
    businessJustification: 'Required for Q1 marketing campaign',
    steps: [
      {
        id: 'step-001-1',
        approverRole: 'Procurement Manager',
        status: 'pending',
        order: 1
      },
      {
        id: 'step-001-2',
        approverRole: 'Finance Manager',
        status: 'pending',
        order: 2
      }
    ],
    createdDate: '2024-01-15T10:00:00Z'
  },
  {
    id: 'wf-002',
    documentId: 'INV-2024-056',
    documentType: 'invoice',
    requestorId: 'usr-002',
    requestorName: 'John Manager',
    totalAmount: 12450,
    currency: 'USD',
    currentStep: 0,
    status: 'pending',
    priority: 'high',
    steps: [
      {
        id: 'step-002-1',
        approverRole: 'Finance Manager',
        status: 'pending',
        order: 1
      }
    ],
    createdDate: '2024-01-15T14:30:00Z'
  }
];

export const useApprovalWorkflow = () => {
  const { user } = useAuth();
  const [workflows, setWorkflows] = useState(initialWorkflows);
  const [selectedWorkflow, setSelectedWorkflow] = useState<ApprovalWorkflow | null>(null);

  const getWorkflowsForApprover = useCallback(() => {
    if (!user) return [];
    
    return workflows.filter(workflow => 
      workflow.status === 'pending' &&
      workflow.steps.some(step => 
        step.status === 'pending' && 
        step.order === workflow.currentStep &&
        (step.approverRole === user.role || step.approverUserId === user.id)
      )
    );
  }, [workflows, user]);

  const getMySubmittedWorkflows = useCallback(() => {
    if (!user) return [];
    
    return workflows.filter(workflow => workflow.requestorId === user.id);
  }, [workflows, user]);

  const approveStep = useCallback((workflowId: string, stepId: string, comments?: string) => {
    if (!user) return false;

    setWorkflows(prevWorkflows => 
      prevWorkflows.map(workflow => {
        if (workflow.id !== workflowId) return workflow;

        const updatedSteps = workflow.steps.map(step => {
          if (step.id === stepId) {
            return {
              ...step,
              status: 'approved' as const,
              approverUserId: user.id,
              approverName: `${user.firstName} ${user.lastName}`,
              approvedDate: new Date().toISOString(),
              comments
            };
          }
          return step;
        });

        // Check if this was the last step
        const currentStepIndex = workflow.currentStep;
        const isLastStep = currentStepIndex >= updatedSteps.length - 1;
        
        return {
          ...workflow,
          steps: updatedSteps,
          currentStep: isLastStep ? currentStepIndex : currentStepIndex + 1,
          status: isLastStep ? 'approved' as const : 'pending' as const,
          completedDate: isLastStep ? new Date().toISOString() : undefined
        };
      })
    );

    return true;
  }, [user, setWorkflows]);

  const rejectWorkflow = useCallback((workflowId: string, stepId: string, comments: string) => {
    if (!user) return false;

    setWorkflows(prevWorkflows => 
      prevWorkflows.map(workflow => {
        if (workflow.id !== workflowId) return workflow;

        const updatedSteps = workflow.steps.map(step => {
          if (step.id === stepId) {
            return {
              ...step,
              status: 'rejected' as const,
              approverUserId: user.id,
              approverName: `${user.firstName} ${user.lastName}`,
              approvedDate: new Date().toISOString(),
              comments
            };
          }
          return step;
        });

        return {
          ...workflow,
          steps: updatedSteps,
          status: 'rejected' as const,
          completedDate: new Date().toISOString()
        };
      })
    );

    return true;
  }, [user, setWorkflows]);

  const createWorkflow = useCallback((
    documentId: string,
    documentType: ApprovalWorkflow['documentType'],
    totalAmount: number,
    currency: string,
    priority: ApprovalWorkflow['priority'],
    businessJustification?: string
  ) => {
    if (!user) return null;

    // Define approval rules based on amount and type
    const getApprovalSteps = (): Omit<ApprovalStep, 'id' | 'status'>[] => {
      const steps: Omit<ApprovalStep, 'id' | 'status'>[] = [];

      if (documentType === 'requisition') {
        if (totalAmount > 1000) {
          steps.push({ approverRole: 'Procurement Manager', order: 0 });
        }
        if (totalAmount > 5000) {
          steps.push({ approverRole: 'Finance Manager', order: steps.length });
        }
        if (totalAmount > 50000) {
          steps.push({ approverRole: 'System Administrator', order: steps.length });
        }
      } else if (documentType === 'invoice') {
        if (totalAmount > 500) {
          steps.push({ approverRole: 'Finance Manager', order: 0 });
        }
        if (totalAmount > 25000) {
          steps.push({ approverRole: 'System Administrator', order: steps.length });
        }
      }

      return steps.length > 0 ? steps : [{ approverRole: 'Procurement Manager', order: 0 }];
    };

    const approvalSteps = getApprovalSteps();
    const newWorkflow: ApprovalWorkflow = {
      id: `wf-${Date.now()}`,
      documentId,
      documentType,
      requestorId: user.id,
      requestorName: `${user.firstName} ${user.lastName}`,
      totalAmount,
      currency,
      currentStep: 0,
      status: 'pending',
      priority,
      businessJustification,
      steps: approvalSteps.map((step, index) => ({
        ...step,
        id: `step-${Date.now()}-${index}`,
        status: 'pending' as const
      })),
      createdDate: new Date().toISOString()
    };

    setWorkflows(prev => [...prev, newWorkflow]);
    return newWorkflow;
  }, [user, setWorkflows]);

  const getWorkflowById = useCallback((id: string) => {
    return workflows.find(w => w.id === id);
  }, [workflows]);

  const getWorkflowByDocumentId = useCallback((documentId: string) => {
    return workflows.find(w => w.documentId === documentId);
  }, [workflows]);

  const getWorkflowMetrics = useCallback(() => {
    const pending = workflows.filter(w => w.status === 'pending').length;
    const approved = workflows.filter(w => w.status === 'approved').length;
    const rejected = workflows.filter(w => w.status === 'rejected').length;
    const myPending = getWorkflowsForApprover().length;
    const mySubmitted = getMySubmittedWorkflows().filter(w => w.status === 'pending').length;

    return {
      totalPending: pending,
      totalApproved: approved,
      totalRejected: rejected,
      pendingMyApproval: myPending,
      mySubmittedPending: mySubmitted
    };
  }, [workflows, getWorkflowsForApprover, getMySubmittedWorkflows]);

  return {
    workflows,
    selectedWorkflow,
    setSelectedWorkflow,
    getWorkflowsForApprover,
    getMySubmittedWorkflows,
    approveStep,
    rejectWorkflow,
    createWorkflow,
    getWorkflowById,
    getWorkflowByDocumentId,
    getWorkflowMetrics
  };
};