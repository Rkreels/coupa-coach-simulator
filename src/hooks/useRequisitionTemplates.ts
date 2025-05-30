
import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface RequisitionTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  department: string;
  isDefault: boolean;
  isActive: boolean;
  usageCount: number;
  lastUsed: string | null;
  createdBy: string;
  createdDate: string;
  lastModified: string;
  templateData: {
    title: string;
    description: string;
    justification: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    category: string;
    lineItems: TemplateLineItem[];
    approvalWorkflow: string[];
    notifications: string[];
    customFields: Record<string, any>;
  };
}

export interface TemplateLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  category: string;
  supplier?: string;
  partNumber?: string;
  specifications?: string;
}

const initialTemplates: RequisitionTemplate[] = [
  {
    id: 'TEMP-001',
    name: 'Office Supplies Standard',
    description: 'Standard office supplies template for quarterly orders',
    category: 'Office Supplies',
    department: 'General',
    isDefault: true,
    isActive: true,
    usageCount: 45,
    lastUsed: '2024-01-20',
    createdBy: 'Admin',
    createdDate: '2023-12-01',
    lastModified: '2024-01-15',
    templateData: {
      title: 'Quarterly Office Supplies',
      description: 'Standard office supplies requisition',
      justification: 'Regular quarterly office supplies replenishment',
      priority: 'medium',
      category: 'Office Supplies',
      lineItems: [
        {
          id: 'LI-1',
          description: 'Printer Paper (A4)',
          quantity: 10,
          unitPrice: 12.50,
          category: 'Paper Products'
        },
        {
          id: 'LI-2',
          description: 'Blue Pens (Pack of 10)',
          quantity: 5,
          unitPrice: 8.99,
          category: 'Writing Supplies'
        }
      ],
      approvalWorkflow: ['Department Manager', 'Finance'],
      notifications: ['requestor', 'manager'],
      customFields: {}
    }
  },
  {
    id: 'TEMP-002',
    name: 'IT Equipment Request',
    description: 'Template for IT hardware and software requests',
    category: 'IT Equipment',
    department: 'IT',
    isDefault: true,
    isActive: true,
    usageCount: 23,
    lastUsed: '2024-01-18',
    createdBy: 'IT Manager',
    createdDate: '2023-11-15',
    lastModified: '2024-01-10',
    templateData: {
      title: 'IT Equipment Request',
      description: 'Hardware/Software requisition for IT department',
      justification: 'Equipment upgrade/replacement for productivity improvement',
      priority: 'high',
      category: 'IT Equipment',
      lineItems: [
        {
          id: 'LI-3',
          description: 'Laptop Computer',
          quantity: 1,
          unitPrice: 1200.00,
          category: 'Hardware',
          specifications: 'Minimum 16GB RAM, 512GB SSD'
        }
      ],
      approvalWorkflow: ['IT Manager', 'Finance Director', 'CEO'],
      notifications: ['requestor', 'it_manager', 'finance'],
      customFields: {
        urgency: 'high',
        businessImpact: 'productivity'
      }
    }
  },
  {
    id: 'TEMP-003',
    name: 'Marketing Materials',
    description: 'Marketing and promotional materials template',
    category: 'Marketing',
    department: 'Marketing',
    isDefault: false,
    isActive: true,
    usageCount: 12,
    lastUsed: '2024-01-12',
    createdBy: 'Marketing Manager',
    createdDate: '2023-10-20',
    lastModified: '2023-12-05',
    templateData: {
      title: 'Marketing Materials Order',
      description: 'Promotional and marketing materials requisition',
      justification: 'Marketing campaign support materials',
      priority: 'medium',
      category: 'Marketing',
      lineItems: [
        {
          id: 'LI-4',
          description: 'Business Cards (1000 pcs)',
          quantity: 1,
          unitPrice: 89.99,
          category: 'Print Materials'
        },
        {
          id: 'LI-5',
          description: 'Promotional Banners',
          quantity: 3,
          unitPrice: 45.00,
          category: 'Display Materials'
        }
      ],
      approvalWorkflow: ['Marketing Manager', 'Finance'],
      notifications: ['requestor', 'marketing_team'],
      customFields: {
        campaign: '',
        eventDate: ''
      }
    }
  }
];

export const useRequisitionTemplates = () => {
  const [templates, setTemplates] = useLocalStorage('requisitionTemplates', initialTemplates);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
    
    return matchesSearch && matchesCategory && template.isActive;
  });

  const addTemplate = (templateData: Omit<RequisitionTemplate, 'id' | 'usageCount' | 'lastUsed' | 'createdDate' | 'lastModified'>) => {
    const newTemplate: RequisitionTemplate = {
      ...templateData,
      id: `TEMP-${String(templates.length + 1).padStart(3, '0')}`,
      usageCount: 0,
      lastUsed: null,
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };
    setTemplates([...templates, newTemplate]);
    return newTemplate;
  };

  const updateTemplate = (id: string, updates: Partial<RequisitionTemplate>) => {
    setTemplates(templates.map(template => 
      template.id === id 
        ? { ...template, ...updates, lastModified: new Date().toISOString().split('T')[0] }
        : template
    ));
  };

  const deleteTemplate = (id: string) => {
    setTemplates(templates.filter(template => template.id !== id));
  };

  const getTemplate = (id: string) => {
    return templates.find(template => template.id === id);
  };

  const duplicateTemplate = (id: string) => {
    const template = getTemplate(id);
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
    const template = getTemplate(id);
    if (!template) return;

    updateTemplate(id, {
      usageCount: template.usageCount + 1,
      lastUsed: new Date().toISOString().split('T')[0]
    });

    // In a real app, this would navigate to create requisition with template data
    console.log('Using template:', template);
  };

  const getMetrics = () => {
    const totalTemplates = templates.filter(t => t.isActive).length;
    const defaultTemplates = templates.filter(t => t.isDefault && t.isActive).length;
    const mostUsedTemplate = templates.reduce((max, template) => 
      template.usageCount > max.usageCount ? template : max, 
      { usageCount: 0 }
    );
    const totalUsage = templates.reduce((sum, template) => sum + template.usageCount, 0);
    const avgUsagePerMonth = Math.round(totalUsage / Math.max(templates.length, 1));

    return {
      totalTemplates,
      defaultTemplates,
      mostUsedCount: mostUsedTemplate.usageCount,
      avgUsagePerMonth
    };
  };

  const getCategories = () => {
    const categories = [...new Set(templates.map(t => t.category))];
    return categories.sort();
  };

  return {
    templates: filteredTemplates,
    allTemplates: templates,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    getTemplate,
    duplicateTemplate,
    useTemplate,
    getMetrics,
    getCategories
  };
};
