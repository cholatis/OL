<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContractEventStore } from '@/stores/contractEvent'
import { useContractEvent } from '@/composables/useContractEvent'

const route = useRoute()
const router = useRouter()
const eventStore = useContractEventStore()
const { calculateET, calculateTotalLoss } = useContractEvent()

const activeTab = ref(0)
const event = ref<any>(null)

onMounted(() => {
    if (route.params.id === 'new') {
        const type = route.query.type as any || 'AMENDMENT'
        event.value = {
            id: `EV-${Date.now()}`,
            contractId: '',
            contractNo: '',
            eventType: type,
            eventDate: new Date().toISOString().split('T')[0],
            requestDate: new Date().toISOString().split('T')[0],
            requestedBy: 'Current User',
            status: 'DRAFT',
            remarks: '',
            details: getInitialDetails(type),
            attachments: [],
            approvalHistory: []
        }
    } else {
        const found = eventStore.events.find(e => e.id === route.params.id)
        if (found) event.value = JSON.parse(JSON.stringify(found))
    }
})

function getInitialDetails(type: string) {
    switch (type) {
        case 'EARLY_TERMINATION':
        case 'SETTLEMENT':
            return {
                terminationDate: new Date().toISOString().split('T')[0],
                outstandingPrincipal: 0,
                unearnedIncome: 0,
                etFeeRate: 2,
                etFee: 0,
                insuranceRefund: 0,
                securityDepositRefund: 0,
                netPayable: 0
            }
        case 'TOTAL_LOSS':
            return {
                incidentDate: new Date().toISOString().split('T')[0],
                incidentType: 'ACCIDENT',
                insuranceClaim: 0,
                insuranceDeductible: 0,
                assetWriteOff: 0,
                replacementRequested: false
            }
        default:
            return {}
    }
}

// ET Calculation Watcher
watch(() => event.value?.details, (newDetails) => {
    if (event.value?.eventType === 'EARLY_TERMINATION' && newDetails) {
        const result = calculateET(
            newDetails.outstandingPrincipal,
            newDetails.unearnedIncome,
            newDetails.etFeeRate,
            newDetails.insuranceRefund,
            newDetails.securityDepositRefund
        )
        // Update netPayable without triggering watch again if possible
        if (event.value.details.netPayable !== result.netPayable) {
            event.value.details.etFee = result.etFee
            event.value.details.netPayable = result.netPayable
        }
    }
}, { deep: true })

const save = () => {
    eventStore.addEvent(event.value)
    router.push('/contract-events')
}
</script>

