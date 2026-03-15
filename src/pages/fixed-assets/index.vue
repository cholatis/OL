<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFixedAssetsStore } from '@/stores/fixed-assets'

const faStore = useFixedAssetsStore()

const search = ref('')
const filterStatus = ref('ALL')
const filterCategory = ref('ALL')

const kpiCards = computed(() => [
  { title: 'จำนวน FA ทั้งหมด', value: faStore.assets.length, icon: 'tabler-list', color: 'primary' },
  { title: 'มูลค่าทุนรวม', value: faStore.totalAcquisitionCost, icon: 'tabler-currency-dollar', color: 'success', isCurrency: true },
  { title: 'NBV รวม', value: faStore.totalNBV, icon: 'tabler-chart-pie', color: 'info', isCurrency: true },
  { title: 'ค่าเสื่อมสะสม', value: faStore.totalAccumulatedDepr, icon: 'tabler-trending-down', color: 'error', isCurrency: true },
])

const filteredAssets = computed(() => {
  return faStore.assets.filter(asset => {
    const assetName = asset.assetName || ''
    const assetCode = asset.assetCode || ''
    const searchTerm = search.value.toLowerCase()
    
    const matchesSearch = assetName.toLowerCase().includes(searchTerm) || 
                         assetCode.toLowerCase().includes(searchTerm)
    const matchesStatus = filterStatus.value === 'ALL' || asset.status === filterStatus.value
    const matchesCategory = filterCategory.value === 'ALL' || asset.category === filterCategory.value
    return matchesSearch && matchesStatus && matchesCategory
  })
})

const formatCurrency = (val: number) => {
  return (val || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'ACTIVE': return 'success'
    case 'FULLY_DEPRECIATED': return 'warning'
    case 'DISPOSED': return 'error'
    case 'IMPAIRED': return 'secondary'
    default: return 'primary'
  }
}
</script>

<template>
  <VRow>
    <!-- KPI Cards -->
    <VCol v-for="card in kpiCards" :key="card.title" cols="12" sm="6" md="3">
      <VCard>
        <VCardText class="d-flex align-center">
          <VAvatar :color="card.color" variant="tonal" rounded size="42" class="me-3">
            <VIcon :icon="card.icon" />
          </VAvatar>
          <div>
            <div class="text-caption">{{ card.title }}</div>
            <div class="text-h6">
              {{ card.isCurrency ? formatCurrency(card.value) : card.value }}
            </div>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <!-- Filters -->
    <VCol cols="12">
      <VCard title="ทะเบียนสินทรัพย์ถาวร (Fixed Asset Register)">
        <VCardText>
          <VRow class="mb-4">
            <VCol cols="12" md="4">
              <VTextField v-model="search" label="ค้นหา Asset Code / ชื่อ" prepend-inner-icon="tabler-search" density="compact" hide-details />
            </VCol>
            <VCol cols="12" md="3">
              <VSelect
                v-model="filterCategory"
                :items="['ALL', 'VEHICLE_PASSENGER', 'VEHICLE_COMMERCIAL', 'MACHINERY', 'EQUIPMENT', 'IT_EQUIPMENT']"
                label="Category"
                density="compact"
                hide-details
              />
            </VCol>
            <VCol cols="12" md="3">
              <VSelect
                v-model="filterStatus"
                :items="['ALL', 'ACTIVE', 'FULLY_DEPRECIATED', 'DISPOSED', 'IMPAIRED']"
                label="Status"
                density="compact"
                hide-details
              />
            </VCol>
            <VCol cols="12" md="2" class="d-flex align-center">
              <VBtn color="primary" block prepend-icon="tabler-plus" disabled>Add Asset</VBtn>
            </VCol>
          </VRow>

          <VTable density="compact" class="border rounded">
            <thead>
              <tr>
                <th>Asset Code</th>
                <th>Asset Name</th>
                <th>Category</th>
                <th class="text-right">Acquisition Cost</th>
                <th class="text-right">NBV</th>
                <th class="text-right">Depr %</th>
                <th class="text-center">Status</th>
                <th class="text-center">On-Lease</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="asset in filteredAssets" :key="asset.id">
                <td>
                  <router-link :to="`/fixed-assets/${asset.id}`" class="text-primary font-weight-bold text-decoration-none">
                    {{ asset.assetCode }}
                  </router-link>
                </td>
                <td class="text-no-wrap">{{ asset.assetName }}</td>
                <td><VChip size="x-small" label>{{ asset.category }}</VChip></td>
                <td class="text-right text-no-wrap">{{ formatCurrency(asset.acquisitionCost) }}</td>
                <td class="text-right font-weight-bold text-no-wrap">{{ formatCurrency(asset.netBookValue) }}</td>
                <td class="text-right">{{ asset.depreciationRate }}%</td>
                <td class="text-center">
                  <VChip :color="getStatusColor(asset.status)" size="x-small" label>
                    {{ asset.status }}
                  </VChip>
                </td>
                <td class="text-center">
                  <VIcon v-if="asset.currentLeaseContractId" icon="tabler-check" color="success" size="18" />
                  <VIcon v-else icon="tabler-x" color="error" size="18" />
                </td>
                <td>
                   <VBtn icon="tabler-dots-vertical" variant="text" size="small" />
                </td>
              </tr>
            </tbody>
          </VTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
