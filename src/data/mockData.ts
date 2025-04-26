
export interface Supplier {
  id: string;
  name: string;
  rating: number;
  onTimeDelivery: number;
  qualityScore: number;
  responseTime: number;
  riskScore: number;
  location: string;
}

export interface Requisition {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  requestor: string;
  department: string;
  totalAmount: number;
  currency: string;
  dateCreated: string;
  dueDate: string;
  items: RequisitionItem[];
}

export interface RequisitionItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category: string;
  supplier?: string;
}

export interface PurchaseOrder {
  id: string;
  title: string;
  requisitionId: string;
  status: 'pending' | 'sent' | 'received' | 'completed' | 'canceled';
  supplier: string;
  totalAmount: number;
  currency: string;
  dateCreated: string;
  expectedDelivery: string;
  items: PurchaseOrderItem[];
}

export interface PurchaseOrderItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category: string;
  status: 'pending' | 'shipped' | 'received';
}

export interface Invoice {
  id: string;
  purchaseOrderId: string;
  supplier: string;
  totalAmount: number;
  currency: string;
  dateIssued: string;
  dueDate: string;
  status: 'pending' | 'approved' | 'paid' | 'rejected';
  paymentTerms: string;
}

export interface RFP {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'draft' | 'published' | 'evaluating' | 'awarded' | 'closed';
  dateCreated: string;
  dueDate: string;
  budget: number;
  currency: string;
  bids: RFPBid[];
}

export interface RFPBid {
  id: string;
  supplierId: string;
  supplierName: string;
  amount: number;
  currency: string;
  proposedDelivery: string;
  rating: number;
  status: 'pending' | 'under-review' | 'accepted' | 'rejected';
}

export interface Auction {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'upcoming' | 'live' | 'completed' | 'canceled';
  startDate: string;
  endDate: string;
  startingPrice: number;
  currentPrice: number;
  currency: string;
  participants: number;
  bids: AuctionBid[];
}

export interface AuctionBid {
  id: string;
  supplierId: string;
  supplierName: string;
  amount: number;
  timestamp: string;
}

// Mock Suppliers
export const suppliers: Supplier[] = [
  {
    id: "SUP-1001",
    name: "TechGlobal Inc.",
    rating: 4.2,
    onTimeDelivery: 87,
    qualityScore: 4.5,
    responseTime: 4, // hours
    riskScore: 25, // lower is better
    location: "United States"
  },
  {
    id: "SUP-1002",
    name: "ACME Inc.",
    rating: 4.8,
    onTimeDelivery: 96,
    qualityScore: 4.7,
    responseTime: 2, // hours
    riskScore: 12,
    location: "Canada"
  },
  {
    id: "SUP-1003",
    name: "Global Supplies Ltd.",
    rating: 3.9,
    onTimeDelivery: 78,
    qualityScore: 4.1,
    responseTime: 6, // hours
    riskScore: 35,
    location: "United Kingdom"
  },
  {
    id: "SUP-1004",
    name: "Asia Tech Co.",
    rating: 4.4,
    onTimeDelivery: 91,
    qualityScore: 4.3,
    responseTime: 5, // hours
    riskScore: 28,
    location: "Singapore"
  },
  {
    id: "SUP-1005",
    name: "EuroTech GmbH",
    rating: 4.6,
    onTimeDelivery: 94,
    qualityScore: 4.8,
    responseTime: 3, // hours
    riskScore: 15,
    location: "Germany"
  }
];

