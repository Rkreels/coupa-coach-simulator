
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Plus, 
  Calendar, 
  User, 
  Filter,
  Search,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  dueDate: string;
  assignedBy: string;
  category: 'approval' | 'review' | 'action' | 'follow-up';
  relatedTo?: string;
  completed: boolean;
  createdAt: string;
}

export const MyTasksWidget: React.FC = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Approve Requisition REQ-2024-001',
      description: 'Review and approve office supplies requisition for Marketing team',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-01-20',
      assignedBy: 'Sarah Johnson',
      category: 'approval',
      relatedTo: 'REQ-2024-001',
      completed: false,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Review Contract Amendment',
      description: 'Review terms and conditions for supplier contract amendment',
      priority: 'medium',
      status: 'in-progress',
      dueDate: '2024-01-22',
      assignedBy: 'Legal Team',
      category: 'review',
      completed: false,
      createdAt: '2024-01-16'
    },
    {
      id: '3',
      title: 'Update Supplier Information',
      description: 'Update contact details and certification status for key suppliers',
      priority: 'low',
      status: 'pending',
      dueDate: '2024-01-25',
      assignedBy: 'Procurement Team',
      category: 'action',
      completed: false,
      createdAt: '2024-01-17'
    },
    {
      id: '4',
      title: 'Follow up on Invoice Payment',
      description: 'Check payment status for overdue invoices',
      priority: 'urgent',
      status: 'overdue',
      dueDate: '2024-01-18',
      assignedBy: 'Finance Department',
      category: 'follow-up',
      completed: false,
      createdAt: '2024-01-14'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTaskDialogOpen, setNewTaskDialogOpen] = useState(false);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            completed: !task.completed,
            status: !task.completed ? 'completed' : 'pending'
          }
        : task
    ));
    
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      toast({
        title: task.completed ? 'Task Reopened' : 'Task Completed',
        description: `"${task.title}" has been ${task.completed ? 'reopened' : 'marked as complete'}.`
      });
    }
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast({
      title: 'Task Deleted',
      description: 'Task has been removed from your list.',
      variant: 'destructive'
    });
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const overdueTasks = tasks.filter(task => new Date(task.dueDate) < new Date() && !task.completed);
  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold">{pendingTasks.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm text-gray-500">Overdue</p>
                <p className="text-2xl font-bold">{overdueTasks.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold">{completedTasks.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-2xl font-bold">{tasks.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select 
                value={priorityFilter} 
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">All Priorities</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
              </select>

              <Button onClick={() => setNewTaskDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Task
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            My Tasks ({filteredTasks.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div 
                key={task.id} 
                className={`p-4 border rounded-lg hover:shadow-md transition-shadow ${
                  task.completed ? 'opacity-60 bg-gray-50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <Checkbox 
                      checked={task.completed}
                      onCheckedChange={() => toggleTaskCompletion(task.id)}
                      className="mt-1"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                          {task.title}
                        </h3>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </Badge>
                        <Badge className={getStatusColor(task.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(task.status)}
                            {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
                          </div>
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          Assigned by: {task.assignedBy}
                        </div>
                        {task.relatedTo && (
                          <div>Related: {task.relatedTo}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedTask(task);
                        setDialogOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500"
                      onClick={() => deleteTask(task.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredTasks.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No tasks found matching your criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Task Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Task Details</DialogTitle>
          </DialogHeader>
          {selectedTask && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{selectedTask.title}</h3>
                <p className="text-gray-600">{selectedTask.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Priority</label>
                  <Badge className={getPriorityColor(selectedTask.priority)}>
                    {selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1)}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <Badge className={getStatusColor(selectedTask.status)}>
                    {selectedTask.status.charAt(0).toUpperCase() + selectedTask.status.slice(1)}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Due Date</label>
                  <p>{new Date(selectedTask.dueDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Assigned By</label>
                  <p>{selectedTask.assignedBy}</p>
                </div>
              </div>
              
              {selectedTask.relatedTo && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Related To</label>
                  <p>{selectedTask.relatedTo}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
