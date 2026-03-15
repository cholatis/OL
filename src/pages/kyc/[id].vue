<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCreditStore } from '@/stores/credit'
import type { KYCRequest, PDPAPurpose, KYCDocument } from '@/types/credit'

const route = useRoute()
const creditStore = useCreditStore()
const kycId = route.params.id as string

const kyc = ref<KYCRequest | null>(null)
const currentStep = ref(1)

onMounted(() => {
  if (kycId !== 'new') {
    const found = creditStore.getKYCById(kycId)
    if (found) {
        kyc.value = JSON.parse(JSON.stringify(found))
    }
  } else {
    // Initial new KYC state
    kyc.value = {
      id: `KYC-${new Date().getFullYear()}-XXXX`,
      customerId: '',
      requestDate: new Date().toISOString().split('T')[0],
      status: 'PENDING',
      pdpaConsent: {
        consentDate: '',
        consentVersion: 'v1.2',
        consentBy: '',
        purposes: [],
        expiryDate: ''
      },
      documents: [],
      creditScore: {
        scoreDate: new Date().toISOString().split('T')[0],
        internalScore: 0,
        internalGrade: 'F',
        factors: [
          { factor: 'อายุกิจการ (ปี)', score: 0, weight: 20, comment: '' },
          { factor: 'D/E Ratio', score: 0, weight: 30, comment: '' },
          { factor: 'Current Ratio', score: 0, weight: 25, comment: '' },
          { factor: 'Net Profit Margin (%)', score: 0, weight: 25, comment: '' }
        ],
        recommendedLimit: 0,
        recommendedTenor: 0
      },
      reviewedBy: 'Admin'
    }
  }
})

// Blocking logic: Step 1 must have CREDIT_CHECK in purposes to proceed
const isPdpaValid = computed(() => {
  if (!kyc.value) return false
  return kyc.value.pdpaConsent.purposes.includes('CREDIT_CHECK') && kyc.value.pdpaConsent.consentBy !== ''
})

// Scoring Logic (Mock)
const calculateScore = () => {
  if (!kyc.value) return
  
  // Logic based on factors weights
  let totalScore = 0
  kyc.value.creditScore.factors.forEach(f => {
    totalScore += (f.score * f.weight) / 100
  })
  
  kyc.value.creditScore.internalScore = Math.round(totalScore * 10) // Scale to 100 if input is 1-10
  
  if (kyc.value.creditScore.internalScore >= 80) kyc.value.creditScore.internalGrade = 'A'
  else if (kyc.value.creditScore.internalScore >= 70) kyc.value.creditScore.internalGrade = 'B'
  else if (kyc.value.creditScore.internalScore >= 60) kyc.value.creditScore.internalGrade = 'C'
  else if (kyc.value.creditScore.internalScore >= 50) kyc.value.creditScore.internalGrade = 'D'
  else kyc.value.creditScore.internalGrade = 'F'
  
  kyc.value.creditScore.recommendedLimit = kyc.value.creditScore.internalScore * 100000
}

const purposes: { title: string, value: PDPAPurpose }[] = [
  { title: 'ตรวจสอบเครดิต (CREDIT_CHECK) *Mandatory*', value: 'CREDIT_CHECK' },
  { title: 'ขอข้อมูล NCB (NCB_INQUIRY) *Mandatory*', value: 'NCB_INQUIRY' },
  { title: 'การตลาด (MARKETING)', value: 'MARKETING' },
  { title: 'เสนอผลิตภัณฑ์ (PRODUCT_OFFER)', value: 'PRODUCT_OFFER' },
  { title: 'แชร์ข้อมูลกับพันธมิตร (DATA_SHARING)', value: 'DATA_SHARING' },
]

const requiredDocs: KYCDocument['docType'][] = ['COMPANY_REG', 'FINANCIAL_STMT', 'BANK_STMT', 'TAX_CERT', 'DIRECTOR_ID']

const getDocStatus = (type: string) => {
  return kyc.value?.documents.find(d => d.docType === type)
}
</script>

