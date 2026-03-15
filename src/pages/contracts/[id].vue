<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContractStore } from '@/stores/contract'
import { useCustomerStore } from '@/stores/customer'
import type { MasterLeaseAgreement, ContractStatus } from '@/types/contract'
import ContractFinancials from '@/components/ContractFinancials.vue'

const route = useRoute()
const router = useRouter()
const contractStore = useContractStore()
const customerStore = useCustomerStore()

const id = computed(() => (route.params as any).id as string)
const isNew = computed(() => id.value === 'new')
const activeTab = ref(0)
const isSaving = ref(false)

const mla = ref<Partial<MasterLeaseAgreement>>({
  contractNo: 'MLA-2024-XXXXX',
  lessorName: 'บริษัท เอบีซี ลีสซิ่ง จำกัด',
  lesseeId: '',
  lesseeName: '',
  lesseeTaxId: '',
  lesseeAddress: '',
  authorizedSignatory: '',
  authorizedPosition: '',
  contractDate: new Date().toISOString().split('T')[0],
  commencementDate: new Date().toISOString().split('T')[0],
  contractTermMonths: 36,
  expiryDate: '',
  noticePeriodDays: 90,
  paymentFrequency: 'MONTHLY',
  paymentDueDay: 5,
  paymentProfileCode: 'T01',
  isVatRegistered: true,
  calculationMode: 'WITH_VAT',
  fleetCreditLimit: 0,
  fleetCreditUsed: 0,
  defaultEndOfTermOption: 'RETURN',
  earlyTerminationPolicy: 'Early termination requires notice...',
  returnConditionPolicy: 'Fair wear and tear...',
  baseRate: 2.50,
  margin: 1.50,
  totalRate: 4.00,
  defaultMaintenancePack: 'PD14',
  defaultHireGroup: 'A',
  insurancePolicy: 'Comprehensive',
  insuranceProvider: '',
  status: 'DRAFT',
  documents: [],
  equipmentSchedules: []
})

onMounted(async () => {
  if (!isNew.value) {
    await contractStore.fetchContractById(id.value)
    if (contractStore.selectedContract) {
      mla.value = { ...contractStore.selectedContract }
    } else {
      router.push('/contracts')
    }
  }
})

const calculateExpiry = computed(() => {
    if (!mla.value.commencementDate || !mla.value.contractTermMonths) return ''
    const date = new Date(mla.value.commencementDate)
    date.setMonth(date.getMonth() + mla.value.contractTermMonths)
    return date.toISOString().split('T')[0]
})

watch(() => mla.value.commencementDate, (newVal) => {
    mla.value.expiryDate = calculateExpiry.value
})
watch(() => mla.value.contractTermMonths, (newVal) => {
    mla.value.expiryDate = calculateExpiry.value
})

const totalRateCalc = computed(() => (mla.value.baseRate || 0) + (mla.value.margin || 0))

const workflowSteps = [
  { title: 'Draft', value: 'DRAFT', icon: 'tabler-file' },
  { title: 'Pending Approval', value: 'PENDING_APPROVAL', icon: 'tabler-clipboard-check' },
  { title: 'Approved', value: 'APPROVED', icon: 'tabler-thumb-up' },
  { title: 'Active', value: 'ACTIVE', icon: 'tabler-activity' }
]

const currentStepIndex = computed(() => {
  const status = mla.value.status
  if (!status) return -1
  if (status === 'DRAFT') return 0
  if (status === 'PENDING_APPROVAL') return 1
  if (status === 'APPROVED') return 2
  if (status === 'ACTIVE') return 3
  return -1
})

const mockSchedules = [
    { id: 'SCH-001', no: 'SCH-MLA001-01', assets: 5, type: 'CAR', start: '2024-01-01', end: '2027-01-01', rent: 85000, status: 'ACTIVE' },
    { id: 'SCH-002', no: 'SCH-MLA001-02', assets: 2, type: 'FORKLIFT', start: '2024-02-01', end: '2026-02-01', rent: 40000, status: 'ACTIVE' },
]

const save = async () => {
  isSaving.value = true
  if (isNew.value) {
    await contractStore.createContract(mla.value)
  } else {
    await contractStore.updateContract(id.value, mla.value)
  }
  isSaving.value = false
  router.push('/contracts')
}

const submitApproval = async () => {
    await contractStore.submitForApproval(id.value)
    mla.value.status = 'PENDING_APPROVAL'
}

const approve = async () => {
    await contractStore.approveContract(id.value, 'Manager John')
    mla.value.status = 'APPROVED'
}
</script>

