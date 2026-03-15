<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCreditStore } from '@/stores/credit'
import type { LegalStage } from '@/types/credit'

const route = useRoute()
const creditStore = useCreditStore()
const caseId = route.params.id as string

const legalCase = computed(() => creditStore.legalCases.find(c => c.id === caseId))

const activeTab = ref(0)
const isAdvanceDialogOpen = ref(false)

const nextStage = ref<LegalStage>('WARNING_LETTER_2')
const stageNotes = ref('')

const stages: LegalStage[] = [
  'WARNING_LETTER_1', 'WARNING_LETTER_2', 'DEMAND_LETTER', 
  'LEGAL_FILING', 'COURT_PROCESS', 'JUDGMENT', 
  'ENFORCEMENT', 'ASSET_SEIZED', 'COMPLETED'
]

const updateStage = () => {
    creditStore.updateLegalStage(caseId, nextStage.value, stageNotes.value)
    isAdvanceDialogOpen.value = false
    stageNotes.value = ''
}

const getStageColor = (stage: string) => {
  if (stage.startsWith('WARNING')) return 'warning'
  if (stage === 'DEMAND_LETTER') return 'orange'
  if (stage === 'LEGAL_FILING' || stage === 'COURT_PROCESS') return 'error'
  if (stage === 'ASSET_SEIZED') return 'deep-purple'
  if (stage === 'COMPLETED') return 'success'
  return 'secondary'
}
</script>

<template>
  <div v-if="legalCase">
    <VRow class="mb-6">
      <VCol cols="12">
        <VCard>
          <VCardText class="d-flex justify-space-between align-center">
            <div class="d-flex align-center gap-4">
                <VBtn icon="tabler-arrow-left" variant="tonal" color="secondary" to="/legal" />
                <div>
                     <h4 class="text-h4 mb-1">Case: {{ legalCase.id }}</h4>
                     <div class="d-flex align-center gap-2 text-body-2">
                        <span>{{ legalCase.customerName }}</span>
                        <VDivider vertical inset />
                        <span>Contract: {{ legalCase.contractNo }}</span>
                     </div>
                </div>
            </div>
            <div class="d-flex align-center gap-4">
                 <div class="text-right">
                    <div class="text-caption">Claim Amount</div>
                    <div class="text-h5 text-error">{{ legalCase.claimAmount.toLocaleString() }} ฿</div>
                </div>
                <VBtn prepend-icon="tabler-player-play" color="primary" @click="isAdvanceDialogOpen = true">
                    Advance Stage
                </VBtn>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <VRow>
        <VCol cols="12" md="8">
            <VCard title="Legal Process Timeline">
                <VCardText>
                    <VTimeline side="end" align="start" truncate-line="both">
                        <VTimelineItem 
                            v-for="(event, idx) in legalCase.timeline" 
                            :key="idx"
                            :dot-color="getStageColor(event.stage)"
                            size="small"
                        >
                            <template #opposite>
                                <span class="text-caption text-disabled">{{ event.date.split('T')[0] }}</span>
                            </template>
                            <div class="mb-4">
                                <div class="d-flex justify-space-between align-center mb-1">
                                    <h6 class="text-h6">{{ event.stage.replace('_', ' ') }}</h6>
                                    <VChip size="x-small" :color="getStageColor(event.stage)" variant="tonal">STAGE {{ stages.indexOf(event.stage) + 1 }}</VChip>
                                </div>
                                <p class="text-body-2">{{ event.description }}</p>
                                <div class="text-caption mt-1">Status changed by: {{ event.createdBy }}</div>
                            </div>
                        </VTimelineItem>
                    </VTimeline>
                </VCardText>
            </VCard>
        </VCol>

        <VCol cols="12" md="4">
            <VCard title="Case Details" class="mb-6">
                <VCardText>
                    <div class="d-flex flex-column gap-4">
                        <div>
                            <div class="text-caption">Court Case No.</div>
                            <div class="text-body-1 font-weight-medium">{{ legalCase.courtCaseNo || 'Pending Filing' }}</div>
                        </div>
                        <div>
                            <div class="text-caption">Assigned Law Firm</div>
                            <div class="text-body-1 font-weight-medium">{{ legalCase.lawyer || '-' }}</div>
                        </div>
                        <div>
                            <div class="text-caption">Start Date</div>
                            <div class="text-body-1 font-weight-medium">{{ legalCase.startDate }}</div>
                        </div>
                    </div>
                </VCardText>
            </VCard>

            <VCard title="Hearing Dates">
                <VCardText>
                    <VList density="compact">
                        <VListItem v-for="(h, idx) in legalCase.hearingDates" :key="idx" class="px-0">
                            <template #prepend>
                                <VAvatar color="info" variant="tonal" size="32" class="me-3">
                                    <VIcon icon="tabler-calendar" size="18" />
                                </VAvatar>
                            </template>
                            <VListItemTitle class="font-weight-medium">{{ h.date }}</VListItemTitle>
                            <VListItemSubtitle>{{ h.purpose }}</VListItemSubtitle>
                        </VListItem>
                    </VList>
                </VCardText>
            </VCard>
        </VCol>
    </VRow>

    <!-- Advance Stage Dialog -->
    <VDialog v-model="isAdvanceDialogOpen" max-width="500">
        <VCard title="Advance Legal Stage">
            <VCardText>
                <VSelect 
                    v-model="nextStage" 
                    :items="stages" 
                    label="Target Legal Stage" 
                    class="mb-4"
                />
                <VTextarea 
                    v-model="stageNotes" 
                    label="Description of Activity/Update" 
                    rows="3"
                />
            </VCardText>
            <VCardActions>
                <VSpacer />
                <VBtn variant="tonal" color="secondary" @click="isAdvanceDialogOpen = false">Cancel</VBtn>
                <VBtn variant="elevated" color="primary" @click="updateStage">Update Status</VBtn>
            </VCardActions>
        </VCard>
    </VDialog>
  </div>
</template>
