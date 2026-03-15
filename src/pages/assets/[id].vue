<script setup lang="ts">
import { useAssetStore } from '@/stores/asset'
import type { Asset } from '@/types/asset'

const route = useRoute()
const router = useRouter()
const assetStore = useAssetStore()

const id = computed(() => (route.params as any).id as string)
const asset = ref<Asset | null>(null)
const activeTab = ref(0)

onMounted(async () => {
  const found = await assetStore.fetchAssetById(id.value)
  if (found) {
    asset.value = { ...found }
  } else {
    router.push('/assets')
  }
})

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(val)
}

const mockLeaseHistory = [
  { no: 'MLA-2024-05', customer: 'บริษัท สยาม โกลบอล เทค จำกัด', start: '2024-01-01', end: '2027-12-31', rent: 18500, status: 'ACTIVE' },
  { no: 'MLA-2021-02', customer: 'บริษัท ไทย มอเตอร์ จำกัด', start: '2021-01-01', end: '2023-12-31', rent: 17000, status: 'COMPLETED' },
]

const mockMaintenanceHistory = [
  { date: '2024-03-05', type: 'PM', desc: 'เปลี่ยนถ่ายน้ำมันเครื่อง 50,000 km', cost: 1500, result: 'PASS', technician: 'สมยศ' },
  { date: '2023-09-10', type: 'Corrective', desc: 'เปลี่ยนแบตเตอรี่', cost: 3500, result: 'PASS', technician: 'วิชัย' },
]

const categories = ['CAR', 'COMMERCIAL', 'EQUIPMENT', 'OTHER']
const statuses = ['AVAILABLE', 'ACTIVE', 'MAINTENANCE', 'RETURNED', 'DAMAGED', 'DISPOSED']
</script>

