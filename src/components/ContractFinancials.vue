<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useContractEventStore } from '@/stores/contractEvent'
import type { ContractFinancials } from '@/types/contract-event'

const props = defineProps<{
    contractId: string
}>()

const eventStore = useContractEventStore()
const fin = ref<ContractFinancials | null>(null)

const loadFinancials = () => {
    fin.value = eventStore.getFinancialsByContractId(props.contractId) || null
}

onMounted(loadFinancials)

// Re-load if contractId changes (e.g. if used in dynamic component)
import { watch } from 'vue'
watch(() => props.contractId, loadFinancials)

const initialPaymentTotal = computed(() => {
    if (!fin.value) return 0
    return fin.value.initialPaymentItems.reduce((sum, item) => sum + item.amount, 0)
})
</script>

<template>
  <div v-if="fin">
     <VRow>
        <VCol cols="12" md="6">
            <VCard title="Down Payment & Security Deposit" class="h-100">
                <VCardText>
                    <div class="mb-6">
                        <div class="d-flex justify-space-between align-center mb-2">
                            <span class="text-body-1">เงินดาวน์ (Down Payment)</span>
                            <VChip :color="fin.downPaymentStatus === 'RECEIVED' ? 'success' : 'warning'" size="x-small">
                                {{ fin.downPaymentStatus }}
                            </VChip>
                        </div>
                        <VTextField v-model.number="fin.downPaymentAmount" type="number" prefix="฿" density="compact" />
                        <div class="d-flex gap-2 mt-2">
                            <VTextField v-model="fin.downPaymentDate" type="date" label="วันที่รับ" density="compact" />
                            <VSelect v-model="fin.downPaymentMethod" :items="['CASH', 'TRANSFER', 'CHEQUE']" label="วิธีชำระ" density="compact" />
                        </div>
                    </div>

                    <VDivider class="my-6" />

                    <div>
                        <div class="d-flex justify-space-between align-center mb-2">
                            <span class="text-body-1">เงินประกัน (Security Deposit)</span>
                            <VChip :color="fin.securityDepositStatus === 'RECEIVED' ? 'success' : 'warning'" size="x-small">
                                {{ fin.securityDepositStatus }}
                            </VChip>
                        </div>
                        <VTextField v-model.number="fin.securityDepositAmount" type="number" prefix="฿" density="compact" />
                        <div class="d-flex gap-2 mt-2">
                            <VSelect v-model="fin.securityDepositType" :items="['CASH', 'GUARANTEE_LETTER', 'POST_DATED_CHEQUE']" label="ประเภท" density="compact" />
                        </div>
                    </div>
                </VCardText>
            </VCard>
        </VCol>

        <VCol cols="12" md="6">
            <VCard title="Initial Payment (งวดแรกเข้า)">
                <VCardText>
                    <VTable density="compact">
                        <thead>
                            <tr>
                                <th>รายการ</th>
                                <th class="text-right">จำนวนเงิน (฿)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, idx) in fin.initialPaymentItems" :key="idx">
                                <td>{{ item.description }}</td>
                                <td class="text-right">{{ item.amount.toLocaleString() }}</td>
                            </tr>
                            <tr class="font-weight-bold text-primary">
                                <td>ยอดรวมงวดแรกสุทธิ</td>
                                <td class="text-right">{{ initialPaymentTotal.toLocaleString() }}</td>
                            </tr>
                        </tbody>
                    </VTable>
                </VCardText>
            </VCard>
            
            <VCard title="Payment Pattern" class="mt-6">
                <VCardText>
                    <VRow>
                        <VCol cols="12" md="6">
                            <VSelect v-model="fin.paymentMethod" :items="['ADVANCE', 'ARREAR']" label="วิธีชำระ (Method)" density="compact" />
                        </VCol>
                        <VCol cols="12" md="6">
                            <VSelect v-model="fin.paymentPattern" :items="['STRAIGHT', 'STEP_UP', 'STEP_DOWN']" label="รูปแบบ (Pattern)" density="compact" />
                        </VCol>
                    </VRow>

                    <template v-if="fin.paymentPattern !== 'STRAIGHT'">
                        <VDivider class="my-4" />
                        <VTable density="compact">
                            <thead>
                                <tr>
                                    <th>เดือน</th>
                                    <th class="text-right">ค่าเช่า/เดือน</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(step, idx) in fin.stepPayments" :key="idx">
                                    <td>{{ step.fromMonth }}-{{ step.toMonth }}</td>
                                    <td class="text-right font-weight-bold text-success">{{ step.amount.toLocaleString() }} ฿</td>
                                </tr>
                            </tbody>
                        </VTable>
                    </template>
                </VCardText>
            </VCard>
        </VCol>
    </VRow>
  </div>
  <div v-else class="text-center py-12">
    <VIcon icon="tabler-alert-triangle" size="64" color="warning" class="mb-4" />
    <div class="text-h6">ไม่พบข้อมูลทางการเงินของสัญญานี้ ({{ props.contractId }})</div>
  </div>
</template>
