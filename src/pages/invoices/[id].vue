<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBillingStore } from '@/stores/billing'
import { useInvoicePrint } from '@/composables/useInvoicePrint'
import InvoiceDocument from '@/components/InvoiceDocument.vue'
import type { Invoice } from '@/types/billing'

const route = useRoute()
const router = useRouter()
const billingStore = useBillingStore()
const { printInvoice, exportPdf, sendEmail } = useInvoicePrint()

const id = computed(() => route.params.id as string)
const invoice = ref<Invoice | null>(null)
const isPaymentDialogOpen = ref(false)
const paymentForm = ref({ date: new Date().toISOString().split('T')[0], method: 'Bank Transfer', amount: 0, ref: '' })

onMounted(() => {
  const invoiceId = route.params.id as string
  const found = billingStore.invoices.find(i => i.id === invoiceId || i.invoiceNo === invoiceId)
  if (found) {
    invoice.value = { ...found }
    paymentForm.value.amount = found.totalAmount
  } else {
    router.push('/invoices')
  }
})

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    DRAFT: 'secondary',
    ISSUED: 'primary',
    OVERDUE: 'error',
    PAID: 'success',
    CANCELLED: 'grey'
  }
  return colors[status] || 'grey'
}

const confirmPayment = async () => {
    if (invoice.value) {
        await billingStore.confirmPayment(invoice.value.id, paymentForm.value.amount, paymentForm.value.method)
        invoice.value.status = 'PAID'
        invoice.value.paidDate = paymentForm.value.date
        invoice.value.paidAmount = paymentForm.value.amount
        invoice.value.paymentMethod = paymentForm.value.method
        isPaymentDialogOpen.value = false
    }
}

const handleSendEmail = async () => {
    if (invoice.value) {
        await sendEmail(invoice.value.invoiceNo, 'customer@example.com')
    }
}
</script>

