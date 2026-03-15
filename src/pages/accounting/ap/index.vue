<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAccountingGLStore } from '@/stores/accounting-gl'

const accountingGLStore = useAccountingGLStore()

const search = ref('')
const selectedTab = ref('PENDING')

const vendors = [
  { name: 'บริษัท ยางดี จำกัด', current: 10400, age30: 0, age60: 0, age90: 0, total: 10400 },
  { name: 'วิริยะประกันภัย', current: 0, age30: 8500, age60: 0, age90: 0, total: 8500 },
]

const headers = [
  { title: 'Vendor', key: 'vendorName' },
  { title: 'AP Invoice No.', key: 'apInvoiceNo' },
  { title: 'Date', key: 'invoiceDate' },
  { title: 'Due Date', key: 'dueDate' },
  { title: 'Net Payable', key: 'netPayable', align: 'end' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false },
]

const formatCurrency = (val: number) => {
  return val.toLocaleString(undefined, { minimumFractionDigits: 2 })
}
</script>

<template>
  <VRow>
    <!-- Aging Summary Chips -->
    <VCol cols="12">
        <VRow>
            <VCol v-for="age in ['Current', '1-30 Days', '31-60 Days', 'Over 60 Days']" :key="age" cols="12" md="3">
                <VCard variant="tonal" :color="age.includes('Over') ? 'error' : 'primary'">
                    <VCardText class="d-flex align-center gap-4">
                        <VAvatar :color="age.includes('Over') ? 'error' : 'primary'" variant="elevated" size="38">
                            <VIcon icon="tabler-calendar-due" size="20" />
                        </VAvatar>
                        <div>
                            <div class="text-caption">{{ age }}</div>
                            <div class="text-h6">{{ age === 'Current' ? '10,400.00' : age.includes('1-30') ? '8,500.00' : '0.00' }} ฿</div>
                        </div>
                    </VCardText>
                </VCard>
            </VCol>
        </VRow>
    </VCol>

    <VCol cols="12" md="9">
      <VCard title="Accounts Payable (AP) Dashboard">
        <template #append>
            <VBtn prepend-icon="tabler-plus" color="primary" class="me-2">Create AP Invoice</VBtn>
            <VBtn prepend-icon="tabler-file-report" variant="tonal">Aging Report</VBtn>
        </template>
        
        <VTabs v-model="selectedTab">
            <VTab value="PENDING">Pending ({{ accountingGLStore.apInvoices.length }})</VTab>
            <VTab value="PAID">Paid</VTab>
            <VTab value="ALL">All AP</VTab>
        </VTabs>

        <VCardText>
            <VDataTable
              :headers="headers"
              :items="accountingGLStore.apInvoices"
              :search="search"
              density="compact"
            >
                <template #item.netPayable="{ value }">
                    <span class="font-weight-bold">{{ formatCurrency(value) }} ฿</span>
                </template>

                <template #item.status="{ value }">
                    <VChip :color="value === 'PAID' ? 'success' : 'warning'" size="x-small">
                        {{ value }}
                    </VChip>
                </template>

                <template #item.actions="{ item }">
                    <VBtn icon="tabler-cash" size="small" variant="text" color="success" title="Pay Vendor" />
                    <VBtn icon="tabler-eye" size="small" variant="text" color="info" />
                </template>
            </VDataTable>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12" md="3">
         <VCard title="Vendor Aging Matrix">
             <VCardText>
                 <VList>
                     <VListItem v-for="v in vendors" :key="v.name" class="border-b mb-2">
                         <VListItemTitle class="font-weight-bold text-body-2">{{ v.name }}</VListItemTitle>
                         <div class="d-flex justify-space-between text-caption mt-1">
                             <span>Current:</span>
                             <span class="font-weight-bold">{{ formatCurrency(v.current) }}</span>
                         </div>
                         <div class="d-flex justify-space-between text-caption text-error">
                             <span>Overdue:</span>
                             <span class="font-weight-bold">{{ formatCurrency(v.total - v.current) }}</span>
                         </div>
                     </VListItem>
                 </VList>
                 <VBtn block color="secondary" variant="tonal" class="mt-4">Manage Vendors</VBtn>
             </VCardText>
         </VCard>
    </VCol>
  </VRow>
</template>
