<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEDocStore } from '@/stores/e-doc'

const eDocStore = useEDocStore()
const contractValue = ref(756000)

const stampDuty = computed(() => {
  return Math.min(Math.ceil(contractValue.value / 1000), 10000)
})

const formatCurrency = (val: number) => {
  return val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>

<template>
  <VRow>
    <VCol cols="12" md="4">
      <VCard title="E-Stamp Calculator">
        <VCardText>
          <VTextField
            v-model.number="contractValue"
            type="number"
            label="Total Contract Value (มูลค่าสัญญา)"
            prefix="฿"
            class="mb-4"
          />
          <VCard variant="tonal" color="primary" class="pa-4 mb-4 text-center">
            <div class="text-subtitle-2 mb-1">Electronic Stamp Duty (อากรแสตมป์)</div>
            <div class="text-h3 font-weight-bold">฿{{ formatCurrency(stampDuty) }}</div>
            <div class="text-caption mt-2">Rate: 1 Baht per 1,000 Baht fraction</div>
          </VCard>
          <VBtn color="primary" block size="large" prepend-icon="tabler-device-floppy">Register E-Stamp (RD)</VBtn>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12" md="8">
      <VCard title="E-Stamp Submission History">
        <VTable>
          <thead>
            <tr>
              <th>Stamp No.</th>
              <th>Contract ID</th>
              <th>Issue Date</th>
              <th class="text-right">Contract Value</th>
              <th class="text-right">Stamp Duty</th>
              <th class="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="st in eDocStore.stampRecords" :key="st.id">
              <td class="font-weight-bold">{{ st.stampNo }}</td>
              <td>{{ st.contractId }}</td>
              <td>{{ st.stampDate }}</td>
              <td class="text-right">{{ formatCurrency(st.contractValue) }}</td>
              <td class="text-right font-weight-bold">{{ formatCurrency(st.stampDuty) }}</td>
              <td class="text-center">
                <VChip color="success" size="x-small" label>{{ st.status }}</VChip>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>
