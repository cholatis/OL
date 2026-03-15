import { defineStore } from 'pinia'
import type { 
  Opportunity, SalesActivity, SalesTarget, 
  CommissionRecord, OpportunityStage
} from '@/types/sales'

export const useSalesStore = defineStore('sales', {
  state: () => ({
    opportunities: [
      {
        opportunityId: 'opp-1',
        opportunityNo: 'OPP-2026-0001',
        prospectName: 'NextGen Logistics Co.',
        stage: 'QUALIFIED',
        source: 'INBOUND',
        vehicleType: 'EV Pickup',
        estimatedFleetSize: 25,
        estimatedValue: 12500000,
        estimatedCloseDate: '2024-04-15',
        winProbability: 60,
        assignedSalesperson: 'Somsak P.',
        createdAt: '2024-03-01T10:00:00Z',
        updatedAt: '2024-03-12T15:30:00Z'
      },
      {
        opportunityId: 'opp-2',
        opportunityNo: 'OPP-2026-0002',
        customerId: 'cust-001', 
        stage: 'NEGOTIATION',
        source: 'RENEWAL',
        vehicleType: 'Executive Sedan',
        estimatedFleetSize: 10,
        estimatedValue: 8000000,
        estimatedCloseDate: '2024-03-25',
        winProbability: 85,
        assignedSalesperson: 'Somsak P.',
        createdAt: '2024-02-15T09:00:00Z',
        updatedAt: '2024-03-10T11:00:00Z'
      }
    ] as Opportunity[],

    activities: [
      {
        activityId: 'act-1',
        opportunityId: 'opp-1',
        type: 'MEETING',
        subject: 'Requirement Gathering - EV Fleet',
        notes: 'Client is interested in transitioning their inner-city fleet to EVs.',
        outcome: 'POSITIVE',
        nextAction: 'Prepare formal quotation',
        nextActionDate: '2024-03-20',
        salesperson: 'Somsak P.',
        createdAt: '2024-03-05T14:00:00Z'
      }
    ] as SalesActivity[],

    targets: [
      {
        targetId: 'tgt-1',
        salespersonId: 'Somsak P.',
        period: 'MONTHLY',
        year: 2024,
        month: 3,
        targetRevenue: 20000000,
        targetContracts: 5,
        targetFleetSize: 50,
        targetNewCustomers: 2,
        bonusThreshold: 110
      }
    ] as SalesTarget[],

    commissionRecords: [
      {
        commissionId: 'comm-1',
        salespersonId: 'Somsak P.',
        contractId: 'MLA-2023-088',
        contractValue: 5000000,
        commissionRate: 1.5,
        commissionAmount: 75000,
        bonusAmount: 0,
        status: 'APPROVED',
        paidDate: '2024-03-01'
      }
    ] as CommissionRecord[]
  }),

  getters: {
    getOpportunityById: (state) => (id: string) => state.opportunities.find(o => o.opportunityId === id),
    getActivitiesByOpportunity: (state) => (oppId: string) => state.activities.filter(a => a.opportunityId === oppId),
    pipelineStats: (state) => {
      const open = state.opportunities.filter(o => !['WON', 'LOST'].includes(o.stage))
      const totalValue = open.reduce((acc, curr) => acc + curr.estimatedValue, 0)
      const weightedValue = open.reduce((acc, curr) => acc + (curr.estimatedValue * (curr.winProbability / 100)), 0)
      const wonMTD = state.opportunities.filter(o => o.stage === 'WON' && o.closedAt?.startsWith('2024-03')).length
      return { totalValue, weightedValue, count: open.length, wonMTD }
    }
  },

  actions: {
    updateOpportunityStage(oppId: string, newStage: OpportunityStage) {
      const opp = this.opportunities.find(o => o.opportunityId === oppId)
      if (opp) {
        opp.stage = newStage
        opp.updatedAt = new Date().toISOString()
        if (newStage === 'WON' || newStage === 'LOST') {
          opp.closedAt = new Date().toISOString()
        }
      }
    },
    addOpportunity(opp: Opportunity) {
      this.opportunities.unshift(opp)
    }
  }
})
