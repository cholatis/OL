<script setup lang="ts">
const lostDeals = [
  { date: '2024-03-05', customer: 'Siam Retail', value: 8500000, stage: 'NEGOTIATION', reason: 'PRICE_TOO_HIGH', competitor: 'K-Leasing' },
]
</script>

<template>
  <VCard title="Lost Deals Detail">
    <VTable>
      <thead>
        <tr>
          <th>Date</th>
          <th>Customer</th>
          <th>Value</th>
          <th>Last Stage</th>
          <th>Reason</th>
          <th>Competitor</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="deal in lostDeals" :key="deal.customer">
          <td>{{ deal.date }}</td>
          <td class="font-weight-bold">{{ deal.customer }}</td>
          <td class="text-primary font-weight-bold">฿{{ (deal.value / 1000000).toFixed(1) }}M</td>
          <td><VChip size="x-small">{{ deal.stage }}</VChip></td>
          <td><VChip color="error" variant="tonal" size="x-small">{{ deal.reason }}</VChip></td>
          <td>{{ deal.competitor }}</td>
        </tr>
      </tbody>
    </VTable>
  </VCard>
</template>
