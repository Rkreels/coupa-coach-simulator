
import React, { useState } from 'react';
import { ApplicationLayout } from '../components/ApplicationLayout';
import { VoiceElement } from '../components/VoiceElement';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, ArrowRight, FileText, Clock, Check, X, Edit, Trash2, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from "@/components/ui/textarea";

// Define the status type to ensure consistency
type RequestStatus = "approved" | "pending" | "rejected";

// Initial mock data for requests
const initialRequests = [
  {
    id: "REQ-2023-001",
    title: "IT Support for Marketing Event",
    type: "Service Request",
    status: "approved" as RequestStatus,
    requestedBy: "Sarah Johnson",
    dateCreated: "2023-05-12",
    dateNeeded: "2023-06-01",
    priority: "Medium",
    description: "Need IT support for upcoming marketing event including A/V setup and technical assistance."
  },
  {
    id: "REQ-2023-002",
    title: "Office Relocation Support",
    type: "Service Request",
    status: "pending" as RequestStatus,
    requestedBy: "John Smith",
    dateCreated: "2023-05-15",
    dateNeeded: "2023-06-15",
    priority: "High",
    description: "Support needed for relocating 25 staff members to the new office space."
  },
  {
    id: "REQ-2023-003",
    title: "Software License Request - Adobe Suite",
    type: "Software Request",
    status: "rejected" as RequestStatus,
    requestedBy: "Emily Davis",
    dateCreated: "2023-05-10",
    dateNeeded: "2023-05-25",
    priority: "Low",
    description: "Need Adobe Creative Suite licenses for the design team of 3 members."
  },
  {
    id: "REQ-2023-004",
    title: "Catering for Department Meeting",
    type: "Service Request",
    status: "approved" as RequestStatus,
    requestedBy: "Michael Chen",
    dateCreated: "2023-05-08",
    dateNeeded: "2023-05-20",
    priority: "Medium",
    description: "Catering for quarterly department meeting for 20 people."
  }
];

interface Request {
  id: string;
  title: string;
  type: string;
  status: RequestStatus;
  requestedBy: string;
  dateCreated: string;
  dateNeeded: string;
  priority: 'High' | 'Medium' | 'Low';
  description: string;
}

interface RequestFormData {
  title: string;
  type: string;
  dateNeeded: string;
  priority: 'High' | 'Medium' | 'Low';
  description: string;
}

const requestTypes = [
  "Service Request", 
  "Software Request", 
  "Hardware Request", 
  "Access Request", 
  "Facility Request",
  "Other"
];

