<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAccountingGLStore } from '@/stores/accounting-gl'

const accountingGLStore = useAccountingGLStore()

const search = ref('')
const selectedTab = ref('UNMATCHED')

const bankItems = computed(() => accountingGLStore.bankReconItems.filter(i => selectedTab.value === 'ALL' || i.status === selectedTab.value))

const systemReceipts = [
  { id: 'RC-001', date: '2024-03-05', customer: 'บริษัท เอบีซี จำกัด', amount: 48150, ref: 'RC-2024-001' },
  { id: 'RC-002', date: '2024-03-08', customer: 'บริษัท ไทยทรานสปอร์ต จำกัด', amount: 25000, ref: 'RC-2024-002' }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'MATCHED': return 'success'
    case 'UNMATCHED': return 'warning'
    case 'EXCEPTION': return 'error'
    default: return 'secondary'
  }
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Bank Reconciliation (กระทบยอดธนาคาร)">
        <VCardText>
          <VRow>
            <VCol cols="12" md="6">
                <VCard variant="outlined" class="pa-4 bg-light-primary border-primary">
                    <div class="d-flex align-center gap-4">
                        <VIcon icon="tabler-upload" color="primary" size="32" />
                        <div>
                            <div class="text-h6 text-primary">Upload Bank Statement</div>
                            <div class="text-caption">Support CSV, Excel (KBANK, SCB, BBL formats)</div>
                        </div>
                        <VSpacer />
                        <VBtn size="small">Choose File</VBtn>
                    </div>
                </VCard>
            </VCol>
            <VCol cols="12" md="6">
                 <div class="d-flex h-100 align-center justify-space-around border rounded">
                    <div class="text-center">
                        <div class="text-h6 text-success">12,450.00</div>
                        <div class="text-caption">Auto Matched today</div>
                    </div>
                    <VDivider vertical />
                    <div class="text-center">
                        <div class="text-h6 text-warning">2 items</div>
                        <div class="text-caption">Need manual review</div>
                    </div>
                 </div>
            </VCol>
          </VRow>

          <VTabs v-model="selectedTab" class="mt-6">
            <VTab value="UNMATCHED">Unmatched ({{ accountingGLStore.bankReconItems.filter(i => i.status === 'UNMATCHED').length }})</VTab>
            <VTab value="MATCHED">Matched</VTab>
            <VTab value="ALL">All Transactions</VTab>
          </VTabs>

          <VWindow v-model="selectedTab" class="mt-4">
             <VWindowItem value="UNMATCHED">
                <VRow>
                    <!-- Bank Statement Side -->
                    <VCol cols="12" md="6">
                        <div class="text-overline mb-2">BANK STATEMENT (TRANSACTIONS)</div>
                        <VCard variant="outlined" v-for="item in bankItems" :key="item.id" class="mb-2 recon-item cursor-move">
                            <VCardText class="pa-3 d-flex justify-space-between align-center">
                                <div>
                                    <div class="font-weight-bold">{{ item.bankRef }}</div>
                                    <div class="text-caption">{{ item.date }}</div>
                                </div>
                                <div class="text-right">
                                    <div class="text-body-2 font-weight-bold text-success">+{{ item.bankAmount.toLocaleString() }} ฿</div>
                                    <VBtn size="x-small" variant="tonal" class="mt-1">Auto Search</VBtn>
                                </div>
                            </VCardText>
                        </VCard>
                    </VCol>

                    <!-- System Receipt Side -->
                    <VCol cols="12" md="6">
                         <div class="text-overline mb-2">SYSTEM RECEIPTS (UNRECONCILED)</div>
                         <VCard variant="outlined" v-for="rc in systemReceipts" :key="rc.id" class="mb-2 recon-item-system border-dashed">
                             <VCardText class="pa-3 d-flex justify-space-between align-center">
                                <div>
                                    <div class="font-weight-bold">{{ rc.ref }}</div>
                                    <div class="text-caption">{{ rc.customer }} | {{ rc.date }}</div>
                                </div>
                                <div class="text-right">
                                    <div class="text-body-2 font-weight-bold">{{ rc.amount.toLocaleString() }} ฿</div>
                                    <VBtn icon="tabler-link" size="x-small" color="primary" variant="tonal" class="mt-1" />
                                </div>
                            </VCardText>
                         </VCard>
                    </VCol>
                </VRow>
             </VWindowItem>
          </VWindow>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped>
.recon-item { border-left: 4px solid rgb(var(--v-theme-warning)) !important; transition: all 0.2s; }
.recon-item:hover { background-color: rgba(var(--v-theme-on-surface), 0.02); border-color: rgb(var(--v-theme-primary)) !important; }
.recon-item-system { border-style: dashed !important; opacity: 0.8; }
.bg-light-primary { background-color: rgba(var(--v-theme-primary), 0.1); }
.border-primary { border-color: rgb(var(--v-theme-primary)) !important; }
.cursor-move { cursor: move; }
</style>
