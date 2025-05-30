
import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RequisitionForm } from '../../components/forms/RequisitionForm';
import { useRequisitions } from '../../hooks/useRequisitions';
import { useToast } from '@/hooks/use-toast';

const CreateRequisitionPage = () => {
  const { addRequisition } = useRequisitions();
  const { toast } = useToast();

  const handleSubmit = (data: any, action: 'save' | 'submit') => {
    const requisitionData = {
      ...data,
      requestor: 'Current User',
      status: action === 'save' ? 'draft' as const : 'pending' as const,
      requestedDate: new Date().toISOString().split('T')[0],
      submittedDate: action === 'submit' ? new Date().toISOString().split('T')[0] : undefined
    };

    addRequisition(requisitionData);
    
    toast({
      title: action === 'save' ? 'Requisition Saved' : 'Requisition Submitted',
      description: `Requisition has been ${action === 'save' ? 'saved as draft' : 'submitted for approval'}.`
    });
  };

  return (
    <ApplicationLayout pageTitle="Create Requisition">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Create New Requisition</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Requisition Details</CardTitle>
          </CardHeader>
          <CardContent>
            <RequisitionForm
              onSubmit={handleSubmit}
              onCancel={() => window.history.back()}
              isEditing={false}
            />
          </CardContent>
        </Card>
      </div>
    </ApplicationLayout>
  );
};

export default CreateRequisitionPage;
