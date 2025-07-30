// Comprehensive Coupa-like Enterprise Types

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  department: string;
  title: string;
  managerId?: string;
  costCenter: string;
  location: string;
  status: 'active' | 'inactive' | 'pending';
  roles: Role[];
  permissions: Permission[];
  preferences: UserPreferences;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  isSystemRole: boolean;
}

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
  description: string;
}

export interface UserPreferences {
  language: string;
  timezone: string;
  dateFormat: string;
  currency: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  theme: 'light' | 'dark' | 'auto';
}

// Enhanced Requisition with Coupa-like features
export interface EnterpriseRequisition {
  id: string;
  number: string;
  title: string;
  description: string;
  status: RequisitionStatus;
  businessJustification: string;
  requestorId: string;
  requestor: User;
  departmentId: string;
  department: Department;
  costCenterId: string;
  costCenter: CostCenter;
  budgetId?: string;
  budget?: Budget;
  currency: string;
  totalAmount: number;
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  netAmount: number;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  needByDate: string;
  deliveryAddress: Address;
  billToAddress: Address;
  shipToAddress: Address;
  approvalPath: ApprovalStep[];
  currentApprovalStep?: number;
  lineItems: RequisitionLineItem[];
  attachments: Attachment[];
  comments: Comment[];
  tags: string[];
  customFields: CustomField[];
  workflowInstance?: WorkflowInstance;
  auditTrail: AuditEntry[];
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
  approvedAt?: string;
  rejectedAt?: string;
  version: number;
  isTemplate: boolean;
  templateId?: string;
  recurrence?: RecurrencePattern;
}

export type RequisitionStatus = 
  | 'draft' 
  | 'submitted' 
  | 'pending_approval' 
  | 'approved' 
  | 'partially_approved'
  | 'rejected' 
  | 'cancelled' 
  | 'converted_to_po'
  | 'sourcing_required'
  | 'budget_check_required';

export interface RequisitionLineItem {
  id: string;
  lineNumber: number;
  description: string;
  quantity: number;
  unitOfMeasure: string;
  unitPrice: number;
  totalPrice: number;
  currency: string;
  categoryId: string;
  category: Category;
  commodityCode?: string;
  supplierItemNumber?: string;
  manufacturerPartNumber?: string;
  requestedDeliveryDate: string;
  accountingCode: string;
  glAccount?: string;
  costCenter?: string;
  project?: string;
  budgetLineId?: string;
  suppliers: SupplierQuote[];
  preferredSupplierId?: string;
  selectedSupplierId?: string;
  specifications: Specification[];
  customFields: CustomField[];
  status: LineItemStatus;
  sourceType: 'catalog' | 'punch_out' | 'form' | 'upload' | 'marketplace';
  catalogItemId?: string;
  contractId?: string;
  needByDate: string;
  receiptRequired: boolean;
  inspectionRequired: boolean;
  hazardous: boolean;
  environmentallyFriendly: boolean;
  sustainabilityScore?: number;
  auditTrail: AuditEntry[];
}

export type LineItemStatus = 
  | 'draft' 
  | 'submitted' 
  | 'approved' 
  | 'rejected' 
  | 'sourcing' 
  | 'ordered' 
  | 'received' 
  | 'invoiced';

