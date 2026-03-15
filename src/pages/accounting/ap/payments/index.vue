<script setup lang="ts">
import { ref } from 'vue'

const payments = [
  { id: 'PV-001', no: 'PV-2024-001', date: '2024-03-05', vendor: 'บริษัท ยางดี จำกัด', amount: 10400, method: 'BANK_TRANSFER', status: 'PAID' },
  { id: 'PV-002', no: 'PV-2024-002', date: '2024-03-10', vendor: 'วิริยะประกันภัย', amount: 8500, method: 'CHEQUE', status: 'DRAFT' }
]

const headers = [
  { title: 'PV No.', key: 'no' },
  { title: 'Date', key: 'date' },
  { title: 'Vendor', key: 'vendor' },
  { title: 'Amount', key: 'amount', align: 'end' },
  { title: 'Method', key: 'method' },
  { title: 'Status', key: 'status' },
  { title: 'Action', key: 'actions', sortable: false },
]
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Vendor Payments (ระเบียนการจ่ายเงิน)">
        <template #append>
          <VBtn prepend-icon="tabler-plus" color="primary">ทำรายการจ่าย (Payment Voucher)</VBtn>
        </template>
        <VDataTable
          :headers="headers"
          :items="payments"
          density="compact"
        >
          <template #item.amount="{ value }"> {{ value.toLocaleString() }} ฿ </template>
          <template #item.status="{ value }">
            <VChip :color="value === 'PAID' ? 'success' : 'warning'" size="x-small">
              {{ value }}
            </VChip>
          </template>
          <template #item.actions>
            <VBtn icon="tabler-eye" size="small" variant="text" color="info" />
            <VBtn icon="tabler-printer" size="small" variant="text" />
          </template>
        </VDataTable>
      </VCard>
    </VCol>
  </VRow>
</template>
