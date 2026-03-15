import type { FixedAsset, DepreciationScheduleRow } from '@/types/fixed-assets'

export function useDepreciation() {
  // Straight Line: (Cost - Residual) / LifeYears
  function calcStraightLine(cost: number, residual: number, lifeYears: number): number {
    if (lifeYears <= 0) return 0
    return (cost - residual) / lifeYears
  }

  // Declining Balance: NBV * Rate
  function calcDecliningBalance(nbv: number, rate: number): number {
    return nbv * (rate / 100)
  }

  // Build Full Schedule (Monthly)
  function buildDepreciationSchedule(asset: FixedAsset): DepreciationScheduleRow[] {
    const rows: DepreciationScheduleRow[] = []
    const totalMonths = asset.usefulLifeYears * 12
    const monthlyDepr = calcStraightLine(asset.acquisitionCost, asset.residualValue, asset.usefulLifeYears) / 12

    let currentNBV = asset.acquisitionCost
    let currentAccumDepr = 0
    
    // Start date parsing
    const startDate = new Date(asset.acquisitionDate)

    for (let i = 1; i <= totalMonths; i++) {
        const openingNBV = currentNBV
        let expense = monthlyDepr
        
        // Ensure NBV doesn't go below residual
        if (currentNBV - expense < asset.residualValue) {
            expense = currentNBV - asset.residualValue
        }
        
        currentAccumDepr += expense
        currentNBV -= expense
        
        const periodDate = new Date(startDate)
        periodDate.setMonth(startDate.getMonth() + i - 1)
        
        const periodStr = `${periodDate.getFullYear()}-${String(periodDate.getMonth() + 1).padStart(2, '0')}`

        rows.push({
            period: periodStr,
            date: periodDate.toISOString().split('T')[0],
            openingNBV,
            depreciationExpense: expense,
            accumulatedDepreciation: currentAccumDepr,
            closingNBV: currentNBV
        })
        
        if (currentNBV <= asset.residualValue) break
    }

    return rows
  }

  // Get NBV at specific date
  function getNBVAtDate(asset: FixedAsset, asOfDate: string): number {
    const schedule = buildDepreciationSchedule(asset)
    const targetDate = new Date(asOfDate)
    
    const row = schedule.reverse().find(r => new Date(r.date) <= targetDate)
    return row ? row.closingNBV : asset.acquisitionCost
  }

  return {
    calcStraightLine,
    calcDecliningBalance,
    buildDepreciationSchedule,
    getNBVAtDate
  }
}
