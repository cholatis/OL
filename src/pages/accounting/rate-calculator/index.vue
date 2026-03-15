<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFinancialCalc } from '@/composables/useFinancialCalc'

const { calcIRR } = useFinancialCalc()

const calcParams = ref({
  calculationType: 'IRR',
  principal: 1000000,
  term: 36,
  flatRate: 2.5,
  totalInterest: 0,
  rateType: 'FIXED'
})

const cashflows = ref([
  { period: 0, date: '2024-01-01', cashflow: -1000000 },
  ...Array.from({ length: 36 }, (_, i) => ({
    period: i + 1,
    date: `2024-${(i + 1) % 12 || 12}-01`,
    cashflow: (1000000 + (1000000 * 0.025 * 3)) / 36
  }))
])

const results = computed(() => {
  const irr = calcIRR(cashflows.value)
  return {
    irr: irr.toFixed(4),
    eir: (irr * 1.05).toFixed(4), // Mock spread for EIR
    flat: calcParams.value.flatRate.toFixed(2),
    monthlyPayment: cashflows.value[1].cashflow.toFixed(2)
  }
})

const headers = [
  { title: 'งวด (Period)', key: 'period' },
  { title: 'วันที่ (Date)', key: 'date' },
  { title: 'เงินสดไหลเข้า/ออก (Cashflow)', key: 'cashflow', align: 'end' },
]
</script>

<template>
  <VRow>
    <VCol cols="12" md="5">
      <VCard title="Financial Rate Input">
        <VCardText>
          <VSelect
            v-model="calcParams.calculationType"
            :items="['IRR', 'YIELD', 'EIR', 'FLAT_TO_EFFECTIVE']"
            label="Calculation Mode"
            class="mb-4"
          />
          
          <VRow>
            <VCol cols="12" md="6">
                <VTextField v-model.number="calcParams.principal" label="Principal (Net Investment)" prefix="฿" />
            </VCol>
            <VCol cols="12" md="6">
                <VTextField v-model.number="calcParams.term" label="Term (Months)" suffix="M" />
            </VCol>
            <VCol cols="12" md="6">
                <VTextField v-model.number="calcParams.flatRate" label="Flat Rate (%)" suffix="%" />
            </VCol>
             <VCol cols="12" md="6">
                <VSelect v-model="calcParams.rateType" :items="['FIXED', 'FLOATING']" label="Rate Type" />
            </VCol>
          </VRow>

          <VDivider class="my-6" />

          <h6 class="text-h6 mb-4 text-primary">Cashflow Generation (Manual/Auto)</h6>
          <VTable density="compact" class="border rounded">
            <thead>
                <tr>
                    <th>Period</th>
                    <th class="text-right">Cashflow</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cf in cashflows.slice(0, 5)" :key="cf.period">
                    <td>{{ cf.period }}</td>
                    <td class="text-right">{{ cf.cashflow.toLocaleString() }} ฿</td>
                </tr>
                <tr>
                    <td colspan="2" class="text-center text-caption py-2">... showing first 5 months ...</td>
                </tr>
            </tbody>
          </VTable>

          <VBtn block color="primary" class="mt-6" prepend-icon="tabler-calculator">
            Recalculate Yields
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12" md="7">
      <VRow>
        <VCol cols="12" md="6">
            <VCard class="bg-primary text-white">
                <VCardText class="text-center py-8">
                    <div class="text-h4 font-weight-bold mb-2">{{ results.irr }}%</div>
                    <div class="text-body-1 opacity-75">Nominal Yield (IRR p.a.)</div>
                </VCardText>
            </VCard>
        </VCol>
        <VCol cols="12" md="6">
            <VCard class="bg-info text-white">
                <VCardText class="text-center py-8">
                    <div class="text-h4 font-weight-bold mb-2">{{ results.eir }}%</div>
                    <div class="text-body-1 opacity-75">Effective Interest Rate (EIR)</div>
                </VCardText>
            </VCard>
        </VCol>
      </VRow>

      <VCard title="Yield Analysis Summary" class="mt-6 text-body-1">
        <VCardText>
            <div class="d-flex flex-column gap-4">
                <div class="d-flex justify-space-between border-sm pa-3 rounded">
                    <span>Flat Rate (per month equivalence)</span>
                    <span class="font-weight-bold">{{ results.flat }}%</span>
                </div>
                <div class="d-flex justify-space-between border-sm pa-3 rounded">
                    <span>Suggested Monthly Rental</span>
                    <span class="font-weight-bold text-success">{{ results.monthlyPayment }} ฿</span>
                </div>
                <div class="d-flex justify-space-between border-sm pa-3 rounded bg-light-warning">
                    <span>TFRS 9 Interest Recognition (Monthly)</span>
                    <span class="font-weight-bold">{{ (calcParams.principal * (calcParams.flatRate/100/12)).toLocaleString() }} ฿</span>
                </div>
            </div>

            <div class="mt-8">
                <h6 class="text-h6 mb-4">Yield Variance Analysis</h6>
                <p class="text-caption">Comparing standard market rates vs negotiated customer rate.</p>
                <VProgressLinear :model-value="85" color="success" height="20" rounded class="mb-4">
                    <template #default="{ value }">
                        <strong>{{ Math.ceil(value) }}% Efficiency</strong>
                    </template>
                </VProgressLinear>
                <div class="d-flex justify-space-between text-caption">
                    <span>Cost of Fund (4.0%)</span>
                    <span>Hurdle Rate (6.5%)</span>
                    <span class="text-success font-weight-bold">Current IRR ({{ results.irr }}%)</span>
                </div>
            </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped>
.bg-light-warning { background-color: rgba(var(--v-theme-warning), 0.1); }
</style>
