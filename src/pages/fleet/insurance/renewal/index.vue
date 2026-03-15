<script setup lang="ts">
import { ref } from 'vue'

const renewals = [
  { month: 'March 2024', count: 12, value: 250000, color: 'error' },
  { month: 'April 2024', count: 25, value: 520000, color: 'warning' },
  { month: 'May 2024', count: 18, value: 380000, color: 'info' },
]
</script>

<template>
  <VRow>
    <VCol cols="12">
      <h2 class="text-h4 font-weight-bold mb-4">Dashboard ต่ออายุประกันภัย (Renewal Dashboard)</h2>
    </VCol>

    <VCol v-for="r in renewals" :key="r.month" cols="12" md="4">
      <VCard :border="`top ${r.color} 4px` shadow">
        <VCardText>
          <div class="text-h6 font-weight-bold mb-2">{{ r.month }}</div>
          <div class="d-flex justify-space-between align-center">
            <div>
              <div class="text-h4 font-weight-bold">{{ r.count }} <span class="text-subtitle-2">คัน</span></div>
              <div class="text-caption">รอต่ออายุ</div>
            </div>
            <div class="text-right">
              <div class="text-h6 font-weight-bold text-primary">{{ r.value.toLocaleString() }}</div>
              <div class="text-caption">เบี้ยประมาณการ</div>
            </div>
          </div>
          <VBtn block color="primary" variant="tonal" class="mt-4" prepend-icon="tabler-file-invoice">สร้างใบสั่งซื้อประกัน</VBtn>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12" md="8">
      <VCard title="Calendar View">
        <VCardText class="text-center py-10 bg-light rounded border-dashed">
          <VIcon icon="tabler-calendar" size="64" color="secondary" class="mb-2" />
          <div class="text-h6 text-secondary">Renewal Calendar Coming Soon</div>
          <p class="text-caption mt-2">View all expiring policies in monthly calendar view</p>
        </VCardText>
      </VCard>
    </VCol>
    
    <VCol cols="12" md="4">
      <VCard title="Renewal Statistics">
        <VCardText>
          <div class="mb-4">
             <div class="d-flex justify-space-between mb-1">
               <span>ต่ออายุแล้ว</span>
               <span>75%</span>
             </div>
             <VProgressLinear model-value="75" color="success" height="10" rounded />
          </div>
          <div class="mb-4">
             <div class="d-flex justify-space-between mb-1">
               <span>อยู่ระหว่างพิจารณาเบี้ย</span>
               <span>15%</span>
             </div>
             <VProgressLinear model-value="15" color="info" height="10" rounded />
          </div>
          <div class="mb-4">
             <div class="d-flex justify-space-between mb-1">
               <span>ยังไม่ได้ดำเนินการ</span>
               <span>10%</span>
             </div>
             <VProgressLinear model-value="10" color="error" height="10" rounded />
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped>
.border-dashed { border: 2px dashed rgba(var(--v-theme-on-surface), 0.1); }
</style>
