<script setup lang="ts">
import { ref } from 'vue'
import { useEDocStore } from '@/stores/e-doc'

const eDocStore = useEDocStore()
const selectedPeriod = ref('2024-03')
const selectedForm = ref('PND53')

const formatCurrency = (val: number) => {
  return val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="E-WHT Monthly Summary">
        <VCardText>
          <VRow align="center">
            <VCol cols="12" md="3">
              <VTextField v-model="selectedPeriod" type="month" label="Tax Period" />
            </VCol>
            <VCol cols="12" md="3">
              <VSelect v-model="selectedForm" :items="['PND1', 'PND3', 'PND53']" label="Form Type" />
            </VCol>
            <VCol cols="12" md="6" class="d-flex gap-3">
              <VBtn prepend-icon="tabler-file-export" color="secondary">Generate Filing File (XML)</VBtn>
              <VBtn prepend-icon="tabler-external-link" color="info" href="https://efiling.rd.go.th" target="_blank">
                RD e-Filing
              </VBtn>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12" md="4">
      <VCard color="primary" variant="tonal">
        <VCardText class="d-flex align-center text-primary">
          <VAvatar color="primary" variant="flat" size="48" class="me-4 text-white">
            <VIcon icon="tabler-building" size="28" />
          </VAvatar>
          <div>
            <div class="text-h4 font-weight-bold">48</div>
            <div class="text-subtitle-2">รวมจำนวนผู้ถูกหัก (Vendor)</div>
          </div>
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols="12" md="4">
      <VCard color="success" variant="tonal">
        <VCardText class="d-flex align-center text-success">
          <VAvatar color="success" variant="flat" size="48" class="me-4 text-white">
            <VIcon icon="tabler-sum" size="28" />
          </VAvatar>
          <div>
            <div class="text-h4 font-weight-bold">฿1,050,400.00</div>
            <div class="text-subtitle-2">ยอดเงินได้รวม</div>
          </div>
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols="12" md="4">
      <VCard color="error" variant="tonal">
        <VCardText class="d-flex align-center text-error">
          <VAvatar color="error" variant="flat" size="48" class="me-4 text-white">
            <VIcon icon="tabler-scissors" size="28" />
          </VAvatar>
          <div>
            <div class="text-h4 font-weight-bold">฿31,512.00</div>
            <div class="text-subtitle-2">ภาษีหัก ณ ที่จ่าย รวม</div>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard title="รายการใบหัก ณ ที่จ่าย">
        <VTable>
          <thead>
            <tr>
              <th>เลขที่อ้างอิง</th>
              <th>วันที่ออก</th>
              <th>ผู้รับเงิน (Vendor)</th>
              <th class="text-right">เงินได้</th>
              <th class="text-right">WHT</th>
              <th class="text-center">สถานะ</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cert in eDocStore.whtCertificates" :key="cert.id">
              <td class="font-weight-bold">{{ cert.certNo }}</td>
              <td>{{ cert.issueDate }}</td>
              <td>{{ cert.payeeName }}</td>
              <td class="text-right">{{ formatCurrency(cert.totalIncome) }}</td>
              <td class="text-right font-weight-bold">{{ formatCurrency(cert.totalWHT) }}</td>
              <td class="text-center">
                <VChip color="success" size="x-small" label>{{ cert.status }}</VChip>
              </td>
              <td class="text-center">
                <VBtn icon size="x-small" variant="text"><VIcon icon="tabler-printer" /></VBtn>
                <VBtn icon size="x-small" variant="text"><VIcon icon="tabler-mail" /></VBtn>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>
