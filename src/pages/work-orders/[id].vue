<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMaintenanceStore } from '@/stores/maintenance'
import type { WorkOrder, ChecklistItem, Part } from '@/types/maintenance'

const route = useRoute()
const router = useRouter()
const maintenanceStore = useMaintenanceStore()

const activeTab = ref(0)
const wo = ref<WorkOrder | null>(null)
const isNew = computed(() => route.params.id === 'new')

// Tab 3: Parts management
const newPart = ref<Part>({ partNo: '', partName: '', quantity: 1, unitCost: 0, totalCost: 0 })

onMounted(async () => {
  if (!isNew.value) {
    const found = maintenanceStore.workOrders.find(w => w.id === route.params.id)
    if (found) {
      wo.value = JSON.parse(JSON.stringify(found)) // Deep copy
    } else {
      router.push('/work-orders')
    }
  } else {
    // Initialize empty WO
    wo.value = {
      id: `WO-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      workOrderNo: `WO-2026-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`,
      type: 'CM',
      status: 'OPEN',
      priority: 'MEDIUM',
      assetId: '',
      assetTag: '',
      serialNumber: '',
      assetModel: '',
      assetBrand: '',
      contractId: '',
      contractNo: '',
      lesseeId: '',
      lesseeName: '',
      siteAddress: '',
      reportedBy: '',
      reportedAt: new Date().toISOString(),
      scheduledDate: new Date().toISOString().split('T')[0],
      scheduledTimeSlot: '09:00-12:00',
      problemDescription: '',
      workDescription: '',
      checklistItems: [],
      partsUsed: [],
      laborCost: 0,
      partsCost: 0,
      totalCost: 0,
      beforePhotos: [],
      afterPhotos: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  }
})

const checklistProgress = computed(() => {
  if (!wo.value || wo.value.checklistItems.length === 0) return 0
  const completed = wo.value.checklistItems.filter(i => i.result).length
  return Math.round((completed / wo.value.checklistItems.length) * 100)
})

const addPart = () => {
    if (wo.value && newPart.value.partName) {
        newPart.value.totalCost = newPart.value.quantity * newPart.value.unitCost
        wo.value.partsUsed.push({ ...newPart.value })
        calculateTotals()
        newPart.value = { partNo: '', partName: '', quantity: 1, unitCost: 0, totalCost: 0 }
    }
}

const removePart = (index: number) => {
    if (wo.value) {
        wo.value.partsUsed.splice(index, 1)
        calculateTotals()
    }
}

const calculateTotals = () => {
    if (wo.value) {
        wo.value.partsCost = wo.value.partsUsed.reduce((acc, p) => acc + p.totalCost, 0)
        wo.value.totalCost = wo.value.partsCost + wo.value.laborCost
    }
}

const handleAction = async (action: string) => {
    if (!wo.value) return
    
    if (action === 'ASSIGN') {
        await maintenanceStore.assignTechnician(wo.value.id, 'TECH-001', 'Somsak Mechanic', wo.value.scheduledDate)
        wo.value.status = 'ASSIGNED'
    } else if (action === 'START') {
        await maintenanceStore.startWork(wo.value.id)
        wo.value.status = 'IN_PROGRESS'
    } else if (action === 'COMPLETE') {
        await maintenanceStore.completeWork(wo.value.id, wo.value.result || 'PASS', wo.value.resultNote || '')
        wo.value.status = 'COMPLETED'
        router.push('/work-orders')
    } else if (action === 'SAVE') {
        // Mock save
        const idx = maintenanceStore.workOrders.findIndex(w => w.id === wo.value?.id)
        if (idx !== -1) {
            maintenanceStore.workOrders[idx] = JSON.parse(JSON.stringify(wo.value))
        } else {
            maintenanceStore.workOrders.push(JSON.parse(JSON.stringify(wo.value)))
        }
        router.push('/work-orders')
    }
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    OPEN: 'secondary',
    ASSIGNED: 'primary',
    IN_PROGRESS: 'info',
    PENDING_PARTS: 'warning',
    COMPLETED: 'success',
    CANCELLED: 'grey'
  }
  return colors[status] || 'grey'
}
</script>

<template>
  <div v-if="wo">
    <VRow class="mb-4 align-center">
      <VCol cols="12" md="8">
        <div class="d-flex align-center">
          <VBtn icon variant="text" @click="router.back()"><VIcon icon="tabler-arrow-left" /></VBtn>
          <div class="ms-2">
            <h2 class="text-h4 font-weight-bold">{{ isNew ? 'สร้างใบสั่งซ่อมใหม่' : `ใบสั่งซ่อม ${wo.workOrderNo}` }}</h2>
            <div class="d-flex align-center mt-1">
                <VChip :color="getStatusColor(wo.status)" size="x-small" label class="me-2 text-uppercase font-weight-bold">
                    {{ wo.status }}
                </VChip>
                <span class="text-caption text-medium-emphasis">สร้างเมื่อ: {{ wo.createdAt }}</span>
            </div>
          </div>
        </div>
      </VCol>
      <VCol cols="12" md="4" class="text-md-right">
        <template v-if="wo.status === 'OPEN'">
            <VBtn variant="tonal" color="secondary" class="me-2" @click="handleAction('SAVE')">บันทึกร่าง</VBtn>
            <VBtn color="primary" @click="handleAction('ASSIGN')">มอบหมายช่าง (Assign)</VBtn>
        </template>
        <template v-if="wo.status === 'ASSIGNED'">
            <VBtn color="info" prepend-icon="tabler-play" @click="handleAction('START')">เริ่มงาน (Start Work)</VBtn>
        </template>
        <template v-if="wo.status === 'IN_PROGRESS'">
            <VBtn color="success" prepend-icon="tabler-check" @click="handleAction('COMPLETE')">ปิดงาน (Complete)</VBtn>
        </template>
      </VCol>
    </VRow>

    <VTabs v-model="activeTab" class="mb-6 border-b">
      <VTab :value="0">ข้อมูลงาน</VTab>
      <VTab :value="1">Checklist ({{ checklistProgress }}%)</VTab>
      <VTab :value="2">ต้นทุน & รูปภาพ</VTab>
      <VTab :value="3">ผลลัพธ์</VTab>
    </VTabs>

    <VWindow v-model="activeTab">
      <!-- Tab 1: Work Info -->
      <VWindowItem :value="0">
        <VRow>
          <VCol cols="12" md="8">
            <VCard title="รายละเอียดทรัพย์สิน และปัญหา" class="mb-6">
              <VCardText>
                <VRow>
                    <VCol cols="12" md="6">
                        <VTextField v-model="wo.assetModel" label="Asset Model*" placeholder="เช่น Toyota Camry" />
                    </VCol>
                    <VCol cols="12" md="6">
                        <VTextField v-model="wo.serialNumber" label="Serial Number*" placeholder="เลขตัวถัง / Serial No." />
                    </VCol>
                    <VCol cols="12">
                        <VTextField v-model="wo.lesseeName" label="ลูกค้า (Lessee)*" />
                    </VCol>
                    <VCol cols="12">
                        <VTextarea v-model="wo.siteAddress" label="สถานที่ปฏิบัติงาน (Site Address)" rows="2" />
                    </VCol>
                    <VDivider class="my-4" />
                    <VCol cols="12" md="6">
                        <VSelect v-model="wo.type" label="ประเภทงาน*" :items="['PM', 'CM', 'EMERGENCY', 'INSPECTION']" />
                    </VCol>
                    <VCol cols="12" md="6">
                        <VSelect v-model="wo.priority" label="Priority*" :items="['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']" />
                    </VCol>
                    <VCol cols="12">
                        <VTextarea v-model="wo.problemDescription" label="อาการ / ปัญหาที่รายงาน*" rows="3" />
                    </VCol>
                </VRow>
              </VCardText>
            </VCard>

            <VCard title="การนัดหมาย (Scheduling)">
                <VCardText>
                    <VRow>
                        <VCol cols="12" md="6">
                            <VTextField v-model="wo.scheduledDate" label="วันที่นัด*" type="date" />
                        </VCol>
                        <VCol cols="12" md="6">
                            <VSelect v-model="wo.scheduledTimeSlot" label="ช่วงเวลา*" :items="['09:00-12:00', '13:00-17:00', 'ASAP']" />
                        </VCol>
                        <VCol cols="12">
                            <VTextField v-model="wo.technicianName" label="ช่างผู้รับผิดชอบ" readonly placeholder="จะปรากฏเมื่อ Assign แล้ว" />
                        </VCol>
                    </VRow>
                </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12" md="4">
            <VCard class="mb-6 bg-light" variant="flat">
                <VCardText>
                    <div class="text-subtitle-2 mb-4">Asset Quick Info</div>
                    <div class="d-flex mb-3">
                        <VAvatar color="primary" variant="tonal" size="48" class="me-3">
                            <VIcon icon="tabler-car" />
                        </VAvatar>
                        <div>
                            <div class="font-weight-bold">{{ wo.assetModel || '---' }}</div>
                            <div class="text-caption">SN: {{ wo.serialNumber || '---' }}</div>
                        </div>
                    </div>
                    <VDivider class="mb-4" />
                    <div class="d-flex justify-space-between mb-2">
                        <span class="text-caption">Warranty Exp:</span>
                        <span class="text-body-2 font-weight-medium">30/06/2027</span>
                    </div>
                    <div class="d-flex justify-space-between mb-2">
                        <span class="text-caption">Last PM:</span>
                        <span class="text-body-2 font-weight-medium text-success">15/09/2025</span>
                    </div>
                    <div class="d-flex justify-space-between">
                        <span class="text-caption">Next PM:</span>
                        <span class="text-body-2 font-weight-bold text-warning">15/03/2026</span>
                    </div>
                </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VWindowItem>

      <!-- Tab 2: Checklist -->
      <VWindowItem :value="1">
        <VCard>
            <VCardText>
                <div class="d-flex align-center justify-space-between mb-4">
                    <div class="text-h6">Work Checklist</div>
                    <div class="w-25">
                        <div class="text-caption text-right mb-1">Progress: {{ checklistProgress }}%</div>
                        <VProgressLinear :model-value="checklistProgress" color="primary" height="8" rounded />
                    </div>
                </div>

                <div v-if="wo.checklistItems.length === 0" class="text-center py-10 text-medium-emphasis">
                    <VIcon icon="tabler-list-check" size="48" class="mb-2 opacity-20" />
                    <div>ไม่มีรายการ Checklist สำหรับงานประเภทนี้</div>
                </div>

                <VTable v-else>
                    <thead>
                        <tr>
                            <th width="50">#</th>
                            <th>รายการตรวจสอบ</th>
                            <th width="200">ผลการตรวจสอบ</th>
                            <th>หมายเหตุ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, idx) in wo.checklistItems" :key="item.id">
                            <td>{{ idx + 1 }}</td>
                            <td>
                                {{ item.description }}
                                <VChip v-if="item.isRequired" size="x-small" color="error" variant="tonal" class="ms-1">Required</VChip>
                            </td>
                            <td>
                                <VRadioGroup v-model="item.result" inline hide-details class="mt-0">
                                    <VRadio value="PASS" label="PASS" color="success" />
                                    <VRadio value="FAIL" label="FAIL" color="error" />
                                </VRadioGroup>
                            </td>
                            <td>
                                <VTextField v-model="item.note" placeholder="Note if fail" hide-details density="compact" />
                            </td>
                        </tr>
                    </tbody>
                </VTable>
            </VCardText>
        </VCard>
      </VWindowItem>

      <!-- Tab 3: Costs & Photos -->
      <VWindowItem :value="2">
        <VRow>
            <VCol cols="12" md="7">
                <VCard title="รายการอะไหล่ที่ใช้ (Parts)" class="mb-6">
                    <VCardText>
                        <VTable class="mb-4">
                            <thead>
                                <tr>
                                    <th>ชื่ออะไหล่</th>
                                    <th width="100">จำนวน</th>
                                    <th width="150">ราคา/หน่วย</th>
                                    <th width="150" class="text-right">รวม</th>
                                    <th width="50"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(part, idx) in wo.partsUsed" :key="idx">
                                    <td>{{ part.partName }}</td>
                                    <td>{{ part.quantity }}</td>
                                    <td>{{ part.unitCost.toLocaleString() }}</td>
                                    <td class="text-right font-weight-bold">{{ part.totalCost.toLocaleString() }}</td>
                                    <td>
                                        <VBtn icon="tabler-trash" size="x-small" variant="text" color="error" @click="removePart(idx)" />
                                    </td>
                                </tr>
                                <!-- Add New Part Line -->
                                <tr>
                                    <td><VTextField v-model="newPart.partName" placeholder="ชื่ออะไหล่" hide-details density="compact" /></td>
                                    <td><VTextField v-model.number="newPart.quantity" type="number" hide-details density="compact" /></td>
                                    <td><VTextField v-model.number="newPart.unitCost" type="number" hide-details density="compact" /></td>
                                    <td class="text-right text-medium-emphasis">{{ (newPart.quantity * newPart.unitCost).toLocaleString() }}</td>
                                    <td><VBtn icon="tabler-plus" size="x-small" color="primary" @click="addPart" /></td>
                                </tr>
                            </tbody>
                        </VTable>
                    </VCardText>
                </VCard>

                <VCard title="รูปภาพประกอบงาน">
                    <VCardText>
                        <div class="mb-6">
                            <div class="text-subtitle-1 mb-2 font-weight-bold">ก่อนดำเนินการ (Before)</div>
                            <div class="d-flex flex-wrap gap-2">
                                <VCard variant="tonal" class="d-flex align-center justify-center border-dashed" width="120" height="120">
                                    <VIcon icon="tabler-camera-plus" />
                                </VCard>
                            </div>
                        </div>
                        <div>
                            <div class="text-subtitle-1 mb-2 font-weight-bold">หลังดำเนินการ (After)</div>
                            <div class="d-flex flex-wrap gap-2">
                                <VCard variant="tonal" class="d-flex align-center justify-center border-dashed" width="120" height="120">
                                    <VIcon icon="tabler-camera-plus" />
                                </VCard>
                            </div>
                        </div>
                    </VCardText>
                </VCard>
            </VCol>

            <VCol cols="12" md="5">
                <VCard title="สรุปค่าใช้จ่าย">
                    <VCardText>
                        <VRow>
                            <VCol cols="12">
                                <VTextField v-model.number="wo.laborCost" label="ค่าแรงช่าง (Labor Cost)" prefix="฿" type="number" @input="calculateTotals" />
                            </VCol>
                            <VCol cols="12">
                                <VTextField :model-value="wo.partsCost" label="ค่าอะไหล่รวม" prefix="฿" readonly />
                            </VCol>
                            <VDivider class="my-4 mx-3" />
                            <VCol cols="12" class="d-flex justify-space-between align-center">
                                <span class="text-h6">รวมต้นทุนทั้งหมด:</span>
                                <span class="text-h4 font-weight-black text-primary">฿{{ wo.totalCost.toLocaleString() }}</span>
                            </VCol>
                        </VRow>
                    </VCardText>
                </VCard>
            </VCol>
        </VRow>
      </VWindowItem>

      <!-- Tab 4: Results -->
      <VWindowItem :value="3">
        <VCard>
            <VCardText>
                <VRow>
                    <VCol cols="12" md="6">
                        <div class="text-subtitle-1 mb-2 font-weight-bold">สรุปผลงาน*</div>
                        <VRadioGroup v-model="wo.result" row>
                            <VRadio value="PASS" label="ผ่าน (Complete)" color="success" />
                            <VRadio value="FAIL" label="ไม่ผ่าน (Faulty)" color="error" />
                            <VRadio value="PARTIAL" label="เสร็จบางส่วน" color="warning" />
                        </VRadioGroup>
                    </VCol>
                    <VCol cols="12">
                        <VTextarea v-model="wo.resultNote" label="หมายเหตุผลลัพธ์ / รายละเอียดงานที่ทำจริง*" rows="4" />
                    </VCol>
                </VRow>

                <VAlert v-if="wo.result && wo.result !== 'PASS'" color="warning" variant="tonal" class="mt-6" icon="tabler-alert-triangle">
                    <div class="font-weight-bold mb-2">งานนี้ยังไม่เสร็จสมบูรณ์ — ต้องการดำเนินการต่อเนื่อง:</div>
                    <div class="d-flex flex-column">
                        <VCheckbox label="สร้าง Work Order ใหม่ (Follow-up)" hide-details density="compact" />
                        <VCheckbox label="เปิด Insurance Claim" hide-details density="compact" />
                        <VCheckbox label="ขอ Asset Substitution (รถทดแทน)" hide-details density="compact" />
                    </div>
                </VAlert>
            </VCardText>
        </VCard>
      </VWindowItem>
    </VWindow>
  </div>
</template>

<style scoped>
.border-dashed {
    border: 2px dashed rgba(var(--v-border-color), 0.3) !important;
}
</style>
