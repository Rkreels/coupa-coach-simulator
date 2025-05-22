
import { useState, useEffect, useRef } from 'react';
import { Search, X, BarChart, FileText, Package, Users, Calendar, File } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string; 
  link: string;
  icon: React.ElementType;
}

// Mock search results data - in a real app, this would come from an API
const mockResults: SearchResult[] = [
  {
    id: '1',
    title: 'Q2 Budget Report',
    description: 'Financial analysis for Q2 2023',
    category: 'reports',
    link: '/analytics/reports/budget-q2',
    icon: BarChart
  },
  {
    id: '2',
    title: 'Office Supplies Invoice #INV-2023-0568',
    description: 'From Staples Inc. - $1,245.00',
    category: 'invoices',
    link: '/invoices/INV-2023-0568',
    icon: FileText
  },
  {
    id: '3',
    title: 'Laptop Purchase Order #PO-2023-1204',
    description: 'Dell Technologies - $24,500.00',
    category: 'orders',
    link: '/orders/PO-2023-1204',
    icon: Package
  },
  {
    id: '4',
    title: 'ABC Corporation',
    description: 'IT Services Supplier',
    category: 'suppliers',
    link: '/suppliers/abc-corp',
    icon: Users
  },
  {
    id: '5',
    title: 'Annual Planning Meeting',
    description: 'June 15, 2023',
    category: 'calendar',
    link: '/calendar/meeting-2023-06-15',
    icon: Calendar
  },
  {
    id: '6',
    title: 'IT Services Contract',
    description: 'Expires on December 31, 2023',
    category: 'contracts',
    link: '/contracts/it-services-2023',
    icon: File
  }
];

export const GlobalSearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    // Filter results based on search query and active category
    const filtered = mockResults.filter(result => {
      const matchesQuery = 
        result.title.toLowerCase().includes(query.toLowerCase()) || 
        result.description.toLowerCase().includes(query.toLowerCase());
      
      const matchesCategory = activeCategory === 'all' || result.category === activeCategory;
      
      return matchesQuery && matchesCategory;
    });
    
    setResults(filtered);
  };

  // Search when query or category changes
  useEffect(() => {
    handleSearch();
  }, [query, activeCategory]);

  // Focus input when dialog opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  // Global keyboard shortcut to open search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleResultClick = (link: string) => {
    navigate(link);
    setOpen(false);
  };

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'reports', label: 'Reports' },
    { id: 'invoices', label: 'Invoices' },
    { id: 'orders', label: 'Orders' },
    { id: 'suppliers', label: 'Suppliers' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'contracts', label: 'Contracts' },
  ];

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-coupa-blue focus:border-coupa-blue"
        >
          <Search className="w-4 h-4 mr-2 text-gray-500" />
          <span className="text-gray-500">Search... (Ctrl+K)</span>
        </button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px] p-0">
          <DialogHeader className="px-4 pt-4 pb-0">
            <DialogTitle className="text-lg">Global Search</DialogTitle>
          </DialogHeader>
          
          <div className="p-4 pb-2">
            <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-coupa-blue focus-within:border-coupa-blue">
              <Search className="w-5 h-5 ml-3 text-gray-500" />
              <Input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for documents, invoices, orders..."
                className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              {query && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 mr-1" 
                  onClick={() => setQuery('')}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear</span>
                </Button>
              )}
            </div>
          </div>

          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="px-4 pb-4">
            <TabsList className="h-9 overflow-auto">
              {categories.map(category => (
                <TabsTrigger key={category.id} value={category.id} className="px-3 py-1">
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="max-h-[300px] overflow-y-auto px-4 pb-4">
            {results.length > 0 ? (
              <ul className="space-y-1">
                {results.map((result) => (
                  <li key={result.id}>
                    <button
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 flex items-start"
                      onClick={() => handleResultClick(result.link)}
                    >
                      <result.icon className="h-5 w-5 mr-3 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{result.title}</p>
                        <p className="text-sm text-gray-500">{result.description}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-8 text-center text-gray-500">
                {query ? 'No results found' : 'Type to search...'}
              </div>
            )}
          </div>

          <div className="px-4 py-3 border-t text-xs text-gray-500 flex items-center">
            <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded-md mr-1">↑</kbd>
            <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded-md mr-1">↓</kbd>
            <span className="mr-3">to navigate</span>
            <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded-md mr-1">Enter</kbd>
            <span className="mr-3">to select</span>
            <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded-md mr-1">Esc</kbd>
            <span>to close</span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
