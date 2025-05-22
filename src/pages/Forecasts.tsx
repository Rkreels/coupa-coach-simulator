
import React, { useState } from 'react';
import { ApplicationLayout } from '../components/ApplicationLayout';
import { VoiceElement } from '../components/VoiceElement';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, TrendingUp, RefreshCw, Plus, Settings, ArrowRight, Edit, Trash2, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Initial forecast data
const initialForecasts = [
  { 
    id: 1, 
    name: "Annual IT Budget Forecast", 
    type: "Department", 
    period: "FY 2023", 
    lastUpdated: "2023-05-10", 
    owner: "John Smith",
    amount: 1250000,
    growth: 8.4
  },
  { 
    id: 2, 
    name: "Office Equipment Procurement", 
    type: "Category", 
    period: "Q2-Q4 2023", 
    lastUpdated: "2023-05-08", 
    owner: "Sarah Johnson",
    amount: 450000,
    growth: 3.2
  },
  { 
    id: 3, 
    name: "Global Marketing Spend", 
    type: "Department", 
    period: "FY 2023", 
    lastUpdated: "2023-05-15", 
    owner: "Michael Chen",
    amount: 2800000,
    growth: 12.5
  },
  { 
    id: 4, 
    name: "Research & Development", 
    type: "Department", 
    period: "FY 2023-2024", 
    lastUpdated: "2023-05-12", 
    owner: "Robert Martinez",
    amount: 3500000,
    growth: 15.8
  }
];

interface Forecast {
  id: number;
  name: string;
  type: string;
  period: string;
  lastUpdated: string;
  owner: string;
  amount: number;
  growth: number;
}

interface ForecastFormData {
  name: string;
  type: string;
  period: string;
  owner: string;
  amount: number;
  growth: number;
}

const forecastTypes = ["Department", "Category", "Project", "Region", "Customer"];
const forecastPeriods = ["Q1 2023", "Q2 2023", "Q3 2023", "Q4 2023", "FY 2023", "FY 2023-2024"];

