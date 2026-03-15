<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useProcurementStore } from '@/stores/procurement'
import { ref, computed } from 'vue'

const route = useRoute()
const procStore = useProcurementStore()
const poId = route.params.id as string
const activeTab = ref(0)

const po = computed(() => procStore.getPOById(poId))

const formatCurrency = (val: number) => {
  return (val || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const progress = computed(() => {
  if (!po.value) return 0
  const ordered = po.value.items.reduce((s, i) => s + i.orderedQty, 0)
  const received = po.value.items.reduce((s, i) => s + i.receivedQty, 0)
  return Math.round((received / ordered) * 100)
})
</script>

<template>
  <div v-if="po">
    <VRow>
      <VCol cols="12" class="d-flex justify-space-between align-center mb-4">
        <div>
          <h2 class="text-h4 font-weight-bold">{{ po.poNo }}</h2>
          <span class="text-subtitle-1">Vendor: {{ po.vendorName }}</span>
        </div>
        <div class="d-flex gap-2">
          <VBtn variant="tonal" color="secondary" prepend-icon="tabler-printer">Print PO</VBtn>
          <VBtn color="primary" prepend-icon="tabler-check">Confirm PO</VBtn>
        </div>
      </VCol>

      <VCol cols="12">
        <VTabs v-model="activeTab" color="primary" class="mb-4">
          <VTab>PO Details</VTab>
          <VTab>Delivery Timeline</VTab>
          <VTab>3-Way Match</VTab>
        </VTabs>

        <VWindow v-model="activeTab">
          <!-- Details -->
          <VWindowItem>
            <VRow>
              <VCol cols="12" md="8">
                <VCard title="รายการสั่งซื้อ">
                  <VTable>
                    <thead>
                      <tr>
                        <th>Model</th>
                        <th>Color</th>
                        <th class="text-center">Qty</th>
                        <th class="text-right">Unit Price</th>
                        <th class="text-right">Total</th>
                        <th class="text-center">Received</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in po.items" :key="item.lineNo">
                        <td>{{ item.brand }} {{ item.model }} ({{ item.year }})</td>
                        <td>{{ item.color }}</td>
                        <td class="text-center font-weight-bold">{{ item.orderedQty }}</td>
                        <td class="text-right">{{ formatCurrency(item.unitPrice) }}</td>
                        <td class="text-right font-weight-bold">{{ formatCurrency(item.totalPrice) }}</td>
                        <td class="text-center">
                          <VProgressLinear :model-value="(item.receivedQty / item.orderedQty) * 100" color="success" height="10" rounded />
                          <span class="text-caption">{{ item.receivedQty }} / {{ item.orderedQty }}</span>
                        </td>
                      </tr>
                    </tbody>
                  </VTable>
                  <VDivider />
                  <div class="pa-4 text-right">
                    <div class="text-h6">Total: <span class="text-primary font-weight-bold">{{ formatCurrency(po.total) }}</span></div>
                  </div>
                </VCard>
              </VCol>
              <VCol cols="12" md="4">
                <VCard title="Condition & Delivery">
                  <VCardText>
                    <div class="mb-4">
                      <div class="text-caption text-uppercase">Expected Delivery</div>
                      <div class="font-weight-bold">{{ po.deliveryDate }}</div>
                    </div>
                    <div class="mb-4">
                      <div class="text-caption text-uppercase">Payment Terms</div>
                      <div class="font-weight-bold">{{ po.paymentTerms }}</div>
                    </div>
                    <div class="mb-4">
                      <div class="text-caption text-uppercase">Receiving Progress</div>
                      <div class="d-flex align-center gap-2">
                        <VProgressCircular :model-value="progress" color="success" size="50" width="5">
                          <span class="text-caption">{{ progress }}%</span>
                        </VProgressCircular>
                        <div>รับแล้ว {{ po.items[0].receivedQty }} จาก {{ po.items[0].orderedQty }} คัน</div>
                      </div>
                    </div>
                  </VCardText>
                </VCard>
              </VCol>
            </VRow>
          </VWindowItem>

          <!-- Timeline -->
          <VWindowItem>
            <VCard>
              <VCardText>
                <VTimeline side="end" align="start">
                  <VTimelineItem dot-color="success" icon="tabler-check">
                    <template #opposite>05 Mar 2024</template>
                    <div class="text-h6 font-weight-bold">PO Confirmed</div>
                    <div class="text-caption">By Procurement Team</div>
                  </VTimelineItem>
                  <VTimelineItem dot-color="success" icon="tabler-building-factory">
                    <template #opposite>08 Mar 2024</template>
                    <div class="text-h6 font-weight-bold">Factory Order Placed</div>
                    <div class="text-caption">Order ID: T-123445</div>
                  </VTimelineItem>
                  <VTimelineItem dot-color="info" icon="tabler-car">
                    <template #opposite>Pending</template>
                    <div class="text-h6 font-weight-bold">Production Completed</div>
                    <div class="text-caption">Scheduled: 25 Mar 2024</div>
                  </VTimelineItem>
                  <VTimelineItem dot-color="warning" icon="tabler-ship">
                    <div class="text-h6 font-weight-bold">Shipped / In Transit</div>
                  </VTimelineItem>
                  <VTimelineItem dot-color="secondary" icon="tabler-package-receive">
                    <div class="text-h6 font-weight-bold">Received at Port/Dealer</div>
                  </VTimelineItem>
                </VTimeline>
              </VCardText>
            </VCard>
          </VWindowItem>

          <!-- 3-Way Match -->
          <VWindowItem>
            <VCard title="3-Way Match Verification">
              <VCardText>
                <VRow>
                  <VCol cols="12" md="4">
                    <VAlert color="success" variant="tonal" class="mb-4" icon="tabler-circle-check">
                      <div class="font-weight-bold">PR vs PO</div>
                      Quantities and Specs matched.
                    </VAlert>
                  </VCol>
                  <VCol cols="12" md="4">
                    <VAlert color="warning" variant="tonal" class="mb-4" icon="tabler-alert-triangle">
                      <div class="font-weight-bold">PO vs GR</div>
                      Awaiting goods receipt for 1 item.
                    </VAlert>
                  </VCol>
                  <VCol cols="12" md="4">
                    <VAlert color="secondary" variant="tonal" class="mb-4" icon="tabler-clock">
                      <div class="font-weight-bold">GR vs Invoice</div>
                      Awaiting vendor invoice.
                    </VAlert>
                  </VCol>
                </VRow>
                
                <div class="d-flex justify-center mt-6">
                  <VBtn color="primary" disabled size="large" prepend-icon="tabler-file-check">Approve for AP Payment</VBtn>
                </div>
              </VCardText>
            </VCard>
          </VWindowItem>
        </VWindow>
      </VCol>
    </VRow>
  </div>
</template>
