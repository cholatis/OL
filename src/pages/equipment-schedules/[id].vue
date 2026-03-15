<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEquipmentScheduleStore } from '@/stores/equipment-schedule'
import { useContractStore } from '@/stores/contract'
import { useAssetStore } from '@/stores/asset'
import type { EquipmentSchedule, ScheduleItem } from '@/types/equipment-schedule'

const route = useRoute()
const router = useRouter()
const scheduleStore = useEquipmentScheduleStore()
const contractStore = useContractStore()
const assetStore = useAssetStore()

const id = computed(() => (route.params as any).id as string)
const isNew = computed(() => id.value === 'new')
const isSaving = ref(false)

const sch = ref<Partial<EquipmentSchedule>>({
  scheduleNo: 'SCH-2024-XXXXX',
  contractId: '',
  contractNo: '',
  lesseeId: '',
  lesseeName: '',
  scheduleDate: new Date().toISOString().split('T')[0],
  commencementDate: new Date().toISOString().split('T')[0],
  expiryDate: '',
  termMonths: 36,
  items: [],
  defaultEndOfTermOption: 'RETURN',
  status: 'DRAFT',
  notes: '',
  totalAssets: 0,
  financialRentalMonthly: 0,
  maintenanceRentalMonthly: 0,
  totalRentalExclVat: 0,
  totalRentalInclVat: 0,
  totalContractValue: 0,
})

onMounted(async () => {
  if (!isNew.value) {
    await scheduleStore.fetchScheduleById(id.value)
    if (scheduleStore.selectedSchedule) {
      sch.value = { ...scheduleStore.selectedSchedule, items: [...scheduleStore.selectedSchedule.items] }
    } else {
      router.push('/equipment-schedules')
    }
  }
})

// --- Auto-fill from MLA Selection ---
const onContractChange = (mlaId: string) => {
  const mla = contractStore.contracts.find(c => c.id === mlaId)
  if (mla) {
    sch.value.contractNo = mla.contractNo
    sch.value.lesseeId = mla.lesseeId
    sch.value.lesseeName = mla.lesseeName
    sch.value.termMonths = mla.contractTermMonths
    sch.value.defaultEndOfTermOption = mla.defaultEndOfTermOption
    calculateExpiry()
  }
}

const calculateExpiry = () => {
    if (!sch.value.commencementDate || !sch.value.termMonths) return
    const date = new Date(sch.value.commencementDate)
    date.setMonth(date.getMonth() + sch.value.termMonths)
    sch.value.expiryDate = date.toISOString().split('T')[0]
}

watch(() => sch.value.commencementDate, calculateExpiry)
watch(() => sch.value.termMonths, calculateExpiry)

// --- Asset Table Management ---
const addNewItem = () => {
  const newItem: ScheduleItem = {
    id: `ITEM-TEMP-${Date.now()}`,
    lineNo: (sch.value.items?.length || 0) + 1,
    assetModel: '',
    assetBrand: '',
    assetYear: 2024,
    assetCondition: 'NEW',
    assetCategory: 'CAR',
    listPrice: 0,
    sellingPrice: 0,
    discount: 0,
    onRoadPrice: 0,
    netSellingPrice: 0,
    residualValueThb: 0,
    residualValuePct: 0,
    totalDepreciation: 0,
    depreciationMonthly: 0,
    financeProfitMonthly: 0,
    insuranceMonthly: 0,
    financialRentalMonthly: 0,
    servicesMonthly: 0,
    maintenanceRentalMonthly: 0,
    totalRentalMonthly: 0,
    totalRentalInclVat: 0,
    includeRepairs: true,
    includeServicing: true,
    servicingCount: 0,
    includeTyres: false,
    tyresSets: 0,
    includeReliefVehicle: false,
    includeRoadsideAssistance: false,
    endOfTermOption: sch.value.defaultEndOfTermOption || 'RETURN',
    substitutions: []
  }
  sch.value.items?.push(newItem)
  recalculateAll()
}

const removeItem = (index: number) => {
    sch.value.items?.splice(index, 1)
    recalculateAll()
}

const duplicateItem = (index: number) => {
    const item = JSON.parse(JSON.stringify(sch.value.items?.[index]))
    item.id = `ITEM-TEMP-${Date.now()}`
    item.lineNo = (sch.value.items?.length || 0) + 1
    sch.value.items?.push(item)
    recalculateAll()
}