const Forecasts = () => {
  const { toast } = useToast();
  const [forecasts, setForecasts] = useState<Forecast[]>(initialForecasts);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentForecast, setCurrentForecast] = useState<Forecast | null>(null);
  
  const form = useForm<ForecastFormData>({
    defaultValues: {
      name: '',
      type: 'Department',
      period: 'FY 2023',
      owner: '',
      amount: 0,
      growth: 0
    }
  });

  const editForm = useForm<ForecastFormData>({
    defaultValues: {
      name: currentForecast?.name || '',
      type: currentForecast?.type || 'Department',
      period: currentForecast?.period || 'FY 2023',
      owner: currentForecast?.owner || '',
      amount: currentForecast?.amount || 0,
      growth: currentForecast?.growth || 0
    }
  });

  React.useEffect(() => {
    if (currentForecast) {
      editForm.reset({
        name: currentForecast.name,
        type: currentForecast.type,
        period: currentForecast.period,
        owner: currentForecast.owner,
        amount: currentForecast.amount,
        growth: currentForecast.growth
      });
    }
  }, [currentForecast, editForm]);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K`;
    }
    return `$${amount.toFixed(2)}`;
  };

  const handleCreateForecast = (data: ForecastFormData) => {
    const newForecast: Forecast = {
      id: Math.max(0, ...forecasts.map(f => f.id)) + 1,
      name: data.name,
      type: data.type,
      period: data.period,
      lastUpdated: new Date().toISOString().split('T')[0],
      owner: data.owner,
      amount: data.amount,
      growth: data.growth
    };

    setForecasts([newForecast, ...forecasts]);
    setIsCreateDialogOpen(false);
    form.reset();

    toast({
      title: "Forecast Created",
      description: `${data.name} has been created successfully.`
    });
  };

  const handleEditForecast = (data: ForecastFormData) => {
    if (!currentForecast) return;

    const updatedForecast: Forecast = {
      ...currentForecast,
      name: data.name,
      type: data.type,
      period: data.period,
      lastUpdated: new Date().toISOString().split('T')[0],
      owner: data.owner,
      amount: data.amount,
      growth: data.growth
    };

    const updatedForecasts = forecasts.map(forecast => 
      forecast.id === currentForecast.id ? updatedForecast : forecast
    );

    setForecasts(updatedForecasts);
    setIsEditDialogOpen(false);
    setCurrentForecast(null);

    toast({
      title: "Forecast Updated",
      description: `${data.name} has been updated successfully.`
    });
  };

  const handleDeleteForecast = () => {
    if (!currentForecast) return;

    const updatedForecasts = forecasts.filter(forecast => 
      forecast.id !== currentForecast.id
    );

    setForecasts(updatedForecasts);
    setIsDeleteDialogOpen(false);
    setCurrentForecast(null);

    toast({
      title: "Forecast Deleted",
      description: `${currentForecast.name} has been deleted.`,
      variant: "destructive"
    });
  };

  const filteredForecasts = forecasts.filter(forecast =>
    forecast.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    forecast.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    forecast.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate summary metrics
  const totalAnnualForecast = forecasts.reduce((total, forecast) => total + forecast.amount, 0);
  const q3Forecast = forecasts.filter(f => f.period.includes('Q3')).reduce((total, forecast) => total + forecast.amount, 0) || 1350000;
  const savingsTarget = 1000000;
  const savingsProgress = 680000;

  return (
    <ApplicationLayout 
      pageTitle="Forecasts"
      pageLoadScript="Welcome to Forecasts. This module helps you predict future spend, identify budget trends, and plan procurement activities based on historical data and market trends."
    >
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search forecasts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-transparent"
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-coupa-blue hover:bg-coupa-darkblue text-white flex items-center gap-2"
              >
                <Plus className="h-4 w-4" /> 
                New Forecast
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Create New Forecast</DialogTitle>
                <DialogDescription>
                  Enter the details for your new forecast. Click create when you're done.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleCreateForecast)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Forecast Name</FormLabel>
                        <FormControl>
                          <Input placeholder="E.g., Annual IT Budget Forecast" {...field} />
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
                          <FormLabel>Type</FormLabel>
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
                              {forecastTypes.map(type => (
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
                      name="period"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Period</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select period" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {forecastPeriods.map(period => (
                                <SelectItem key={period} value={period}>{period}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="owner"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Owner</FormLabel>
                          <FormControl>
                            <Input placeholder="E.g., John Smith" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Forecast Amount ($)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="E.g., 1000000" 
                              {...field} 
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="growth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Growth Rate (%)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.1" 
                              placeholder="E.g., 5.2" 
                              {...field} 
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                    <Button type="submit">Create Forecast</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <VoiceElement
          whatScript="This shows your forecasted annual spend."
          howScript="Use this to plan your annual budget."
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Annual Forecast</p>
                <h3 className="text-3xl font-bold text-coupa-blue">{formatCurrency(totalAnnualForecast)}</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-coupa-blue" />
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600">
              <span className="font-medium">+{(forecasts.reduce((sum, f) => sum + f.growth, 0) / forecasts.length).toFixed(1)}%</span> vs. previous year
            </div>
          </Card>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This shows your upcoming quarter's forecasted spend."
          howScript="Use this for quarterly budget planning."
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Q3 2023 Forecast</p>
                <h3 className="text-3xl font-bold text-purple-600">{formatCurrency(q3Forecast)}</h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-purple-600">
              <span className="font-medium">+12.2%</span> vs. Q2 2023
            </div>
          </Card>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This shows your savings target progress."
          howScript="Track how you're performing against cost-saving goals."
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Savings Target Progress</p>
                <h3 className="text-3xl font-bold text-green-600">{Math.round((savingsProgress / savingsTarget) * 100)}%</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600">
              {formatCurrency(savingsProgress)} of {formatCurrency(savingsTarget)} annual target
            </div>
          </Card>
        </VoiceElement>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <VoiceElement
          whatScript="This chart shows your forecasted spending across categories."
          howScript="Use this to identify which categories will drive spending."
        >
          <Card className="p-0">
            <div className="border-b p-4 flex justify-between items-center">
              <h3 className="text-base font-medium">Spend by Category (Forecast)</h3>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Settings className="h-3 w-3" />
                Configure
              </Button>
            </div>
            <div className="p-4 h-72">
              <div className="flex items-center justify-center h-full text-gray-400">
                <p>Chart placeholder - Category spend forecast visualization</p>
              </div>
            </div>
          </Card>
        </VoiceElement>
        
        <VoiceElement
          whatScript="This chart shows quarterly spending trends and projections."
          howScript="Use this to track spending patterns and future projections."
        >
          <Card className="p-0">
            <div className="border-b p-4 flex justify-between items-center">
              <h3 className="text-base font-medium">Quarterly Spend Trends</h3>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Settings className="h-3 w-3" />
                Configure
              </Button>
            </div>
            <div className="p-4 h-72">
              <div className="flex items-center justify-center h-full text-gray-400">
                <p>Chart placeholder - Quarterly spending trends with projections</p>
              </div>
            </div>
          </Card>
        </VoiceElement>
      </div>
      
      <h2 className="text-xl font-bold mb-4">Your Forecasts</h2>
      
      <Card className="mb-6">
        <div className="divide-y">
          {filteredForecasts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No forecasts found matching your search criteria
            </div>
          ) : (
            filteredForecasts.map((forecast) => (
              <div key={forecast.id} className="p-4 hover:bg-gray-50 flex items-center">
                <div className="flex-1">
                  <h3 className="font-medium text-coupa-blue">{forecast.name}</h3>
                  <div className="flex gap-4 mt-1 text-sm text-gray-600">
                    <span>Type: {forecast.type}</span>
                    <span>Period: {forecast.period}</span>
                    <span>Last updated: {forecast.lastUpdated}</span>
                    <span>Owner: {forecast.owner}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Dialog open={isEditDialogOpen && currentForecast?.id === forecast.id} onOpenChange={(open) => {
                    setIsEditDialogOpen(open);
                    if (open) setCurrentForecast(forecast);
                  }}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={() => {
                        setCurrentForecast(forecast);
                        setIsEditDialogOpen(true);
                      }}>
                        <Edit className="h-4 w-4 text-gray-500" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                      <DialogHeader>
                        <DialogTitle>Edit Forecast</DialogTitle>
                        <DialogDescription>
                          Update the details of your forecast.
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...editForm}>
                        <form onSubmit={editForm.handleSubmit(handleEditForecast)} className="space-y-4">
                          <FormField
                            control={editForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Forecast Name</FormLabel>
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
                                  <FormLabel>Type</FormLabel>
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
                                      {forecastTypes.map(type => (
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
                              name="period"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Period</FormLabel>
                                  <Select 
                                    onValueChange={field.onChange} 
                                    value={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select period" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {forecastPeriods.map(period => (
                                        <SelectItem key={period} value={period}>{period}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={editForm.control}
                              name="owner"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Owner</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={editForm.control}
                              name="amount"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Forecast Amount ($)</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="number" 
                                      {...field} 
                                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={editForm.control}
                              name="growth"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Growth Rate (%)</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="number" 
                                      step="0.1" 
                                      {...field} 
                                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                            <Button type="submit">Update Forecast</Button>
                          </DialogFooter>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                  
                  <Dialog open={isDeleteDialogOpen && currentForecast?.id === forecast.id} onOpenChange={(open) => {
                    setIsDeleteDialogOpen(open);
                    if (open) setCurrentForecast(forecast);
                  }}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-red-500" onClick={() => {
                        setCurrentForecast(forecast);
                        setIsDeleteDialogOpen(true);
                      }}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete "{forecast.name}" forecast? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="mt-4">
                        <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                        <Button type="button" variant="destructive" onClick={handleDeleteForecast}>Delete</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <Button variant="ghost" size="sm" className="text-coupa-blue">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
      
      <h2 className="text-xl font-bold mb-4">Recommended Actions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Update IT Hardware Forecast", description: "Recent price changes from suppliers suggest updating your IT hardware forecast" },
          { title: "Review Marketing Service Spend", description: "Projected marketing spend exceeds historical patterns by 24%" },
          { title: "Consolidate Office Supply Vendors", description: "Potential 12% savings by consolidating your office supply vendors based on forecast data" }
        ].map((action, index) => (
          <Card key={index} className="p-4 border-l-4 border-coupa-blue">
            <h3 className="font-medium">{action.title}</h3>
            <p className="text-sm text-gray-600 my-2">{action.description}</p>
            <Button variant="link" className="p-0 h-auto text-coupa-blue">
              Take Action
            </Button>
          </Card>
        ))}
      </div>
    </ApplicationLayout>
  );
};

export default Forecasts;
