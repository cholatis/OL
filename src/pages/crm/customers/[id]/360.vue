<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useCRMStore } from '@/stores/crm'
import { ref, computed } from 'vue'

const route = useRoute()
const crmStore = useCRMStore()
const customerId = route.params.id as string
const activeTab = ref(0)

const customer = computed(() => crmStore.getCustomerById(customerId))

const getTierColor = (tier: string) => {
  const map: any = { PLATINUM: 'primary', GOLD: 'warning', SILVER: 'secondary', BRONZE: 'brown' }
  return map[tier] || 'primary'
}

const getInteractionIcon = (type: string) => {
  const map: any = { 
    'CALL_OUTBOUND': 'tabler-phone-outgoing', 
    'MEETING': 'tabler-users', 
    'EMAIL_SENT': 'tabler-mail',
    'LINE_MESSAGE': 'tabler-brand-line'
  }
  return map[type] || 'tabler-dots'
}

const statsCards = computed(() => [
  { title: 'Active Contracts', value: customer.value?.activeContracts || 0, icon: 'tabler-file-check', color: 'primary' },
  { title: 'Overdue Amount', value: `฿${(customer.value?.overdueAmount || 0).toLocaleString()}`, icon: 'tabler-alert-circle', color: 'error' },
  { title: 'Insurance Renewal', value: '2 Units', icon: 'tabler-shield-alert', color: 'warning' },
  { title: 'Last Contact', value: customer.value?.lastActivityDate || '-', icon: 'tabler-calendar-event', color: 'info' },
])
</script>

