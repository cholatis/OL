import type { LeaseScheduleRow } from '@/types/billing'
import type { ETDetails, PaymentRow } from '@/types/contract-event'

export function useContractEvent() {
  // คำนวณ ET Settlement
  function calculateET(
    outstandingPrincipal: number,
    unearnedIncome: number,
    etFeeRate: number,
    insuranceRefund: number,
    securityDepositRefund: number
  ): Partial<ETDetails> {
    const etFee = (outstandingPrincipal * etFeeRate) / 100
    const netPayable = outstandingPrincipal + etFee - insuranceRefund - securityDepositRefund

    return {
      outstandingPrincipal,
      unearnedIncome,
      etFeeRate,
      etFee,
      insuranceRefund,
      securityDepositRefund,
      netPayable
    }
  }

  // คำนวณผลกระทบ Total Loss
  function calculateTotalLoss(
    outstandingPrincipal: number, 
    insuranceClaim: number, 
    deductible: number
  ) {
    const assetWriteOff = outstandingPrincipal
    const netImpact = assetWriteOff - insuranceClaim + deductible
    
    return {
      assetWriteOff,
      insuranceClaim,
      insuranceDeductible: deductible,
      netImpact
    }
  }

  // Generate Restructured Schedule
  function generateRestructuredSchedule(
    currentPeriod: number,
    remainingPeriods: number,
    newAmount: number,
    startDate: string
  ): PaymentRow[] {
    const schedule: PaymentRow[] = []
    let currentDate = new Date(startDate)

    for (let i = 1; i <= remainingPeriods; i++) {
        schedule.push({
            period: currentPeriod + i,
            date: currentDate.toISOString().split('T')[0],
            amount: newAmount
        })
        currentDate.setMonth(currentDate.getMonth() + 1)
    }

    return schedule
  }

  return {
    calculateET,
    calculateTotalLoss,
    generateRestructuredSchedule
  }
}
