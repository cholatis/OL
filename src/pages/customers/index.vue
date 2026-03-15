<script setup lang="ts">
import { useCustomerStore } from '@/stores/customer'
import type { CustomerSegment, CustomerStatus } from '@/types/customer'

const customerStore = useCustomerStore()
const router = useRouter()

const searchQuery = ref('')
const selectedSegment = ref<CustomerSegment | 'ALL'>('ALL')
const selectedStatus = ref<CustomerStatus | 'ALL'>('ALL')

const customers = computed(() => {
  return customerStore.customers.filter(customer => {
    const matchesSearch = customer.companyName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         customer.taxId.includes(searchQuery.value)
    const matchesSegment = selectedSegment.value === 'ALL' || customer.customerSegment === selectedSegment.value
    const matchesStatus = selectedStatus.value === 'ALL' || customer.status === selectedStatus.value

    return matchesSearch && matchesSegment && matchesStatus
  })
})

const getSegmentColor = (segment: string) => {
  if (segment === 'CORPORATE') return 'indigo'
  if (segment === 'GOVERNMENT') return 'success'
  if (segment === 'SME') return 'orange'
  return 'secondary'
}

const getStatusColor = (status: string) => {
  if (status === 'ACTIVE') return 'success'
  if (status === 'SUSPENDED') return 'error'
  if (status === 'BLACKLIST') return 'secondary'
  return 'info'
}

const companyTypeLabels: Record<string, string> = {
  CO_LTD: 'บจก.',
  PCL: 'บมจ.',
  LP: 'หจก.',
  GOVERNMENT: 'หน่วยงานรัฐ',
  OTHER: 'อื่นๆ',
}

const headers = [
  { title: 'ชื่อบริษัท / เลขทะเบียน', key: 'companyName' },
  { title: 'ประเภท', key: 'companyType' },
  { title: 'SEGMENT', key: 'customerSegment' },
  { title: 'การใช้วงเงิน', key: 'creditUsage' },
  { title: 'สถานะ', key: 'status' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

const navigateToDetail = (id: string) => {
  router.push(`/customers/${id}`)
}

const navigateToCreate = () => {
  router.push('/customers/new')
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(value)
}
</script>

<template>
  <div>
    <VRow class="mb-6 align-center">
      <VCol cols="12" md="6">
        <h2 class="text-h4 font-weight-bold">รายการลูกค้า B2B</h2>
      </VCol>
      <VCol cols="12" md="6" class="text-md-right">
        <VBtn
          color="primary"
          prepend-icon="tabler-plus"
          @click="navigateToCreate"
        >
          เพิ่มลูกค้าใหม่
        </VBtn>
      </VCol>
    </VRow>

    <VCard class="mb-6">
      <VCardText>
        <VRow>
          <VCol cols="12" md="4">
            <VTextField
              v-model="searchQuery"
              placeholder="ค้นหาชื่อบริษัท หรือ เลขทะเบียน..."
              prepend-inner-icon="tabler-search"
              clearable
              hide-details
            />
          </VCol>
          <VCol cols="12" sm="6" md="4">
            <VSelect
              v-model="selectedSegment"
              label="Segment"
              :items="[
                { title: 'ทั้งหมด', value: 'ALL' },
                { title: 'Corporate', value: 'CORPORATE' },
                { title: 'Government', value: 'GOVERNMENT' },
                { title: 'SME', value: 'SME' }
              ]"
              hide-details
            />
          </VCol>
          <VCol cols="12" sm="6" md="4">
            <VSelect
              v-model="selectedStatus"
              label="สถานะ"
              :items="[
                { title: 'ทั้งหมด', value: 'ALL' },
                { title: 'ใช้งานอยู่ (Active)', value: 'ACTIVE' },
                { title: 'ระงับการใช้งาน (Suspended)', value: 'SUSPENDED' },
                { title: 'ติดแบล็กลิสต์ (Blacklist)', value: 'BLACKLIST' }
              ]"
              hide-details
            />
          </VCol>
        </VRow>
      </VCardText>

      <VDivider />

      <VDataTable
        :headers="headers"
        :items="customers"
        class="text-no-wrap"
        @click:row="(_: any, { item }: any) => navigateToDetail(item.id)"
      >
        <!-- Company Name & Tax ID -->
        <template #[`item.companyName`]="{ item }">
          <div class="d-flex flex-column">
            <span class="font-weight-medium text-primary cursor-pointer">{{ item.companyName }}</span>
            <span class="text-caption">ทะเบียน: {{ item.taxId }}</span>
          </div>
        </template>

        <!-- Company Type -->
        <template #[`item.companyType`]="{ item }">
          <VChip
            size="small"
            variant="tonal"
            color="secondary"
          >
            {{ companyTypeLabels[item.companyType] }}
          </VChip>
        </template>

        <!-- Segment -->
        <template #[`item.customerSegment`]="{ item }">
          <VChip
            size="small"
            :color="getSegmentColor(item.customerSegment)"
            class="text-capitalize"
            variant="tonal"
          >
            {{ item.customerSegment }}
          </VChip>
        </template>

        <!-- Credit Usage -->
        <template #[`item.creditUsage`]="{ item }">
          <div style="width: 140px;">
            <div class="d-flex justify-space-between text-caption mb-1">
              <span>ใช้ไป {{ Math.round((item.creditUsed / item.creditLimit) * 100) }}%</span>
              <span>{{ (item.creditLimit / 1000000).toFixed(1) }}M</span>
            </div>
            <VProgressLinear
              :model-value="(item.creditUsed / item.creditLimit) * 100"
              :color="item.creditUsed / item.creditLimit > 0.9 ? 'error' : (item.creditUsed / item.creditLimit > 0.7 ? 'warning' : 'primary')"
              height="6"
              rounded
            />
          </div>
        </template>

        <!-- Status -->
        <template #[`item.status`]="{ item }">
          <VChip
            size="small"
            :color="getStatusColor(item.status)"
            class="text-uppercase"
            label
          >
            {{ item.status }}
          </VChip>
        </template>

        <!-- Actions -->
        <template #[`item.actions`]="{ item }">
          <div @click.stop>
            <VBtn
              icon
              variant="text"
              size="small"
              color="medium-emphasis"
              @click="navigateToDetail(item.id)"
            >
              <VIcon icon="tabler-edit" />
            </VBtn>
            <VBtn
              icon
              variant="text"
              size="small"
              color="medium-emphasis"
              :disabled="item.status === 'BLACKLIST'"
              @click="navigateToDetail(item.id)"
            >
              <VIcon icon="tabler-eye" />
            </VBtn>
          </div>
        </template>
      </VDataTable>
    </VCard>
  </div>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
