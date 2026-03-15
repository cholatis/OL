<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCreditStore } from '@/stores/credit'
import { useContractStore } from '@/stores/contract'
import type { CollectionActivity, CollectionActivityType, CollectionResult } from '@/types/credit'

const route = useRoute()
const creditStore = useCreditStore()
const contractStore = useContractStore()
const customerId = route.params.id as string

const debtor = ref(creditStore.getDebtorById(customerId))
const activities = computed(() => creditStore.getCollectionActivities(customerId))
const legalCases = computed(() => creditStore.getLegalCasesByCustomer(customerId))

// Contracts specific to this customer
const customerContracts = computed(() => {
  return contractStore.contracts.filter(c => c.lesseeId === customerId)
})

const activeTab = ref(0)
const isActivityDialogOpen = ref(false)

// Activity Form
const newActivity = ref<Partial<CollectionActivity>>({
  activityType: 'PHONE_CALL',
  result: 'CONTACTED',
  notes: '',
  promiseDate: '',
  promiseAmount: 0
})

const activityTypes: CollectionActivityType[] = ['PHONE_CALL', 'SMS', 'EMAIL', 'VISIT', 'LETTER', 'LEGAL_NOTICE']
const results: CollectionResult[] = ['CONTACTED', 'NO_ANSWER', 'PROMISE_TO_PAY', 'DISPUTE', 'UNABLE_TO_CONTACT']

const saveActivity = () => {
  const activity: any = {
    ...newActivity.value,
    id: `ACT-${Date.now()}`,
    customerId: customerId,
    activityDate: new Date().toLocaleString(),
    createdBy: 'Admin'
  }
  creditStore.addCollectionActivity(activity)
  isActivityDialogOpen.value = false
  // Reset form
  newActivity.value = {
    activityType: 'PHONE_CALL',
    result: 'CONTACTED',
    notes: '',
    promiseDate: '',
    promiseAmount: 0
  }
}

const getAgingColor = (status: string) => {
  switch (status) {
    case 'CURRENT': return 'success'
    case 'NPL': return 'error'
    case 'OVERDUE_61_90': return 'error'
    default: return 'warning'
  }
}
</script>

