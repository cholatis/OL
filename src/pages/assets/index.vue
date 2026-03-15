<script setup lang="ts">
import { useAssetStore } from '@/stores/asset'
import type { AssetStatus } from '@/types/asset'

const assetStore = useAssetStore()
const router = useRouter()

const searchQuery = ref('')
const selectedStatus = ref<AssetStatus | 'ALL'>('ALL')
const selectedCategory = ref('ALL')

const categories = ['ALL', 'CAR', 'COMMERCIAL', 'EQUIPMENT']

const filteredAssets = computed(() => {
  return assetStore.assets.filter(a => {
    const matchesSearch = a.assetCode.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         a.serialNumber.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         a.model.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = selectedStatus.value === 'ALL' || a.status === selectedStatus.value
    const matchesCategory = selectedCategory.value === 'ALL' || a.category === selectedCategory.value
    return matchesSearch && matchesStatus && matchesCategory
  })
})

const getStatusColor = (status: AssetStatus) => {
  const colors: Record<AssetStatus, string> = {
    AVAILABLE: 'success',
    ACTIVE: 'primary',
    MAINTENANCE: 'warning',
    RETURNED: 'secondary',
    DAMAGED: 'error',
    RESERVED: 'info',
    DISPOSED: 'grey-darken-1'
  }
  return colors[status] || 'grey'
}

const headers = [
  { title: 'ASSET CODE / TAG', key: 'assetCode' },
  { title: 'MODEL / BRAND', key: 'model' },
  { title: 'SERIAL NUMBER', key: 'serialNumber' },
  { title: 'CURRENT LESSEE', key: 'currentLesseeName' },
  { title: 'LEASE END', key: 'leaseEndDate' },
  { title: 'STATUS', key: 'status' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(val)
}

const navigateToDetail = (id: string) => router.push(`/assets/${id}`)
</script>

<template>
  <div>
    <VRow class="mb-6 align-center">
      <VCol cols="12" md="6">
        <h2 class="text-h4 font-weight-bold">ทะเบียนทรัพย์สิน</h2>
      </VCol>
      <VCol cols="12" md="6" class="text-md-right">
        <VBtn color="primary" prepend-icon="tabler-plus">
          เพิ่มทรัพย์สิน
        </VBtn>
      </VCol>
    </VRow>

    <!-- Summary Statistics Cards -->
    <VRow class="mb-6">
      <VCol cols="12" sm="6" md="2">
        <VCard color="success" variant="tonal">
          <VCardText class="text-center">
            <div class="text-caption text-uppercase">AVAILABLE</div>
            <div class="text-h4 font-weight-bold">{{ assetStore.availableAssets.length }}</div>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" sm="6" md="2">
        <VCard color="primary" variant="tonal">
          <VCardText class="text-center">
            <div class="text-caption text-uppercase">ACTIVE</div>
            <div class="text-h4 font-weight-bold">{{ assetStore.activeAssets.length }}</div>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" sm="6" md="2">
        <VCard color="warning" variant="tonal">
          <VCardText class="text-center">
            <div class="text-caption text-uppercase">MAINTENANCE</div>
            <div class="text-h4 font-weight-bold">{{ assetStore.maintenanceAssets.length }}</div>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" sm="6" md="2">
        <VCard color="secondary" variant="tonal">
          <VCardText class="text-center">
            <div class="text-caption text-uppercase">RETURNED</div>
            <div class="text-h4 font-weight-bold">{{ assetStore.returnedAssets.length }}</div>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" sm="6" md="2">
        <VCard color="error" variant="tonal">
          <VCardText class="text-center">
            <div class="text-caption text-uppercase">DAMAGED</div>
            <div class="text-h4 font-weight-bold">{{ assetStore.damagedAssets.length }}</div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <VCard class="mb-6">
      <VCardText>
        <VRow>
          <VCol cols="12" md="4">
            <VTextField
              v-model="searchQuery"
              placeholder="Asset Code / Serial / Model..."
              prepend-inner-icon="tabler-search"
              clearable
              hide-details
            />
          </VCol>
          <VCol cols="12" sm="6" md="4">
             <VSelect
              v-model="selectedStatus"
              label="สถานะ"
              :items="['ALL', 'AVAILABLE', 'ACTIVE', 'MAINTENANCE', 'RETURNED', 'DAMAGED']"
              hide-details
            />
          </VCol>
          <VCol cols="12" sm="6" md="4">
            <VSelect
              v-model="selectedCategory"
              label="หมวดหมู่"
              :items="categories"
              hide-details
            />
          </VCol>
        </VRow>
      </VCardText>

      <VDivider />

      <VDataTable
        :headers="headers"
        :items="filteredAssets"
        class="text-no-wrap"
      >
        <template #[`item.assetCode`]="{ item }">
          <div class="d-flex flex-column">
            <span class="font-weight-medium text-primary cursor-pointer" @click="navigateToDetail(item.id)">
              {{ item.assetCode }}
            </span>
            <span class="text-caption">Tag: {{ item.assetTag }}</span>
          </div>
        </template>

        <template #[`item.model`]="{ item }">
          <div class="d-flex flex-column">
            <span class="font-weight-medium">{{ item.brand }} {{ item.model }}</span>
            <span class="text-caption">ปี: {{ item.year }}</span>
          </div>
        </template>

        <template #[`item.currentLesseeName`]="{ item }">
          <span v-if="item.status === 'ACTIVE'" class="text-truncate" style="max-width: 200px;">
            {{ item.currentLesseeName }}
          </span>
          <span v-else class="text-disabled">-</span>
        </template>

        <template #[`item.leaseEndDate`]="{ item }">
          <div v-if="item.status === 'ACTIVE'" class="d-flex align-center">
            <span>{{ item.leaseEndDate }}</span>
            <VIcon
                v-if="new Date(item.leaseEndDate!) < new Date(new Date().setDate(new Date().getDate() + 30))"
                icon="tabler-alert-triangle"
                color="warning"
                size="small"
                class="ms-1"
                title="สัญญาใกล้หมดอายุ"
            />
          </div>
          <span v-else class="text-disabled">-</span>
        </template>

        <template #[`item.status`]="{ item }">
          <VChip :color="getStatusColor(item.status)" size="small" label>
            {{ item.status }}
          </VChip>
        </template>

        <template #[`item.actions`]="{ item }">
          <div @click.stop>
            <VBtn icon variant="text" size="small" color="medium-emphasis" @click="navigateToDetail(item.id)">
              <VIcon icon="tabler-eye" />
            </VBtn>
            <VBtn icon variant="text" size="small" color="medium-emphasis">
              <VIcon icon="tabler-history" title="History" />
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
