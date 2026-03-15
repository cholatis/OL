<script setup lang="ts">
import { useAssetStore } from '@/stores/asset'
import type { AssetSubstitution } from '@/types/asset'

const route = useRoute()
const router = useRouter()
const assetStore = useAssetStore()

const isNew = computed(() => (route.params as any).id === 'new')
const id = computed(() => (route.params as any).id as string)

const substitution = ref<Partial<AssetSubstitution>>({
  contractId: '',
  contractNo: '',
  originalAssetId: '',
  replacementAssetId: '',
  reason: 'DAMAGED',
  substitutionDate: new Date().toISOString().split('T')[0],
  remark: ''
})

const activeContracts = [
  { id: 'CON-1001', no: 'MLA-2024-05', customer: 'บริษัท สยาม โกลบอล เทค จำกัด' },
  { id: 'CON-1002', no: 'MLA-2024-12', customer: 'บริษัท เอเพ็กซ์ โลจิสติกส์ จำกัด' },
]

const originalAssetOptions = computed(() => {
  return assetStore.assets.filter(a => a.currentContractId === substitution.value.contractId)
})

const replacementAssetOptions = computed(() => {
  return assetStore.assets.filter(a => a.status === 'AVAILABLE')
})

const onContractChange = (id: string) => {
    const con = activeContracts.find(c => c.id === id)
    if (con) substitution.value.contractNo = con.no
}

onMounted(() => {
  if (!isNew.value) {
    const found = assetStore.substitutions.find(s => s.id === id.value)
    if (found) substitution.value = { ...found }
  }
})

const submitRequest = async () => {
    // Logic to save
    router.push('/asset-substitutions')
}
</script>

<template>
  <div class="max-600 mx-auto">
    <VRow class="mb-6 align-center">
      <VCol cols="12">
        <div class="d-flex align-center">
          <VBtn icon variant="text" @click="router.back()"><VIcon icon="tabler-arrow-left" /></VBtn>
          <h2 class="text-h4 font-weight-bold ms-2">{{ isNew ? 'สร้างคำขอสลับทรัพย์สิน' : `คำขอเลขที่ ${id}` }}</h2>
        </div>
      </VCol>
    </VRow>

    <VCard>
      <VCardText>
        <!-- Section 1: Contract -->
        <h3 class="text-h6 mb-4">1. เลือกสัญญาที่ต้องการสลับ</h3>
        <VAutocomplete
          v-model="substitution.contractId"
          label="เลขที่สัญญา*"
          :items="activeContracts"
          item-title="no"
          item-value="id"
          variant="outlined"
          @update:model-value="onContractChange"
        />
        <VTextField
            v-if="substitution.contractId"
            label="ลูกค้าปัจจุบัน"
            :model-value="activeContracts.find(c => c.id === substitution.contractId)?.customer"
            readonly
            variant="filled"
            class="mt-2"
        />
        
        <VDivider class="my-6" />

        <!-- Section 2: Original Asset -->
        <h3 class="text-h6 mb-4">2. ทรัพย์สินเดิม (ชำรุด/สูญหาย)</h3>
        <VSelect
          v-model="substitution.originalAssetId"
          label="ทรัพย์สินที่ต้องการเปลี่ยน*"
          :items="originalAssetOptions"
          item-title="serialNumber"
          item-value="id"
          variant="outlined"
          placeholder="เลือกจากรายการในสัญญา"
        />
        <VCard v-if="substitution.originalAssetId" variant="tonal" color="error" class="mt-2">
            <VCardText class="d-flex justify-space-between align-center py-2">
                <span>Model: {{ assetStore.assets.find(a => a.id === substitution.originalAssetId)?.model }}</span>
                <VChip size="x-small" color="error">IN CONTRACT</VChip>
            </VCardText>
        </VCard>

        <VDivider class="my-6" />

        <!-- Section 3: Replacement Asset -->
        <h3 class="text-h6 mb-4">3. ทรัพย์สินทดแทน (สต็อกว่าง)</h3>
         <VSelect
          v-model="substitution.replacementAssetId"
          label="เลือกทรัพย์สินสำรอง/ใหม่*"
          :items="replacementAssetOptions"
          item-title="serialNumber"
          item-value="id"
          variant="outlined"
          placeholder="เลือกจาก Available Assets"
        />
        <VCard v-if="substitution.replacementAssetId" variant="tonal" color="success" class="mt-2">
            <VCardText class="d-flex justify-space-between align-center py-2">
                <span>Model: {{ assetStore.assets.find(a => a.id === substitution.replacementAssetId)?.model }}</span>
                <VChip size="x-small" color="success">AVAILABLE</VChip>
            </VCardText>
        </VCard>

        <VDivider class="my-6" />

        <!-- Section 4: Details -->
        <h3 class="text-h6 mb-4">4. เหตุผลและหลักฐาน</h3>
        <VRadioGroup v-model="substitution.reason" inline>
            <VRadio label="เสียหาย (DAMAGED)" value="DAMAGED" color="error" />
            <VRadio label="สูญหาย (LOST)" value="LOST" color="secondary" />
            <VRadio label="อัปเกรด (UPGRADE)" value="UPGRADE" color="primary" />
        </VRadioGroup>
        
        <VTextField v-model="substitution.substitutionDate" label="วันที่เริ่มสลับ*" type="date" class="mt-4" />
        <VTextarea v-model="substitution.remark" label="หมายเหตุ / รายละเอียดความเสียหาย" rows="3" class="mt-4" />

        <VAlert color="primary" variant="tonal" icon="tabler-info-circle" class="mt-6">
            การสลับนี้จะคงเงื่อนไขสัญญาเดิมทั้งหมด (ค่าเช่า/วันหมดสัญญา) แต่จะเปลี่ยนหมายเลขตัวถังในระบบ Lease Assignment ให้อัตโนมัติเมื่ออนุมัติ
        </VAlert>
      </VCardText>

      <VCardActions class="pa-4">
        <VSpacer />
        <VBtn variant="tonal" color="secondary" @click="router.back()">ยกเลิก</VBtn>
        <VBtn color="primary" @click="submitRequest">ส่งคำขอสลับทรัพย์สิน</VBtn>
      </VCardActions>
    </VCard>
  </div>
</template>

<style scoped>
.max-600 {
    max-width: 800px;
}
</style>
