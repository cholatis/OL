<script setup lang="ts">
import { useEDocStore } from '@/stores/e-doc'

const eDocStore = useEDocStore()

const getStatusColor = (status: string) => {
  const map: Record<string, string> = {
    'FILED': 'success',
    'PAID': 'success',
    'DRAFT': 'secondary',
    'PREPARED': 'info',
    'OVERDUE': 'error'
  }
  return map[status] || 'secondary'
}

const formatCurrency = (val: number) => {
  return val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Tax Filing Calendar & Deadlines">
        <VCardText>
          <div class="d-flex flex-wrap gap-4 mb-4">
            <VChip color="info" prepend-icon="tabler-calendar">Current Period: March 2024</VChip>
            <VChip color="warning" prepend-icon="tabler-clock">Next Deadline: 15 Mar (PP30)</VChip>
          </div>
          
          <VAlert border="start" color="primary" variant="tonal" class="mb-6">
            <template #prepend>
              <VIcon icon="tabler-info-circle" />
            </template>
            Electronic Filing extends the submission deadline by 8 days for most tax forms in Thailand.
          </VAlert>
        </VCardText>

        <VDivider />

        <VTable>
          <thead>
            <tr>
              <th>Form Type</th>
              <th>Period</th>
              <th>Due Date</th>
              <th class="text-right">Taxable Amount</th>
              <th class="text-right">Tax to Pay</th>
              <th class="text-center">Status</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="f in eDocStore.taxFilings" :key="f.id">
              <td class="font-weight-bold text-primary">{{ f.formType }}</td>
              <td>{{ f.taxPeriod }}</td>
              <td>{{ f.dueDate }}</td>
              <td class="text-right">{{ formatCurrency(f.taxableAmount) }}</td>
              <td class="text-right font-weight-bold">{{ formatCurrency(f.taxAmount) }}</td>
              <td class="text-center">
                <VChip :color="getStatusColor(f.status)" size="small" label>{{ f.status }}</VChip>
              </td>
              <td class="text-center">
                <VBtn variant="text" size="small" color="primary" prepend-icon="tabler-pencil">Prepare</VBtn>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>

    <VCol cols="12" md="6">
      <VCard title="RD e-Filing Integration Status">
        <VCardText>
          <VList density="compact">
            <VListItem prepend-icon="tabler-key" title="Digital Certificate">
              <template #append>
                <VChip color="success" size="x-small">VALID</VChip>
              </template>
              <VListItemSubtitle>Expires in 244 days</VListItemSubtitle>
            </VListItem>
            <VListItem prepend-icon="tabler-api" title="Tax API Connection">
              <template #append>
                <VChip color="success" size="x-small">ONLINE</VChip>
              </template>
              <VListItemSubtitle>Latests heartbeat: 5 mins ago</VListItemSubtitle>
            </VListItem>
          </VList>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
