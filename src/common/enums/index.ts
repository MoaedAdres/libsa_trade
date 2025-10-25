// User related enums
export enum UserRole {
  CUSTOMER = 'customer',
  SUPPLIER_ADMIN = 'supplier_admin',
  PLATFORM_OPS = 'platform_ops',
  ADMIN = 'admin',
  PROXY_AGENT = 'proxy_agent',
  STAFF = 'staff',
  SUPPLIER = 'supplier',
}

export enum OwnerType {
  USER = 'user',
  SUPPLIER = 'supplier',
}

export enum FileType {
  INTAKE_FRONT = 'intake_front',
  INTAKE_BACK = 'intake_back',
  INTAKE_DETAIL = 'intake_detail',
  INTAKE_FLAW = 'intake_flaw',
  LISTING_FRONT = 'listing_front',
  LISTING_BACK = 'listing_back',
  LISTING_DETAIL = 'listing_detail',
  LISTING_STYLED = 'listing_styled',
  PICKUP_PROOF = 'pickup_proof',
  RETURN_FRONT = 'return_front',
  RETURN_BACK = 'return_back',
  RETURN_DETAIL = 'return_detail',
  DAMAGE_CLOSEUP = 'damage_closeup',
  CONSIGNOR_HANDOVER = 'consignor_handover',
  CONSIGNOR_COLLECT = 'consignor_collect',
  ID_SCAN = 'id_scan',
  AGREEMENT = 'agreement',
  RECEIPT = 'receipt',
  CHAT_ATTACHMENT = 'chat_attachment',
  OTHER = 'other',
}

// Supplier related enums
export enum SupplierStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  BLOCKED = 'blocked',
}

export enum VerificationLevel {
  UNVERIFIED = 'unverified',
  BASIC = 'basic',
  PREMIUM = 'premium',
  VERIFIED = 'verified',
  NONE = 'none',
}

export enum ViolationType {
  MISSED_INSPECTION = 'missed_inspection',
  POOR_PHOTOS = 'poor_photos',
  LATE_PAYOUT = 'late_payout',
  POLICY_BREACH = 'policy_breach',
  QUALITY_ISSUES = 'quality_issues',
  FAKE_LISTING = 'fake_listing',
}

export enum ViolationSeverity {
  MINOR = 'minor',
  MAJOR = 'major',
  CRITICAL = 'critical',
}

export enum Severity {
  MINOR = 'minor',
  MAJOR = 'major',
  CRITICAL = 'critical',
}

// Item related enums
export enum ItemCategory {
  DRESS = 'dress',
  SUIT = 'suit',
  ACCESSORIES = 'accessories',
  SHOES = 'shoes',
  OTHER = 'other',
}

export enum ConditionRating {
  NEW = 'new',
  EXCELLENT = 'excellent',
  GOOD = 'good',
  FAIR = 'fair',
  POOR = 'poor',
}

// Consignment related enums
export enum ConsignmentStatus {
  DRAFT = 'draft',
  INTAKE_PENDING = 'intake_pending',
  ACTIVE = 'active',
  RETURNED = 'returned',
  SOLD = 'sold',
  REJECTED = 'rejected',
  DISPUTED = 'disputed',
  PENDING = 'pending',
}

// Listing related enums
export enum ListingType {
  RENT = 'rent',
  SELL = 'sell',
}

export enum PricingUnit {
  PER_DAY = 'per_day',
  PER_EVENT = 'per_event',
  FLAT = 'flat',
}

export enum AvailabilityStatus {
  AVAILABLE = 'available',
  BOOKED = 'booked',
  MAINTENANCE = 'maintenance',
  DISABLED = 'disabled',
}

// Booking related enums
export enum BookingStatus {
  PENDING = 'pending',
  DEPOSIT_PAID = 'deposit_paid',
  CONFIRMED = 'confirmed',
  PICKED_UP = 'picked_up',
  RETURNED = 'returned',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  DISPUTED = 'disputed',
  REFUNDED = 'refunded',
}

export enum PaymentMethod {
  COD = 'COD',
  MANUAL_TRANSFER = 'manual_transfer',
  CARD = 'card',
  BANK_TRANSFER = 'bank_transfer',
  INTERNAL_ADJUSTMENT = 'internal_adjustment',
}

export enum RelatedType {
  BOOKING = 'booking',
  CONSIGNMENT = 'consignment',
  VIOLATION = 'violation',
  REFUND = 'refund',
  PAYOUT = 'payout',
}

// Payment related enums
export enum PaymentType {
  DEPOSIT = 'deposit',
  REFUND = 'refund',
  PAYOUT = 'payout',
  PLATFORM_FEE = 'platform_fee',
  DAMAGE_CHARGE = 'damage_charge',
  SUPPLIER_PENALTY = 'supplier_penalty',
  COMMISSION = 'commission',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export enum PayoutStatus {
  SCHEDULED = 'scheduled',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  ON_HOLD = 'on_hold',
  PENDING = 'pending',
}

// Dispute related enums
export enum DisputeType {
  DAMAGE = 'damage',
  NOT_RECEIVED = 'not_received',
  FRAUD = 'fraud',
  QUALITY_ISSUE = 'quality_issue',
  OTHER = 'other',
  DAMAGE_CONSIGNMENT = 'damage_consignment',
}

export enum DamageCategory {
  MINOR_STAIN = 'minor_stain',
  MAJOR_STAIN = 'major_stain',
  MINOR_TEAR = 'minor_tear',
  MAJOR_DAMAGE = 'major_damage',
  IRREPARABLE = 'irreparable',
}

export enum DisputeStatus {
  OPEN = 'open',
  INVESTIGATING = 'investigating',
  MEDIATION = 'mediation',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
  ESCALATED = 'escalated',
}

export enum DisputePriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

// Communication related enums
export enum ConversationStatus {
  ACTIVE = 'active',
  CLOSED = 'closed',
  ARCHIVED = 'archived',
}

export enum ParticipantRole {
  CUSTOMER = 'customer',
  SUPPLIER = 'supplier',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  FILE = 'file',
  SYSTEM = 'system',
}

// Audit related enums
export enum AuditAction {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LOGIN = 'login',
  LOGOUT = 'logout',
  UPLOAD = 'upload',
  DOWNLOAD = 'download',
  PAYMENT = 'payment',
  BOOKING = 'booking',
  DISPUTE = 'dispute',
}

// Additional enums from Libsa_Trade_enum_values.txt
export enum FileOwnerType {
  ITEM = 'item',
  LISTING = 'listing',
  CONSIGNMENT = 'consignment',
  CONSIGNMENT_REQUEST = 'consignment_request',
  USER = 'user',
  BOOKING = 'booking',
  MESSAGE = 'message',
  DISPUTE = 'dispute',
  OTHER = 'other',
}

export enum PayoutPaymentMethod {
  BANK_TRANSFER = 'bank_transfer',
  CASH = 'cash',
  MOBILE_MONEY = 'mobile_money',
}

export enum PhotoRequirementTargetType {
  GLOBAL = 'global',
  SUPPLIER = 'supplier',
  CATEGORY = 'category',
  LISTING = 'listing',
  ITEM = 'item',
}

export enum DepositTransactionType {
  DEPOSIT_CAPTURE = 'deposit_capture',
  DAMAGE_DEDUCTION = 'damage_deduction',
  DEPOSIT_REFUND = 'deposit_refund',
}