// Mock Requisitions
export const requisitions: Requisition[] = [
  {
    id: "REQ-2023-001",
    title: "Office Supplies for Q2",
    description: "Quarterly office supplies for headquarters",
    status: "approved",
    requestor: "John Smith",
    department: "Operations",
    totalAmount: 2580.75,
    currency: "USD",
    dateCreated: "2023-03-15",
    dueDate: "2023-03-22",
    items: [
      {
        id: "ITEM-001",
        name: "HP Printer Cartridges",
        description: "HP LaserJet 78A Black Toner Cartridges",
        quantity: 15,
        unitPrice: 89.99,
        totalPrice: 1349.85,
        category: "Office Supplies"
      },
      {
        id: "ITEM-002",
        name: "Copy Paper",
        description: "Letter size, 8.5 x 11, 10 reams/case",
        quantity: 10,
        unitPrice: 42.99,
        totalPrice: 429.90,
        category: "Office Supplies"
      },
      {
        id: "ITEM-003",
        name: "Sticky Notes",
        description: "3x3 inch, assorted colors, pack of 24",
        quantity: 20,
        unitPrice: 40.05,
        totalPrice: 801.00,
        category: "Office Supplies"
      }
    ]
  },
  {
    id: "REQ-2023-002",
    title: "Laptops for IT Department",
    description: "New laptops for development team",
    status: "pending",
    requestor: "Sarah Johnson",
    department: "IT",
    totalAmount: 32000.00,
    currency: "USD",
    dateCreated: "2023-03-18",
    dueDate: "2023-04-01",
    items: [
      {
        id: "ITEM-004",
        name: "Dell XPS 15 Laptops",
        description: "16GB RAM, 512GB SSD, Intel Core i7",
        quantity: 8,
        unitPrice: 2200.00,
        totalPrice: 17600.00,
        category: "IT Equipment"
      },
      {
        id: "ITEM-005",
        name: "Laptop Docking Stations",
        description: "Dell WD19 180W Docking Stations",
        quantity: 8,
        unitPrice: 250.00,
        totalPrice: 2000.00,
        category: "IT Equipment"
      },
      {
        id: "ITEM-006",
        name: "Monitors",
        description: "Dell UltraSharp 27-inch 4K Monitors",
        quantity: 16,
        unitPrice: 775.00,
        totalPrice: 12400.00,
        category: "IT Equipment"
      }
    ]
  }
];

// Mock Purchase Orders
export const purchaseOrders: PurchaseOrder[] = [
  {
    id: "PO-2023-001",
    title: "Office Supplies Order Q2",
    requisitionId: "REQ-2023-001",
    status: "sent",
    supplier: "ACME Inc.",
    totalAmount: 2580.75,
    currency: "USD",
    dateCreated: "2023-03-20",
    expectedDelivery: "2023-04-05",
    items: [
      {
        id: "POITEM-001",
        name: "HP Printer Cartridges",
        description: "HP LaserJet 78A Black Toner Cartridges",
        quantity: 15,
        unitPrice: 89.99,
        totalPrice: 1349.85,
        category: "Office Supplies",
        status: "pending"
      },
      {
        id: "POITEM-002",
        name: "Copy Paper",
        description: "Letter size, 8.5 x 11, 10 reams/case",
        quantity: 10,
        unitPrice: 42.99,
        totalPrice: 429.90,
        category: "Office Supplies",
        status: "shipped"
      },
      {
        id: "POITEM-003",
        name: "Sticky Notes",
        description: "3x3 inch, assorted colors, pack of 24",
        quantity: 20,
        unitPrice: 40.05,
        totalPrice: 801.00,
        category: "Office Supplies",
        status: "pending"
      }
    ]
  }
];

// Mock Invoices
export const invoices: Invoice[] = [
  {
    id: "INV-2023-001",
    purchaseOrderId: "PO-2023-001",
    supplier: "ACME Inc.",
    totalAmount: 2580.75,
    currency: "USD",
    dateIssued: "2023-04-10",
    dueDate: "2023-05-10",
    status: "pending",
    paymentTerms: "Net 30"
  }
];

// Mock RFPs
export const rfps: RFP[] = [
  {
    id: "RFP-2023-001",
    title: "IT Infrastructure Upgrade",
    description: "Complete upgrade of network equipment for headquarters",
    category: "IT Equipment",
    status: "published",
    dateCreated: "2023-03-01",
    dueDate: "2023-04-15",
    budget: 150000.00,
    currency: "USD",
    bids: [
      {
        id: "BID-001",
        supplierId: "SUP-1001",
        supplierName: "TechGlobal Inc.",
        amount: 148500.00,
        currency: "USD",
        proposedDelivery: "2023-06-15",
        rating: 4.2,
        status: "under-review"
      },
      {
        id: "BID-002",
        supplierId: "SUP-1004",
        supplierName: "Asia Tech Co.",
        amount: 142000.00,
        currency: "USD",
        proposedDelivery: "2023-06-30",
        rating: 4.4,
        status: "under-review"
      }
    ]
  }
];

