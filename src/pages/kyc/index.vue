<script setup lang="ts">
import { useCreditStore } from '@/stores/credit'

const creditStore = useCreditStore()

const getStatusColor = (status: string) => {
  switch (status) {
    case 'APPROVED': return 'success'
    case 'PENDING': return 'warning'
    case 'IN_REVIEW': return 'info'
    case 'REJECTED': return 'error'
    default: return 'secondary'
  }
}

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Customer', key: 'customerName' },
  { title: 'Request Date', key: 'requestDate' },
  { title: 'Status', key: 'status' },
  { title: 'Credit Score', key: 'creditScore.internalScore' },
  { title: 'Grade', key: 'creditScore.internalGrade' },
  { title: 'Actions', key: 'actions', sortable: false },
]
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="KYC & Credit Scoring Requests">
        <template #append>
          <VBtn prepend-icon="tabler-plus" to="/kyc/new">
            New KYC Request
          </VBtn>
        </template>

        <VDataTable
          :headers="headers"
          :items="creditStore.kycRequests"
          density="compact"
        >
          <template #item.customerName="{ item }">
            <div class="d-flex flex-column">
              <span class="font-weight-medium text-body-1">{{ item.customerName }}</span>
              <span class="text-caption text-disabled">{{ item.customerId }}</span>
            </div>
          </template>

          <template #item.status="{ item }">
            <VChip :color="getStatusColor(item.status)" size="small">
              {{ item.status }}
            </VChip>
          </template>

          <template #item.creditScore.internalScore="{ item }">
            <VProgressLinear
              :model-value="item.creditScore.internalScore"
              height="8"
              rounded
              color="primary"
              class="mb-1"
            />
            <span class="text-caption">{{ item.creditScore.internalScore }}/100</span>
          </template>

          <template #item.creditScore.internalGrade="{ item }">
            <VAvatar size="28" :color="getStatusColor(item.status)" variant="tonal">
              <span class="text-caption font-weight-bold">{{ item.creditScore.internalGrade }}</span>
            </VAvatar>
          </template>

          <template #item.actions="{ item }">
            <VBtn
              icon="tabler-eye"
              variant="text"
              size="small"
              :to="{ name: 'kyc-id', params: { id: item.id } }"
            />
          </template>
        </VDataTable>
      </VCard>
    </VCol>
  </VRow>
</template>
