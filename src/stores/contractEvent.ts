import { defineStore } from 'pinia'
import type { ContractEvent, ContractFinancials } from '@/types/contract-event'

export const useContractEventStore = defineStore('contractEvent', {
  state: () => ({
    events: [
      {
        id: 'EV-2026-001',
        contractId: 'MLA-001',
        contractNo: 'MLA-2024-001',
        eventType: 'RESTRUCTURE',
        eventDate: '2026-04-01',
        requestDate: '2026-03-10',
        requestedBy: 'Somchai P.',
        status: 'PENDING_APPROVAL',
        remarks: 'Customer requested 3 months extension due to project delay',
        details: {
          restructureType: 'DR',
          originalSchedule: [],
          newSchedule: [],
          extensionMonths: 3,
          tfrs9Impact: 'Remain Stage 1'
        },
        attachments: [],
        approvalHistory: [
          { role: 'Requester', approver: 'Somchai P.', status: 'APPROVED', date: '2026-03-10' },
          { role: 'Supervisor', approver: 'Vichai K.', status: 'PENDING' }
        ]
      },
      {
        id: 'EV-2026-002',
        contractId: 'MLA-002',
        contractNo: 'MLA-2024-002',
        eventType: 'EARLY_TERMINATION',
        eventDate: '2026-03-15',
        requestDate: '2026-03-01',
        requestedBy: 'Somsak R.',
        status: 'COMPLETED',
        remarks: 'Contract closed early by customer request',
        details: {
          terminationDate: '2026-03-15',
          outstandingPrincipal: 450000,
          unearnedIncome: 12000,
          etFeeRate: 2,
          etFee: 9000,
          insuranceRefund: 3500,
          securityDepositRefund: 50000,
          netPayable: 405500
        },
        attachments: [],
        approvalHistory: [
          { role: 'Requester', approver: 'Somsak R.', status: 'APPROVED', date: '2026-03-01' },
          { role: 'Credit Manager', approver: 'Sunee T.', status: 'APPROVED', date: '2026-03-05' }
        ]
      }
    ] as ContractEvent[],

    financials: [
      {
        id: 'FIN-001',
        contractId: 'MLA-001',
        contractNo: 'MLA-2024-001',
        downPaymentAmount: 100000,
        downPaymentDate: '2024-01-01',
        downPaymentStatus: 'RECEIVED',
        downPaymentMethod: 'TRANSFER',
        securityDepositAmount: 50000,
        securityDepositDate: '2024-01-01',
        securityDepositStatus: 'RECEIVED',
        securityDepositType: 'CASH',
        initialPaymentAmount: 25000,
        initialPaymentStatus: 'RECEIVED',
        initialPaymentItems: [
          { description: 'First Month Rental', amount: 15000 },
          { description: 'Processing Fee', amount: 5000 },
          { description: 'Stamp Duty', amount: 5000 }
        ],
        paymentMethod: 'ADVANCE',
        paymentPattern: 'STRAIGHT'
      },
      {
        id: 'FIN-002',
        contractId: 'MLA-002',
        contractNo: 'MLA-2024-002',
        downPaymentAmount: 0,
        downPaymentDate: '',
        downPaymentStatus: 'PENDING',
        downPaymentMethod: 'TRANSFER',
        securityDepositAmount: 120000,
        securityDepositDate: '2026-02-01',
        securityDepositStatus: 'RECEIVED',
        securityDepositType: 'GUARANTEE_LETTER',
        initialPaymentAmount: 45000,
        initialPaymentStatus: 'RECEIVED',
        initialPaymentItems: [
          { description: 'First Month Rental', amount: 40000 },
          { description: 'Admin Fee', amount: 5000 }
        ],
        paymentMethod: 'ADVANCE',
        paymentPattern: 'STEP_UP',
        stepPayments: [
          { fromMonth: 1, toMonth: 12, amount: 40000 },
          { fromMonth: 13, toMonth: 24, amount: 45000 },
          { fromMonth: 25, toMonth: 60, amount: 50000 }
        ]
      }
    ] as ContractFinancials[]
  }),

  actions: {
    addEvent(event: ContractEvent) {
      this.events.unshift(event)
    },
    updateEvent(event: ContractEvent) {
      const index = this.events.findIndex(e => e.id === event.id)
      if (index !== -1) {
        this.events[index] = event
      }
    },
    getFinancialsByContractId(contractId: string) {
        return this.financials.find(f => f.contractId === contractId || f.contractNo === contractId)
    }
  }
})
