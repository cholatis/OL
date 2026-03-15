<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAccountingGLStore } from '@/stores/accounting-gl'

const accountingGLStore = useAccountingGLStore()

const step = ref(1)
const selectedCustomer = ref('CUST-001')
const selectedInvoices = ref<string[]>([])

// Mock invoices
const invoices = [
  { id: 'INV-001', no: 'IV-2024-001', date: '2024-01-01', amount: 48150, outstanding: 48150, overdue: 65 },
  { id: 'INV-002', no: 'IV-2024-045', date: '2024-02-01', amount: 48150, outstanding: 48150, overdue: 34 },
  { id: 'INV-003', no: 'IV-2024-089', date: '2024-03-01', amount: 48150, outstanding: 48150, overdue: 5 }
]

const receiptForm = ref({
  date: new Date().toISOString().split('T')[0],
  method: 'TRANSFER',
  refNo: '',
  bankAccount: 'SCB-Main-889',
  whtDeducted: false,
  whtAmount: 0,
  totalReceived: 0
})

const totalOutstanding = computed(() => 
  invoices.filter(inv => selectedInvoices.value.includes(inv.id))
         .reduce((sum, inv) => sum + inv.outstanding, 0)
)

const netReceived = computed(() => totalOutstanding.value - (receiptForm.value.whtDeducted ? receiptForm.value.whtAmount : 0))

const headers = [
  { title: 'Invoice No.', key: 'no' },
  { title: 'Date', key: 'date' },
  { title: 'Amount', key: 'amount', align: 'end' },
  { title: 'Outstanding', key: 'outstanding', align: 'end' },
  { title: 'Overdue (Days)', key: 'overdue', align: 'end' },
]
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Record Customer Payment (Receipting)">
        <VCardText>
          <VStepper v-model="step">
            <template #default="{ prev, next }">
              <VStepperHeader>
                <VStepperItem :value="1" title="Select Invoices" :complete="step > 1" />
                <VDivider />
                <VStepperItem :value="2" title="Payment Method" :complete="step > 2" />
                <VDivider />
                <VStepperItem :value="3" title="Confirm Receipt" />
              </VStepperHeader>

              <VStepperWindow>
                <VStepperWindowItem :value="1">
                  <VRow class="mb-4">
                    <VCol cols="12" md="4">
                       <VAutocomplete
                        v-model="selectedCustomer"
                        label="เลือกกาลูกค้า (Customer)"
                        :items="['บริษัท เอบีซี จำกัด', 'บริษัท เอ็กซ์วายแซด']"
                        density="compact"
                      />
                    </VCol>
                  </VRow>

                  <VDataTable
                    v-model="selectedInvoices"
                    :headers="headers"
                    :items="invoices"
                    show-select
                    item-value="id"
                    density="compact"
                    class="border rounded mb-6"
                  >
                    <template #item.amount="{ value }"> {{ value.toLocaleString() }} ฿ </template>
                    <template #item.outstanding="{ value }"> {{ value.toLocaleString() }} ฿ </template>
                    <template #item.overdue="{ value }">
                        <VChip :color="value > 60 ? 'error' : value > 30 ? 'warning' : 'success'" size="x-small">
                            {{ value }} Days
                        </VChip>
                    </template>
                  </VDataTable>

                  <div class="d-flex justify-end gap-2">
                     <VBtn color="primary" @click="next" :disabled="selectedInvoices.length === 0">
                        Continue to Payment ({{ totalOutstanding.toLocaleString() }} ฿)
                     </VBtn>
                  </div>
                </VStepperWindowItem>

                <VStepperWindowItem :value="2">
                   <VRow>
                    <VCol cols="12" md="4">
                        <VTextField v-model="receiptForm.date" type="date" label="Payment Date" />
                    </VCol>
                    <VCol cols="12" md="4">
                        <VSelect v-model="receiptForm.method" :items="['TRANSFER', 'CHEQUE', 'PROMPTPAY']" label="Payment Method" />
                    </VCol>
                    <VCol cols="12" md="4">
                        <VTextField v-model="receiptForm.refNo" label="Reference No. / Bank Ref" />
                    </VCol>
                    <VCol cols="12">
                         <VCard variant="tonal" color="info" class="pa-4">
                            <VCheckbox v-model="receiptForm.whtDeducted" label="Customer deducted Withholding Tax (WHT)" hide-details />
                            <VTextField v-if="receiptForm.whtDeducted" v-model.number="receiptForm.whtAmount" label="WHT Amount (Thai Baht)" prefix="฿" class="mt-4" />
                         </VCard>
                    </VCol>
                   </VRow>
                   <div class="d-flex justify-end gap-2 mt-6">
                      <VBtn variant="tonal" @click="prev">Back</VBtn>
                      <VBtn color="primary" @click="next">Preview Receipt</VBtn>
                   </div>
                </VStepperWindowItem>

                <VStepperWindowItem :value="3">
                   <div class="text-center py-6">
                      <VAvatar color="success" size="72" variant="tonal" class="mb-4">
                        <VIcon icon="tabler-check" size="42" />
                      </VAvatar>
                      <h4 class="text-h4 mb-2">Review Receipt</h4>
                      <p class="text-body-1 opacity-75">Confirming payment of {{ totalOutstanding.toLocaleString() }} ฿ from บริษัท เอบีซี จำกัด</p>
                   </div>

                   <VCard variant="outlined" class="mb-6">
                      <VList density="compact">
                        <VListItem title="Amount to Clear" :subtitle="`${totalOutstanding.toLocaleString()} ฿`" />
                        <VListItem v-if="receiptForm.whtDeducted" title="Less WHT (Deducted by Customer)" :subtitle="`-${receiptForm.whtAmount.toLocaleString()} ฿`" class="text-error" />
                        <VDivider />
                        <VListItem class="bg-light-success py-2">
                           <template #prepend><strong>Total Net Received:</strong></template>
                           <template #append><span class="text-h6 text-success">{{ netReceived.toLocaleString() }} ฿</span></template>
                        </VListItem>
                      </VList>
                   </VCard>

                   <div class="d-flex justify-end gap-2">
                      <VBtn variant="tonal" @click="prev">Change Details</VBtn>
                      <VBtn color="success" block class="mt-4" x-large>Generate RC-2024-XXXX & Post JE</VBtn>
                   </div>
                </VStepperWindowItem>
              </VStepperWindow>
            </template>
          </VStepper>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped>
.bg-light-success { background-color: rgba(var(--v-theme-success), 0.1); }
</style>
