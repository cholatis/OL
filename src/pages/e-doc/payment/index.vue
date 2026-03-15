<script setup lang="ts">
import { ref } from 'vue'
import { useEDocStore } from '@/stores/e-doc'

const eDocStore = useEDocStore()
const activeTab = ref(0)

const formatCurrency = (val: number) => {
  return val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VTabs v-model="activeTab" color="primary" class="mb-4">
        <VTab>Direct Debit Batch</VTab>
        <VTab>PromptPay QR</VTab>
        <VTab>Setup & Status</VTab>
      </VTabs>

      <VWindow v-model="activeTab">
        <!-- Direct Debit -->
        <VWindowItem>
          <VCard title="Monthly Collection Batch">
            <VCardText>
              <div class="d-flex gap-4 mb-6">
                <VTextField type="month" label="Select Month" style="max-width: 200px" />
                <VBtn color="primary" prepend-icon="tabler-player-play">Generate Batch</VBtn>
                <VBtn variant="tonal" color="secondary" prepend-icon="tabler-download">Export Bank File (EBPP)</VBtn>
              </div>

              <VTable>
                <thead>
                  <tr>
                    <th>Batch ID</th>
                    <th>Date</th>
                    <th>Method</th>
                    <th class="text-right">Total Amount</th>
                    <th class="text-center">Status</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="batch in eDocStore.paymentBatches" :key="batch.id">
                    <td class="font-weight-bold">{{ batch.batchNo }}</td>
                    <td>{{ batch.paymentDate }}</td>
                    <td><VChip size="x-small" label>{{ batch.paymentMethod }}</VChip></td>
                    <td class="text-right font-weight-bold">{{ formatCurrency(batch.totalAmount) }}</td>
                    <td class="text-center">
                      <VChip color="success" size="small">{{ batch.status }}</VChip>
                    </td>
                    <td class="text-center">
                      <VBtn icon size="x-small" variant="text" color="primary"><VIcon icon="tabler-eye" /></VBtn>
                    </td>
                  </tr>
                </tbody>
              </VTable>
            </VCardText>
          </VCard>
        </VWindowItem>

        <!-- PromptPay -->
        <VWindowItem>
          <VCard title="PromptPay QR Generator">
            <VCardText>
              <VRow>
                <VCol cols="12" md="6">
                  <VSelect :items="['INV-2024-001', 'INV-2024-002']" label="Select Invoice" class="mb-4" />
                  <VTextField label="Amount" prefix="฿" value="53,500.00" readonly class="mb-4" />
                  <VTextField label="Reference" value="REF12345678" readonly class="mb-4" />
                  <VBtn color="primary" block size="large">Generate QR Code</VBtn>
                </VCol>
                <VCol cols="12" md="6" class="d-flex flex-column align-center justify-center border-s">
                  <div class="pa-4 bg-white border rounded">
                    <VIcon icon="tabler-qrcode" size="200" color="primary" />
                  </div>
                  <div class="text-center mt-4">
                    <div class="text-h6 font-weight-bold">PromptPay</div>
                    <div class="text-caption">Scan to pay via any Banking App</div>
                  </div>
                </VCol>
              </VRow>
            </VCardText>
          </VCard>
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
</template>
