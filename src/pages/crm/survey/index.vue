<script setup lang="ts">
const npsStats = {
  score: 68,
  promoters: 75,
  passives: 15,
  detractors: 10,
  responseRate: '32%'
}

const recentResponses = [
  { customer: 'Global Tech', score: 10, comment: 'Excellent expansion support', date: '2024-03-12' },
  { customer: 'Thai Logistics', score: 8, comment: 'Good maintenance, but billing needs sync', date: '2024-03-10' },
  { customer: 'SME Express', score: 4, comment: 'Overdue reminder sent by mistake', date: '2024-03-08' },
]
</script>

<template>
  <VRow>
    <VCol cols="12" md="4">
      <VCard class="h-100 text-center py-6">
        <VCardText>
          <div class="text-h6 mb-2">Net Promoter Score (NPS)</div>
          <VProgressCircular :model-value="npsStats.score" color="success" size="120" width="12">
             <div class="text-h3 font-weight-bold">{{ npsStats.score }}</div>
          </VProgressCircular>
          <div class="mt-4 d-flex justify-center gap-4">
             <div><div class="text-h6 text-success">{{ npsStats.promoters }}%</div><div class="text-caption">Promoters</div></div>
             <div><div class="text-h6 text-warning">{{ npsStats.passives }}%</div><div class="text-caption">Passives</div></div>
             <div><div class="text-h6 text-error">{{ npsStats.detractors }}%</div><div class="text-caption">Detractors</div></div>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12" md="8">
      <VCard title="CSAT / NPS Trend (12 Months)" class="h-100">
        <VCardText>
           <div class="text-center text-secondary py-10 italic">ApexCharts: NPS monthly trend...</div>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard title="Recent Feedback & Responses">
        <VTable>
           <thead>
             <tr>
               <th>Customer</th>
               <th class="text-center">Score</th>
               <th>Comment</th>
               <th>Date</th>
               <th>Action</th>
             </tr>
           </thead>
           <tbody>
             <tr v-for="res in recentResponses" :key="res.customer">
               <td class="font-weight-bold">{{ res.customer }}</td>
               <td class="text-center">
                 <VChip :color="res.score >= 9 ? 'success' : (res.score >= 7 ? 'warning' : 'error')" label size="small">
                   {{ res.score }}
                 </VChip>
               </td>
               <td>{{ res.comment }}</td>
               <td>{{ res.date }}</td>
               <td>
                 <VBtn size="small" variant="tonal" prepend-icon="tabler-message-share">Reply</VBtn>
               </td>
             </tr>
           </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>
