<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAccountingGLStore } from '@/stores/accounting-gl'

const accountingGLStore = useAccountingGLStore()

const filter = ref({
  accountCode: '',
  period: '2024-03',
  source: 'ALL'
})

const transactions = computed(() => {
  // Simple filter for mock purposes
  return accountingGLStore.journalEntries.flatMap(je => {
    return je.lines.map(line => ({
      ...line,
      date: je.date,
      entryNo: je.entryNo,
      source: je.source,
      status: je.status
    }))
  })
})

const summary = computed(() => ({
  opening: 0,
  debit: transactions.value.reduce((sum, t) => sum + t.dr, 0),
  credit: transactions.value.reduce((sum, t) => sum + t.cr, 0),
  closing: transactions.value.reduce((sum, t) => sum + (t.dr - t.cr), 0)
}))

const formatCurrency = (val: number) => {
  return val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="สมุดบัญชีแยกประเภท (General Ledger)">
        <VCardText>
          <VRow class="mb-4">
             <VCol cols="12" md="4">
               <VAutocomplete
                v-model="filter.accountCode"
                :items="accountingGLStore.chartOfAccounts"
                item-title="name"
                item-value="code"
                label="เลือกบัญชี (Account)"
                density="compact"
                hide-details
                prepend-inner-icon="tabler-list"
              >
                  <template #item="{ props, item }">
                      <VListItem v-bind="props" :subtitle="item.raw.code" />
                  </template>
              </VAutocomplete>
            </VCol>
            <VCol cols="12" md="2">
              <VTextField v-model="filter.period" type="month" label="Period" density="compact" hide-details />
            </VCol>
            <VCol cols="12" md="3">
               <VSelect
                v-model="filter.source"
                :items="['ALL', 'INVOICE', 'RECEIPT', 'AP_INVOICE', 'MANUAL']"
                label="Source"
                density="compact"
                hide-details
              />
            </VCol>
            <VCol cols="12" md="3" class="d-flex align-center">
                <VBtn color="primary" block prepend-icon="tabler-filter">Filter Transactions</VBtn>
            </VCol>
          </VRow>

          <VRow class="mb-6">
            <VCol cols="12" md="3">
              <VCard variant="outlined" class="text-center pa-2">
                <div class="text-caption">Opening Balance</div>
                <div class="text-h6">{{ formatCurrency(summary.opening) }}</div>
              </VCard>
            </VCol>
            <VCol cols="12" md="3">
              <VCard variant="outlined" class="text-center pa-2 border-primary">
                <div class="text-caption text-primary">Total Debit</div>
                <div class="text-h6 text-primary">{{ formatCurrency(summary.debit) }}</div>
              </VCard>
            </VCol>
            <VCol cols="12" md="3">
              <VCard variant="outlined" class="text-center pa-2 border-error">
                <div class="text-caption text-error">Total Credit</div>
                <div class="text-h6 text-error">{{ formatCurrency(summary.credit) }}</div>
              </VCard>
            </VCol>
            <VCol cols="12" md="3">
              <VCard variant="outlined" class="text-center pa-4 bg-light-primary">
                <div class="text-caption font-weight-bold">Closing Balance</div>
                <div class="text-h6 font-weight-bold">{{ formatCurrency(summary.closing) }}</div>
              </VCard>
            </VCol>
          </VRow>

          <VTable density="compact" class="border rounded">
            <thead>
              <tr>
                <th>วันที่</th>
                <th>JE No.</th>
                <th>Source</th>
                <th>คำอธิบาย</th>
                <th class="text-right">Debit (DR)</th>
                <th class="text-right">Credit (CR)</th>
                <th class="text-right">Running Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(t, idx) in transactions" :key="idx" :class="{ 'text-disabled': t.status !== 'POSTED' }">
                <td class="text-no-wrap">{{ t.date }}</td>
                <td>
                  <router-link :to="`/accounting/gl/journal/${t.entryNo}`" class="text-primary text-decoration-none">
                    {{ t.entryNo }}
                  </router-link>
                </td>
                <td><VChip size="x-small" label>{{ t.source }}</VChip></td>
                <td>{{ t.description }}</td>
                <td class="text-right">{{ t.dr > 0 ? formatCurrency(t.dr) : '-' }}</td>
                <td class="text-right">{{ t.cr > 0 ? formatCurrency(t.cr) : '-' }}</td>
                <td class="text-right font-weight-bold">
                   {{ formatCurrency(transactions.slice(0, idx+1).reduce((sum, cur) => sum + (cur.dr - cur.cr), 0)) }}
                </td>
              </tr>
            </tbody>
          </VTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped>
.bg-light-primary { background-color: rgba(var(--v-theme-primary), 0.1); }
.border-primary { border-color: rgb(var(--v-theme-primary)) !important; }
.border-error { border-color: rgb(var(--v-theme-error)) !important; }
</style>