// --- Simplified Line Calculation (OL-PD14 logic mock) ---
const calculateLine = (item: ScheduleItem) => {
    const n = sch.value.termMonths || 36
    item.onRoadPrice = (item.listPrice - item.discount) * 1.07
    item.netSellingPrice = item.listPrice - item.discount // Reclaimed VAT case
    item.residualValuePct = item.netSellingPrice > 0 ? (item.residualValueThb / item.netSellingPrice) * 100 : 0
    item.totalDepreciation = item.netSellingPrice - (item.residualValueThb / 1.07)
    
    item.depreciationMonthly = item.totalDepreciation / n
    item.financeProfitMonthly = (item.netSellingPrice * 0.04 * (n/12)) / n // Mock 4% simple
    item.insuranceMonthly = 25000 / 12 // Mock
    
    item.financialRentalMonthly = item.depreciationMonthly + item.financeProfitMonthly + item.insuranceMonthly
    item.servicesMonthly = 3500 // Mock maintenance
    item.maintenanceRentalMonthly = item.servicesMonthly * 1.07
    
    item.totalRentalMonthly = item.financialRentalMonthly + item.servicesMonthly
    item.totalRentalInclVat = item.totalRentalMonthly * 1.07
}

const recalculateAll = () => {
    let totalAssets = 0
    let totalFin = 0
    let totalMaint = 0
    let totalExcl = 0
    let totalIncl = 0

    sch.value.items?.forEach(item => {
        calculateLine(item)
        totalAssets++
        totalFin += item.financialRentalMonthly
        totalMaint += item.maintenanceRentalMonthly
        totalExcl += item.totalRentalMonthly
        totalIncl += item.totalRentalInclVat
    })

    sch.value.totalAssets = totalAssets
    sch.value.financialRentalMonthly = totalFin
    sch.value.maintenanceRentalMonthly = totalMaint
    sch.value.totalRentalExclVat = totalExcl
    sch.value.totalRentalInclVat = totalIncl
    sch.value.totalContractValue = totalIncl * (sch.value.termMonths || 36)
}

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(val)
}

const save = async () => {
    isSaving.value = true
    recalculateAll()
    if (isNew.value) {
        await scheduleStore.createSchedule(sch.value)
    } else {
        await scheduleStore.updateSchedule(id.value, sch.value)
    }
    isSaving.value = false
    router.push('/equipment-schedules')
}
</script>

