
import React, { useState } from 'react';
import { ApplicationLayout } from '../components/ApplicationLayout';
import { VoiceElement } from '../components/VoiceElement';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, ArrowRight, FileText, Clock, Check, X, Briefcase, BarChart3, Edit, Trash2, Filter } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Define the status type to ensure consistency
type ExpenseStatus = "approved" | "pending" | "rejected";

// Initial mock data for expense reports
const initialExpenseReports = [
  {
    id: "EXP-2023-001",
    title: "Client Meeting - New York",
    status: "approved" as ExpenseStatus,
    submittedBy: "David Wilson",
    totalAmount: 1850.75,
    dateSubmitted: "2023-05-08",
    tripDates: "May 2-5, 2023",
    categoryBreakdown: {
      "Airfare": 450,
      "Hotel": 850,
      "Meals": 320,
      "Transportation": 180,
      "Other": 50.75
    }
  },
  {
    id: "EXP-2023-002",
    title: "Conference - Chicago",
    status: "pending" as ExpenseStatus,
    submittedBy: "Sarah Johnson",
    totalAmount: 2450.00,
    dateSubmitted: "2023-05-15",
    tripDates: "May 12-14, 2023",
    categoryBreakdown: {
      "Airfare": 550,
      "Hotel": 1200,
      "Meals": 350,
      "Conference Fee": 300,
      "Transportation": 50
    }
  },
  {
    id: "EXP-2023-003",
    title: "Sales Meeting - Boston",
    status: "rejected" as ExpenseStatus,
    submittedBy: "Michael Chen",
    totalAmount: 1200.50,
    dateSubmitted: "2023-05-10",
    tripDates: "May 8-9, 2023",
    categoryBreakdown: {
      "Airfare": 400,
      "Hotel": 450,
      "Meals": 200,
      "Transportation": 150.50
    }
  }
];

interface ExpenseReport {
  id: string;
  title: string;
  status: ExpenseStatus;
  submittedBy: string;
  totalAmount: number;
  dateSubmitted: string;
  tripDates: string;
  categoryBreakdown: Record<string, number>;
}

interface ExpenseFormData {
  title: string;
  totalAmount: number;
  tripDates: string;
  airfare: number;
  hotel: number;
  meals: number;
  transportation: number;
  other: number;
}

