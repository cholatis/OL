<script setup lang="ts">
import { ref } from 'vue'
import { useFixedAssetsStore } from '@/stores/fixed-assets'

const faStore = useFixedAssetsStore()
const revalForm = ref({
  assetId: '',
  date: new Date().toISOString().split('T')[0],
  fairValue: 0
})

const formatCurrency = (val: number) => {
  return (val || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>

<template>
  <VRow>
    <VCol cols="12" md="4">
      <VCard title="FA Revaluation Form">
        <VCardText>
          <VSelect
            v-model="revalForm.assetId"
            :items="faStore.assets"
            item-title="assetName"
            item-value="id"
            label="Select Asset"
            class="mb-4"
          />
          <VTextField v-model="revalForm.date" type="date" label="Revaluation Date" class="mb-4" />
          <VTextField
            v-model.number="revalForm.fairValue"
            type="number"
            label="New Fair Value"
            prefix="฿"
            class="mb-4"
          />
          
          <VBtn color="primary" block size="large" prepend-icon="tabler-refresh" disabled>Update Fair Value</VBtn>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12" md="8">
      <VCard title="Revaluation History">
        <VTable density="compact">
          <thead>
            <tr>
              <th>Date</th>
              <th>Asset</th>
              <th class="text-right">Prev NBV</th>
              <th class="text-right">New Fair Value</th>
              <th class="text-right">Increase/Decrease</th>
              <th>Impact</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="faStore.revaluations.length === 0">
              <td colspan="6" class="text-center py-8 text-secondary">No revaluation records found</td>
            </tr>
            <tr v-for="r in faStore.revaluations" :key="r.id">
              <td>{{ r.revaluationDate }}</td>
              <td>{{ faStore.assets.find(a => a.id === r.assetId)?.assetCode }}</td>
              <td class="text-right">{{ formatCurrency(r.previousNBV) }}</td>
              <td class="text-right font-weight-bold">{{ formatCurrency(r.newFairValue) }}</td>
              <td class="text-right" :class="r.increase >= 0 ? 'text-success' : 'text-error'">
                {{ formatCurrency(r.increase) }}
              </td>
              <td>
                <VChip :color="r.increase >= 0 ? 'success' : 'error'" size="x-small" label>
                  {{ r.increase >= 0 ? 'Surplus (OCI)' : 'Impairment (P&L)' }}
                </VChip>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>
