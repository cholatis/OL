<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProcurementStore } from '@/stores/procurement'

const route = useRoute()
const procStore = useProcurementStore()
const prId = route.params.id as string

const pr = computed(() => procStore.getPRById(prId))

const formatCurrency = (val: number) => {
  return (val || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>

<template>
  <div v-if="pr">
    <VRow>
      <VCol cols="12" class="d-flex justify-space-between align-center mb-4">
        <div>
          <h2 class="text-h4 font-weight-bold">{{ pr.prNo }}</h2>
          <span class="text-subtitle-1">Request by: {{ pr.requestedBy }} ({{ pr.department }})</span>
        </div>
        <div class="d-flex gap-2">
          <VBtn variant="tonal" color="secondary" prepend-icon="tabler-edit">แก้ไข PR</VBtn>
          <VBtn color="primary" prepend-icon="tabler-send" v-if="pr.status === 'DRAFT'">ส่งอนุมัติ</VBtn>
          <VBtn color="success" prepend-icon="tabler-shopping-cart" v-if="pr.status === 'APPROVED'">สร้าง PO</VBtn>
        </div>
      </VCol>

      <VCol cols="12" md="8">
        <VCard title="รายละเอียดรายการขอซื้อ">
          <VTable>
            <thead>
              <tr>
                <th>รายการ / สเปค</th>
                <th class="text-center">จำนวน</th>
                <th class="text-right">ราคาต่อหน่วย</th>
                <th class="text-right">รวมประมาณการ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in pr.items" :key="item.lineNo">
                <td>
                  <div class="font-weight-bold">{{ item.brand }} {{ item.model }} ({{ item.year }})</div>
                  <div class="text-caption">{{ item.specification }}</div>
                </td>
                <td class="text-center font-weight-bold">{{ item.quantity }}</td>
                <td class="text-right">{{ formatCurrency(item.estimatedUnitPrice) }}</td>
                <td class="text-right font-weight-bold">{{ formatCurrency(item.estimatedTotal) }}</td>
              </tr>
            </tbody>
          </VTable>
          <VDivider />
          <VCardText>
            <div class="font-weight-bold mb-2 text-uppercase text-caption">วัตถุประสงค์ (Purpose)</div>
            <p>{{ pr.purpose }}</p>
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12" md="4">
        <VCard title="Approval Status">
          <VCardText>
            <VTimeline side="end" align="start" density="compact">
              <VTimelineItem dot-color="success" size="x-small">
                <div class="d-flex justify-space-between mb-1">
                  <span class="font-weight-bold">Requested</span>
                  <span class="text-caption">{{ pr.requestDate }}</span>
                </div>
                <div class="text-body-2">{{ pr.requestedBy }}</div>
              </VTimelineItem>
              <VTimelineItem :dot-color="pr.status === 'APPROVED' ? 'success' : 'secondary'" size="x-small">
                <div class="d-flex justify-space-between mb-1">
                  <span class="font-weight-bold">Manager Approval</span>
                  <span class="text-caption" v-if="pr.approvedDate">{{ pr.approvedDate }}</span>
                </div>
                <div class="text-body-2" v-if="pr.approvedBy">{{ pr.approvedBy }}</div>
                <div class="text-body-2 italic" v-else>Pending...</div>
              </VTimelineItem>
            </VTimeline>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
