<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref(0)

const campaigns = [
  { id: 'CMP-001', purpose: 'RENEWAL', channel: 'LINE_OA', sentAt: '2024-03-10', total: 45, opened: 40, clicked: 12, status: 'SENT' },
  { id: 'CMP-002', purpose: 'SURVEY', channel: 'EMAIL', sentAt: '2024-03-12', total: 120, opened: 35, clicked: 8, status: 'SENT' },
  { id: 'CMP-003', purpose: 'PROMO', channel: 'PUSH', sentAt: '2024-03-20', total: 500, opened: 0, clicked: 0, status: 'SCHEDULED' },
]

const templates = [
  { name: 'EV Expansion Promo', channel: 'EMAIL', purpose: 'Marketing', lang: 'TH' },
  { name: 'Lease Expiry Reminder', channel: 'LINE', purpose: 'Renewal', lang: 'TH' },
  { name: 'Overdue Notice (Soft)', channel: 'SMS', purpose: 'Billing', lang: 'EN' },
]
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VTabs v-model="activeTab" color="primary">
        <VTab>Campaigns</VTab>
        <VTab>Message Templates</VTab>
        <VTab>Engagement Analytics</VTab>
        <VTab>Auto-Trigger Rules</VTab>
      </VTabs>

      <VWindow v-model="activeTab" class="mt-4">
        <!-- Campaigns -->
        <VWindowItem>
          <VCard title="Campaign Management">
            <template #append>
              <VBtn color="primary" prepend-icon="tabler-send">Create Campaign</VBtn>
            </template>
            <VTable>
              <thead>
                <tr>
                  <th>Campaign ID</th>
                  <th>Purpose</th>
                  <th>Channel</th>
                  <th>Sent At</th>
                  <th class="text-center">Delivered</th>
                  <th class="text-center">Opened</th>
                  <th class="text-center">Clicked</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="c in campaigns" :key="c.id">
                  <td class="font-weight-bold">{{ c.id }}</td>
                  <td>{{ c.purpose }}</td>
                  <td><VChip size="x-small" variant="tonal">{{ c.channel }}</VChip></td>
                  <td>{{ c.sentAt }}</td>
                  <td class="text-center">{{ c.total }}</td>
                  <td class="text-center text-primary font-weight-bold">{{ c.opened }}</td>
                  <td class="text-center text-success font-weight-bold">{{ c.clicked }}</td>
                  <td>
                    <VChip :color="c.status === 'SENT' ? 'success' : 'primary'" size="x-small" label>{{ c.status }}</VChip>
                  </td>
                </tr>
              </tbody>
            </VTable>
          </VCard>
        </VWindowItem>

        <!-- Templates -->
        <VWindowItem>
          <VRow>
            <VCol v-for="t in templates" :key="t.name" cols="12" md="4">
              <VCard border class="h-100">
                <VCardText>
                  <div class="d-flex justify-space-between mb-2">
                    <VChip size="x-small" color="primary">{{ t.channel }}</VChip>
                    <VChip size="x-small" variant="outlined">{{ t.lang }}</VChip>
                  </div>
                  <div class="text-h6 font-weight-bold mb-1">{{ t.name }}</div>
                  <div class="text-caption mb-4">{{ t.purpose }} Template</div>
                  <VBtn block variant="tonal" size="small" prepend-icon="tabler-eye">Preview Template</VBtn>
                </VCardText>
              </VCard>
            </VCol>
            <VCol cols="12" md="4">
              <VCard border class="h-100 d-flex align-center justify-center border-dashed cursor-pointer">
                 <div class="text-center py-6">
                   <VIcon icon="tabler-plus" size="32" color="secondary" />
                   <div class="text-caption mt-2">New Template</div>
                 </div>
              </VCard>
            </VCol>
          </VRow>
        </VWindowItem>
        
        <!-- Analytics -->
        <VWindowItem>
          <VRow>
             <VCol cols="12" md="8">
               <VCard title="Engagement Trend (30 Days)">
                 <VCardText>
                    <div class="text-center text-secondary py-10 italic">ApexCharts: Open & Click Rate trending...</div>
                 </VCardText>
               </VCard>
             </VCol>
             <VCol cols="12" md="4">
               <VCard title="Performance by Channel">
                 <VCardText>
                    <VList density="compact">
                       <VListItem title="LINE OA" subtitle="Open Rate: 85%" prepend-icon="tabler-brand-line" color="success" />
                       <VListItem title="Email" subtitle="Open Rate: 22%" prepend-icon="tabler-mail" color="info" />
                       <VListItem title="SMS" subtitle="Delivery: 99%" prepend-icon="tabler-device-mobile" color="warning" />
                    </VList>
                 </VCardText>
               </VCard>
             </VCol>
          </VRow>
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
</template>

<style scoped>
.border-dashed { border: 2px dashed rgba(var(--v-theme-on-surface), 0.1); }
</style>
