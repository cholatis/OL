<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useProcurementStore } from '@/stores/procurement'
import { useFleetInsuranceStore } from '@/stores/fleet-insurance'
import { computed, ref } from 'vue'

const route = useRoute()
const procStore = useProcurementStore()
const fleetInsStore = useFleetInsuranceStore()
const vendorId = route.params.id as string
const activeTab = ref(0)

const vendor = computed(() => procStore.getVendorById(vendorId))
const ma = computed(() => fleetInsStore.getMAByVendor(vendorId))

const formatRating = (score: number) => {
  return '⭐'.repeat(score || 0)
}
</script>

<template>
  <div v-if="vendor">
    <VRow>
      <VCol cols="12" md="4">
        <VCard>
          <VCardText class="text-center pt-10">
            <VAvatar color="primary" variant="tonal" size="100" class="mb-4">
              <VIcon icon="tabler-building" size="48" />
            </VAvatar>
            <h3 class="text-h5 font-weight-bold">{{ vendor.companyName }}</h3>
            <VChip color="primary" size="small" class="mt-2">{{ vendor.vendorType }}</VChip>
            
            <div class="d-flex justify-center gap-4 mt-6">
              <div class="text-center">
                <div class="text-h6 font-weight-bold">{{ vendor.avgDeliveryDays || 0 }}</div>
                <div class="text-caption">Avg Delivery</div>
              </div>
              <VDivider vertical />
              <div class="text-center">
                <div class="text-h6 font-weight-bold text-warning">{{ formatRating(vendor.qualityScore || 5) }}</div>
                <div class="text-caption">Quality Rating</div>
              </div>
            </div>
          </VCardText>
          <VDivider />
          <VCardText>
            <div class="text-subtitle-2 text-uppercase mb-4">Contact Information</div>
            <VList density="compact" class="pa-0">
              <VListItem prepend-icon="tabler-user" :title="vendor.contactPerson" subtitle="Contact Person" />
              <VListItem prepend-icon="tabler-phone" :title="vendor.phone" subtitle="Phone" />
              <VListItem prepend-icon="tabler-mail" :title="vendor.email" subtitle="Email" />
              <VListItem prepend-icon="tabler-map-pin" :title="vendor.address" subtitle="Address" />
            </VList>
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12" md="8">
        <VTabs v-model="activeTab" color="primary" class="mb-4">
          <VTab>General Info</VTab>
          <VTab>Purchase Orders</VTab>
          <VTab>Maintenance Agreement (MA)</VTab>
        </VTabs>

        <VWindow v-model="activeTab">
          <!-- General Info -->
          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <VCard title="Authorized Brands / Services">
                  <VCardText>
                    <div class="d-flex gap-2 flex-wrap">
                      <VChip v-for="b in vendor.brand" :key="b" color="info" label prepend-icon="tabler-check">
                        {{ b }}
                      </VChip>
                    </div>
                  </VCardText>
                </VCard>
              </VCol>
            </VRow>
          </VWindowItem>

          <!-- POs -->
          <VWindowItem>
            <VCard title="Recent Purchase Orders">
              <VTable>
                <thead>
                  <tr>
                    <th>PO No.</th>
                    <th>Date</th>
                    <th class="text-right">Amount</th>
                    <th class="text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="po in procStore.purchaseOrders.filter(p => p.vendorId === vendor.id)" :key="po.id">
                    <td class="font-weight-bold">{{ po.poNo }}</td>
                    <td>{{ po.poDate }}</td>
                    <td class="text-right">{{ po.total.toLocaleString() }}</td>
                    <td class="text-center">
                      <VChip color="primary" size="x-small">{{ po.status }}</VChip>
                    </td>
                  </tr>
                  <tr v-if="!procStore.purchaseOrders.some(p => p.vendorId === vendor.id)">
                    <td colspan="4" class="text-center py-4 text-secondary">No recent orders</td>
                  </tr>
                </tbody>
              </VTable>
            </VCard>
          </VWindowItem>

          <!-- MA Tab -->
          <VWindowItem>
            <VCard v-if="ma" title="Maintenance Agreement (MA)">
              <template #append>
                <VChip :color="ma.status === 'ACTIVE' ? 'success' : 'secondary'" size="small">{{ ma.status }}</VChip>
              </template>
              <VCardText>
                <VRow>
                  <VCol cols="12" md="6">
                    <div class="text-subtitle-2 mb-2">Service Scope</div>
                    <div class="d-flex gap-1 flex-wrap">
                      <VChip v-for="s in ma.serviceScope.serviceTypes" :key="s" size="x-small" variant="tonal">{{ s }}</VChip>
                    </div>
                    <div class="mt-4">
                      <div class="text-caption">Labor Rate</div>
                      <div class="text-h6 font-weight-bold">{{ ma.laborRate }} BHT/Hr</div>
                    </div>
                  </VCol>
                  <VCol cols="12" md="6">
                    <div class="text-subtitle-2 mb-2">Service Level Agreement (SLA)</div>
                    <VList density="compact" class="pa-0 border rounded">
                      <VListItem title="Response Time" :subtitle="`${ma.sla.responseTimeHours} Hours`" prepend-icon="tabler-clock-hour-4" />
                      <VListItem title="Repair Time" :subtitle="`${ma.sla.repairTimeWorkingDays} Working Days`" prepend-icon="tabler-calendar-stats" />
                      <VListItem title="Loaner Car" :subtitle="ma.sla.loaner ? 'Included' : 'Not Included'" prepend-icon="tabler-car-crash" />
                    </VList>
                  </VCol>
                </VRow>
              </VCardText>
              <VDivider />
              <VCardText>
                <div class="d-flex justify-space-between align-center">
                  <div class="text-caption">Contract Period: {{ ma.startDate }} — {{ ma.endDate }}</div>
                  <VBtn prepend-icon="tabler-pencil" variant="outlined" size="small">Edit MA</VBtn>
                </div>
              </VCardText>
            </VCard>
            <VCard v-else class="text-center py-10">
              <VIcon icon="tabler-file-off" size="48" color="secondary" class="mb-2" />
              <div>No Active Maintenance Agreement</div>
              <VBtn color="primary" class="mt-4" prepend-icon="tabler-plus">Create MA</VBtn>
            </VCard>
          </VWindowItem>
        </VWindow>
      </VCol>
    </VRow>
  </div>
</template>
