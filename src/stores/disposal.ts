import { defineStore } from 'pinia'
import type { 
  DisposalCase, AuctionSession, 
  ReturnInspection 
} from '@/types/disposal'

export const useDisposalStore = defineStore('disposal', {
  state: () => ({
    disposalCases: [
      {
        id: 'dsp-1',
        disposalNo: 'DSP-2024-001',
        assetId: 'as-101',
        chassisNo: 'CH-2021-T123',
        plateNo: '1กก 1111',
        brand: 'Toyota',
        model: 'Camry 2.5G',
        year: 2021,
        color: 'Silver',
        originType: 'END_OF_LEASE',
        contractId: 'cnt-888',
        contractEndDate: '2024-03-01',
        originalCost: 1250000,
        nbvAtDisposal: 850000,
        contractRV: 900000,
        status: 'INSPECTION',
        timeline: [
          { date: '2024-03-02', event: 'Vehicle Returned', performedBy: 'Logistics', notes: 'Returned at Yard A' }
        ],
        valuations: []
      }
    ] as DisposalCase[],

    auctions: [
      {
        id: 'auc-1',
        auctionNo: 'AUC-2024-03',
        auctionDate: '2024-03-25',
        auctionType: 'ONLINE',
        onlinePlatform: 'Apple Auto Auction',
        status: 'UPCOMING',
        lots: [],
        totalLots: 45,
        soldLots: 0
      }
    ] as AuctionSession[],

    inspections: [] as ReturnInspection[]
  }),

  getters: {
    getCaseById: (state) => (id: string) => state.disposalCases.find(c => c.id === id),
    getAuctionById: (state) => (id: string) => state.auctions.find(a => a.id === id),
    
    pipelineSummary: (state) => {
      return {
        PENDING_RETURN: state.disposalCases.filter(c => c.status === 'PENDING_RETURN').length,
        INSPECTION: state.disposalCases.filter(c => c.status === 'INSPECTION').length,
        VALUATION: state.disposalCases.filter(c => c.status === 'VALUATION').length,
        LISTED: state.disposalCases.filter(c => c.status === 'LISTED').length,
        SOLD: 5, // Mock monthly solved
        avgGainLoss: 25000
      }
    }
  },

  actions: {
    updateCaseStatus(id: string, status: any) {
      const c = this.disposalCases.find(x => x.id === id)
      if (c) c.status = status
    }
  }
})
