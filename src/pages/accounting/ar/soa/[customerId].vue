<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const customerId = ref(route.params.customerId)

// Mock SOA Data
const soaData = [
  { date: '2024-01-01', refNo: 'IV-2024-001', description: 'Monthly Rental - Jan', invoiceAmount: 48150, paidAmount: 0, balance: 48150, daysOverdue: 65 },
  { date: '2024-02-01', refNo: 'IV-2024-045', description: 'Monthly Rental - Feb', invoiceAmount: 48150, paidAmount: 0, balance: 96300, daysOverdue: 34 },
  { date: '2024-03-01', refNo: 'IV-2024-089', description: 'Monthly Rental - Mar', invoiceAmount: 48150, paidAmount: 0, balance: 144450, daysOverdue: 5 },
  { date: '2024-03-05', refNo: 'RC-2024-001', description: 'Payment Received', invoiceAmount: 0, paidAmount: 48150, balance: 96300, daysOverdue: 0 },
]

const totals = computed(() => ({
  outstanding: soaData[soaData.length - 1].balance,
  overdue: soaData.filter(d => d.daysOverdue > 0).reduce((sum, d) => sum + (d.invoiceAmount - d.paidAmount), 0)
}))

const formatCurrency = (val: number) => {
  return val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard class="soa-document">
        <VCardText>
          <!-- Header -->
          <div class="d-flex justify-space-between align-start mb-8">
            <div>
              <div class="text-h4 font-weight-bold text-primary mb-1">STATEMENT OF ACCOUNT</div>
              <div class="text-subtitle-1 opacity-75">บริษัท กราวิตี้ ลิสซิ่ง จำกัด (Antigravity Leasing)</div>
              <div class="text-caption">123 Phaya Thai Rd, Bangkok 10400</div>
            </div>
            <div class="text-right">
               <div class="text-h6">บริษัท เอบีซี โซลูชั่น จำกัด</div>
               <div class="text-body-2">Tax ID: 0105560000000</div>
               <div class="text-caption mt-2 text-decoration-underline">As of: {{ new Date().toLocaleDateString() }}</div>
            </div>
          </div>

          <VDivider class="mb-8" />

          <!-- Summary Boxes -->
          <VRow class="mb-8">
            <VCol cols="12" md="4">
               <div class="pa-4 border rounded bg-light-error">
                  <div class="text-caption font-weight-bold text-error">Total Outstanding</div>
                  <div class="text-h5 text-error font-weight-bold">{{ formatCurrency(totals.outstanding) }} ฿</div>
               </div>
            </VCol>
            <VCol cols="12" md="4">
               <div class="pa-4 border rounded">
                  <div class="text-caption font-weight-bold">Current (< 30 Days)</div>
                  <div class="text-h5 font-weight-bold">{{ formatCurrency(48150) }} ฿</div>
               </div>
            </VCol>
            <VCol cols="12" md="4">
               <div class="pa-4 border rounded">
                  <div class="text-caption font-weight-bold">Past Due (> 30 Days)</div>
                  <div class="text-h5 text-error font-weight-bold">{{ formatCurrency(totals.overdue - 48150) }} ฿</div>
               </div>
            </VCol>
          </VRow>

          <!-- Transaction Table -->
          <VTable density="compact" class="soa-table border">
            <thead>
              <tr class="bg-light-secondary">
                <th>Date</th>
                <th>Reference</th>
                <th>Description</th>
                <th class="text-right">Invoiced (DR)</th>
                <th class="text-right">Received (CR)</th>
                <th class="text-right">Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(line, idx) in soaData" :key="idx">
                <td class="text-no-wrap">{{ line.date }}</td>
                <td><span class="font-weight-bold">{{ line.refNo }}</span></td>
                <td>{{ line.description }}</td>
                <td class="text-right">{{ line.invoiceAmount > 0 ? formatCurrency(line.invoiceAmount) : '-' }}</td>
                <td class="text-right text-success">{{ line.paidAmount > 0 ? formatCurrency(line.paidAmount) : '-' }}</td>
                <td class="text-right font-weight-bold">{{ formatCurrency(line.balance) }}</td>
              </tr>
            </tbody>
            <tfoot>
                 <tr class="bg-light-secondary">
                    <td colspan="5" class="text-right font-weight-bold">NET BALANCE DUE</td>
                    <td class="text-right text-h6 text-error font-weight-bold">{{ formatCurrency(totals.outstanding) }} ฿</td>
                </tr>
            </tfoot>
          </VTable>

          <!-- Watermark & Footer -->
          <div class="soa-watermark">STATEMENT OF ACCOUNT</div>

          <div class="mt-12 text-center text-caption opacity-50">
             This is a computer-generated document. No signature is required.
             <br/>
             Payment terms: 30 Days. Please transfer to KBANK Account 000-0-00000-0
          </div>
        </VCardText>
        
        <VCardActions class="pa-4">
             <VBtn prepend-icon="tabler-arrow-left" variant="tonal" to="/accounting/ar/receipts">Back</VBtn>
             <VSpacer />
             <VBtn prepend-icon="tabler-mail" variant="tonal" color="info" class="me-2">Email to Customer</VBtn>
             <VBtn prepend-icon="tabler-file-type-pdf" color="primary">Download PDF</VBtn>
        </VCardActions>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped>
.soa-document { position: relative; overflow: hidden; }
.soa-watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
  font-size: 8rem;
  font-weight: 900;
  opacity: 0.05;
  pointer-events: none;
  white-space: nowrap;
}
.bg-light-error { background-color: rgba(var(--v-theme-error), 0.1); }
.bg-light-secondary { background-color: rgba(var(--v-theme-on-surface), 0.05); }
.soa-table th { text-transform: uppercase; font-size: 0.75rem; font-weight: 700; }
</style>