<template>
  <div v-if="mla">
    <!-- Status Bar / Workflow -->
    <VCard class="mb-6 overflow-hidden">
        <VCardText class="pa-0">
            <div class="d-flex flex-wrap workflow-bar">
                <div 
                    v-for="(step, idx) in workflowSteps" 
                    :key="step.value"
                    class="flex-grow-1 pa-4 text-center d-flex align-center justify-center border-e"
                    :class="[
                        idx <= currentStepIndex ? 'bg-primary-lighten-5 text-primary' : 'text-disabled',
                        idx === currentStepIndex ? 'font-weight-bold active-step' : ''
                    ]"
                >
                    <VIcon :icon="step.icon" size="20" class="me-2" />
                    <span>{{ step.title }}</span>
                </div>
            </div>
        </VCardText>
    </VCard>

    <VRow class="mb-6 align-center">
      <VCol cols="12" md="6">
        <div class="d-flex align-center">
          <VBtn icon variant="text" @click="router.back()"><VIcon icon="tabler-arrow-left" /></VBtn>
          <h2 class="text-h4 font-weight-bold ms-2">{{ isNew ? 'สร้าง Master Lease ใหม่' : mla.contractNo }}</h2>
        </div>
      </VCol>
      <VCol cols="12" md="6" class="text-md-right">
        <VBtn v-if="mla.status === 'DRAFT'" color="success" class="me-2" @click="submitApproval">
          ส่งอนุมัติ
        </VBtn>
        <VBtn color="primary" @click="save" :loading="isSaving">
          บันทึกข้อมูล
        </VBtn>
      </VCol>
    </VRow>

    <VTabs v-model="activeTab" class="v-tabs-pill mb-6">
      <VTab prepend-icon="tabler-info-circle">ข้อมูลสัญญาหลัก</VTab>
      <VTab prepend-icon="tabler-file-text">เงื่อนไขพิเศษ (Policy)</VTab>
      <VTab prepend-icon="tabler-list-details">Equipment Schedules</VTab>
      <VTab prepend-icon="tabler-currency-base-dollar">Financials (งวดแรก/ประกัน)</VTab>
      <VTab prepend-icon="tabler-hierarchy-2">Approval Workflow</VTab>
      <VTab prepend-icon="tabler-paperclip">เอกสารสัญญา</VTab>
    </VTabs>

    <VWindow v-model="activeTab">
      <!-- Tab 1: Contract Info -->
      <VWindowItem>
        <VCard>
          <VCardText>
            <VRow>
              <VCol cols="12">
                <h3 class="text-h6 font-weight-bold mb-4 border-b pb-2">คู่สัญญา (Parties)</h3>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="mla.lessorName" label="Lessor (ผู้ให้เช่า)" readonly variant="filled" />
              </VCol>
              <VCol cols="12" md="6">
                <VAutocomplete
                  v-model="mla.lesseeId"
                  :items="customerStore.customers"
                  item-title="companyName"
                  item-value="id"
                  label="Lessee (ลูกค้า B2B)*"
                  @update:model-value="(val) => {
                      const c = customerStore.customers.find(x => x.id === val)
                      if (c) {
                          mla.lesseeName = c.companyName
                          mla.lesseeTaxId = c.taxId
                          mla.lesseeAddress = c.address
                      }
                  }"
                />
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="mla.authorizedSignatory" label="ผู้มีอำนาจลงนาม" />
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="mla.authorizedPosition" label="ตำแหน่ง" />
              </VCol>

              <VCol cols="12" class="mt-4">
                <h3 class="text-h6 font-weight-bold mb-4 border-b pb-2">ระยะเวลา (Term & Dates)</h3>
              </VCol>
              <VCol cols="12" md="3">
                <VTextField v-model="mla.contractDate" label="วันที่ทำสัญญา*" type="date" />
              </VCol>
              <VCol cols="12" md="3">
                <VTextField v-model="mla.commencementDate" label="วันที่เริ่มมีผล*" type="date" />
              </VCol>
              <VCol cols="12" md="3">
                <VSelect v-model="mla.contractTermMonths" label="ระยะเวลาเช่า (เดือน)*" :items="[12, 24, 36, 48, 60]" />
              </VCol>
              <VCol cols="12" md="3">
                <VTextField v-model="mla.expiryDate" label="วันสิ้นสุดสัญญา" readonly variant="filled" />
              </VCol>

              <VCol cols="12" class="mt-4">
                <h3 class="text-h6 font-weight-bold mb-4 border-b pb-2">เงื่อนไขการชำระ (Payment Terms)</h3>
              </VCol>
              <VCol cols="12" md="3">
                <VSelect v-model="mla.paymentFrequency" label="Payment Frequency" :items="['MONTHLY', 'QUARTERLY', 'ANNUAL']" />
              </VCol>
              <VCol cols="12" md="3">
                <VSelect v-model="mla.paymentDueDay" label="ครบกำหนดวันที่" :items="Array.from({length: 28}, (_, i) => i + 1)" />
              </VCol>
              <VCol cols="12" md="3">
                <VSelect v-model="mla.paymentProfileCode" label="Payment Profile" :items="['T00', 'T01', 'T02']" />
              </VCol>
               <VCol cols="12" md="3" class="d-flex align-center">
                 <VSwitch v-model="mla.isVatRegistered" label="จดทะเบียน VAT" color="primary" />
              </VCol>

              <VCol cols="12" class="mt-4">
                <h3 class="text-h6 font-weight-bold mb-4 border-b pb-2">Credit & Financial</h3>
              </VCol>
              <VCol cols="12" md="4">
                <VTextField v-model.number="mla.fleetCreditLimit" label="Fleet Credit Limit (ต่อเดือน)" prefix="฿" type="number" />
              </VCol>
              <VCol cols="12" md="4">
                 <div class="text-caption mb-1">Fleet Credit Used (%): ฿{{ (mla.fleetCreditUsed || 0).toLocaleString() }}</div>
                 <VProgressLinear :model-value="((mla.fleetCreditUsed || 0) / (mla.fleetCreditLimit || 1)) * 100" color="primary" height="10" rounded />
              </VCol>
               <VCol cols="12" md="4">
                <VRadioGroup v-model="mla.defaultEndOfTermOption" label="Option สิ้นสุดสัญญา" inline>
                  <VRadio label="Return" value="RETURN" />
                  <VRadio label="Renew" value="RENEW" />
                  <VRadio label="Purchase" value="PURCHASE" />
                </VRadioGroup>
              </VCol>
              
              <VCol cols="12" md="4">
                <VTextField v-model="mla.baseRate" label="Base Rate (%)" readonly variant="filled" suffix="%" />
              </VCol>
              <VCol cols="12" md="4">
                <VTextField v-model.number="mla.margin" label="Margin (%)*" type="number" suffix="%" />
              </VCol>
              <VCol cols="12" md="4">
                <VTextField :model-value="totalRateCalc" label="Total Rate (%)" readonly variant="filled" color="primary" font-weight-bold suffix="%" />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VWindowItem>

      <!-- Tab 2: Policy -->
      <VWindowItem>
        <VCard>
          <VCardText>
            <VAlert color="info" variant="tonal" class="mb-6">
                <div class="d-flex">
                    <VIcon icon="tabler-info-circle" class="me-2" />
                    <span>นโยบายเหล่านี้จะเป็นเงื่อนไขมาตรฐานสำหรับทุก Equipment Schedule ภายใต้สัญญานี้</span>
                </div>
            </VAlert>
            <VRow>
              <VCol cols="12" md="6">
                <h4 class="font-weight-bold mb-2">Early Termination Policy</h4>
                <VTextarea v-model="mla.earlyTerminationPolicy" rows="6" hide-details />
                <div class="text-caption mt-2 text-error">
                    * ค่าปรับยกเลิกก่อนกำหนด = PV ของค่าเช่าที่เหลือ × Discount Factor
                </div>
              </VCol>
              <VCol cols="12" md="6">
                <h4 class="font-weight-bold mb-2">Return Condition (Fair Wear & Tear)</h4>
                <VTextarea v-model="mla.returnConditionPolicy" rows="6" hide-details />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VWindowItem>

      <!-- Tab 3: Equipment Schedules -->
      <VWindowItem>
        <VCard>
            <VCardTitle class="d-flex align-center justify-space-between py-4 px-6">
                <span>Attached Equipment Schedules</span>
                <VBtn color="primary" size="small" prepend-icon="tabler-plus" @click="router.push(`/equipment-schedules/new?mla=${mla.id}`)">
                    เพิ่ม Schedule ใหม่
                </VBtn>
            </VCardTitle>
            <VDivider />
            <VTable>
                <thead>
                    <tr>
                        <th class="text-left">เลขที่ Schedule</th>
                        <th class="text-center">Asset / ประเภท</th>
                        <th class="text-center">วันที่ (เริ่ม - จบ)</th>
                        <th class="text-right">ค่าเช่า/เดือน (Inc VAT)</th>
                        <th class="text-center">สถานะ</th>
                        <th class="text-center">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="sch in mockSchedules" :key="sch.id">
                        <td class="font-weight-medium">{{ sch.no }}</td>
                        <td class="text-center">{{ sch.assets }} คัน ({{ sch.type }})</td>
                        <td class="text-center text-caption">{{ sch.start }} - {{ sch.end }}</td>
                        <td class="text-right font-weight-bold">{{ new Intl.NumberFormat('th-TH').format(sch.rent) }}</td>
                        <td class="text-center">
                            <VChip size="x-small" color="success">{{ sch.status }}</VChip>
                        </td>
                        <td class="text-center">
                            <VBtn icon variant="text" size="small"><VIcon icon="tabler-file-search" /></VBtn>
                        </td>
                    </tr>
                </tbody>
            </VTable>
        </VCard>
      </VWindowItem>

      <!-- Tab 4: Financials -->
      <VWindowItem>
          <div class="pa-1">
              <ContractFinancials v-if="mla.id" :contract-id="mla.id" />
          </div>
      </VWindowItem>

      <!-- Tab 5: Approval Workflow -->
      <VWindowItem>
        <VCard>
          <VCardText>
            <VTimeline side="end" align="start" truncate-line="both">
                <VTimelineItem color="primary" size="small" fill-dot>
                    <template #opposite>
                        <div class="text-caption">{{ mla.createdAt }}</div>
                    </template>
                    <div class="font-weight-bold">Created MLA Draft</div>
                    <div class="text-caption">By {{ mla.createdBy }}</div>
                </VTimelineItem>

                <VTimelineItem v-if="mla.submittedAt" color="orange" size="small" fill-dot>
                    <template #opposite>
                        <div class="text-caption">{{ mla.submittedAt }}</div>
                    </template>
                    <div class="font-weight-bold">Submitted for Approval</div>
                    <div class="text-caption">By {{ mla.submittedBy }}</div>
                </VTimelineItem>

                <VTimelineItem v-if="mla.approvedAt" color="success" size="small" fill-dot>
                    <template #opposite>
                        <div class="text-caption">{{ mla.approvedAt }}</div>
                    </template>
                    <div class="font-weight-bold">MLA Approved</div>
                    <div class="text-caption">By {{ mla.approvedBy }}</div>
                </VTimelineItem>
            </VTimeline>

            <div class="mt-8 d-flex justify-center gap-4" v-if="mla.status === 'PENDING_APPROVAL'">
                <VBtn color="success" prepend-icon="tabler-check" @click="approve">อนุมัติสัญญา</VBtn>
                <VBtn color="error" variant="outlined" prepend-icon="tabler-x">ปฏิเสธ</VBtn>
            </div>
          </VCardText>
        </VCard>
      </VWindowItem>

      <!-- Tab 6: Documents -->
      <VWindowItem>
        <VCard>
            <VCardText>
                <div class="d-flex justify-space-between align-center mb-6">
                    <h3 class="text-h6 font-weight-bold">เอกสารแนบท้ายสัญญา</h3>
                    <VBtn color="primary" variant="tonal" prepend-icon="tabler-upload">อัปโหลดเอกสาร</VBtn>
                </div>
                <VList variant="flat" border rounded>
                    <VListItem v-for="i in 3" :key="i" class="py-3">
                         <template #prepend>
                            <VAvatar color="primary" variant="tonal" rounded><VIcon icon="tabler-file-text" /></VAvatar>
                        </template>
                        <VListItemTitle class="font-weight-bold">MLA_Signed_Draft_v{{ i }}.pdf</VListItemTitle>
                        <VListItemSubtitle>Uploaded on 2024-03-01 | Size: 2.4 MB</VListItemSubtitle>
                        <template #append>
                            <VBtn icon variant="text" size="small"><VIcon icon="tabler-download" /></VBtn>
                            <VBtn icon variant="text" size="small" color="error"><VIcon icon="tabler-trash" /></VBtn>
                        </template>
                    </VListItem>
                </VList>
            </VCardText>
        </VCard>
      </VWindowItem>
    </VWindow>
  </div>
</template>

<style scoped>
.workflow-bar {
    border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}
.active-step {
    border-bottom: 3px solid rgb(var(--v-theme-primary));
}
.cursor-pointer {
  cursor: pointer;
}
</style>
