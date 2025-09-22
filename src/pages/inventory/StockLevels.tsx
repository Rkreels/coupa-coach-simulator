import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { FormDialog } from '@/components/ui/form-dialog';
import { Package, AlertTriangle, TrendingDown, Plus, Edit, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const StockLevelsPage = () => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const stockItems = [
    {
      id: "ITEM-001",
      name: "Dell XPS Laptop",
      sku: "DLL-XPS-15",
      category: "Electronics",
      currentStock: 24,
      minStock: 10,
      maxStock: 50,
      reorderPoint: 15,
      unitCost: 1200,
      location: "Warehouse A",
      status: "Normal",
      lastUpdated: "2023-05-15"
    },
    {
      id: "ITEM-002",
      name: "HP Printer Paper",
      sku: "HP-PPR-A4",
      category: "Office Supplies", 
      currentStock: 150,
      minStock: 100,
      maxStock: 500,
      reorderPoint: 120,
      unitCost: 8.50,
      location: "Warehouse B",
      status: "Normal",
      lastUpdated: "2023-05-20"
    },
    {
      id: "ITEM-003",
      name: "Ergonomic Office Chair",
      sku: "ERG-CHR-001",
      category: "Furniture",
      currentStock: 5,
      minStock: 10,
      maxStock: 25,
      reorderPoint: 8,
      unitCost: 350,
      location: "Warehouse A",
      status: "Low Stock",
      lastUpdated: "2023-05-18"
    },
    {
      id: "ITEM-004",
      name: "Wireless Keyboard",
      sku: "WRL-KBD-001",
      category: "Electronics",
      currentStock: 0,
      minStock: 15,
      maxStock: 40,
      reorderPoint: 20,
      unitCost: 85,
      location: "Warehouse C",
      status: "Out of Stock",
      lastUpdated: "2023-05-10"
    }
  ];

  const formFields = [
    { name: 'name', label: 'Item Name', type: 'text' as const, required: true },
    { name: 'sku', label: 'SKU', type: 'text' as const, required: true },
    { name: 'category', label: 'Category', type: 'text' as const, required: true },
    { name: 'currentStock', label: 'Current Stock', type: 'number' as const, required: true },
    { name: 'minStock', label: 'Minimum Stock', type: 'number' as const, required: true },
    { name: 'maxStock', label: 'Maximum Stock', type: 'number' as const, required: true },
    { name: 'reorderPoint', label: 'Reorder Point', type: 'number' as const, required: true },
    { name: 'unitCost', label: 'Unit Cost', type: 'number' as const, required: true },
    { name: 'location', label: 'Location', type: 'text' as const, required: true }
  ];

  const handleAddItem = () => {
    setEditingItem(null);
    setFormValues({
      name: '',
      sku: '',
      category: '',
      currentStock: 0,
      minStock: 0,
      maxStock: 0,
      reorderPoint: 0,
      unitCost: 0,
      location: ''
    });
    setDialogOpen(true);
  };

  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setFormValues(item);
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (editingItem) {
      toast({
        title: "Item Updated",
        description: `${formValues.name} stock levels have been updated.`
      });
    } else {
      toast({
        title: "Item Added",
        description: `${formValues.name} has been added to inventory.`
      });
    }
    setDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      'Normal': 'bg-green-50 text-green-700 border-green-200',
      'Low Stock': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'Out of Stock': 'bg-red-50 text-red-700 border-red-200',
      'Overstocked': 'bg-blue-50 text-blue-700 border-blue-200'
    };
    
    return (
      <Badge variant="outline" className={colors[status as keyof typeof colors]}>
        {status}
      </Badge>
    );
  };

  const columns: any[] = [
    { key: 'name' as const, header: 'Item Name', sortable: true },
    { key: 'sku' as const, header: 'SKU', sortable: true },
    { key: 'category' as const, header: 'Category', sortable: true },
    { 
      key: 'currentStock' as const, 
      header: 'Current Stock', 
      sortable: true,
      render: (value: number) => value.toLocaleString()
    },
    { 
      key: 'minStock' as const, 
      header: 'Min Stock', 
      sortable: true,
      render: (value: number) => value.toLocaleString()
    },
    { 
      key: 'reorderPoint' as const, 
      header: 'Reorder Point', 
      sortable: true,
      render: (value: number) => value.toLocaleString()
    },
    { 
      key: 'unitCost' as const, 
      header: 'Unit Cost', 
      sortable: true,
      render: (value: number) => `$${value.toFixed(2)}`
    },
    { key: 'location' as const, header: 'Location', sortable: true },
    { 
      key: 'status' as const, 
      header: 'Status',
      render: (value: string) => getStatusBadge(value)
    }
  ];

  const normalStock = stockItems.filter(item => item.status === 'Normal').length;
  const lowStock = stockItems.filter(item => item.status === 'Low Stock').length;
  const outOfStock = stockItems.filter(item => item.status === 'Out of Stock').length;
  const totalValue = stockItems.reduce((sum, item) => sum + (item.currentStock * item.unitCost), 0);

  return (
    <ApplicationLayout pageTitle="Stock Levels">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Inventory Stock Levels</h2>
          <Button onClick={handleAddItem}>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Normal Stock</p>
                  <h3 className="text-2xl font-bold text-green-600">{normalStock}</h3>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Package className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Low Stock</p>
                  <h3 className="text-2xl font-bold text-yellow-600">{lowStock}</h3>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Out of Stock</p>
                  <h3 className="text-2xl font-bold text-red-600">{outOfStock}</h3>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <TrendingDown className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Value</p>
                  <h3 className="text-2xl font-bold text-purple-600">${totalValue.toLocaleString()}</h3>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Package className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Stock Level Details</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={stockItems}
              columns={columns}
              searchTerm=""
              onSearchChange={() => {}}
              actions={(item) => (
                <div className="flex gap-1">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditItem(item)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              )}
            />
          </CardContent>
        </Card>

        <FormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title={editingItem ? 'Edit Stock Item' : 'Add New Stock Item'}
          fields={formFields}
          values={formValues}
          onValuesChange={setFormValues}
          onSubmit={handleSubmit}
          submitText={editingItem ? 'Update' : 'Add'}
        />
      </div>
    </ApplicationLayout>
  );
};

export default StockLevelsPage;