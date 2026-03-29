
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

const templateSeeds = [
  ['Office Supplies Basic', 'Standard office supplies template', 'Office Supplies', 'All', 'Office Depot'],
  ['IT Laptop Refresh', 'New-hire laptop and docking station package', 'IT Equipment', 'IT', 'Dell Technologies'],
  ['Marketing Event Kit', 'Trade show booth and branded collateral pack', 'Marketing', 'Marketing', 'VistaPrint'],
  ['Facilities Safety Stock', 'Recurring safety and PPE replenishment', 'Safety', 'Facilities', 'Grainger'],
  ['Finance Workstation Upgrade', 'Dual-monitor setup for finance analysts', 'IT Equipment', 'Finance', 'CDW'],
  ['HR Onboarding Bundle', 'Starter equipment and welcome materials', 'HR', 'Human Resources', 'Staples'],
  ['Engineering Lab Consumables', 'Monthly lab parts and accessories', 'Engineering', 'Engineering', 'RS Components'],
  ['Travel Essentials', 'Pre-approved travel accessories and kits', 'Travel', 'Operations', 'Amazon Business'],
  ['Warehouse Barcode Pack', 'Scanners, labels, and printer supplies', 'Operations', 'Warehouse', 'Zebra'],
  ['Executive Board Meeting', 'Catering, printouts, and meeting support', 'Corporate Services', 'Executive', 'Aramark'],
  ['Legal NDA Starter', 'Standard legal intake and filing pack', 'Legal', 'Legal', 'Iron Mountain'],
  ['Customer Success Welcome Kit', 'Gifts and onboarding material for premium accounts', 'Customer Success', 'Sales', '4imprint'],
  ['Remote Work Starter', 'Monitor, webcam, keyboard, and headset', 'IT Equipment', 'All', 'Logitech'],
  ['Data Center Maintenance', 'Quarterly maintenance spare parts', 'Infrastructure', 'IT', 'Cisco'],
  ['Training Workshop Pack', 'Facilitator and training room materials', 'Learning & Development', 'Human Resources', 'Office Depot'],
  ['Procurement Audit Support', 'Binders, labels, and audit stationery', 'Procurement', 'Procurement', 'Staples'],
  ['Sustainability Reporting', 'External consulting and reporting templates', 'Consulting', 'ESG', 'Deloitte'],
  ['Branch Office Launch', 'Desks, chairs, and starter equipment', 'Facilities', 'Operations', 'IKEA Business'],
  ['Field Service Toolkit', 'Mobile tools and consumables', 'Field Operations', 'Operations', 'Fastenal'],
  ['Quarter End Close Pack', 'Temporary licenses and support materials', 'Finance', 'Finance', 'Microsoft']
] as const;

const initialTemplates: RequisitionTemplate[] = templateSeeds.map((seed, index) => {
  const [name, description, category, department, supplier] = seed;
  const itemBasePrice = 25 + index * 18;

  return {
    id: `TPL-${String(index + 1).padStart(3, '0')}`,
    name,
    description,
    category,
    department,
    isDefault: index < 4,
    usageCount: 8 + index * 3,
    lastUsed: `2024-02-${String((index % 20) + 1).padStart(2, '0')}`,
    createdBy: index % 3 === 0 ? 'System' : 'Current User',
    createdDate: `2024-01-${String((index % 20) + 1).padStart(2, '0')}`,
    lineItems: [
      {
        id: `TLI-${String(index + 1).padStart(3, '0')}-1`,
        description: `${name} - Primary line item`,
        category,
        estimatedPrice: itemBasePrice,
        preferredSupplier: supplier,
        specifications: 'Standard enterprise approved specification'
      },
      {
        id: `TLI-${String(index + 1).padStart(3, '0')}-2`,
        description: `${name} - Secondary line item`,
        category,
        estimatedPrice: itemBasePrice * 1.4,
        preferredSupplier: supplier,
        specifications: 'Includes standard delivery and support'
      }
    ],
    estimatedTotal: Number((itemBasePrice * 2.4).toFixed(2)),
    currency: 'USD'
  };
});

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
