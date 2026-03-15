<script setup lang="ts">
import { useCRMStore } from '@/stores/crm'

const crmStore = useCRMStore()

const kpiCards = [
  { title: 'Interactions Today', value: '24', color: 'primary', icon: 'tabler-calendar-stats' },
  { title: 'Wait for Follow-up', value: '8', color: 'warning', icon: 'tabler-clock-pause' },
  { title: 'Overdue Follow-up', value: '2', color: 'error', icon: 'tabler-alert-triangle' },
  { title: 'Meetings this Week', value: '15', color: 'info', icon: 'tabler-users' },
]

const getStatusColor = (outcome: string) => {
  if (outcome?.includes('Resolved')) return 'success'
  if (outcome?.includes('Follow-up')) return 'warning'
  return 'secondary'
}
</script>

<template>
  <VRow>
    <VCol v-for="kpi in kpiCards" :key="kpi.title" cols="12" sm="6" md="3">
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
      <VCard title="ประวัติการติดต่อ (Interaction Log)">
        <template #append>
           <VBtn color="primary" prepend-icon="tabler-plus">New Interaction</VBtn>
        </template>
        
        <VCardText class="d-flex flex-wrap gap-4">
          <div style="width: 250px"><VTextField label="Search Customer / Subject" density="compact" prepend-inner-icon="tabler-search" hide-details /></div>
          <VSelect label="Type" :items="['All', 'Meeting', 'Call', 'Email']" density="compact" style="width: 150px" hide-details />
          <VSelect label="Outcome" :items="['All', 'Follow-up', 'Resolved']" density="compact" style="width: 150px" hide-details />
          <VSpacer />
          <VBtn variant="tonal" color="secondary" prepend-icon="tabler-file-download">Export Log</VBtn>
        </VCardText>

        <VDivider />

        <VTable hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Type</th>
              <th>Subject</th>
              <th>Outcome</th>
              <th>Next Action</th>
              <th>Assigned To</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="int in crmStore.interactions" :key="int.interactionId">
              <td>{{ new Date(int.createdAt).toLocaleDateString() }}</td>
              <td class="font-weight-bold">
                 <router-link :to="`/crm/customers/${int.customerId}/360`" class="text-primary text-decoration-none">
                    {{ crmStore.getCustomerById(int.customerId)?.companyName }}
                 </router-link>
              </td>
              <td><VChip size="x-small" label>{{ int.type }}</VChip></td>
              <td>{{ int.subject }}</td>
              <td>
                <VChip v-if="int.outcome" :color="getStatusColor(int.outcome)" size="x-small" variant="tonal">{{ int.outcome }}</VChip>
              </td>
              <td>
                <div v-if="int.nextAction" class="text-caption text-warning font-weight-bold">{{ int.nextAction }}</div>
                <div v-if="int.nextActionDate" class="text-caption italic">{{ int.nextActionDate }}</div>
              </td>
              <td>{{ int.createdBy }}</td>
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
