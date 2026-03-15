<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMaintenanceStore } from '@/stores/maintenance'
import type { PMPlan, ChecklistItem } from '@/types/maintenance'

const route = useRoute()
const router = useRouter()
const maintenanceStore = useMaintenanceStore()

const plan = ref<PMPlan | null>(null)
const isNew = computed(() => route.params.id === 'new')

onMounted(() => {
  if (!isNew.value) {
    const found = maintenanceStore.pmPlans.find(p => p.id === route.params.id)
    if (found) {
      plan.value = JSON.parse(JSON.stringify(found))
    } else {
      router.push('/pm-plans')
    }
  } else {
    // Initialize empty plan
    plan.value = {
      id: `PM-PLAN-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      planCode: '',
      planName: '',
      assetCategory: 'SEDAN',
      intervalMonths: 6,
      checklistTemplate: [],
      estimatedDurationHours: 2,
      estimatedCost: 0,
      activeAssetCount: 0,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  }
})

const addChecklistItem = () => {
    if (plan.value) {
        plan.value.checklistTemplate.push({
            id: `CK-${Math.random().toString(36).substr(2, 5)}`,
            description: '',
            isRequired: true
        })
    }
}

const removeChecklistItem = (index: number) => {
    if (plan.value) {
        plan.value.checklistTemplate.splice(index, 1)
    }
}

const handleSave = () => {
    if (!plan.value) return
    
    const idx = maintenanceStore.pmPlans.findIndex(p => p.id === plan.value?.id)
    if (idx !== -1) {
        maintenanceStore.pmPlans[idx] = JSON.parse(JSON.stringify(plan.value))
    } else {
        maintenanceStore.pmPlans.push(JSON.parse(JSON.stringify(plan.value)))
    }
    router.push('/pm-plans')
}
</script>

<template>
  <div v-if="plan">
    <VRow class="mb-4 align-center">
      <VCol cols="12" md="8">
        <div class="d-flex align-center">
          <VBtn icon variant="text" @click="router.back()"><VIcon icon="tabler-arrow-left" /></VBtn>
          <div class="ms-2">
            <h2 class="text-h4 font-weight-bold">{{ isNew ? 'สร้างแผน PM ใหม่' : `แก้ไขแผน PM: ${plan.planCode}` }}</h2>
          </div>
        </div>
      </VCol>
      <VCol cols="12" md="4" class="text-md-right">
        <VBtn variant="tonal" color="secondary" class="me-2" @click="router.back()">ยกเลิก</VBtn>
        <VBtn color="primary" @click="handleSave">บันทึกแผน</VBtn>
      </VCol>
    </VRow>

    <VRow>
      <VCol cols="12" md="12">
        <VCard title="ข้อมูลพื้นฐานของแผน (Plan Information)" class="mb-6">
          <VCardText>
            <VRow>
                <VCol cols="12" md="3">
                    <VTextField v-model="plan.planCode" label="รหัสแผน*" placeholder="เช่น PM-CAMRY-A" />
                </VCol>
                <VCol cols="12" md="9">
                    <VTextField v-model="plan.planName" label="ชื่อแผนการบำรุงรักษา*" placeholder="เช่น การบำรุงรักษาเครื่องยนต์ทุก 10,000 กม." />
                </VCol>
                <VCol cols="12" md="3">
                    <VSelect v-model="plan.assetCategory" label="Asset Category*" :items="['SEDAN', 'SUV', 'TRUCK', 'VAN', 'EQUIPMENT']" />
                </VCol>
                <VCol cols="12" md="3">
                    <VTextField v-model="plan.assetModel" label="รุ่นที่ระบุ (ทิ้งว่างถ้าใช้ได้ทุกรุ่น)" placeholder="เช่น Camry HEV" />
                </VCol>
                <VCol cols="12" md="3">
                    <VSelect v-model="plan.intervalMonths" label="ความถี่ (เดือน)*" :items="[1, 3, 6, 12, 24]" />
                </VCol>
                <VCol cols="12" md="3" class="d-flex align-center">
                    <VSwitch v-model="plan.isActive" label="เปิดใช้งานแผน" hide-details color="success" />
                </VCol>
                <VCol cols="12" md="3">
                    <VTextField v-model.number="plan.estimatedDurationHours" label="ใช้เวลาประมาณ (ชม.)" type="number" />
                </VCol>
                <VCol cols="12" md="3">
                    <VTextField v-model.number="plan.estimatedCost" label="ประมาณการต้นทุน (฿)" type="number" prefix="฿" />
                </VCol>
            </VRow>
          </VCardText>
        </VCard>

        <VCard title="Checklist Template">
            <VCardText>
                <div class="d-flex justify-space-between align-center mb-4">
                    <div class="text-subtitle-1">รายการตรวจสอบมาตรฐาน ({{ plan.checklistTemplate.length }})</div>
                    <VBtn prepend-icon="tabler-plus" size="small" variant="tonal" @click="addChecklistItem">เพิ่มรายการ</VBtn>
                </div>

                <VTable>
                    <thead>
                        <tr>
                            <th width="50">#</th>
                            <th>รายละเอียดการตรวจสอบ / ขั้นตอนงาน*</th>
                            <th width="150">Required</th>
                            <th width="100" class="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, idx) in plan.checklistTemplate" :key="item.id">
                            <td>{{ idx + 1 }}</td>
                            <td>
                                <VTextField v-model="item.description" placeholder="ระบุสิ่งที่ช่างต้องตรวจสอบ..." hide-details density="compact" />
                            </td>
                            <td>
                                <VCheckbox v-model="item.isRequired" label="บังคับเช็ค" hide-details density="compact" color="error" />
                            </td>
                            <td class="text-center">
                                <VBtn icon="tabler-trash" size="x-small" variant="text" color="error" @click="removeChecklistItem(idx)" />
                            </td>
                        </tr>
                        <tr v-if="plan.checklistTemplate.length === 0">
                            <td colspan="4" class="text-center py-6 text-medium-emphasis">
                                ยั้งไม่มีรายการ Checklist กด "เพิ่มรายการ" เพื่อเริ่มต้น
                            </td>
                        </tr>
                    </tbody>
                </VTable>
            </VCardText>
        </VCard>

        <!-- Preview Assets -->
        <VCard title="Preview: Assets ที่เข้าเงื่อนไข" class="mt-6 border-dashed" variant="flat">
            <VCardText>
                <div class="text-caption mb-4">แสดงรายชื่อรถ/ทรัพย์สินที่จะได้รับแผนการ PM นี้โดยอัตโนมัติ (Mock data)</div>
                <VTable density="compact">
                    <thead>
                        <tr>
                            <th>Asset Tag</th>
                            <th>Serial Number</th>
                            <th>Customer</th>
                            <th>Last PM</th>
                            <th>Next Due</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="i in 3" :key="i">
                            <td>T-CAR-00{{ i }}</td>
                            <td>SN-2026-X000{{ i }}</td>
                            <td>Business Development Co.</td>
                            <td>15/09/2025</td>
                            <td class="font-weight-bold text-error">15/03/2026</td>
                        </tr>
                    </tbody>
                </VTable>
                
                <div class="d-flex justify-end mt-4">
                    <VBtn variant="tonal" color="error">
                        สร้าง Work Order PM สำหรับ Asset ที่ครบกำหนดแล้ว (Batch)
                    </VBtn>
                </div>
            </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style scoped>
.border-dashed {
    border: 1px dashed rgba(var(--v-border-color), 1) !important;
}
</style>
