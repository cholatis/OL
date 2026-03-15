<script setup lang="ts">
import { ref } from 'vue'

const quote = ref({
  appraiser: 'Dealer A',
  amount: 0,
  condition: 'GOOD',
  mileage: 45000,
  notes: ''
})
</script>

<template>
  <VRow>
    <VCol cols="12" md="6" class="mx-auto">
      <VCard title="บันทึกราคาประเมิน (Asset Valuation)">
        <VCardText>
          <VRow>
            <VCol cols="12">
              <VSelect v-model="quote.appraiser" label="ผู้ประเมิน / Appraiser" :items="['Dealer A', 'Dealer B', 'Internal', 'External Expert']" />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="quote.amount" label="ราคาที่ประเมิน (BHT)" type="number" prepend-inner-icon="tabler-cash" />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="quote.mileage" label="เลขไมล์ล่าสุด (km)" type="number" prepend-inner-icon="tabler-gauge" />
            </VCol>
            <VCol cols="12">
              <VSelect v-model="quote.condition" label="สภาพรถโดยรวม" :items="['EXCELLENT', 'GOOD', 'FAIR', 'POOR']" />
            </VCol>
            <VCol cols="12">
              <VTextarea v-model="quote.notes" label="หมายเหตุ / รายละเอียดความเสียหาย" rows="3" />
            </VCol>
            <VCol cols="12">
              <div class="text-subtitle-2 mb-2">อัปโหลดใบเสนอราคา / รูปถ่าย</div>
              <VCard variant="tonal" class="pa-10 text-center border-dashed">
                <VIcon icon="tabler-upload" size="32" class="mb-2" />
                <div>Click or Drag files to upload</div>
              </VCard>
            </VCol>
          </VRow>
        </VCardText>
        <VDivider />
        <VCardActions>
          <VSpacer />
          <VBtn color="secondary" variant="tonal">Cancel</VBtn>
          <VBtn color="primary">Save Valuation</VBtn>
        </VCardActions>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped>
.border-dashed { border: 2px dashed rgba(var(--v-theme-on-surface), 0.1); }
</style>
