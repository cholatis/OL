<script setup lang="ts">
import type { Invoice } from '@/types/billing'

interface Props {
  invoice: Invoice
}

const props = defineProps<Props>()

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('th-TH', { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  }).format(val)
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('th-TH')
}
</script>

<template>
  <div class="invoice-container pa-10 bg-white">
    <!-- Header -->
    <div class="d-flex justify-space-between mb-8">
      <div class="d-flex align-center">
        <VAvatar rounded="0" size="64" class="me-4">
           <VIcon icon="tabler-building-fortress" size="48" color="primary" />
        </VAvatar>
        <div>
          <h1 class="text-h4 font-weight-bold text-uppercase">Lessor Company</h1>
          <div class="text-caption">บริษัท เอบีซี ลีสซิ่ง จำกัด</div>
          <div class="text-caption">Tax ID: 0105556789001</div>
        </div>
      </div>
      <div class="text-right">
        <h2 class="text-h5 font-weight-bold">ใบแจ้งหนี้ / ใบกำกับภาษี</h2>
        <h3 class="text-h6 font-weight-medium">INVOICE / TAX INVOICE</h3>
        <div class="mt-2 text-h6 text-primary font-weight-bold">{{ invoice.invoiceNo }}</div>
      </div>
    </div>

    <!-- Parties -->
    <VRow class="mb-8 parties-section border-y py-4 no-gutters">
      <VCol cols="6" class="border-e pe-6">
        <div class="text-subtitle-2 font-weight-bold mb-2">ผู้ออกใบแจ้งหนี้ (ISSUE BY):</div>
        <div class="text-body-2">บริษัท เอบีซี ลีสซิ่ง จำกัด</div>
        <div class="text-body-2">123 ถนนสุขุมวิท แขวงคลองเตย</div>
        <div class="text-body-2">เขตคลองเตย กรุงเทพฯ 10110</div>
        <div class="text-body-2 font-weight-bold mt-2">Tax ID: 0105556789001</div>
      </VCol>
      <VCol cols="6" class="ps-6">
        <div class="text-subtitle-2 font-weight-bold mb-2">ลูกค้า / ผู้เช่า (LESSEE):</div>
        <div class="text-body-2 font-weight-bold text-uppercase">{{ invoice.lesseeName }}</div>
        <div class="text-body-2">{{ invoice.lesseeAddress }}</div>
        <div class="text-body-2 font-weight-bold mt-2">Tax ID: {{ invoice.lesseeTaxId }}</div>
      </VCol>
    </VRow>

    <!-- Meta Info -->
    <div class="d-flex justify-space-between mb-8 bg-light py-2 px-4 rounded">
      <div>
         <span class="text-caption me-2">เลขที่สัญญา (MLA NO):</span>
         <span class="text-body-2 font-weight-bold">{{ invoice.contractNo }}</span>
      </div>
      <div>
         <span class="text-caption me-2">วันที่ระบุในใบแจ้งหนี้ (DATE):</span>
         <span class="text-body-2 font-weight-bold">{{ formatDate(invoice.invoiceDate) }}</span>
      </div>
      <div>
         <span class="text-caption me-2">วันครบกำหนด (DUE DATE):</span>
         <span class="text-body-1 font-weight-bold text-error">{{ formatDate(invoice.dueDate) }}</span>
      </div>
    </div>

    <!-- Items Table -->
    <table class="invoice-table w-100 mb-8">
      <thead>
        <tr>
          <th class="text-left py-2">รายละเอียด (DESCRIPTION)</th>
          <th class="text-center py-2">จำนวน (QTY)</th>
          <th class="text-right py-2">ราคา/หน่วย (UNIT PRICE)</th>
          <th class="text-right py-2">รวม (AMOUNT)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in invoice.items" :key="idx" class="border-b">
          <td class="py-4">
            <div class="font-weight-bold">{{ item.description }}</div>
            <div class="text-caption text-medium-emphasis">งวดที่ 3/60 (Installment 3 of 60) | ระยะ: 01/03/2026 – 31/03/2026</div>
          </td>
          <td class="text-center py-4">{{ item.quantity }}</td>
          <td class="text-right py-4">{{ formatCurrency(item.unitPrice) }}</td>
          <td class="text-right py-4">{{ formatCurrency(item.amount) }}</td>
        </tr>
      </tbody>
    </table>

    <VDivider class="mb-4" />

    <!-- Totals -->
    <VRow justify="end" class="no-gutters">
      <VCol cols="4" class="text-right">
        <div class="d-flex justify-space-between py-1">
          <span class="text-body-2">ยอดรวมก่อนภาษี (SUBTOTAL):</span>
          <span class="text-body-2 font-weight-bold">{{ formatCurrency(invoice.subtotal) }} ฿</span>
        </div>
        <div class="d-flex justify-space-between py-1">
          <span class="text-body-2">ภาษีมูลค่าเพิ่ม (VAT 7%):</span>
          <span class="text-body-2 font-weight-bold">{{ formatCurrency(invoice.vatAmount) }} ฿</span>
        </div>
        <div class="d-flex justify-space-between py-1 bg-light px-2 my-2 rounded border">
          <span class="text-subtitle-1 font-weight-bold">ยอดรวมสุทธิ (TOTAL):</span>
          <span class="text-subtitle-1 font-weight-bold">{{ formatCurrency(invoice.totalAmount) }} ฿</span>
        </div>
        <div class="d-flex justify-space-between py-1 text-error">
          <span class="text-caption">หักภาษี ณ ที่จ่าย (WHT):</span>
          <span class="text-body-2 font-weight-bold">({{ formatCurrency(invoice.withholdingTax || 0) }} ฿)</span>
        </div>
        <VDivider class="my-2" />
        <div class="d-flex justify-space-between py-1 text-primary">
          <span class="text-h6 font-weight-bold">สุทธิที่ต้องชำระ (NET PAYABLE):</span>
          <span class="text-h6 font-weight-bold">{{ formatCurrency(invoice.netPayable || invoice.totalAmount) }} ฿</span>
        </div>
      </VCol>
    </VRow>

    <!-- Footer / Payment Info -->
    <div class="mt-12 text-caption border pa-4 rounded bg-light">
      <div class="font-weight-bold mb-2">ช่องทางการชำระเงิน (PAYMENT METHODS):</div>
      <div>• โอนเข้าบัญชี: ธนาคารกสิกรไทย เลขที่ 123-4-56789-0 (ชื่อบัญชี: บจก. เอบีซี ลีสซิ่ง)</div>
      <div>• เช็คสั่งจ่าย: บจก. เอบีซี ลีสซิ่ง (พร้อมขีดคร่อม)</div>
      <div class="mt-2 text-error font-weight-bold">* โปรดระบุเลขที่ใบแจ้งหนี้ในการโอนเงิน และส่งหลักฐานการชำระเงินมาที่ billing@abcleasing.com</div>
    </div>
  </div>
</template>

<style scoped>
.invoice-container {
  min-height: 297mm; /* A4 Ratio */
  color: #333;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
  font-family: 'Inter', 'Prompt', sans-serif;
  border: 1px solid #eee;
}

.invoice-table th {
  border-bottom: 2px solid #333;
  text-transform: uppercase;
  font-size: 0.75rem;
  color: #666;
}

.invoice-table td {
  vertical-align: top;
}

.parties-section {
  border-color: #eee !important;
}

.bg-light {
    background-color: #f8f9fa !important;
}

@media print {
  .invoice-container {
    border: none;
    box-shadow: none;
    padding: 0 !important;
  }
}
</style>
