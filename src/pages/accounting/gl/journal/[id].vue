<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAccountingGLStore } from '@/stores/accounting-gl'
import type { JournalLine } from '@/types/accounting-gl'

const route = useRoute()
const accountingGLStore = useAccountingGLStore()

const isNew = computed(() => route.params.id === 'new')
const jeNo = ref(isNew.value ? 'JE-AUTO-DRAFT' : route.params.id as string)

const header = ref({
  date: new Date().toISOString().split('T')[0],
  source: 'MANUAL',
  description: '',
  status: 'DRAFT'
})

const lines = ref<JournalLine[]>([
  { lineNo: 1, accountCode: '', accountName: '', description: '', dr: 0, cr: 0 },
  { lineNo: 2, accountCode: '', accountName: '', description: '', dr: 0, cr: 0 }
])

const totalDR = computed(() => lines.value.reduce((sum, l) => sum + (Number(l.dr) || 0), 0))
const totalCR = computed(() => lines.value.reduce((sum, l) => sum + (Number(l.cr) || 0), 0))
const difference = computed(() => Math.abs(totalDR.value - totalCR.value))

const addLine = () => {
    lines.value.push({ 
        lineNo: lines.value.length + 1, 
        accountCode: '', 
        accountName: '', 
        description: header.value.description, 
        dr: 0, 
        cr: 0 
    })
}

const removeLine = (idx: number) => {
    if (lines.value.length > 2) lines.value.splice(idx, 1)
}

const onAccountChange = (lineIdx: number, code: string) => {
    const acc = accountingGLStore.chartOfAccounts.find(a => a.code === code)
    if (acc) lines.value[lineIdx].accountName = acc.name
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard :title="isNew ? 'Create New Journal Entry' : `Journal Entry: ${jeNo}`">
        <template #append>
            <VChip :color="header.status === 'POSTED' ? 'success' : 'warning'" size="small" class="me-2">
                {{ header.status }}
            </VChip>
            <VBtn v-if="header.status === 'DRAFT'" color="success" prepend-icon="tabler-check" :disabled="difference !== 0 || totalDR === 0">
                Post Entry
            </VBtn>
        </template>

        <VCardText>
          <VRow class="mb-6 text-body-2">
            <VCol cols="12" md="3">
                <VTextField v-model="jeNo" label="JE Number" readonly density="compact" />
            </VCol>
            <VCol cols="12" md="3">
                <VTextField v-model="header.date" type="date" label="Entry Date" density="compact" />
            </VCol>
            <VCol cols="12" md="3">
                <VSelect v-model="header.source" :items="['MANUAL', 'ADJUSTMENT']" label="Source" density="compact" />
            </VCol>
            <VCol cols="12">
                <VTextarea v-model="header.description" label="Global Description" rows="2" density="compact" placeholder="e.g. Monthly maintenance adjustment..." />
            </VCol>
          </VRow>

          <VDivider class="mb-6" />

          <VTable density="compact" class="border rounded mb-4">
            <thead>
                <tr>
                    <th style="width: 50px">#</th>
                    <th style="width: 250px">บัญชี (Account Code)</th>
                    <th>คำอธิบาย (Description)</th>
                    <th class="text-right" style="width: 150px">Debit (DR)</th>
                    <th class="text-right" style="width: 150px">Credit (CR)</th>
                    <th style="width: 50px"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(line, idx) in lines" :key="idx">
                    <td>{{ idx + 1 }}</td>
                    <td>
                        <VAutocomplete
                            v-model="line.accountCode"
                            :items="accountingGLStore.chartOfAccounts"
                            item-title="name"
                            item-value="code"
                            density="compact"
                            hide-details
                            class="my-1"
                            @update:model-value="(val) => onAccountChange(idx, val)"
                        >
                            <template #item="{ props, item }">
                                <VListItem v-bind="props" :subtitle="item.raw.code" />
                            </template>
                        </VAutocomplete>
                    </td>
                    <td>
                        <VTextField v-model="line.description" density="compact" hide-details class="my-1" />
                    </td>
                    <td>
                        <VTextField v-model.number="line.dr" type="number" density="compact" hide-details class="my-1 text-right" />
                    </td>
                    <td>
                        <VTextField v-model.number="line.cr" type="number" density="compact" hide-details class="my-1 text-right" />
                    </td>
                    <td>
                        <VBtn icon="tabler-trash" size="x-small" color="error" variant="text" @click="removeLine(idx)" />
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr class="bg-light-secondary font-weight-bold">
                    <td colspan="3" class="text-right">Totals:</td>
                    <td class="text-right text-primary">{{ totalDR.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</td>
                    <td class="text-right text-error">{{ totalCR.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</td>
                    <td></td>
                </tr>
            </tfoot>
          </VTable>

          <VBtn prepend-icon="tabler-plus" variant="tonal" size="small" @click="addLine">Add Line</VBtn>

          <div v-if="difference !== 0" class="mt-4 text-error text-caption d-flex align-center gap-2">
            <VIcon icon="tabler-alert-circle" size="18" />
            <span>Unbalanced Entry: Difference of {{ difference.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</span>
          </div>
        </VCardText>

        <VCardActions class="pa-4 bg-light-on-surface">
            <VSpacer />
            <VBtn variant="tonal" color="secondary">Cancel</VBtn>
            <VBtn variant="elevated" color="primary">Save Draft</VBtn>
        </VCardActions>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped>
.bg-light-secondary { background-color: rgba(var(--v-theme-on-surface), 0.05); }
.bg-light-on-surface { background-color: rgba(var(--v-theme-on-surface), 0.02); }
</style>