<template>
  <div v-if="sch" class="pb-16">
    <VRow class="mb-6 align-center">
      <VCol cols="12" md="6">
        <div class="d-flex align-center">
          <VBtn icon variant="text" @click="router.back()"><VIcon icon="tabler-arrow-left" /></VBtn>
          <h2 class="text-h4 font-weight-bold ms-2">{{ isNew ? 'สร้าง Schedule ใหม่' : sch.scheduleNo }}</h2>
        </div>
      </VCol>
      <VCol cols="12" md="6" class="text-md-right">
        <VBtn variant="tonal" color="secondary" class="me-2" @click="router.back()">ยกเลิก</VBtn>
        <VBtn color="primary" @click="save" :loading="isSaving">บันทึก Draft</VBtn>
      </VCol>
    </VRow>

    <!-- ZONE 1: Header Info -->
    <VCard class="mb-6">
      <VCardText>
        <VRow>
          <VCol cols="12" md="4">
            <VAutocomplete
              v-model="sch.contractId"
              label="เลือก MLA (Contract)*"
              :items="contractStore.contracts"
              item-title="contractNo"
              item-value="id"
              @update:model-value="onContractChange"
            />
          </VCol>
          <VCol cols="12" md="4">
            <VTextField v-model="sch.lesseeName" label="ลูกค้า (Lessee)" readonly variant="filled" />
          </VCol>
          <VCol cols="12" md="2">
            <VTextField v-model="sch.scheduleDate" label="วันที่ออก Schedule" type="date" />
          </VCol>
          <VCol cols="12" md="2">
            <VTextField v-model="sch.status" label="สถานะ" readonly variant="filled" />
          </VCol>

          <VCol cols="12" md="2">
            <VTextField v-model="sch.commencementDate" label="วันเริ่มเช่า*" type="date" />
          </VCol>
          <VCol cols="12" md="2">
            <VTextField v-model="sch.termMonths" label="ระยะเช่า (เดือน)" type="number" @input="recalculateAll" />
          </VCol>
          <VCol cols="12" md="2">
            <VTextField v-model="sch.expiryDate" label="วันสิ้นสุดสัญญา" readonly variant="filled" />
          </VCol>
          <VCol cols="12" md="3">
            <VRadioGroup v-model="sch.defaultEndOfTermOption" label="Default End-of-Term" inline class="mt-0">
                <VRadio label="Return" value="RETURN" />
                <VRadio label="Renew" value="RENEW" />
                <VRadio label="Purchase" value="PURCHASE" />
            </VRadioGroup>
          </VCol>
          <VCol cols="12" md="3">
            <VTextField v-model="sch.notes" label="หมายเหตุ" hide-details />
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <!-- ZONE 2: Asset Spreadsheet -->
    <VCard class="mb-6">
      <VCardTitle class="d-flex align-center justify-space-between py-4 px-6 bg-light">
          <div class="d-flex align-center">
            <VIcon icon="tabler-table" class="me-2" />
            <span class="text-h6 font-weight-bold">รายการสินทรัพย์ (Asset Items)</span>
          </div>
          <div class="d-flex gap-2">
            <VBtn color="info" size="small" variant="tonal" prepend-icon="tabler-file-download">นำเข้า Excel</VBtn>
            <VBtn color="primary" size="small" prepend-icon="tabler-plus" @click="addNewItem">เพิ่มรายการ</VBtn>
          </div>
      </VCardTitle>
      
      <div class="spreadsheet-container">
        <table class="spreadsheet-table">
            <thead>
                <tr>
                    <th rowspan="2">#</th>
                    <th rowspan="2" style="min-width: 180px;">Asset Model</th>
                    <th rowspan="2" style="min-width: 150px;">Serial Number</th>
                    <th colspan="3" class="text-center bg-gray-100">Pricing & RV</th>
                    <th colspan="3" class="text-center bg-blue-50">Monthly Finance Components</th>
                    <th colspan="3" class="text-center bg-green-50">Rental Summary</th>
                    <th rowspan="2" style="min-width: 130px;">End-of-Term</th>
                    <th rowspan="2">Actions</th>
                </tr>
                <tr>
                    <th style="min-width: 120px;">List Price</th>
                    <th style="min-width: 100px;">Discount</th>
                    <th style="min-width: 120px;">RV (฿)</th>
                    <!-- Finance -->
                    <th>Depr.</th>
                    <th>Profit</th>
                    <th>Ins.</th>
                    <!-- Rental -->
                    <th style="min-width: 120px;">Financial</th>
                    <th style="min-width: 100px;">Maint.</th>
                    <th style="min-width: 120px;" class="font-weight-bold">Total (Inc)</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in sch.items" :key="item.id">
                    <td class="text-center">{{ index + 1 }}</td>
                    <td>
                        <VAutocomplete
                            v-model="item.assetId"
                            :items="assetStore.assets"
                            item-title="model"
                            item-value="id"
                            density="compact"
                            hide-details
                            variant="plain"
                            @update:model-value="(val) => {
                                const a = assetStore.assets.find(x => x.id === val)
                                if (a) {
                                    item.assetModel = a.model
                                    item.assetBrand = a.brand
                                    item.assetYear = a.year
                                    item.assetCategory = a.category
                                    item.listPrice = a.purchaseCost
                                    item.residualValueThb = a.residualValueThb
                                    recalculateAll()
                                }
                            }"
                        />
                    </td>
                    <td>
                        <VTextField
                            v-model="item.serialNumber"
                            density="compact"
                            hide-details
                            variant="plain"
                            placeholder="Enter or select SN"
                        />
                    </td>
                    <!-- Pricing & RV -->
                    <td>
                        <VTextField v-model.number="item.listPrice" type="number" density="compact" hide-details variant="plain" @input="recalculateAll" />
                    </td>
                    <td>
                        <VTextField v-model.number="item.discount" type="number" density="compact" hide-details variant="plain" @input="recalculateAll" />
                    </td>
                    <td>
                        <VTextField v-model.number="item.residualValueThb" type="number" density="compact" hide-details variant="plain" @input="recalculateAll" />
                    </td>
                    <!-- Finance (Readonly) -->
                    <td class="text-right text-caption">{{ formatCurrency(item.depreciationMonthly) }}</td>
                    <td class="text-right text-caption">{{ formatCurrency(item.financeProfitMonthly) }}</td>
                    <td class="text-right text-caption">{{ formatCurrency(item.insuranceMonthly) }}</td>
                    <!-- Summary (Readonly) -->
                    <td class="text-right font-weight-medium">{{ formatCurrency(item.financialRentalMonthly) }}</td>
                    <td class="text-right font-weight-medium">{{ formatCurrency(item.maintenanceRentalMonthly) }}</td>
                    <td class="text-right font-weight-bold text-primary">{{ formatCurrency(item.totalRentalInclVat) }}</td>
                    
                    <td>
                        <VSelect
                            v-model="item.endOfTermOption"
                            :items="['RETURN', 'RENEW', 'PURCHASE']"
                            density="compact"
                            hide-details
                            variant="plain"
                        />
                    </td>
                    <td>
                        <div class="d-flex">
                            <VBtn icon="tabler-copy" size="x-small" variant="text" color="info" @click="duplicateItem(index)" />
                            <VBtn icon="tabler-trash" size="x-small" variant="text" color="error" @click="removeItem(index)" />
                        </div>
                    </td>
                </tr>
                <tr v-if="!sch.items?.length">
                    <td colspan="14" class="text-center py-8 text-disabled italic">
                        No assets added. Click "เพิ่มรายการ" to start.
                    </td>
                </tr>
            </tbody>
        </table>
      </div>
    </VCard>

    <!-- ZONE 3: Sticky Summary Footer -->
    <div class="summary-footer bg-surface border-t elevation-10">
        <div class="container-fluid px-6 py-4">
            <VRow align="center">
                <VCol cols="12" md="4" class="d-flex align-center">
                    <div class="me-6">
                        <div class="text-caption">จำนวน Asset ทั้งหมด</div>
                        <div class="text-h4 font-weight-bold text-primary">{{ sch.totalAssets }} คัน</div>
                    </div>
                    <div class="border-s ps-6">
                        <div class="text-caption">มูลค่าสัญญา (Inc VAT)</div>
                        <div class="text-h5 font-weight-bold">{{ formatCurrency(sch.totalContractValue || 0) }}</div>
                    </div>
                </VCol>
                <VCol cols="12" md="5">
                    <div class="d-flex justify-space-around">
                        <div>
                            <div class="text-caption text-medium-emphasis">Financial Rental</div>
                            <div class="text-h6 font-weight-medium">{{ formatCurrency(sch.financialRentalMonthly || 0) }}</div>
                        </div>
                        <div>
                            <div class="text-caption text-medium-emphasis">Maintenance Rental</div>
                            <div class="text-h6 font-weight-medium">{{ formatCurrency(sch.maintenanceRentalMonthly || 0) }}</div>
                        </div>
                        <div class="text-right">
                            <div class="text-caption text-medium-emphasis">VAT (7%)</div>
                            <div class="text-h6 font-weight-medium">{{ formatCurrency((sch.totalRentalExclVat || 0) * 0.07) }}</div>
                        </div>
                    </div>
                </VCol>
                <VCol cols="12" md="3" class="text-right d-flex flex-column align-end">
                    <div class="text-caption font-weight-bold text-success">ค่าเช่ารวม (Inc VAT)</div>
                    <div class="text-h3 font-weight-bold text-success mb-1">{{ formatCurrency(sch.totalRentalInclVat || 0) }}</div>
                    <div class="text-caption">/ เดือน</div>
                </VCol>
            </VRow>
        </div>
    </div>
  </div>
</template>

<style scoped>
.spreadsheet-container {
    overflow-x: auto;
    width: 100%;
}
.spreadsheet-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
}
.spreadsheet-table th, .spreadsheet-table td {
    border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    padding: 8px;
    white-space: nowrap;
}
.spreadsheet-table thead th {
    background: rgba(var(--v-theme-surface), 1);
    position: sticky;
    top: 0;
    z-index: 10;
}
.bg-gray-100 { background-color: rgba(var(--v-theme-on-surface), 0.05); }
.bg-blue-50 { background-color: rgba(var(--v-theme-info), 0.05); }
.bg-green-50 { background-color: rgba(var(--v-theme-success), 0.05); }

.summary-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
}

:deep(.v-field--variant-plain .v-field__input) {
    padding: 0;
    min-height: auto;
    text-align: inherit;
}

.spreadsheet-table tr:hover {
    background-color: rgba(var(--v-theme-primary), 0.02);
}
</style>