const TravelExpenses = () => {
  const { toast } = useToast();
  const [expenseReports, setExpenseReports] = useState<ExpenseReport[]>(initialExpenseReports);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState<ExpenseReport | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const form = useForm<ExpenseFormData>({
    defaultValues: {
      title: "",
      totalAmount: 0,
      tripDates: "",
      airfare: 0,
      hotel: 0,
      meals: 0,
      transportation: 0,
      other: 0
    }
  });

  const editForm = useForm<ExpenseFormData>({
    defaultValues: {
      title: currentExpense?.title || "",
      totalAmount: currentExpense?.totalAmount || 0,
      tripDates: currentExpense?.tripDates || "",
      airfare: currentExpense?.categoryBreakdown?.Airfare || 0,
      hotel: currentExpense?.categoryBreakdown?.Hotel || 0,
      meals: currentExpense?.categoryBreakdown?.Meals || 0,
      transportation: currentExpense?.categoryBreakdown?.Transportation || 0,
      other: currentExpense?.categoryBreakdown?.Other || 0
    }
  });

  React.useEffect(() => {
    if (currentExpense) {
      editForm.reset({
        title: currentExpense.title,
        totalAmount: currentExpense.totalAmount,
        tripDates: currentExpense.tripDates,
        airfare: currentExpense.categoryBreakdown?.Airfare || 0,
        hotel: currentExpense.categoryBreakdown?.Hotel || 0,
        meals: currentExpense.categoryBreakdown?.Meals || 0,
        transportation: currentExpense.categoryBreakdown?.Transportation || 0,
        other: currentExpense.categoryBreakdown?.Other || 0
      });
    }
  }, [currentExpense, editForm]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'approved':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'rejected':
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const handleCreateExpense = (data: ExpenseFormData) => {
    const total = data.airfare + data.hotel + data.meals + data.transportation + data.other;
    
    const newExpense: ExpenseReport = {
      id: `EXP-${new Date().getFullYear()}-${(expenseReports.length + 1).toString().padStart(3, '0')}`,
      title: data.title,
      status: "pending",
      submittedBy: "Current User", // In a real app, this would be the logged-in user
      totalAmount: total,
      dateSubmitted: new Date().toISOString().split('T')[0],
      tripDates: data.tripDates,
      categoryBreakdown: {
        "Airfare": data.airfare,
        "Hotel": data.hotel,
        "Meals": data.meals,
        "Transportation": data.transportation,
        "Other": data.other
      }
    };

    setExpenseReports([newExpense, ...expenseReports]);
    setIsCreateDialogOpen(false);
    form.reset();
    
    toast({
      title: "Expense Report Created",
      description: "Your expense report has been submitted for approval.",
    });
  };

  const handleEditExpense = (data: ExpenseFormData) => {
    if (!currentExpense) return;
    
    const total = data.airfare + data.hotel + data.meals + data.transportation + data.other;
    
    const updatedExpense: ExpenseReport = {
      ...currentExpense,
      title: data.title,
      totalAmount: total,
      tripDates: data.tripDates,
      categoryBreakdown: {
        "Airfare": data.airfare,
        "Hotel": data.hotel,
        "Meals": data.meals,
        "Transportation": data.transportation,
        "Other": data.other
      }
    };

    const updatedExpenses = expenseReports.map(expense => 
      expense.id === currentExpense.id ? updatedExpense : expense
    );

    setExpenseReports(updatedExpenses);
    setIsEditDialogOpen(false);
    setCurrentExpense(null);
    
    toast({
      title: "Expense Report Updated",
      description: "Your expense report has been updated successfully.",
    });
  };

  const handleDeleteExpense = () => {
    if (!currentExpense) return;
    
    const updatedExpenses = expenseReports.filter(expense => 
      expense.id !== currentExpense.id
    );

    setExpenseReports(updatedExpenses);
    setIsDeleteDialogOpen(false);
    setCurrentExpense(null);
    
    toast({
      title: "Expense Report Deleted",
      description: "The expense report has been deleted.",
      variant: "destructive"
    });
  };

  const filteredExpenses = expenseReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          report.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalYTDExpenses = expenseReports.reduce((sum, report) => sum + report.totalAmount, 0);
  const pendingExpenses = expenseReports.filter(report => report.status === "pending");
  const pendingAmount = pendingExpenses.reduce((sum, report) => sum + report.totalAmount, 0);
  const approvedExpenses = expenseReports.filter(report => report.status === "approved");
  const reimbursedAmount = approvedExpenses.reduce((sum, report) => sum + report.totalAmount, 0);

  return (
    <ApplicationLayout 
      pageTitle="Travel & Expenses"
      pageLoadScript="Welcome to the Travel and Expenses module. Here you can create expense reports, manage travel requests, and track reimbursements."
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-md border border-gray-300 w-64 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Status:</span>
            <select 
              className="text-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            className="flex items-center gap-1"
          >
            <BarChart3 className="h-4 w-4" /> 
            Reports
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-coupa-blue hover:bg-coupa-darkblue text-white flex items-center gap-2"
              >
                <Plus className="h-4 w-4" /> 
                New Expense Report
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Create New Expense Report</DialogTitle>
                <DialogDescription>
                  Enter the details of your expense report. Click submit when you're done.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleCreateExpense)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="E.g., Business Trip to San Francisco" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tripDates"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trip Dates</FormLabel>
                        <FormControl>
                          <Input placeholder="E.g., Jun 1-5, 2023" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="airfare"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Airfare</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.01" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="hotel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hotel</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.01" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="meals"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meals</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.01" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="transportation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Transportation</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.01" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="other"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Other Expenses</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.01" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormItem>
                      <FormLabel>Total Amount</FormLabel>
                      <div className="h-10 px-3 py-2 border border-input rounded-md flex items-center bg-gray-50">
                        {formatCurrency(
                          (form.watch("airfare") || 0) + 
                          (form.watch("hotel") || 0) + 
                          (form.watch("meals") || 0) + 
                          (form.watch("transportation") || 0) + 
                          (form.watch("other") || 0)
                        )}
                      </div>
                    </FormItem>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                    <Button type="submit">Submit for Approval</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <VoiceElement
          whatScript="This card shows your year-to-date expense total."
          howScript="Use this to track overall spending for the year."
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">YTD Expenses</p>
                <h3 className="text-3xl font-bold text-coupa-blue">{formatCurrency(totalYTDExpenses)}</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Briefcase className="h-6 w-6 text-coupa-blue" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span className="font-medium">{expenseReports.length}</span> expense reports submitted
            </div>
          </Card>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This card shows pending expense reports awaiting approval."
          howScript="Monitor this to track reports that need action."
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending Approval</p>
                <h3 className="text-3xl font-bold text-yellow-500">{formatCurrency(pendingAmount)}</h3>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span className="font-medium">{pendingExpenses.length}</span> expense report{pendingExpenses.length !== 1 ? 's' : ''} awaiting approval
            </div>
          </Card>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This card shows the amount reimbursed to you this month."
          howScript="Track your monthly reimbursements here."
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Reimbursed This Month</p>
                <h3 className="text-3xl font-bold text-green-600">{formatCurrency(reimbursedAmount)}</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Check className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600">
              Processed on May 15, 2023
            </div>
          </Card>
        </VoiceElement>
      </div>
      
      <Card className="mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted By</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Date Submitted</TableHead>
              <TableHead>Trip Dates</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExpenses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                  No expense reports found
                </TableCell>
              </TableRow>
            ) : (
              filteredExpenses.map((report) => (
                <VoiceElement
                  key={report.id}
                  whatScript={`This is expense report ${report.id} for ${report.title}.`}
                  howScript="Click on this row to view expense details or take action."
                >
                  <TableRow className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-gray-400 mr-2" />
                        {report.id}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{report.title}</TableCell>
                    <TableCell>
                      <span 
                        className={`px-2 py-1 rounded-full text-xs font-medium flex items-center w-fit gap-1 ${
                          report.status === 'approved' 
                            ? 'bg-green-100 text-green-800' 
                            : report.status === 'pending' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {getStatusIcon(report.status)}
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{report.submittedBy}</TableCell>
                    <TableCell>{formatCurrency(report.totalAmount)}</TableCell>
                    <TableCell className="text-gray-600">
                      <div className="flex items-center text-sm">
                        <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
                        {report.dateSubmitted}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{report.tripDates}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog open={isEditDialogOpen && currentExpense?.id === report.id} onOpenChange={(open) => {
                          setIsEditDialogOpen(open);
                          if (open) setCurrentExpense(report);
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => {
                              setCurrentExpense(report);
                              setIsEditDialogOpen(true);
                            }}>
                              <Edit className="h-4 w-4 text-gray-500" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[625px]">
                            <DialogHeader>
                              <DialogTitle>Edit Expense Report</DialogTitle>
                              <DialogDescription>
                                Update the details of your expense report.
                              </DialogDescription>
                            </DialogHeader>
                            <Form {...editForm}>
                              <form onSubmit={editForm.handleSubmit(handleEditExpense)} className="space-y-4">
                                <FormField
                                  control={editForm.control}
                                  name="title"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Title</FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={editForm.control}
                                  name="tripDates"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Trip Dates</FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                  <FormField
                                    control={editForm.control}
                                    name="airfare"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Airfare</FormLabel>
                                        <FormControl>
                                          <Input type="number" step="0.01" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={editForm.control}
                                    name="hotel"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Hotel</FormLabel>
                                        <FormControl>
                                          <Input type="number" step="0.01" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={editForm.control}
                                    name="meals"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Meals</FormLabel>
                                        <FormControl>
                                          <Input type="number" step="0.01" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={editForm.control}
                                    name="transportation"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Transportation</FormLabel>
                                        <FormControl>
                                          <Input type="number" step="0.01" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={editForm.control}
                                    name="other"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Other Expenses</FormLabel>
                                        <FormControl>
                                          <Input type="number" step="0.01" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormItem>
                                    <FormLabel>Total Amount</FormLabel>
                                    <div className="h-10 px-3 py-2 border border-input rounded-md flex items-center bg-gray-50">
                                      {formatCurrency(
                                        (editForm.watch("airfare") || 0) + 
                                        (editForm.watch("hotel") || 0) + 
                                        (editForm.watch("meals") || 0) + 
                                        (editForm.watch("transportation") || 0) + 
                                        (editForm.watch("other") || 0)
                                      )}
                                    </div>
                                  </FormItem>
                                </div>
                                <DialogFooter>
                                  <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                                  <Button type="submit">Update Expense</Button>
                                </DialogFooter>
                              </form>
                            </Form>
                          </DialogContent>
                        </Dialog>
                        
                        <Dialog open={isDeleteDialogOpen && currentExpense?.id === report.id} onOpenChange={(open) => {
                          setIsDeleteDialogOpen(open);
                          if (open) setCurrentExpense(report);
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-red-500" onClick={() => {
                              setCurrentExpense(report);
                              setIsDeleteDialogOpen(true);
                            }}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Confirm Deletion</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to delete this expense report? This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="mt-4">
                              <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                              <Button type="button" variant="destructive" onClick={handleDeleteExpense}>Delete</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <Button variant="ghost" size="sm" className="text-coupa-blue">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </VoiceElement>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
      
      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <div>Showing {filteredExpenses.length} of {expenseReports.length} expense reports</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <span className="px-3 py-1 border rounded">1</span>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </ApplicationLayout>
  );
};

export default TravelExpenses;
