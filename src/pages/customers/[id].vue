<script setup lang="ts">
import { useCustomerStore } from '@/stores/customer'
import type { Customer, CompanyType, CustomerSegment, CustomerStatus } from '@/types/customer'

const route = useRoute()
const router = useRouter()
const customerStore = useCustomerStore()

const isNew = computed(() => route.params.id === 'new')
const customerId = computed(() => (route.params as any).id as string)

const activeTab = ref(0)
const isSaving = ref(false)

const formData = ref<Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>>({
  companyName: '',
  taxId: '',
  companyType: 'CO_LTD',
  registeredDate: new Date().toISOString().split('T')[0],
  registeredCapital: 0,
  businessType: '',
  address: '',
  subdistrict: '',
  district: '',
  province: '',
  postalCode: '',
  contactName: '',
  contactPosition: '',
  contactPhone: '',
  contactEmail: '',
  website: '',
  creditLimit: 0,
  creditUsed: 0,
  customerSegment: 'SME',
  status: 'ACTIVE',
  documents: [],
})

const companyTypes = [
  { title: 'บริษัทจำกัด (บจก.)', value: 'CO_LTD' },
  { title: 'บริษัทมหาชนจำกัด (บมจ.)', value: 'PCL' },
  { title: 'ห้างหุ้นส่วนจำกัด (หจก.)', value: 'LP' },
  { title: 'หน่วยงานรัฐบาล', value: 'GOVERNMENT' },
  { title: 'อื่นๆ', value: 'OTHER' },
]

const segments = [
  { label: 'Corporate', value: 'CORPORATE' },
  { label: 'Government', value: 'GOVERNMENT' },
  { label: 'SME', value: 'SME' },
]

const taxIdRules = [
  (v: string) => !!v || 'กรุณากรอกเลขทะเบียนนิติบุคคล',
  (v: string) => /^\d{13}$/.test(v) || 'กรุณากรอกตัวเลข 13 หลัก',
]

const emailRules = [
  (v: string) => !v || /.+@.+\..+/.test(v) || 'กรุณากรอกอีเมลให้ถูกต้อง',
]

// Fetch data on mount
onMounted(async () => {
  if (!isNew.value) {
    await customerStore.fetchCustomerById(customerId.value)
    if (customerStore.selectedCustomer) {
      const { id, createdAt, updatedAt, ...rest } = customerStore.selectedCustomer
      formData.value = { ...rest }
    }
    else {
      // Handle not found
      router.push('/customers')
    }
  }
})

const save = async () => {
  isSaving.value = true
  try {
    if (isNew.value)
      await customerStore.createCustomer(formData.value)
    else
      await customerStore.updateCustomer(customerId.value, formData.value)

    router.push('/customers')
  }
  finally {
    isSaving.value = false
  }
}

const cancel = () => {
  router.back()
}

const deleteCustomer = async () => {
  if (confirm('ยืนยันการลบข้อมูลลูกค้านี้?')) {
    await customerStore.deleteCustomer(customerId.value)
    router.push('/customers')
  }
}

// Credit Facility Tab
const usagePercent = computed(() => {
  if (formData.value.creditLimit === 0) return 0
  return (formData.value.creditUsed / formData.value.creditLimit) * 100
})

const progressColor = computed(() => {
  if (usagePercent.value > 90) return 'error'
  if (usagePercent.value > 70) return 'warning'
  return 'primary'
})

const mockActiveContracts = [
  { no: 'MLA-2024-05', assets: 12, rent: 185000 },
  { no: 'MLA-2024-12', assets: 3, rent: 45000 },
]

const documents = [
  { type: 'COMPANY_CERT', label: 'หนังสือรับรองบริษัท' },
  { type: 'SHAREHOLDER_LIST', label: 'บัญชีรายชื่อผู้ถือหุ้น (บอจ.5)' },
  { type: 'AUTHORIZED_SIGNATORY', label: 'หนังสือบริคณห์สนธิ' },
  { type: 'FINANCIAL_STMT', label: 'งบการเงิน 3 ปี' },
  { type: 'BANK_STATEMENT', label: 'Statement ธนาคาร' },
  { type: 'VAT_CERT', label: 'ทะเบียนภาษีมูลค่าเพิ่ม (ภ.พ.20)' },
]
</script>

