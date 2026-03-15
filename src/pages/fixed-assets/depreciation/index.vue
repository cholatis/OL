<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFixedAssetsStore } from '@/stores/fixed-assets'

const faStore = useFixedAssetsStore()
const period = ref('2024-03')
const isConfirmOpen = ref(false)

const assetsToDepreciate = computed(() => {
  return faStore.assets.filter(a => a.status === 'ACTIVE' || a.status === 'FULLY_DEPRECIATED')
    .map(a => {
      const monthlyDepr = (a.acquisitionCost - a.residualValue) / (a.usefulLifeYears * 12)
      return {
        ...a,
        monthlyDepr
      }
    })
})

const totalMonthlyDepr = computed(() => {
  return assetsToDepreciate.value.reduce((sum, a) => sum + a.monthlyDepr, 0)
})

const formatCurrency = (val: number) => {
  return (val || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Depreciation Run (ประมวลผลค่าเสื่อมราคา)">
        <VCardText>
          <VRow class="mb-6 align-center">
            <VCol cols="12" md="3">
              <VTextField v-model="period" type="month" label="Processing Period" density="compact" />
            </VCol>
            <VCol cols="12" md="6">
              <VAlert variant="tonal" color="info" density="compact" class="mb-0">
                ประมวลผลค่าเสื่อมราคาสำหรับสินทรัพย์ทั้งหมดที่เป็น Active ณ สิ้นเดือน {{ period }}
              </VAlert>
            </VCol>
            <VCol cols="12" md="3">
              <VBtn color="primary" block size="large" prepend-icon="tabler-player-play-filled" @click="isConfirmOpen = true">
                Run Depreciation
              </VBtn>
            </VCol>
          </VRow>

          <VRow class="mb-6">
            <VCol cols="12" md="4">
              <VCard variant="outlined" class="text-center pa-4">
                <div class="text-caption">Assets in Scope</div>
                <div class="text-h4">{{ assetsToDepreciate.length }}</div>
              </VCard>
            </VCol>
            <VCol cols="12" md="8">
              <VCard variant="outlined" class="text-center pa-4 bg-light-primary border-primary">
                <div class="text-caption font-weight-bold">Total Depreciation Expense for {{ period }}</div>
                <div class="text-h4 text-primary font-weight-bold">{{ formatCurrency(totalMonthlyDepr) }}</div>
              </VCard>
            </VCol>
          </VRow>

          <VTable density="compact" class="border rounded">
            <thead>
              <tr>
                <th>Asset Code</th>
                <th>Asset Name</th>
                <th class="text-right">Acquisition Cost</th>
                <th class="text-right">Current NBV</th>
                <th class="text-right">Monthly Depr</th>
                <th class="text-right">Closing NBV (Est)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="asset in assetsToDepreciate" :key="asset.id">
                <td>{{ asset.assetCode }}</td>
                <td>{{ asset.assetName }}</td>
                <td class="text-right">{{ formatCurrency(asset.acquisitionCost) }}</td>
                <td class="text-right font-weight-bold">{{ formatCurrency(asset.netBookValue) }}</td>
                <td class="text-right text-error">{{ formatCurrency(asset.monthlyDepr) }}</td>
                <td class="text-right">{{ formatCurrency(asset.netBookValue - asset.monthlyDepr) }}</td>
              </tr>
            </tbody>
          </VTable>
        </VCardText>
      </VCard>
    </VCol>

    <!-- Run History -->
    <VCol cols="12">
      <VCard title="Depreciation History">
        <VTable density="compact">
          <thead>
            <tr>
              <th>Period</th>
              <th>Run Date</th>
              <th class="text-right">Total Amount</th>
              <th class="text-center">Status</th>
              <th>Run By</th>
              <th>Journal Entry</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="run in faStore.depreciationRuns" :key="run.period">
              <td>{{ run.period }}</td>
              <td>{{ run.date }}</td>
              <td class="text-right font-weight-bold">{{ formatCurrency(run.totalAmount) }}</td>
              <td class="text-center">
                <VChip color="success" size="x-small" label>{{ run.status }}</VChip>
              </td>
              <td>{{ run.runBy }}</td>
              <td>
                <VBtn variant="text" size="small" color="primary">JE-FA-{{ run.period }}</VBtn>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>

    <!-- Confirm Dialog -->
    <VDialog v-model="isConfirmOpen" max-width="500">
      <VCard title="Confirm Depreciation Run">
        <VCardText>
          คุณแน่ใจหรือไม่ว่าต้องการประมวลผลค่าเสื่อมราคาสำหรับงวด **{{ period }}**?
          <br><br>
          ระบบจะทำการ Post Journal Entry:
          <div class="pa-4 bg-light rounded mt-2 text-caption">
            Dr 5101 ค่าเสื่อมราคา {{ formatCurrency(totalMonthlyDepr) }}<br>
            Cr 1211 ค่าเสื่อมราคาสะสม {{ formatCurrency(totalMonthlyDepr) }}
          </div>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn color="secondary" variant="text" @click="isConfirmOpen = false">ยกเลิก</VBtn>
          <VBtn color="primary" @click="isConfirmOpen = false">ยืนยันการประมวลผล</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VRow>
</template>

<style scoped>
.bg-light-primary { background-color: rgba(var(--v-theme-primary), 0.05); }
.border-primary { border-color: rgb(var(--v-theme-primary)) !important; }
.bg-light { background-color: #f5f5f5; }
</style>
