<script setup lang="ts">
import { useQuotationStore } from '@/stores/quotation'
import { useCustomerStore } from '@/stores/customer'
import { useOLCalculator } from '@/composables/useOLCalculator'
import type { Quotation } from '@/types/quotation'

const route = useRoute()
const router = useRouter()
const quotationStore = useQuotationStore()
const customerStore = useCustomerStore()

const isNew = computed(() => route.params.id === 'new')
const quotationId = computed(() => (route.params as any).id as string)

const currentStep = ref(1)

const quotationInput = ref<Quotation>({
  id: '',
  quotationNo: 'AUTO-GEN',
  status: 'DRAFT',
  customerId: '',
  customerName: '',
  contactName: '',
  quotationDate: new Date().toISOString().split('T')[0],
  validUntil: '',
  assetModelId: '',
  assetModel: '',
  assetYear: 2024,
  assetCondition: 'NEW',
  assetCategory: 'CAR',
  insuranceGroup: 1,
  listPrice: 0,
  sellingPrice: 0,
  discount: 0,
  preVatPrice: 0,
  vatAmount: 0,
  registrationFee: 0,
  rstServiceFee: 0,
  onRoadPrice: 0,
  reclaimedVat: 0,
  netSellingPrice: 0,
  otdPrice: 0,
  isVatRegistered: true,
  contractTermMonths: 36,
  annualMileageKm: 20000,
  totalContractMileageKm: 0,
  paymentsInAdvance: 1,
  downPayment: 0,
  securityDeposit: 0,
  paymentFrequency: 'MONTHLY',
  paymentProfileCode: 'T01',
  maintenancePackCode: 'PD14',
  hireGroup: 'A',
  includeRepairs: false,
  includeServicing: false,
  servicingCount: 0,
  includeTyres: false,
  tyresSets: 0,
  includeReliefVehicle: false,
  includeRoadsideAssistance: false,
  services: [],
  baseRate: 3.5,
  margin: 1.5,
  totalRate: 5,
  residualValueThb: 0,
  residualValuePct: 0,
  rvWithVat: 0,
  rvNetVat: 0,
  calculationMode: 'WITHOUT_VAT',
  insurancePremium: 15000,
  totalDepreciation: 0,
  financeMaintenance: 0,
  financeProfit: 0,
  financialRentalMonthly: 0,
  maintenanceRentalMonthly: 0,
  totalRentalExclVat: 0,
  vatOnRental: 0,
  totalRentalInclVat: 0,
  totalContractValue: 0,
  createdAt: '',
  updatedAt: '',
})

// Initialize calculator
const calc = useOLCalculator(quotationInput)

// Sync derived values back to model periodically or before save
watchEffect(() => {
  quotationInput.value.preVatPrice = calc.preVatPrice.value
  quotationInput.value.vatAmount = calc.vatAmount.value
  quotationInput.value.onRoadPrice = calc.onRoadPrice.value
  quotationInput.value.netSellingPrice = calc.netSellingPrice.value
  quotationInput.value.totalContractMileageKm = calc.totalContractMileage.value
  quotationInput.value.residualValuePct = calc.residualValuePct.value
  quotationInput.value.financialRentalMonthly = calc.financialRentalMonthly.value
  quotationInput.value.maintenanceRentalMonthly = calc.maintenanceRentalMonthly.value
  quotationInput.value.totalRentalInclVat = calc.totalRentalInclVat.value
  quotationInput.value.totalContractValue = calc.totalContractValue.value
})

onMounted(async () => {
  if (!isNew.value) {
    await quotationStore.fetchQuotationById(quotationId.value)
    if (quotationStore.selectedQuotation) {
      quotationInput.value = { ...quotationStore.selectedQuotation }
    }
  }
})

const onCustomerChange = (id: string) => {
  const customer = customerStore.customers.find(c => c.id === id)
  if (customer) {
    quotationInput.value.customerName = customer.companyName
    quotationInput.value.contactName = customer.contactName
  }
}

const mockAssets = [
  { id: 'MOD-001', name: 'Toyota Hilux Revo Z Edition', price: 650000 },
  { id: 'MOD-002', name: 'Isuzu D-Max Spark', price: 580000 },
  { id: 'MOD-003', name: 'Honda Civic e:HEV', price: 1250000 },
]

const onAssetChange = (id: string) => {
  const asset = mockAssets.find(a => a.id === id)
  if (asset) {
    quotationInput.value.assetModel = asset.name
    quotationInput.value.listPrice = asset.price
    quotationInput.value.sellingPrice = asset.price
  }
}

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(val)
}