// Enhanced Purchase Order
export interface EnterprisePurchaseOrder {
  id: string;
  number: string;
  title: string;
  description?: string;
  status: PurchaseOrderStatus;
  type: 'standard' | 'blanket' | 'contract' | 'services' | 'catalog';
  requisitionIds: string[];
  requisitions: EnterpriseRequisition[];
  supplierId: string;
  supplier: Supplier;
  buyerId: string;
  buyer: User;
  currency: string;
  subtotalAmount: number;
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  totalAmount: number;
  contractId?: string;
  contract?: Contract;
  paymentTerms: PaymentTerms;
  deliveryTerms: DeliveryTerms;
  shippingMethod: string;
  freightTerms: string;
  billToAddress: Address;
  shipToAddress: Address;
  remitToAddress: Address;
  orderDate: string;
  requestedDeliveryDate: string;
  promisedDeliveryDate?: string;
  expectedDeliveryDate?: string;
  actualDeliveryDate?: string;
  lineItems: PurchaseOrderLineItem[];
  approvalPath: ApprovalStep[];
  currentApprovalStep?: number;
  attachments: Attachment[];
  comments: Comment[];
  changeOrders: ChangeOrder[];
  receipts: Receipt[];
  invoices: string[];
  customFields: CustomField[];
  workflowInstance?: WorkflowInstance;
  auditTrail: AuditEntry[];
  createdAt: string;
  updatedAt: string;
  issuedAt?: string;
  acknowledgedAt?: string;
  version: number;
  revisionNumber: number;
  parentPoId?: string;
  isAmendment: boolean;
  reasonForChange?: string;
}

export type PurchaseOrderStatus = 
  | 'draft' 
  | 'pending_approval' 
  | 'approved' 
  | 'issued' 
  | 'acknowledged' 
  | 'in_progress' 
  | 'partially_received' 
  | 'received' 
  | 'partially_invoiced'
  | 'invoiced' 
  | 'closed' 
  | 'cancelled' 
  | 'disputed' 
  | 'on_hold';

export interface PurchaseOrderLineItem extends RequisitionLineItem {
  poLineNumber: number;
  requisitionLineItemId: string;
  promisedQuantity?: number;
  receivedQuantity?: number;
  invoicedQuantity?: number;
  remainingQuantity: number;
  promisedDeliveryDate?: string;
  actualDeliveryDate?: string;
  receipts: ReceiptLineItem[];
  invoiceLineItems: InvoiceLineItem[];
}

// Enhanced Invoice System
export interface EnterpriseInvoice {
  id: string;
  number: string;
  supplierInvoiceNumber: string;
  type: 'standard' | 'credit_memo' | 'debit_memo' | 'prepayment' | 'recurring';
  status: InvoiceStatus;
  supplierId: string;
  supplier: Supplier;
  purchaseOrderIds: string[];
  purchaseOrders: EnterprisePurchaseOrder[];
  currency: string;
  subtotalAmount: number;
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  totalAmount: number;
  amountDue: number;
  paidAmount: number;
  disputedAmount: number;
  invoiceDate: string;
  dueDate: string;
  paymentDate?: string;
  discountDate?: string;
  receivedDate: string;
  approvedDate?: string;
  paymentTerms: PaymentTerms;
  remitToAddress: Address;
  billFromAddress: Address;
  lineItems: InvoiceLineItem[];
  taxLineItems: TaxLineItem[];
  approvalPath: ApprovalStep[];
  currentApprovalStep?: number;
  matchingStatus: MatchingStatus;
  matchingExceptions: MatchingException[];
  paymentStatus: PaymentStatus;
  payments: Payment[];
  disputes: Dispute[];
  attachments: Attachment[];
  comments: Comment[];
  customFields: CustomField[];
  workflowInstance?: WorkflowInstance;
  auditTrail: AuditEntry[];
  createdAt: string;
  updatedAt: string;
  processedAt?: string;
  version: number;
  isRecurring: boolean;
  recurrencePattern?: RecurrencePattern;
  parentInvoiceId?: string;
}

export type InvoiceStatus = 
  | 'received' 
  | 'pending_approval' 
  | 'approved' 
  | 'rejected' 
  | 'disputed' 
  | 'paid' 
  | 'partially_paid' 
  | 'voided' 
  | 'cancelled'
  | 'on_hold'
  | 'pending_payment'
  | 'overdue';

