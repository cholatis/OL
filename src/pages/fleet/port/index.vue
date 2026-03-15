<script setup lang="ts">
import { useProcurementStore } from '@/stores/procurement'

const procStore = useProcurementStore()

const getStatusColor = (status: string) => {
  const map: any = { 'AT_PORT': 'error', 'CLEARED': 'success', 'IN_TRANSIT': 'info' }
  return map[status] || 'secondary'
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Port Management (รถนำเข้า)">
        <VCardText>
          <VRow>
            <VCol cols="12" md="3">
              <VCard variant="tonal" color="info">
                <VCardText class="d-flex align-center">
                  <VAvatar color="info" rounded class="me-3"><VIcon icon="tabler-ship" /></VAvatar>
                  <div>
                    <div class="text-h6">3 เรือ</div>
                    <div class="text-caption">อยู่ระหว่างขนส่ง</div>
                  </div>
                </VCardText>
              </VCard>
            </VCol>
            <VCol cols="12" md="3">
              <VCard variant="tonal" color="error">
                <VCardText class="d-flex align-center">
                  <VAvatar color="error" rounded class="me-3"><VIcon icon="tabler-anchor" /></VAvatar>
                  <div>
                    <div class="text-h6">12 คัน</div>
                    <div class="text-caption">รอที่ท่าเรือ (At Port)</div>
                  </div>
                </VCardText>
              </VCard>
            </VCol>
          </VRow>
        </VCardText>

        <VDivider />

        <VTable hover>
          <thead>
            <tr>
              <th> vessel Name </th>
              <th>B/L No.</th>
              <th>Arrival Date</th>
              <th>Port</th>
              <th class="text-center">Items</th>
              <th class="text-center">Customs Status</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="port in procStore.portRecords" :key="port.id">
              <td class="font-weight-bold">{{ port.vesselName }}</td>
              <td>{{ port.billOfLadingNo }}</td>
              <td>{{ port.arrivalDate }}</td>
              <td>{{ port.portName }}</td>
              <td class="text-center">{{ port.items.length }}</td>
              <td class="text-center">
                <VChip :color="getStatusColor(port.status)" size="small" label>{{ port.status }}</VChip>
              </td>
              <td class="text-center">
                <VBtn variant="tonal" size="x-small" color="primary">Manage Clearance</VBtn>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>