const saveDraft = async () => {
  await quotationStore.saveQuotation(quotationInput.value)
  router.push('/quotations')
}
</script>

<template>
  <VRow>
    <!-- Left: Step Form -->
    <VCol cols="12" md="8">
      <div class="d-flex align-center mb-6">
        <VBtn icon variant="text" @click="router.back()"><VIcon icon="tabler-arrow-left" /></VBtn>
        <h2 class="text-h4 font-weight-bold ms-2">
          {{ isNew ? 'สร้างใบเสนอราคาใหม่' : `แก้ไขใบเสนอราคา ${quotationInput.quotationNo}` }}
        </h2>
      </div>

      <VStepper v-model="currentStep" class="mb-6">
        <template #default="{ step }">
          <VStepperHeader>
            <VStepperItem :value="1" title="Asset & Pricing" icon="tabler-car" />
            <VDivider />
            <VStepperItem :value="2" title="Contract" icon="tabler-calendar-time" />
            <VDivider />
            <VStepperItem :value="3" title="Services" icon="tabler-settings" />
            <VDivider />
            <VStepperItem :value="4" title="Finance & RV" icon="tabler-calculator" />
          </VStepperHeader>

          <VStepperWindow>
            <!-- Step 1: Asset & Pricing -->
            <VStepperWindowItem :value="1">
              <VCard flat>
                <VCardText>
                  <VRow>
                    <VCol cols="12">
                      <VAutocomplete
                        v-model="quotationInput.customerId"
                        label="ลูกค้า*"
                        :items="customerStore.customers"
                        item-title="companyName"
                        item-value="id"
                        @update:model-value="onCustomerChange"
                      />
                    </VCol>
                    <VCol cols="12" md="8">
                      <VAutocomplete
                        v-model="quotationInput.assetModelId"
                        label="เลือกรุ่นรถ/ทรัพย์สิน*"
                        :items="mockAssets"
                        item-title="name"
                        item-value="id"
                        @update:model-value="onAssetChange"
                      />
                    </VCol>
                    <VCol cols="12" md="4">
                      <VRadioGroup v-model="quotationInput.assetCondition" inline label="สภาพ">
                        <VRadio label="NEW" value="NEW" />
                        <VRadio label="USED" value="USED" />
                      </VRadioGroup>
                    </VCol>

                    <VCol cols="12" md="6">
                      <VTextField v-model.number="quotationInput.sellingPrice" label="ราคาเนื้อรถ (Selling Price)" type="number" prefix="฿" />
                    </VCol>
                    <VCol cols="12" md="6">
                      <VTextField v-model.number="quotationInput.discount" label="ส่วนลด (Discount)" type="number" prefix="฿" />
                    </VCol>

                    <VCol cols="12" md="4">
                        <VTextField v-model.number="quotationInput.registrationFee" label="ค่าจดทะเบียน" type="number" prefix="฿" />
                    </VCol>
                    <VCol cols="12" md="4">
                        <VTextField v-model.number="quotationInput.rstServiceFee" label="RST Service Fee" type="number" prefix="฿" />
                    </VCol>
                    <VCol cols="12" md="4" class="d-flex align-center">
                        <VSwitch v-model="quotationInput.isVatRegistered" label="VAT Registered (reclaimable)" color="primary" />
                    </VCol>
                    
                    <VCol cols="12">
                        <VTextField v-model.number="quotationInput.otdPrice" label="ราคา OTD (On The Door)" type="number" prefix="฿" />
                    </VCol>
                  </VRow>
                </VCardText>
                <VCardActions>
                  <VSpacer />
                  <VBtn color="primary" @click="currentStep = 2">ถัดไป</VBtn>
                </VCardActions>
              </VCard>
            </VStepperWindowItem>

            <!-- Step 2: Contract Parameters -->
            <VStepperWindowItem :value="2">
              <VCard flat>
                <VCardText>
                  <VRow>
                    <VCol cols="12">
                      <label class="text-caption mb-2 d-block">ระยะเวลาการเช่า (Term months)</label>
                      <VChipGroup v-model="quotationInput.contractTermMonths" selected-class="bg-primary text-white" mandatory>
                        <VChip :value="12">12 เดือน</VChip>
                        <VChip :value="24">24 เดือน</VChip>
                        <VChip :value="36">36 เดือน</VChip>
                        <VChip :value="48">48 เดือน</VChip>
                        <VChip :value="60">60 เดือน</VChip>
                      </VChipGroup>
                    </VCol>

                    <VCol cols="12" md="6">
                        <VTextField v-model.number="quotationInput.annualMileageKm" label="เลขไมล์ต่อปี (Annual Mileage)" type="number" suffix="km/y" />
                        <div class="text-caption mt-1">ไมล์รวมทั้งสัญญา: {{ calc.totalContractMileage.value.toLocaleString() }} km</div>
                    </VCol>
                    
                    <VCol cols="12" md="6">
                        <VSelect v-model="quotationInput.paymentFrequency" label="ความถี่การจ่าย" :items="['MONTHLY', 'QUARTERLY', 'ANNUAL']" />
                    </VCol>

                    <VCol cols="12" md="6">
                        <VTextField v-model.number="quotationInput.downPayment" label="เงินดาวน์ (Down Payment)" type="number" prefix="฿" />
                    </VCol>
                    <VCol cols="12" md="6">
                        <VTextField v-model.number="quotationInput.securityDeposit" label="เงินมัดจำ (Security Deposit)" type="number" prefix="฿" />
                    </VCol>
                  </VRow>
                </VCardText>
                <VCardActions>
                  <VBtn variant="tonal" @click="currentStep = 1">ย้อนกลับ</VBtn>
                  <VSpacer />
                  <VBtn color="primary" @click="currentStep = 3">ถัดไป</VBtn>
                </VCardActions>
              </VCard>
            </VStepperWindowItem>

            <!-- Step 3: Services -->
            <VStepperWindowItem :value="3">
              <VCard flat>
                <VCardText>
                  <VRow>
                    <VCol cols="12" md="6">
                        <VSelect v-model="quotationInput.maintenancePackCode" label="Maintenance Pack" :items="['PD14', 'PD13', 'NONE']" />
                    </VCol>
                    <VCol cols="12" md="6">
                        <VSelect v-model="quotationInput.hireGroup" label="Hire Group" :items="['A', 'B', 'C', 'D']" />
                    </VCol>

                    <VCol cols="12" md="3">
                        <VSwitch v-model="quotationInput.includeRepairs" label="Repairs" color="primary" />
                    </VCol>
                    <VCol cols="12" md="3">
                        <VSwitch v-model="quotationInput.includeServicing" label="Servicing" color="primary" />
                    </VCol>
                    <VCol cols="12" md="3">
                        <VSwitch v-model="quotationInput.includeTyres" label="Tyres" color="primary" />
                    </VCol>
                    <VCol cols="12" md="3">
                        <VSwitch v-model="quotationInput.includeReliefVehicle" label="Relief Vehicle" color="primary" />
                    </VCol>

                    <VCol cols="12" md="6">
                        <VSelect v-model.number="quotationInput.insuranceGroup" label="Insurance Group (1-5)" :items="[1,2,3,4,5]" />
                    </VCol>
                    <VCol cols="12" md="6">
                        <VTextField v-model.number="quotationInput.insurancePremium" label="เบี้ยประกันต่อปี" type="number" prefix="฿" />
                    </VCol>
                  </VRow>
                </VCardText>
                <VCardActions>
                  <VBtn variant="tonal" @click="currentStep = 2">ย้อนกลับ</VBtn>
                  <VSpacer />
                  <VBtn color="primary" @click="currentStep = 4">ถัดไป</VBtn>
                </VCardActions>
              </VCard>
            </VStepperWindowItem>

            <!-- Step 4: Finance & RV -->
            <VStepperWindowItem :value="4">
              <VCard flat>
                <VCardText>
                  <VRow>
                    <VCol cols="12" md="4">
                        <VTextField v-model.number="quotationInput.baseRate" label="Base Rate (%)" readonly suffix="%" variant="filled" />
                    </VCol>
                    <VCol cols="12" md="4">
                        <VTextField v-model.number="quotationInput.margin" label="Margin (%)" type="number" suffix="%" />
                    </VCol>
                    <VCol cols="12" md="4">
                        <VTextField :model-value="calc.totalRate.value" label="Total Rate (%)" readonly suffix="%" variant="filled" />
                    </VCol>

                    <VCol cols="12">
                        <VDivider class="my-4" />
                    </VCol>

                    <VCol cols="12" md="6">
                        <VTextField v-model.number="quotationInput.residualValueThb" label="Residual Value (RV)" type="number" prefix="฿" />
                    </VCol>
                    <VCol cols="12" md="6" class="d-flex align-center">
                        <div class="text-h6 text-primary">
                            RV Percentage: {{ calc.residualValuePct.value.toFixed(1) }}%
                            <VChip v-if="quotationInput.residualValueThb > 0" size="x-small" color="orange" class="ms-2">Manual Override</VChip>
                        </div>
                    </VCol>
                  </VRow>
                </VCardText>
                <VCardActions>
                  <VBtn variant="tonal" @click="currentStep = 3">ย้อนกลับ</VBtn>
                  <VSpacer />
                  <VBtn color="success" prepend-icon="tabler-check" @click="saveDraft">เสร็จสิ้น</VBtn>
                </VCardActions>
              </VCard>
            </VStepperWindowItem>
          </VStepperWindow>
        </template>
      </VStepper>
    </VCol>

    <!-- Right: Calculation Panel -->
    <VCol cols="12" md="4">
      <div class="calculation-panel sticky-top">
        <VCard color="primary" variant="tonal" class="overflow-hidden">
          <VCardItem class="bg-primary text-white">
            <VCardTitle class="text-h6">💰 สรุปค่าเช่ารายเดือน</VCardTitle>
          </VCardItem>
          
          <VCardText class="mt-4">
            <div class="d-flex justify-space-between mb-2">
              <span class="text-medium-emphasis">Depreciation:</span>
              <span class="font-weight-medium">{{ formatCurrency(calc.depreciationMonthly.value) }}</span>
            </div>
            <div class="d-flex justify-space-between mb-2">
              <span class="text-medium-emphasis">Finance Profit:</span>
              <span class="font-weight-medium">{{ formatCurrency(calc.financeProfitMonthly.value) }}</span>
            </div>
            <div class="d-flex justify-space-between mb-2">
              <span class="text-medium-emphasis">Insurance:</span>
              <span class="font-weight-medium">{{ formatCurrency((quotationInput.insurancePremium / 12) || 0) }}</span>
            </div>
            
            <VDivider class="my-3" />

            <div class="d-flex justify-space-between mb-2">
              <span class="text-medium-emphasis">Financial Rental:</span>
              <span class="text-h6 font-weight-bold">{{ formatCurrency(calc.financialRentalMonthly.value) }}</span>
            </div>
            <div class="d-flex justify-space-between mb-2">
              <span class="text-medium-emphasis">Maintenance:</span>
              <span class="text-h6">{{ formatCurrency(calc.maintenanceRentalMonthly.value) }}</span>
            </div>

            <VDivider class="my-3 border-opacity-50" />

            <div class="d-flex justify-space-between mb-2">
              <span class="text-title">รวมก่อน VAT:</span>
              <span class="text-h6">{{ formatCurrency(calc.totalRentalExclVat.value) }}</span>
            </div>
            <div class="d-flex justify-space-between mb-2 text-caption">
              <span>VAT 7%:</span>
              <span>{{ formatCurrency(calc.vatOnRental.value) }}</span>
            </div>
            
            <div class="total-rental-box mt-4 p-4 rounded bg-primary text-white text-center">
                <div class="text-caption text-uppercase" style="letter-spacing: 1px;">💵 ค่าเช่ารวม / เดือน</div>
                <div class="text-h3 font-weight-bold">{{ formatCurrency(calc.totalRentalInclVat.value) }}</div>
            </div>

            <div class="mt-6">
                <div class="d-flex justify-space-between mb-1">
                    <span class="text-caption">มูลค่าสัญญารวม:</span>
                    <span class="font-weight-bold">{{ formatCurrency(calc.totalContractValue.value) }}</span>
                </div>
                <div class="d-flex justify-space-between">
                    <span class="text-caption">Residual Value:</span>
                    <span class="font-weight-bold text-success">{{ calc.residualValuePct.value.toFixed(1) }}%</span>
                </div>
            </div>
          </VCardText>
        </VCard>

        <div class="d-flex flex-column gap-3 mt-4">
            <VBtn block color="success" variant="flat" size="large" @click="saveDraft">บันทึกโครงการ</VBtn>
            <VBtn block color="secondary" variant="tonal">ส่งอนุมัติ (Pending)</VBtn>
            <VBtn block variant="text" prepend-icon="tabler-printer">พิมพ์ใบเสนอราคา (PDF)</VBtn>
        </div>
      </div>
    </VCol>
  </VRow>
</template>

<style scoped>
.sticky-top {
  position: sticky;
  top: 100px;
}
.total-rental-box {
    padding: 20px;
    background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgba(var(--v-theme-primary), 0.8) 100%);
}
.gap-3 {
    gap: 12px;
}
</style>