<template>
  <div v-if="kyc">
    <VRow class="mb-6">
      <VCol cols="12">
        <div class="d-flex align-center gap-2">
            <VBtn icon="tabler-arrow-left" variant="tonal" color="secondary" to="/kyc" />
            <h4 class="text-h4">KYC & Credit Request: {{ kyc.id }}</h4>
        </div>
      </VCol>
    </VRow>

    <VCard>
      <VStepper v-model="currentStep" :items="['PDPA Consent', 'KYC Documents', 'Scoring', 'Summary']" flat>
        <template #item.1>
          <VCard title="Step 1: PDPA Consent Framework" flat>
            <VCardText>
              <div class="bg-light-primary pa-4 rounded mb-6">
                <h6 class="text-h6 mb-2">ข้อกำหนดและเงื่อนไขการยินยอมส่วนบุคคล (PDPA)</h6>
                <p class="text-body-2 mb-4">
                  ข้าพเจ้ายินยอมให้บริษัทฯ ตรวจสอบข้อมูลส่วนบุคคล ข้อมูลเครดิต และข้อมูลอื่นๆ ที่จำเป็นเพื่อประกอบการพิจารณาอนุมัติวงเงินสินเชื่อตามที่ตกลงไว้...
                </p>
              </div>

              <VRow>
                <VCol cols="12" md="8">
                  <VLabel class="mb-2">วัตถุประสงค์ที่ยินยอม (Purposes)</VLabel>
                  <div class="d-flex flex-column gap-2 mb-6">
                    <VCheckbox
                      v-for="p in purposes"
                      :key="p.value"
                      v-model="kyc.pdpaConsent.purposes"
                      :label="p.title"
                      :value="p.value"
                      hide-details
                      density="compact"
                    />
                  </div>
                </VCol>

                <VCol cols="12" md="4">
                  <VTextField v-model="kyc.pdpaConsent.consentBy" label="ชื่อผู้ให้การยินยอม (Authorized Signatory)" placeholder="เช่น คุณสมชาย ใจดี" />
                  <VTextField v-model="kyc.pdpaConsent.consentDate" type="date" label="วันที่ให้การยินยอม" class="mt-4" />
                  <VTextField v-model="kyc.pdpaConsent.expiryDate" type="date" label="วันหมดอายุความยินยอม" class="mt-4" />
                </VCol>
              </VRow>

              <div class="d-flex justify-end mt-6">
                <VBtn :disabled="!isPdpaValid" color="primary" @click="currentStep = 2">
                  Next: Documents
                </VBtn>
              </div>
              <div v-if="!isPdpaValid" class="text-error text-caption text-right mt-2">
                * กรุณายืนยันการตรวจสอบเครดิตและระบุชื่อผู้ให้การยินยอมก่อนดำเนินการต่อ
              </div>
            </VCardText>
          </VCard>
        </template>

        <template #item.2>
          <VCard title="Step 2: KYC & Compliance Documents" flat>
            <VCardText>
              <VTable>
                <thead>
                  <tr>
                    <th>ประเภทเอกสาร</th>
                    <th>สถานะ</th>
                    <th>ไฟล์ล่าสุด</th>
                    <th>การดำเนินการ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="type in requiredDocs" :key="type">
                    <td>{{ type.replace('_', ' ') }}</td>
                    <td>
                      <VChip v-if="getDocStatus(type)" :color="getDocStatus(type)?.verified ? 'success' : 'warning'" size="x-small">
                        {{ getDocStatus(type)?.verified ? 'VERIFIED' : 'PENDING' }}
                      </VChip>
                      <VChip v-else color="secondary" size="x-small">MISSING</VChip>
                    </td>
                    <td>{{ getDocStatus(type)?.fileName || '-' }}</td>
                    <td>
                      <div class="d-flex gap-2">
                        <VBtn icon="tabler-upload" size="x-small" variant="tonal" color="primary" />
                        <VBtn icon="tabler-file-check" size="x-small" variant="tonal" color="success" :disabled="!getDocStatus(type)" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </VTable>

              <div class="d-flex justify-space-between mt-6">
                <VBtn variant="tonal" color="secondary" @click="currentStep = 1">Back</VBtn>
                <VBtn color="primary" @click="currentStep = 3">Next: Scoring</VBtn>
              </div>
            </VCardText>
          </VCard>
        </template>

        <template #item.3>
          <VCard title="Step 3: Internal Credit Scoring Model" flat>
            <VCardText>
              <VRow>
                <VCol cols="12" md="8">
                  <VTable density="compact">
                    <thead>
                      <tr>
                        <th>ปัจจัยหลัก (Factors)</th>
                        <th>ค่าน้ำหนัก (%)</th>
                        <th width="150">คะแนน (1-10)</th>
                        <th>หมายเหตุ/วิเคราะห์</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="f in kyc.creditScore.factors" :key="f.factor">
                        <td>{{ f.factor }}</td>
                        <td>{{ f.weight }}%</td>
                        <td>
                          <VTextField v-model.number="f.score" type="number" density="compact" hide-details />
                        </td>
                        <td>
                          <VTextField v-model="f.comment" density="compact" hide-details placeholder="ใส่ผลวิเคราะห์..." />
                        </td>
                      </tr>
                    </tbody>
                  </VTable>
                  <VBtn class="mt-4" prepend-icon="tabler-refresh" variant="tonal" block @click="calculateScore">
                    Calculate Scoring Result
                  </VBtn>
                </VCol>

                <VCol cols="12" md="4">
                  <div class="text-center bg-light-secondary pa-6 rounded">
                    <div class="text-h6 mb-2">Final Score Result</div>
                    <VAvatar size="80" :color="kyc.status === 'APPROVED' ? 'success' : 'primary'" variant="elevated" class="mb-4">
                      <span class="text-h4 font-weight-bold">{{ kyc.creditScore.internalScore }}</span>
                    </VAvatar>
                    <div class="text-h5 font-weight-bold mb-1">Grade: {{ kyc.creditScore.internalGrade }}</div>
                    <VDivider class="my-4" />
                    <div class="text-caption">Recommended Credit Limit</div>
                    <div class="text-h6 text-primary">{{ kyc.creditScore.recommendedLimit.toLocaleString() }} ฿</div>
                  </div>

                  <VBtn class="mt-6" prepend-icon="tabler-search" variant="outlined" color="info" block>
                    Request NCB Inquiry
                  </VBtn>
                </VCol>
              </VRow>

              <div class="d-flex justify-space-between mt-6">
                <VBtn variant="tonal" color="secondary" @click="currentStep = 2">Back</VBtn>
                <VBtn color="primary" @click="currentStep = 4">Next: Summary</VBtn>
              </div>
            </VCardText>
          </VCard>
        </template>

        <template #item.4>
          <VCard title="Step 4: Final Recommendation & Approval" flat>
            <VCardText>
              <VRow>
                <VCol cols="12" md="6">
                  <h6 class="text-h6 mb-4">KYC Summary</h6>
                  <ul class="d-flex flex-column gap-2 text-body-1 list-none">
                    <li><strong>Status:</strong> <VChip size="small" :color="getStatusColor(kyc.status)">{{ kyc.status }}</VChip></li>
                    <li><strong>PDPA Consent:</strong> <VIcon icon="tabler-check" color="success" /> Valid until {{ kyc.pdpaConsent.expiryDate }}</li>
                    <li><strong>Internal Grade:</strong> {{ kyc.creditScore.internalGrade }} ({{ kyc.creditScore.internalScore }}/100)</li>
                  </ul>
                </VCol>

                <VCol cols="12" md="6">
                  <VCard variant="tonal" color="primary">
                    <VCardText>
                      <h6 class="text-h6 mb-4">Credit Approval Action</h6>
                      <VTextField v-model.number="kyc.approvedCreditLimit" label="Approved Credit Limit (฿)" class="mb-4" prefix="฿" />
                      <VTextarea v-model="kyc.rejectionReason" label="Notes / Conditions" rows="3" />
                      
                      <div class="d-flex gap-4 mt-6">
                        <VBtn color="success" prepend-icon="tabler-check" block @click="kyc.status = 'APPROVED'">Approve</VBtn>
                        <VBtn color="error" prepend-icon="tabler-x" block @click="kyc.status = 'REJECTED'">Reject</VBtn>
                      </div>
                    </VCardText>
                  </VCard>
                </VCol>
              </VRow>

              <div class="d-flex justify-space-between mt-6">
                <VBtn variant="tonal" color="secondary" @click="currentStep = 3">Back</VBtn>
                <VBtn color="primary" @click="saveKYC">Save All Information</VBtn>
              </div>
            </VCardText>
          </VCard>
        </template>
      </VStepper>
    </VCard>
  </div>
</template>

<script lang="ts">
const getStatusColor = (status: string) => {
  switch (status) {
    case 'APPROVED': return 'success'
    case 'PENDING': return 'warning'
    case 'IN_REVIEW': return 'info'
    case 'REJECTED': return 'error'
    default: return 'secondary'
  }
}

const saveKYC = () => {
  // Logic to save to store
  alert('KYC Request Saved Successfully')
}
</script>

<style scoped>
.list-none {
  list-style: none;
  padding: 0;
}
.bg-light-primary {
  background-color: rgba(var(--v-theme-primary), 0.1);
}
.bg-light-secondary {
  background-color: rgba(var(--v-theme-secondary), 0.1);
}
</style>
