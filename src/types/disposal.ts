export type DisposalChannel =
  | 'SELL_TO_LESSEE'
  | 'DEALER_BUYBACK'
  | 'AUCTION'
  | 'PRIVATE_SALE'
  | 'SCRAP'
  | 'DONATE'

export type DisposalStatus =
  | 'PENDING_RETURN'
  | 'RETURNED'
  | 'INSPECTION'
  | 'VALUATION'
  | 'LISTED'
  | 'OFFER_RECEIVED'
  | 'SOLD'
  | 'TRANSFER_COMPLETE'
  | 'DEREGISTERED'
  | 'CLOSED'

export interface AssetValuation {
  id: string
  valuationDate: string
  valuedBy: string
  valuationType: 'DEALER_QUOTE' | 'APPRAISAL' | 'INTERNAL' | 'BOOK_VALUE'
  valuationAmount: number
  condition: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR'
  conditionNotes: string
  mileage: number
  photos: string[]
  isApproved: boolean
}

export interface DisposalEvent {
  date: string
  event: string
  performedBy: string
  notes?: string
}

export interface DisposalCase {
  id: string
  disposalNo: string
  assetId: string
  chassisNo: string
  plateNo: string
  brand: string
  model: string
  year: number
  color: string
  originType: 'END_OF_LEASE' | 'EARLY_TERMINATION' | 'TOTAL_LOSS' | 'VOLUNTARY'
  contractId: string
  contractEndDate: string
  returnDate?: string
  originalCost: number
  nbvAtDisposal: number
  contractRV: number
  valuations: AssetValuation[]
  approvedValuation?: number
  disposalChannel?: DisposalChannel
  listedPrice?: number
  finalSalePrice?: number
  gainLoss?: number
  faDisposalId?: string
  inspectionReport?: string
  transferDeedUrl?: string
  deregistrationDoc?: string
  status: DisposalStatus
  timeline: DisposalEvent[]
}

// ─── Auction ─────────────────────────────────────────────────
export type AuctionStatus = 'UPCOMING' | 'REGISTRATION_OPEN' | 'LIVE' | 'COMPLETED' | 'CANCELLED'

export interface BidRecord {
  bidderName: string
  bidAmount: number
  bidTime: string
}

export interface AuctionLot {
  id: string
  auctionId: string
  lotNo: string
  disposalCaseId: string
  assetId: string
  displayTitle: string
  reservePrice: number
  currentBid?: number
  highestBidder?: string
  bidCount: number
  bidHistory: BidRecord[]
  finalPrice?: number
  winnerId?: string
  winnerName?: string
  status: 'LISTED' | 'BIDDING' | 'SOLD' | 'UNSOLD' | 'WITHDRAWN'
}

export interface AuctionSession {
  id: string
  auctionNo: string
  auctionDate: string
  auctionType: 'PHYSICAL' | 'ONLINE' | 'HYBRID'
  venue?: string
  onlinePlatform?: string
  lots: AuctionLot[]
  totalLots: number
  soldLots: number
  totalRevenue?: number
  status: AuctionStatus
}

// ─── Return Inspection ────────────────────────────────────────
export type InspectionCondition = 'GOOD' | 'MINOR_DAMAGE' | 'MAJOR_DAMAGE'

export interface InspectionItem {
  item: string
  status: 'OK' | 'DAMAGE' | 'MISSING'
  notes?: string
}

export interface InspectionSection {
  condition: InspectionCondition
  items: InspectionItem[]
}

export interface TireCondition {
  treadDepth: number
  condition: 'GOOD' | 'WORN' | 'DAMAGED'
  chargeAmount: number
}

export interface ExcessDamage {
  location: string
  damageType: string
  severity: 'MINOR' | 'MAJOR'
  repairCost: number
  chargeable: boolean
}

export interface ReturnInspection {
  id: string
  disposalCaseId: string
  inspectionDate: string
  inspectedBy: string
  mileage: number
  exterior: InspectionSection
  interior: InspectionSection
  mechanical: InspectionSection
  tires: {
    frontLeft: TireCondition
    frontRight: TireCondition
    rearLeft: TireCondition
    rearRight: TireCondition
  }
  excessDamages: ExcessDamage[]
  totalDamageCharges: number
  photos: string[]
  overallCondition: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR'
  inspectionReport: string
}
