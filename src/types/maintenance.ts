export type WorkOrderType = 'PM' | 'CM' | 'EMERGENCY' | 'INSPECTION' | 'RETURN_INSPECTION'
export type WorkOrderStatus = 'OPEN' | 'ASSIGNED' | 'IN_PROGRESS' | 'PENDING_PARTS' | 'COMPLETED' | 'CANCELLED'
export type WorkOrderResult = 'PASS' | 'FAIL' | 'PARTIAL' | 'PENDING_FOLLOWUP'

export interface ChecklistItem {
  id: string
  description: string
  isRequired: boolean
  result?: 'PASS' | 'FAIL' | 'N/A'
  note?: string
}

export interface Part {
  partNo: string
  partName: string
  quantity: number
  unitCost: number
  totalCost: number
}

export interface WorkOrder {
  id: string
  workOrderNo: string
  type: WorkOrderType
  status: WorkOrderStatus
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

  // Asset Info
  assetId: string
  assetTag: string
  serialNumber: string
  assetModel: string
  assetBrand: string

  // Contract/Customer Info
  contractId: string
  contractNo: string
  lesseeId: string
  lesseeName: string
  siteAddress: string

  // Scheduling
  reportedBy: string
  reportedAt: string
  scheduledDate: string
  scheduledTimeSlot: string
  technicianId?: string
  technicianName?: string

  // Work Details
  problemDescription: string
  workDescription: string
  checklistItems: ChecklistItem[]

  // Results & Costs
  actualStartAt?: string
  actualEndAt?: string
  result?: WorkOrderResult
  resultNote?: string
  partsUsed: Part[]
  laborCost: number
  partsCost: number
  totalCost: number

  // Media
  beforePhotos: string[]
  afterPhotos: string[]

  // References
  substitutionId?: string
  insuranceClaimId?: string
  pmPlanId?: string
  pmScheduleItemId?: string

  createdAt: string
  updatedAt: string
}

export interface PMPlan {
  id: string
  planCode: string
  planName: string
  assetCategory: string
  assetModel?: string
  intervalMonths: number
  checklistTemplate: ChecklistItem[]
  estimatedDurationHours: number
  estimatedCost: number
  activeAssetCount: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}
