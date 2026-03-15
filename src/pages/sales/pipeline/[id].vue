<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useSalesStore } from '@/stores/sales'
import { ref, computed } from 'vue'

const route = useRoute()
const salesStore = useSalesStore()
const opportunityId = route.params.id as string
const activeTab = ref(0)

const opportunity = computed(() => salesStore.getOpportunityById(opportunityId))
const activities = computed(() => salesStore.getActivitiesByOpportunity(opportunityId))

const stages = ['PROSPECT', 'QUALIFIED', 'QUOTATION', 'NEGOTIATION', 'WON', 'LOST']

const getStageIndex = (stage: string) => stages.indexOf(stage)

const getOutcomeColor = (outcome: string) => {
  if (outcome === 'POSITIVE') return 'success'
  if (outcome === 'NEGATIVE') return 'error'
  return 'secondary'
}
</script>

<template>
  <div v-if="opportunity">
    <!-- Header -->
    <VRow class="mb-4">
      <VCol cols="12">
        <VCard>
          <VCardText class="d-flex flex-wrap gap-6 justify-space-between align-center">
            <div class="d-flex align-center gap-4">
              <VAvatar color="primary" variant="tonal" size="64" rounded>
                <VIcon icon="tabler-target" size="32" />
              </VAvatar>
              <div>
                <div class="d-flex align-center gap-2">
                  <h3 class="text-h4 font-weight-bold">{{ opportunity.opportunityNo }}</h3>
                  <VChip color="primary" label size="small">{{ opportunity.stage }}</VChip>
                </div>
                <div class="text-subtitle-1 text-secondary">
                  {{ opportunity.prospectName || 'Customer: ' + opportunity.customerId }}
                </div>
              </div>
            </div>
            
            <div class="d-flex gap-8 text-center">
              <div>
                <div class="text-h5 font-weight-bold">฿{{ (opportunity.estimatedValue / 1000000).toFixed(1) }}M</div>
                <div class="text-caption">Est. Value</div>
              </div>
              <div>
                <div class="text-h5 font-weight-bold">{{ opportunity.winProbability }}%</div>
                <div class="text-caption">Win Prob.</div>
              </div>
              <div>
                <div class="text-h5 font-weight-bold text-primary">{{ opportunity.estimatedCloseDate }}</div>
                <div class="text-caption">Target Close</div>
              </div>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Stage Progress -->
    <VRow class="mb-4">
      <VCol cols="12">
        <VCard>
          <VCardText>
            <div class="d-flex justify-space-between mb-4">
               <template v-for="(stage, index) in stages" :key="stage">
                  <div class="d-flex flex-column align-center flex-grow-1">
                    <VAvatar 
                      :color="index <= getStageIndex(opportunity.stage) ? 'primary' : 'secondary'" 
                      :variant="index === getStageIndex(opportunity.stage) ? 'elevated' : 'tonal'"
                      size="32" 
                      class="mb-1"
                    >
                      <VIcon v-if="index < getStageIndex(opportunity.stage)" icon="tabler-check" size="18" />
                      <span v-else>{{ index + 1 }}</span>
                    </VAvatar>
                    <span class="text-caption font-weight-bold">{{ stage }}</span>
                  </div>
                  <VDivider v-if="index < stages.length - 1" class="mt-4 mx-2" />
               </template>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Tabs Content -->
    <VRow>
      <VCol cols="12">
        <VTabs v-model="activeTab" color="primary">
          <VTab>Opportunity Info</VTab>
          <VTab>Sales Activities</VTab>
          <VTab>Documents</VTab>
          <VTab>History</VTab>
        </VTabs>

        <VWindow v-model="activeTab" class="mt-4">
          <!-- Info -->
          <VWindowItem>
            <VCard title="Details & Configuration">
              <VCardText>
                <VRow>
                  <VCol cols="12" md="6">
                    <VList density="compact">
                      <VListItem title="Vehicle Type" :subtitle="opportunity.vehicleType" />
                      <VListItem title="Fleet Size" :subtitle="opportunity.estimatedFleetSize + ' units'" />
                      <VListItem title="Source" :subtitle="opportunity.source" />
                    </VList>
                  </VCol>
                  <VCol cols="12" md="6">
                    <VList density="compact">
                      <VListItem title="Assigned Salesperson" :subtitle="opportunity.assignedSalesperson" />
                      <VListItem title="Estimated Close" :subtitle="opportunity.estimatedCloseDate" />
                      <VListItem title="Probability" :subtitle="opportunity.winProbability + '%'" />
                    </VList>
                  </VCol>
                </VRow>
                
                <!-- Action Buttons -->
                <VDivider class="my-4" />
                <div class="d-flex gap-4">
                  <VBtn v-if="opportunity.stage !== 'WON'" color="success" prepend-icon="tabler-trophy">Mark as WON</VBtn>
                  <VBtn v-if="opportunity.stage !== 'LOST'" border color="error" variant="text" prepend-icon="tabler-x">Mark as LOST</VBtn>
                  <VBtn variant="tonal" prepend-icon="tabler-file-invoice">Create Quotation</VBtn>
                </div>
              </VCardText>
            </VCard>
          </VWindowItem>

          <!-- Activities -->
          <VWindowItem>
            <VCard title="Interactions & Follow-ups">
               <template #append>
                 <VBtn color="primary" size="small" prepend-icon="tabler-plus">Log Activity</VBtn>
               </template>
               <VCardText>
                 <VTimeline side="end" density="compact" align="start">
                    <VTimelineItem 
                      v-for="act in activities" 
                      :key="act.activityId" 
                      dot-color="primary" 
                      size="small"
                    >
                      <div class="d-flex justify-space-between align-center mb-1">
                        <div class="d-flex align-center gap-2">
                           <VChip size="x-small" label>{{ act.type }}</VChip>
                           <span class="font-weight-bold">{{ act.subject }}</span>
                        </div>
                        <span class="text-caption">{{ new Date(act.createdAt).toLocaleDateString() }}</span>
                      </div>
                      <div class="text-body-2 mb-2">{{ act.notes }}</div>
                      <div class="d-flex align-center gap-4">
                         <VChip :color="getOutcomeColor(act.outcome)" size="x-small" variant="tonal">{{ act.outcome }}</VChip>
                         <div v-if="act.nextAction" class="text-caption text-warning font-weight-bold">
                           Next: {{ act.nextAction }} ({{ act.nextActionDate }})
                         </div>
                      </div>
                    </VTimelineItem>
                    
                    <div v-if="activities.length === 0" class="text-center py-10 text-secondary italic">
                      No activities logged for this opportunity yet.
                    </div>
                 </VTimeline>
               </VCardText>
            </VCard>
          </VWindowItem>

          <!-- Documents -->
          <VWindowItem>
            <VCard title="Opportunity Documents">
               <VCardText>
                 <VRow>
                   <VCol cols="12" md="6">
                     <VCard border flat>
                       <VCardText class="d-flex align-center gap-4">
                          <VIcon icon="tabler-file-type-pdf" color="error" size="32" />
                          <div>
                            <div class="font-weight-bold">Technical Proposal.pdf</div>
                            <div class="text-caption">2.4 MB | Uploaded on 2024-03-05</div>
                          </div>
                          <VSpacer />
                          <VBtn icon size="small" variant="text"><VIcon icon="tabler-download" /></VBtn>
                       </VCardText>
                     </VCard>
                   </VCol>
                 </VRow>
               </VCardText>
            </VCard>
          </VWindowItem>
        </VWindow>
      </VCol>
    </VRow>
  </div>
</template>
