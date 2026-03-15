// ─── Vendor / Dealer ──────────────────────────────────────────
export type VendorType = 'DEALER' | 'MANUFACTURER' | 'MAINTENANCE_SHOP' | 'INSURANCE' | 'OTHER'

export interface Vendor {
  id: string
  vendorCode: string            // VD-001
  vendorType: VendorType
  companyName: string
  taxId: string
  address: string
  contactPerson: string
  phone: string
  email: string
  bankAccount: string
  // สำหรับ Dealer
  brand?: string[]              // เช่น ["Toyota", "Honda"]
  dealerCode?: string
  region?: string
  // สำหรับ Maintenance Shop
  serviceTypes?: string[]       // เช่น ["PM", "Body Repair", "Engine"]
  serviceArea?: string[]        // จังหวัดที่บริการ
  // Performance
  avgDeliveryDays?: number
  qualityScore?: number         // 1-5
  // สถานะ
  status: 'ACTIVE' | 'SUSPENDED' | 'BLACKLISTED'
  whtRate: number               // % WHT (3% สำหรับ service)
}

// ─── Purchase Request (PR) ────────────────────────────────────
export type PRStatus = 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'CONVERTED_TO_PO' | 'CANCELLED'

export interface PRItem {
  lineNo: number
  assetType: string             // เช่น "Toyota Camry 2.5G"
  brand: string
  model: string
  year: number
  color?: string
  specification: string         // สเปคเพิ่มเติม (option, accessories)
  quantity: number
  estimatedUnitPrice: number
  estimatedTotal: number
}

export interface PurchaseRequest {
  id: string
  prNo: string                  // PR-2024-001
  requestDate: string
  requestedBy: string
  department: string
  requiredDate: string          // วันที่ต้องการ
  // รายการที่ต้องการ
  items: PRItem[]
  totalBudget: number
  // เหตุผล/ที่มา
  purpose: string
  linkedContractId?: string     // ถ้ามา from Customer Quotation
  linkedCustomerId?: string
  status: PRStatus
  approvedBy?: string
  approvedDate?: string
  remarks: string
}

// ─── Purchase Order (PO) ──────────────────────────────────────
export type POStatus = 'DRAFT' | 'CONFIRMED' | 'PARTIAL_RECEIVED' | 'FULLY_RECEIVED' | 'CANCELLED'

export interface POItem {
  lineNo: number
  brand: string
  model: string
  year: number
  color: string
  specification: string
  quantity: number
  orderedQty: number
  receivedQty: number           // update เมื่อรับรถ
  unitPrice: number
  totalPrice: number
  // สำหรับรถนำเข้า
  isImported: boolean
  chassis?: string[]            // Chassis No. ที่ Manufacturer ยืนยัน
}

export interface PurchaseOrder {
  id: string
  poNo: string                  // PO-2024-001
  poDate: string
  prId: string                  // อ้างอิง PR
  vendorId: string
  vendorName: string
  // เงื่อนไข
  deliveryDate: string          // กำหนดส่งมอบ
  deliveryAddress: string
  paymentTerms: string          // เช่น "30 days net"
  warrantyMonths: number
  // รายการ
  items: POItem[]
  subtotal: number
  vatAmount: number
  total: number
  // สถานะ
  status: POStatus
  confirmedByVendor: boolean
  vendorConfirmDate?: string
}

// ─── Goods Receipt / Receiving ────────────────────────────────
export type ReceivingStatus = 'PENDING' | 'INSPECTING' | 'ACCEPTED' | 'REJECTED' | 'PARTIAL'

export interface GRItem {
  poItemLineNo: number
  chassisNo: string             // เลขตัวถัง — unique per vehicle
  engineNo: string              // เลขเครื่อง
  color: string
  registrationDate?: string     // วันที่จดทะเบียน (ถ้ามาพร้อม plate)
  plateNo?: string
  keyNo: string
  bookNo?: string               // เลขที่สมุดคู่มือ
  // หลังรับ → สร้าง Asset record อัตโนมัติ
  createdAssetId?: string       // Asset ID ที่สร้างใหม่
}

export interface GoodsReceipt {
  id: string
  grNo: string                  // GR-2024-001
  grDate: string
  poId: string
  vendorId: string
  deliveryNoteNo?: string       // เลขที่ใบส่งของ Dealer
  // รายการที่รับ
  items: GRItem[]
  totalReceived: number
  // การตรวจรับ (PDI — Pre-Delivery Inspection)
  inspectedBy: string
  inspectionDate: string
  inspectionResult: 'PASS' | 'FAIL' | 'CONDITIONAL'
  inspectionNotes: string
  inspectionPhotos: string[]    // URLs
  // ผล 3-Way Match
  threeWayMatch: {
    prMatched: boolean
    poMatched: boolean
    invoiceMatched: boolean
    discrepancies?: string
  }
  status: ReceivingStatus
}

// ─── Port Management (รถนำเข้า) ──────────────────────────────
export type PortStatus = 'AT_PORT' | 'CUSTOMS_CLEARANCE' | 'INSPECTION' | 'CLEARED' | 'IN_TRANSIT' | 'DELIVERED'

export interface PortCharge {
  chargeType: 'PORT_FEE' | 'DEMURRAGE' | 'STORAGE' | 'HANDLING' | 'CUSTOMS' | 'OTHER'
  amount: number
  currency: string
  thbAmount: number             // แปลงเป็นบาท
  invoiceRef?: string
}

export interface PortItem {
  chassisNo: string
  model: string
  color: string
  status: PortStatus
  inspectionStatus?: 'PENDING' | 'PASS' | 'FAIL'
  remarks?: string
}

export interface PortRecord {
  id: string
  poId: string
  vesselName: string            // ชื่อเรือ
  billOfLadingNo: string        // B/L No.
  arrivalDate: string           // วันเรือเข้า
  portName: string              // ท่าเรือ
  // ค่าใช้จ่ายท่าเรือ
  portCharges: PortCharge[]
  // พิธีการศุลกากร
  customsDeclarationNo?: string
  importDuty?: number           // ภาษีนำเข้า
  exciseTax?: number            // ภาษีสรรพสามิต (รถยนต์)
  vatOnImport?: number          // VAT นำเข้า
  // สถานะ
  status: PortStatus
  clearedDate?: string
  items: PortItem[]
}
