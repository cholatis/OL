<script setup lang="ts">
import { ref } from 'vue'
import { useMasterDataStore } from '@/stores/masterData'

const masterDataStore = useMasterDataStore()
const showDialog = ref(false)

const newRate = ref({
    rate: 3.5,
    effectiveFrom: new Date().toISOString().split('T')[0],
    note: ''
})

const postNewRate = () => {
    // Mock archiving old rate
    const current = masterDataStore.baseRates.find(r => !r.effectiveTo)
    if (current) {
        current.effectiveTo = new Date(new Date(newRate.value.effectiveFrom).getTime() - 86400000).toISOString().split('T')[0]
    }
    
    masterDataStore.baseRates.unshift({
        id: `BR-${Date.now()}`,
        rate: newRate.value.rate,
        effectiveFrom: newRate.value.effectiveFrom,
        note: newRate.value.note,
        createdBy: 'Admin'
    })
    
    showDialog.value = false
}
</script>

<template>
  <div>
    <VRow class="mb-6 align-center">
      <VCol cols="12" md="6">
        <h2 class="text-h4 font-weight-bold">Base Interest Rate</h2>
      </VCol>
      <VCol cols="12" md="6" class="text-md-right">
        <VBtn color="primary" prepend-icon="tabler-plus" @click="showDialog = true">
          ประกาศ Rate ใหม่
        </VBtn>
      </VCol>
    </VRow>

    <VRow>
      <VCol cols="12" md="8">
        <VCard>
          <VCardText>
            <div class="text-subtitle-1 mb-6">ประวัติอัตราดอกเบี้ยพื้นฐาน (Interest History)</div>
            
            <VTimeline side="end" density="compact" truncate-line="both">
                <VTimelineItem 
                    v-for="(r, idx) in masterDataStore.baseRates" 
                    :key="r.id" 
                    :dot-color="idx === 0 ? 'success' : 'secondary'"
                    size="small"
                >
                    <div class="d-flex justify-space-between align-center">
                        <div>
                            <span class="text-h4 font-weight-bold">{{ r.rate.toFixed(2) }}%</span>
                            <VChip v-if="idx === 0" size="x-small" color="success" class="ms-2">CURRENT</VChip>
                        </div>
                        <div class="text-right">
                            <div class="font-weight-medium">มีผล: {{ r.effectiveFrom }}</div>
                            <div class="text-caption text-medium-emphasis">สิ้นสุด: {{ r.effectiveTo || 'ปัจจุบัน' }}</div>
                        </div>
                    </div>
                    <div class="text-body-2 mt-1">{{ r.note }}</div>
                </VTimelineItem>
            </VTimeline>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <VDialog v-model="showDialog" max-width="500">
        <VCard title="ประกาศอัตราดอกเบี้ยใหม่">
            <VCardText>
                <VRow>
                    <VCol cols="12">
                        <VTextField v-model.number="newRate.rate" label="Interest Rate (%)" type="number" suffix="%" />
                    </VCol>
                    <VCol cols="12">
                        <VTextField v-model="newRate.effectiveFrom" label="วันที่เริ่มมีผล" type="date" />
                    </VCol>
                    <VCol cols="12">
                        <VTextField v-model="newRate.note" label="หมายเหตุ (เช่น ปรับตาม BOT)" />
                    </VCol>
                </VRow>
            </VCardText>
            <VCardActions>
                <VSpacer />
                <VBtn variant="tonal" color="secondary" @click="showDialog = false">ยกเลิก</VBtn>
                <VBtn color="primary" @click="postNewRate">บันทึกและประกาศใช้</VBtn>
            </VCardActions>
        </VCard>
    </VDialog>
  </div>
</template>
