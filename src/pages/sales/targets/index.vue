<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref(0)
const selectedYear = ref(2024)
const selectedMonth = ref(3)

const salespersons = [
  { name: 'Somsak P.', revenue: 20000000, contracts: 5, fleet: 50, new: 2 },
  { name: 'Vichai K.', revenue: 15000000, contracts: 3, fleet: 30, new: 1 },
  { name: 'Ratree S.', revenue: 15000000, contracts: 3, fleet: 30, new: 1 },
]
</script>

<template>
  <div>
    <VTabs v-model="activeTab" color="primary">
      <VTab>Set Targets</VTab>
      <VTab>Target vs Actual Summary</VTab>
    </VTabs>

    <VWindow v-model="activeTab" class="mt-4">
      <VWindowItem>
        <VCard>
          <VCardText class="d-flex flex-wrap gap-4 align-center">
            <div style="width: 150px"><VSelect label="Year" :items="[2023, 2024, 2025]" v-model="selectedYear" density="compact" hide-details /></div>
            <div style="width: 150px"><VSelect label="Month" :items="[1,2,3,4,5,6,7,8,9,10,11,12]" v-model="selectedMonth" density="compact" hide-details /></div>
            <VSpacer />
            <VBtn variant="tonal" color="secondary" prepend-icon="tabler-copy">Copy from Last Month</VBtn>
            <VBtn color="primary" prepend-icon="tabler-device-floppy">Save All</VBtn>
          </VCardText>
          
          <VDivider />

          <VTable>
            <thead>
              <tr>
                <th>Salesperson</th>
                <th>Revenue Target (THB)</th>
                <th>Contracts Target</th>
                <th>Fleet Size Target</th>
                <th>New Customers</th>
                <th>Bonus Threshold %</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="sp in salespersons" :key="sp.name">
                <td>
                   <div class="d-flex align-center gap-2 font-weight-bold">
                     <VAvatar size="24" color="primary">{{ sp.name.charAt(0) }}</VAvatar>
                     <span>{{ sp.name }}</span>
                   </div>
                </td>
                <td style="width: 200px"><VTextField v-model="sp.revenue" type="number" density="compact" hide-details prefix="฿" /></td>
                <td style="width: 120px"><VTextField v-model="sp.contracts" type="number" density="compact" hide-details /></td>
                <td style="width: 120px"><VTextField v-model="sp.fleet" type="number" density="compact" hide-details /></td>
                <td style="width: 120px"><VTextField v-model="sp.new" type="number" density="compact" hide-details /></td>
                <td style="width: 120px"><VTextField value="110" type="number" density="compact" hide-details suffix="%" /></td>
              </tr>
            </tbody>
          </VTable>
        </VCard>
      </VWindowItem>

      <VWindowItem>
        <VCard title="Target Realization Matrix (THB)">
           <VCardText>
             <VTable bordered>
               <thead>
                 <tr>
                   <th>Salesperson</th>
                   <th>Jan</th>
                   <th>Feb</th>
                   <th>Mar</th>
                   <th>Apr</th>
                   <th>May</th>
                   <th>Jun</th>
                 </tr>
               </thead>
               <tbody>
                 <tr v-for="sp in salespersons" :key="sp.name">
                   <td class="font-weight-bold">{{ sp.name }}</td>
                   <td><VChip color="success" size="x-small" label>105%</VChip></td>
                   <td><VChip color="success" size="x-small" label>112%</VChip></td>
                   <td><VChip color="warning" size="x-small" label>68%</VChip></td>
                   <td class="text-secondary">-</td>
                   <td class="text-secondary">-</td>
                   <td class="text-secondary">-</td>
                 </tr>
               </tbody>
             </VTable>
           </VCardText>
        </VCard>
      </VWindowItem>
    </VWindow>
  </div>
</template>
