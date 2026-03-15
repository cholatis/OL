<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAccountingStore } from '@/stores/accounting'

const accountingStore = useAccountingStore()
const selectedContract = ref('MLA-001')

const schedule = computed(() => accountingStore.getTFRS16ByContract(selectedContract.value))

const headers = [
  { title: 'งวด (Period)', key: 'period' },
  { title: 'วันที่ (Date)', key: 'date' },
  { title: 'Opening Liability', key: 'openingLeaseLiability', align: 'end' },
  { title: 'ค่าเช่า (Payment)', key: 'leasePayment', align: 'end' },
  { title: 'ดอกเบี้ย (Interest)', key: 'interestExpense', align: 'end' },
  { title: 'ชำระต้น (Principal)', key: 'principalRepayment', align: 'end' },
  { title: 'Closing Liability', key: 'closingLeaseLiability', align: 'end' },
  { title: 'ค่าเสื่อม ROU', key: 'rouDepreciation', align: 'end' },
  { title: 'Closing ROU', key: 'closingRouAsset', align: 'end' },
]

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(val)
}
</script>

<template>
  <VRow v-if="schedule">
    <VCol cols="12">
      <VCard title="TFRS 16 Lease Liability Schedule (Lessee View)">
        <template #append>
          <div class="d-flex align-center gap-4">
             <VSelect
              v-model="selectedContract"
              :items="['MLA-001']"
              label="Select Contract"
              density="compact"
              hide-details
              style="width: 200px"
            />
            <VBtn prepend-icon="tabler-download" variant="tonal">Export</VBtn>
          </div>
        </template>

        <VCardText>
          <VRow class="mb-6">
            <VCol cols="12" md="3">
              <div class="bg-light-primary pa-4 rounded">
                <div class="text-caption">Right of Use (ROU) Asset</div>
                <div class="text-h6 text-primary">{{ formatCurrency(schedule.rightOfUseAsset) }}</div>
                <div class="text-caption mt-1">Method: {{ schedule.rouAmortizationMethod }}</div>
              </div>
            </VCol>
            <VCol cols="12" md="3">
              <div class="bg-light-info pa-4 rounded">
                <div class="text-caption">Lease Liability (Initial)</div>
                <div class="text-h6 text-info">{{ formatCurrency(schedule.leaseLiability) }}</div>
                <div class="text-caption mt-1">Incremental Borrowing Rate: {{ schedule.discountRate }}%</div>
              </div>
            </VCol>
            <VCol cols="12" md="3">
              <div class="bg-light-success pa-4 rounded">
                <div class="text-caption">Paid Principal (YTD)</div>
                <div class="text-h6 text-success">{{ formatCurrency(125000) }}</div>
              </div>
            </VCol>
            <VCol cols="12" md="3">
              <div class="bg-light-warning pa-4 rounded">
                <div class="text-caption">Interest Expense (YTD)</div>
                <div class="text-h6 text-warning">{{ formatCurrency(15420) }}</div>
              </div>
            </VCol>
          </VRow>

          <VDataTable
            :headers="headers"
            :items="schedule.rows"
            density="compact"
            class="mb-6"
          >
            <template v-for="h in ['openingLeaseLiability', 'leasePayment', 'interestExpense', 'principalRepayment', 'closingLeaseLiability', 'rouDepreciation', 'closingRouAsset']" #[`item.${h}`]="{ value }">
               {{ value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
            </template>
          </VDataTable>

          <VDivider />

          <div class="mt-8">
            <h6 class="text-h6 mb-4">Sample Journal Entry (Monthly Recognition)</h6>
            <VCard variant="outlined">
                <VTable density="compact">
                    <thead>
                        <tr>
                            <th>Account Name</th>
                            <th class="text-right">Debit (Dr)</th>
                            <th class="text-right">Credit (Cr)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Lease Liability (Principal Portion)</td>
                            <td class="text-right">{{ (schedule.rows[0].principalRepayment).toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</td>
                            <td class="text-right"></td>
                        </tr>
                        <tr>
                            <td>Interest Expense - Lease Liability</td>
                            <td class="text-right">{{ (schedule.rows[0].interestExpense).toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</td>
                            <td class="text-right"></td>
                        </tr>
                        <tr>
                            <td class="ps-8">Cash / Bank</td>
                            <td class="text-right"></td>
                            <td class="text-right">{{ (schedule.rows[0].leasePayment).toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</td>
                        </tr>
                        <tr class="bg-light-secondary">
                            <td>Depreciation Expense - ROU Asset</td>
                            <td class="text-right">{{ (schedule.rows[0].rouDepreciation).toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</td>
                            <td class="text-right"></td>
                        </tr>
                        <tr class="bg-light-secondary">
                            <td class="ps-8">Accumulated Depreciation - ROU Asset</td>
                            <td class="text-right"></td>
                            <td class="text-right">{{ (schedule.rows[0].rouDepreciation).toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</td>
                        </tr>
                    </tbody>
                </VTable>
            </VCard>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped>
.bg-light-primary { background-color: rgba(var(--v-theme-primary), 0.1); }
.bg-light-info { background-color: rgba(var(--v-theme-info), 0.1); }
.bg-light-success { background-color: rgba(var(--v-theme-success), 0.1); }
.bg-light-warning { background-color: rgba(var(--v-theme-warning), 0.1); }
.bg-light-secondary { background-color: rgba(var(--v-theme-on-surface), 0.03); }
</style>