<template>
  <div v-if="asset">
    <VRow class="mb-6 align-center">
      <VCol cols="12" md="6">
        <div class="d-flex align-center">
          <VBtn icon variant="text" @click="router.back()"><VIcon icon="tabler-arrow-left" /></VBtn>
          <h2 class="text-h4 font-weight-bold ms-2">{{ asset.assetCode }} - {{ asset.brand }} {{ asset.model }}</h2>
        </div>
      </VCol>
    </VRow>

    <VTabs v-model="activeTab" class="v-tabs-pill mb-6">
      <VTab prepend-icon="tabler-box">ข้อมูลทรัพย์สิน</VTab>
      <VTab prepend-icon="tabler-file-text">ประวัติสัญญา</VTab>
      <VTab prepend-icon="tabler-tool">ประวัติบำรุงรักษา</VTab>
    </VTabs>

    <VWindow v-model="activeTab">
      <!-- Tab 1: Asset Info -->
      <VWindowItem>
        <VRow>
          <VCol cols="12" md="8">
            <VCard title="Physical & Manufacturer Details">
              <VCardText>
                <VRow>
                  <VCol cols="12" md="6">
                    <VTextField v-model="asset.assetCode" label="Asset Code" readonly variant="filled" />
                  </VCol>
                  <VCol cols="12" md="6">
                    <VTextField v-model="asset.assetTag" label="Asset Tag" />
                  </VCol>
                  <VCol cols="12" md="6">
                    <VTextField v-model="asset.serialNumber" label="Serial Number (VIN)*" />
                  </VCol>
                  <VCol cols="12" md="3">
                    <VTextField v-model="asset.brand" label="Brand*" />
                  </VCol>
                  <VCol cols="12" md="3">
                    <VTextField v-model="asset.model" label="Model*" />
                  </VCol>
                  <VCol cols="12" md="4">
                    <VTextField v-model.number="asset.year" label="Year*" type="number" />
                  </VCol>
                  <VCol cols="12" md="4">
                    <VSelect v-model="asset.category" label="Category*" :items="categories" />
                  </VCol>
                  <VCol cols="12" md="4">
                    <VTextField v-model="asset.color" label="Color" />
                  </VCol>
                  <VCol cols="12">
                    <VTextarea v-model="asset.notes" label="Notes" rows="2" />
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>

            <VCard title="Insurance & Warranty" class="mt-6">
              <VCardText>
                <VRow>
                  <VCol cols="12" md="4">
                    <VTextField v-model="asset.insurancePolicyNo" label="Insurance Policy No" />
                  </VCol>
                  <VCol cols="12" md="4">
                    <VTextField v-model="asset.insuranceProvider" label="Provider" />
                  </VCol>
                  <VCol cols="12" md="4">
                    <VTextField v-model="asset.insuranceExpiry" label="Insurance Expiry" type="date" />
                  </VCol>
                  <VCol cols="12" md="6">
                    <VTextField v-model="asset.warrantyExpiry" label="Warranty Expiry" type="date" />
                  </VCol>
                  <VCol cols="12" md="6">
                    <VTextField v-model="asset.currentSite" label="Current Site / Location" />
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12" md="4">
            <VCard title="Financial Status">
              <VCardText>
                <div class="mb-4">
                  <VSelect v-model="asset.status" label="Current Status" :items="statuses" />
                </div>
                <VDivider class="my-4" />
                <div class="d-flex justify-space-between mb-2">
                  <span class="text-caption">Purchase Cost:</span>
                  <span class="font-weight-bold">{{ formatCurrency(asset.purchaseCost) }}</span>
                </div>
                <div class="d-flex justify-space-between mb-2">
                  <span class="text-caption">Book Value:</span>
                  <span class="font-weight-bold text-primary">{{ formatCurrency(asset.currentBookValue) }}</span>
                </div>
                <div class="d-flex justify-space-between mb-4">
                  <span class="text-caption">Residual Value (Est):</span>
                  <span class="font-weight-bold text-success">{{ formatCurrency(asset.residualValueThb) }}</span>
                </div>
                <VProgressLinear
                  :model-value="asset.residualValuePct"
                  color="success"
                  height="10"
                  rounded
                />
                <div class="text-right text-caption mt-1">RV: {{ asset.residualValuePct }}%</div>
              </VCardText>
            </VCard>

            <VCard v-if="asset.status === 'ACTIVE'" class="mt-6 border-primary border-opacity-50" elevation="0">
              <VCardText>
                <div class="text-h6 text-primary mb-2">Current Lease</div>
                <div class="text-body-2 font-weight-bold">{{ asset.currentLesseeName }}</div>
                <div class="text-caption">สัญญา: {{ asset.currentContractId }}</div>
                <div class="text-caption">{{ asset.leaseStartDate }} - {{ asset.leaseEndDate }}</div>
                <VBtn block color="primary" variant="tonal" class="mt-4" size="small">ดูสัญญาฉบับนี้</VBtn>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VWindowItem>

      <!-- Tab 2: Lease History -->
      <VWindowItem>
        <VCard>
          <VTable>
            <thead>
              <tr>
                <th>เลขสัญญา</th>
                <th>ลูกค้า</th>
                <th>วันเริ่มสัญญา</th>
                <th>วันสิ้นสุดสัญญา</th>
                <th>ค่าเช่า/เดือน</th>
                <th>สถานะ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="lease in mockLeaseHistory" :key="lease.no">
                <td><span class="text-primary font-weight-medium">{{ lease.no }}</span></td>
                <td>{{ lease.customer }}</td>
                <td>{{ lease.start }}</td>
                <td>{{ lease.end }}</td>
                <td>{{ formatCurrency(lease.rent) }}</td>
                <td>
                  <VChip :color="lease.status === 'ACTIVE' ? 'success' : 'secondary'" size="x-small" label>
                    {{ lease.status }}
                  </VChip>
                </td>
              </tr>
            </tbody>
          </VTable>
        </VCard>
      </VWindowItem>

      <!-- Tab 3: Maintenance History -->
      <VWindowItem>
        <VCard>
          <VTable>
            <thead>
              <tr>
                <th>วันที่</th>
                <th>ประเภท</th>
                <th>รายละเอียด</th>
                <th>ค่าใช้จ่าย</th>
                <th>ผลลัพธ์</th>
                <th>ช่าง</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="maint in mockMaintenanceHistory" :key="maint.date">
                <td>{{ maint.date }}</td>
                <td><VChip variant="tonal" size="x-small">{{ maint.type }}</VChip></td>
                <td>{{ maint.desc }}</td>
                <td>{{ formatCurrency(maint.cost) }}</td>
                <td><VChip :color="maint.result === 'PASS' ? 'success' : 'error'" size="x-small">{{ maint.result }}</VChip></td>
                <td>{{ maint.technician }}</td>
              </tr>
            </tbody>
          </VTable>
        </VCard>
      </VWindowItem>
    </VWindow>

    <!-- Bottom Actions -->
    <div class="d-flex justify-end mt-8 gap-4 px-4 py-4 sticky-bottom bg-background">
      <VBtn color="secondary" variant="tonal" @click="router.back()">กลับ</VBtn>
      <VBtn color="primary" prepend-icon="tabler-device-floppy">บันทึกการแก้ไข</VBtn>
    </div>
  </div>
</template>

<style scoped>
.sticky-bottom {
  position: sticky;
  bottom: 0;
  z-index: 5;
  border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}
.gap-4 {
    gap: 16px;
}
</style>
