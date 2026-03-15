<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMasterDataStore } from '@/stores/masterData'

const masterDataStore = useMasterDataStore()
const selectedCategory = ref('SEDAN')

const terms = [24, 36, 48, 60]

// Get unique list of models for selected category
const models = computed(() => {
    const list = masterDataStore.rvTable
        .filter(r => r.vehicleCategory === selectedCategory.value)
        .map(r => r.brandModel)
    return [...new Set(list)].sort((a,b) => a === '*' ? -1 : a.localeCompare(b))
})

const getRVValue = (model: string, term: number) => {
    return masterDataStore.rvTable.find(r => 
        r.vehicleCategory === selectedCategory.value && 
        r.brandModel === model && 
        r.termMonths === term
    )
}

const updateRV = (model: string, term: number, val: string) => {
    const num = parseFloat(val)
    if (isNaN(num)) return
    
    const entry = getRVValue(model, term)
    if (entry) entry.rvPercent = num
}
</script>

<template>
  <div>
    <VRow class="mb-6 align-center">
      <VCol cols="12" md="6">
        <h2 class="text-h4 font-weight-bold">RV Table (Residual Value)</h2>
        <p class="text-body-1 opacity-70">กำหนดราคาซาก (%) เมื่อสิ้นสุดสัญญา แยกตามรุ่นและระยะเวลา</p>
      </VCol>
      <VCol cols="12" md="6" class="text-md-right">
        <VBtn color="success" prepend-icon="tabler-file-download">Import Matrix</VBtn>
      </VCol>
    </VRow>

    <VCard>
      <VCardText>
        <VRow class="mb-6">
            <VCol cols="12" md="4">
                <VSelect v-model="selectedCategory" label="Vehicle Category" :items="['SEDAN', 'SUV', 'ECO_CAR', 'PICKUP']" />
            </VCol>
        </VRow>

        <VTable border>
            <thead class="bg-light">
                <tr>
                    <th class="font-weight-bold">Brand / Model</th>
                    <th v-for="t in terms" :key="t" width="120" class="text-center">{{ t }}M (%)</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="model in models" :key="model" :class="{ 'bg-light-primary font-weight-bold': model === '*' }">
                    <td class="ps-4">
                        {{ model === '*' ? `* ${selectedCategory} (Default)` : model }}
                    </td>
                    <td v-for="t in terms" :key="t">
                        <VTextField 
                            :model-value="getRVValue(model, t)?.rvPercent" 
                            @update:model-value="val => updateRV(model, t, val)"
                            density="compact" 
                            hide-details 
                            type="number"
                            suffix="%"
                            variant="plain"
                            class="text-center-input"
                        />
                    </td>
                </tr>
            </tbody>
        </VTable>
      </VCardText>
    </VCard>
  </div>
</template>

<style>
.text-center-input input {
    text-align: center !important;
}
.bg-light-primary {
    background-color: rgba(var(--v-theme-primary), 0.05) !important;
}
</style>
