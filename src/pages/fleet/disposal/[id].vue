<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useDisposalStore } from '@/stores/disposal'
import { ref, computed } from 'vue'

const route = useRoute()
const disposalStore = useDisposalStore()
const caseId = route.params.id as string
const activeTab = ref(0)

const disposal = computed(() => disposalStore.getCaseById(caseId))

const getTimelineColor = (status: string) => {
  return 'success'
}

const inspectionSections = [
  { 
    title: 'Exterior (ภายนอก)', 
    items: [
      { item: 'Paint Condition', status: 'OK' },
      { item: 'Bumper Front/Rear', status: 'DAMAGE', notes: 'Minor scratch' },
      { item: 'Windshield', status: 'OK' }
    ]
  },
  {
    title: 'Interior (ภายใน)',
    items: [
      { item: 'Seats (Driver)', status: 'OK' },
      { item: 'Dashboard', status: 'OK' },
      { item: 'Air Conditioning', status: 'OK' }
    ]
  }
]
</script>

<template>
  <div v-if="disposal">
    <VRow>
      <VCol cols="12" class="d-flex justify-space-between align-center mb-2">
        <div>
          <h2 class="text-h4 font-weight-bold">{{ disposal.disposalNo }}</h2>
          <span class="text-subtitle-1">{{ disposal.brand }} {{ disposal.model }} ({{ disposal.plateNo }})</span>
        </div>
        <div class="d-flex gap-2">
          <VBtn color="primary" prepend-icon="tabler-check">Update Stage</VBtn>
          <VBtn variant="tonal" color="secondary" prepend-icon="tabler-printer">Print Report</VBtn>
        </div>
      </VCol>

      <VCol cols="12">
        <VTabs v-model="activeTab" color="primary">
          <VTab>Vehicle Info</VTab>
          <VTab>Return Inspection</VTab>
          <VTab>Valuations</VTab>
          <VTab>Sale Process</VTab>
          <VTab>Documents</VTab>
          <VTab>Timeline</VTab>
        </VTabs>

        <VWindow v-model="activeTab" class="mt-4">
          <!-- Info -->
          <VWindowItem>
            <VRow>
              <VCol cols="12" md="8">
                <VCard title="Asset Background">
                  <VCardText>
                    <VRow>
                      <VCol cols="6"><div class="text-caption">Origin Type</div><div class="font-weight-bold">{{ disposal.originType }}</div></VCol>
                      <VCol cols="6"><div class="text-caption">Contract End Date</div><div class="font-weight-bold">{{ disposal.contractEndDate }}</div></VCol>
                      <VCol cols="4"><div class="text-caption">Original Cost</div><div class="font-weight-bold">{{ disposal.originalCost?.toLocaleString() || '1,250,000' }}</div></VCol>
                      <VCol cols="4"><div class="text-caption text-primary">NBV (Asset Exit)</div><div class="text-h6 font-weight-bold text-primary">{{ disposal.nbvAtDisposal.toLocaleString() }}</div></VCol>
                      <VCol cols="4"><div class="text-caption text-info">Contract RV</div><div class="text-h6 font-weight-bold text-info">{{ disposal.contractRV.toLocaleString() }}</div></VCol>
                    </VRow>
                  </VCardText>
                  <VDivider />
                  <VCardText>
                    <VBtn variant="text" color="primary" prepend-icon="tabler-external-link">View Contract: {{ disposal.contractId }}</VBtn>
                  </VCardText>
                </VCard>
              </VCol>
              <VCol cols="12" md="4">
                <VCard title="Quick Actions">
                  <VCardText class="d-flex flex-column gap-2">
                    <VBtn block prepend-icon="tabler-clipboard-check">Record Return</VBtn>
                    <VBtn block variant="outlined" prepend-icon="tabler-cash">Request Valuation</VBtn>
                    <VBtn block variant="outlined" color="error" prepend-icon="tabler-trash">Mark as Scrap</VBtn>
                  </VCardText>
                </VCard>
              </VCol>
            </VRow>
          </VWindowItem>

          <!-- Inspection -->
          <VWindowItem>
            <VRow>
              <VCol cols="12" md="8">
                <VCard v-for="(sec, idx) in inspectionSections" :key="idx" :title="sec.title" class="mb-4">
                  <VTable density="compact">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th class="text-center">Status</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in sec.items" :key="item.item">
                        <td>{{ item.item }}</td>
                        <td class="text-center">
                          <VIcon :icon="item.status === 'OK' ? 'tabler-circle-check' : 'tabler-alert-triangle'" :color="item.status === 'OK' ? 'success' : 'error'" />
                        </td>
                        <td class="text-caption">{{ item.notes || '-' }}</td>
                      </tr>
                    </tbody>
                  </VTable>
                </VCard>
              </VCol>
              <VCol cols="12" md="4">
                <VCard title="Damage Summary">
                  <VCardText>
                    <div class="text-center py-6">
                      <div class="text-h3 font-weight-bold text-error">4,500</div>
                      <div class="text-caption">Total Damage Charges (BHT)</div>
                    </div>
                    <VAlert type="info" variant="tonal" density="compact" class="text-caption">
                      Charges calculated for items exceeding Fair Wear & Tear.
                    </VAlert>
                    <VBtn block color="error" class="mt-4" prepend-icon="tabler-invoice">Charge Customer</VBtn>
                  </VCardText>
                </VCard>
              </VCol>
            </VRow>
          </VWindowItem>

          <!-- Valuations -->
          <VWindowItem>
            <VCard title="Market Valuation Quotes">
              <template #append>
                <VBtn color="primary" size="small" prepend-icon="tabler-plus">Add Quote</VBtn>
              </template>
              <VTable>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Appraiser / Dealer</th>
                    <th>Condition</th>
                    <th class="text-right">Amount</th>
                    <th class="text-center">Approved</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2024-03-05</td>
                    <td>Toyota Sure Ratchada</td>
                    <td><VChip size="x-small" color="success">GOOD</VChip></td>
                    <td class="text-right font-weight-bold">880,000</td>
                    <td class="text-center"><VCheckbox :model-value="true" density="compact" hide-details /></td>
                    <td><VBtn icon size="x-small" variant="text"><VIcon icon="tabler-pencil" /></VBtn></td>
                  </tr>
                  <tr>
                    <td>2024-03-06</td>
                    <td>Perfect Used Cars</td>
                    <td><VChip size="x-small" color="success">EXCELLENT</VChip></td>
                    <td class="text-right font-weight-bold">905,000</td>
                    <td class="text-center"><VCheckbox :model-value="false" density="compact" hide-details /></td>
                    <td><VBtn icon size="x-small" variant="text"><VIcon icon="tabler-pencil" /></VBtn></td>
                  </tr>
                </tbody>
              </VTable>
            </VCard>
          </VWindowItem>
          
          <!-- Timeline -->
          <VWindowItem>
            <VCardText>
               <VTimeline side="end">
                 <VTimelineItem v-for="evt in disposal.timeline" :key="evt.date" dot-color="success" size="small">
                   <div class="d-flex justify-space-between align-center mb-1">
                     <span class="font-weight-bold">{{ evt.event }}</span>
                     <span class="text-caption">{{ evt.date }}</span>
                   </div>
                   <div class="text-body-2">{{ evt.notes }}</div>
                   <div class="text-caption italic">By {{ evt.performedBy }}</div>
                 </VTimelineItem>
               </VTimeline>
            </VCardText>
          </VWindowItem>
        </VWindow>
      </VCol>
    </VRow>
  </div>
</template>