const Requests = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<Request | null>(null);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  
  const form = useForm<RequestFormData>({
    defaultValues: {
      title: "",
      type: "Service Request",
      dateNeeded: "",
      priority: "Medium",
      description: ""
    }
  });

  const editForm = useForm<RequestFormData>({
    defaultValues: {
      title: currentRequest?.title || "",
      type: currentRequest?.type || "Service Request",
      dateNeeded: currentRequest?.dateNeeded || "",
      priority: currentRequest?.priority || "Medium",
      description: currentRequest?.description || ""
    }
  });

  React.useEffect(() => {
    if (currentRequest) {
      editForm.reset({
        title: currentRequest.title,
        type: currentRequest.type,
        dateNeeded: currentRequest.dateNeeded,
        priority: currentRequest.priority,
        description: currentRequest.description
      });
    }
  }, [currentRequest, editForm]);

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

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'High':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">High</span>;
      case 'Medium':
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Medium</span>;
      case 'Low':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Low</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">{priority}</span>;
    }
  };

  const handleCreateRequest = (data: RequestFormData) => {
    const newRequest: Request = {
      id: `REQ-${new Date().getFullYear()}-${(requests.length + 1).toString().padStart(3, '0')}`,
      title: data.title,
      type: data.type,
      status: "pending",
      requestedBy: "Current User", // In a real app, this would be the logged-in user
      dateCreated: new Date().toISOString().split('T')[0],
      dateNeeded: data.dateNeeded,
      priority: data.priority,
      description: data.description
    };

    setRequests([newRequest, ...requests]);
    setIsCreateDialogOpen(false);
    form.reset();
    
    toast({
      title: "Request Created",
      description: "Your request has been submitted successfully.",
    });
  };

  const handleEditRequest = (data: RequestFormData) => {
    if (!currentRequest) return;
    
    const updatedRequest: Request = {
      ...currentRequest,
      title: data.title,
      type: data.type,
      dateNeeded: data.dateNeeded,
      priority: data.priority,
      description: data.description
    };

    const updatedRequests = requests.map(request => 
      request.id === currentRequest.id ? updatedRequest : request
    );

    setRequests(updatedRequests);
    setIsEditDialogOpen(false);
    setCurrentRequest(null);
    
    toast({
      title: "Request Updated",
      description: "Your request has been updated successfully.",
    });
  };

  const handleDeleteRequest = () => {
    if (!currentRequest) return;
    
    const updatedRequests = requests.filter(request => 
      request.id !== currentRequest.id
    );

    setRequests(updatedRequests);
    setIsDeleteDialogOpen(false);
    setCurrentRequest(null);
    
    toast({
      title: "Request Deleted",
      description: "The request has been deleted.",
      variant: "destructive"
    });
  };

  const handleStatusChange = (requestId: string, newStatus: 'approved' | 'pending' | 'rejected') => {
    const updatedRequests = requests.map(request => 
      request.id === requestId ? { ...request, status: newStatus } : request
    );

    setRequests(updatedRequests);
    
    toast({
      title: `Request ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`,
      description: `The request has been ${newStatus}.`,
    });
  };

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          req.requestedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || req.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const countByStatus = {
    all: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length
  };

  return (
    <ApplicationLayout 
      pageTitle="Requests"
      pageLoadScript="Welcome to Requests. Here you can make and manage various types of requests including service requests, software licenses, and other non-purchase items."
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search requests..."
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
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-coupa-blue hover:bg-coupa-darkblue text-white flex items-center gap-2"
            >
              <Plus className="h-4 w-4" /> 
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Create New Request</DialogTitle>
              <DialogDescription>
                Enter the details of your request. Click submit when you're done.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleCreateRequest)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., IT Support for Marketing Event" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Request Type</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {requestTypes.map(type => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="dateNeeded"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date Needed</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Provide details about your request..."
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                  <Button type="submit">Submit Request</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <VoiceElement
          whatScript="This shows all requests requiring your attention."
          howScript="Click to view all requests."
        >
          <Card 
            className="p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-blue-500"
            onClick={() => setStatusFilter("all")}
          >
            <h3 className="font-medium">All Requests</h3>
            <p className="text-2xl font-bold mt-2">{countByStatus.all}</p>
            <p className="text-sm text-gray-600">Total requests</p>
          </Card>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This shows requests pending approval."
          howScript="Click to view pending requests."
        >
          <Card 
            className="p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-yellow-500"
            onClick={() => setStatusFilter("pending")}
          >
            <h3 className="font-medium">Pending</h3>
            <p className="text-2xl font-bold mt-2">{countByStatus.pending}</p>
            <p className="text-sm text-gray-600">Awaiting approval</p>
          </Card>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This shows approved requests."
          howScript="Click to view approved requests."
        >
          <Card 
            className="p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-green-500"
            onClick={() => setStatusFilter("approved")}
          >
            <h3 className="font-medium">Approved</h3>
            <p className="text-2xl font-bold mt-2">{countByStatus.approved}</p>
            <p className="text-sm text-gray-600">Ready for fulfillment</p>
          </Card>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This shows rejected requests."
          howScript="Click to view rejected requests."
        >
          <Card 
            className="p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-red-500"
            onClick={() => setStatusFilter("rejected")}
          >
            <h3 className="font-medium">Rejected</h3>
            <p className="text-2xl font-bold mt-2">{countByStatus.rejected}</p>
            <p className="text-sm text-gray-600">Requires attention</p>
          </Card>
        </VoiceElement>
      </div>
      
      <Card className="mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request #</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Requested By</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Needed By</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-6 text-gray-500">
                  No requests found
                </TableCell>
              </TableRow>
            ) : (
              filteredRequests.map((req) => (
                <VoiceElement
                  key={req.id}
                  whatScript={`This is request ${req.id} for ${req.title}.`}
                  howScript="Click on this row to view request details or take action."
                >
                  <TableRow className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-gray-400 mr-2" />
                        {req.id}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{req.title}</TableCell>
                    <TableCell>{req.type}</TableCell>
                    <TableCell>
                      <span 
                        className={`px-2 py-1 rounded-full text-xs font-medium flex items-center w-fit gap-1 ${
                          req.status === 'approved' 
                            ? 'bg-green-100 text-green-800' 
                            : req.status === 'pending' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {getStatusIcon(req.status)}
                        {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{req.requestedBy}</TableCell>
                    <TableCell className="text-gray-600">
                      <div className="flex items-center text-sm">
                        <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
                        {req.dateCreated}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{req.dateNeeded}</TableCell>
                    <TableCell>{getPriorityBadge(req.priority)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        {req.status === 'pending' && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-green-600"
                              onClick={() => handleStatusChange(req.id, 'approved')}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-600"
                              onClick={() => handleStatusChange(req.id, 'rejected')}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        
                        <Dialog open={isViewDetailsOpen && currentRequest?.id === req.id} onOpenChange={(open) => {
                          setIsViewDetailsOpen(open);
                          if (open) setCurrentRequest(req);
                        }}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-gray-600"
                              onClick={() => {
                                setCurrentRequest(req);
                                setIsViewDetailsOpen(true);
                              }}
                            >
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{req.title}</DialogTitle>
                              <span 
                                className={`px-2 py-1 rounded-full text-xs font-medium inline-block mt-2 ${
                                  req.status === 'approved' 
                                    ? 'bg-green-100 text-green-800' 
                                    : req.status === 'pending' 
                                      ? 'bg-yellow-100 text-yellow-800' 
                                      : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                              </span>
                            </DialogHeader>
                            
                            <div className="space-y-4 mt-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-gray-500">Request ID</p>
                                  <p className="font-medium">{req.id}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Type</p>
                                  <p className="font-medium">{req.type}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Requested By</p>
                                  <p className="font-medium">{req.requestedBy}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Priority</p>
                                  <p>{getPriorityBadge(req.priority)}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Date Created</p>
                                  <p className="font-medium">{req.dateCreated}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Date Needed</p>
                                  <p className="font-medium">{req.dateNeeded}</p>
                                </div>
                              </div>
                              
                              <div>
                                <p className="text-sm text-gray-500">Description</p>
                                <p className="mt-1 p-3 bg-gray-50 rounded">{req.description}</p>
                              </div>
                            </div>
                            
                            <DialogFooter className="gap-2">
                              {req.status === 'pending' && (
                                <div className="flex gap-2 mt-4">
                                  <Button 
                                    variant="outline" 
                                    className="text-green-600"
                                    onClick={() => {
                                      handleStatusChange(req.id, 'approved');
                                      setIsViewDetailsOpen(false);
                                    }}
                                  >
                                    <Check className="h-4 w-4 mr-1" />
                                    Approve
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    className="text-red-600"
                                    onClick={() => {
                                      handleStatusChange(req.id, 'rejected');
                                      setIsViewDetailsOpen(false);
                                    }}
                                  >
                                    <X className="h-4 w-4 mr-1" />
                                    Reject
                                  </Button>
                                </div>
                              )}
                              
                              <div className="flex gap-2 ml-auto mt-4">
                                <Dialog open={isEditDialogOpen && currentRequest?.id === req.id} onOpenChange={(open) => {
                                  setIsEditDialogOpen(open);
                                  if (open) {
                                    setCurrentRequest(req);
                                    setIsViewDetailsOpen(false);
                                  }
                                }}>
                                  <DialogTrigger asChild>
                                    <Button variant="outline">
                                      <Edit className="h-4 w-4 mr-1" />
                                      Edit
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Edit Request</DialogTitle>
                                      <DialogDescription>
                                        Update the details of your request.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <Form {...editForm}>
                                      <form onSubmit={editForm.handleSubmit(handleEditRequest)} className="space-y-4">
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
                                        <div className="grid grid-cols-2 gap-4">
                                          <FormField
                                            control={editForm.control}
                                            name="type"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Request Type</FormLabel>
                                                <Select 
                                                  onValueChange={field.onChange} 
                                                  value={field.value}
                                                >
                                                  <FormControl>
                                                    <SelectTrigger>
                                                      <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                  </FormControl>
                                                  <SelectContent>
                                                    {requestTypes.map(type => (
                                                      <SelectItem key={type} value={type}>{type}</SelectItem>
                                                    ))}
                                                  </SelectContent>
                                                </Select>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                          <FormField
                                            control={editForm.control}
                                            name="priority"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Priority</FormLabel>
                                                <Select 
                                                  onValueChange={field.onChange} 
                                                  value={field.value}
                                                >
                                                  <FormControl>
                                                    <SelectTrigger>
                                                      <SelectValue placeholder="Select priority" />
                                                    </SelectTrigger>
                                                  </FormControl>
                                                  <SelectContent>
                                                    <SelectItem value="High">High</SelectItem>
                                                    <SelectItem value="Medium">Medium</SelectItem>
                                                    <SelectItem value="Low">Low</SelectItem>
                                                  </SelectContent>
                                                </Select>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                        </div>
                                        <FormField
                                          control={editForm.control}
                                          name="dateNeeded"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>Date Needed</FormLabel>
                                              <FormControl>
                                                <Input type="date" {...field} />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                        <FormField
                                          control={editForm.control}
                                          name="description"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>Description</FormLabel>
                                              <FormControl>
                                                <Textarea 
                                                  className="min-h-[100px]"
                                                  {...field} 
                                                />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                        <DialogFooter>
                                          <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                                          <Button type="submit">Update Request</Button>
                                        </DialogFooter>
                                      </form>
                                    </Form>
                                  </DialogContent>
                                </Dialog>
                                
                                <Dialog open={isDeleteDialogOpen && currentRequest?.id === req.id} onOpenChange={(open) => {
                                  setIsDeleteDialogOpen(open);
                                  if (open) {
                                    setCurrentRequest(req);
                                    setIsViewDetailsOpen(false);
                                  }
                                }}>
                                  <DialogTrigger asChild>
                                    <Button variant="destructive">
                                      <Trash2 className="h-4 w-4 mr-1" />
                                      Delete
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Confirm Deletion</DialogTitle>
                                      <DialogDescription>
                                        Are you sure you want to delete this request? This action cannot be undone.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter className="mt-4">
                                      <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                                      <Button type="button" variant="destructive" onClick={handleDeleteRequest}>Delete</Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <Dialog open={isEditDialogOpen && currentRequest?.id === req.id} onOpenChange={(open) => {
                          setIsEditDialogOpen(open);
                          if (open) setCurrentRequest(req);
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => {
                              setCurrentRequest(req);
                              setIsEditDialogOpen(true);
                            }}>
                              <Edit className="h-4 w-4 text-gray-500" />
                            </Button>
                          </DialogTrigger>
                        </Dialog>
                        
                        <Dialog open={isDeleteDialogOpen && currentRequest?.id === req.id} onOpenChange={(open) => {
                          setIsDeleteDialogOpen(open);
                          if (open) setCurrentRequest(req);
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-red-500" onClick={() => {
                              setCurrentRequest(req);
                              setIsDeleteDialogOpen(true);
                            }}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                        </Dialog>
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
        <div>Showing {filteredRequests.length} of {requests.length} requests</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <span className="px-3 py-1 border rounded">1</span>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </ApplicationLayout>
  );
};

export default Requests;
