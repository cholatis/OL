<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAccountingGLStore } from '@/stores/accounting-gl'
import type { AccountType } from '@/types/accounting-gl'

const accountingGLStore = useAccountingGLStore()
const search = ref('')

const accountTypes: AccountType[] = ['ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE']

const getAccountColor = (type: AccountType) => {
  switch (type) {
    case 'ASSET': return 'primary'
    case 'LIABILITY': return 'error'
    case 'EQUITY': return 'secondary'
    case 'REVENUE': return 'success'
    case 'EXPENSE': return 'warning'
    default: return 'grey'
  }
}

// Hierarchical processing for Treeview
const rootAccounts = computed(() => {
  return accountingGLStore.chartOfAccounts.filter(acc => !acc.parentCode)
})

const getChildren = (parentCode: string) => {
  return accountingGLStore.chartOfAccounts.filter(acc => acc.parentCode === parentCode)
}

const headers = [
  { title: 'บัญชี (Code)', key: 'code' },
  { title: 'ชื่อบัญชี (Name)', key: 'name' },
  { title: 'ประเภท (Type)', key: 'type' },
  { title: 'ด้านปกติ (Nature)', key: 'nature' },
  { title: 'Level', key: 'level' },
  { title: 'สถานะ', key: 'active' },
  { title: 'Action', key: 'actions', sortable: false },
]
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="ผังบัญชี (Chart of Accounts)">
        <template #append>
          <div class="d-flex gap-4">
             <VTextField
              v-model="search"
              prepend-inner-icon="tabler-search"
              label="Search Code/Name"
              density="compact"
              hide-details
              style="width: 250px"
            />
            <VBtn prepend-icon="tabler-plus" color="primary">เพิ่มบัญชี</VBtn>
            <VBtn prepend-icon="tabler-download" variant="tonal">Export</VBtn>
          </div>
        </template>

        <VCardText>
          <VDataTable
            :headers="headers"
            :items="accountingGLStore.chartOfAccounts"
            :search="search"
            density="compact"
          >
            <template #item.code="{ item }">
              <span class="font-weight-bold" :class="`text-${getAccountColor(item.type)}`" style="text-decoration: none">
                {{ item.code }}
              </span>
            </template>

            <template #item.type="{ value }">
              <VChip :color="getAccountColor(value)" size="x-small" variant="tonal">
                {{ value }}
              </VChip>
            </template>

            <template #item.active="{ value }">
              <VChip :color="value ? 'success' : 'secondary'" size="x-small">
                {{ value ? 'Active' : 'Inactive' }}
              </VChip>
            </template>

            <template #item.actions="{ item }">
              <VBtn icon="tabler-edit" variant="text" size="small" color="info" />
              <VBtn 
                v-if="!item.isSystemAccount"
                icon="tabler-trash" 
                variant="text" 
                size="small" 
                color="error"
              />
              <VIcon v-else icon="tabler-lock" size="18" color="secondary" class="ms-2" />
            </template>
          </VDataTable>
        </VCardText>
      </VCard>
    </VCol>

    <!-- Visual Map of COA Structure -->
    <VCol cols="12">
        <VCard title="โครงสร้างบัญชี (Account Structure Map)">
            <VCardText>
                <VRow>
                    <VCol v-for="type in accountTypes" :key="type" cols="12" md="2">
                        <div class="border rounded pa-4 d-flex flex-column align-center">
                            <VAvatar :color="getAccountColor(type)" rounded size="42" class="mb-2">
                                <VIcon icon="tabler-hash" />
                            </VAvatar>
                            <div class="text-caption font-weight-bold">{{ type }}</div>
                            <div class="text-h6">{{ accountingGLStore.chartOfAccounts.filter(a => a.type === type).length }}</div>
                        </div>
                    </VCol>
                </VRow>
            </VCardText>
        </VCard>
    </VCol>
  </VRow>
</template>
