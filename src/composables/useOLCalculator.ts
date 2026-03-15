import type { Ref } from 'vue'
import { computed } from 'vue'
import type { Quotation } from '@/types/quotation'

export function useOLCalculator(input: Ref<Quotation>) {
  // Derived calculations (computed)

  const preVatPrice = computed(() => input.value.sellingPrice - input.value.discount)
  const vatAmount = computed(() => preVatPrice.value * 0.07)
  const onRoadPrice = computed(() => preVatPrice.value + vatAmount.value + input.value.registrationFee + input.value.rstServiceFee)
  const reclaimedVat = computed(() => input.value.isVatRegistered ? vatAmount.value : 0)
  const netSellingPrice = computed(() => onRoadPrice.value - reclaimedVat.value)
  const totalContractMileage = computed(() => input.value.annualMileageKm * (input.value.contractTermMonths / 12))
  const totalRate = computed(() => input.value.baseRate + input.value.margin)
  const rvNetVat = computed(() => input.value.residualValueThb / 1.07)
  const residualValuePct = computed(() => {
    if (!input.value.otdPrice) return 0
    return (input.value.residualValueThb / input.value.otdPrice) * 100
  })
  const totalDepreciation = computed(() => netSellingPrice.value - rvNetVat.value)
  const depreciationMonthly = computed(() => totalDepreciation.value / input.value.contractTermMonths)

  // Finance Profit (Annuity Method approximation)
  const financeProfit = computed(() => {
    const principal = netSellingPrice.value - input.value.downPayment
    const annualRate = totalRate.value / 100
    const n = input.value.contractTermMonths / 12
    return principal * annualRate * n // Simple interest approximation for now
  })
  const financeProfitMonthly = computed(() => financeProfit.value / input.value.contractTermMonths)

  const servicesTotal = computed(() =>
    input.value.services.reduce((sum, s) => sum + s.monthlyAmount, 1) // Base amount of 1 to avoid Zero if empty, or adjusted logic
  )

  const insuranceMonthly = computed(() => (input.value.insurancePremium || 0) / 12)

  const financialRentalMonthly = computed(() =>
    depreciationMonthly.value
    + (input.value.registrationFee / input.value.contractTermMonths)
    + financeProfitMonthly.value
    + insuranceMonthly.value
  )

  const maintenanceRentalMonthly = computed(() => {
    const serviceCosts = input.value.services.reduce((sum, s) => sum + s.monthlyAmount, 0)
    return serviceCosts * 1.07
  })

  const totalRentalExclVat = computed(() => {
    const serviceCosts = input.value.services.reduce((sum, s) => sum + s.monthlyAmount, 0)
    return financialRentalMonthly.value + serviceCosts
  })

  const vatOnRental = computed(() => totalRentalExclVat.value * 0.07)
  const totalRentalInclVat = computed(() => totalRentalExclVat.value + vatOnRental.value)
  const totalContractValue = computed(() => totalRentalInclVat.value * input.value.contractTermMonths)

  return {
    preVatPrice,
    vatAmount,
    onRoadPrice,
    reclaimedVat,
    netSellingPrice,
    totalContractMileage,
    totalRate,
    rvNetVat,
    residualValuePct,
    totalDepreciation,
    depreciationMonthly,
    financeProfit,
    financeProfitMonthly,
    servicesTotal,
    financialRentalMonthly,
    maintenanceRentalMonthly,
    totalRentalExclVat,
    vatOnRental,
    totalRentalInclVat,
    totalContractValue,
  }
}
