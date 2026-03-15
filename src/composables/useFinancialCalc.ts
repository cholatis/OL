import type { TFRS16Row, TFRS9Stage, PaymentCashflow } from '@/types/accounting'

export function useFinancialCalc() {
  // TFRS16: คำนวณ Present Value ของ lease payments
  function calcPresentValue(cashflows: number[], discountRate: number): number {
    const r = (discountRate / 100) / 12
    return cashflows.reduce((pv, cf, t) => {
      return pv + (cf / Math.pow(1 + r, t + 1))
    }, 0)
  }

  // TFRS16: สร้าง amortization schedule
  function buildTFRS16Schedule(
    leaseLiability: number,
    monthlyPayment: number,
    ibr: number,
    term: number,
    startDate: string
  ): TFRS16Row[] {
    const rows: TFRS16Row[] = []
    const r = (ibr / 100) / 12
    let currentLiability = leaseLiability
    let currentRou = leaseLiability
    const rouDepreciation = leaseLiability / term

    for (let i = 1; i <= term; i++) {
        const interest = currentLiability * r
        const principal = monthlyPayment - interest
        const opening = currentLiability
        currentLiability -= principal
        currentRou -= rouDepreciation

        rows.push({
            period: i,
            date: startDate, // Simple placeholder
            openingLeaseLiability: opening,
            leasePayment: monthlyPayment,
            interestExpense: interest,
            principalRepayment: principal,
            closingLeaseLiability: Math.max(0, currentLiability),
            rouDepreciation: rouDepreciation,
            closingRouAsset: Math.max(0, currentRou)
        })
    }
    return rows
  }

  // IRR: Newton-Raphson method (monthly)
  // Simple implementation for fixed cashflows
  function calcIRR(cashflows: PaymentCashflow[]): number {
    // Initial guess: 0.1 (10%)
    let rate = 0.1
    for (let i = 0; i < 20; i++) {
      let npv = 0
      let dNpv = 0
      for (const cf of cashflows) {
        const t = cf.period
        npv += cf.cashflow / Math.pow(1 + rate, t)
        dNpv -= t * cf.cashflow / Math.pow(1 + rate, t + 1)
      }
      rate = rate - npv / dNpv
    }
    return rate * 12 * 100 // Annualized percentage
  }

  // TFRS9 ECL
  function calcECL(pd: number, lgd: number, ead: number, stage: TFRS9Stage): number {
    if (stage === 'STAGE1') {
        // 12-month ECL
        return ead * pd * lgd
    } else {
        // Lifetime ECL (simplified, usually higher PD)
        return ead * (pd * 1.5) * lgd
    }
  }

  return {
    calcPresentValue,
    buildTFRS16Schedule,
    calcIRR,
    calcECL
  }
}
