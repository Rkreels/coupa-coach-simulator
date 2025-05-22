
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Link } from "react-router-dom";

interface ApprovalItem {
  id: string;
  type: string;
  title: string;
  submittedBy: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  amount?: string;
}

export const ApprovalQueueWidget = () => {
  // Sample approval data
  const approvals: ApprovalItem[] = [
    {
      id: 'inv-2023-056',
      type: 'Invoice',
      title: 'Invoice #INV-2023-056',
      submittedBy: 'Acme Corp',
      date: '2023-05-15',
      priority: 'high',
      amount: '$12,450.00'
    },
    {
      id: 'req-2023-112',
      type: 'Requisition',
      title: 'Office Supplies Request',
      submittedBy: 'Marketing Department',
      date: '2023-05-14',
      priority: 'medium',
      amount: '$345.75'
    },
    {
      id: 'po-2023-089',
      type: 'Purchase Order',
      title: 'PO #PO-2023-089',
      submittedBy: 'IT Department',
      date: '2023-05-13',
      priority: 'low',
      amount: '$5,600.00'
    }
  ];

  const getPriorityBadge = (priority: ApprovalItem['priority']) => {
    switch (priority) {
      case 'high':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Low</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Approval Queue</CardTitle>
        <Badge>{approvals.length}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {approvals.map((approval) => (
          <div key={approval.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-b-0">
            <div className="shrink-0 mt-1">
              <FileText className="h-5 w-5 text-blue-500" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-sm">{approval.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {approval.submittedBy} • {approval.type}
                  </p>
                </div>
                {getPriorityBadge(approval.priority)}
              </div>
              
              {approval.amount && (
                <p className="text-sm font-medium mt-1">{approval.amount}</p>
              )}
              
              <div className="flex gap-2 mt-2">
                <Button size="sm" variant="outline" className="h-8 px-2 text-xs">
                  <XCircle className="h-3 w-3 mr-1" />
                  Reject
                </Button>
                <Button size="sm" className="h-8 px-2 text-xs">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Approve
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/approvals">View All Approvals</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