<template>
  <div v-if="invoice">
    <VRow class="mb-6 align-center d-print-none">
      <VCol cols="12">
        <div class="d-flex align-center">
          <VBtn icon variant="text" @click="router.back()"><VIcon icon="tabler-arrow-left" /></VBtn>
          <h2 class="text-h4 font-weight-bold ms-2">จัดการใบแจ้งหนี้ / Invoice Management</h2>
          <VSpacer />
          <VBtn variant="tonal" color="secondary" class="me-2" @click="router.push('/invoices')">รายการทั้งหมด</VBtn>
        </div>
      </VCol>
    </VRow>

    <VRow>
      <!-- Left: Invoice Document -->
      <VCol cols="12" md="8">
        <InvoiceDocument :invoice="invoice" />
        
        <!-- Detailed Asset Breakdown (Mock for Fleet) -->
        <VExpansionPanels class="mt-6 d-print-none">
            <VExpansionPanel>
                <VExpansionPanelTitle>
                    <div class="d-flex align-center">
                        <VIcon icon="tabler-list-details" class="me-2" />
                        <span class="font-weight-bold">รายละเอียด Asset รายชิ้น (Fleet Details)</span>
                    </div>
                </VExpansionPanelTitle>
                <VExpansionPanelText>
                    <VTable density="compact">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Model</th>
                                <th>Serial No.</th>
                                <th class="text-right">Financial</th>
                                <th class="text-right">Maintenance</th>
                                <th class="text-right">Total (Excl)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="i in 3" :key="i">
                                <td>{{ i }}</td>
                                <td>Toyota Camry 2.5 HEV</td>
                                <td>SN-00{{ i }}</td>
                                <td class="text-right">{{ (26166).toLocaleString() }}</td>
                                <td class="text-right">{{ (5865).toLocaleString() }}</td>
                                <td class="text-right font-weight-bold">{{ (32031).toLocaleString() }}</td>
                            </tr>
                        </tbody>
                    </VTable>
                </VExpansionPanelText>
            </VExpansionPanel>
        </VExpansionPanels>
      </VCol>

      <!-- Right: Action Panel -->
      <VCol cols="12" md="4" class="d-print-none">
        <!-- Status Card -->
        <VCard class="mb-6">
            <VCardText>
                <div class="text-subtitle-2 text-medium-emphasis mb-2">STATUS</div>
                <VChip 
                    :color="getStatusColor(invoice.status)" 
                    size="large" 
                    label 
                    class="text-uppercase font-weight-bold w-100 justify-center h-auto py-2 mb-4"
                >
                    {{ invoice.status }}
                </VChip>
                
                <div v-if="invoice.status === 'OVERDUE'" class="text-error d-flex align-center mb-4">
                    <VIcon icon="tabler-alert-triangle" class="me-2" />
                    <span class="font-weight-bold">ค้างชำระมาแล้ว 12 วัน</span>
                </div>

                <VDivider class="mb-4" />
                
                <div class="d-flex justify-space-between mb-2">
                    <span class="text-caption">วันที่ออกใบแจ้งหนี้:</span>
                    <span class="text-body-2 font-weight-medium">{{ invoice.invoiceDate }}</span>
                </div>
                <div class="d-flex justify-space-between">
                    <span class="text-caption">วันครบกำหนด:</span>
                    <span class="text-body-2 font-weight-bold text-error">{{ invoice.dueDate }}</span>
                </div>
            </VCardText>
        </VCard>

        <!-- Payment Info Card -->
        <VCard class="mb-6" :color="invoice.status === 'PAID' ? 'success' : undefined" :variant="invoice.status === 'PAID' ? 'tonal' : 'elevated'">
            <VCardText>
                <div class="text-subtitle-2 mb-4 font-weight-bold">การรับชำระเงิน (PAYMENT)</div>
                
                <div v-if="invoice.status === 'PAID'">
                    <div class="d-flex justify-space-between mb-2">
                        <span class="text-caption">วันที่รับชำระ:</span>
                        <span class="text-body-2 font-weight-bold">{{ invoice.paidDate }}</span>
                    </div>
                    <div class="d-flex justify-space-between mb-2">
                        <span class="text-caption">วิธีชำระ:</span>
                        <span class="text-body-2">{{ invoice.paymentMethod }}</span>
                    </div>
                    <div class="d-flex justify-space-between">
                        <span class="text-caption">ยอดเงิน:</span>
                        <span class="text-h6 font-weight-bold">฿{{ (invoice.paidAmount || 0).toLocaleString() }}</span>
                    </div>
                </div>

                <div v-else>
                    <VBtn color="success" block prepend-icon="tabler-cash" @click="isPaymentDialogOpen = true">
                        บันทึกการรับชำระ
                    </VBtn>
                    <div class="text-caption text-center mt-2">ยอดที่ต้องชำระ: ฿{{ invoice.netPayable?.toLocaleString() }}</div>
                </div>
            </VCardText>
        </VCard>

        <!-- Main Actions Card -->
        <VCard>
            <VCardText>
                <div class="text-subtitle-2 text-medium-emphasis mb-4">ดำเนินการ (ACTIONS)</div>
                <VBtn block variant="tonal" color="primary" class="mb-3" prepend-icon="tabler-printer" @click="printInvoice(invoice.id)">
                    พิมพ์ใบแจ้งหนี้ (PRINT)
                </VBtn>
                <VBtn block variant="tonal" color="info" class="mb-3" prepend-icon="tabler-mail" @click="handleSendEmail">
                    ส่งอีเมลลูกค้า (SEND EMAIL)
                </VBtn>
                <VBtn block variant="tonal" color="success" class="mb-3" prepend-icon="tabler-file-download" @click="exportPdf(invoice.id)">
                    ดาวน์โหลด PDF
                </VBtn>
                
                <VDivider class="my-4" />
                
                <VBtn block variant="text" color="secondary" class="mb-2" prepend-icon="tabler-copy">
                    คัดลอก (Duplicate)
                </VBtn>
                <VBtn block variant="text" color="error" prepend-icon="tabler-trash">
                    ยกเลิกใบแจ้งหนี้ (CANCEL)
                </VBtn>
            </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Payment Confirmation Dialog -->
    <VDialog v-model="isPaymentDialogOpen" max-width="500">
        <VCard title="บันทึกการรับชำระเงิน">
            <VCardText>
                <VRow>
                    <VCol cols="12">
                        <VTextField v-model="paymentForm.date" label="วันที่รับชำระ*" type="date" />
                    </VCol>
                    <VCol cols="12">
                        <VSelect 
                            v-model="paymentForm.method" 
                            label="วิธีการชำระ*" 
                            :items="['Bank Transfer', 'Cheque', 'Direct Debit', 'Cash']" 
                        />
                    </VCol>
                    <VCol cols="12">
                        <VTextField
                            v-model.number="paymentForm.amount"
                            label="ยอดเงินที่ได้รับ*"
                            prefix="฿"
                            type="number"
                        />
                    </VCol>
                    <VCol cols="12">
                        <VTextField
                            v-model="paymentForm.ref"
                            label="เลขที่อ้างอิง / เลขที่เช็ค"
                            placeholder="เช่น เลขที่รายการโอน"
                        />
                    </VCol>
                </VRow>
            </VCardText>
            <VCardActions class="pa-4">
                <VSpacer />
                <VBtn variant="tonal" color="secondary" @click="isPaymentDialogOpen = false">ยกเลิก</VBtn>
                <VBtn color="success" variant="elevated" @click="confirmPayment">ยืนยันรับชำระ</VBtn>
            </VCardActions>
        </VCard>
    </VDialog>
  </div>
</template>

<style scoped>
.v-expansion-panel--active > .v-expansion-panel-title {
    min-height: 48px;
}
</style>
