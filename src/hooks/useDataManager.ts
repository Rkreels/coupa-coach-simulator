
import { useState, useMemo } from 'react';

export interface DataManagerConfig<T> {
  storageKey: string;
  initialData: T[];
  searchFields: (keyof T)[];
}

export function useDataManager<T extends { id: string }>({
  storageKey,
  initialData,
  searchFields
}: DataManagerConfig<T>) {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Search functionality
  const filteredData = useMemo(() => {
    let result = data;

    // Apply search
    if (searchTerm) {
      result = result.filter((item) =>
        searchFields.some((field) =>
          String(item[field]).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        result = result.filter((item) => String(item[key as keyof T]) === value);
      }
    });

    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, searchTerm, filters, sortConfig, searchFields]);

  const addItem = (item: Omit<T, 'id'>) => {
    const newItem = {
      ...item,
      id: Date.now().toString()
    } as T;
    setData([...data, newItem]);
    return newItem;
  };

  const updateItem = (id: string, updates: Partial<T>) => {
    setData(data.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const deleteItem = (id: string) => {
    setData(data.filter(item => item.id !== id));
  };

  const getItem = (id: string) => {
    return data.find(item => item.id === id);
  };

  const handleSort = (key: keyof T) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const updateFilter = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  return {
    data: filteredData,
    allData: data,
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    clearFilters,
    sortConfig,
    handleSort,
    addItem,
    updateItem,
    deleteItem,
    getItem,
    totalCount: data.length,
    filteredCount: filteredData.length
  };
}
