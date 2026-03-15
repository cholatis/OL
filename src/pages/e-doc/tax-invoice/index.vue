<script setup lang="ts">
import { useEDocStore } from '@/stores/e-doc'

const eDocStore = useEDocStore()

const getStatusColor = (status: string) => {
  const map: Record<string, string> = {
    'DRAFT': 'secondary',
    'SIGNED': 'info',
    'SUBMITTED_RD': 'warning',
    'ACCEPTED_RD': 'success',
    'REJECTED_RD': 'error'
  }
  return map[status] || 'secondary'
}

const formatCurrency = (val: number) => {
  return val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>

<template>
  <VRow>
    <VCol cols="12" md="3">
      <VCard title="ออกผลแล้ว (เดือนนี้)">
        <VCardText class="d-flex align-center">
          <VAvatar color="primary" variant="tonal" size="42" class="me-3">
            <VIcon icon="tabler-file-invoice" />
          </VAvatar>
          <div>
            <h4 class="text-h4">124</h4>
            <span class="text-caption">รายการ</span>
          </div>
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols="12" md="3">
      <VCard title="ส่ง RD แล้ว">
        <VCardText class="d-flex align-center">
          <VAvatar color="success" variant="tonal" size="42" class="me-3">
            <VIcon icon="tabler-cloud-upload" />
          </VAvatar>
          <div>
            <h4 class="text-h4">118</h4>
            <span class="text-caption">รายการ</span>
          </div>
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols="12" md="3">
      <VCard title="รอนำส่ง">
        <VCardText class="d-flex align-center">
          <VAvatar color="warning" variant="tonal" size="42" class="me-3">
            <VIcon icon="tabler-alert-circle" />
          </VAvatar>
          <div>
            <h4 class="text-h4">6</h4>
            <span class="text-caption">รายการ</span>
          </div>
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols="12" md="3">
      <VCard title="ถูกปฏิเสธ">
        <VCardText class="d-flex align-center">
          <VAvatar color="error" variant="tonal" size="42" class="me-3">
            <VIcon icon="tabler-circle-x" />
          </VAvatar>
          <div>
            <h4 class="text-h4">0</h4>
            <span class="text-caption">รายการ</span>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard>
        <VCardText class="d-flex flex-wrap gap-4 align-center">
          <VBtn prepend-icon="tabler-cloud-upload" color="primary">Submit to RD (Batch)</VBtn>
          <VSpacer />
          <div style="width: 250px;">
            <VTextField density="compact" label="ค้นหาเลขที่ / ลูกค้า" prepend-inner-icon="tabler-search" hide-details />
          </div>
        </VCardText>
        
        <VDivider />

        <VTable>
          <thead>
            <tr>
              <th>เลขที่</th>
              <th>วันที่</th>
              <th>ลูกค้า</th>
              <th class="text-right">ยอดรวม</th>
              <th class="text-right">VAT</th>
              <th class="text-center">สถานะ RD</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="inv in eDocStore.taxInvoices" :key="inv.id">
              <td class="font-weight-bold">
                <router-link :to="`/e-doc/tax-invoice/${inv.id}`" class="text-primary font-weight-bold text-decoration-none">
                  {{ inv.invoiceNo }}
                </router-link>
              </td>
              <td>{{ inv.invoiceDate }}</td>
              <td>{{ inv.buyerName }}</td>
              <td class="text-right">{{ formatCurrency(inv.total) }}</td>
              <td class="text-right">{{ formatCurrency(inv.vatAmount) }}</td>
              <td class="text-center">
                <VChip :color="getStatusColor(inv.status)" size="small" label>
                  {{ inv.status }}
                </VChip>
              </td>
              <td class="text-center">
                <VBtn icon size="x-small" variant="text" color="primary">
                  <VIcon icon="tabler-eye" />
                </VBtn>
                <VBtn icon size="x-small" variant="text" color="secondary">
                  <VIcon icon="tabler-download" />
                </VBtn>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>
