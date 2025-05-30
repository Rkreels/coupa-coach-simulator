
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  ShoppingCart, 
  FileText, 
  Users, 
  DollarSign, 
  Calendar, 
  Package, 
  TrendingUp,
  CheckCircle,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  Download,
  Upload,
  Settings,
  Mail,
  Phone,
  MessageSquare
} from 'lucide-react';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'procurement' | 'finance' | 'suppliers' | 'reports' | 'communication';
  frequency: 'high' | 'medium' | 'low';
  action: () => void;
  requiresApproval?: boolean;
  estimatedTime?: string;
}

export const QuickActionsWidget: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const quickActions: QuickAction[] = [
    {
      id: '1',
      title: 'Create Requisition',
      description: 'Start a new purchase requisition',
      icon: <Plus className="h-5 w-5" />,
      category: 'procurement',
      frequency: 'high',
      estimatedTime: '5-10 min',
      action: () => navigate('/requisitions')
    },
    {
      id: '2',
      title: 'Quick Order',
      description: 'Place an order from catalog',
      icon: <ShoppingCart className="h-5 w-5" />,
      category: 'procurement',
      frequency: 'high',
      estimatedTime: '2-5 min',
      action: () => {
        toast({
          title: 'Quick Order',
          description: 'Opening quick order form...'
        });
      }
    },
    {
      id: '3',
      title: 'Create Invoice',
      description: 'Generate a new invoice',
      icon: <FileText className="h-5 w-5" />,
      category: 'finance',
      frequency: 'medium',
      estimatedTime: '10-15 min',
      action: () => navigate('/invoices')
    },
    {
      id: '4',
      title: 'Add Supplier',
      description: 'Register a new supplier',
      icon: <Users className="h-5 w-5" />,
      category: 'suppliers',
      frequency: 'medium',
      estimatedTime: '15-20 min',
      requiresApproval: true,
      action: () => navigate('/suppliers')
    },
    {
      id: '5',
      title: 'Process Payment',
      description: 'Approve and process payments',
      icon: <DollarSign className="h-5 w-5" />,
      category: 'finance',
      frequency: 'high',
      estimatedTime: '3-5 min',
      requiresApproval: true,
      action: () => navigate('/payments')
    },
    {
      id: '6',
      title: 'Schedule Meeting',
      description: 'Set up supplier or team meetings',
      icon: <Calendar className="h-5 w-5" />,
      category: 'communication',
      frequency: 'medium',
      estimatedTime: '5 min',
      action: () => {
        toast({
          title: 'Meeting Scheduler',
          description: 'Opening calendar integration...'
        });
      }
    },
    {
      id: '7',
      title: 'Track Shipment',
      description: 'Monitor order delivery status',
      icon: <Package className="h-5 w-5" />,
      category: 'procurement',
      frequency: 'medium',
      estimatedTime: '1-2 min',
      action: () => {
        toast({
          title: 'Shipment Tracking',
          description: 'Opening tracking dashboard...'
        });
      }
    },
    {
      id: '8',
      title: 'Generate Report',
      description: 'Create procurement analytics reports',
      icon: <TrendingUp className="h-5 w-5" />,
      category: 'reports',
      frequency: 'low',
      estimatedTime: '5-10 min',
      action: () => navigate('/analytics')
    },
    {
      id: '9',
      title: 'Approve Request',
      description: 'Review and approve pending requests',
      icon: <CheckCircle className="h-5 w-5" />,
      category: 'procurement',
      frequency: 'high',
      estimatedTime: '2-3 min',
      action: () => {
        toast({
          title: 'Approval Queue',
          description: 'Opening pending approvals...'
        });
      }
    },
    {
      id: '10',
      title: 'Download Template',
      description: 'Get procurement document templates',
      icon: <Download className="h-5 w-5" />,
      category: 'reports',
      frequency: 'low',
      estimatedTime: '1 min',
      action: () => {
        toast({
          title: 'Template Download',
          description: 'Preparing document templates...'
        });
      }
    },
    {
      id: '11',
      title: 'Upload Documents',
      description: 'Submit contracts and certifications',
      icon: <Upload className="h-5 w-5" />,
      category: 'suppliers',
      frequency: 'medium',
      estimatedTime: '5-10 min',
      action: () => {
        toast({
          title: 'Document Upload',
          description: 'Opening file upload interface...'
        });
      }
    },
    {
      id: '12',
      title: 'Send Message',
      description: 'Communicate with suppliers or team',
      icon: <MessageSquare className="h-5 w-5" />,
      category: 'communication',
      frequency: 'medium',
      estimatedTime: '2-5 min',
      action: () => {
        toast({
          title: 'Messaging',
          description: 'Opening communication center...'
        });
      }
    }
  ];

  const filteredActions = quickActions.filter(action => {
    const matchesCategory = selectedCategory === 'all' || action.category === selectedCategory;
    const matchesSearch = action.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         action.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'high': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'procurement': return <ShoppingCart className="h-4 w-4" />;
      case 'finance': return <DollarSign className="h-4 w-4" />;
      case 'suppliers': return <Users className="h-4 w-4" />;
      case 'reports': return <TrendingUp className="h-4 w-4" />;
      case 'communication': return <MessageSquare className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'procurement', label: 'Procurement' },
    { value: 'finance', label: 'Finance' },
    { value: 'suppliers', label: 'Suppliers' },
    { value: 'reports', label: 'Reports' },
    { value: 'communication', label: 'Communication' }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Frequently Used</p>
                <p className="text-2xl font-bold">
                  {quickActions.filter(a => a.frequency === 'high').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-500">Need Approval</p>
                <p className="text-2xl font-bold">
                  {quickActions.filter(a => a.requiresApproval).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-500">Total Actions</p>
                <p className="text-2xl font-bold">{quickActions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search quick actions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-md"
                />
              </div>
            </div>
            
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredActions.map((action) => (
          <Card 
            key={action.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={action.action}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    {action.icon}
                  </div>
                  <div>
                    <CardTitle className="text-base">{action.title}</CardTitle>
                  </div>
                </div>
                {action.requiresApproval && (
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">{action.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    <div className="flex items-center gap-1">
                      {getCategoryIcon(action.category)}
                      {action.category.charAt(0).toUpperCase() + action.category.slice(1)}
                    </div>
                  </Badge>
                  <Badge className={getFrequencyColor(action.frequency)}>
                    {action.frequency.charAt(0).toUpperCase() + action.frequency.slice(1)}
                  </Badge>
                </div>
                
                {action.estimatedTime && (
                  <span className="text-xs text-gray-500">
                    <Clock className="h-3 w-3 inline mr-1" />
                    {action.estimatedTime}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredActions.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No actions found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
