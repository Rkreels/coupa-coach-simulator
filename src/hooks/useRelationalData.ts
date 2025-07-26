import { useState, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';

// Define relationship types
export interface DataRelationship {
  id: string;
  fromEntity: string;
  fromId: string;
  toEntity: string;
  toId: string;
  relationshipType: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

// Define cross-module data connections
export interface CrossModuleData {
  requisitions: {
    id: string;
    supplierId?: string;
    contractId?: string;
    budgetId?: string;
  }[];
  orders: {
    id: string;
    requisitionId?: string;
    invoiceIds: string[];
    supplierId: string;
    contractId?: string;
  }[];
  invoices: {
    id: string;
    orderId?: string;
    supplierId: string;
    paymentId?: string;
  }[];
  suppliers: {
    id: string;
    contractIds: string[];
    orderIds: string[];
    invoiceIds: string[];
  }[];
  contracts: {
    id: string;
    supplierId: string;
    orderIds: string[];
    requisitionIds: string[];
  }[];
}

const initialRelationships: DataRelationship[] = [
  {
    id: 'rel-001',
    fromEntity: 'Requisition',
    fromId: 'REQ-2023-001',
    toEntity: 'Supplier',
    toId: 'SUP-001',
    relationshipType: 'preferred_supplier',
    metadata: { priority: 1, reason: 'Best pricing' },
    createdAt: '2024-01-26T10:00:00Z',
    updatedAt: '2024-01-26T10:00:00Z'
  },
  {
    id: 'rel-002',
    fromEntity: 'PurchaseOrder',
    fromId: 'PO-2023-045',
    toEntity: 'Requisition',
    toId: 'REQ-2023-001',
    relationshipType: 'derived_from',
    metadata: { conversionDate: '2024-01-26T10:30:00Z' },
    createdAt: '2024-01-26T10:30:00Z',
    updatedAt: '2024-01-26T10:30:00Z'
  },
  {
    id: 'rel-003',
    fromEntity: 'Invoice',
    fromId: 'INV-2023-001',
    toEntity: 'PurchaseOrder',
    toId: 'PO-2023-045',
    relationshipType: 'billing_for',
    metadata: { percentage: 100, amount: 15000 },
    createdAt: '2024-01-26T11:00:00Z',
    updatedAt: '2024-01-26T11:00:00Z'
  },
  {
    id: 'rel-004',
    fromEntity: 'Contract',
    fromId: 'CON-2023-012',
    toEntity: 'Supplier',
    toId: 'SUP-001',
    relationshipType: 'agreement_with',
    metadata: { startDate: '2024-01-01', endDate: '2024-12-31', value: 100000 },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-26T12:00:00Z'
  }
];

export const useRelationalData = () => {
  const [relationships, setRelationships] = useLocalStorage('dataRelationships', initialRelationships);
  const [linkingMode, setLinkingMode] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<{
    type: string;
    id: string;
    name: string;
  } | null>(null);

  const addRelationship = (
    fromEntity: string,
    fromId: string,
    toEntity: string,
    toId: string,
    relationshipType: string,
    metadata?: Record<string, any>
  ) => {
    const newRelationship: DataRelationship = {
      id: `rel-${Date.now()}`,
      fromEntity,
      fromId,
      toEntity,
      toId,
      relationshipType,
      metadata,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setRelationships(prev => [...prev, newRelationship]);
    return newRelationship;
  };

  const removeRelationship = (relationshipId: string) => {
    setRelationships(prev => prev.filter(rel => rel.id !== relationshipId));
  };

  const getRelationshipsForEntity = (entityType: string, entityId: string) => {
    return relationships.filter(rel => 
      (rel.fromEntity === entityType && rel.fromId === entityId) ||
      (rel.toEntity === entityType && rel.toId === entityId)
    );
  };

  const getRelatedEntities = (entityType: string, entityId: string) => {
    const entityRelationships = getRelationshipsForEntity(entityType, entityId);
    
    return entityRelationships.map(rel => {
      const isSource = rel.fromEntity === entityType && rel.fromId === entityId;
      return {
        relationship: rel,
        relatedEntity: {
          type: isSource ? rel.toEntity : rel.fromEntity,
          id: isSource ? rel.toId : rel.fromId
        },
        direction: isSource ? 'outgoing' : 'incoming'
      };
    });
  };

  const getSupplierRelationships = (supplierId: string) => {
    const related = getRelatedEntities('Supplier', supplierId);
    
    return {
      contracts: related.filter(r => r.relatedEntity.type === 'Contract'),
      orders: related.filter(r => r.relatedEntity.type === 'PurchaseOrder'),
      invoices: related.filter(r => r.relatedEntity.type === 'Invoice'),
      requisitions: related.filter(r => r.relatedEntity.type === 'Requisition')
    };
  };

  const getRequisitionFlow = (requisitionId: string) => {
    const related = getRelatedEntities('Requisition', requisitionId);
    
    const orders = related.filter(r => r.relatedEntity.type === 'PurchaseOrder');
    const invoices: any[] = [];
    const payments: any[] = [];

    // Get invoices for each order
    orders.forEach(order => {
      const orderInvoices = getRelatedEntities('PurchaseOrder', order.relatedEntity.id)
        .filter(r => r.relatedEntity.type === 'Invoice');
      invoices.push(...orderInvoices);

      // Get payments for each invoice
      orderInvoices.forEach(invoice => {
        const invoicePayments = getRelatedEntities('Invoice', invoice.relatedEntity.id)
          .filter(r => r.relatedEntity.type === 'Payment');
        payments.push(...invoicePayments);
      });
    });

    return {
      requisition: { type: 'Requisition', id: requisitionId },
      orders: orders.map(o => o.relatedEntity),
      invoices: invoices.map(i => i.relatedEntity),
      payments: payments.map(p => p.relatedEntity),
      suppliers: related.filter(r => r.relatedEntity.type === 'Supplier').map(s => s.relatedEntity),
      contracts: related.filter(r => r.relatedEntity.type === 'Contract').map(c => c.relatedEntity)
    };
  };

  const getContractUtilization = (contractId: string) => {
    const related = getRelatedEntities('Contract', contractId);
    
    const orders = related.filter(r => r.relatedEntity.type === 'PurchaseOrder');
    const requisitions = related.filter(r => r.relatedEntity.type === 'Requisition');
    
    // Calculate spend against contract
    const totalSpend = orders.reduce((sum, order) => {
      // In real app, would fetch order amount from order data
      return sum + (order.relationship.metadata?.amount || 0);
    }, 0);

    const contractValue = related.find(r => r.relatedEntity.type === 'Supplier')?.relationship.metadata?.value || 0;
    
    return {
      contractValue,
      currentSpend: totalSpend,
      utilization: contractValue > 0 ? (totalSpend / contractValue) * 100 : 0,
      remainingValue: contractValue - totalSpend,
      orderCount: orders.length,
      requisitionCount: requisitions.length
    };
  };

  const linkEntities = (
    entity1: { type: string; id: string },
    entity2: { type: string; id: string },
    relationshipType: string,
    metadata?: Record<string, any>
  ) => {
    return addRelationship(
      entity1.type,
      entity1.id,
      entity2.type,
      entity2.id,
      relationshipType,
      metadata
    );
  };

  const getEntityGraph = (entityType: string, entityId: string, depth: number = 2) => {
    const visited = new Set<string>();
    const graph: any = {
      nodes: [],
      edges: []
    };

    const traverse = (type: string, id: string, currentDepth: number) => {
      const key = `${type}:${id}`;
      if (visited.has(key) || currentDepth > depth) return;
      
      visited.add(key);
      graph.nodes.push({ id: key, type, entityId: id, depth: currentDepth });

      const related = getRelatedEntities(type, id);
      related.forEach(rel => {
        const relatedKey = `${rel.relatedEntity.type}:${rel.relatedEntity.id}`;
        graph.edges.push({
          from: key,
          to: relatedKey,
          relationshipType: rel.relationship.relationshipType,
          direction: rel.direction
        });

        if (currentDepth < depth) {
          traverse(rel.relatedEntity.type, rel.relatedEntity.id, currentDepth + 1);
        }
      });
    };

    traverse(entityType, entityId, 0);
    return graph;
  };

  const getRelationshipStats = () => {
    const byType = relationships.reduce((acc, rel) => {
      acc[rel.relationshipType] = (acc[rel.relationshipType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byEntity = relationships.reduce((acc, rel) => {
      acc[rel.fromEntity] = (acc[rel.fromEntity] || 0) + 1;
      acc[rel.toEntity] = (acc[rel.toEntity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: relationships.length,
      byType,
      byEntity,
      mostConnectedEntity: Object.keys(byEntity).reduce((a, b) => byEntity[a] > byEntity[b] ? a : b, 'None')
    };
  };

  return {
    relationships,
    linkingMode,
    setLinkingMode,
    selectedEntity,
    setSelectedEntity,
    addRelationship,
    removeRelationship,
    getRelationshipsForEntity,
    getRelatedEntities,
    getSupplierRelationships,
    getRequisitionFlow,
    getContractUtilization,
    linkEntities,
    getEntityGraph,
    getRelationshipStats
  };
};