<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useEDocStore } from '@/stores/e-doc'
import { computed } from 'vue'

const route = useRoute()
const eDocStore = useEDocStore()
const invoiceId = route.params.id as string

const invoice = computed(() => eDocStore.taxInvoices.find(i => i.id === invoiceId))

const formatCurrency = (val: number) => {
  return (val || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>

<template>
  <div v-if="invoice">
    <VRow>
      <VCol cols="12" class="d-flex justify-end gap-3 mb-4">
        <VBtn variant="tonal" color="secondary" prepend-icon="tabler-download">Download PDF</VBtn>
        <VBtn variant="tonal" color="info" prepend-icon="tabler-mail">Send Email</VBtn>
        <VBtn color="primary" prepend-icon="tabler-cloud-upload" :disabled="invoice.status === 'ACCEPTED_RD'">Submit to RD</VBtn>
      </VCol>

      <VCol cols="12">
        <VCard class="pa-10">
          <!-- Tax Invoice Header -->
          <div class="d-flex justify-space-between mb-8">
            <div>
              <h1 class="text-h3 font-weight-bold text-primary mb-1">ใบกำกับภาษี</h1>
              <h2 class="text-h5 text-secondary">TAX INVOICE</h2>
            </div>
            <div class="text-right">
              <div class="text-h6 font-weight-bold">{{ invoice.invoiceNo }}</div>
              <div class="text-subtitle-1">Date: {{ invoice.invoiceDate }}</div>
            </div>
          </div>

          <VRow class="mb-8">
            <VCol cols="6">
              <div class="font-weight-bold text-uppercase text-caption mb-2">Seller / ผู้ขาย</div>
              <div class="text-h6 font-weight-bold">{{ invoice.sellerName }}</div>
              <div class="text-body-1">Tax ID: {{ invoice.sellerTaxId }} (Head Office)</div>
              <div class="text-body-2">123 Phatra Tower, Ratchadaphisek Rd, Bangkok 10310</div>
            </VCol>
            <VCol cols="6">
              <div class="font-weight-bold text-uppercase text-caption mb-2">Buyer / ผู้ซื้อ</div>
              <div class="text-h6 font-weight-bold">{{ invoice.buyerName }}</div>
              <div class="text-body-1">Tax ID: 0107536000123 (Head Office)</div>
              <div class="text-body-2">Industrial Park St, Rayong 21150</div>
            </VCol>
          </VRow>

          <VTable class="mb-8 border">
            <thead class="bg-light">
              <tr>
                <th width="10%">#</th>
                <th>Description / รายการ</th>
                <th class="text-right" width="15%">Qty</th>
                <th class="text-right" width="15%">Unit Price</th>
                <th class="text-right" width="20%">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>ค่าเช่ารถยนต์ ประจำเดือน มีนาคม 2567 (Toyota Camry)</td>
                <td class="text-right">1</td>
                <td class="text-right">{{ formatCurrency(invoice.subtotal) }}</td>
                <td class="text-right font-weight-bold">{{ formatCurrency(invoice.subtotal) }}</td>
              </tr>
            </tbody>
          </VTable>

          <div class="d-flex justify-end border-t pt-4">
            <div style="width: 300px">
              <div class="d-flex justify-space-between mb-2">
                <span>Subtotal (ก่อนภาษี)</span>
                <span class="font-weight-bold">{{ formatCurrency(invoice.subtotal) }}</span>
              </div>
              <div class="d-flex justify-space-between mb-2">
                <span>VAT (7%)</span>
                <span class="font-weight-bold">{{ formatCurrency(invoice.vatAmount) }}</span>
              </div>
              <VDivider class="my-2" />
              <div class="d-flex justify-space-between text-h6 font-weight-bold text-primary">
                <span>Total Amount (สุทธิ)</span>
                <span>{{ formatCurrency(invoice.total) }}</span>
              </div>
            </div>
          </div>

          <!-- Digital Signature Section -->
          <VCard variant="outlined" color="success" class="mt-10 pa-4" v-if="invoice.signatureStatus !== 'UNSIGNED'">
            <div class="d-flex align-center">
              <VIcon icon="tabler-certificate-check" size="32" class="me-3" />
              <div>
                <div class="font-weight-bold">Digitally Signed Document</div>
                <div class="text-caption">
                  Signed by: {{ invoice.sellerName }} at {{ invoice.signedAt || '2024-03-01 09:12:44' }}
                </div>
                <div class="text-caption" v-if="invoice.rdSubmissionId">
                  RD Reference: {{ invoice.rdSubmissionId }}
                </div>
              </div>
              <VSpacer />
              <VIcon icon="tabler-qrcode" size="64" />
            </div>
          </VCard>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style scoped>
.bg-light {
  background-color: rgb(var(--v-theme-on-surface), 0.03);
}
</style>