<template>
  <div>
    <VRow class="mb-6 align-center">
      <VCol cols="12" md="6">
        <div class="d-flex align-center">
          <VBtn
            icon
            variant="text"
            rounded="xl"
            @click="cancel"
          >
            <VIcon icon="tabler-arrow-left" />
          </VBtn>
          <h2 class="text-h4 font-weight-bold ms-2">
            {{ isNew ? 'เพิ่มลูกค้าใหม่' : formData.companyName }}
          </h2>
        </div>
      </VCol>
    </VRow>

    <VTabs
      v-model="activeTab"
      class="v-tabs-pill mb-6"
    >
      <VTab prepend-icon="tabler-building">
        ข้อมูลบริษัท
      </VTab>
      <VTab prepend-icon="tabler-user">
        ผู้ติดต่อ
      </VTab>
      <VTab prepend-icon="tabler-credit-card">
        วงเงิน Fleet Facility
      </VTab>
      <VTab prepend-icon="tabler-file">
        เอกสาร
      </VTab>
    </VTabs>

    <VWindow v-model="activeTab">
      <!-- Tab 1: Company Info -->
      <VWindowItem>
        <VCard>
          <VCardText>
            <VRow>
              <VCol cols="12" md="8">
                <VTextField
                  v-model="formData.companyName"
                  label="ชื่อบริษัท*"
                  persistent-placeholder
                />
              </VCol>
              <VCol cols="12" md="4">
                <VTextField
                  v-model="formData.taxId"
                  label="เลขทะเบียนนิติบุคคล*"
                  :rules="taxIdRules"
                  maxlength="13"
                />
              </VCol>

              <VCol cols="12" md="4">
                <VSelect
                  v-model="formData.companyType"
                  label="ประเภทบริษัท*"
                  :items="companyTypes"
                />
              </VCol>
              <VCol cols="12" md="4">
                <VTextField
                  v-model="formData.registeredDate"
                  label="วันที่จดทะเบียน"
                  type="date"
                />
              </VCol>
              <VCol cols="12" md="4">
                <VTextField
                  v-model="formData.registeredCapital"
                  label="ทุนจดทะเบียน (บาท)"
                  type="number"
                />
              </VCol>

              <VCol cols="12">
                <VTextField
                  v-model="formData.businessType"
                  label="ประเภทธุรกิจ"
                />
              </VCol>

              <VCol cols="12">
                <h3 class="text-body-1 font-weight-bold mb-2">
                  ที่อยู่จดทะเบียน
                </h3>
              </VCol>
              <VCol cols="12" md="12">
                <VTextarea
                  v-model="formData.address"
                  label="ที่อยู่ / เลขที่"
                  rows="2"
                />
              </VCol>
              <VCol cols="12" md="3">
                <VTextField
                  v-model="formData.subdistrict"
                  label="แขวง/ตำบล"
                />
              </VCol>
              <VCol cols="12" md="3">
                <VTextField
                  v-model="formData.district"
                  label="เขต/อำเภอ"
                />
              </VCol>
              <VCol cols="12" md="3">
                <VTextField
                  v-model="formData.province"
                  label="จังหวัด"
                />
              </VCol>
              <VCol cols="12" md="3">
                <VTextField
                  v-model="formData.postalCode"
                  label="รหัสไปรษณีย์"
                />
              </VCol>

              <VCol cols="12" md="6">
                <span class="text-body-1">Customer Segment</span>
                <VRadioGroup
                  v-model="formData.customerSegment"
                  inline
                  class="mt-1"
                >
                  <VRadio
                    v-for="s in segments"
                    :key="s.value"
                    :label="s.label"
                    :value="s.value"
                  />
                </VRadioGroup>
              </VCol>
              <VCol cols="12" md="6">
                <VSelect
                  v-model="formData.status"
                  label="สถานะ"
                  :items="['ACTIVE', 'SUSPENDED', 'BLACKLIST']"
                />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VWindowItem>

      <!-- Tab 2: Contact Info -->
      <VWindowItem>
        <VCard>
          <VCardText>
            <VRow>
              <VCol cols="12" md="6">
                <VTextField
                  v-model="formData.contactName"
                  label="ชื่อผู้ติดต่อหลัก*"
                />
              </VCol>
              <VCol cols="12" md="6">
                <VTextField
                  v-model="formData.contactPosition"
                  label="ตำแหน่ง"
                />
              </VCol>
              <VCol cols="12" md="6">
                <VTextField
                  v-model="formData.contactPhone"
                  label="เบอร์โทรศัพท์*"
                />
              </VCol>
              <VCol cols="12" md="6">
                <VTextField
                  v-model="formData.contactEmail"
                  label="อีเมล"
                  :rules="emailRules"
                />
              </VCol>
              <VCol cols="12">
                <VTextField
                  v-model="formData.website"
                  label="เว็บไซต์"
                  prepend-inner-icon="tabler-world"
                />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VWindowItem>

      <!-- Tab 3: Credit Facility -->
      <VWindowItem>
        <VRow>
          <VCol cols="12" md="4">
            <VCard class="h-100">
              <VCardText>
                <div class="text-h6 mb-4">
                  สรุปวงเงินเช่าซื้อ
                </div>
                <div class="mb-6">
                  <div class="text-caption">
                    วงเงินที่อนุมัติ (Facility Limit)
                  </div>
                  <VTextField
                    v-model="formData.creditLimit"
                    type="number"
                    prefix="฿"
                    variant="underlined"
                    class="text-h5"
                  />
                </div>
                <div class="mb-6">
                  <div class="text-caption">
                    วงเงินที่ใช้ไป (Facility Used)
                  </div>
                  <div class="text-h5 font-weight-bold text-primary">
                    ฿ {{ formData.creditUsed.toLocaleString() }}
                  </div>
                </div>
                <div class="mb-6">
                  <div class="text-caption">
                    วงเงินคงเหลือ (Available)
                  </div>
                  <div class="text-h5 font-weight-bold text-success">
                    ฿ {{ (formData.creditLimit - formData.creditUsed).toLocaleString() }}
                  </div>
                </div>

                <VProgressLinear
                  :model-value="usagePercent"
                  :color="progressColor"
                  height="12"
                  rounded
                  class="mb-2"
                />
                <div class="text-right text-caption">
                  ใช้ไปแล้ว {{ Math.round(usagePercent) }}%
                </div>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12" md="8">
            <VCard title="รายการสัญญา ACTIVE">
              <VTable>
                <thead>
                  <tr>
                    <th>เลขที่สัญญา (Schedule)</th>
                    <th class="text-center">
                      จำนวนทรัพย์สิน
                    </th>
                    <th class="text-right">
                      ค่าเช่า/เดือน
                    </th>
                    <th class="text-center">
                      รายละเอียด
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="contract in mockActiveContracts"
                    :key="contract.no"
                  >
                    <td class="font-weight-medium">
                      {{ contract.no }}
                    </td>
                    <td class="text-center">
                      {{ contract.assets }}
                    </td>
                    <td class="text-right">
                      {{ contract.rent.toLocaleString() }}
                    </td>
                    <td class="text-center">
                      <VBtn
                        icon
                        variant="text"
                        size="small"
                      >
                        <VIcon icon="tabler-external-link" />
                      </VBtn>
                    </td>
                  </tr>
                </tbody>
              </VTable>
            </VCard>
          </VCol>
        </VRow>
      </VWindowItem>

      <!-- Tab 4: Documents -->
      <VWindowItem>
        <VCard>
          <VCardText>
            <div class="text-h6 mb-4">
              แนบเอกสารประกอบการพิจารณา
            </div>
            <VList lines="two">
              <VListItem
                v-for="doc in documents"
                :key="doc.type"
              >
                <template #prepend>
                  <VAvatar
                    color="secondary"
                    variant="tonal"
                    rounded
                  >
                    <VIcon icon="tabler-file-text" />
                  </VAvatar>
                </template>

                <VListItemTitle class="font-weight-medium">
                  {{ doc.label }}
                </VListItemTitle>
                <VListItemSubtitle>ประเภท: {{ doc.type }}</VListItemSubtitle>

                <template #append>
                  <VBtn
                    color="primary"
                    variant="tonal"
                    size="small"
                    prepend-icon="tabler-upload"
                  >
                    อัปโหลด
                  </VBtn>
                </template>
              </VListItem>
            </VList>
          </VCardText>
        </VCard>
      </VWindowItem>
    </VWindow>

    <!-- Form Actions -->
    <div class="d-flex justify-end mt-8 gap-4 px-4 py-4 sticky-bottom bg-background">
      <VBtn
        v-if="!isNew"
        color="error"
        variant="tonal"
        class="me-auto"
        @click="deleteCustomer"
      >
        ลบข้อมูลลูกค้า
      </VBtn>
      <VBtn
        color="secondary"
        variant="tonal"
        @click="cancel"
      >
        ยกเลิก
      </VBtn>
      <VBtn
        color="primary"
        :loading="isSaving"
        @click="save"
      >
        บันทึกข้อมูล
      </VBtn>
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
</style>
