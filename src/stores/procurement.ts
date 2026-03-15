import { defineStore } from 'pinia'
import type { 
  Vendor, PurchaseRequest, PurchaseOrder, 
  GoodsReceipt, PortRecord 
} from '@/types/procurement'

export const useProcurementStore = defineStore('procurement', {
  state: () => ({
    vendors: [
      {
        id: 'v-1',
        vendorCode: 'VD-001',
        vendorType: 'DEALER',
        companyName: 'Toyota Motor Thailand',
        taxId: '0105536000123',
        address: 'Bangplee, Samut Prakan',
        contactPerson: 'Somsak Toyota',
        phone: '02-123-4567',
        email: 'somsak@toyota.co.th',
        brand: ['Toyota'],
        status: 'ACTIVE',
        whtRate: 3
      }
    ] as Vendor[],

    purchaseRequests: [
      {
        id: 'pr-1',
        prNo: 'PR-2024-001',
        requestDate: '2024-03-01',
        requestedBy: 'K. Somchai',
        department: 'Operations',
        requiredDate: '2024-04-15',
        totalBudget: 1560000,
        purpose: 'New contract for XYZ Corp',
        status: 'APPROVED',
        items: [
          { lineNo: 1, assetType: 'Sedan', brand: 'Toyota', model: 'Camry 2.5G', year: 2024, quantity: 1, estimatedUnitPrice: 1560000, estimatedTotal: 1560000 }
        ]
      }
    ] as PurchaseRequest[],

    purchaseOrders: [
      {
        id: 'po-1',
        poNo: 'PO-2024-001',
        poDate: '2024-03-05',
        prId: 'pr-1',
        vendorId: 'v-1',
        vendorName: 'Toyota Motor Thailand',
        deliveryDate: '2024-04-10',
        subtotal: 1560000,
        vatAmount: 109200,
        total: 1669200,
        status: 'CONFIRMED',
        confirmedByVendor: true,
        items: [
          { lineNo: 1, brand: 'Toyota', model: 'Camry 2.5G', year: 2024, color: 'Black', quantity: 1, orderedQty: 1, receivedQty: 0, unitPrice: 1560000, totalPrice: 1560000, isImported: false }
        ]
      }
    ] as PurchaseOrder[],

    goodsReceipts: [] as GoodsReceipt[],
    
    portRecords: [
      {
        id: 'port-1',
        poId: 'po-2',
        vesselName: 'Ever Green 001',
        billOfLadingNo: 'BL123456',
        arrivalDate: '2024-03-20',
        portName: 'Laem Chabang',
        status: 'AT_PORT',
        portCharges: [],
        items: [
          { chassisNo: 'CH-IM-999', model: 'Vanguard 2024', color: 'White', status: 'AT_PORT' }
        ]
      }
    ] as PortRecord[]
  }),

  getters: {
    getVendorById: (state) => (id: string) => state.vendors.find(v => v.id === id),
    getPRById: (state) => (id: string) => state.purchaseRequests.find(pr => pr.id === id),
    getPOById: (state) => (id: string) => state.purchaseOrders.find(po => po.id === id),
    
    stockSummary: (state) => {
      // In a real app, this would count actual assets. 
      // For mock, we'll return fixed counts as requested.
      return {
        AVAILABLE: 45,
        RESERVED: 12,
        IN_TRANSIT: 8,
        AT_PORT: 5,
        PENDING_REG: 10,
        TOTAL: 80
      }
    }
  },

  actions: {
    addGoodsReceipt(gr: GoodsReceipt) {
      this.goodsReceipts.push(gr)
    }
  }
})
