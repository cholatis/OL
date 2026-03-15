<script setup lang="ts">
import { ref } from 'vue'
import { useFixedAssetsStore } from '@/stores/fixed-assets'

const faStore = useFixedAssetsStore()
const disposalForm = ref({
  assetId: '',
  date: new Date().toISOString().split('T')[0],
  type: 'SALE',
  proceeds: 0,
  remarks: ''
})

const formatCurrency = (val: number) => {
  return (val || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>

<template>
  <VRow>
    <VCol cols="12" md="4">
      <VCard title="FA Disposal Form">
        <VCardText>
          <VSelect
            v-model="disposalForm.assetId"
            :items="faStore.assets"
            item-title="assetName"
            item-value="id"
            label="Select Asset to Dispose"
            class="mb-4"
          />
          <VTextField v-model="disposalForm.date" type="date" label="Disposal Date" class="mb-4" />
          <VSelect
            v-model="disposalForm.type"
            :items="['SALE', 'WRITE_OFF', 'TRANSFER', 'TOTAL_LOSS']"
            label="Disposal Type"
            class="mb-4"
          />
          <VTextField
            v-if="disposalForm.type === 'SALE'"
            v-model.number="disposalForm.proceeds"
            type="number"
            label="Sale Proceeds (ราคาขาย)"
            prefix="฿"
            class="mb-4"
          />
          <VTextarea v-model="disposalForm.remarks" label="Remarks" rows="2" class="mb-4" />
          
          <VBtn color="error" block size="large" prepend-icon="tabler-trash" disabled>Execute Disposal</VBtn>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12" md="8">
      <VCard title="Disposal History">
        <VTable density="compact">
          <thead>
            <tr>
              <th>Date</th>
              <th>Asset</th>
              <th>Type</th>
              <th class="text-right">NBV At Disposal</th>
              <th class="text-right">Proceeds</th>
              <th class="text-right">Gain/Loss</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="faStore.disposals.length === 0">
              <td colspan="7" class="text-center py-8 text-secondary">No disposal records found</td>
            </tr>
            <tr v-for="d in faStore.disposals" :key="d.id">
              <td>{{ d.disposalDate }}</td>
              <td>{{ faStore.assets.find(a => a.id === d.assetId)?.assetCode }}</td>
              <td><VChip size="x-small">{{ d.disposalType }}</VChip></td>
              <td class="text-right">{{ formatCurrency(d.nbvAtDisposal) }}</td>
              <td class="text-right">{{ formatCurrency(d.saleProceeds || 0) }}</td>
              <td class="text-right font-weight-bold" :class="d.gainLossOnDisposal >= 0 ? 'text-success' : 'text-error'">
                {{ formatCurrency(d.gainLossOnDisposal) }}
              </td>
              <td><VChip color="success" size="x-small">POSTED</VChip></td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>
