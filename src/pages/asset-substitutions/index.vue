<script setup lang="ts">
import { useAssetStore } from '@/stores/asset'

const assetStore = useAssetStore()
const router = useRouter()

const selectedStatus = ref('ALL')
const selectedReason = ref('ALL')

const filteredSubs = computed(() => {
  return assetStore.substitutions.filter(s => {
    const matchesStatus = selectedStatus.value === 'ALL' || s.status === selectedStatus.value
    const matchesReason = selectedReason.value === 'ALL' || s.reason === selectedReason.value
    return matchesStatus && matchesReason
  })
})

const getStatusColor = (status: string) => {
  if (status === 'COMPLETED') return 'success'
  if (status === 'APPROVED') return 'primary'
  if (status === 'PENDING') return 'warning'
  return 'secondary'
}

const headers = [
  { title: 'REQ ID', key: 'id' },
  { title: 'CONTRACT / CUSTOMER', key: 'contractNo' },
  { title: 'ORIGINAL ASSET', key: 'originalAssetSerial' },
  { title: 'REPLACEMENT ASSET', key: 'replacementAssetSerial' },
  { title: 'REASON', key: 'reason' },
  { title: 'DATE', key: 'substitutionDate' },
  { title: 'STATUS', key: 'status' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

const navigateToCreate = () => router.push('/asset-substitutions/new')
const navigateToDetail = (id: string) => router.push(`/asset-substitutions/${id}`)
</script>

<template>
  <div>
    <VRow class="mb-6 align-center">
      <VCol cols="12" md="6">
        <h2 class="text-h4 font-weight-bold">การสลับทรัพย์สิน (Substitution)</h2>
      </VCol>
      <VCol cols="12" md="6" class="text-md-right">
        <VBtn color="primary" prepend-icon="tabler-plus" @click="navigateToCreate">
          สร้างคำขอสลับ
        </VBtn>
      </VCol>
    </VRow>

    <VCard class="mb-6">
      <VCardText>
        <VRow>
          <VCol cols="12" md="6">
             <VSelect
              v-model="selectedStatus"
              label="สถานะ"
              :items="['ALL', 'PENDING', 'APPROVED', 'COMPLETED']"
              hide-details
            />
          </VCol>
          <VCol cols="12" md="6">
            <VSelect
              v-model="selectedReason"
              label="เหตุผล"
              :items="['ALL', 'DAMAGED', 'LOST', 'STOLEN', 'UPGRADE']"
              hide-details
            />
          </VCol>
        </VRow>
      </VCardText>

      <VDivider />

      <VDataTable
        :headers="headers"
        :items="filteredSubs"
        class="text-no-wrap"
      >
        <template #[`item.id`]="{ item }">
          <span class="font-weight-medium text-primary cursor-pointer" @click="navigateToDetail(item.id)">
            {{ item.id }}
          </span>
        </template>

        <template #[`item.reason`]="{ item }">
          <VChip variant="tonal" size="x-small" :color="item.reason === 'DAMAGED' ? 'error' : 'secondary'">
            {{ item.reason }}
          </VChip>
        </template>

        <template #[`item.status`]="{ item }">
          <VChip :color="getStatusColor(item.status)" size="small" label elevated>
            {{ item.status }}
          </VChip>
        </template>

        <template #[`item.actions`]="{ item }">
          <div @click.stop>
            <VBtn icon variant="text" size="small" color="medium-emphasis" @click="navigateToDetail(item.id)">
              <VIcon icon="tabler-edit" />
            </VBtn>
            <VBtn v-if="item.status === 'PENDING'" icon variant="text" size="small" color="primary">
              <VIcon icon="tabler-check" title="Approve" @click="assetStore.approveSubstitution(item.id)" />
            </VBtn>
          </div>
        </template>
      </VDataTable>
    </VCard>
  </div>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