<template>
  <div v-if="customer">
    <!-- Header Section -->
    <VRow class="mb-4">
      <VCol cols="12">
        <VCard>
          <VCardText class="d-flex flex-wrap gap-6 justify-space-between align-center">
            <div class="d-flex align-center gap-4">
              <VAvatar color="primary" variant="tonal" size="64" rounded>
                <VIcon icon="tabler-building" size="32" />
              </VAvatar>
              <div>
                <div class="d-flex align-center gap-2">
                  <h3 class="text-h4 font-weight-bold">{{ customer.companyName }}</h3>
                  <VChip :color="getTierColor(customer.tier)" size="small" label>{{ customer.tier }}</VChip>
                </div>
                <div class="text-subtitle-1 text-secondary">Tax ID: {{ customer.taxId }} | Founded: 2020</div>
              </div>
            </div>
            
            <div class="d-flex gap-8 text-center">
              <div>
                <div class="text-h5 font-weight-bold">{{ customer.fleetSize }}</div>
                <div class="text-caption">Fleet Size</div>
              </div>
              <div>
                <div class="text-h5 font-weight-bold">฿{{ (customer.totalContractValue / 1000000).toFixed(1) }}M</div>
                <div class="text-caption">Total Value</div>
              </div>
              <div>
                <VProgressCircular :model-value="customer.segment.engagementScore" color="success" size="50">
                  <span class="text-caption font-weight-bold">{{ customer.segment.engagementScore }}</span>
                </VProgressCircular>
                <div class="text-caption mt-1">Engagement</div>
              </div>
              <div>
                <VChip :color="customer.segment.churnRisk === 'LOW' ? 'success' : 'error'" variant="tonal" size="small">
                   {{ customer.segment.churnRisk }} RISK
                </VChip>
                <div class="text-caption mt-1">Churn Risk</div>
              </div>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Quick Stats -->
    <VRow class="mb-4">
      <VCol v-for="stat in statsCards" :key="stat.title" cols="12" sm="6" md="3">
        <VCard>
          <VCardText class="d-flex align-center">
            <VAvatar :color="stat.color" variant="tonal" rounded size="42" class="me-4">
              <VIcon :icon="stat.icon" />
            </VAvatar>
            <div>
              <div class="text-h6 font-weight-bold">{{ stat.value }}</div>
              <div class="text-caption">{{ stat.title }}</div>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Tabs Content -->
    <VRow>
      <VCol cols="12">
        <VTabs v-model="activeTab" color="primary">
          <VTab>General Info</VTab>
          <VTab>Contact Persons</VTab>
          <VTab>Interactions</VTab>
          <VTab>Contracts & Finance</VTab>
          <VTab>Engagement</VTab>
          <VTab>PDPA</VTab>
        </VTabs>

        <VWindow v-model="activeTab" class="mt-4">
          <!-- General Info -->
          <VWindowItem>
            <VCard title="Company Details">
              <VCardText>
                <VRow>
                  <VCol cols="12" md="6">
                    <VList density="compact">
                      <VListItem title="Company Name" :subtitle="customer.companyName" />
                      <VListItem title="Tax ID" :subtitle="customer.taxId" />
                      <VListItem title="Assigned Salesperson" :subtitle="customer.assignedSalesperson" />
                    </VList>
                  </VCol>
                  <VCol cols="12" md="6">
                    <div class="text-subtitle-2 mb-2">Category Tags</div>
                    <div class="d-flex gap-2 flex-wrap">
                      <VChip v-for="tag in customer.tags" :key="tag" size="small" variant="outlined">{{ tag }}</VChip>
                    </div>
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VWindowItem>

          <!-- Contacts -->
          <VWindowItem>
            <VCard>
              <template #append>
                <VBtn color="primary" size="small" prepend-icon="tabler-plus">Add Contact</VBtn>
              </template>
              <VTable>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Position / Dept</th>
                    <th>Contact Info</th>
                    <th>Roles</th>
                    <th class="text-center">Primary</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="cp in customer.contactPersons" :key="cp.contactId">
                    <td>
                      <div class="font-weight-bold">{{ cp.name }}</div>
                      <div class="text-caption">ID: {{ cp.contactId }}</div>
                    </td>
                    <td>
                      <div>{{ cp.position }}</div>
                      <div class="text-caption">{{ cp.department }}</div>
                    </td>
                    <td>
                      <div class="d-flex align-center gap-1"><VIcon icon="tabler-phone" size="14" /> {{ cp.phone }}</div>
                      <div class="d-flex align-center gap-1"><VIcon icon="tabler-mail" size="14" /> {{ cp.email }}</div>
                    </td>
                    <td>
                      <div class="d-flex gap-1 flex-wrap">
                        <VChip v-for="role in cp.roles" :key="role" size="x-small" label>{{ role }}</VChip>
                      </div>
                    </td>
                    <td class="text-center">
                      <VIcon v-if="cp.isPrimary" icon="tabler-star-filled" color="warning" />
                    </td>
                    <td>
                      <VBtn icon size="x-small" variant="text"><VIcon icon="tabler-pencil" /></VBtn>
                    </td>
                  </tr>
                </tbody>
              </VTable>
            </VCard>
          </VWindowItem>

          <!-- Interactions -->
          <VWindowItem>
            <VRow>
              <VCol cols="12" md="8">
                <VCard title="Activity Feed">
                  <template #append>
                    <VBtn color="primary" size="small" prepend-icon="tabler-plus">Log Activity</VBtn>
                  </template>
                  <VCardText>
                    <VTimeline side="end" density="compact" align="start">
                      <VTimelineItem 
                        v-for="int in crmStore.getInteractionsByCustomer(customerId)" 
                        :key="int.interactionId" 
                        dot-color="primary" 
                        size="small"
                      >
                        <template #icon>
                          <VIcon :icon="getInteractionIcon(int.type)" size="14" />
                        </template>
                        <div class="d-flex justify-space-between align-center mb-1">
                          <span class="font-weight-bold">{{ int.subject }}</span>
                          <span class="text-caption">{{ new Date(int.createdAt).toLocaleDateString() }}</span>
                        </div>
                        <div class="text-body-2 mb-2">{{ int.notes }}</div>
                        <div v-if="int.nextAction" class="bg-light pa-2 rounded mb-2 border-left-success">
                           <div class="text-caption font-weight-bold text-success">NEXT ACTION: {{ int.nextAction }}</div>
                           <div class="text-caption">Due: {{ int.nextActionDate }}</div>
                        </div>
                        <div class="text-caption italic">Created by {{ int.createdBy }}</div>
                      </VTimelineItem>
                    </VTimeline>
                  </VCardText>
                </VCard>
              </VCol>
              <VCol cols="12" md="4">
                <VCard title="Filters">
                  <VCardText>
                    <VList density="compact">
                      <VListItem title="All Activities" active prepend-icon="tabler-list" />
                      <VListItem title="Meetings" prepend-icon="tabler-users" />
                      <VListItem title="Calls" prepend-icon="tabler-phone" />
                      <VListItem title="Complaints" prepend-icon="tabler-alert-triangle" color="error" />
                    </VList>
                  </VCardText>
                </VCard>
              </VCol>
            </VRow>
          </VWindowItem>
          
          <!-- Engagement -->
          <VWindowItem>
             <VRow>
               <VCol cols="12">
                 <VCard title="Automated Messages History">
                   <VTable>
                     <thead>
                       <tr>
                         <th>Date</th>
                         <th>Channel</th>
                         <th>Purpose</th>
                         <th>Recipients</th>
                         <th>Stats</th>
                         <th>Status</th>
                       </tr>
                     </thead>
                     <tbody>
                       <tr v-for="msg in crmStore.getEngagementByCustomer(customerId)" :key="msg.messageId">
                         <td>{{ new Date(msg.sentAt).toLocaleString() }}</td>
                         <td><VChip size="x-small" variant="tonal">{{ msg.channel }}</VChip></td>
                         <td>{{ msg.purpose }}</td>
                         <td>{{ msg.recipients.length }} contacts</td>
                         <td>
                           <div class="text-caption">Opened: {{ msg.totalOpened }}</div>
                         </td>
                         <td><VChip color="success" size="x-small">{{ msg.status }}</VChip></td>
                       </tr>
                     </tbody>
                   </VTable>
                 </VCard>
               </VCol>
               <VCol cols="12" md="6" class="mt-4">
                 <VCard title="Sentiment Analysis (NPS)">
                   <VCardText class="text-center">
                     <VIcon icon="tabler-mood-smile" size="48" color="success" class="mb-2" />
                     <div class="text-h2 font-weight-bold text-success">10</div>
                     <div class="text-subtitle-1">Net Promoter Score</div>
                     <div class="text-caption mt-2">Latest comment: "Excellent service!"</div>
                   </VCardText>
                 </VCard>
               </VCol>
             </VRow>
          </VWindowItem>
          
          <!-- PDPA -->
          <VWindowItem>
             <VCard title="PDPA Consent Management">
               <VCardText>
                 <div class="d-flex align-center gap-4 mb-6 pa-4 border rounded">
                   <VIcon icon="tabler-shield-check" color="success" size="32" />
                   <div>
                     <div class="text-h6 font-weight-bold">Status: CONSENT GRANTED</div>
                     <div class="text-caption">Version: {{ customer.pdpaConsent.consentVersion }} | Last Updated: {{ customer.pdpaConsent.lastUpdated }}</div>
                   </div>
                   <VSpacer />
                   <VBtn variant="outlined" color="primary">View Document</VBtn>
                   <VBtn color="primary">Update Consent</VBtn>
                 </div>
                 
                 <div class="text-subtitle-2 mb-4">Consent Channels</div>
                 <VRow>
                   <VCol v-for="ch in ['MARKETING', 'NOTIFICATION', 'ANALYTICS', 'THIRD_PARTY']" :key="ch" cols="6" md="3">
                     <VCheckbox 
                       :model-value="customer.pdpaConsent.consentChannels.includes(ch)" 
                       :label="ch" 
                       readonly 
                       density="compact" 
                     />
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

<style scoped>
.border-left-success { border-left: 4px solid #28c76f; }
.bg-light { background-color: rgba(var(--v-theme-on-surface), 0.03); }
</style>
