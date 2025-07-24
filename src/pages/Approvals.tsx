import React, { useState } from 'react';
import { ApplicationLayout } from '../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { ApprovalWorkflowDialog } from '../components/approvals/ApprovalWorkflowDialog';
import { useApprovalWorkflow } from '../hooks/useApprovalWorkflow';
import { Search, Eye, CheckCircle, XCircle, Clock, FileText } from 'lucide-react';

const ApprovalsPage = () => {
  const { getWorkflowsForApprover, getMySubmittedWorkflows, getWorkflowMetrics } = useApprovalWorkflow();
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('pending');

  const pendingApprovals = getWorkflowsForApprover();
  const mySubmissions = getMySubmittedWorkflows();
  const metrics = getWorkflowMetrics();

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return <Badge className={variants[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  return (
    <ApplicationLayout pageTitle="Approvals">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Approval Center</h2>
          <div className="flex gap-2">
            <Button variant={activeTab === 'pending' ? 'default' : 'outline'} onClick={() => setActiveTab('pending')}>
              Pending My Approval ({metrics.pendingMyApproval})
            </Button>
            <Button variant={activeTab === 'submitted' ? 'default' : 'outline'} onClick={() => setActiveTab('submitted')}>
              My Submissions ({metrics.mySubmittedPending})
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-500">Pending Total</p>
                  <p className="text-lg font-semibold">{metrics.totalPending}</p>
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
                  <p className="text-lg font-semibold">{metrics.totalApproved}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <XCircle className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-sm text-gray-500">Rejected</p>
                  <p className="text-lg font-semibold">{metrics.totalRejected}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">My Action Needed</p>
                  <p className="text-lg font-semibold">{metrics.pendingMyApproval}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{activeTab === 'pending' ? 'Pending My Approval' : 'My Submitted Requests'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(activeTab === 'pending' ? pendingApprovals : mySubmissions).map((workflow) => (
                <div key={workflow.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <div>
                      <h3 className="font-medium">{workflow.documentId}</h3>
                      <p className="text-sm text-gray-500">{workflow.requestorName} • {workflow.currency} {workflow.totalAmount.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(workflow.status)}
                    <Button variant="outline" size="sm" onClick={() => { setSelectedWorkflow(workflow); setIsDialogOpen(true); }}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <ApprovalWorkflowDialog
          workflow={selectedWorkflow}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      </div>
    </ApplicationLayout>
  );
};

export default ApprovalsPage;