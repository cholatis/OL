<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMasterDataStore } from '@/stores/masterData'
import type { HireGroup } from '@/types/master-data'

const route = useRoute()
const router = useRouter()
const masterDataStore = useMasterDataStore()

const hg = ref<HireGroup | null>(null)
const previewTerm = ref(60)

onMounted(() => {
  if (route.params.id !== 'new') {
    const found = masterDataStore.hireGroups.find(h => h.id === route.params.id)
    if (found) hg.value = JSON.parse(JSON.stringify(found))
  } else {
    hg.value = {
      id: `HG-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      code: '',
      description: '',
      exampleModels: [],
      repairsTotal: 0,
      repairsBaseTerm: 60,
      servicingPerEvent: 0,
      servicingDefaultCount: 7,
      tyresPerSet: 0,
      tyresDefaultSets: 2,
      isActive: true,
      updatedAt: new Date().toISOString()
    }
  }
})

// Calculations for preview
const previewRates = computed(() => {
    if (!hg.value) return { repairs: 0, servicing: 0, tyres: 0, total: 0 }
    
    const repairs = hg.value.repairsTotal / hg.value.repairsBaseTerm
    const servicing = (hg.value.servicingPerEvent * hg.value.servicingDefaultCount) / previewTerm.value
    const tyres = (hg.value.tyresPerSet * hg.value.tyresDefaultSets) / previewTerm.value
    
    return {
        repairs,
        servicing,
        tyres,
        total: repairs + servicing + tyres
    }
})

const save = () => {
    if (!hg.value) return
    const idx = masterDataStore.hireGroups.findIndex(h => h.id === hg.value?.id)
    if (idx !== -1) masterDataStore.hireGroups[idx] = hg.value
    else masterDataStore.hireGroups.push(hg.value)
    router.push('/settings/hire-groups')
}
</script>

<template>
  <div v-if="hg">
    <VRow class="mb-4 align-center">
      <VCol cols="12" md="8">
        <div class="d-flex align-center">
          <VBtn icon variant="text" @click="router.back()"><VIcon icon="tabler-arrow-left" /></VBtn>
          <div class="ms-2">
            <h2 class="text-h4 font-weight-bold">
                {{ route.params.id === 'new' ? 'สร้าง Hire Group ใหม่' : `แก้ไข Hire Group: ${hg.code}` }}
            </h2>
          </div>
        </div>
      </VCol>
      <VCol cols="12" md="4" class="text-md-right">
        <VBtn variant="tonal" color="secondary" class="me-2" @click="router.back()">ยกเลิก</VBtn>
        <VBtn color="primary" @click="save">บันทึก</VBtn>
      </VCol>
    </VRow>

    <VRow>
      <VCol cols="12" md="7">
        <VCard title="Section 1: ข้อมูล Group" class="mb-6">
          <VCardText>
            <VRow>
                <VCol cols="12" md="4">
                    <VSelect v-model="hg.code" label="Group Code*" :items="['A', 'B', 'C', 'D']" />
                </VCol>
                <VCol cols="12" md="8">
                    <VTextField v-model="hg.description" label="คำอธิบาย*" />
                </VCol>
                <VCol cols="12">
                    <VCombobox
                        v-model="hg.exampleModels"
                        label="Example Models (พิมแล้วกด Enter)"
                        multiple
                        chips
                        placeholder="เช่น Toyota Camry"
                    />
                </VCol>
            </VRow>
          </VCardText>
        </VCard>

        <VCard title="Section 2: Service Rates (Master Values)">
          <VCardText>
            <VTable>
                <thead>
                    <tr>
                        <th>บริการ</th>
                        <th>วิธีคิด</th>
                        <th width="200">ค่า (บาท)</th>
                        <th class="text-right">Preview/เดือน</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Repairs</td>
                        <td class="text-caption">Total ÷ Base Term ({{ hg.repairsBaseTerm }}M)</td>
                        <td><VTextField v-model.number="hg.repairsTotal" density="compact" hide-details type="number" /></td>
                        <td class="text-right font-weight-bold text-success">{{ previewRates.repairs.toLocaleString(undefined, {minimumFractionDigits: 2}) }} ฿</td>
                    </tr>
                    <tr>
                        <td>Servicing</td>
                        <td class="text-caption">ราคา/ครั้ง × จำนวนครั้ง ({{ hg.servicingDefaultCount }})</td>
                        <td><VTextField v-model.number="hg.servicingPerEvent" density="compact" hide-details type="number" /></td>
                        <td class="text-right font-weight-bold text-success">{{ previewRates.servicing.toLocaleString(undefined, {minimumFractionDigits: 2}) }} ฿</td>
                    </tr>
                    <tr>
                        <td>Tyres</td>
                        <td class="text-caption">ราคา/ชุด × จำนวนชุด ({{ hg.tyresDefaultSets }})</td>
                        <td><VTextField v-model.number="hg.tyresPerSet" density="compact" hide-details type="number" /></td>
                        <td class="text-right font-weight-bold text-success">{{ previewRates.tyres.toLocaleString(undefined, {minimumFractionDigits: 2}) }} ฿</td>
                    </tr>
                </tbody>
            </VTable>
            
            <div class="mt-4 text-caption text-medium-emphasis">
                * Preview อิง Term = {{ previewTerm }} เดือน, Repairs อิง Base Term = {{ hg.repairsBaseTerm }} เดือน
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12" md="5">
        <VCard title="สรุปค่าใช้จ่ายส่วนกลาง (Preview)" class="bg-light-primary">
            <VCardText>
                <div class="mb-6">
                    <VLabel class="mb-2">ทดสอบด้วย Term (เดือน)</VLabel>
                    <VSlider v-model="previewTerm" :min="12" :max="72" :step="12" show-ticks="always" thumb-label />
                </div>

                <div class="d-flex justify-space-between mb-4">
                    <span>Repairs Monthly:</span>
                    <span class="font-weight-bold">{{ previewRates.repairs.toLocaleString(undefined, {minimumFractionDigits: 2}) }} ฿</span>
                </div>
                <div class="d-flex justify-space-between mb-4">
                    <span>Servicing Monthly:</span>
                    <span class="font-weight-bold">{{ previewRates.servicing.toLocaleString(undefined, {minimumFractionDigits: 2}) }} ฿</span>
                </div>
                <div class="d-flex justify-space-between mb-4">
                    <span>Tyres Monthly:</span>
                    <span class="font-weight-bold">{{ previewRates.tyres.toLocaleString(undefined, {minimumFractionDigits: 2}) }} ฿</span>
                </div>
                <VDivider class="my-4" />
                <div class="d-flex justify-space-between">
                    <span class="text-h6">TOTAL SERVICE COST:</span>
                    <span class="text-h4 font-weight-bold text-primary">{{ previewRates.total.toLocaleString(undefined, {minimumFractionDigits: 2}) }} ฿</span>
                </div>
            </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
