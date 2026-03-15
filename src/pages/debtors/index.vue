<script setup lang="ts">
import { useCreditStore } from '@/stores/credit'

const creditStore = useCreditStore()

const getAgingColor = (status: string) => {
  switch (status) {
    case 'CURRENT': return 'success'
    case 'OVERDUE_1_30': return 'warning'
    case 'OVERDUE_31_60': return 'orange'
    case 'OVERDUE_61_90': return 'error'
    case 'NPL': return 'error'
    case 'LEGAL': return 'deep-purple'
    default: return 'secondary'
  }
}

const headers = [
  { title: 'Customer', key: 'companyName' },
  { title: 'Status', key: 'status' },
  { title: 'Contracts', key: 'activeContracts' },
  { title: 'Outstanding (฿)', key: 'totalOutstanding', align: 'end' },
  { title: 'Overdue (฿)', key: 'overdueAmount', align: 'end' },
  { title: 'Overdue Days', key: 'overdueDays', align: 'end' },
  { title: 'Stage', key: 'collectionStage' },
  { title: 'Actions', key: 'actions', sortable: false },
]

// Aggregate totals
const totals = computed(() => {
  return creditStore.debtors.reduce((acc, curr) => {
    acc.total += curr.totalOutstanding
    acc.overdue += curr.overdueAmount
    return acc
  }, { total: 0, overdue: 0 })
})
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VRow>
        <VCol cols="12" sm="6" md="3">
          <VCard>
            <VCardText class="d-flex align-center gap-4">
              <VAvatar color="primary" variant="tonal" rounded size="42">
                <VIcon icon="tabler-users" />
              </VAvatar>
              <div>
                <div class="text-body-2">Total Debtors</div>
                <div class="text-h6">{{ creditStore.debtors.length }}</div>
              </div>
            </VCardText>
          </VCard>
        </VCol>
        <VCol cols="12" sm="6" md="3">
          <VCard>
            <VCardText class="d-flex align-center gap-4">
              <VAvatar color="info" variant="tonal" rounded size="42">
                <VIcon icon="tabler-currency-baht" />
              </VAvatar>
              <div>
                <div class="text-body-2">Total Outstanding</div>
                <div class="text-h6">{{ totals.total.toLocaleString() }}</div>
              </div>
            </VCardText>
          </VCard>
        </VCol>
        <VCol cols="12" sm="6" md="3">
          <VCard>
            <VCardText class="d-flex align-center gap-4">
              <VAvatar color="warning" variant="tonal" rounded size="42">
                <VIcon icon="tabler-alert-circle" />
              </VAvatar>
              <div>
                <div class="text-body-2">Overdue Amount</div>
                <div class="text-h6 text-warning">{{ totals.overdue.toLocaleString() }}</div>
              </div>
            </VCardText>
          </VCard>
        </VCol>
        <VCol cols="12" sm="6" md="3">
          <VCard>
            <VCardText class="d-flex align-center gap-4">
              <VAvatar color="error" variant="tonal" rounded size="42">
                <VIcon icon="tabler-gavel" />
              </VAvatar>
              <div>
                <div class="text-body-2">Legal/NPL Cases</div>
                <div class="text-h6 text-error">1</div>
              </div>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VCol>

    <VCol cols="12">
      <VCard title="Debtor Aging & Collection Management">
        <template #append>
          <VBtn prepend-icon="tabler-download" variant="outlined" size="small">
            Export CSV
          </VBtn>
        </template>

        <VDataTable
          :headers="headers"
          :items="creditStore.debtors"
          density="compact"
        >
          <template #item.companyName="{ item }">
            <div class="d-flex flex-column">
              <span class="font-weight-medium text-body-1">{{ item.companyName }}</span>
              <span class="text-caption text-disabled">{{ item.customerId }}</span>
            </div>
          </template>

          <template #item.status="{ item }">
            <VChip :color="getAgingColor(item.status)" size="x-small" variant="tonal">
              {{ item.status.replace('_', ' ') }}
            </VChip>
          </template>

          <template #item.totalOutstanding="{ item }">
            {{ item.totalOutstanding.toLocaleString() }} ฿
          </template>

          <template #item.overdueAmount="{ item }">
            <span :class="item.overdueAmount > 0 ? 'text-error font-weight-bold' : ''">
              {{ item.overdueAmount.toLocaleString() }} ฿
            </span>
          </template>

          <template #item.overdueDays="{ item }">
             <span :class="item.overdueDays > 60 ? 'text-error font-weight-bold' : ''">
              {{ item.overdueDays }} วัน
            </span>
          </template>

          <template #item.collectionStage="{ item }">
            <VChip 
              size="x-small" 
              :color="item.collectionStage === 'NORMAL' ? 'success' : 'info'"
              variant="elevated"
            >
              {{ item.collectionStage }}
            </VChip>
          </template>

          <template #item.actions="{ item }">
            <VBtn
              icon="tabler-eye"
              variant="text"
              size="small"
              :to="{ name: 'debtors-id', params: { id: item.customerId } }"
            />
          </template>
        </VDataTable>
      </VCard>
    </VCol>
  </VRow>
</template>

<script lang="ts">
import { computed } from 'vue'
</script>