// Mock Auctions
export const auctions: Auction[] = [
  {
    id: "AUC-2023-001",
    title: "Office Furniture Procurement",
    description: "Auction for 100 ergonomic chairs and 50 adjustable desks",
    category: "Office Furniture",
    status: "live",
    startDate: "2023-04-01T09:00:00",
    endDate: "2023-04-03T17:00:00",
    startingPrice: 75000.00,
    currentPrice: 68500.00,
    currency: "USD",
    participants: 5,
    bids: [
      {
        id: "AUCBID-001",
        supplierId: "SUP-1002",
        supplierName: "ACME Inc.",
        amount: 72000.00,
        timestamp: "2023-04-01T10:15:30"
      },
      {
        id: "AUCBID-002",
        supplierId: "SUP-1003",
        supplierName: "Global Supplies Ltd.",
        amount: 70500.00,
        timestamp: "2023-04-01T11:45:22"
      },
      {
        id: "AUCBID-003",
        supplierId: "SUP-1002",
        supplierName: "ACME Inc.",
        amount: 69000.00,
        timestamp: "2023-04-02T09:12:45"
      },
      {
        id: "AUCBID-004",
        supplierId: "SUP-1005",
        supplierName: "EuroTech GmbH",
        amount: 68500.00,
        timestamp: "2023-04-02T14:38:10"
      }
    ]
  }
];

// Voice script templates
export const voiceScripts = {
  // Requisitions
  requisitions: {
    pageLoad: "Welcome to the Requisitions module. Here you can create, manage, and track purchase requests before they become purchase orders. Start by clicking 'Create New' to request items for your department.",
    newButton: {
      what: "This is the 'Create New Requisition' button.",
      how: "Click this button to start a new purchase request. You'll need to specify items, quantities, and justification for the request.",
      decision: "Create a new requisition when you need to purchase items or services. Best used when planning purchases in advance, not for emergency needs."
    },
    requisitionRow: {
      what: "This is a requisition entry representing a purchase request.",
      how: "Click on any requisition to view its details. You can track its approval status here.",
      decision: "Prioritize reviewing requisitions marked as 'pending approval' if you're an approver, or 'draft' if you need to complete your own requests."
    },
    approveButton: {
      what: "This is the approval button for a requisition.",
      how: "Click to approve this purchase request, which will move it to the next approval level or create a purchase order if fully approved.",
      decision: "Before approving, verify the budget allocation and business justification. Approve 'Laptops for IT' only if the $32,000 falls within quarterly IT budget and aligns with department needs."
    }
  },
  
  // Purchase Orders
  purchaseOrders: {
    pageLoad: "Welcome to Purchase Orders. This module shows all orders sent to suppliers. You can track order status, make changes if needed, and monitor delivery timelines.",
    poRow: {
      what: "This is a purchase order sent to a supplier.",
      how: "Click on any PO to view its complete details, including line items, delivery dates, and supplier information.",
      decision: "Monitor POs with approaching delivery dates to ensure timely receipt. Contact the supplier for PO-2023-001 as the delivery date is approaching in 5 days."
    },
    vendorSelect: {
      what: "This dropdown shows approved vendors you can order from.",
      how: "Click to select a vendor for this purchase order. The system will show their rating and available items.",
      decision: "Consider ACME Inc. with their 4.8/5 rating for consistent delivery, or TechGlobal's 4.2/5 rating but 10% lower pricing."
    }
  },
  
  // Auctions
  auctions: {
    pageLoad: "Welcome to the Auction dashboard. Here you can create competitive bidding events where suppliers compete to win your business, typically resulting in 10-15% cost savings.",
    bidHistory: {
      what: "This chart shows the bidding history for this auction.",
      how: "Hover over data points to see details about each bid, including supplier name and timestamp.",
      decision: "If the bid trend plateaus like we see here at $68,500, consider extending the auction or shortening the remaining time to create urgency."
    },
    supplierRating: {
      what: "These are supplier performance ratings based on past transactions.",
      how: "Click on any rating to see detailed performance metrics including delivery time, quality, and communication scores.",
      decision: "EuroTech's current low bid of $68,500 looks attractive, but note their 3-day longer lead time compared to ACME's slightly higher bid with faster delivery."
    }
  }
};
