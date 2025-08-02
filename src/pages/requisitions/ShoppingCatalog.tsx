import React, { useState } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Search, ShoppingCart, Star, Package, Filter, Grid, List } from 'lucide-react';

const ShoppingCatalogPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [supplierFilter, setSupplierFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [cart, setCart] = useState<any[]>([]);

  // Mock catalog data
  const catalogItems = [
    {
      id: 'CAT-001',
      name: 'Dell XPS 15 Laptop',
      description: 'High-performance laptop with Intel i7 processor, 16GB RAM, 512GB SSD',
      price: 2200.00,
      currency: 'USD',
      supplier: 'Dell Technologies',
      category: 'IT Hardware',
      image: '/placeholder.svg',
      rating: 4.5,
      reviews: 128,
      inStock: true,
      leadTime: '3-5 business days',
      contractPrice: true
    },
    {
      id: 'CAT-002',
      name: 'Office Chair - Ergonomic',
      description: 'Comfortable ergonomic office chair with lumbar support and adjustable height',
      price: 450.00,
      currency: 'USD',
      supplier: 'Steelcase',
      category: 'Office Furniture',
      image: '/placeholder.svg',
      rating: 4.3,
      reviews: 89,
      inStock: true,
      leadTime: '1-2 weeks',
      contractPrice: false
    },
    {
      id: 'CAT-003',
      name: 'Standing Desk Converter',
      description: 'Adjustable standing desk converter for dual monitor setup',
      price: 329.99,
      currency: 'USD',
      supplier: 'Varidesk',
      category: 'Office Furniture',
      image: '/placeholder.svg',
      rating: 4.7,
      reviews: 245,
      inStock: true,
      leadTime: '2-3 business days',
      contractPrice: true
    },
    {
      id: 'CAT-004',
      name: 'Wireless Mouse - Logitech MX Master 3',
      description: 'Professional wireless mouse with precision tracking and ergonomic design',
      price: 99.99,
      currency: 'USD',
      supplier: 'Logitech',
      category: 'IT Accessories',
      image: '/placeholder.svg',
      rating: 4.6,
      reviews: 567,
      inStock: true,
      leadTime: 'Same day',
      contractPrice: true
    },
    {
      id: 'CAT-005',
      name: 'Copy Paper - A4 (Case of 10 reams)',
      description: 'High-quality white copy paper, 80gsm, 500 sheets per ream',
      price: 42.50,
      currency: 'USD',
      supplier: 'Office Depot',
      category: 'Office Supplies',
      image: '/placeholder.svg',
      rating: 4.1,
      reviews: 34,
      inStock: true,
      leadTime: 'Next day',
      contractPrice: false
    },
    {
      id: 'CAT-006',
      name: 'Microsoft Office 365 Business Premium',
      description: 'Annual subscription for Office 365 Business Premium per user',
      price: 264.00,
      currency: 'USD',
      supplier: 'Microsoft',
      category: 'Software',
      image: '/placeholder.svg',
      rating: 4.4,
      reviews: 1203,
      inStock: true,
      leadTime: 'Instant',
      contractPrice: true
    }
  ];

  const addToCart = (item: any) => {
    setCart([...cart, { ...item, quantity: 1 }]);
    toast({
      title: 'Added to Cart',
      description: `${item.name} has been added to your requisition cart.`
    });
  };

  const filteredItems = catalogItems.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesSupplier = supplierFilter === 'all' || item.supplier === supplierFilter;
    
    return matchesSearch && matchesCategory && matchesSupplier;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredItems.map((item) => (
        <Card key={item.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-sm line-clamp-2">{item.name}</h3>
              <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
              
              <div className="flex items-center gap-1">
                {renderStars(item.rating)}
                <span className="text-xs text-gray-500">({item.reviews})</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-lg">{item.currency} {item.price.toLocaleString()}</p>
                  {item.contractPrice && (
                    <Badge variant="secondary" className="text-xs">Contract Price</Badge>
                  )}
                </div>
              </div>
              
              <div className="text-xs text-gray-500">
                <p>Lead time: {item.leadTime}</p>
                <p>Supplier: {item.supplier}</p>
              </div>
              
              <Button 
                onClick={() => addToCart(item)}
                className="w-full"
                size="sm"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const ListView = () => (
    <div className="space-y-4">
      {filteredItems.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="h-8 w-8 text-gray-400" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    {renderStars(item.rating)}
                    <span className="text-sm text-gray-500">({item.reviews})</span>
                  </div>
                  <span className="text-sm text-gray-500">Supplier: {item.supplier}</span>
                  <span className="text-sm text-gray-500">Lead time: {item.leadTime}</span>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-xl">{item.currency} {item.price.toLocaleString()}</p>
                {item.contractPrice && (
                  <Badge variant="secondary" className="text-xs mt-1">Contract Price</Badge>
                )}
                <Button 
                  onClick={() => addToCart(item)}
                  className="mt-2"
                  size="sm"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <ApplicationLayout pageTitle="Shopping Catalog">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">Shopping Catalog</h2>
            {cart.length > 0 && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {cart.length} items in cart
              </Badge>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            {cart.length > 0 && (
              <Button>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Create Requisition ({cart.length})
              </Button>
            )}
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="IT Hardware">IT Hardware</SelectItem>
                  <SelectItem value="IT Accessories">IT Accessories</SelectItem>
                  <SelectItem value="Office Furniture">Office Furniture</SelectItem>
                  <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                  <SelectItem value="Software">Software</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={supplierFilter} onValueChange={setSupplierFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="All Suppliers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Suppliers</SelectItem>
                  <SelectItem value="Dell Technologies">Dell Technologies</SelectItem>
                  <SelectItem value="Steelcase">Steelcase</SelectItem>
                  <SelectItem value="Varidesk">Varidesk</SelectItem>
                  <SelectItem value="Logitech">Logitech</SelectItem>
                  <SelectItem value="Office Depot">Office Depot</SelectItem>
                  <SelectItem value="Microsoft">Microsoft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Catalog Items */}
        {viewMode === 'grid' ? <GridView /> : <ListView />}

        {filteredItems.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </ApplicationLayout>
  );
};

export default ShoppingCatalogPage;