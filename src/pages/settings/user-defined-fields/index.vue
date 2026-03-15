<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAccountingStore } from '@/stores/accounting'
import type { UDFEntity, UDFFieldType, UDFDefinition } from '@/types/accounting'

const accountingStore = useAccountingStore()
const selectedEntity = ref<UDFEntity>('CONTRACT')

const filteredUDFs = computed(() => 
  accountingStore.udfDefinitions.filter(u => u.entity === selectedEntity.value)
)

const isDialogOpen = ref(false)
const newUDF = ref<Partial<UDFDefinition>>({
  entity: 'CONTRACT',
  fieldLabel: '',
  fieldType: 'TEXT',
  required: false,
  active: true,
  dropdownOptions: []
})

const entities: UDFEntity[] = ['CONTRACT', 'CUSTOMER', 'ASSET', 'INVOICE', 'QUOTATION']
const fieldTypes: UDFFieldType[] = ['TEXT', 'NUMBER', 'DATE', 'DROPDOWN', 'CHECKBOX', 'TEXTAREA']

const addOption = () => {
  if (!newUDF.value.dropdownOptions) newUDF.value.dropdownOptions = []
  newUDF.value.dropdownOptions.push('')
}

const saveUDF = () => {
    const udf = {
        ...newUDF.value,
        id: `UDF-${Date.now()}`,
        fieldCode: `UDF_${newUDF.value.entity}_${Date.now().toString().slice(-4)}`,
        displayOrder: filteredUDFs.value.length + 1,
        createdBy: 'Admin'
    } as UDFDefinition
    
    accountingStore.addUDF(udf)
    isDialogOpen.value = false
}
</script>

<template>
  <VRow>
    <VCol cols="12" md="3">
        <VCard title="Entities">
            <VList density="compact">
                <VListItem
                    v-for="e in entities"
                    :key="e"
                    :title="e"
                    :active="selectedEntity === e"
                    @click="selectedEntity = e"
                    rounded
                    class="mb-1"
                    active-color="primary"
                >
                    <template #prepend>
                        <VIcon icon="tabler-hash" size="18" class="me-2" />
                    </template>
                </VListItem>
            </VList>
        </VCard>
    </VCol>

    <VCol cols="12" md="9">
      <VCard :title="`User Defined Fields (UDF) - ${selectedEntity}`">
        <template #append>
          <VBtn prepend-icon="tabler-plus" @click="isDialogOpen = true">
            Add Global Field
          </VBtn>
        </template>

        <VDataTable
          :headers="[
            { title: 'Order', key: 'displayOrder' },
            { title: 'Label', key: 'fieldLabel' },
            { title: 'Type', key: 'fieldType' },
            { title: 'Code', key: 'fieldCode' },
            { title: 'Required', key: 'required' },
            { title: 'Active', key: 'active' },
            { title: 'Actions', key: 'actions', sortable: false },
          ]"
          :items="filteredUDFs"
          density="compact"
        >
          <template #item.required="{ value }">
             <VIcon :icon="value ? 'tabler-check' : 'tabler-x'" :color="value ? 'success' : 'secondary'" size="18" />
          </template>

          <template #item.active="{ value }">
             <VSwitch :model-value="value" color="success" density="compact" hide-details readonly />
          </template>

          <template #item.actions>
            <VBtn icon="tabler-edit" variant="text" size="small" />
            <VBtn icon="tabler-trash" variant="text" size="small" color="error" />
          </template>
        </VDataTable>
      </VCard>
    </VCol>

    <!-- Dialog -->
    <VDialog v-model="isDialogOpen" max-width="600">
        <VCard title="Define New Custom Field">
            <VCardText>
                <VRow>
                    <VCol cols="12" md="6">
                        <VSelect v-model="newUDF.entity" :items="entities" label="Entity Bound" />
                    </VCol>
                    <VCol cols="12" md="6">
                        <VSelect v-model="newUDF.fieldType" :items="fieldTypes" label="Data Type" />
                    </VCol>
                    <VCol cols="12">
                        <VTextField v-model="newUDF.fieldLabel" label="Field Label (Visible Name)" placeholder="e.g. Sales Branch ID" />
                    </VCol>
                    <VCol cols="12">
                         <VCheckbox v-model="newUDF.required" label="Mark as Required Field" hide-details />
                    </VCol>

                    <VCol v-if="newUDF.fieldType === 'DROPDOWN'" cols="12">
                        <div class="d-flex justify-space-between align-center mb-2">
                             <VLabel>Dropdown Options</VLabel>
                             <VBtn size="x-small" prepend-icon="tabler-plus" @click="addOption">Add Option</VBtn>
                        </div>
                        <VRow v-for="(opt, idx) in newUDF.dropdownOptions" :key="idx" dense>
                            <VCol cols="10">
                                <VTextField v-model="newUDF.dropdownOptions[idx]" density="compact" placeholder="Option value" />
                            </VCol>
                            <VCol cols="2">
                                <VBtn icon="tabler-trash" size="x-small" color="error" variant="text" @click="newUDF.dropdownOptions.splice(idx, 1)" />
                            </VCol>
                        </VRow>
                    </VCol>
                </VRow>
            </VCardText>
            <VCardActions>
                <VSpacer />
                <VBtn variant="tonal" color="secondary" @click="isDialogOpen = false">Cancel</VBtn>
                <VBtn variant="elevated" color="primary" @click="saveUDF">Create Field</VBtn>
            </VCardActions>
        </VCard>
    </VDialog>
  </VRow>
</template>
