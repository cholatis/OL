<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMasterDataStore } from '@/stores/masterData'
import type { MaintenancePack } from '@/types/master-data'

const route = useRoute()
const router = useRouter()
const masterDataStore = useMasterDataStore()

const pack = ref<MaintenancePack | null>(null)

onMounted(() => {
  if (route.params.id !== 'new') {
    const found = masterDataStore.maintenancePacks.find(p => p.id === route.params.id)
    if (found) pack.value = JSON.parse(JSON.stringify(found))
  } else {
    pack.value = {
      id: `PK-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      code: '',
      description: '',
      includesRepairs: true,
      includesServicing: true,
      includesTyres: true,
      includesRelief: true,
      includesRoadside: true,
      adminCostMonthly: 0,
      laborInsuranceMonthly: 0,
      laborMaintenanceMonthly: 0,
      laborReliefMonthly: 0,
      laborProcurementMonthly: 0,
      laborRoadsideMonthly: 0,
      isActive: true,
      updatedAt: new Date().toISOString()
    }
  }
})

const laborTotal = computed(() => {
  if (!pack.value) return 0
  return pack.value.laborInsuranceMonthly + pack.value.laborMaintenanceMonthly + 
         pack.value.laborReliefMonthly + pack.value.laborProcurementMonthly + 
         pack.value.laborRoadsideMonthly
})

const save = () => {
    if (!pack.value) return
    const idx = masterDataStore.maintenancePacks.findIndex(p => p.id === pack.value?.id)
    if (idx !== -1) masterDataStore.maintenancePacks[idx] = pack.value
    else masterDataStore.maintenancePacks.push(pack.value)
    router.push('/settings/maintenance-packs')
}
</script>

<template>
  <div v-if="pack">
    <VRow class="mb-4 align-center">
      <VCol cols="12" md="8">
        <div class="d-flex align-center">
          <VBtn icon variant="text" @click="router.back()"><VIcon icon="tabler-arrow-left" /></VBtn>
          <div class="ms-2">
            <h2 class="text-h4 font-weight-bold">
                {{ route.params.id === 'new' ? 'สร้าง Maintenance Pack ใหม่' : `แก้ไข Pack: ${pack.code}` }}
            </h2>
          </div>
        </div>
      </VCol>
      <VCol cols="12" md="4" class="text-md-right">
        <VBtn variant="tonal" color="secondary" class="me-2" @click="router.back()">ยกเลิก</VBtn>
        <VBtn color="primary" @click="save">บันทึก Pack</VBtn>
      </VCol>
    </VRow>

    <VRow>
      <VCol cols="12" md="6">
        <VCard title="Section 1: บริการที่รวมใน Pack" class="mb-6">
          <VCardText>
            <VRow>
                <VCol cols="12" md="4">
                    <VTextField v-model="pack.code" label="Pack Code*" placeholder="เช่น PD14" />
                </VCol>
                <VCol cols="12" md="8">
                    <VTextField v-model="pack.description" label="คำอธิบาย*" />
                </VCol>
            </VRow>

            <VDivider class="my-6" />
            
            <div class="d-flex flex-column gap-2">
                <VSwitch v-model="pack.includesRepairs" label="รวมค่าซ่อมแซม (Repairs)" color="primary" />
                <VSwitch v-model="pack.includesServicing" label="รวมค่าเช็คระยะ (Servicing)" color="primary" />
                <VSwitch v-model="pack.includesTyres" label="รวมค่าเปลี่ยนยาง (Tyres)" color="primary" />
                <VSwitch v-model="pack.includesRelief" label="รวมรถทดแทน (Relief Vehicle)" color="primary" />
                <VSwitch v-model="pack.includesRoadside" label="รวมบริการช่วยเหลือฉุกเฉิน (Roadside)" color="primary" />
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12" md="6">
        <VCard title="Section 2: Labor Costs & Admin">
            <VCardText>
                <VTable>
                    <thead>
                        <tr>
                            <th>รายการต้นทุน</th>
                            <th width="150">Monthly (฿)</th>
                            <th width="150" class="text-right">Total 60M</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Admin Cost (Fixed)</td>
                            <td><VTextField v-model.number="pack.adminCostMonthly" density="compact" hide-details type="number" /></td>
                            <td class="text-right">{{ (pack.adminCostMonthly * 60).toLocaleString() }} ฿</td>
                        </tr>
                        <tr>
                            <td>Labor: Insurance</td>
                            <td><VTextField v-model.number="pack.laborInsuranceMonthly" density="compact" hide-details type="number" /></td>
                            <td class="text-right">{{ (pack.laborInsuranceMonthly * 60).toLocaleString() }} ฿</td>
                        </tr>
                        <tr>
                            <td>Labor: Maintenance</td>
                            <td><VTextField v-model.number="pack.laborMaintenanceMonthly" density="compact" hide-details type="number" /></td>
                            <td class="text-right">{{ (pack.laborMaintenanceMonthly * 60).toLocaleString() }} ฿</td>
                        </tr>
                        <tr>
                            <td>Labor: Relief Vehicle</td>
                            <td><VTextField v-model.number="pack.laborReliefMonthly" density="compact" hide-details type="number" /></td>
                            <td class="text-right">{{ (pack.laborReliefMonthly * 60).toLocaleString() }} ฿</td>
                        </tr>
                        <tr>
                            <td>Labor: Procurement</td>
                            <td><VTextField v-model.number="pack.laborProcurementMonthly" density="compact" hide-details type="number" /></td>
                            <td class="text-right">{{ (pack.laborProcurementMonthly * 60).toLocaleString() }} ฿</td>
                        </tr>
                        <tr>
                            <td>Labor: Roadside</td>
                            <td><VTextField v-model.number="pack.laborRoadsideMonthly" density="compact" hide-details type="number" /></td>
                            <td class="text-right">{{ (pack.laborRoadsideMonthly * 60).toLocaleString() }} ฿</td>
                        </tr>
                        <tr class="bg-light font-weight-bold">
                            <td>TOTAL COST/MONTH</td>
                            <td>{{ (pack.adminCostMonthly + laborTotal).toLocaleString() }} ฿</td>
                            <td class="text-right text-h6 text-primary">{{ ((pack.adminCostMonthly + laborTotal) * 60).toLocaleString() }} ฿</td>
                        </tr>
                    </tbody>
                </VTable>
            </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