<template>
  <div v-if="event">
    <VRow class="mb-4 align-center">
      <VCol cols="12" md="8">
        <div class="d-flex align-center">
            <VBtn icon variant="text" @click="router.back()"><VIcon icon="tabler-arrow-left" /></VBtn>
            <div class="ms-2">
                <h2 class="text-h4 font-weight-bold">{{ event.eventType }}</h2>
                <div class="text-body-2 text-medium-emphasis">ID: {{ event.id }} | Status: {{ event.status }}</div>
            </div>
        </div>
      </VCol>
      <VCol cols="12" md="4" class="text-md-right">
        <VBtn variant="tonal" color="secondary" class="me-2" @click="router.back()">ยกเลิก</VBtn>
        <VBtn color="primary" @click="save">บันทึกรายการ</VBtn>
      </VCol>
    </VRow>

    <VTabs v-model="activeTab" color="primary" class="mb-6">
      <VTab>ทั่วไป</VTab>
      <VTab>รายละเอียด Event</VTab>
      <VTab>การอนุมัติ & เอกสาร</VTab>
    </VTabs>

    <VWindow v-model="activeTab">
      <VWindowItem>
        <VCard>
          <VCardText>
            <VRow>
              <VCol cols="12" md="6">
                <VTextField v-model="event.contractNo" label="เลขที่สัญญา (MLA)" placeholder="ค้นหาสัญญา..." />
              </VCol>
              <VCol cols="12" md="3">
                <VTextField v-model="event.eventDate" type="date" label="วันที่มีผล" />
              </VCol>
              <VCol cols="12" md="3">
                <VTextField v-model="event.requestedBy" label="ผู้ขอ" readonly />
              </VCol>
              <VCol cols="12">
                <VTextarea v-model="event.remarks" label="หมายเหตุ / เหตุผล" rows="3" />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VWindowItem>

      <VWindowItem>
        <!-- Early Termination Form -->
        <VRow v-if="event.eventType === 'EARLY_TERMINATION' || event.eventType === 'SETTLEMENT'">
          <VCol cols="12" md="7">
            <VCard title="การคำนวณเงินสิ้นสุดสัญญา (ET Calculation)">
              <VCardText>
                <VRow>
                  <VCol cols="12" md="6">
                    <VTextField v-model.number="event.details.outstandingPrincipal" label="เงินต้นคงเหลือ (Outstanding Principal)" type="number" prefix="฿" />
                  </VCol>
                  <VCol cols="12" md="6">
                    <VTextField v-model.number="event.details.unearnedIncome" label="ดอกเบี้ยยังไม่รับรู้ (Unearned Income)" type="number" prefix="฿" />
                  </VCol>
                  <VCol cols="12" md="4">
                    <VTextField v-model.number="event.details.etFeeRate" label="ET Fee Rate (%)" type="number" suffix="%" />
                  </VCol>
                  <VCol cols="12" md="8">
                    <VTextField v-model.number="event.details.insuranceRefund" label="ค่าเบี้ยประกันคืน (Insurance Refund)" type="number" prefix="฿" />
                  </VCol>
                  <VCol cols="12" md="6">
                    <VTextField v-model.number="event.details.securityDepositRefund" label="เงินประกันคืน (SD Refund)" type="number" prefix="฿" />
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>
          <VCol cols="12" md="5">
            <VCard title="สรุปยอดชำระสุทธิ" class="bg-light-primary">
              <VCardText class="text-center py-6">
                <div class="text-h6 mb-2">NET PAYABLE AMOUNT</div>
                <div :class="['text-h2 font-weight-bold mb-4', event.details.netPayable > 0 ? 'text-error' : 'text-success']">
                  {{ Math.abs(event.details.netPayable).toLocaleString() }} ฿
                </div>
                <VChip :color="event.details.netPayable > 0 ? 'error' : 'success'" variant="elevated">
                  {{ event.details.netPayable > 0 ? 'ลูกค้าต้องจ่ายเพิ่ม' : 'ลูกค้าได้รับเงินคืน' }}
                </VChip>
                
                <VDivider class="my-6" />
                <div class="text-left text-body-2">
                  <div class="d-flex justify-space-between mb-2">
                    <span>Outstanding:</span>
                    <span>{{ event.details.outstandingPrincipal.toLocaleString() }} ฿</span>
                  </div>
                  <div class="d-flex justify-space-between mb-2">
                    <span>ET Fee ({{ event.details.etFeeRate }}%):</span>
                    <span>+ {{ event.details.etFee.toLocaleString() }} ฿</span>
                  </div>
                  <div class="d-flex justify-space-between mb-2">
                    <span>SD & Insurance Refund:</span>
                    <span>- {{ (event.details.insuranceRefund + event.details.securityDepositRefund).toLocaleString() }} ฿</span>
                  </div>
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>

        <!-- Total Loss Form -->
        <VRow v-else-if="event.eventType === 'TOTAL_LOSS'">
          <VCol cols="12" md="8">
            <VCard title="รายงานเหตุการณ์คืนทรัพย์สิน (Loss Report)">
              <VCardText>
                <VRow>
                  <VCol cols="12" md="6">
                    <VTextField v-model="event.details.incidentDate" type="date" label="วันเกิดเหตุ" />
                  </VCol>
                  <VCol cols="12" md="6">
                    <VSelect v-model="event.details.incidentType" :items="['FIRE', 'FLOOD', 'ACCIDENT', 'THEFT', 'OTHER']" label="ประเภทเหตุการณ์" />
                  </VCol>
                  <VCol cols="12">
                    <VTextField v-model="event.details.policeReportNo" label="เลขที่รายงานประจำวัน (ตำรวจ)" />
                  </VCol>
                  <VCol cols="12" md="6">
                    <VTextField v-model.number="event.details.insuranceClaim" label="วงเงินที่เคลมประกันได้" type="number" prefix="฿" />
                  </VCol>
                  <VCol cols="12" md="6">
                    <VTextField v-model.number="event.details.insuranceDeductible" label="ค่าเสียหายส่วนแรก (Deductible)" type="number" prefix="฿" />
                  </VCol>
                  <VCol cols="12">
                    <VCheckbox v-model="event.details.replacementRequested" label="ลูกค้าต้องการรถทดใน (Asset Substitution)" color="primary" />
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>

        <VCard v-else>
          <VCardText class="text-center py-12">
            <VIcon icon="tabler-info-circle" size="64" color="info" class="mb-4" />
            <div class="text-h6">Form for {{ event.eventType }} under development</div>
            <div class="text-body-2 mt-2">กำลังพัฒนาฟอร์มเฉพาะสำหรับประเภทเหตุการณ์นี้</div>
          </VCardText>
        </VCard>
      </VWindowItem>

      <VWindowItem>
        <VCard title="ประวัติการอนุมัติ (Approval Chain)">
          <VCardText>
            <VTimeline side="end" density="compact" truncate-line="both">
                <VTimelineItem 
                    v-for="step in event.approvalHistory" 
                    :key="step.role" 
                    :dot-color="step.status === 'APPROVED' ? 'success' : 'secondary'"
                    size="x-small"
                >
                    <div class="d-flex justify-space-between align-center">
                        <div>
                            <div class="font-weight-bold">{{ step.role }}</div>
                            <div class="text-caption">{{ step.approver }}</div>
                        </div>
                        <div class="text-right">
                            <VChip :color="step.status === 'APPROVED' ? 'success' : 'secondary'" size="x-small" label>
                                {{ step.status }}
                            </VChip>
                            <div class="text-caption mt-1">{{ step.date || '-' }}</div>
                        </div>
                    </div>
                </VTimelineItem>
                <VTimelineItem dot-color="primary" size="x-small" v-if="event.status === 'PENDING_APPROVAL'">
                    <div class="font-weight-bold">รอการพิจารณา...</div>
                </VTimelineItem>
            </VTimeline>
          </VCardText>
        </VCard>
      </VWindowItem>
    </VWindow>
  </div>
</template>
