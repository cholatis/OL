<script setup lang="ts">
import { useFleetInsuranceStore } from '@/stores/fleet-insurance'
import { ref } from 'vue'

const insuranceStore = useFleetInsuranceStore()
const showCalc = ref(false)

const calculateTax = (cc: number, year: number) => {
  // Simple mock calculation logic
  if (cc <= 600) return cc * 0.5
  if (cc <= 1800) return 300 + (cc - 600) * 1.5
  return 2100 + (cc - 1800) * 4
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="ภาษีรถยนต์ประจำปี (Road Tax Management)">
        <template #append>
          <VBtn prepend-icon="tabler-calculator" color="info" class="me-2" @click="showCalc = true">Tax Calculator</VBtn>
          <VBtn prepend-icon="tabler-check" color="success">Bulk Paid</VBtn>
        </template>
        
        <VCardText>
          <div class="d-flex gap-4">
            <VTextField density="compact" label="ทะเบียน / เลขที่บิล" prepend-inner-icon="tabler-search" hide-details />
            <VSelect label="สถานะ" :items="['All', 'PENDING', 'PAID', 'OVERDUE']" density="compact" style="width: 150px" hide-details />
          </div>
        </VCardText>

        <VDivider />

        <VTable hover>
          <thead>
            <tr>
              <th>ทะเบียน</th>
              <th>ปีภาษี</th>
              <th>กำหนดชำระ</th>
              <th class="text-right">ยอดภาษี</th>
              <th class="text-right">ค่าปรับ</th>
              <th>วิธีชำระ</th>
              <th class="text-center">สถานะ</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="t in insuranceStore.taxPayments" :key="t.id">
              <td class="font-weight-bold">{{ t.plateNo }}</td>
              <td>{{ t.taxYear }}</td>
              <td>{{ t.dueDate }}</td>
              <td class="text-right font-weight-bold">{{ t.taxAmount.toLocaleString() }}</td>
              <td class="text-right text-error">{{ t.lateFee || 0 }}</td>
              <td>{{ t.method }}</td>
              <td class="text-center">
                <VChip :color="t.status === 'PAID' ? 'success' : 'warning'" size="small" label>{{ t.status }}</VChip>
              </td>
              <td class="text-center">
                <VBtn variant="tonal" size="x-small" color="success" v-if="t.status === 'PENDING'">จ่ายภาษี</VBtn>
                <VBtn icon size="x-small" variant="text" color="primary"><VIcon icon="tabler-file-text" /></VBtn>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>

    <!-- Calc Dialog -->
    <VDialog v-model="showCalc" max-width="500">
      <VCard title="คำนวณภาษีเบื้องต้น">
        <VCardText>
          <VRow>
            <VCol cols="12"><VTextField label="เครื่องยนต์ (CC)" type="number" /></VCol>
            <VCol cols="12"><VSelect label="ประเภทรถ" :items="['รถยนต์นั่งส่วนบุคคลไม่เกิน 7 คน', 'รถยนต์นั่งส่วนบุคคลเกิน 7 คน', 'รถบรรทุกส่วนบุคคล']" /></VCol>
            <VCol cols="12"><VTextField label="อายุรถ (ปี)" type="number" /></VCol>
          </VRow>
          <div class="mt-6 pa-4 bg-light rounded text-center">
            <div class="text-caption">ประมาณการภาษี</div>
            <div class="text-h4 font-weight-bold text-primary">0.00 บาท</div>
          </div>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn color="secondary" @click="showCalc = false">ปิด</VBtn>
          <VBtn color="primary">บันทึกลงรายการ</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VRow>
</template>