<template>
  <div v-if="debtor">
    <!-- Header -->
    <VRow class="mb-6">
      <VCol cols="12">
        <VCard>
          <VCardText class="d-flex flex-wrap justify-space-between align-center gap-4">
            <div class="d-flex align-center gap-4">
                <VBtn icon="tabler-arrow-left" variant="tonal" color="secondary" to="/debtors" />
                <div>
                    <h4 class="text-h4 mb-1">{{ debtor.companyName }}</h4>
                    <div class="d-flex align-center gap-2">
                        <span class="text-body-2">{{ debtor.customerId }}</span>
                        <VChip :color="getAgingColor(debtor.status)" size="x-small">{{ debtor.status }}</VChip>
                        <VChip size="x-small" color="primary">{{ debtor.collectionStage }}</VChip>
                    </div>
                </div>
            </div>

            <div class="d-flex gap-4">
                <div class="text-right">
                    <div class="text-caption">Total Outstanding</div>
                    <div class="text-h6 text-primary">{{ debtor.totalOutstanding.toLocaleString() }} ฿</div>
                </div>
                <VDivider vertical inset />
                <div class="text-right text-error">
                    <div class="text-caption">Overdue Amount</div>
                    <div class="text-h6">{{ debtor.overdueAmount.toLocaleString() }} ฿</div>
                </div>
            </div>
            
            <div class="d-flex gap-2">
                <VBtn prepend-icon="tabler-phone" color="success">Call Log</VBtn>
                <VBtn prepend-icon="tabler-mail" variant="tonal">Email</VBtn>
                <VBtn prepend-icon="tabler-plus" @click="isActivityDialogOpen = true">บันทึก Activity</VBtn>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Tabs Content -->
    <VTabs v-model="activeTab" class="mb-4">
        <VTab>Contracts & Outstanding</VTab>
        <VTab>Collection History</VTab>
        <VTab>Legal Cases</VTab>
    </VTabs>

    <VWindow v-model="activeTab">
        <VWindowItem>
            <VCard>
                <VDataTable :items="customerContracts" :headers="[
                    { title: 'Contract No', key: 'contractNo' },
                    { title: 'Type', key: 'status' },
                    { title: 'Commencement', key: 'commencementDate' },
                    { title: 'Expiry', key: 'expiryDate' },
                    { title: 'Term', key: 'contractTermMonths' },
                ]">
                    <template #item.status="{ item }">
                        <VChip size="x-small" :color="item.status === 'ACTIVE' ? 'success' : 'secondary'">{{ item.status }}</VChip>
                    </template>
                </VDataTable>
            </VCard>
        </VWindowItem>

        <VWindowItem>
            <VRow>
                <VCol cols="12" md="8">
                    <VCard title="Collection Timeline">
                        <VCardText>
                            <VTimeline side="end" align="start" truncate-line="both">
                                <VTimelineItem v-for="act in activities" :key="act.id"
                                    :dot-color="act.result === 'PROMISE_TO_PAY' ? 'success' : 'primary'"
                                    size="small"
                                >
                                    <template #opposite>
                                        <span class="text-caption text-disabled">{{ act.activityDate }}</span>
                                    </template>
                                    <div class="mb-4">
                                        <div class="d-flex justify-space-between align-center mb-1">
                                            <h6 class="text-h6">{{ act.activityType.replace('_', ' ') }}</h6>
                                            <VChip size="x-small">{{ act.result.replace('_', ' ') }}</VChip>
                                        </div>
                                        <p class="text-body-2 mb-2">{{ act.notes }}</p>
                                        <div v-if="act.promiseDate" class="bg-light-success pa-2 rounded border-success border-dashed">
                                            <div class="text-caption font-weight-bold text-success">
                                                Promise to Pay: {{ act.promiseDate }} ({{ act.promiseAmount?.toLocaleString() }} ฿)
                                            </div>
                                        </div>
                                        <div class="text-caption mt-1">By: {{ act.createdBy }}</div>
                                    </div>
                                </VTimelineItem>
                            </VTimeline>
                        </VCardText>
                    </VCard>
                </VCol>
                <VCol cols="12" md="4">
                    <VCard title="Summary Results">
                        <VCardText>
                             <div class="d-flex flex-column gap-4">
                                <div v-for="res in results" :key="res" class="d-flex justify-space-between align-center">
                                    <span class="text-body-2">{{ res.replace('_', ' ') }}</span>
                                    <VChip size="x-small" variant="tonal">{{ activities.filter(a => a.result === res).length }}</VChip>
                                </div>
                             </div>
                        </VCardText>
                    </VCard>
                </VCol>
            </VRow>
        </VWindowItem>

        <VWindowItem>
             <VRow v-if="legalCases.length">
                <VCol v-for="c in legalCases" :key="c.id" cols="12">
                    <VCard :title="`Legal Case: ${c.id}`">
                        <VCardText>
                            <div class="d-flex justify-space-between mb-4">
                                <div>
                                    <div class="text-caption">Current Stage</div>
                                    <VChip color="error">{{ c.currentStage }}</VChip>
                                </div>
                                <div class="text-right">
                                    <div class="text-caption">Claim Amount</div>
                                    <div class="text-h6">{{ c.claimAmount.toLocaleString() }} ฿</div>
                                </div>
                            </div>
                            <VBtn variant="outlined" color="primary" :to="`/legal/${c.id}`">View Legal Details</VBtn>
                        </VCardText>
                    </VCard>
                </VCol>
             </VRow>
             <VCard v-else class="text-center py-12">
                <VIcon icon="tabler-shield-off" size="64" color="disabled" class="mb-4" />
                <div class="text-h6 text-disabled">No Legal Cases found for this customer</div>
             </VCard>
        </VWindowItem>
    </VWindow>

    <!-- Activity Dialog -->
    <VDialog v-model="isActivityDialogOpen" max-width="600">
        <VCard title="บันทึกกิจกรรมการติดตามหนี้">
            <VCardText>
                <VRow>
                    <VCol cols="12" md="6">
                        <VSelect v-model="newActivity.activityType" :items="activityTypes" label="ประเภทกิจกรรม" />
                    </VCol>
                    <VCol cols="12" md="6">
                        <VSelect v-model="newActivity.result" :items="results" label="ผลลัพธ์" />
                    </VCol>
                    <VCol v-if="newActivity.result === 'PROMISE_TO_PAY'" cols="12" md="6">
                        <VTextField v-model="newActivity.promiseDate" type="date" label="วันที่นัดชำระ" />
                    </VCol>
                    <VCol v-if="newActivity.result === 'PROMISE_TO_PAY'" cols="12" md="6">
                        <VTextField v-model.number="newActivity.promiseAmount" type="number" label="จำนวนเงินที่นัดชำระ" />
                    </VCol>
                    <VCol cols="12">
                        <VTextarea v-model="newActivity.notes" label="บันทึกรายละเอียด" rows="3" />
                    </VCol>
                </VRow>
            </VCardText>
            <VCardActions>
                <VSpacer />
                <VBtn color="secondary" variant="tonal" @click="isActivityDialogOpen = false">ยกเลิก</VBtn>
                <VBtn color="primary" variant="elevated" @click="saveActivity">บันทึก</VBtn>
            </VCardActions>
        </VCard>
    </VDialog>
  </div>
</template>

<style scoped>
.border-dashed {
  border-style: dashed !important;
  border-width: 1px !important;
}
.bg-light-success {
  background-color: rgba(var(--v-theme-success), 0.1);
}
</style>
