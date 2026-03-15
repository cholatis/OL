<script setup lang="ts">
const segments = [
  { tier: 'PLATINUM', count: 12, fleet: '250+', value: '450M', risk: 'LOW' },
  { tier: 'GOLD', count: 35, fleet: '50-100', value: '280M', risk: 'MEDIUM' },
  { tier: 'SILVER', count: 85, fleet: '10-50', value: '150M', risk: 'MEDIUM' },
  { tier: 'BRONZE', count: 240, fleet: '<10', value: '95M', risk: 'HIGH' },
]

const getRiskColor = (risk: string) => {
  const map: any = { LOW: 'success', MEDIUM: 'warning', HIGH: 'error' }
  return map[risk] || 'secondary'
}
</script>

<template>
  <VRow>
    <VCol v-for="seg in segments" :key="seg.tier" cols="12" sm="6" md="3">
      <VCard :border="`top ${getRiskColor(seg.risk)} 4px`" class="h-100">
        <VCardText>
          <div class="d-flex justify-space-between align-start mb-4">
             <div>
               <div class="text-h6 font-weight-bold">{{ seg.tier }}</div>
               <VChip :color="getRiskColor(seg.risk)" size="x-small" label class="mt-1">{{ seg.risk }} CHURN RISK</VChip>
             </div>
             <VAvatar color="primary" variant="tonal" rounded>
                <VIcon icon="tabler-users" />
             </VAvatar>
          </div>
          
          <div class="mb-4">
            <div class="text-h4 font-weight-bold">{{ seg.count }}</div>
            <div class="text-caption">Customers in segment</div>
          </div>
          
          <VDivider class="mb-4" />
          
          <VList density="compact">
            <VListItem title="Avg Fleet Size" :subtitle="seg.fleet" prepend-icon="tabler-car" />
            <VListItem title="Total Portfolio" :subtitle="seg.value" prepend-icon="tabler-cash" />
          </VList>
          
          <VBtn block variant="outlined" color="primary" class="mt-4" to="/crm/engagement">Target this Group</VBtn>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard title="Customer Matrix Analysis">
        <VCardText>
          <!-- Simplified Matrix visualization -->
          <VRow>
            <VCol cols="12" md="6">
               <div class="text-subtitle-1 font-weight-bold mb-4">Churn Risk vs Engagement Score</div>
               <div class="border rounded pa-10 text-center text-secondary italic">Scatter Chart: High Risk/Low Engagement quadrant analysis...</div>
            </VCol>
            <VCol cols="12" md="6">
               <div class="text-subtitle-1 font-weight-bold mb-4">Tier Distribution by Value</div>
               <div class="border rounded pa-10 text-center text-secondary italic">TreeMap: Platinum contributing 65% of revenue...</div>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
