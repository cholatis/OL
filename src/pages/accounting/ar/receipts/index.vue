<script setup lang="ts">
import { ref } from 'vue'

const customers = [
  { id: 'CUST-001', name: 'บริษัท เอบีซี โซลูชั่น จำกัด', total: 144450, overdue: 144450 },
  { id: 'CUST-002', name: 'บริษัท ไทยทรานสปอร์ต จำกัด', total: 96300, overdue: 48150 },
]

const recentReceipts = [
  { id: 'RC-001', no: 'RC-2024-001', date: '2024-03-05', customer: 'บริษัท เอบีซี โซลูชั่น จำกัด', amount: 48150, method: 'TRANSFER', status: 'CONFIRMED' },
  { id: 'RC-002', no: 'RC-2024-002', date: '2024-03-08', customer: 'บริษัท ไทยทรานสปอร์ต จำกัด', amount: 25000, method: 'TRANSFER', status: 'DRAFT' }
]

const headers = [
  { title: 'Receipt No.', key: 'no' },
  { title: 'วันที่ (Date)', key: 'date' },
  { title: 'ลูกค้า (Customer)', key: 'customer' },
  { title: 'ยอดเงิน (Amount)', key: 'amount', align: 'end' },
  { title: 'ช่องทาง', key: 'method' },
  { title: 'สถานะ', key: 'status' },
  { title: 'Action', key: 'actions', sortable: false },
]
</script>

<template>
  <VRow>
    <VCol cols="12" md="8">
      <VCard title="Receipt Register (รายการรับชำระเงิน)">
        <template #append>
          <VBtn prepend-icon="tabler-plus" to="/accounting/ar/receipts/new">ออกใบเสร็จรับเงิน</VBtn>
        </template>
        <VDataTable
          :headers="headers"
          :items="recentReceipts"
          density="compact"
        >
          <template #item.amount="{ value }"> {{ value.toLocaleString() }} ฿ </template>
          <template #item.status="{ value }">
            <VChip :color="value === 'CONFIRMED' ? 'success' : 'warning'" size="x-small">
              {{ value }}
            </VChip>
          </template>
          <template #item.actions="{ item }">
            <VBtn icon="tabler-eye" size="small" variant="text" color="info" />
            <VBtn icon="tabler-printer" size="small" variant="text" />
          </template>
        </VDataTable>
      </VCard>
    </VCol>

    <VCol cols="12" md="4">
      <VCard title="Top Outstanding Accounts">
        <VList density="compact">
          <VListItem v-for="cust in customers" :key="cust.id" class="mb-2 border rounded">
             <VListItemTitle class="font-weight-bold">{{ cust.name }}</VListItemTitle>
             <VListItemSubtitle>Total: {{ cust.total.toLocaleString() }} ฿</VListItemSubtitle>
             <template #append>
                <div class="text-right">
                    <div class="text-error text-caption">Overdue</div>
                    <div class="text-body-2 font-weight-bold">{{ cust.overdue.toLocaleString() }} ฿</div>
                </div>
             </template>
             <VBtn variant="text" size="x-small" color="primary" class="mt-2" :to="`/accounting/ar/soa/${cust.id}`">
                View Statement
             </VBtn>
          </VListItem>
        </VList>
        <VCardText>
            <VBtn block variant="tonal" to="/accounting/ar">View AR Aging Dashboard</VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