export interface InvoiceLineItem {
  id: string;
  lineNumber: number;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  currency: string;
  poLineItemId?: string;
  receiptLineItemId?: string;
  accountingCode: string;
  taxCode?: string;
  taxAmount: number;
  customFields: CustomField[];
  matchingStatus: 'matched' | 'exception' | 'unmatched';
  exceptions: string[];
}

// Supplier Management
export interface Supplier {
  id: string;
  number: string;
  name: string;
  displayName: string;
  status: SupplierStatus;
  type: 'individual' | 'company' | 'government' | 'non_profit';
  parentSupplierId?: string;
  subsidiaries: string[];
  businessType: string[];
  industryType: string[];
  size: 'micro' | 'small' | 'medium' | 'large' | 'enterprise';
  yearEstablished?: number;
  taxId: string;
  dunsNumber?: string;
  cageCode?: string;
  vatNumber?: string;
  addresses: SupplierAddress[];
  contacts: SupplierContact[];
  bankAccounts: BankAccount[];
  certifications: Certification[];
  capabilities: Capability[];
  commodities: string[];
  geographicCoverage: string[];
  paymentTerms: PaymentTerms;
  currencies: string[];
  languages: string[];
  performanceMetrics: PerformanceMetrics;
  riskAssessment: RiskAssessment;
  sustainabilityMetrics: SustainabilityMetrics;
  complianceStatus: ComplianceStatus;
  contracts: string[];
  catalogs: Catalog[];
  punchoutUrl?: string;
  ediConfiguration?: EDIConfiguration;
  integrations: Integration[];
  customFields: CustomField[];
  documents: Document[];
  auditTrail: AuditEntry[];
  createdAt: string;
  updatedAt: string;
  onboardedAt?: string;
  lastAuditDate?: string;
  nextAuditDate?: string;
  version: number;
}

export type SupplierStatus = 
  | 'draft' 
  | 'pending_approval' 
  | 'approved' 
  | 'active' 
  | 'inactive' 
  | 'suspended' 
  | 'blacklisted' 
  | 'under_review'
  | 'terminated';

// Contract Management
export interface Contract {
  id: string;
  number: string;
  name: string;
  description?: string;
  type: ContractType;
  status: ContractStatus;
  supplierId: string;
  supplier: Supplier;
  ownerId: string;
  owner: User;
  departmentId: string;
  department: Department;
  currency: string;
  contractValue: number;
  committedSpend: number;
  actualSpend: number;
  remainingValue: number;
  utilizationPercentage: number;
  startDate: string;
  endDate: string;
  renewalDate?: string;
  noticePeriod: number;
  autoRenewal: boolean;
  renewalTerms?: string;
  paymentTerms: PaymentTerms;
  deliveryTerms: DeliveryTerms;
  terms: ContractTerms;
  clauses: ContractClause[];
  milestones: Milestone[];
  amendments: Amendment[];
  renewals: Renewal[];
  lineItems: ContractLineItem[];
  approvalPath: ApprovalStep[];
  currentApprovalStep?: number;
  stakeholders: Stakeholder[];
  attachments: Attachment[];
  comments: Comment[];
  risks: Risk[];
  complianceRequirements: ComplianceRequirement[];
  performanceMetrics: ContractPerformanceMetrics;
  customFields: CustomField[];
  workflowInstance?: WorkflowInstance;
  auditTrail: AuditEntry[];
  createdAt: string;
  updatedAt: string;
  signedAt?: string;
  executedAt?: string;
  version: number;
  isTemplate: boolean;
  templateId?: string;
  parentContractId?: string;
}

export type ContractType = 
  | 'master_service_agreement' 
  | 'purchase_agreement' 
  | 'blanket_order' 
  | 'framework_agreement'
  | 'service_contract' 
  | 'license_agreement' 
  | 'lease_agreement' 
  | 'maintenance_contract'
  | 'consulting_agreement' 
  | 'nda' 
  | 'sow' 
  | 'other';

