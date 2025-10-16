
import { useState } from 'react';

export interface RequisitionTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  department: string;
  isDefault: boolean;
  usageCount: number;
  lastUsed?: string;
  createdBy: string;
  createdDate: string;
  lineItems: TemplateLineItem[];
  estimatedTotal: number;
  currency: string;
}

export interface TemplateLineItem {
  id: string;
  description: string;
  category: string;
  estimatedPrice: number;
  preferredSupplier?: string;
  specifications?: string;
}

const initialTemplates: RequisitionTemplate[] = [
  {
    id: 'TPL-001',
    name: 'Office Supplies Basic',
    description: 'Standard office supplies template',
    category: 'Office Supplies',
    department: 'All',
    isDefault: true,
    usageCount: 45,
    lastUsed: '2024-01-15',
    createdBy: 'System',
    createdDate: '2024-01-01',
    lineItems: [
      {
        id: 'TLI-001',
        description: 'Printer Paper A4',
        category: 'Paper Products',
        estimatedPrice: 25.00,
        preferredSupplier: 'Office Depot'
      }
    ],
    estimatedTotal: 250.00,
    currency: 'USD'
  }
];

export const useRequisitionTemplates = () => {
  const [templates, setTemplates] = useState(initialTemplates);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const addTemplate = (template: Omit<RequisitionTemplate, 'id' | 'createdDate' | 'usageCount'>) => {
    const newTemplate: RequisitionTemplate = {
      ...template,
      id: `TPL-${String(templates.length + 1).padStart(3, '0')}`,
      createdDate: new Date().toISOString().split('T')[0],
      usageCount: 0
    };
    setTemplates([...templates, newTemplate]);
    return newTemplate;
  };

  const updateTemplate = (id: string, updates: Partial<RequisitionTemplate>) => {
    setTemplates(templates.map(template => 
      template.id === id ? { ...template, ...updates } : template
    ));
  };

  const deleteTemplate = (id: string) => {
    setTemplates(templates.filter(template => template.id !== id));
  };

  const duplicateTemplate = (id: string) => {
    const template = templates.find(t => t.id === id);
    if (!template) return null;
    
    const duplicated = addTemplate({
      ...template,
      name: `${template.name} (Copy)`,
      isDefault: false,
      createdBy: 'Current User'
    });
    return duplicated;
  };

  const useTemplate = (id: string) => {
    updateTemplate(id, {
      usageCount: (templates.find(t => t.id === id)?.usageCount || 0) + 1,
      lastUsed: new Date().toISOString().split('T')[0]
    });
  };

  const getMetrics = () => {
    const totalTemplates = templates.length;
    const mostUsedCount = Math.max(...templates.map(t => t.usageCount), 0);
    const defaultTemplates = templates.filter(t => t.isDefault).length;
    const avgUsagePerMonth = Math.round(templates.reduce((sum, t) => sum + t.usageCount, 0) / templates.length);

    return {
      totalTemplates,
      mostUsedCount,
      defaultTemplates,
      avgUsagePerMonth
    };
  };

  return {
    templates: filteredTemplates,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    getTemplate: (id: string) => templates.find(t => t.id === id),
    duplicateTemplate,
    useTemplate,
    getMetrics
  };
};
