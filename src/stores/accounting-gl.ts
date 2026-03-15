import { defineStore } from 'pinia'
import type { 
  ChartOfAccount, 
  JournalEntry, 
  Receipt, 
  APInvoice, 
  BankReconItem,
  AccountType
} from '@/types/accounting-gl'

export const useAccountingGLStore = defineStore('accounting-gl', {
  state: () => ({
    chartOfAccounts: [
      { code: '1000', name: 'Assets', type: 'ASSET', nature: 'DR', level: 1, active: true, isSystemAccount: true },
      { code: '1100', name: 'Current Assets', type: 'ASSET', nature: 'DR', parentCode: '1000', level: 2, active: true, isSystemAccount: true },
      { code: '1110', name: 'Lease Receivable - Current', type: 'ASSET', nature: 'DR', parentCode: '1100', level: 3, active: true, isSystemAccount: true },
      { code: '1120', name: 'Maintenance Fee Receivable', type: 'ASSET', nature: 'DR', parentCode: '1100', level: 3, active: true, isSystemAccount: true },
      { code: '2000', name: 'Liabilities', type: 'LIABILITY', nature: 'CR', level: 1, active: true, isSystemAccount: true },
      { code: '2100', name: 'Accounts Payable', type: 'LIABILITY', nature: 'CR', parentCode: '2000', level: 2, active: true, isSystemAccount: true },
      { code: '2120', name: 'AP - Maintenance Vendors', type: 'LIABILITY', nature: 'CR', parentCode: '2100', level: 3, active: true, isSystemAccount: true },
      { code: '4000', name: 'Revenue', type: 'REVENUE', nature: 'CR', level: 1, active: true, isSystemAccount: true },
      { code: '4101', name: 'Financial Rental Income', type: 'REVENUE', nature: 'CR', parentCode: '4000', level: 2, active: true, isSystemAccount: true },
      { code: '4102', name: 'Maintenance Rental Income', type: 'REVENUE', nature: 'CR', parentCode: '4000', level: 2, active: true, isSystemAccount: true },
      { code: '5000', name: 'Expenses', type: 'EXPENSE', nature: 'DR', level: 1, active: true, isSystemAccount: true },
      { code: '5102', name: 'Maintenance Cost', type: 'EXPENSE', nature: 'DR', parentCode: '5000', level: 2, active: true, isSystemAccount: true },
    ] as ChartOfAccount[],

    journalEntries: [
      {
        id: 'JE-001',
        entryNo: 'JE-2024-0001',
        date: '2024-01-01',
        source: 'INVOICE',
        description: 'Monthly Billing - Jan 2024 (Contract MLA-001)',
        status: 'POSTED',
        period: '2024-01',
        lines: [
          { lineNo: 1, accountCode: '1110', accountName: 'Lease Receivable', description: 'Lease portion', dr: 45000, cr: 0 },
          { lineNo: 2, accountCode: '4101', accountName: 'Financial Rental Income', description: 'Lease portion', dr: 0, cr: 45000 }
        ]
      }
    ] as JournalEntry[],

    receipts: [] as Receipt[],
    apInvoices: [
      {
        id: 'AP-001',
        apInvoiceNo: 'AP-2024-0001',
        vendorId: 'VEND-001',
        vendorName: 'บริษัท ยางดี จำกัด',
        vendorTaxId: '0105560000000',
        invoiceDate: '2024-03-01',
        dueDate: '2024-03-31',
        subtotal: 10000,
        vatAmount: 700,
        whtAmount: 300,
        netPayable: 10400,
        status: 'PENDING',
        lines: [
          { description: 'เปลี่ยนยาง 4 เส้น MLA-001', amount: 10000, whtRate: 3, whtAmount: 300, accountCode: '5102' }
        ]
      }
    ] as APInvoice[],

    bankReconItems: [
      { id: 'BR-001', date: '2024-03-05', bankRef: 'TRF-998877', bankAmount: 45000, status: 'UNMATCHED' },
      { id: 'BR-002', date: '2024-03-06', bankRef: 'TRF-112233', bankAmount: 25000, status: 'UNMATCHED' }
    ] as BankReconItem[]
  }),

  actions: {
    addJournalEntry(entry: JournalEntry) {
      this.journalEntries.unshift(entry)
    },
    postJournalEntry(id: string) {
      const entry = this.journalEntries.find(e => e.id === id)
      if (entry) entry.status = 'POSTED'
    },
    addReceipt(receipt: Receipt) {
      this.receipts.unshift(receipt)
      // สร้าง JE อัตโนมัติ (Mock logic)
      const je: JournalEntry = {
          id: `JE-RC-${receipt.id}`,
          entryNo: `JE-RC-${receipt.receiptNo}`,
          date: receipt.receiptDate,
          source: 'RECEIPT',
          description: `Cash received from ${receipt.receiptNo}`,
          status: 'POSTED',
          period: receipt.receiptDate.substring(0, 7),
          lines: [
              { lineNo: 1, accountCode: '1000', accountName: 'Cash/Bank', description: 'Payment', dr: receipt.totalReceived, cr: 0 },
              { lineNo: 2, accountCode: '1110', accountName: 'Lease Receivable', description: 'Clear AR', dr: 0, cr: receipt.totalReceived }
          ]
      }
      this.addJournalEntry(je)
    }
  }
})