export type ContractStatus = 
  | 'draft' 
  | 'pending_approval' 
  | 'approved' 
  | 'active' 
  | 'expired' 
  | 'terminated' 
  | 'suspended'
  | 'under_negotiation' 
  | 'pending_signature' 
  | 'executed' 
  | 'renewed';

// Common supporting types
export interface Address {
  id: string;
  type: 'billing' | 'shipping' | 'remit_to' | 'headquarters' | 'branch';
  name?: string;
  attention?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  isActive: boolean;
}

export interface Contact {
  id: string;
  type: 'primary' | 'billing' | 'technical' | 'administrative' | 'emergency';
  firstName: string;
  lastName: string;
  title?: string;
  email: string;
  phone: string;
  mobile?: string;
  fax?: string;
  isPrimary: boolean;
  isActive: boolean;
}

export interface ApprovalStep {
  id: string;
  stepNumber: number;
  name: string;
  approverId?: string;
  approver?: User;
  approverType: 'user' | 'role' | 'dynamic';
  approverCriteria?: string;
  status: 'pending' | 'approved' | 'rejected' | 'skipped' | 'delegated';
  requiredAmount?: number;
  comments?: string;
  approvedAt?: string;
  rejectedAt?: string;
  delegatedTo?: string;
  isParallel: boolean;
  timeoutHours?: number;
  escalationPath: EscalationStep[];
}

export interface EscalationStep {
  id: string;
  level: number;
  escalateToId: string;
  escalateTo: User;
  hoursToEscalate: number;
  escalatedAt?: string;
}

export interface Attachment {
  id: string;
  name: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
  description?: string;
  isPublic: boolean;
  version: number;
}

export interface Comment {
  id: string;
  text: string;
  authorId: string;
  author: User;
  createdAt: string;
  isInternal: boolean;
  parentCommentId?: string;
  attachments: Attachment[];
}

export interface AuditEntry {
  id: string;
  action: string;
  description: string;
  userId: string;
  user: User;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
  changes: FieldChange[];
}

export interface FieldChange {
  field: string;
  oldValue: any;
  newValue: any;
}

export interface CustomField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'select' | 'multiselect' | 'textarea' | 'url' | 'email';
  value: any;
  required: boolean;
  options?: string[];
  validation?: string;
}

export interface WorkflowInstance {
  id: string;
  workflowId: string;
  workflow: Workflow;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  currentStepId?: string;
  startedAt: string;
  completedAt?: string;
  variables: Record<string, any>;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  type: string;
  steps: WorkflowStep[];
  triggers: WorkflowTrigger[];
  isActive: boolean;
  version: number;
}

export interface WorkflowStep {
  id: string;
  name: string;
  type: 'approval' | 'notification' | 'automation' | 'condition' | 'integration';
  configuration: Record<string, any>;
  conditions: WorkflowCondition[];
  nextStepId?: string;
  alternateStepId?: string;
}

export interface WorkflowTrigger {
  id: string;
  event: string;
  conditions: WorkflowCondition[];
}

export interface WorkflowCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'in' | 'not_in';
  value: any;
}

