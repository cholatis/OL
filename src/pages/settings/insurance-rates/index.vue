<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMasterDataStore } from '@/stores/masterData'

const masterDataStore = useMasterDataStore()

const selectedVehicleType = ref('SEDAN')
const selectedProvider = ref('MTI')

const insuranceGroups = [1, 2, 3, 4, 5]

const filteredRates = computed(() => {
    return masterDataStore.insuranceRates.filter(r => 
        r.vehicleType === selectedVehicleType.value && 
        r.provider === selectedProvider.value
    ).sort((a,b) => a.insuranceGroup - b.insuranceGroup)
})

const updatePremium = (item: any, val: string) => {
    const num = parseFloat(val)
    if (!isNaN(num)) item.premiumPerPayment = num
}
</script>

<template>
  <div>
    <VRow class="mb-6 align-center">
      <VCol cols="12">
        <h2 class="text-h4 font-weight-bold">Insurance Rates Matrix</h2>
        <p class="text-body-1 opacity-70">จัดการเบี้ยประกันรายงวด แยกตามกลุ่มประกันและประเภทรถ</p>
      </VCol>
    </VRow>

    <VCard elevation="0">
      <VCardText>
        <VRow class="align-center mb-6">
            <VCol cols="12" md="3">
                <VSelect v-model="selectedVehicleType" label="ประเภทรถ" :items="['SEDAN', 'SUV', 'PICKUP', 'VAN']" />
            </VCol>
            <VCol cols="12" md="3">
                <VSelect v-model="selectedProvider" label="บริษัทประกัน" :items="['MTI', 'TOKIO', 'AXA', 'BKI']" />
            </VCol>
        </VRow>

        <VTable border>
            <thead class="bg-light">
                <tr>
                    <th width="120">INS GRP</th>
                    <th>แผน / รายละเอียด</th>
                    <th width="250">Premium/งวด (฿)</th>
                    <th width="150" class="text-center">ประเภท</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="grp in insuranceGroups" :key="grp">
                    <td class="font-weight-bold text-h6 text-center">{{ grp }}</td>
                    <template v-if="filteredRates.find(r => r.insuranceGroup === grp)">
                        <td>
                            <VTextField 
                                v-model="filteredRates.find(r => r.insuranceGroup === grp)!.planCode" 
                                density="compact" 
                                hide-details 
                                variant="plain" 
                                placeholder="เช่น MTI SEDAN STD" 
                            />
                        </td>
                        <td>
                            <VTextField 
                                :model-value="filteredRates.find(r => r.insuranceGroup === grp)?.premiumPerPayment" 
                                @update:model-value="val => updatePremium(filteredRates.find(r => r.insuranceGroup === grp), val)"
                                density="compact" 
                                hide-details 
                                type="number"
                                prefix="฿" 
                                variant="outlined"
                            />
                        </td>
                        <td class="text-center">
                            <VChip size="x-small" label color="primary">Comprehensive</VChip>
                        </td>
                    </template>
                    <template v-else>
                        <td colspan="3" class="text-center text-medium-emphasis py-4">
                            <VBtn size="small" variant="tonal" prepend-icon="tabler-plus">Add Rate for Group {{ grp }}</VBtn>
                        </td>
                    </template>
                </tr>
            </tbody>
        </VTable>
      </VCardText>
    </VCard>
  </div>
</template>
