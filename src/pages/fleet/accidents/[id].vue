<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useFleetInsuranceStore } from '@/stores/fleet-insurance'
import { ref, computed } from 'vue'

const route = useRoute()
const insuranceStore = useFleetInsuranceStore()
const accId = route.params.id as string
const activeTab = ref(0)

const accident = computed(() => insuranceStore.getAccidentById(accId))
const claims = computed(() => insuranceStore.getClaimsByAccident(accId))

const getClaimStatusColor = (status: string) => {
  const map: any = { 'APPROVED': 'success', 'DRAFT': 'secondary', 'SUBMITTED': 'info' }
  return map[status] || 'secondary'
}
</script>

<template>
  <div v-if="accident">
    <VRow>
      <VCol cols="12" class="d-flex justify-space-between align-center mb-2">
        <div>
          <h2 class="text-h4 font-weight-bold text-error">
            <VIcon icon="tabler-alert-triangle" class="me-2" />
            {{ accident.accidentNo }}
          </h2>
          <span class="text-subtitle-1">รถทะเบียน {{ accident.plateNo }} | ผู้ขับ: {{ accident.driverName }}</span>
        </div>
        <div class="d-flex gap-2">
          <VBtn color="primary" prepend-icon="tabler-file-plus">เปิด Claim ใหม่</VBtn>
          <VBtn color="secondary" variant="tonal" prepend-icon="tabler-printer">Print Report</VBtn>
        </div>
      </VCol>

      <VCol cols="12" v-if="accident.isTotalLoss">
        <VAlert type="error" icon="tabler-skull" title="Total Loss Alert" closable>
          อุบัติเหตุนี้ได้รับการประเมินเป็น Total Loss โปรดดำเนินการยกเลิกสัญญาและขายซาก
          <template #append>
            <VBtn color="white" variant="outlined" class="ml-4 font-weight-bold">ดำเนินการ Total Loss</VBtn>
          </template>
        </VAlert>
      </VCol>

      <VCol cols="12">
        <VTabs v-model="activeTab" color="error">
          <VTab>รายงานอุบัติเหตุ</VTab>
          <VTab>Insurance Claim ({{ claims.length }})</VTab>
          <VTab>งานซ่อม & Work Order</VTab>
          <VTab v-if="accident.isTotalLoss">Total Loss Process</VTab>
        </VTabs>

        <VWindow v-model="activeTab" class="mt-4">
          <!-- Report Tab -->
          <VWindowItem>
            <VRow>
              <VCol cols="12" md="8">
                <VCard title="รายละเอียดเหตุการณ์">
                  <VCardText>
                    <VRow>
                      <VCol cols="6"><div class="text-caption">วันที่/เวลา</div><div class="font-weight-bold">{{ accident.accidentDate }} {{ accident.accidentTime }}</div></VCol>
                      <VCol cols="6"><div class="text-caption">สถานที่</div><div class="font-weight-bold">{{ accident.location }}, {{ accident.province }}</div></VCol>
                      <VCol cols="12"><div class="text-caption">คำบรรยายเหตุการณ์</div><p>{{ accident.description }}</p></VCol>
                      <VCol cols="4"><div class="text-caption">ความรุนแรง</div><VChip size="small" :color="accident.severity === 'SEVERE' ? 'error' : 'warning'">{{ accident.severity }}</VChip></VCol>
                      <VCol cols="4"><div class="text-caption">ฝ่ายผิด</div><div class="font-weight-bold">{{ accident.fault }}</div></VCol>
                      <VCol cols="4"><div class="text-caption">แจ้งตำรวจ</div><div class="font-weight-bold text-success" v-if="accident.policeStationReported">เรียบร้อย ({{ accident.policeReportNo }})</div><div v-else>ไม่ได้แจ้ง</div></VCol>
                    </VRow>
                  </VCardText>
                  <VDivider />
                  <VCardText>
                    <div class="text-subtitle-2 mb-2">รูปถ่ายในที่เกิดเหตุ</div>
                    <div class="d-flex gap-2">
                       <VCard v-for="i in 3" :key="i" width="120" height="80" class="d-flex align-center justify-center border" variant="tonal" color="secondary">
                         <VIcon icon="tabler-camera" />
                       </VCard>
                    </div>
                  </VCardText>
                </VCard>
              </VCol>
              <VCol cols="12" md="4">
                <VCard title="คู่กรณี (Third Party)">
                  <VCardText v-if="accident.thirdPartyVehicle">
                    <VList density="compact">
                      <VListItem title="1กก 9999" subtitle="ทะเบียน" />
                      <VListItem title="K. Somchai" subtitle="เจ้าของรถ" />
                      <VListItem title="Bangkok Insurance" subtitle="ประกันภัย" />
                    </VList>
                  </VCardText>
                  <VCardText v-else class="text-center py-10 text-secondary italic">
                    ไม่มีคู่กรณี
                  </VCardText>
                </VCard>
              </VCol>
            </VRow>
          </VWindowItem>

          <!-- Claim Tab -->
          <VWindowItem>
            <VCard title="Insurance Claims">
              <VTable>
                <thead>
                  <tr>
                    <th>Claim No.</th>
                    <th>ประเภท</th>
                    <th>วันที่เปิด</th>
                    <th class="text-right">วงเงินที่อนุมัติ</th>
                    <th class="text-right">Deductible</th>
                    <th class="text-center">สถานะ</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="c in claims" :key="c.id">
                    <td class="font-weight-bold text-primary">{{ c.claimNo }}</td>
                    <td>{{ c.claimType }}</td>
                    <td>{{ c.claimDate }}</td>
                    <td class="text-right font-weight-bold">{{ (c.approvedClaimAmount || 0).toLocaleString() }}</td>
                    <td class="text-right text-error">{{ c.deductible.toLocaleString() }}</td>
                    <td class="text-center">
                      <VChip :color="getClaimStatusColor(c.status)" size="small">{{ c.status }}</VChip>
                    </td>
                    <td><VBtn icon size="x-small" variant="text"><VIcon icon="tabler-edit" /></VBtn></td>
                  </tr>
                </tbody>
              </VTable>
              <VCardText v-if="claims.length === 0" class="text-center py-10">
                ยังไม่มีการเปิด Claim
              </VCardText>
            </VCard>
          </VWindowItem>

          <!-- Repair Tab -->
          <VWindowItem>
            <VCard title="การซ่อมแซม & Work Order">
              <VCardText class="d-flex flex-column align-center py-10">
                <VIcon icon="tabler-tools" size="64" color="secondary" class="mb-4" />
                <h3 class="text-h6">ยังไม่ได้สร้างใบสั่งซ่อม</h3>
                <p class="text-body-2 text-secondary">คุณสามารถสร้าง Work Order เพื่อส่งรถเข้าซ่อมหลังจาก Claim ได้รับการอนุมัติ</p>
                <VBtn color="success" prepend-icon="tabler-plus" class="mt-4">สร้าง Work Order (ใบสั่งซ่อม)</VBtn>
              </VCardText>
            </VCard>
          </VWindowItem>
        </VWindow>
      </VCol>
    </VRow>
  </div>
</template>