// Budget and Cost Management
export interface Budget {
  id: string;
  name: string;
  description?: string;
  type: 'operational' | 'capital' | 'project' | 'department' | 'category';
  status: 'draft' | 'active' | 'closed' | 'frozen';
  fiscalYear: string;
  period: 'annual' | 'quarterly' | 'monthly';
  currency: string;
  totalAmount: number;
  allocatedAmount: number;
  committedAmount: number;
  spentAmount: number;
  availableAmount: number;
  ownerId: string;
  owner: User;
  departmentId?: string;
  categoryId?: string;
  costCenterId?: string;
  startDate: string;
  endDate: string;
  approvalRequired: boolean;
  thresholds: BudgetThreshold[];
  lineItems: BudgetLineItem[];
  transactions: BudgetTransaction[];
  alerts: BudgetAlert[];
  customFields: CustomField[];
  auditTrail: AuditEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface BudgetThreshold {
  id: string;
  type: 'warning' | 'critical' | 'freeze';
  percentage: number;
  amount: number;
  triggered: boolean;
  triggeredAt?: string;
  actions: string[];
}

export interface BudgetLineItem {
  id: string;
  categoryId: string;
  category: Category;
  allocatedAmount: number;
  spentAmount: number;
  availableAmount: number;
  percentage: number;
}

export interface BudgetTransaction {
  id: string;
  type: 'allocation' | 'commitment' | 'expenditure' | 'transfer';
  amount: number;
  description: string;
  referenceId?: string;
  referenceType?: string;
  createdAt: string;
  createdBy: string;
}

export interface BudgetAlert {
  id: string;
  type: 'threshold' | 'overspend' | 'approval_required';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  triggeredAt: string;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
}

// Department and Cost Center
export interface Department {
  id: string;
  name: string;
  code: string;
  description?: string;
  managerId: string;
  manager: User;
  parentDepartmentId?: string;
  costCenters: CostCenter[];
  budgets: Budget[];
  employees: User[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CostCenter {
  id: string;
  name: string;
  code: string;
  description?: string;
  departmentId: string;
  managerId: string;
  budgets: Budget[];
  glAccounts: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Category Management
export interface Category {
  id: string;
  name: string;
  code: string;
  description?: string;
  parentCategoryId?: string;
  subcategories: Category[];
  commodityCode?: string;
  unspscCode?: string;
  image?: string;
  isActive: boolean;
  requiresApproval: boolean;
  defaultGLAccount?: string;
  suppliers: string[];
  contracts: string[];
  catalogs: string[];
  attributes: CategoryAttribute[];
  customFields: CustomField[];
  auditTrail: AuditEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface CategoryAttribute {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'select';
  required: boolean;
  options?: string[];
  defaultValue?: any;
}

// Additional enterprise types for comprehensive functionality
export interface SupplierAddress extends Address {
  supplierId: string;
  taxJurisdiction?: string;
}

export interface SupplierContact extends Contact {
  supplierId: string;
  department?: string;
  role?: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  swiftCode?: string;
  iban?: string;
  currency: string;
  accountType: 'checking' | 'savings' | 'escrow';
  isDefault: boolean;
  isActive: boolean;
}

export interface PaymentTerms {
  id: string;
  name: string;
  description: string;
  daysNet: number;
  discountDays?: number;
  discountPercentage?: number;
  isEarlyPaymentDiscount: boolean;
}

export interface DeliveryTerms {
  id: string;
  code: string;
  description: string;
  incoterm?: string;
}

export interface Certification {
  id: string;
  name: string;
  type: string;
  issuedBy: string;
  issuedDate: string;
  expirationDate?: string;
  documentUrl?: string;
  status: 'active' | 'expired' | 'suspended';
}

export interface Capability {
  id: string;
  name: string;
  description: string;
  category: string;
  certifications: string[];
  geographicCoverage: string[];
}

export interface PerformanceMetrics {
  onTimeDeliveryRate: number;
  qualityScore: number;
  responseTime: number; // in hours
  defectRate: number;
  customerSatisfactionScore: number;
  totalSpend: number;
  numberOfOrders: number;
  averageOrderValue: number;
  lastUpdated: string;
}

export interface RiskAssessment {
  overall: RiskLevel;
  financial: RiskLevel;
  operational: RiskLevel;
  compliance: RiskLevel;
  cyber: RiskLevel;
  geopolitical: RiskLevel;
  environmental: RiskLevel;
  lastAssessedAt: string;
  assessedBy: string;
  nextAssessmentDate: string;
  mitigationPlans: MitigationPlan[];
}

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface MitigationPlan {
  id: string;
  riskType: string;
  description: string;
  actions: string[];
  responsible: string;
  dueDate: string;
  status: 'open' | 'in_progress' | 'completed' | 'overdue';
}

export interface SustainabilityMetrics {
  carbonFootprint: number;
  energyEfficiency: number;
  wasteReduction: number;
  recyclingRate: number;
  sustainableSourcing: number;
  certifications: string[];
  score: number; // 0-100
  lastUpdated: string;
}

export interface ComplianceStatus {
  overall: 'compliant' | 'non_compliant' | 'pending' | 'under_review';
  requirements: ComplianceRequirement[];
  lastAuditDate?: string;
  nextAuditDate?: string;
  auditFindings: AuditFinding[];
}

export interface ComplianceRequirement {
  id: string;
  name: string;
  type: string;
  description: string;
  status: 'met' | 'not_met' | 'pending' | 'not_applicable';
  dueDate?: string;
  evidenceRequired: boolean;
  evidence: Document[];
}

export interface AuditFinding {
  id: string;
  type: 'major' | 'minor' | 'observation';
  description: string;
  correctiveAction: string;
  responsible: string;
  dueDate: string;
  status: 'open' | 'in_progress' | 'completed' | 'overdue';
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
  expirationDate?: string;
  status: 'active' | 'expired' | 'pending_review';
}

export interface Catalog {
  id: string;
  name: string;
  description?: string;
  type: 'internal' | 'external' | 'punch_out' | 'marketplace';
  url?: string;
  isActive: boolean;
  categories: string[];
  items: CatalogItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CatalogItem {
  id: string;
  name: string;
  description: string;
  sku: string;
  category: string;
  price: number;
  currency: string;
  unitOfMeasure: string;
  manufacturerPartNumber?: string;
  supplierPartNumber?: string;
  image?: string;
  specifications: Record<string, any>;
  isActive: boolean;
}

export interface EDIConfiguration {
  enabled: boolean;
  version: string;
  testMode: boolean;
  capabilities: string[];
  connectionDetails: Record<string, any>;
}

export interface Integration {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'error';
  configuration: Record<string, any>;
  lastSyncAt?: string;
  errorMessage?: string;
}

export interface ContractTerms {
  paymentTerms: string;
  deliveryTerms: string;
  warranty: string;
  liability: string;
  termination: string;
  disputeResolution: string;
  governingLaw: string;
  confidentiality: string;
  intellectualProperty: string;
  forcemajeure: string;
}

export interface ContractClause {
  id: string;
  type: string;
  title: string;
  content: string;
  isStandard: boolean;
  isRequired: boolean;
  version: number;
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  deliverables: string[];
  responsible: string;
  completedAt?: string;
}

export interface Amendment {
  id: string;
  number: string;
  description: string;
  type: 'modification' | 'extension' | 'termination' | 'renewal';
  effectiveDate: string;
  changes: ContractChange[];
  approvedAt?: string;
  signedAt?: string;
}

export interface ContractChange {
  field: string;
  oldValue: any;
  newValue: any;
  reason: string;
}

export interface Renewal {
  id: string;
  type: 'automatic' | 'manual';
  newStartDate: string;
  newEndDate: string;
  newValue?: number;
  terms?: string;
  approvedAt?: string;
  executedAt?: string;
}

export interface ContractLineItem {
  id: string;
  lineNumber: number;
  description: string;
  quantity?: number;
  unitPrice?: number;
  totalPrice?: number;
  startDate?: string;
  endDate?: string;
  deliverables: string[];
  milestones: string[];
}

export interface Stakeholder {
  id: string;
  userId: string;
  user: User;
  role: 'owner' | 'approver' | 'reviewer' | 'stakeholder' | 'legal' | 'finance';
  permissions: string[];
  notifications: boolean;
}

export interface Risk {
  id: string;
  type: string;
  description: string;
  impact: RiskLevel;
  probability: RiskLevel;
  overall: RiskLevel;
  mitigationPlan?: string;
  responsible?: string;
  status: 'open' | 'mitigated' | 'accepted' | 'transferred';
}

export interface ContractPerformanceMetrics {
  compliance: number; // percentage
  serviceLevel: number; // percentage
  costSavings: number;
  deliveryPerformance: number; // percentage
  qualityScore: number;
  innovations: number;
  lastUpdated: string;
}

export interface Receipt {
  id: string;
  number: string;
  purchaseOrderId: string;
  receivedDate: string;
  receivedBy: string;
  status: 'partial' | 'complete';
  lineItems: ReceiptLineItem[];
  comments: Comment[];
  attachments: Attachment[];
  auditTrail: AuditEntry[];
  createdAt: string;
}

export interface ReceiptLineItem {
  id: string;
  poLineItemId: string;
  quantityReceived: number;
  quantityAccepted: number;
  quantityRejected: number;
  rejectionReason?: string;
  condition: 'good' | 'damaged' | 'defective';
  inspectionRequired: boolean;
  inspectionDate?: string;
  inspectedBy?: string;
  lotNumber?: string;
  serialNumber?: string;
}

export interface ChangeOrder {
  id: string;
  number: string;
  type: 'quantity' | 'price' | 'delivery' | 'specification' | 'cancellation';
  description: string;
  reason: string;
  requestedBy: string;
  requestedDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'implemented';
  impactAmount: number;
  newDeliveryDate?: string;
  lineItemChanges: LineItemChange[];
  approvedBy?: string;
  approvedDate?: string;
  implementedDate?: string;
}

export interface LineItemChange {
  poLineItemId: string;
  field: string;
  oldValue: any;
  newValue: any;
  impact: number;
}

export interface TaxLineItem {
  id: string;
  taxCode: string;
  taxDescription: string;
  taxRate: number;
  taxableAmount: number;
  taxAmount: number;
  jurisdiction: string;
}

export type MatchingStatus = 'matched' | 'exception' | 'unmatched' | 'pending';

export interface MatchingException {
  type: 'quantity' | 'price' | 'tax' | 'supplier' | 'po_missing' | 'receipt_missing';
  description: string;
  severity: 'low' | 'medium' | 'high';
  autoResolvable: boolean;
  resolution?: string;
}

export type PaymentStatus = 'pending' | 'scheduled' | 'processing' | 'paid' | 'failed' | 'cancelled' | 'on_hold';

export interface Payment {
  id: string;
  paymentNumber: string;
  method: 'ach' | 'wire' | 'check' | 'card' | 'virtual_card';
  amount: number;
  currency: string;
  scheduledDate: string;
  processedDate?: string;
  status: PaymentStatus;
  referenceNumber?: string;
  bankAccount?: BankAccount;
  checkNumber?: string;
  remittanceInfo: RemittanceInfo;
}

export interface RemittanceInfo {
  invoiceNumbers: string[];
  discountsTaken: number;
  adjustments: number;
  netAmount: number;
}

export interface Dispute {
  id: string;
  type: 'pricing' | 'quantity' | 'quality' | 'delivery' | 'service' | 'billing';
  description: string;
  amount: number;
  status: 'open' | 'investigating' | 'resolved' | 'escalated';
  createdBy: string;
  createdDate: string;
  resolvedDate?: string;
  resolution?: string;
  documents: Document[];
}

export interface RecurrencePattern {
  type: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually';
  interval: number;
  startDate: string;
  endDate?: string;
  occurrences?: number;
  daysOfWeek?: number[]; // 0-6, Sunday-Saturday
  dayOfMonth?: number;
  monthOfYear?: number;
}

export interface Specification {
  id: string;
  name: string;
  value: string;
  unit?: string;
  required: boolean;
  description?: string;
}

export interface SupplierQuote {
  supplierId: string;
  supplierName: string;
  unitPrice: number;
  totalPrice: number;
  currency: string;
  leadTime: number; // in days
  validUntil: string;
  terms?: string;
  notes?: string;
  isSelected: boolean;
}