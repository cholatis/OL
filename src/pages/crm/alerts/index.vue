<script setup lang="ts">
const alertRules = [
  { name: 'Contract Expiry (90d)', trigger: 'DaysToExpiry ≤ 90', channel: 'EMAIL', status: 'ACTIVE', count: 12 },
  { name: 'Insurance Expiry (30d)', trigger: 'InsuranceDays ≤ 30', channel: 'LINE', status: 'ACTIVE', count: 5 },
  { name: 'PM Due Notification', trigger: 'PMDays ≤ 15', channel: 'EMAIL', status: 'PAUSED', count: 0 },
  { name: 'Overdue Payment (7d)', trigger: 'OverdueDays ≥ 7', channel: 'SMS', status: 'ACTIVE', count: 3 },
]
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="กฎการแจ้งเตือนอัตโนมัติ (Automated Alert Rules)">
        <template #append>
          <VBtn color="primary" prepend-icon="tabler-plus">New Rule</VBtn>
        </template>
        <VTable>
          <thead>
            <tr>
              <th>Rule Name</th>
              <th>Trigger Condition</th>
              <th>Channel</th>
              <th>Template</th>
              <th class="text-center">Alerts (7d)</th>
              <th class="text-center">Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rule in alertRules" :key="rule.name">
              <td class="font-weight-bold">{{ rule.name }}</td>
              <td><VChip size="x-small" variant="outlined">{{ rule.trigger }}</VChip></td>
              <td><VChip size="x-small" color="primary">{{ rule.channel }}</VChip></td>
              <td>Standard {{ rule.channel }}</td>
              <td class="text-center font-weight-bold">{{ rule.count }}</td>
              <td class="text-center">
                <VSwitch :model-value="rule.status === 'ACTIVE'" color="success" density="compact" hide-details />
              </td>
              <td>
                <VBtn icon size="x-small" variant="text"><VIcon icon="tabler-pencil" /></VBtn>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>
