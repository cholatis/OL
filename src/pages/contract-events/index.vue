<script setup lang="ts">
import { useContractEventStore } from '@/stores/contractEvent'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const eventStore = useContractEventStore()
const router = useRouter()

const headers = [
  { title: 'DATE', key: 'eventDate' },
  { title: 'EVENT TYPE', key: 'eventType' },
  { title: 'CONTRACT NO.', key: 'contractNo' },
  { title: 'REQUESTED BY', key: 'requestedBy' },
  { title: 'STATUS', key: 'status' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

const statusColor: Record<string, string> = {
  DRAFT: 'secondary',
  PENDING_APPROVAL: 'warning',
  APPROVED: 'info',
  IN_PROGRESS: 'primary',
  COMPLETED: 'success',
  CANCELLED: 'error',
}

const showCreateDialog = ref(false)
const selectedEventType = ref('')

const eventTypes = [
  { title: 'Renew / Extend', value: 'RENEW' },
  { title: 'Restructure (DR/TDR)', value: 'RESTRUCTURE' },
  { title: 'Amendment', value: 'AMENDMENT' },
  { title: 'Early Termination', value: 'EARLY_TERMINATION' },
  { title: 'Settlement', value: 'SETTLEMENT' },
  { title: 'Total Loss', value: 'TOTAL_LOSS' },
  { title: 'Sale & Leaseback', value: 'SALE_LEASEBACK' },
]

const createEvent = () => {
    router.push({
        path: '/contract-events/new',
        query: { type: selectedEventType.value }
    })
}
</script>

<template>
  <div>
    <VRow class="mb-6 align-center">
      <VCol cols="12" md="6">
        <h2 class="text-h4 font-weight-bold">Contract Events Log</h2>
        <p class="text-body-1 opacity-70">ติดตามความเคลื่อนไหวและวงจรชีวิตของสัญญาทั้งหมด</p>
      </VCol>
      <VCol cols="12" md="6" class="text-md-right">
        <VBtn color="primary" prepend-icon="tabler-plus" @click="showCreateDialog = true">
          บันทึก Event ใหม่
        </VBtn>
      </VCol>
    </VRow>

    <VCard>
      <VDataTable
        :headers="headers"
        :items="eventStore.events"
        class="text-no-wrap"
      >
        <template #[`item.eventDate`]="{ item }">
          <span class="text-body-2">{{ item.eventDate }}</span>
        </template>

        <template #[`item.eventType`]="{ item }">
          <VChip size="small" variant="tonal" color="primary">
            {{ item.eventType }}
          </VChip>
        </template>

        <template #[`item.status`]="{ item }">
          <VChip :color="statusColor[item.status]" size="x-small" label class="font-weight-bold">
            {{ item.status }}
          </VChip>
        </template>

        <template #[`item.actions`]="{ item }">
          <VBtn icon variant="text" size="small" :to="`/contract-events/${item.id}`">
            <VIcon icon="tabler-eye" />
          </VBtn>
        </template>
      </VDataTable>
    </VCard>

    <VDialog v-model="showCreateDialog" max-width="500">
        <VCard title="สร้าง Contract Event ใหม่">
            <VCardText>
                <VSelect 
                    v-model="selectedEventType" 
                    label="เลือกประเภทเหตุการณ์" 
                    :items="eventTypes"
                    class="mt-2"
                />
                <div class="mt-4 text-caption text-medium-emphasis">
                    แต่ละประเภทเหตุการณ์จะมีแบบฟอร์มและการคำนวณที่แตกต่างกันตามมาตรฐานบัญชี
                </div>
            </VCardText>
            <VCardActions>
                <VSpacer />
                <VBtn variant="tonal" color="secondary" @click="showCreateDialog = false">ยกเลิก</VBtn>
                <VBtn color="primary" :disabled="!selectedEventType" @click="createEvent">ต่อไป</VBtn>
            </VCardActions>
        </VCard>
    </VDialog>
  </div>
</template>
