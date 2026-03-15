<script setup lang="ts">
const activeTab = 0
</script>

<template>
  <div>
    <VTabs v-model="activeTab" color="primary">
      <VTab>Commission Rules</VTab>
      <VTab>Commission Records</VTab>
      <VTab>Summary Report</VTab>
    </VTabs>

    <VWindow v-model="activeTab" class="mt-4">
      <VWindowItem>
        <VCard>
          <template #append>
            <VBtn color="primary" size="small" prepend-icon="tabler-plus">Create Rule</VBtn>
          </template>
          <VTable>
            <thead>
              <tr>
                <th>Rule Name</th>
                <th>Type</th>
                <th>Revenue Range</th>
                <th>Rate %</th>
                <th>Bonus %</th>
                <th>Effective From</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="font-weight-bold">Standard Full Service</td>
                <td>FULL_SERVICE</td>
                <td>฿0 - No Limit</td>
                <td>1.5%</td>
                <td>0.5%</td>
                <td>2024-01-01</td>
                <td><VChip color="success" size="x-small" label>ACTIVE</VChip></td>
              </tr>
            </tbody>
          </VTable>
        </VCard>
      </VWindowItem>
    </VWindow>
  </div>
</template>
