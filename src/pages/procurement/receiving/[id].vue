<script setup lang="ts">
import { ref } from 'vue'

const chassisNo = ref('')
const engineNo = ref('')
const selectedPo = ref('PO-2024-001')

const checklist = ref([
  { label: 'ความเรียบร้อยภายนอก (Exterior)', checked: false },
  { label: 'ความเรียบร้อยภายใน (Interior)', checked: false },
  { label: 'เอกสารประจำรถ (Documents)', checked: false },
  { label: 'อุปกรณ์มาตรฐาน (Tools/Spare)', checked: false },
])
</script>

<template>
  <VRow>
    <VCol cols="12" class="d-flex justify-space-between align-center">
      <h2 class="text-h4 font-weight-bold">แบบฟอร์มรับรถ (Goods Receipt)</h2>
      <VBtn color="primary" prepend-icon="tabler-check" size="large">Submit & Create Asset</VBtn>
    </VCol>

    <VCol cols="12" md="4">
      <VCard title="PO Reference">
        <VCardText>
          <VSelect v-model="selectedPo" :items="['PO-2024-001']" label="เลือกใบสั่งซื้อ" class="mb-4" />
          <div class="bg-light pa-4 rounded">
            <div class="text-caption">Vendor</div>
            <div class="font-weight-bold">Toyota Motor Thailand</div>
            <div class="text-caption mt-2">Model</div>
            <div class="font-weight-bold">Camry 2.5G (2024)</div>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12" md="8">
      <VCard title="Vehicle Identification">
        <VCardText>
          <VRow>
            <VCol cols="12" md="6">
              <VTextField v-model="chassisNo" label="Chassis No. (เลขตัวถัง)" prepend-inner-icon="tabler-barcode" placeholder="Scan or Type" />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="engineNo" label="Engine No. (เลขเครื่อง)" prepend-inner-icon="tabler-engine" />
            </VCol>
            <VCol cols="12" md="4">
              <VTextField label="Color" value="Black" />
            </VCol>
            <VCol cols="12" md="4">
              <VTextField label="Key No." />
            </VCol>
            <VCol cols="12" md="4">
              <VTextField label="Plate No. (if any)" />
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12" md="6">
      <VCard title="Pre-Delivery Inspection (PDI)">
        <VCardText>
          <div v-for="(item, i) in checklist" :key="i" class="d-flex align-center justify-space-between py-2 border-b last:border-0">
            <span>{{ item.label }}</span>
            <VSwitch v-model="item.checked" color="success" density="compact" hide-details />
          </div>
          <VTextarea label="หมายเหตุการตรวจรับ" class="mt-4" rows="3" />
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12" md="6">
      <VCard title="Photos (PDI Evidence)">
        <VCardText class="d-flex flex-column align-center justify-center py-10 bg-light-dotted border-dashed rounded">
          <VIcon icon="tabler-camera-plus" size="48" color="secondary" class="mb-2" />
          <div class="text-subtitle-2 font-weight-bold">Upload Inspection Photos</div>
          <div class="text-caption">Front, Side, Rear, Interior, Odometer</div>
          <VBtn size="small" variant="outlined" color="primary" class="mt-4">Choose Files</VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped>
.bg-light { background-color: rgb(var(--v-theme-on-surface), 0.03); }
.bg-light-dotted { background-color: rgb(var(--v-theme-on-surface), 0.01); }
.border-dashed { border: 2px dashed rgb(var(--v-theme-on-surface), 0.1); }
</style>
