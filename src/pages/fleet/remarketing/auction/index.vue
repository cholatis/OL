<script setup lang="ts">
import { useDisposalStore } from '@/stores/disposal'

const disposalStore = useDisposalStore()

const getStatusColor = (status: string) => {
  const map: any = { 'UPCOMING': 'info', 'LIVE': 'error', 'COMPLETED': 'success' }
  return map[status] || 'secondary'
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Remarketing — Auction Management">
        <template #append>
          <VBtn color="primary" prepend-icon="tabler-plus">Create Auction Session</VBtn>
        </template>
        
        <VCardText>
           <VRow>
             <VCol v-for="auc in disposalStore.auctions" :key="auc.id" cols="12" md="6">
               <VCard border class="pa-2">
                 <VCardText>
                   <div class="d-flex justify-space-between align-center mb-4">
                     <div>
                       <div class="text-h6 font-weight-bold">{{ auc.auctionNo }}</div>
                       <div class="text-caption">{{ auc.auctionDate }} | {{ auc.onlinePlatform || auc.venue }}</div>
                     </div>
                     <VChip :color="getStatusColor(auc.status)" size="small" label>{{ auc.status }}</VChip>
                   </div>
                   
                   <VRow class="text-center mb-4">
                     <VCol cols="4">
                       <div class="text-h6 font-weight-bold">{{ auc.totalLots }}</div>
                       <div class="text-caption">Total Lots</div>
                     </VCol>
                     <VCol cols="4">
                       <div class="text-h6 font-weight-bold text-success">{{ auc.soldLots }}</div>
                       <div class="text-caption">Sold</div>
                     </VCol>
                     <VCol cols="4">
                       <div class="text-h6 font-weight-bold text-primary">{{ auc.totalRevenue?.toLocaleString() || '0' }}</div>
                       <div class="text-caption">Revenue</div>
                     </VCol>
                   </VRow>
                   
                   <VBtn block variant="tonal" color="primary">Manage Lots & Biddings</VBtn>
                 </VCardText>
               </VCard>
             </VCol>
           </VRow>
        </VCardText>

        <VDivider class="my-4" />

        <VCardText title="Auction Lots (Active / Previous)">
          <div class="d-flex gap-4 mb-4">
            <VTextField density="compact" label="Search Lot / Chassis" prepend-inner-icon="tabler-search" hide-details />
            <VSpacer />
            <VBtn variant="outlined" color="secondary" prepend-icon="tabler-file-download">Export Results</VBtn>
          </div>
          <VTable>
            <thead>
              <tr>
                <th>Lot No.</th>
                <th>Vehicle Details</th>
                <th class="text-right">Reserve Price</th>
                <th class="text-right">Current Bid</th>
                <th class="text-center">Bid Count</th>
                <th class="text-center">Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="font-weight-bold">LOT-001</td>
                <td>Toyota Camry 2021 (1กก 1111)</td>
                <td class="text-right">850,000</td>
                <td class="text-right font-weight-bold text-primary">885,000</td>
                <td class="text-center">12</td>
                <td class="text-center"><VChip color="error" size="x-small">BIDDING</VChip></td>
                <td><VBtn size="x-small" variant="text" color="primary"><VIcon icon="tabler-history" /></VBtn></td>
              </tr>
            </tbody>
          </VTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
