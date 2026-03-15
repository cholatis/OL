<script setup lang="ts">
import { useSalesStore } from '@/stores/sales'
import { computed } from 'vue'

const salesStore = useSalesStore()

const kpiRow = [
  { title: 'Activities Today', value: '12', color: 'primary', icon: 'tabler-calendar-stats' },
  { title: 'Follow-ups Pending', value: '5', color: 'warning', icon: 'tabler-clock-pause' },
  { title: 'Overdue Follow-ups', value: '1', color: 'error', icon: 'tabler-alert-triangle' },
  { title: 'Meetings this Week', value: '8', color: 'info', icon: 'tabler-users' },
]

const getOutcomeIcon = (outcome: string) => {
  if (outcome === 'POSITIVE') return 'tabler-thumb-up'
  if (outcome === 'NEGATIVE') return 'tabler-thumb-down'
  return 'tabler-minus'
}
</script>

<template>
  <VRow>
    <VCol v-for="kpi in kpiRow" :key="kpi.title" cols="12" sm="6" md="3">
      <VCard>
        <VCardText class="d-flex align-center">
          <VAvatar :color="kpi.color" variant="tonal" rounded size="42" class="me-4">
            <VIcon :icon="kpi.icon" />
          </VAvatar>
          <div>
            <div class="text-h6 font-weight-bold">{{ kpi.value }}</div>
            <div class="text-caption">{{ kpi.title }}</div>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard title="Sales Activity Log">
        <template #append>
           <VBtn color="primary" prepend-icon="tabler-plus">New Activity</VBtn>
        </template>
        
        <VCardText class="d-flex flex-wrap gap-4">
          <div style="width: 250px"><VTextField label="Search Customer / Subject" density="compact" prepend-inner-icon="tabler-search" hide-details /></div>
          <VSelect label="Type" :items="['All', 'Call', 'Meeting', 'Email', 'Proposal']" density="compact" style="width: 150px" hide-details />
          <VSelect label="Outcome" :items="['All', 'Positive', 'Neutral', 'Negative']" density="compact" style="width: 150px" hide-details />
          <VSpacer />
          <VBtn variant="tonal" color="secondary" prepend-icon="tabler-file-download">Export Excel</VBtn>
        </VCardText>

        <VDivider />

        <VTable hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Salesperson</th>
              <th>Customer / Opportunity</th>
              <th>Type</th>
              <th>Subject</th>
              <th>Outcome</th>
              <th>Next Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="act in salesStore.activities" :key="act.activityId">
              <td>{{ new Date(act.createdAt).toLocaleDateString() }}</td>
              <td>{{ act.salesperson }}</td>
              <td class="font-weight-bold">
                <div class="text-primary">{{ salesStore.getOpportunityById(act.opportunityId!)?.prospectName || 'Opportunity ' + act.opportunityId }}</div>
              </td>
              <td><VChip size="x-small" label>{{ act.type }}</VChip></td>
              <td>{{ act.subject }}</td>
              <td class="text-center">
                <VIcon :icon="getOutcomeIcon(act.outcome)" :color="act.outcome === 'POSITIVE' ? 'success' : (act.outcome === 'NEGATIVE' ? 'error' : 'secondary')" size="18" />
              </td>
              <td>
                <div v-if="act.nextAction" class="text-caption text-warning font-weight-bold">{{ act.nextAction }}</div>
                <div v-if="act.nextActionDate" class="text-caption italic">{{ act.nextActionDate }}</div>
              </td>
              <td>
                <VBtn icon size="x-small" variant="text" color="primary"><VIcon icon="tabler-eye" /></VBtn>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>
