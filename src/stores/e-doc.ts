import { defineStore } from 'pinia'
import type { ETaxInvoice, WHTCertificate, EPaymentBatch, EStampRecord, TaxFiling } from '@/types/e-doc'

export const useEDocStore = defineStore('eDoc', {
  state: () => ({
    taxInvoices: [
      {
        id: 'eti-1',
        invoiceNo: 'TIV202403001',
        invoiceType: 'TAX_INVOICE',
        invoiceDate: '2024-03-01',
        sellerTaxId: '0105534012345',
        sellerName: 'Phatra Leasing PCL',
        buyerName: 'SCG Logistics Management',
        subtotal: 50000,
        vatRate: 7,
        vatAmount: 3500,
        total: 53500,
        status: 'SIGNED',
        signatureStatus: 'SIGNED'
      },
      {
        id: 'eti-2',
        invoiceNo: 'TIV202403002',
        invoiceType: 'TAX_INVOICE',
        invoiceDate: '2024-03-02',
        sellerTaxId: '0105534012345',
        sellerName: 'Phatra Leasing PCL',
        buyerName: 'CP All Public Co., Ltd.',
        subtotal: 120000,
        vatRate: 7,
        vatAmount: 8400,
        total: 128400,
        status: 'SUBMITTED_RD',
        signatureStatus: 'VERIFIED',
        rdSubmissionId: 'RD-REF-998811'
      }
    ] as ETaxInvoice[],

    whtCertificates: [
      {
        id: 'wht-1',
        certNo: 'WHT202403001',
        whtType: 'PND53',
        issueDate: '2024-03-05',
        payeeName: 'A-Class Auto Service Co.',
        totalIncome: 15000,
        totalWHT: 450,
        status: 'ISSUED'
      }
    ] as WHTCertificate[],

    paymentBatches: [
      {
        id: 'pay-1',
        batchNo: 'PAY20240301',
        paymentDate: '2024-03-05',
        paymentMethod: 'DIRECT_DEBIT',
        totalAmount: 450000,
        status: 'CONFIRMED'
      }
    ] as EPaymentBatch[],

    stampRecords: [
      {
        id: 'st-1',
        stampNo: 'STAMP-001',
        contractId: 'MLA-2024-001',
        contractType: 'Operating Lease',
        stampDate: '2024-03-01',
        contractValue: 1250000,
        stampDuty: 1250,
        status: 'PAID'
      }
    ] as EStampRecord[],

    taxFilings: [
      {
        id: 'fil-1',
        formType: 'PP30',
        taxPeriod: '2024-02',
        dueDate: '2024-03-15',
        taxableAmount: 5000000,
        taxAmount: 350000,
        status: 'FILED',
        rdRefNo: 'PP30-223344'
      }
    ] as TaxFiling[]
  }),
  actions: {
    // Mock actions
  }
})
