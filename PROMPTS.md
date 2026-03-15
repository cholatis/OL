# Vue Prototype Prompts — Operating Lease B2B System
## Stack: Vue 3 + Vite + Vuetify 3 + TypeScript + Pinia + vue-router (Vuexy template)

---

## โครงสร้างเมนูทั้งหมด (Navigation Structure) — v5 (รวม CRM & Sales)

```
├── 📊 Dashboard
│
├── 🎯 CRM & Sales                         ← PROMPT 20, 21 (ใหม่)
│   │
│   ├── 👥 ลูกค้า 360°                    ← PROMPT 20
│   │   ├── รายการลูกค้า (Customer List)
│   │   ├── Customer 360° Profile
│   │   ├── Contact Persons
│   │   └── Customer Segmentation
│   │
│   ├── 💬 Engagement                     ← PROMPT 20
│   │   ├── Campaign Management
│   │   ├── Message Templates
│   │   ├── Auto-Trigger Rules
│   │   ├── Customer Portal
│   │   └── NPS / CSAT Survey
│   │
│   ├── 🏆 Sales Pipeline                 ← PROMPT 21
│   │   ├── Pipeline (Kanban)
│   │   ├── Opportunity Detail
│   │   └── Activity Log
│   │
│   └── 📈 Sales Performance              ← PROMPT 21
│       ├── Performance Dashboard
│       ├── Target Management
│       ├── Commission
│       └── Win/Loss Analysis
│
├── 👥 ลูกค้า B2B (Customer)               ← PROMPT 2, 12
│   ├── รายการลูกค้า
│   ├── เพิ่ม/แก้ไขลูกค้า
│   └── KYC & Credit Scoring
│
├── 📋 ใบเสนอราคา (Quotation)              ← PROMPT 3
│   ├── รายการใบเสนอราคา
│   └── สร้าง/แก้ไขใบเสนอราคา (PD14)
│
├── 📄 สัญญา (Contract)                    ← PROMPT 6, 7, 11
│   ├── Master Lease Agreement
│   ├── Equipment Schedule
│   └── Contract Events
│       (Renew/Extend/Restructure/Amendment/Transfer/Sublease/SLB/ET/TL)
│
├── 🚚 Fleet Management                    ← PROMPT 4, 17, 18, 19
│   │
│   ├── 📦 Procurement                     ← PROMPT 17 (ใหม่)
│   │   ├── Purchase Request (PR)
│   │   ├── Purchase Order (PO)
│   │   └── Goods Receipt (รับรถ + PDI)
│   │
│   ├── 🏭 Stock / Port                    ← PROMPT 17 (ใหม่)
│   │   ├── Stock Dashboard
│   │   └── Port Management (รถนำเข้า)
│   │
│   ├── 🔧 Asset Register                  ← PROMPT 4
│   │   ├── ทะเบียนทรัพย์สิน
│   │   └── Asset Substitution (Car Replacement)
│   │
│   ├── 🛡️ Insurance & พรบ & ภาษี         ← PROMPT 18 (ใหม่)
│   │   ├── Insurance Portfolio
│   │   ├── Insurance Renewal
│   │   ├── พรบ Management
│   │   └── ภาษีรถยนต์ประจำปี
│   │
│   ├── 💥 Accident & Claim               ← PROMPT 18 (ใหม่)
│   │   ├── Accident Reports
│   │   └── Insurance Claims
│   │
│   ├── 🏷️ Disposal & Remarketing         ← PROMPT 19 (ใหม่)
│   │   ├── Disposal Pipeline
│   │   ├── Return Inspection
│   │   ├── Asset Valuation
│   │   └── Auction Management
│   │
│   └── 🤝 Vendors / MA                   ← PROMPT 17, 18 (ใหม่)
│       ├── Dealer / Vendor List
│       └── Maintenance Agreement (MA)
│
├── 💰 Billing & Collection                ← PROMPT 5, 8, 12, 14
│   ├── Lease Schedule
│   ├── Invoice
│   ├── Receipt (รับชำระ)
│   ├── Debtor Management / Aging
│   └── Bank Reconciliation
│
├── 🛠️ Maintenance                         ← PROMPT 9
│   ├── Work Orders
│   └── PM Plan
│
├── ⚖️ Credit / Legal / NCB               ← PROMPT 12
│   ├── NCB
│   └── Legal & Seize
│
├── 🏗️ Fixed Assets (FA)                  ← PROMPT 15
│   ├── FA Register
│   ├── Depreciation Run
│   ├── Disposal / Write-off
│   └── Revaluation
│
├── 📐 Accounting                          ← PROMPT 13, 14
│   ├── Chart of Accounts
│   ├── General Ledger (GL)
│   ├── AR + SOA + Bank Recon
│   ├── AP
│   ├── TFRS9 (ECL Staging)
│   ├── TFRS16 (ROU / Lease Liability)
│   ├── DR / TDR
│   ├── Residual Value (RV)
│   └── Rate / Yield / IRR / EIR
│
├── 📨 E-Documents & Tax                  ← PROMPT 16
│   ├── E-Tax Invoice / E-Receipt
│   ├── E-WHT
│   ├── E-Payment
│   ├── E-Stamp
│   └── E-Filing Dashboard
│
├── ⚙️ Settings                           ← PROMPT 10, 13
│   ├── Rate Tables
│   ├── Insurance Rates / Base Rate / RV
│   └── User Defined Fields (UDF)
│
└── 📈 Reports
```

### สรุป PROMPT ทั้งหมด 21 รายการ

| PROMPT | Module | Comply Table |
|--------|--------|--------------|
| 1 | Navigation + Dashboard | — |
| 2 | Customer B2B | Quotation, KYC (บางส่วน) |
| 3 | Quotation (PD14) | Quotation, Pricing structure |
| 4 | Asset Management | New/Used assets, Procurement |
| 5 | Billing + Lease Schedule | Payment schedule |
| 6 | Master Lease Agreement | Contract types, Renew/Extend |
| 7 | Equipment Schedule | 1 contract: multiple assets |
| 8 | Invoice | Billing and Collection (บางส่วน) |
| 9 | Work Order + PM Plan | Pricing w/ service |
| 10 | Master Data / Settings | Rate Tables |
| 11 | **Contract Events & Lifecycle** | Renew/Extend/Restructure/Amendment/Transfer/Sublease/SLB/ET/TotalLoss, Down payment, Security deposit |
| 12 | **Credit, KYC & Debtor Mgmt** | KYC+PDPA, Credit scoring, Debtor mgmt, NCB, Legal & Seize |
| 13 | **Financial Accounting & Compliance** | TFRS9, DR/TDR, Fixed/Floating rate, Yield/IRR/EIR, UDF, TFRS16 (OL-specific) |
| 14 | **GL / AR / AP & Billing-Collection** | GL, AR, AP, Billing & Collection (Receipt, SOA, Bank Recon) |
| 15 | **Fixed Assets (Lessor FA)** | Fixed assets |
| 16 | **E-Document & Tax Compliance** | E-invoice, E-tax, E-WHT, E-receipt, E-payment, E-filing, E-stamp |
| 17 | **Stock / Port / Procurement** | Stock Management, Port Management, Procurement (PR→PO→GR→3-Way Match) |
| 18 | **Insurance, พรบ, ภาษีรถ & Accident/Claim** | พรบ, ประกัน, ภาษีรถ (renewal tracking), MA Contract, Accident Report, Insurance Claim |
| 19 | **Disposal & Remarketing** | Disposal (Return Inspection, Valuation, Auction, Transfer, Deregistration) |
| 20 | **CRM: Customer 360° & Social Engagement** | Social engagement (LINE OA, Email, SMS, Portal, NPS), Customer Data (360° Profile, Contact Persons, Segmentation, PDPA Consent) |
| 21 | **Sales Activity & Performance** | Sale Activity (Pipeline, Opportunity, Activity Log), Sale Performance (Target vs Actual, Commission, Win/Loss, Forecast) |

---

## PROMPT 1 — Navigation + Dashboard

```
สร้าง Navigation Menu และ Dashboard สำหรับระบบ Operating Lease B2B
โดยใช้ Vuexy template (Vue 3 + Vuetify 3 + TypeScript + Pinia)

=== 1. อัปเดต src/navigation/vertical/index.ts ===

แทนที่ค่าเดิมด้วยเมนูนี้:

[
  {
    title: 'Dashboard',
    to: { name: 'index' },
    icon: { icon: 'tabler-layout-dashboard' },
  },
  {
    title: 'ลูกค้า B2B',
    icon: { icon: 'tabler-building' },
    children: [
      { title: 'รายการลูกค้า', to: { name: 'customers' }, icon: { icon: 'tabler-list' } },
    ],
  },
  {
    title: 'ใบเสนอราคา',
    icon: { icon: 'tabler-file-description' },
    children: [
      { title: 'รายการใบเสนอราคา', to: { name: 'quotations' }, icon: { icon: 'tabler-list' } },
    ],
  },
  {
    title: 'สัญญา',
    icon: { icon: 'tabler-contract' },
    children: [
      { title: 'Master Lease Agreement', to: { name: 'contracts' }, icon: { icon: 'tabler-list' } },
      { title: 'Equipment Schedule', to: { name: 'equipment-schedules' }, icon: { icon: 'tabler-list' } },
    ],
  },
  {
    title: 'ทรัพย์สิน',
    icon: { icon: 'tabler-car' },
    children: [
      { title: 'ทะเบียนทรัพย์สิน', to: { name: 'assets' }, icon: { icon: 'tabler-list' } },
      { title: 'Asset Substitution', to: { name: 'asset-substitutions' }, icon: { icon: 'tabler-replace' } },
    ],
  },
  {
    title: 'การเรียกเก็บเงิน',
    icon: { icon: 'tabler-receipt' },
    children: [
      { title: 'Lease Schedule', to: { name: 'lease-schedules' }, icon: { icon: 'tabler-list' } },
      { title: 'ใบแจ้งหนี้', to: { name: 'invoices' }, icon: { icon: 'tabler-file-invoice' } },
    ],
  },
  {
    title: 'บำรุงรักษา',
    icon: { icon: 'tabler-tool' },
    children: [
      { title: 'Work Orders', to: { name: 'work-orders' }, icon: { icon: 'tabler-list-check' } },
      { title: 'แผน PM', to: { name: 'pm-plans' }, icon: { icon: 'tabler-calendar' } },
    ],
  },
  {
    title: 'รายงาน',
    to: { name: 'reports' },
    icon: { icon: 'tabler-chart-bar' },
  },
]

=== 2. แก้ไข src/pages/index.vue เป็น Dashboard ===

สร้าง Dashboard ที่มี:

A) KPI Cards แถวบน (4 cards):
   - Total Assets: จำนวนทรัพย์สินทั้งหมด + แยก ACTIVE/MAINTENANCE/AVAILABLE
   - MRR (Monthly Recurring Revenue): ยอดค่าเช่าเดือนนี้รวม VAT (บาท)
   - สัญญาใกล้หมด (30 วัน): จำนวนสัญญา + ปุ่ม "ดูทั้งหมด"
   - ค้างชำระ: จำนวนใบแจ้งหนี้ค้าง + ยอดรวม (บาท)

B) กราฟ Asset Status (donut chart ด้วย ApexCharts):
   - ACTIVE / MAINTENANCE / AVAILABLE / RETURNED แสดงเป็นสัดส่วน %

C) ตาราง "สัญญาใกล้หมดอายุ" (top 5):
   คอลัมน์: เลขสัญญา | ลูกค้า | จำนวน Asset | วันหมดสัญญา | เหลืออีก (วัน) | Action (ดูรายละเอียด)
   แสดง badge สี: แดง <30 วัน | เหลือง <60 วัน | เขียว >60 วัน

D) กราฟ Monthly Revenue (bar chart ด้วย ApexCharts):
   แสดง Financial Rental vs Maintenance Rental ย้อนหลัง 6 เดือน

ให้ใช้ข้อมูล mock (hardcode ใน composable หรือ ref) ไม่ต้อง call API จริง
ใช้ Vuetify components: VCard, VCardText, VRow, VCol, VChip, VDataTable
ใช้ ApexCharts ที่มีอยู่แล้วใน dependencies (vue3-apexcharts)
```

---

## PROMPT 2 — Customer B2B Module (ลูกค้า)

```
สร้าง Customer B2B Module สำหรับ Operating Lease ใน Vuexy template
(Vue 3 + Vuetify 3 + TypeScript + Pinia)

=== ไฟล์ที่ต้องสร้าง ===

1. src/pages/customers/index.vue  (List Page)
2. src/pages/customers/[id].vue   (Create / Edit / View Page)
3. src/stores/customer.ts         (Pinia Store)
4. src/types/customer.ts          (TypeScript Types)

=== TypeScript Types (src/types/customer.ts) ===

interface Customer {
  id: string
  // ข้อมูลบริษัท
  companyName: string
  taxId: string                // เลขทะเบียนนิติบุคคล 13 หลัก
  companyType: 'CO_LTD' | 'PCL' | 'LP' | 'GOVERNMENT' | 'OTHER'
  registeredDate: string
  registeredCapital: number
  businessType: string         // ประเภทธุรกิจ
  // ที่อยู่
  address: string
  subdistrict: string
  district: string
  province: string
  postalCode: string
  // ผู้ติดต่อ
  contactName: string
  contactPosition: string
  contactPhone: string
  contactEmail: string
  website?: string
  // เครดิต
  creditLimit: number          // วงเงินที่อนุมัติ (Fleet Facility)
  creditUsed: number           // วงเงินที่ใช้ไปแล้ว
  customerSegment: 'CORPORATE' | 'GOVERNMENT' | 'SME'
  status: 'ACTIVE' | 'SUSPENDED' | 'BLACKLIST'
  // เอกสาร
  documents: CustomerDocument[]
  createdAt: string
  updatedAt: string
}

interface CustomerDocument {
  id: string
  type: 'COMPANY_CERT' | 'SHAREHOLDER_LIST' | 'AUTHORIZED_SIGNATORY' |
        'FINANCIAL_STMT' | 'BANK_STATEMENT' | 'VAT_CERT' | 'OTHER'
  fileName: string
  uploadedAt: string
  url?: string
}

=== 2A. List Page (src/pages/customers/index.vue) ===

สร้างหน้า List ที่มี:

Header Section:
- Title "รายการลูกค้า B2B"
- ปุ่ม "+ เพิ่มลูกค้าใหม่" (นำไปหน้า /customers/new)
- Search bar (ค้นหาชื่อบริษัท / เลขทะเบียน)
- Filter: Customer Segment (All / Corporate / Government / SME)
- Filter: Status (All / Active / Suspended)

VDataTable คอลัมน์:
- ชื่อบริษัท + เลขทะเบียน (2 บรรทัด)
- ประเภทบริษัท (VChip)
- Segment (VChip: สี indigo=Corporate / สีเขียว=Government / สีส้ม=SME)
- วงเงิน / ที่ใช้แล้ว (แสดง progress bar เล็กๆ)
- สถานะ (VChip: สีเขียว=ACTIVE / สีแดง=SUSPENDED)
- Actions: ปุ่ม View / Edit / (disable ถ้าเป็น Blacklist)

Click ที่แถว → navigate ไป /customers/[id]

=== 2B. Create/Edit/View Page (src/pages/customers/[id].vue) ===

ใช้ VTabs แบ่งเป็น 4 Tab:

Tab 1: ข้อมูลบริษัท
- companyName* (VTextField)
- taxId* (VTextField, validate 13 หลัก)
- companyType* (VSelect: บริษัทจำกัด / บริษัทมหาชน / ห้างหุ้นส่วนจำกัด / หน่วยงานรัฐ)
- registeredDate (VDatePicker หรือ flatpickr)
- registeredCapital (VTextField, number format)
- businessType (VTextField)
- ที่อยู่จดทะเบียน: address, subdistrict, district, province, postalCode
- customerSegment (VRadioGroup: Corporate / Government / SME)
- status (VSelect)

Tab 2: ผู้ติดต่อ
- contactName* (VTextField)
- contactPosition (VTextField)
- contactPhone* (VTextField)
- contactEmail (VTextField, validate email)
- website (VTextField)

Tab 3: วงเงิน Fleet Facility
- creditLimit (VTextField, number) — วงเงินที่อนุมัติ
- creditUsed (readonly) — ดึงจากสัญญา ACTIVE ทั้งหมด
- creditAvailable (readonly, Calc = Limit - Used)
- VProgressLinear แสดงสัดส่วนการใช้วงเงิน (เหลือง >70% / แดง >90%)
- ตารางสัญญา ACTIVE ที่ใช้วงเงินอยู่ (contract_no, asset_count, monthly_rent)

Tab 4: เอกสาร
- แสดง checklist เอกสารที่ต้องมี:
  [ ] หนังสือรับรองบริษัท
  [ ] บัญชีรายชื่อผู้ถือหุ้น (บอจ.5)
  [ ] หนังสือบริคณห์สนธิ
  [ ] รายงานประชุม
  [ ] งบการเงิน 3 ปี
  [ ] Statement ธนาคาร
  [ ] ทะเบียนภาษีมูลค่าเพิ่ม
- แต่ละรายการมีปุ่ม "อัปโหลด" + แสดงชื่อไฟล์ถ้าอัปโหลดแล้ว

Action Buttons (sticky bottom):
- บันทึก (Save) — validate ก่อน
- ยกเลิก (Cancel)
- ลบ (Delete) — แสดงเฉพาะ Edit mode, ต้อง confirm dialog

=== 3. Pinia Store (src/stores/customer.ts) ===

useCustomerStore() ต้องมี:
- state: customers[], selectedCustomer, loading, error
- actions: fetchCustomers(), fetchCustomerById(id), createCustomer(data), updateCustomer(id, data), deleteCustomer(id)
- getters: activeCustomers, customersBySegment

ใช้ mock data (hardcode array) แทน API call — ไม่ต้องเชื่อม backend จริง
mock data อย่างน้อย 5 รายการ หลากหลาย segment และ status
```

---

## PROMPT 3 — Quotation Module (ใบเสนอราคา / PD14 Input Sheet)

```
สร้าง Quotation Module สำหรับ Operating Lease ใน Vuexy template
นี่คือหน้าสำคัญที่สุด — เป็น Digital Version ของ "OL-PD14 No-OPT Input Sheet"

=== ไฟล์ที่ต้องสร้าง ===

1. src/pages/quotations/index.vue    (List Page)
2. src/pages/quotations/[id].vue     (Create / Edit Page — Quotation Calculator)
3. src/stores/quotation.ts           (Pinia Store)
4. src/types/quotation.ts            (TypeScript Types)
5. src/composables/useOLCalculator.ts (สูตรคำนวณ OL)

=== TypeScript Types (src/types/quotation.ts) ===

// โหมดการออกใบเสนอราคา
// SINGLE  = 1 คัน/ชิ้น (ค่า default — เหมือน PD14 Input Sheet เดิม)
// BATCH   = N คัน สเปคเหมือนกันทุกคัน (e.g. Camry 10 คัน)
// MIXED   = หลายสเปค → ใช้ Equipment Schedule แทน (redirect ไป PROMPT 7)
type QuotationMode = 'SINGLE' | 'BATCH'

interface Quotation {
  id: string
  quotationNo: string              // Auto-gen เช่น QT-2026-00001
  status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'CONVERTED'
  mode: QuotationMode              // SINGLE หรือ BATCH
  customerId: string
  customerName: string
  contactName: string
  quotationDate: string
  validUntil: string

  // Section A: Asset
  assetModelId: string
  assetModel: string               // ชื่อรถ/สินค้า
  assetYear: number
  assetCondition: 'NEW' | 'USED'
  assetCategory: 'CAR' | 'COMMERCIAL' | 'EQUIPMENT'
  insuranceGroup: number           // 1-5

  // BATCH: จำนวนคัน/ชิ้น
  quantity: number                 // default = 1 (SINGLE), N = BATCH

  // Section B: Pricing (ต่อ 1 คัน/ชิ้น)
  listPrice: number                // Vehicle Basic (Original)
  sellingPrice: number             // Vehicle Basic (Current)
  discount: number
  preVatPrice: number              // Calc
  vatAmount: number                // Calc
  registrationFee: number
  rstServiceFee: number
  onRoadPrice: number              // Calc = preVat + vat + regFee + rst
  reclaimedVat: number             // Calc ถ้า isVatRegistered
  netSellingPrice: number          // Calc = onRoad - reclaimedVat
  otdPrice: number                 // On The Door price
  isVatRegistered: boolean         // Y/N

  // Section C: Contract Parameters
  contractTermMonths: number       // 12/24/36/48/60
  annualMileageKm: number
  totalContractMileageKm: number   // Calc
  paymentsInAdvance: number
  downPayment: number
  securityDeposit: number
  paymentFrequency: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL'
  paymentProfileCode: string       // T00, T01 etc.

  // Section D: Services Package
  maintenancePackCode: string      // PD14, PD13 etc.
  hireGroup: string                // A/B/C/D
  includeRepairs: boolean
  includeServicing: boolean
  servicingCount: number
  includeTyres: boolean
  tyresSets: number
  includeReliefVehicle: boolean
  includeRoadsideAssistance: boolean
  services: QuotationService[]     // Calc จาก selections

  // Section E: Finance + RV
  baseRate: number                 // 3.5% ดึงจาก master
  margin: number                   // กรอกเอง 4%
  totalRate: number                // Calc = base + margin
  residualValueThb: number         // Input หรือดึงจาก RV Table
  residualValuePct: number         // Calc = RV / OTD * 100
  rvWithVat: number                // Calc
  rvNetVat: number                 // Calc = RV / 1.07
  calculationMode: 'WITH_VAT' | 'WITHOUT_VAT'

  // Section F: Output per unit (Calc ทั้งหมด)
  totalDepreciation: number
  financeMaintenance: number
  financeProfit: number
  insurancePremium: number
  financialRentalMonthly: number      // ต่อ 1 คัน
  maintenanceRentalMonthly: number    // ต่อ 1 คัน
  totalRentalExclVat: number          // ต่อ 1 คัน
  vatOnRental: number                 // ต่อ 1 คัน
  totalRentalInclVat: number          // ต่อ 1 คัน
  totalContractValue: number          // ต่อ 1 คัน

  // Section G: Fleet Total (Calc = unit × quantity — เฉพาะ BATCH mode)
  fleetFinancialRentalMonthly: number  // = financialRentalMonthly × quantity
  fleetMaintenanceRentalMonthly: number
  fleetTotalRentalExclVat: number
  fleetVatOnRental: number
  fleetTotalRentalInclVat: number      // ยอดรวมทั้ง Fleet ต่อเดือน
  fleetTotalContractValue: number      // มูลค่าสัญญาทั้ง Fleet

  createdAt: string
  updatedAt: string
}

interface QuotationService {
  serviceType: string
  monthlyAmount: number
  totalAmount: number
  dbTotal: number
}

=== Composable: useOLCalculator.ts ===

สร้าง composable ที่รับ quotation input แล้วคำนวณ output อัตโนมัติ:

export function useOLCalculator(input: Ref<Quotation>) {
  // ── Per-unit calculations ──────────────────────────────────────

  const preVatPrice = computed(() => input.value.sellingPrice - input.value.discount)
  const vatAmount = computed(() => preVatPrice.value * 0.07)
  const onRoadPrice = computed(() =>
    preVatPrice.value + vatAmount.value
    + input.value.registrationFee + input.value.rstServiceFee
  )
  const reclaimedVat = computed(() => input.value.isVatRegistered ? vatAmount.value : 0)
  const netSellingPrice = computed(() => onRoadPrice.value - reclaimedVat.value)
  const totalContractMileage = computed(() =>
    input.value.annualMileageKm * (input.value.contractTermMonths / 12)
  )
  const totalRate = computed(() => input.value.baseRate + input.value.margin)
  const rvNetVat = computed(() => input.value.residualValueThb / 1.07)
  const residualValuePct = computed(() =>
    (input.value.residualValueThb / input.value.otdPrice) * 100
  )
  const totalDepreciation = computed(() => netSellingPrice.value - rvNetVat.value)
  const depreciationMonthly = computed(() =>
    totalDepreciation.value / input.value.contractTermMonths
  )

  // Finance Profit (Annuity approximation — ปรับ full annuity formula ได้ทีหลัง)
  const financeProfit = computed(() => {
    const principal = netSellingPrice.value - input.value.downPayment
    const monthlyRate = totalRate.value / 100 / 12
    const n = input.value.contractTermMonths
    return principal * monthlyRate * n
  })
  const financeProfitMonthly = computed(() =>
    financeProfit.value / input.value.contractTermMonths
  )

  const servicesTotal = computed(() =>
    input.value.services.reduce((sum, s) => sum + s.monthlyAmount, 0)
  )

  // ต่อ 1 คัน
  const financialRentalMonthly = computed(() =>
    depreciationMonthly.value
    + (input.value.registrationFee / input.value.contractTermMonths)
    + financeProfitMonthly.value
    + (input.value.insurancePremium / 12)
  )
  const maintenanceRentalMonthly = computed(() => servicesTotal.value * 1.07)
  const totalRentalExclVat = computed(() =>
    financialRentalMonthly.value + servicesTotal.value
  )
  const vatOnRental = computed(() => totalRentalExclVat.value * 0.07)
  const totalRentalInclVat = computed(() => totalRentalExclVat.value + vatOnRental.value)
  const totalContractValue = computed(() =>
    totalRentalInclVat.value * input.value.contractTermMonths
  )

  // ── Fleet totals (× quantity) — ใช้เฉพาะ BATCH mode ────────────
  const qty = computed(() => input.value.quantity ?? 1)

  const fleetFinancialRentalMonthly = computed(() => financialRentalMonthly.value * qty.value)
  const fleetMaintenanceRentalMonthly = computed(() => maintenanceRentalMonthly.value * qty.value)
  const fleetTotalRentalExclVat = computed(() => totalRentalExclVat.value * qty.value)
  const fleetVatOnRental = computed(() => vatOnRental.value * qty.value)
  const fleetTotalRentalInclVat = computed(() => totalRentalInclVat.value * qty.value)
  const fleetTotalContractValue = computed(() => totalContractValue.value * qty.value)
  const fleetResidualValueTotal = computed(() => input.value.residualValueThb * qty.value)

  return {
    // per unit
    preVatPrice, vatAmount, onRoadPrice, reclaimedVat, netSellingPrice,
    totalContractMileage, totalRate, rvNetVat, residualValuePct,
    totalDepreciation, depreciationMonthly, financeProfit, financeProfitMonthly,
    servicesTotal, financialRentalMonthly, maintenanceRentalMonthly,
    totalRentalExclVat, vatOnRental, totalRentalInclVat, totalContractValue,
    // fleet totals
    qty,
    fleetFinancialRentalMonthly, fleetMaintenanceRentalMonthly,
    fleetTotalRentalExclVat, fleetVatOnRental, fleetTotalRentalInclVat,
    fleetTotalContractValue, fleetResidualValueTotal,
  }
}

=== 3A. List Page (src/pages/quotations/index.vue) ===

Header:
- Title "ใบเสนอราคา Operating Lease"
- ปุ่ม "+ สร้างใบเสนอราคา"
- Search (ค้นหาเลขที่ / ชื่อลูกค้า)
- Filter: Status (DRAFT / PENDING / APPROVED / REJECTED / CONVERTED)

VDataTable คอลัมน์:
- เลขใบเสนอราคา
- ลูกค้า
- รถ/Asset
- Term (เดือน)
- ค่าเช่า/เดือน (inc VAT) — bold
- RV (%)
- วันหมดอายุใบเสนอ + badge ถ้าใกล้หมด
- Status (VChip)
- Actions: View / Edit / Duplicate / Convert to Contract

=== 3B. Create/Edit Page (src/pages/quotations/[id].vue) ===

Layout: 2 คอลัมน์
- ซ้าย (col-8): Input Form แบ่งเป็น VStepper 4 ขั้น
- ขวา (col-4): Live Calculation Panel (sticky)

--- โหมดเลือก SINGLE / BATCH (บรรทัดแรกสุด ก่อน Stepper) ---

VCard เล็กๆ ด้านบนสุด:
┌──────────────────────────────────────────────────────┐
│  ประเภทใบเสนอราคา                                     │
│  ◉ SINGLE  สเปคเดียว 1 คัน/ชิ้น                     │
│  ○ BATCH   สเปคเดียว หลายคัน/ชิ้น (Fleet เหมือนกัน) │
│                                                      │
│  [ถ้าเลือก BATCH จะเห็น field นี้]                   │
│  จำนวน: [  10  ] คัน/ชิ้น                           │
│                                                      │
│  ℹ️ ถ้า Fleet มีหลายสเปคต่างกัน → ใช้ Equipment     │
│     Schedule แทน  [ไปหน้า Schedule →]               │
└──────────────────────────────────────────────────────┘

กฎ: mode และ quantity ส่งผลต่อ Calculation Panel ทันที
- SINGLE: panel แสดง "ต่อ 1 คัน" เท่านั้น
- BATCH:  panel แสดงทั้ง "ต่อ 1 คัน" และ "รวม Fleet (N คัน)"

VStepper Steps:

Step 1: Asset & Pricing (ต่อ 1 คัน — เหมือนเดิม)
- Customer (VAutocomplete จาก store)
- Asset Model (VAutocomplete จาก mock catalog)
- Condition (VRadioGroup: NEW / USED)
- Vehicle Basic Price (VTextField, number)
- Discount (VTextField) → แสดง % อัตโนมัติ
- Registration Fee, RST Fee
- VAT Registered (VSwitch)
- OTD Price (VTextField)
- readonly Output: Pre-VAT / VAT / On-Road / NSP

Step 2: Contract Parameters (ใช้กับทุกคันในกรณี BATCH)
- Contract Term: VChipGroup (12 / 24 / 36 / 48 / 60 เดือน)
- Annual Mileage: VTextField → Total Mileage auto-calc
- Down Payment, Security Deposit (ต่อคัน)
- Payment Frequency (VSelect)
- Payment Profile (VSelect: T00/T01)

Step 3: Services Package (ใช้กับทุกคัน)
- Maintenance Pack (VSelect: PD14/PD13/NONE)
- Hire Group (VSelect: A/B/C/D)
- Toggles (VSwitch): Repairs / Servicing (ครั้ง) / Tyres (ชุด) / Relief / Roadside
- Insurance Group (VSelect 1-5)
- ตาราง Services Summary live (บริการ | Monthly/คัน | Total/คัน)

Step 4: Finance & Residual Value (ต่อคัน)
- Base Rate (readonly), Margin (VTextField) → Total Rate auto
- Calculation Mode (WITH_VAT / WITHOUT_VAT)
- Residual Value + % MRP + Manual Override badge

Live Calculation Panel (ขวา, sticky):

--- SINGLE mode (quantity = 1) ---
┌─────────────────────────────────┐
│  💰 สรุปค่าเช่า (ต่อ 1 คัน)    │
├─────────────────────────────────┤
│  Depreciation:      15,832 ฿   │
│  Finance Profit:     6,812 ฿   │
│  Insurance:          3,522 ฿   │
│  ─────────────────────────────  │
│  Financial Rental:  26,166 ฿   │
│  Maintenance:        5,866 ฿   │
│  ─────────────────────────────  │
│  รวมก่อน VAT:       32,032 ฿   │
│  VAT 7%:             2,242 ฿   │
│  ══════════════════════════════  │
│  💵 ค่าเช่า/เดือน: 34,274 ฿   │
│  📋 มูลค่าสัญญา: 2,056,467 ฿  │
│  🚗 Residual Value:   37.0%    │
└─────────────────────────────────┘

--- BATCH mode (quantity = 10) — แสดงเพิ่ม Fleet Summary ---
┌─────────────────────────────────────┐
│  💰 ต่อ 1 คัน            × 10 คัน  │
├─────────────────────────────────────┤
│  Financial Rental:                  │
│    26,166 ฿/คัน    261,660 ฿/เดือน │
│  Maintenance:                       │
│     5,866 ฿/คัน     58,660 ฿/เดือน │
│  ─────────────────────────────────  │
│  รวมก่อน VAT:      320,320 ฿/เดือน │
│  VAT 7%:            22,422 ฿/เดือน │
│  ════════════════════════════════   │
│  💵 Fleet/เดือน:   342,742 ฿       │ ← ใหญ่ bold
│  📋 มูลค่าสัญญา: 20,564,520 ฿     │
│  🚗 RV รวม:       6,180,000 ฿      │ ← RV × 10 คัน
│  ─────────────────────────────────  │
│  🔢 10 คัน × 34,274 ฿/คัน         │ ← แสดงสูตรให้เห็น
└─────────────────────────────────────┘

ทุกค่าใน panel ต้อง update real-time เมื่อเปลี่ยน quantity หรือ input ใดๆ

Action Bar (bottom):
- บันทึก Draft
- ส่งอนุมัติ (→ PENDING)
- พิมพ์ / Export PDF
- [BATCH เท่านั้น] "แปลงเป็น Equipment Schedule" → pre-fill Schedule ด้วย
  quantity แถว (แต่ละแถว = 1 คัน สเปคเดียวกัน รอกรอก SN ทีหลัง)
- ยกเลิก

=== Flow การแปลง BATCH Quotation → Equipment Schedule ===

เมื่อกด "แปลงเป็น Equipment Schedule" หลัง Approve:

ระบบ auto-generate ตาราง Schedule Item จำนวน N แถว:
┌────────────────────────────────────────────────────────────────────┐
│ # │ Model      │ SN (รอกรอก)    │ NSP       │ RV      │ เช่า/เดือน│
│ 1 │ Camry 2.5  │ [กรอกภายหลัง] │1,527,509 │618,000 │ 34,274    │
│ 2 │ Camry 2.5  │ [กรอกภายหลัง] │1,527,509 │618,000 │ 34,274    │
│...│            │               │          │        │           │
│10 │ Camry 2.5  │ [กรอกภายหลัง] │1,527,509 │618,000 │ 34,274    │
└────────────────────────────────────────────────────────────────────┘
ค่าทุก field ดึงมาจาก Quotation — ผู้ใช้แค่กรอก SN ทีละคันเมื่อรถมาถึง

badge "รอกำหนด SN" สีส้มแสดงบนแถวที่ยัง SN ว่าง
Schedule สามารถ Activate ได้เฉพาะแถวที่มี SN แล้ว (ทยอย Active ได้)
```

---

## PROMPT 4 — Asset Management Module (ทรัพย์สิน)

```
สร้าง Asset Management Module สำหรับ Operating Lease B2B ใน Vuexy template

=== ไฟล์ที่ต้องสร้าง ===

1. src/pages/assets/index.vue            (Asset Registry List)
2. src/pages/assets/[id].vue             (Asset Detail / Edit)
3. src/pages/asset-substitutions/index.vue (Substitution List)
4. src/pages/asset-substitutions/[id].vue  (Substitution Form)
5. src/stores/asset.ts                   (Pinia Store)
6. src/types/asset.ts                    (TypeScript Types)

=== TypeScript Types (src/types/asset.ts) ===

type AssetStatus = 'AVAILABLE' | 'RESERVED' | 'ACTIVE' | 'MAINTENANCE' | 'RETURNED' | 'DAMAGED' | 'DISPOSED'

interface Asset {
  id: string
  assetCode: string              // Internal Code
  assetTag: string               // QR/RFID tag
  serialNumber: string           // Manufacturer SN
  model: string
  brand: string
  category: string               // CAR / WATER_PURIFIER / FREEZER / etc.
  year: number
  color?: string

  // Financial
  purchaseDate: string
  purchaseCost: number
  currentBookValue: number       // Calc ตาม depreciation
  residualValueThb: number       // มูลค่าตกค้างที่ประเมิน
  residualValuePct: number

  // Contract
  currentContractId?: string
  currentLesseeId?: string
  currentLesseeName?: string
  leaseStartDate?: string
  leaseEndDate?: string

  // Insurance & Warranty
  warrantyExpiry: string
  insurancePolicyNo: string
  insuranceExpiry: string
  insuranceProvider: string

  // Location
  currentSite: string
  currentAddress: string
  gpsLat?: number
  gpsLng?: number

  status: AssetStatus
  notes?: string
  createdAt: string
  updatedAt: string
}

interface AssetSubstitution {
  id: string
  contractId: string
  contractNo: string
  originalAssetId: string
  originalAssetSerial: string
  replacementAssetId: string
  replacementAssetSerial: string
  substitutionDate: string
  reason: 'DAMAGED' | 'LOST' | 'STOLEN' | 'UPGRADE'
  damageReportRef?: string
  insuranceClaimRef?: string
  approvedBy: string
  status: 'PENDING' | 'APPROVED' | 'COMPLETED'
  remark?: string
  createdAt: string
}

=== 4A. Asset List Page (src/pages/assets/index.vue) ===

Header:
- Title "ทะเบียนทรัพย์สิน"
- ปุ่ม "+ เพิ่มทรัพย์สิน"
- Search (Asset Code / Serial / Model)
- Filter: Status (VChipGroup — All / Available / Active / Maintenance / Returned)
- Filter: Category (All / Car / Equipment / etc.)

Summary Cards แถวบน (5 cards เล็กๆ):
- AVAILABLE (สีเขียว): จำนวน
- ACTIVE (สีน้ำเงิน): จำนวน
- MAINTENANCE (สีส้ม): จำนวน
- RETURNED (สีเทา): จำนวน รอ QC
- DAMAGED (สีแดง): จำนวน

VDataTable คอลัมน์:
- Asset Code + Asset Tag (2 บรรทัด)
- Model / Brand / Year
- Serial Number
- ลูกค้าปัจจุบัน (ถ้า ACTIVE)
- วันหมดสัญญา (ถ้า ACTIVE) + badge ถ้าใกล้หมด
- Status (VChip พร้อมสี)
- Actions: View / Edit / History

=== 4B. Asset Detail Page (src/pages/assets/[id].vue) ===

VTabs 3 แท็บ:

Tab 1: ข้อมูลทรัพย์สิน
- assetCode (readonly ถ้า Edit)
- serialNumber*, brand*, model*, year*, category*
- purchaseCost, purchaseDate
- currentBookValue (readonly, คำนวณ)
- residualValueThb (Input), residualValuePct (auto-calc)
- warrantyExpiry (DatePicker)
- insurancePolicyNo, insuranceProvider, insuranceExpiry
- status (VSelect — admin only)
- notes (VTextarea)

Tab 2: ประวัติสัญญา (Lease History)
ตารางแสดงสัญญาทั้งหมดที่ asset นี้เคยอยู่:
คอลัมน์: เลขสัญญา | ลูกค้า | วันเริ่ม | วันสิ้นสุด | ค่าเช่า/เดือน | สถานะ

Tab 3: ประวัติบำรุงรักษา (Maintenance History)
ตารางแสดง PM และ Corrective Maintenance:
คอลัมน์: วันที่ | ประเภท | รายละเอียด | ค่าใช้จ่าย | ผล (PASS/FAIL) | ช่าง

=== 4C. Asset Substitution List (src/pages/asset-substitutions/index.vue) ===

Header:
- Title "การสลับทรัพย์สิน (Asset Substitution)"
- ปุ่ม "+ สร้างคำขอสลับ"
- Filter: Status (PENDING / APPROVED / COMPLETED)
- Filter: Reason (DAMAGED / LOST / STOLEN / UPGRADE)

VDataTable:
- เลขที่คำขอ
- เลขสัญญา + ชื่อลูกค้า
- Asset เดิม (Serial + Model)
- Asset ใหม่ (Serial + Model) — แสดง "รอกำหนด" ถ้า PENDING
- เหตุผล (VChip)
- วันที่สลับ
- ผู้อนุมัติ
- Status (VChip: PENDING=เหลือง / APPROVED=น้ำเงิน / COMPLETED=เขียว)
- Actions: View / Approve (ถ้า PENDING)

=== 4D. Substitution Form (src/pages/asset-substitutions/[id].vue) ===

VCard เดียว layout แบบ Form:

Section 1: สัญญาต้นทาง
- Contract (VAutocomplete) → เมื่อเลือก: แสดงชื่อลูกค้า + วันหมดสัญญา
- Asset เดิม (VAutocomplete กรองเฉพาะ ACTIVE ใน contract นั้น)
  → แสดง card ข้อมูล: Serial, Model, สถานที่, สถานะ

Section 2: เหตุผล
- reason (VRadioGroup: เสียหาย / สูญหาย / ถูกขโมย / อัปเกรด)
- damageReportRef (VTextField, ถ้าเลือก DAMAGED)
- insuranceClaimRef (VTextField, ถ้าเกี่ยวข้องประกัน)
- remark (VTextarea)
- แนบรูปภาพ (ใช้ DropZone component ที่มีอยู่แล้ว)

Section 3: Asset ทดแทน
- Asset ใหม่ (VAutocomplete กรองเฉพาะ AVAILABLE)
  → แสดง card ข้อมูล: Serial, Model, Book Value
- substitutionDate (DatePicker)

Section 4: กฎที่แสดงให้เห็น (Info Alert)
VAlert สีน้ำเงิน:
"การสลับนี้จะ:
✅ คงเงื่อนไขสัญญาเดิมทั้งหมด (ค่าเช่า / วันหมดสัญญา)
✅ เปลี่ยนเฉพาะ Serial Number ใน Lease Assignment
✅ บันทึก Audit Trail สำหรับ Compliance"

Action: ส่งคำขอ / อนุมัติ (ถ้า role = manager) / ยกเลิก
```

---

## PROMPT 5 — Billing + Lease Schedule Module

```
สร้าง Billing Module สำหรับ Operating Lease B2B ใน Vuexy template

=== ไฟล์ที่ต้องสร้าง ===

1. src/pages/lease-schedules/index.vue   (ตาราง Lease Schedule)
2. src/pages/invoices/index.vue          (รายการใบแจ้งหนี้)
3. src/pages/invoices/[id].vue           (ใบแจ้งหนี้รายใบ)
4. src/stores/billing.ts                 (Pinia Store)
5. src/types/billing.ts                  (TypeScript Types)

=== TypeScript Types (src/types/billing.ts) ===

interface LeaseScheduleItem {
  id: string
  contractId: string
  contractNo: string
  lesseeId: string
  lesseeName: string
  installmentNo: number
  dueDate: string
  // Financial Rental
  depreciationAmount: number
  financeMaintenanceAmount: number
  financeProfitAmount: number
  insuranceAmount: number
  financialRentalExclVat: number
  // Maintenance Rental
  servicesAmount: number
  maintenanceRentalExclVat: number
  // Total
  totalExclVat: number
  vatAmount: number
  totalInclVat: number
  // Status
  status: 'PENDING' | 'INVOICED' | 'PAID' | 'OVERDUE' | 'PARTIAL'
  invoiceId?: string
  paidDate?: string
  paidAmount?: number
  // IFRS 16 columns
  rouAssetBalance: number       // Right-of-Use Asset คงเหลือ
  leaseLiabilityBalance: number // Lease Liability คงเหลือ
  interestExpense: number
}

interface Invoice {
  id: string
  invoiceNo: string              // Auto-gen INV-2026-00001
  invoiceType: 'FINANCIAL' | 'MAINTENANCE' | 'COMBINED'
  contractId: string
  contractNo: string
  lesseeId: string
  lesseeName: string
  lesseeTaxId: string
  lesseeAddress: string
  invoiceDate: string
  dueDate: string
  // Items
  items: InvoiceItem[]
  // Amounts
  subtotal: number
  vatAmount: number
  totalAmount: number
  withholdingTax: number         // หัก ณ ที่จ่าย 5%
  netPayable: number             // = total - WHT
  // Status
  status: 'DRAFT' | 'ISSUED' | 'SENT' | 'PAID' | 'OVERDUE' | 'CANCELLED'
  paidDate?: string
  paidAmount?: number
  paymentMethod?: string
  notes?: string
  createdAt: string
}

interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
  amount: number
  vatRate: number
}

=== 5A. Lease Schedule Page (src/pages/lease-schedules/index.vue) ===

Header:
- Title "ตาราง Lease Schedule"
- Filter: Contract (VAutocomplete — ค้นหาสัญญา)
- Filter: Due Date Range (เดือน/ปี)
- Filter: Status (All / PENDING / INVOICED / PAID / OVERDUE)
- ปุ่ม "สร้างใบแจ้งหนี้" (batch สำหรับงวดที่เลือก)

Summary Row (คำนวณจากข้อมูลที่กรอง):
- รวม Financial Rental: X,XXX,XXX ฿
- รวม Maintenance Rental: X,XXX,XXX ฿
- รวม VAT: XXX,XXX ฿
- รวมทั้งหมด: X,XXX,XXX ฿

VDataTable คอลัมน์:
- Checkbox (สำหรับ batch invoice)
- สัญญา + ลูกค้า (2 บรรทัด)
- งวดที่
- วันครบกำหนด + badge overdue ถ้าเลยวัน
- Financial Rental
- Maintenance Rental
- VAT
- รวม (inc VAT) — bold
- WHT 5%
- สุทธิที่รับ
- IFRS 16: ROU Asset Balance
- Status (VChip)
- Actions: ออกใบแจ้งหนี้ / ดูใบแจ้งหนี้

=== 5B. Invoice List (src/pages/invoices/index.vue) ===

Header:
- Title "ใบแจ้งหนี้"
- ปุ่ม "+ ออกใบแจ้งหนี้"
- Search (เลขใบแจ้งหนี้ / ชื่อลูกค้า / เลขสัญญา)
- Filter: Type (FINANCIAL / MAINTENANCE / COMBINED)
- Filter: Status
- Filter: Due Date Range

Aging Summary (4 cards เล็กๆ สีแตกต่าง):
- ยังไม่ถึงกำหนด: จำนวน + ยอดรวม
- เกิน 1-30 วัน: จำนวน + ยอดรวม (สีเหลือง)
- เกิน 31-60 วัน: จำนวน + ยอดรวม (สีส้ม)
- เกิน 60+ วัน: จำนวน + ยอดรวม (สีแดง)

VDataTable คอลัมน์:
- เลขใบแจ้งหนี้
- ประเภท (VChip: FINANCIAL=น้ำเงิน / MAINTENANCE=เขียว / COMBINED=ม่วง)
- ลูกค้า + เลขสัญญา
- วันที่ออก
- วันครบกำหนด + อายุ (กี่วันแล้ว ถ้า overdue)
- ยอดรวม inc VAT
- WHT 5%
- สุทธิที่รับ
- Status (VChip)
- Actions: View / ยืนยันรับชำระ / Cancel

=== 5C. Invoice Detail (src/pages/invoices/[id].vue) ===

สร้างหน้าที่หน้าตาคล้าย "ใบกำกับภาษี" จริงๆ

Header ใบแจ้งหนี้:
┌─────────────────────────────────────────────────────┐
│  [Logo บริษัท]          ใบแจ้งหนี้ / TAX INVOICE   │
│                         เลขที่: INV-2026-00001       │
│  บริษัท ABC Leasing จำกัด                           │
│  เลขประจำตัวผู้เสียภาษี: XXX-XXX-XXXX              │
│  ที่อยู่: ...                                       │
├─────────────────────────────────────────────────────┤
│  ลูกค้า (ผู้เช่า):                                  │
│  ชื่อบริษัท: BUSINESS DEVELOPMENT CO.,LTD           │
│  เลขทะเบียน: 0105556789012                          │
│  ที่อยู่: ...                                       │
│                   วันที่: 01/03/2026                │
│                   ครบกำหนด: 15/03/2026              │
└─────────────────────────────────────────────────────┘

ตารางรายการ:
รายการ | จำนวน | ราคา/หน่วย | จำนวนเงิน

เช่น:
ค่าเช่า Operating Lease (Toyota Camry SN-xxx)
  งวดที่ 3/60 [01/03/2026 - 31/03/2026] | 1 | 32,032.21 | 32,032.21

สรุปท้ายใบ:
ยอดก่อน VAT:         32,032.21 ฿
VAT 7%:               2,242.25 ฿
ยอดรวม:              34,274.46 ฿
หัก ณ ที่จ่าย 5%:    (1,601.61 ฿)
ยอดสุทธิที่ชำระ:     32,672.85 ฿

Payment Section (ถ้า status PAID):
  วันที่รับชำระ / วิธีชำระ / ยอดที่รับ

Action Bar:
- Print / Export PDF
- ยืนยันรับชำระ (dialog: วันที่ / วิธี / ยอด)
- ส่งอีเมลลูกค้า
- ยกเลิกใบแจ้งหนี้ (พร้อม confirm)

=== Pinia Store (src/stores/billing.ts) ===

useBillingStore() มี:
- state: leaseSchedules[], invoices[], selectedInvoice, loading
- actions:
  - fetchLeaseSchedules(filters)
  - generateInvoice(scheduleIds[], invoiceType)
  - confirmPayment(invoiceId, paymentData)
  - cancelInvoice(invoiceId, reason)
- getters:
  - overdueInvoices
  - agingSummary (grouped by days overdue)
  - mrrThisMonth

ใช้ mock data อย่างน้อย 10 lease schedule items และ 5 invoices
```

---

## PROMPT 6 — Master Lease Agreement (MLA) Module

```
สร้าง Master Lease Agreement Module สำหรับ Operating Lease B2B ใน Vuexy template
MLA คือสัญญาหลักที่ครอบคลุมเงื่อนไขทั้งหมด — Equipment Schedule จะแนบท้ายแยกต่างหาก

=== ไฟล์ที่ต้องสร้าง ===

1. src/pages/contracts/index.vue         (MLA List Page)
2. src/pages/contracts/[id].vue          (MLA Detail / Edit Page)
3. src/stores/contract.ts                (Pinia Store)
4. src/types/contract.ts                 (TypeScript Types)

=== TypeScript Types (src/types/contract.ts) ===

type ContractStatus =
  | 'DRAFT'           // กำลังร่าง
  | 'PENDING_APPROVAL'// รออนุมัติ
  | 'APPROVED'        // อนุมัติแล้ว
  | 'ACTIVE'          // มีผล / ดำเนินการอยู่
  | 'SUSPENDED'       // ระงับชั่วคราว
  | 'EXPIRED'         // หมดอายุปกติ
  | 'TERMINATED'      // ยกเลิกก่อนกำหนด

interface MasterLeaseAgreement {
  id: string
  contractNo: string             // Auto-gen: MLA-2026-00001
  quotationId?: string           // ดึงมาจาก Quotation ที่ Convert
  quotationNo?: string

  // คู่สัญญา
  lessorId: string               // บริษัทผู้ให้เช่า (ฝั่งเรา)
  lessorName: string
  lesseeId: string               // ลูกค้า B2B
  lesseeName: string
  lesseeTaxId: string
  lesseeAddress: string
  authorizedSignatory: string    // ผู้มีอำนาจลงนาม
  authorizedPosition: string

  // วันที่สัญญา
  contractDate: string           // วันที่ทำสัญญา
  commencementDate: string       // วันที่เริ่มมีผล
  expiryDate: string             // วันสิ้นสุดสัญญา
  noticePeriodDays: number       // ระยะแจ้งล่วงหน้าก่อนต่ออายุ/คืน (วัน)

  // เงื่อนไขหลัก
  contractTermMonths: number
  paymentFrequency: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL'
  paymentDueDay: number          // วันที่ต้องชำระ (1-31)
  paymentProfileCode: string
  isVatRegistered: boolean
  calculationMode: 'WITH_VAT' | 'WITHOUT_VAT'

  // Fleet Credit Facility
  fleetCreditLimit: number       // วงเงินสูงสุด (บาท/เดือน)
  fleetCreditUsed: number        // Calc จาก Schedule ที่ ACTIVE

  // เงื่อนไขท้ายสัญญา
  defaultEndOfTermOption: 'RETURN' | 'RENEW' | 'PURCHASE'
  earlyTerminationPolicy: string // ข้อความ policy
  returnConditionPolicy: string  // เงื่อนไขการคืน Fair Wear & Tear

  // Finance Scheme (เงื่อนไขทางการเงินที่ใช้ใน Schedule)
  baseRate: number
  margin: number
  totalRate: number              // Calc

  // Services & Insurance
  defaultMaintenancePack: string
  defaultHireGroup: string
  insurancePolicy: string
  insuranceProvider: string

  // Approval Workflow
  status: ContractStatus
  submittedBy?: string
  submittedAt?: string
  approvedBy?: string
  approvedAt?: string
  rejectionReason?: string

  // เอกสาร
  documents: ContractDocument[]
  equipmentSchedules: string[]   // Array ของ schedule_id

  // Audit
  createdBy: string
  createdAt: string
  updatedAt: string
}

interface ContractDocument {
  id: string
  type: 'MLA_SIGNED' | 'AMENDMENT' | 'BOARD_RESOLUTION' | 'OTHER'
  fileName: string
  version: string
  uploadedAt: string
  url?: string
}

=== 6A. MLA List Page (src/pages/contracts/index.vue) ===

Header:
- Title "Master Lease Agreement"
- ปุ่ม "+ สร้างสัญญาใหม่" (จาก Quotation หรือสร้างใหม่)
- Search (เลขสัญญา / ชื่อลูกค้า)
- Filter: Status (VChipGroup แบบ multi-select)
- Filter: Expiry (ครบใน 30/60/90 วัน)

Summary Stats (4 cards เล็กๆ):
- ACTIVE: XX สัญญา
- หมดอายุใน 90 วัน: XX สัญญา (สีเหลือง)
- Fleet Credit ที่ใช้อยู่: X,XXX,XXX ฿
- Pending Approval: XX สัญญา (สีส้ม)

VDataTable คอลัมน์:
- เลขสัญญา (MLA-XXXX) + วันที่ทำสัญญา
- ลูกค้า (ชื่อบริษัท + เลขทะเบียน)
- จำนวน Equipment Schedule ที่แนบ
- ค่าเช่ารวม/เดือน (inc VAT) — รวมทุก Schedule
- วันเริ่มต้น → วันสิ้นสุด
- เหลืออีก (วัน/เดือน) + progress bar
- Status (VChip)
- Actions: View / Edit / เพิ่ม Schedule / Terminate

=== 6B. MLA Detail Page (src/pages/contracts/[id].vue) ===

Layout:
- ด้านบน: Status Bar แสดง workflow step
  [DRAFT] → [PENDING_APPROVAL] → [APPROVED] → [ACTIVE] → [EXPIRED/TERMINATED]
  แต่ละ step แสดงว่าใคร / เมื่อไหร่

VTabs 5 แท็บ:

--- Tab 1: ข้อมูลสัญญาหลัก ---
Section: คู่สัญญา
- lessorName (readonly — ชื่อบริษัทเรา)
- lesseeName (VAutocomplete จาก Customer store — required)
- authorizedSignatory, authorizedPosition

Section: ระยะเวลา
- contractDate* (DatePicker)
- commencementDate* (DatePicker)
- contractTermMonths* (VSelect: 12/24/36/48/60)
- expiryDate (auto-calc = commencement + term, readonly)
- noticePeriodDays (VTextField, default 90)

Section: เงื่อนไขการชำระ
- paymentFrequency (VSelect)
- paymentDueDay (VSelect: 1-28)
- paymentProfileCode (VSelect: T00/T01/T02)
- isVatRegistered (VSwitch)
- calculationMode (VRadioGroup: WITH_VAT / WITHOUT_VAT)

Section: Fleet Credit Facility
- fleetCreditLimit (VTextField, number)
- fleetCreditUsed (readonly, Calc)
- VProgressLinear แสดง % ที่ใช้
- defaultEndOfTermOption (VRadioGroup)

Section: Finance Scheme
- baseRate (readonly)
- margin* (VTextField)
- totalRate (readonly, Calc)

Section: Services & Insurance
- defaultMaintenancePack (VSelect: PD14/PD13/NONE)
- defaultHireGroup (VSelect: A/B/C/D)
- insuranceProvider, insurancePolicy

--- Tab 2: เงื่อนไขพิเศษ (Policy) ---
- earlyTerminationPolicy (VTextarea — กรอกข้อความสัญญา)
- returnConditionPolicy (VTextarea)
- VAlert สีน้ำเงิน: "ค่าปรับยกเลิกก่อนกำหนด = PV ของค่าเช่าที่เหลือ × Discount Factor"

--- Tab 3: Equipment Schedules ---
แสดงรายการ Schedule ทั้งหมดที่แนบกับ MLA นี้:
VDataTable:
- เลขที่ Schedule (SCH-001, 002, ...)
- จำนวน Asset / ประเภท
- วันที่เริ่ม / หมดอายุ Schedule
- ค่าเช่า/เดือน (inc VAT)
- Status (ACTIVE / COMPLETED / CANCELLED)
- Actions: View Schedule / Cancel Schedule

ปุ่ม "+ แนบ Equipment Schedule ใหม่"
→ navigate ไปหน้า Equipment Schedule โดยส่ง contract_id

--- Tab 4: Approval Workflow ---
Timeline แสดงการอนุมัติ:
[วันที่ เวลา] ผู้ใช้ สร้างสัญญา
[วันที่ เวลา] ผู้ใช้ ส่งอนุมัติ
[วันที่ เวลา] Manager อนุมัติ / ปฏิเสธ (แสดงเหตุผล)
[วันที่ เวลา] ระบบ เปลี่ยนสถานะเป็น ACTIVE

Action Buttons ตาม Role:
- ถ้า DRAFT: [บันทึก] [ส่งอนุมัติ]
- ถ้า PENDING_APPROVAL (Role=Manager): [อนุมัติ] [ปฏิเสธ + เหตุผล]
- ถ้า ACTIVE: [Terminate + เหตุผล] (ต้อง confirm dialog)

--- Tab 5: เอกสารสัญญา ---
VList แสดงเอกสารแนบ:
- MLA ต้นฉบับ (signed)
- Amendment ต่างๆ (ถ้ามี)
- Board Resolution
แต่ละรายการ: ชื่อไฟล์ | version | วันที่อัปโหลด | ปุ่ม Download

ปุ่ม "อัปโหลดเอกสาร" (DropZone component)

=== Pinia Store (src/stores/contract.ts) ===

useContractStore() มี:
- state: contracts[], selectedContract, loading, error
- actions:
  - fetchContracts(filters?)
  - fetchContractById(id)
  - createContract(data) — พร้อม auto-gen contractNo
  - updateContract(id, data)
  - submitForApproval(id)
  - approveContract(id, approvedBy)
  - rejectContract(id, reason)
  - terminateContract(id, reason, terminationDate)
- getters:
  - activeContracts
  - expiringWithin90Days
  - pendingApproval

Mock data อย่างน้อย 5 contracts หลากหลาย status
```

---

## PROMPT 7 — Equipment Schedule Module

```
สร้าง Equipment Schedule Module ใน Vuexy template
Equipment Schedule คือ "ใบแนบท้าย" MLA ที่ระบุทรัพย์สินแต่ละชุด พร้อมค่าเช่า
1 MLA มีได้หลาย Schedule — ค่าเช่ารวม = ผลรวมทุก Schedule

=== ไฟล์ที่ต้องสร้าง ===

1. src/pages/equipment-schedules/index.vue   (List — ข้ามทุก MLA)
2. src/pages/equipment-schedules/[id].vue    (Create / Edit / View)
3. src/types/equipment-schedule.ts           (TypeScript Types)

=== TypeScript Types ===

interface EquipmentSchedule {
  id: string
  scheduleNo: string            // SCH-2026-00001
  contractId: string            // FK → MLA
  contractNo: string
  lesseeId: string
  lesseeName: string

  // วันที่
  scheduleDate: string          // วันที่ออก Schedule
  commencementDate: string      // วันเริ่มเช่าใน Schedule นี้
  expiryDate: string            // วันสิ้นสุด (สืบทอดจาก MLA หรือกำหนดเอง)
  termMonths: number

  // สินทรัพย์
  items: ScheduleItem[]         // รายการ Asset ทุกชิ้น

  // ยอดรวมทั้ง Schedule (Calc)
  totalAssets: number
  financialRentalMonthly: number
  maintenanceRentalMonthly: number
  totalRentalExclVat: number
  totalRentalInclVat: number
  totalContractValue: number

  // End-of-Term
  defaultEndOfTermOption: 'RETURN' | 'RENEW' | 'PURCHASE'

  // Approval
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED'
  approvedBy?: string
  approvedAt?: string

  notes?: string
  createdAt: string
  updatedAt: string
}

interface ScheduleItem {
  id: string
  lineNo: number                // ลำดับที่ใน Schedule
  assetId?: string              // FK → Asset (ถ้า assign แล้ว)
  assetTag?: string
  serialNumber?: string
  assetModel: string
  assetBrand: string
  assetYear: number
  assetCondition: 'NEW' | 'USED'
  assetCategory: string

  // ราคา
  listPrice: number
  sellingPrice: number
  discount: number
  onRoadPrice: number           // Calc
  netSellingPrice: number       // Calc (หัก Reclaimed VAT)
  residualValueThb: number
  residualValuePct: number      // Calc
  totalDepreciation: number     // Calc

  // ค่าเช่าต่อชิ้น (Calc จาก useOLCalculator)
  depreciationMonthly: number
  financeProfitMonthly: number
  insuranceMonthly: number
  financialRentalMonthly: number
  servicesMonthly: number
  maintenanceRentalMonthly: number
  totalRentalMonthly: number    // excl VAT
  totalRentalInclVat: number

  // Services toggle (สืบทอดจาก MLA default หรือกำหนดต่อชิ้น)
  includeRepairs: boolean
  includeServicing: boolean
  servicingCount: number
  includeTyres: boolean
  tyresSets: number
  includeReliefVehicle: boolean
  includeRoadsideAssistance: boolean

  // End-of-Term (ต่อชิ้น)
  endOfTermOption: 'RETURN' | 'RENEW' | 'PURCHASE'

  // Substitution History
  substitutions: AssetSubstitutionRef[]
}

interface AssetSubstitutionRef {
  substitutionId: string
  date: string
  reason: string
  originalSerial: string
  replacementSerial: string
}

=== 7A. Equipment Schedule List (src/pages/equipment-schedules/index.vue) ===

Header:
- Title "Equipment Schedule"
- ปุ่ม "+ สร้าง Schedule ใหม่"
- Filter: Contract (VAutocomplete)
- Filter: Status
- Filter: Commencement Date Range

VDataTable คอลัมน์:
- เลขที่ Schedule
- MLA + ลูกค้า (2 บรรทัด)
- จำนวน Asset
- ค่าเช่ารวม/เดือน (inc VAT) — bold
- วันเริ่ม → วันสิ้นสุด
- Status (VChip)
- Actions: View / Edit / Duplicate

=== 7B. Equipment Schedule Form (src/pages/equipment-schedules/[id].vue) ===

Layout: Full-width แบ่งเป็น 2 Zone

ZONE 1 (Header Info):
VCard ด้านบน — ข้อมูล Schedule Header:
- scheduleNo (readonly ถ้า Edit)
- Contract (VAutocomplete → เลือก MLA)
  เมื่อเลือก MLA → auto-fill: lesseeName, termMonths, baseRate, margin, defaultOptions
- commencementDate* (DatePicker)
- expiryDate (auto-calc จาก commencement + termMonths, readonly)
- defaultEndOfTermOption (VRadioGroup)
- notes (VTextarea)

ZONE 2 (Asset Table — หัวใจของหน้านี้):
ตาราง Editable แบบ Spreadsheet-like — สามารถเพิ่ม/ลบแถวได้

Header ตาราง:
[+] | # | Asset Model | SN | ราคา List | ส่วนลด | NSP | RV (฿) | RV% |
    ค่าเสื่อม/เดือน | Finance Profit/เดือน | ประกัน/เดือน |
    Financial Rental | บริการ | รวม/เดือน (excl) | รวม/เดือน (incl) | End-of-Term | Actions

แต่ละแถว:
- Asset Model: VAutocomplete (เลือกจาก Asset catalog)
  → auto-fill brand, year, listPrice, insuranceGroup
- Serial Number: VTextField (กรอกเอง หรือเลือกจาก AVAILABLE assets)
- ราคา List: VTextField (readonly หรือ override ได้)
- ส่วนลด: VTextField → NSP auto-calc
- RV (฿): VTextField → RV% auto-calc
- ค่าเช่าทุกช่อง: readonly (Calc โดย useOLCalculator)
- End-of-Term: VSelect ต่อแถว (RETURN/RENEW/PURCHASE)
- Actions: 🗑️ ลบแถว | 📋 Duplicate แถว

ปุ่มใต้ตาราง:
- [+ เพิ่มรายการ] → append แถวใหม่ว่างเปล่า
- [นำเข้า Excel] → upload .xlsx แล้ว parse เป็นแถว (ถ้ามีหลาย asset)

ZONE 3 (Summary Footer — Sticky ด้านล่าง):
┌─────────────────────────────────────────────────────────────────────┐
│  📊 สรุป Equipment Schedule                                          │
│  จำนวน Asset: 50 ชิ้น                                               │
│  Financial Rental/เดือน: 1,308,316 ฿  Maintenance/เดือน: 293,250 ฿ │
│  รวมก่อน VAT: 1,601,566 ฿   VAT 7%: 112,110 ฿                      │
│  ══════════════════════════════════════════════════                  │
│  💵 ค่าเช่ารวม/เดือน (inc VAT): 1,713,676 ฿  │ มูลค่าสัญญา: XX ฿  │
└─────────────────────────────────────────────────────────────────────┘

Action Bar:
- บันทึก Draft
- ส่งอนุมัติ → ต้อง confirm: "Schedule นี้มี XX Asset รวมมูลค่า XX ฿ ต่อเดือน"
- Preview PDF (แสดง modal preview ก่อน export)
- ยกเลิก

=== หมายเหตุพิเศษ ===

1. เมื่อ Schedule ถูก Approve → ระบบต้องเปลี่ยน status ของ Asset ที่ระบุ SN จาก
   AVAILABLE → RESERVED (รอส่งมอบ) → ACTIVE (หลังส่งมอบจริง)

2. ถ้า Asset ยัง SN ว่าง (ยังไม่ได้ assign ตอนทำ Schedule) ให้ระบบ
   แสดง badge "รอกำหนด SN" สีส้ม และให้ assign ได้ทีหลัง

3. Fleet Credit Check: เมื่อ submit ให้ระบบตรวจ fleetCreditLimit ของ MLA
   ถ้า totalRentalMonthly ของทุก Schedule > limit → แสดง Warning
```

---

## PROMPT 8 — Invoice (ใบแจ้งหนี้) แบบละเอียด

```
สร้าง Invoice Module แบบครบสมบูรณ์สำหรับ Operating Lease B2B ใน Vuexy template
(เพิ่มเติมจาก PROMPT 5 — เน้นหน้า Detail ที่หน้าตาเหมือนใบกำกับภาษีจริง + Payment Flow)

=== ไฟล์ที่ต้องสร้าง / แก้ไข ===

1. src/pages/invoices/index.vue      (List — ปรับจาก PROMPT 5)
2. src/pages/invoices/[id].vue       (Detail — สร้างใหม่ละเอียด)
3. src/components/InvoiceDocument.vue (Component ตัวใบแจ้งหนี้)
4. src/composables/useInvoicePrint.ts (Print / Export logic)

=== Invoice Detail Page (src/pages/invoices/[id].vue) ===

Layout: 2 คอลัมน์
- ซ้าย col-8: ตัวใบแจ้งหนี้ (InvoiceDocument component)
- ขวา col-4: Action Panel

--- ซ้าย: InvoiceDocument Component ---

แสดงผลเหมือนใบกำกับภาษีจริง (พร้อม print)

┌──────────────────────────────────────────────────────────┐
│  [LOGO]              ใบแจ้งหนี้ / TAX INVOICE            │
│                      เลขที่: INV-2026-00001              │
│  ──────────────────────────────────────────────────────  │
│  ผู้ออกใบแจ้งหนี้:              ลูกค้า (ผู้เช่า):        │
│  บริษัท ABC Leasing จำกัด       BUSINESS DEV CO.,LTD     │
│  เลขประจำตัวผู้เสียภาษี:        เลขประจำตัวผู้เสียภาษี:  │
│  0105556789001                  0105556789012             │
│  ที่อยู่: 123 ถ.สุขุมวิท        ที่อยู่: 456 ถ.พระราม9   │
│  กรุงเทพฯ 10110                 กรุงเทพฯ 10310            │
│  ──────────────────────────────────────────────────────  │
│  สัญญาเลขที่: MLA-2026-00001    วันที่: 01/03/2026       │
│  Schedule: SCH-2026-00001       ครบกำหนด: 15/03/2026     │
│  ──────────────────────────────────────────────────────  │
│  รายการ                    จำนวน  ราคา/หน่วย    รวม      │
│  ──────────────────────────────────────────────────────  │
│  ค่าเช่า Operating Lease                                  │
│  (Financial Rental) งวดที่ 3/60                           │
│  Toyota Camry 2.5 HEV [SN: 7324/TT6044J]                 │
│  ระยะ: 01/03/2026 – 31/03/2026                           │
│    1   26,166.31    26,166.31                             │
│                                                           │
│  ค่าบริการ (Maintenance Rental) งวดที่ 3/60               │
│  Toyota Camry 2.5 HEV [SN: 7324/TT6044J]                 │
│    1    5,865.90     5,865.90                             │
│  ──────────────────────────────────────────────────────  │
│                        ยอดรวมก่อนภาษี:     32,032.21 ฿  │
│                        ภาษีมูลค่าเพิ่ม 7%:   2,242.25 ฿  │
│                        ยอดรวม:              34,274.46 ฿  │
│                        หัก ณ ที่จ่าย 5%:  (1,601.61 ฿)  │
│                        ══════════════════════════════    │
│                        ยอดสุทธิที่ชำระ:    32,672.85 ฿  │
│  ──────────────────────────────────────────────────────  │
│  หมายเหตุ: โปรดชำระภายใน 15/03/2026                      │
│  ช่องทางชำระ: โอนบัญชี กสิกรไทย 123-4-56789-0            │
└──────────────────────────────────────────────────────────┘

สำหรับ Fleet (หลาย Asset ใน 1 Invoice):
เพิ่ม "รายละเอียด Asset" Accordion ด้านล่าง:

▼ รายละเอียดรายชิ้น (50 รายการ)
┌───────────────────────────────────────────────────────────┐
│ # │ Model       │ Serial No.  │ Financial │ Maintenance │ รวม │
│ 1 │ Camry 2.5   │ SN-7324     │ 26,166    │ 5,866       │ 32,032 │
│ 2 │ Camry 2.5   │ SN-7325     │ 26,166    │ 5,866       │ 32,032 │
│...│ ...         │ ...         │ ...       │ ...         │ ...    │
└───────────────────────────────────────────────────────────┘

--- ขวา: Action Panel ---

VCard: สถานะใบแจ้งหนี้
- Status Badge (ใหญ่)
- วันที่ออก / ครบกำหนด
- อายุค้างชำระ (ถ้า overdue: แสดงสีแดง + จำนวนวัน)

VCard: การชำระเงิน
ถ้า status = ISSUED/OVERDUE:
  ปุ่ม "บันทึกการรับชำระ" → เปิด Dialog:
  ┌─────────────────────────────────┐
  │  บันทึกการรับชำระ               │
  │  วันที่รับชำระ: [DatePicker]    │
  │  วิธีชำระ:                      │
  │    ○ โอนเงิน                    │
  │    ○ เช็ค                       │
  │    ○ หักบัญชีอัตโนมัติ          │
  │  ยอดที่รับ: [TextField]         │
  │  เลขที่อ้างอิง: [TextField]     │
  │  หมายเหตุ: [Textarea]           │
  │  [ยืนยัน]  [ยกเลิก]             │
  └─────────────────────────────────┘

ถ้า status = PAID:
  แสดง: วันที่รับชำระ / วิธีชำระ / ยอดที่รับ / เลขอ้างอิง

VCard: Actions
- 🖨️ พิมพ์ใบแจ้งหนี้
- 📧 ส่งอีเมลลูกค้า → dialog ให้ยืนยัน email ก่อนส่ง
- 📋 Duplicate (สร้างใบแจ้งหนี้เดือนถัดไป)
- ❌ ยกเลิก → ต้อง confirm + ระบุเหตุผล + ออก Credit Note อัตโนมัติ

=== Batch Invoice Generation (จากหน้า Lease Schedule) ===

เพิ่ม Dialog สำหรับสร้างใบแจ้งหนี้แบบ Batch:

เมื่อ Select หลาย Lease Schedule Items แล้วกด "ออกใบแจ้งหนี้":

┌─────────────────────────────────────────────────────┐
│  ออกใบแจ้งหนี้ (X รายการ)                           │
│                                                     │
│  ประเภทใบแจ้งหนี้:                                  │
│    ○ COMBINED (Financial + Maintenance รวมใบเดียว)  │
│    ○ FINANCIAL เท่านั้น                             │
│    ○ MAINTENANCE เท่านั้น                           │
│                                                     │
│  รวมต่อลูกค้า (Consolidated per Lessee):            │
│    ☑ รวมทุก Schedule ของลูกค้าเดียวกัน = 1 ใบ      │
│                                                     │
│  วันที่ออกใบแจ้งหนี้: [DatePicker]                  │
│  วันครบกำหนดชำระ: [DatePicker]                      │
│                                                     │
│  Preview:                                           │
│  ลูกค้า A → 1 ใบ (รวม 15 Asset) = 513,000 ฿        │
│  ลูกค้า B → 1 ใบ (รวม 5 Asset) = 171,000 ฿         │
│                                                     │
│  [ยืนยันออกใบแจ้งหนี้ XX ใบ]  [ยกเลิก]             │
└─────────────────────────────────────────────────────┘

=== Composable: useInvoicePrint.ts ===

export function useInvoicePrint() {
  // ใช้ window.print() พร้อม @media print CSS
  // หรือใช้ html2canvas + jsPDF ถ้าต้องการ export PDF

  const printInvoice = (invoiceId: string) => {
    // trigger print dialog
  }

  const exportPdf = async (invoiceId: string) => {
    // generate PDF blob → download
  }

  const sendEmail = async (invoiceId: string, email: string) => {
    // mock — แค่ console.log + toast success
  }

  return { printInvoice, exportPdf, sendEmail }
}
```

---

## PROMPT 9 — Maintenance Module (Work Order + แผน PM)

```
สร้าง Maintenance Module สำหรับ Operating Lease B2B ใน Vuexy template
ครอบคลุม Work Order และ Preventive Maintenance Plan

=== ไฟล์ที่ต้องสร้าง ===

1. src/pages/work-orders/index.vue      (Work Order List)
2. src/pages/work-orders/[id].vue       (Work Order Form / Detail)
3. src/pages/pm-plans/index.vue         (PM Plan List)
4. src/pages/pm-plans/[id].vue          (PM Plan Form)
5. src/stores/maintenance.ts            (Pinia Store)
6. src/types/maintenance.ts             (TypeScript Types)

=== TypeScript Types (src/types/maintenance.ts) ===

type WorkOrderType = 'PM' | 'CM' | 'EMERGENCY' | 'INSPECTION' | 'RETURN_INSPECTION'
type WorkOrderStatus = 'OPEN' | 'ASSIGNED' | 'IN_PROGRESS' | 'PENDING_PARTS' | 'COMPLETED' | 'CANCELLED'
type WorkOrderResult = 'PASS' | 'FAIL' | 'PARTIAL' | 'PENDING_FOLLOWUP'

interface WorkOrder {
  id: string
  workOrderNo: string           // WO-2026-00001
  type: WorkOrderType
  status: WorkOrderStatus
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

  // Asset ที่ต้องดูแล
  assetId: string
  assetTag: string
  serialNumber: string
  assetModel: string
  assetBrand: string

  // ผู้เกี่ยวข้อง
  contractId: string
  contractNo: string
  lesseeId: string
  lesseeName: string
  siteAddress: string           // ที่อยู่ Asset

  // การนัดหมาย
  reportedBy: string
  reportedAt: string
  scheduledDate: string
  scheduledTimeSlot: string     // เช่น "09:00-12:00"
  technicianId: string
  technicianName: string

  // รายละเอียดงาน
  problemDescription: string    // อาการ / ปัญหาที่รายงาน
  workDescription: string       // งานที่ต้องทำ
  checklistItems: ChecklistItem[]

  // ผล
  actualStartAt?: string
  actualEndAt?: string
  result?: WorkOrderResult
  resultNote?: string
  partsUsed?: Part[]
  laborCost: number
  partsCost: number
  totalCost: number

  // รูปภาพ
  beforePhotos: string[]        // URL array
  afterPhotos: string[]

  // เชื่อมกับ Substitution / Insurance
  substitutionId?: string
  insuranceClaimId?: string

  // PM Plan reference (ถ้าเป็น PM)
  pmPlanId?: string
  pmScheduleItemId?: string

  createdAt: string
  updatedAt: string
}

interface ChecklistItem {
  id: string
  description: string
  isRequired: boolean
  result?: 'PASS' | 'FAIL' | 'N/A'
  note?: string
}

interface Part {
  partNo: string
  partName: string
  quantity: number
  unitCost: number
  totalCost: number
}

interface PMPlan {
  id: string
  planCode: string              // PM-CAMRY-A, PM-PURIFIER-B
  planName: string
  assetCategory: string         // SEDAN / SUV / WATER_PURIFIER / FREEZER
  assetModel?: string           // specific model หรือ null = all ใน category

  // ตารางการ PM
  intervalMonths: number        // ทำ PM ทุกกี่เดือน
  checklistTemplate: ChecklistItem[]  // template checklist
  estimatedDurationHours: number
  estimatedCost: number

  // ใช้ Plan นี้กับ Asset กี่ชิ้น
  activeAssetCount: number

  isActive: boolean
  createdAt: string
  updatedAt: string
}

=== 9A. Work Order List (src/pages/work-orders/index.vue) ===

Header:
- Title "Work Orders"
- ปุ่ม "+ สร้าง Work Order"
- Search (WO No / Serial / ลูกค้า)
- Filter: Type (PM / CM / EMERGENCY / INSPECTION)
- Filter: Status (VChipGroup)
- Filter: Priority (สีแดง=CRITICAL / สีส้ม=HIGH / สีเหลือง=MEDIUM / สีเทา=LOW)
- Filter: Technician (VSelect)
- Filter: วันที่นัด (DateRange)

Summary Cards:
- OPEN: XX รายการ
- IN_PROGRESS: XX รายการ
- PENDING_PARTS: XX รายการ (สีส้ม)
- ครบกำหนดวันนี้: XX รายการ (สีแดง)

VDataTable คอลัมน์:
- เลข WO + Priority badge (dot สี)
- ประเภท (VChip: PM=น้ำเงิน / CM=ส้ม / EMERGENCY=แดง)
- Asset (Model + Serial)
- ลูกค้า + ที่อยู่
- วันนัด + เวลา
- ช่าง
- Status (VChip)
- ต้นทุนรวม (แสดงเฉพาะ COMPLETED)
- Actions: View / Edit / Complete / Cancel

=== 9B. Work Order Form (src/pages/work-orders/[id].vue) ===

VTabs 4 แท็บ:

--- Tab 1: ข้อมูลงาน ---

Section: Asset ที่ต้องดูแล
- Asset (VAutocomplete — ค้นหาจาก Serial / Model / Tag)
  เมื่อเลือก → auto-fill: Contract, Lessee, Site Address, PM Plan (ถ้ามี)
- แสดง Asset Info Card:
  ┌─────────────────────────────────┐
  │ 🚗 Toyota Camry 2.5 HEV        │
  │ SN: 7324/TT6044J               │
  │ ลูกค้า: BUSINESS DEVELOPMENT   │
  │ Site: 456 ถ.พระราม9 กทม.       │
  │ ประกัน: MTI | หมด: 30/06/2027  │
  │ PM ล่าสุด: 15/09/2025          │
  │ PM ถัดไป: 15/03/2026 ← ใกล้มา │
  └─────────────────────────────────┘

Section: รายละเอียดงาน
- type* (VSelect)
- priority* (VSelect)
- problemDescription* (VTextarea — อาการ/ปัญหา)
- workDescription (VTextarea — งานที่ต้องทำ)

Section: นัดหมาย
- scheduledDate* (DatePicker)
- scheduledTimeSlot (VSelect: 09:00-12:00 / 13:00-17:00 / ทั้งวัน)
- technicianId* (VSelect — รายชื่อช่าง พร้อม Availability indicator)
  แสดง: ช่างที่มีงานวันนั้นแล้วกี่ใบ (ป้องกัน overbook)

--- Tab 2: Checklist ---

แสดง Checklist ที่ดึงจาก PM Plan (ถ้าเป็น PM) หรือ template มาตรฐาน
แต่ละรายการ:
- คำอธิบาย (readonly)
- Required badge (ถ้า isRequired)
- Result: VRadioGroup (PASS / FAIL / N/A)
- Note: VTextField (ถ้า FAIL → required)

Progress bar แสดง % checklist ที่ผ่าน

ถ้าทุก required item = PASS → แนะนำ result = PASS อัตโนมัติ
ถ้ามี required item = FAIL → บังคับ result ≠ PASS

--- Tab 3: ต้นทุน & รูปภาพ ---

Section: อะไหล่ (Parts Used)
- ตารางเพิ่ม/ลบ Part:
  | Part No. | ชื่ออะไหล่ | จำนวน | ราคา/หน่วย | รวม |
  [+ เพิ่มอะไหล่]

Section: ค่าใช้จ่าย
- laborCost (VTextField, number)
- partsCost (readonly, auto-sum จาก Parts table)
- totalCost (readonly, Calc = labor + parts)

Section: รูปภาพ
- "ก่อน" (Before Photos): DropZone + preview grid
- "หลัง" (After Photos): DropZone + preview grid

--- Tab 4: ผลลัพธ์ ---
(แสดงเฉพาะเมื่อ status = IN_PROGRESS หรือ COMPLETED)

- actualStartAt (DateTimePicker)
- actualEndAt (DateTimePicker)
- result* (VRadioGroup: PASS / FAIL / PARTIAL / PENDING_FOLLOWUP)
- resultNote (VTextarea)

ถ้า result = FAIL หรือ PARTIAL:
  VAlert สีส้ม:
  "งานนี้ยังไม่เสร็จสมบูรณ์ — ต้องการ:"
  [ ] สร้าง Work Order ใหม่ (Follow-up)
  [ ] เปิด Insurance Claim
  [ ] สร้าง Asset Substitution Request

Action Buttons ตาม Status:
- OPEN: [บันทึก] [Assign ช่าง] [ยกเลิก]
- ASSIGNED: [เริ่มงาน → IN_PROGRESS] [ยกเลิก]
- IN_PROGRESS: [บันทึกผล] [PENDING_PARTS]
- PENDING_PARTS: [Parts มาแล้ว → กลับ IN_PROGRESS]
- COMPLETED: readonly ทั้งหมด [Print Work Order]

=== 9C. PM Plan List (src/pages/pm-plans/index.vue) ===

Header:
- Title "แผนบำรุงรักษาเชิงป้องกัน (PM Plan)"
- ปุ่ม "+ สร้างแผน PM ใหม่"
- Filter: Asset Category

VDataTable คอลัมน์:
- รหัสแผน + ชื่อแผน
- ประเภท Asset / รุ่น
- ทำทุก X เดือน
- Checklist (จำนวน item)
- ประมาณการเวลา (ชั่วโมง)
- ประมาณการค่าใช้จ่าย (บาท)
- Asset ที่ใช้แผนนี้ (จำนวน)
- Active (VSwitch)
- Actions: View / Edit / Duplicate

=== 9D. PM Plan Form (src/pages/pm-plans/[id].vue) ===

VCard เดียว Layout:

Section: ข้อมูลแผน
- planCode* (VTextField — unique)
- planName* (VTextField)
- assetCategory* (VSelect)
- assetModel (VTextField — ว่างเปล่า = ใช้กับทุกรุ่นใน category)
- intervalMonths* (VSelect: 1/3/6/12 เดือน)
- estimatedDurationHours (VTextField, number)
- estimatedCost (VTextField, number)
- isActive (VSwitch)

Section: Checklist Template
ตารางเพิ่ม/ลบ Checklist Item:
| # | รายการตรวจสอบ | Required | Actions |
แต่ละแถว:
- description (VTextField inline)
- isRequired (VCheckbox)
- ปุ่มลบแถว

[+ เพิ่มรายการ]

Section: Preview — Asset ที่จะได้รับแผนนี้
VDataTable แสดง Asset ที่ match category/model:
- Asset Code + SN
- ลูกค้า
- PM ล่าสุด
- PM ถัดไป (Calc = ล่าสุด + intervalMonths)
- สถานะ (ใกล้ครบ / เกินกำหนด / ปกติ)

Action Bar:
- บันทึก / ยกเลิก
- "สร้าง Work Order PM สำหรับ Asset ที่ครบกำหนดแล้ว" → batch create WO

=== Pinia Store (src/stores/maintenance.ts) ===

useMaintenanceStore() มี:
- state: workOrders[], pmPlans[], loading
- actions:
  - fetchWorkOrders(filters?)
  - fetchWorkOrderById(id)
  - createWorkOrder(data)
  - updateWorkOrder(id, data)
  - assignTechnician(woId, technicianId, scheduledDate)
  - startWork(woId, startTime)
  - completeWork(woId, resultData)
  - cancelWorkOrder(woId, reason)
  - fetchPMPlans()
  - createPMPlan(data)
  - updatePMPlan(id, data)
  - generatePMWorkOrders(pmPlanId) — batch create WO สำหรับ asset ที่ครบกำหนด
- getters:
  - openWorkOrders
  - overdueWorkOrders (scheduledDate < today และ status != COMPLETED)
  - workOrdersByTechnician(techId)
  - assetsNeedingPM (วันนัด PM < today + 30 วัน)

Mock data อย่างน้อย:
- 8 Work Orders หลากหลาย type/status
- 3 PM Plans (Sedan / SUV / Water Purifier)
- Technicians mock: 5 คน
```

---

## PROMPT 10 — Master Data & Rate Tables (Settings)

```
สร้าง Master Data / Settings Module สำหรับ Operating Lease B2B ใน Vuexy template
นี่คือ "ตารางต้นทาง" ที่ Quotation Calculator (PROMPT 3) ดึงค่ามาคำนวณโดยอัตโนมัติ
ถ้าไม่มี module นี้ ผู้ใช้ต้องกรอกตัวเลขเองทุกครั้ง ซึ่งผิดพลาดได้ง่าย

=== ตัวเลขจาก PD14 Input Sheet ที่ต้องมาจาก Rate Table ===

จากเอกสาร OL-PD14 Input Sheet (Hire Group D, Pack PD14, Contract 60 เดือน):

  Repairs       → Services Monthly: 566.67   (= Total 34,000 ÷ 60)
  Servicing     → Services Monthly: 933.33   (= Total 56,000 ÷ 60)
  Tyres         → Services Monthly: 2,166.67 (= Total 130,000 ÷ 60)
  Reg Fee       → Finance Monthly:  646.40   (= Total 38,784 ÷ 60)
  Admin PD14    → Services Monthly: 140.00   (= Total 8,400 ÷ 60)
  Labor: Insur  → Services Monthly: 90.00
  Labor: Maint  → Services Monthly: 200.00
  Labor: Relief → Services Monthly: 260.00
  Labor: Procur → Services Monthly: 40.00
  Labor: Roads  → Services Monthly: 40.00
  Insurance MTI SEDAN STD → per payment: 3,521.60

ตัวเลขเหล่านี้ไม่ได้กรอกมือ — ระบบดึงจาก:
  1. Hire Group Rate Table   (Repairs/Servicing/Tyres ต่างกันตาม Group A/B/C/D)
  2. Maintenance Pack Table  (Admin Cost / Labor Costs ต่างกันตาม Pack PD13/PD14)
  3. Insurance Rate Table    (Premium ต่างกันตาม INS GRP 1-5 และประเภทรถ)
  4. Base Rate Table         (อัตราดอกเบี้ยพื้นฐาน เปลี่ยนตามนโยบาย)
  5. RV Table                (Residual Value % ต่างกันตาม model + term)

=== ไฟล์ที่ต้องสร้าง ===

1. src/pages/settings/hire-groups/index.vue
2. src/pages/settings/hire-groups/[id].vue
3. src/pages/settings/maintenance-packs/index.vue
4. src/pages/settings/maintenance-packs/[id].vue
5. src/pages/settings/insurance-rates/index.vue
6. src/pages/settings/base-rates/index.vue
7. src/pages/settings/rv-table/index.vue
8. src/stores/masterData.ts
9. src/types/master-data.ts

เพิ่มเมนู "ตั้งค่า" ใน navigation/vertical/index.ts:
{
  title: 'ตั้งค่า',
  icon: { icon: 'tabler-settings' },
  children: [
    { title: 'Hire Group & Rates', to: { name: 'settings-hire-groups' } },
    { title: 'Maintenance Pack',   to: { name: 'settings-maintenance-packs' } },
    { title: 'Insurance Rates',    to: { name: 'settings-insurance-rates' } },
    { title: 'Base Rate',          to: { name: 'settings-base-rates' } },
    { title: 'RV Table',           to: { name: 'settings-rv-table' } },
  ],
}

=== TypeScript Types (src/types/master-data.ts) ===

interface HireGroup {
  id: string
  code: string                   // 'A' | 'B' | 'C' | 'D'
  description: string            // "Sedan >2000cc / Premium"
  exampleModels: string[]        // ['Toyota Camry', 'Honda Accord']
  // Rates — ระบบจะ ÷ termMonths เพื่อหา monthly
  repairsTotal: number           // 34,000  (สำหรับ term มาตรฐาน)
  repairsBaseTerm: number        // 60 (เดือน — term ที่ใช้อ้างอิง)
  servicingPerEvent: number      // ราคาต่อครั้ง
  servicingDefaultCount: number  // 7 ครั้ง (default)
  tyresPerSet: number            // ราคาต่อชุด
  tyresDefaultSets: number       // 2 ชุด (default)
  isActive: boolean
  updatedAt: string
}

interface MaintenancePack {
  id: string
  code: string                   // 'PD14' | 'PD13' | 'BASIC'
  description: string
  includesRepairs: boolean
  includesServicing: boolean
  includesTyres: boolean
  includesRelief: boolean
  includesRoadside: boolean
  // Monthly labor costs (กรอกต่อเดือน)
  adminCostMonthly: number       // 140.00
  laborInsuranceMonthly: number  // 90.00
  laborMaintenanceMonthly: number // 200.00
  laborReliefMonthly: number     // 260.00
  laborProcurementMonthly: number // 40.00
  laborRoadsideMonthly: number   // 40.00
  isActive: boolean
  updatedAt: string
}

interface InsuranceRate {
  id: string
  provider: string               // 'MTI' | 'AXA' | 'TOKIO'
  planCode: string               // 'MTI SEDAN STD'
  vehicleType: string            // 'SEDAN' | 'SUV' | 'PICKUP'
  insuranceGroup: number         // 1 | 2 | 3 | 4 | 5
  premiumPerPayment: number      // 3,521.60
  coverageType: string           // 'COMPREHENSIVE' | 'THIRD_PARTY'
  effectiveFrom: string
  effectiveTo?: string
  isActive: boolean
}

interface BaseRate {
  id: string
  rate: number                   // 3.50 (%)
  effectiveFrom: string
  effectiveTo?: string           // null = ใช้อยู่
  note: string
  createdBy: string
}

interface RVTableEntry {
  id: string
  vehicleCategory: string        // 'SEDAN' | 'SUV' | 'ECO_CAR'
  brandModel: string             // 'Toyota Camry' หรือ '*' = category default
  termMonths: number             // 24 | 36 | 48 | 60
  rvPercent: number              // 37.0
  rvSourceNote: string
  effectiveFrom: string
  isActive: boolean
}

=== 10A. Hire Group Form ===

VCard เดียว — 2 Section:

Section 1: ข้อมูล Group
- code* (VSelect: A/B/C/D), description*
- exampleModels (VCombobox multiple — พิมพ์เพิ่มได้)

Section 2: Service Rates (ตาราง inline-edit)
┌──────────────────────────────────────────────────────┐
│  บริการ     │ วิธีคิด       │ ค่า (บาท)  │ Preview/เดือน│
├──────────────────────────────────────────────────────┤
│  Repairs    │ Total÷term    │[34,000]    │  566.67 ฿  │
│  Servicing  │ ราคา/ครั้ง   │[2,000]     │             │
│             │ × จำนวนครั้ง │[7]         │  233.33 ฿  │
│  Tyres      │ ราคา/ชุด     │[13,000]    │             │
│             │ × จำนวนชุด   │[2]         │  433.33 ฿  │
└──────────────────────────────────────────────────────┘
Preview อิง Term = 60 เดือน, อัปเดต real-time

=== 10B. Maintenance Pack Form ===

Section 1: บริการที่รวมใน Pack
(VSwitch แต่ละรายการ)
[☑] Repairs  [☑] Servicing  [☑] Tyres  [☑] Relief  [☑] Roadside

Section 2: Labor Costs ตาราง
┌──────────────────────────────────────────────────┐
│  รายการ                │ Monthly (฿) │ Total 60M │
├──────────────────────────────────────────────────┤
│  Admin Cost            │  [140.00]   │  8,400 ฿  │← Calc
│  Labor: Insurance      │   [90.00]   │  5,400 ฿  │
│  Labor: Maintenance    │  [200.00]   │ 12,000 ฿  │
│  Labor: Relief Vehicle │  [260.00]   │ 15,600 ฿  │
│  Labor: Procurement    │   [40.00]   │  2,400 ฿  │
│  Labor: Roadside       │   [40.00]   │  2,400 ฿  │
├──────────────────────────────────────────────────┤
│  TOTAL                 │  [770.00]   │ 46,200 ฿  │← Calc
└──────────────────────────────────────────────────┘

=== 10C. Insurance Rate Table ===

หน้าเดียว — จัดกลุ่มตาม Provider + Vehicle Type:

Filter: Vehicle Type (SEDAN / SUV / PICKUP)
Filter: Provider

ตาราง 5 แถว (INS GRP 1-5):
┌─────────────────────────────────────────────────┐
│ INS GRP │ แผน            │ Premium/งวด │ ประเภท │
│    1    │ MTI SEDAN STD  │  2,200.00   │ Comp.  │
│    2    │ MTI SEDAN STD  │  3,521.60   │ Comp.  │ ← จากเอกสาร
│    3    │ MTI SEDAN STD  │  4,200.00   │ Comp.  │
│    4    │ MTI SEDAN STD  │  5,100.00   │ Comp.  │
│    5    │ MTI SEDAN STD  │  6,800.00   │ Comp.  │
└─────────────────────────────────────────────────┘
กด cell เพื่อแก้ไข inline + บันทึก

=== 10D. Base Rate History ===

Timeline แสดงประวัติ:
[01/01/2026] 3.50% — ปรับตาม BOT  → ✅ ใช้อยู่
[01/07/2025] 3.75% — Q3/2025      → ⏹ หมดแล้ว
[01/01/2025] 4.00% — ปีงบใหม่    → ⏹ หมดแล้ว

ปุ่ม "+ ประกาศ Rate ใหม่" → Dialog:
- rate* (VTextField)
- effectiveFrom* (DatePicker — ต้องอนาคต)
- note (VTextField)
→ บันทึก: rate เดิม effectiveTo = วันก่อนหน้า auto

=== 10E. RV Table (Matrix View) ===

Filter: Vehicle Category

Matrix กรอกได้ inline:
┌──────────────────────────────────────────────┐
│ Brand / Model       │ 24M  │ 36M  │ 48M │ 60M│
├──────────────────────────────────────────────┤
│ Toyota Camry        │ 52%  │ 45%  │ 40% │ 37%│ ← จากเอกสาร
│ Honda Accord        │ 50%  │ 43%  │ 38% │ 35%│
│ * SEDAN (default)   │ 48%  │ 40%  │ 35% │ 32%│
└──────────────────────────────────────────────┘
กด cell แก้ไข + [Import จาก Excel] bulk update

=== 10F. Getters ใน useMasterDataStore ===

ต้องมี getter เหล่านี้ให้ PROMPT 3 (useOLCalculator) เรียกใช้:

// ดึง service rates ทั้งหมดตาม hire group + pack + term
getServiceRates(hireGroupCode, packCode, termMonths, servicingCount, tyresSets) {
  const hg = hireGroups.find(h => h.code === hireGroupCode)
  const pk = packs.find(p => p.code === packCode)
  return {
    repairsMonthly:    hg.repairsTotal / hg.repairsBaseTerm,  // ÷ base term (ไม่ใช่ actual term)
    servicingMonthly:  (hg.servicingPerEvent * servicingCount) / termMonths,
    tyresMonthly:      (hg.tyresPerSet * tyresSets) / termMonths,
    adminMonthly:      pk.adminCostMonthly,
    laborTotal:        pk.laborInsuranceMonthly + pk.laborMaintenanceMonthly
                       + pk.laborReliefMonthly + pk.laborProcurementMonthly
                       + pk.laborRoadsideMonthly,
  }
}

// ดึง insurance premium
getInsurancePremium(insuranceGroup, vehicleType, provider) {
  return insuranceRates.find(r =>
    r.insuranceGroup === insuranceGroup &&
    r.vehicleType === vehicleType &&
    r.provider === provider &&
    r.isActive
  )?.premiumPerPayment ?? 0
}

// ดึง base rate ปัจจุบัน
getCurrentBaseRate() {
  return baseRates.find(r => !r.effectiveTo)?.rate ?? 3.5
}

// ดึง RV % ตาม model + term (specific → category fallback)
getRVPercent(brandModel, termMonths) {
  return rvTable.find(r =>
    r.brandModel === brandModel && r.termMonths === termMonths && r.isActive
  )?.rvPercent
  ?? rvTable.find(r =>
    r.brandModel === '*' && r.termMonths === termMonths && r.isActive
  )?.rvPercent
  ?? 35
}

=== Mock Data ที่ต้องมีใน Store ===

Hire Groups:
- A: City Car (Repairs 20,000 / Serv 800/ครั้ง / Tyres 6,000/ชุด)
- B: Sedan <1500cc (Repairs 25,000 / Serv 1,200 / Tyres 8,000)
- C: Sedan 1500-2000cc (Repairs 30,000 / Serv 1,500 / Tyres 10,000)
- D: Sedan >2000cc / Premium (Repairs 34,000 / Serv 2,000 / Tyres 13,000)  ← จากเอกสาร

Maintenance Packs:
- PD13: Basic (admin 100, labor รวม 550/เดือน)
- PD14: Full (admin 140, labor รวม 770/เดือน)  ← จากเอกสาร
- BASIC: ประกันอย่างเดียว (admin 0, labor 0)

Insurance Rates (MTI SEDAN):
- GRP 1: 2,200 / GRP 2: 3,521.60 / GRP 3: 4,200 / GRP 4: 5,100 / GRP 5: 6,800

Base Rate: 3.50% (ปัจจุบัน)

RV Table:
- Toyota Camry: 60M=37%, 48M=40%, 36M=45%, 24M=52%
- * SEDAN default: 60M=32%, 48M=35%, 36M=40%, 24M=48%
```

---

## หมายเหตุสำหรับทุก Prompt

```
Tech Stack ที่ใช้:
- Vue 3 Composition API (<script setup lang="ts">)
- Vuetify 3 (VCard, VDataTable, VTextField, VSelect, VChip, VTabs, VDialog, VSnackbar)
- TypeScript (strict types)
- Pinia (useXxxStore pattern)
- vue-router (unplugin-vue-router — file-based routing)
- ApexCharts / vue3-apexcharts (สำหรับ chart)
- @vueuse/core (useLocalStorage, useDebounceFn, etc.)
- vue-flatpickr-component (สำหรับ DatePicker)

Convention ของ Vuexy:
- ใช้ Tabler icons: icon: { icon: 'tabler-xxx' }
- ใช้ VRow + VCol สำหรับ grid
- ใช้ definePageMeta() สำหรับ page meta
- ใช้ AppTable หรือ VDataTable
- ไม่ต้อง call API จริง — ใช้ mock data ใน store

Pattern ทั่วไป:
- List page: Search + Filter + Table + Pagination
- Form page: VStepper หรือ VTabs + Validation + Save/Cancel
- ใช้ VDialog สำหรับ Confirm Delete/Action
- ใช้ VSnackbar สำหรับ Success/Error notification
- Responsive: sm=12, md=6, lg=4 ตามเหมาะสม
```

---

## PROMPT 11 — Contract Events & Lifecycle Module

> **ครอบคลุม Comply Table items:**
> Renew / Extend / Re-structure / Sale & Lease Back / Amendment / Transfer / Sublease /
> Settle & Termination (รวม Loss & Total Loss) / Down Payment / Initial Payment / Security Deposit

```
สร้าง Contract Events & Lifecycle Module สำหรับ Operating Lease B2B
ใน Vuexy template (Vue 3 + Vuetify 3 + TypeScript + Pinia)

=== ไฟล์ที่ต้องสร้าง ===

1. src/pages/contract-events/index.vue          (Event Log รายการ Event ทั้งหมดของสัญญา)
2. src/pages/contract-events/[id].vue           (รายละเอียด Event + Form ดำเนินการ)
3. src/pages/contracts/[id]/financials.vue      (Down Payment / Security Deposit / Initial Payment)
4. src/stores/contractEvent.ts                  (Pinia Store)
5. src/types/contract-event.ts                  (TypeScript Types)
6. src/composables/useContractEvent.ts          (Business Logic)

=== TypeScript Types (src/types/contract-event.ts) ===

// ประเภท Contract Event ทั้งหมด
type ContractEventType =
  | 'RENEW'           // ต่อสัญญา (เงื่อนไขใหม่ + Rate ใหม่)
  | 'EXTEND'          // ขยายระยะเวลา (เงื่อนไขเดิม)
  | 'RESTRUCTURE'     // ปรับโครงสร้าง payment schedule (DR/TDR)
  | 'AMENDMENT'       // แก้ไขข้อกำหนดในสัญญา (เพิ่ม/ลด Asset, เปลี่ยน address)
  | 'TRANSFER'        // โอนสิทธิ์ให้ผู้เช่ารายใหม่
  | 'SUBLEASE'        // ให้เช่าช่วง (ต้องได้รับอนุมัติจาก Lessor)
  | 'SALE_LEASEBACK'  // ขายทรัพย์แล้วเช่ากลับ (Asset โอนมาจากลูกค้า)
  | 'EARLY_TERMINATION'  // ยกเลิกก่อนครบสัญญา (มีค่า ET)
  | 'SETTLEMENT'      // ปิดสัญญาปกติ (ครบกำหนด)
  | 'TOTAL_LOSS'      // สูญเสียทั้งหมด (ไฟไหม้/อุบัติเหตุร้ายแรง)
  | 'PARTIAL_LOSS'    // เสียหายบางส่วน (ประกันจ่ายบางส่วน)

type ContractEventStatus = 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'

interface ContractEvent {
  id: string
  contractId: string           // อ้างอิง MLA
  equipmentScheduleId?: string // อ้างอิง Equipment Schedule (ถ้าระบุเฉพาะ asset)
  eventType: ContractEventType
  eventDate: string            // วันที่มีผล
  requestDate: string          // วันที่ขอ
  requestedBy: string
  status: ContractEventStatus
  // ข้อมูลเฉพาะแต่ละ event type
  details: EventDetails
  // เอกสารแนบ
  attachments: Attachment[]
  // ประวัติการอนุมัติ
  approvalHistory: ApprovalStep[]
  remarks: string
}

// Early Termination / Settlement
interface ETDetails {
  terminationDate: string
  outstandingPrincipal: number   // เงินต้นคงเหลือ
  unearnedIncome: number         // ดอกเบี้ยที่ยังไม่รับรู้
  etFee: number                  // ค่า ET (กำหนดใน contract)
  etFeeRate: number              // % ของ outstanding
  insuranceRefund: number        // ประกันคืน
  securityDepositRefund: number  // เงินประกันคืน
  netPayable: number             // ยอดที่ลูกค้าต้องจ่าย/รับคืน
  // computed: netPayable = outstandingPrincipal + etFee - insuranceRefund - securityDepositRefund
}

// Total Loss
interface TotalLossDetails {
  incidentDate: string
  incidentType: 'FIRE' | 'FLOOD' | 'ACCIDENT' | 'THEFT' | 'OTHER'
  insuranceClaim: number         // วงเงินประกันที่เคลม
  insuranceDeductible: number    // ส่วนที่ลูกค้าออกเอง
  assetWriteOff: number          // มูลค่าที่ตัดออก
  replacementRequested: boolean  // ลูกค้าขอ Asset ทดแทน (→ ทำ Substitution)
  policeReportNo?: string
}

// Sale & Leaseback
interface SaleLeasebackDetails {
  assetPurchasePrice: number     // ราคาที่ Lessor ซื้อจากลูกค้า
  leasebackTerm: number          // ระยะเวลาเช่ากลับ (เดือน)
  newMonthlyRental: number       // ค่าเช่าใหม่
  ownershipTransferDate: string  // วันโอนกรรมสิทธิ์
}

// Restructure (DR/TDR)
interface RestructureDetails {
  restructureType: 'DR' | 'TDR'  // Debt Restructure / Troubled Debt Restructure
  originalSchedule: PaymentRow[]
  newSchedule: PaymentRow[]
  interestReduction?: number      // ลดดอกเบี้ย (TDR)
  principalReduction?: number     // ลดเงินต้น (TDR)
  extensionMonths?: number        // ขยายระยะเวลา
  approvalCommitteeDate?: string  // วันที่คณะกรรมการอนุมัติ (TDR ต้องผ่านคณะกรรมการ)
  tfrs9Impact: string             // ผลกระทบต่อ TFRS9 staging
}

type EventDetails = ETDetails | TotalLossDetails | SaleLeasebackDetails | RestructureDetails | Record<string, unknown>

// Down Payment / Initial Payment / Security Deposit
interface ContractFinancials {
  contractId: string
  // Down Payment
  downPaymentAmount: number      // เงินดาวน์ (ลด Financial Rental)
  downPaymentDate: string
  downPaymentMethod: 'CASH' | 'TRANSFER' | 'CHEQUE'
  // Security Deposit
  securityDepositAmount: number  // เงินประกัน (ไม่ใช่ค่าเช่า — คืนท้ายสัญญา)
  securityDepositDate: string
  securityDepositType: 'CASH' | 'GUARANTEE_LETTER' | 'POST_DATED_CHEQUE'
  // Initial Payment (ค่าเช่างวดแรก + ค่าใช้จ่ายแรกเข้า)
  initialPaymentAmount: number
  initialPaymentItems: {
    description: string
    amount: number
  }[]
}

=== หน้า Event Log (src/pages/contract-events/index.vue) ===

แสดง Timeline ของ Events ทั้งหมดต่อสัญญา:
- Filter by: contractId | eventType | status | dateRange
- ตาราง: วันที่ | ประเภท Event | สัญญา | ผู้ขอ | สถานะ | Action
- Badge สี: DRAFT=grey, PENDING=amber, APPROVED=blue, COMPLETED=green, CANCELLED=red
- ปุ่ม "สร้าง Event ใหม่" → Dialog เลือก eventType → redirect ไปหน้า form

=== หน้า Event Detail / Form (src/pages/contract-events/[id].vue) ===

ใช้ VTabs แยกตาม eventType:

Tab 1: ข้อมูลทั่วไป
- contractId (autocomplete จาก active contracts)
- eventType (VSelect)
- eventDate, remarks

Tab 2: รายละเอียด Event (dynamic form ตาม eventType)

กรณี EARLY_TERMINATION / SETTLEMENT:
  - แสดง Outstanding Principal, Unearned Income (คำนวณจาก Lease Schedule)
  - กรอก ET Fee Rate → คำนวณ ET Fee อัตโนมัติ
  - กรอก Insurance Refund, Security Deposit Refund
  - แสดง Net Payable (สีเขียว=ได้รับคืน / สีแดง=ต้องจ่ายเพิ่ม)

กรณี TOTAL_LOSS:
  - วันเกิดเหตุ, ประเภทเหตุการณ์, เลขรายงานตำรวจ
  - วงเงินประกัน, Deductible
  - Checkbox: ต้องการ Asset ทดแทน → ถ้า tick ให้ link ไปสร้าง Asset Substitution

กรณี SALE_LEASEBACK:
  - ราคาซื้อ Asset จากลูกค้า
  - เงื่อนไขการเช่ากลับ (ระยะเวลา, Rate ใหม่)
  - วันโอนกรรมสิทธิ์

กรณี RESTRUCTURE (DR/TDR):
  - ประเภท DR หรือ TDR
  - Payment Schedule เดิม vs ใหม่ (แสดง side-by-side comparison table)
  - สำหรับ TDR: กรอก Interest Reduction %, Principal Reduction
  - แสดง TFRS9 impact (staging เปลี่ยนจาก Stage X → Y)

Tab 3: Approval Workflow
- แสดง approval chain (requester → supervisor → credit manager → committee)
- ปุ่ม Approve / Reject พร้อม remarks

=== Contract Financials (src/pages/contracts/[id]/financials.vue) ===

แสดงและแก้ไข:
- Down Payment: จำนวน, วันที่, วิธีชำระ, status (Pending/Received)
- Security Deposit: จำนวน, ประเภท (Cash/Guarantee/PDC), status
- Initial Payment: รายการค่าใช้จ่ายแรกเข้า + ยอดรวม
- Payment Method สำหรับ recurring (Advance vs Arrear)
- Payment Pattern (Straight / Step-Up / Step-Down) พร้อม preview schedule

สำหรับ Step-Up/Down: ให้มีตาราง input ว่า
  ช่วงเวลา (เดือน) | ค่าเช่าต่อเดือน
  1-12              | 15,000
  13-24             | 17,000
  25-36             | 19,000

=== useContractEvent.ts Composable ===

export function useContractEvent() {
  // คำนวณ ET Settlement
  function calculateET(schedule: LeaseScheduleRow[], asOfDate: string, etFeeRate: number): ETDetails
  
  // คำนวณผลกระทบ Total Loss
  function calculateTotalLoss(contractId: string, insuranceClaim: number, deductible: number): TotalLossDetails
  
  // Generate Restructured Schedule
  function generateRestructuredSchedule(
    originalSchedule: LeaseScheduleRow[],
    extensionMonths: number,
    interestReduction: number
  ): PaymentRow[]
}

ไม่ต้อง call API จริง — ใช้ mock data
ใช้ Vuetify: VTabs, VTimeline, VDataTable, VDialog, VChip
```

---

## PROMPT 12 — Credit, KYC & Debtor Management Module

> **ครอบคลุม Comply Table items:**
> KYC & Credit Scoring (PDPA + Consent) / Debtor Management / NCB / Legal & Seize Process

```
สร้าง Credit, KYC & Debtor Management Module สำหรับ Operating Lease B2B
ใน Vuexy template (Vue 3 + Vuetify 3 + TypeScript + Pinia)

=== ไฟล์ที่ต้องสร้าง ===

1. src/pages/kyc/index.vue                (KYC Request List)
2. src/pages/kyc/[id].vue                 (KYC Form + PDPA Consent + Credit Scoring)
3. src/pages/debtors/index.vue            (Debtor Aging Report)
4. src/pages/debtors/[id].vue             (รายละเอียดลูกหนี้ + ประวัติการชำระ)
5. src/pages/ncb/index.vue                (NCB Request & Result List)
6. src/pages/legal/index.vue              (Legal & Seize Process List)
7. src/pages/legal/[id].vue               (Legal Case Detail)
8. src/stores/credit.ts                   (Pinia Store)
9. src/types/credit.ts                    (TypeScript Types)

=== TypeScript Types (src/types/credit.ts) ===

// ─── KYC & PDPA ───────────────────────────────────────────────
interface KYCRequest {
  id: string
  customerId: string
  requestDate: string
  status: 'PENDING' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED' | 'EXPIRED'
  // PDPA Consent (ต้องได้รับก่อนดำเนินการใดๆ)
  pdpaConsent: {
    consentDate: string
    consentVersion: string     // version ของ consent form
    consentBy: string          // ชื่อผู้ให้ consent (authorized person)
    purposes: PDPAPurpose[]    // วัตถุประสงค์ที่ได้รับ consent
    expiryDate: string         // วันหมดอายุ consent (default 3 ปี)
    withdrawnDate?: string     // ถ้าถอน consent
  }
  // เอกสาร KYC
  documents: KYCDocument[]
  // Credit Scoring
  creditScore: CreditScore
  // ผล
  approvedCreditLimit?: number
  rejectionReason?: string
  reviewedBy: string
  reviewedDate?: string
}

type PDPAPurpose =
  | 'CREDIT_CHECK'       // ตรวจสอบเครดิต
  | 'NCB_INQUIRY'        // ขอข้อมูล NCB
  | 'MARKETING'          // การตลาด
  | 'PRODUCT_OFFER'      // เสนอผลิตภัณฑ์
  | 'DATA_SHARING'       // แชร์ข้อมูลกับพันธมิตร

interface KYCDocument {
  docType: 'COMPANY_REG' | 'FINANCIAL_STMT' | 'BANK_STMT' | 'TAX_CERT' | 'DIRECTOR_ID' | 'OTHER'
  fileName: string
  uploadDate: string
  verified: boolean
}

interface CreditScore {
  scoreDate: string
  // Internal Scoring
  internalScore: number         // 0-100 internal model
  internalGrade: 'A' | 'B' | 'C' | 'D' | 'F'
  // scoring factors (แสดงเหตุผล)
  factors: {
    factor: string              // เช่น "อายุกิจการ", "อัตราส่วนหนี้สิน"
    score: number
    weight: number
    comment: string
  }[]
  // NCB Score (ถ้ามี)
  ncbScore?: number
  ncbGrade?: string
  ncbInquiryDate?: string
  // Recommended Credit Limit
  recommendedLimit: number
  recommendedTenor: number      // เดือน
}

// ─── Debtor Management ────────────────────────────────────────
type DebtorStatus = 'CURRENT' | 'OVERDUE_1_30' | 'OVERDUE_31_60' | 'OVERDUE_61_90' | 'NPL' | 'LEGAL'

interface DebtorSummary {
  customerId: string
  companyName: string
  activeContracts: number
  totalOutstanding: number      // ยอดค้างชำระรวม
  overdueAmount: number         // ยอดเกินกำหนด
  overdueDays: number           // วันที่เกินกำหนดสูงสุด
  status: DebtorStatus
  lastPaymentDate?: string
  lastPaymentAmount?: number
  collectionStage: 'NORMAL' | 'SOFT_CALL' | 'HARD_CALL' | 'LEGAL' | 'SEIZE'
}

interface CollectionActivity {
  id: string
  customerId: string
  activityDate: string
  activityType: 'PHONE_CALL' | 'SMS' | 'EMAIL' | 'VISIT' | 'LETTER' | 'LEGAL_NOTICE'
  result: 'CONTACTED' | 'NO_ANSWER' | 'PROMISE_TO_PAY' | 'DISPUTE' | 'UNABLE_TO_CONTACT'
  promiseDate?: string          // วันที่นัดชำระ
  promiseAmount?: number
  notes: string
  createdBy: string
}

// ─── NCB ──────────────────────────────────────────────────────
interface NCBRequest {
  id: string
  customerId: string
  requestDate: string
  requestType: 'NEW' | 'RENEWAL' | 'MONITORING'
  consentRef: string            // อ้างอิง PDPA consent ID
  status: 'PENDING' | 'SUBMITTED' | 'RECEIVED' | 'FAILED'
  // NCB Result
  result?: {
    receivedDate: string
    score?: number
    creditHistory: NCBCreditLine[]
    inquiryCount3Months: number // จำนวนครั้งที่ถูก inquiry ใน 3 เดือน
    flags: string[]             // เช่น "NPA", "Write-off", "Restructured"
    rawReportFile?: string      // PDF attachment
  }
}

interface NCBCreditLine {
  financialInstitution: string
  productType: string
  creditLimit: number
  outstanding: number
  overdueDays: number
  accountStatus: string
}

// ─── Legal & Seize ────────────────────────────────────────────
type LegalStage =
  | 'WARNING_LETTER_1'    // หนังสือแจ้งเตือนครั้งที่ 1 (overdue 30 วัน)
  | 'WARNING_LETTER_2'    // หนังสือแจ้งเตือนครั้งที่ 2 (overdue 60 วัน)
  | 'DEMAND_LETTER'       // หนังสือทวงถาม (overdue 90 วัน)
  | 'LEGAL_FILING'        // ฟ้องคดี
  | 'COURT_PROCESS'       // อยู่ระหว่างพิจารณาคดี
  | 'JUDGMENT'            // ศาลมีคำพิพากษา
  | 'ENFORCEMENT'         // บังคับคดี / ยึดทรัพย์
  | 'ASSET_SEIZED'        // ยึดทรัพย์แล้ว
  | 'COMPLETED'           // ปิดคดี

interface LegalCase {
  id: string
  customerId: string
  contractId: string
  currentStage: LegalStage
  startDate: string
  claimAmount: number           // ยอดฟ้องรวม
  outstandingAtFiling: number   // ยอดค้างชำระ ณ วันฟ้อง
  courtCaseNo?: string          // เลขคดี
  court?: string                // ศาลที่ยื่นฟ้อง
  lawyer?: string               // ทนายความ / บริษัทกฎหมาย
  hearingDates: HearingDate[]
  seizedAssets?: string[]       // Asset IDs ที่ยึด
  timeline: LegalEvent[]
}

interface LegalEvent {
  date: string
  stage: LegalStage
  description: string
  attachments: string[]
  createdBy: string
}

=== หน้า KYC Form (src/pages/kyc/[id].vue) ===

VStepper 4 ขั้นตอน:

Step 1: PDPA Consent
  - แสดงข้อความ consent (อ่านอย่างละเอียด)
  - Checkbox ยืนยันแต่ละ Purpose (CREDIT_CHECK, NCB_INQUIRY บังคับ)
  - ชื่อผู้ให้ consent + วันที่ + electronic signature placeholder
  - ⚠️ ถ้าไม่ได้รับ consent CREDIT_CHECK → block ไม่ให้ดำเนินการต่อ

Step 2: เอกสาร KYC
  - Upload: หนังสือรับรองบริษัท, งบการเงิน 3 ปี, Bank Statement 6 เดือน
  - แสดง checklist เอกสารที่จำเป็น (required) vs optional
  - ปุ่ม Verify แต่ละเอกสาร

Step 3: Credit Scoring
  - กรอก/import ตัวเลขทางการเงิน (Revenue, Net Profit, Total Assets, Total Debt)
  - ระบบคำนวณ Score อัตโนมัติจาก factors:
    * อายุกิจการ (น้อยกว่า 3 ปี = หัก, มากกว่า 10 ปี = บวก)
    * D/E Ratio
    * Current Ratio
    * Net Profit Margin
    * ประวัติ NCB (ถ้ามี)
  - แสดงผล Score + Grade + Recommended Credit Limit
  - ปุ่ม "ขอ NCB" → สร้าง NCBRequest

Step 4: Summary & Approval
  - สรุป KYC Result
  - Approval form: Credit Limit ที่อนุมัติ, หมายเหตุ
  - ปุ่ม Approve / Reject

=== หน้า Debtor Aging (src/pages/debtors/index.vue) ===

- Aging Table:
  คอลัมน์: ลูกค้า | ปัจจุบัน | 1-30 วัน | 31-60 วัน | 61-90 วัน | >90 วัน (NPL) | รวม
  แถวล่างสุด: ยอดรวมแต่ละ bucket
- Filter by: Collection Stage, ผู้รับผิดชอบ
- Export CSV
- กด row → ไปหน้า Debtor Detail

=== หน้า Debtor Detail (src/pages/debtors/[id].vue) ===

- Header: ชื่อลูกค้า + Status Badge + ยอดค้างชำระ + วันค้างนานสุด
- Tab 1: รายละเอียดสัญญาและยอดค้าง (per contract)
- Tab 2: Collection History (timeline ของการติดตาม)
  - ปุ่ม "บันทึก Activity" → Dialog กรอก activity type, result, promise
- Tab 3: NCB History
- Tab 4: Legal Cases (ถ้ามี)
- Quick Action buttons: 📞 Call Log | ✉️ Send Letter | ⚖️ เปิดคดีกฎหมาย

=== หน้า Legal Case (src/pages/legal/[id].vue) ===

- Header: Case ID, ลูกค้า, Stage badge, ยอดฟ้อง
- Timeline vertical (VTimeline):
  WARNING_LETTER_1 → WARNING_LETTER_2 → DEMAND_LETTER → LEGAL_FILING → ...
  แต่ละ step แสดงวันที่ + เอกสารแนบ + ปุ่ม advance stage
- Tab: นัดพิจารณา (Hearing Dates)
- Tab: ทรัพย์ที่ยึด → link ไป Asset Management (status เปลี่ยนเป็น SEIZED)

ไม่ต้อง call API จริง — ใช้ mock data
ใช้ Vuetify: VStepper, VTimeline, VDataTable, VDialog, VChip, VFileInput
```

---

## PROMPT 13 — Financial Accounting & Compliance Module

> **ครอบคลุม Comply Table items:**
> TFRS9 (ECL / Staging) / DR / TDR / Fixed & Floating Rate (Yield, IRR, EIR) /
> User Defined Fields framework
>
> **และ OL-specific ที่ยังไม่อยู่ใน comply table:**
> TFRS 16 (Right-of-Use Asset + Lease Liability) / Residual Value Management

```
สร้าง Financial Accounting & Compliance Module สำหรับ Operating Lease B2B
ใน Vuexy template (Vue 3 + Vuetify 3 + TypeScript + Pinia)

=== ไฟล์ที่ต้องสร้าง ===

1. src/pages/accounting/tfrs16/index.vue        (TFRS 16 Lease Liability Schedule — Lessee View)
2. src/pages/accounting/tfrs9/index.vue         (TFRS9 ECL Staging & Provision)
3. src/pages/accounting/rate-calculator/index.vue  (Yield / IRR / EIR Calculator)
4. src/pages/accounting/residual-value/index.vue   (RV Management & Tracking)
5. src/pages/settings/user-defined-fields/index.vue (UDF Framework)
6. src/stores/accounting.ts                     (Pinia Store)
7. src/types/accounting.ts                      (TypeScript Types)
8. src/composables/useFinancialCalc.ts          (Financial Calculations)

=== TypeScript Types (src/types/accounting.ts) ===

// ─── TFRS 16 ──────────────────────────────────────────────────
// (Lessee Perspective — ผู้เช่าต้องรับรู้ ROU Asset + Lease Liability)
interface TFRS16Schedule {
  contractId: string
  commencementDate: string
  leaseTerm: number              // เดือน
  discountRate: number           // Incremental Borrowing Rate (IBR) %
  // Opening
  rightOfUseAsset: number        // มูลค่า ROU Asset เริ่มต้น (= PV ของ lease payments)
  leaseLiability: number         // Lease Liability เริ่มต้น (= PV ของ lease payments)
  // Amortization
  rouAmortizationMethod: 'STRAIGHT_LINE' | 'DECLINING'
  rows: TFRS16Row[]
}

interface TFRS16Row {
  period: number                 // งวดที่
  date: string
  openingLeaseLiability: number
  leasePayment: number           // ค่าเช่าจริง
  interestExpense: number        // ดอกเบี้ย = Opening × IBR/12
  principalRepayment: number     // ชำระต้น = leasePayment - interestExpense
  closingLeaseLiability: number
  rouDepreciation: number        // ค่าเสื่อม ROU Asset
  closingRouAsset: number
}

// ─── TFRS9 ────────────────────────────────────────────────────
type TFRS9Stage = 'STAGE1' | 'STAGE2' | 'STAGE3'

interface TFRS9Assessment {
  contractId: string
  assessmentDate: string
  currentStage: TFRS9Stage
  // Stage criteria
  stagingCriteria: {
    dpd: number                  // Days Past Due
    significantCreditDegradation: boolean  // SICR
    inDefault: boolean
    legalStatus: boolean
  }
  // ECL Calculation
  ecl: {
    pd: number                   // Probability of Default %
    lgd: number                  // Loss Given Default %
    ead: number                  // Exposure at Default (outstanding)
    ecl12Month: number           // Stage 1: 12-month ECL
    eclLifetime: number          // Stage 2/3: Lifetime ECL
    provision: number            // เงินสำรองที่ต้องตั้ง
  }
  stageHistory: { date: string; stage: TFRS9Stage; reason: string }[]
}

// ─── Rate Calculations ────────────────────────────────────────
interface RateCalculation {
  calculationType: 'YIELD' | 'IRR' | 'EIR' | 'FLAT_TO_EFFECTIVE'
  // Input
  principal: number
  totalInterest: number
  term: number                   // เดือน
  paymentSchedule?: PaymentCashflow[]
  rateType: 'FIXED' | 'FLOATING'
  // Floating Rate
  floatingBase?: 'THBFIX' | 'SOFR' | 'MLR' | 'MOR' | 'MRR'
  spread?: number                // THBFIX + Spread%
  // Output
  flatRate?: number
  yieldRate?: number             // Nominal Yield
  irr?: number                   // Internal Rate of Return (monthly compounding)
  eir?: number                   // Effective Interest Rate (TFRS9/IFRS 9 amortized cost)
}

interface PaymentCashflow {
  period: number
  date: string
  cashflow: number               // ลบ=รับ, บวก=จ่าย (จากมุมมอง Lessor)
}

// ─── Residual Value Management ───────────────────────────────
interface ResidualValueRecord {
  contractId: string
  assetId: string
  originalRV: number             // RV ณ วันทำสัญญา
  originalRVRate: number         // % ของราคาทุน
  currentBookValue: number       // NBV ปัจจุบัน
  marketValue?: number           // ราคาตลาดปัจจุบัน (ประเมินโดย Remarketing)
  rvAdjustments: RVAdjustment[]  // ถ้ามีการ adjust RV ระหว่างทาง
  endOfLeaseAction?: 'RETURN' | 'PURCHASE' | 'RENEW'
  actualSalePrice?: number       // ราคาขายจริง (ถ้า PURCHASE/Remarketing)
  rvGainLoss?: number            // กำไร/ขาดทุนเมื่อเทียบกับ original RV
}

interface RVAdjustment {
  date: string
  adjustedRV: number
  reason: string
  approvedBy: string
}

// ─── User Defined Fields (UDF) ───────────────────────────────
type UDFEntity = 'CONTRACT' | 'CUSTOMER' | 'ASSET' | 'INVOICE' | 'QUOTATION'
type UDFFieldType = 'TEXT' | 'NUMBER' | 'DATE' | 'DROPDOWN' | 'CHECKBOX' | 'TEXTAREA'

interface UDFDefinition {
  id: string
  entity: UDFEntity
  fieldCode: string              // เช่น "CUSTOM_001"
  fieldLabel: string             // ชื่อที่แสดง
  fieldType: UDFFieldType
  required: boolean
  dropdownOptions?: string[]     // สำหรับ DROPDOWN
  displayOrder: number
  active: boolean
  createdBy: string
}

=== หน้า TFRS 16 Schedule (src/pages/accounting/tfrs16/index.vue) ===

Section 1: Filter (เลือกสัญญา + วันที่)

Section 2: Summary Cards
- ROU Asset: มูลค่าตั้งต้น | ค่าเสื่อมสะสม | NBV ปัจจุบัน
- Lease Liability: มูลค่าตั้งต้น | ชำระแล้ว | คงเหลือ
- Interest Expense (YTD)

Section 3: Amortization Table (VDataTable)
คอลัมน์: งวด | วันที่ | Opening Liability | ค่าเช่า | ดอกเบี้ย | ชำระต้น | Closing Liability | ค่าเสื่อม ROU | Closing ROU

Section 4: Journal Entry ตัวอย่าง (แสดง Dr/Cr ของแต่ละงวด):
  Dr  Lease Liability         XXX
  Dr  Interest Expense        XXX
  Cr  Cash                    XXX
  ---
  Dr  Depreciation Expense    XXX
  Cr  Accumulated Depreciation - ROU Asset  XXX

=== หน้า TFRS9 Staging (src/pages/accounting/tfrs9/index.vue) ===

Section 1: Portfolio Summary
- Donut chart: Stage 1 / Stage 2 / Stage 3 / NPL (จำนวนสัญญาและยอด)
- ยอด ECL provision รวม

Section 2: Staging Table
คอลัมน์: สัญญา | ลูกค้า | Outstanding | DPD | Stage ปัจจุบัน | Stage ก่อน | ECL | Action
- Badge: Stage1=green, Stage2=amber, Stage3=red
- ปุ่ม "Override Stage" + เหตุผล (สำหรับ Management Override)

Section 3: ECL Parameters (editable)
- PD Table แยกตาม Stage
- LGD %
- ปุ่ม "Run ECL Calculation" → อัปเดต provision ทั้ง portfolio

=== หน้า Rate Calculator (src/pages/accounting/rate-calculator/index.vue) ===

Layout: 2 คอลัมน์

คอลัมน์ซ้าย: Input
- Calculation Type: YIELD / IRR / EIR / Flat-to-Effective Converter
- Principal, Total Interest, Term
- Payment Schedule (paste หรือ generate)
- Rate Type: Fixed vs Floating (ถ้า Floating: เลือก Base Rate + Spread)

คอลัมน์ขวา: Result
- Flat Rate: XX.XX%
- Yield (Nominal): XX.XX% p.a.
- IRR (Monthly compounded): XX.XX% p.a.
- EIR (Effective Interest Rate): XX.XX% p.a.
- แสดงตาราง Amortization Schedule
- หมายเหตุ: EIR ใช้สำหรับรับรู้ดอกเบี้ยตาม TFRS9 (Amortized Cost)

=== หน้า Residual Value (src/pages/accounting/residual-value/index.vue) ===

- ตาราง: สัญญา | Asset | RV ตั้งต้น | RV% | NBV ปัจจุบัน | ราคาตลาด | Gap | วันหมดสัญญา | Action
- Badge ถ้า Gap (ราคาตลาด < RV): แสดงสีแดง "RV Risk"
- ปุ่ม "Remarket" → ส่งไป End-of-Lease workflow
- กราฟ: RV vs Market Value trend ตลอดอายุสัญญา

=== หน้า User Defined Fields (src/pages/settings/user-defined-fields/index.vue) ===

- เลือก Entity (Contract / Customer / Asset / Invoice / Quotation)
- ตาราง UDF ที่กำหนดไว้:
  คอลัมน์: ลำดับ | Code | Label | Type | Required | Active | Actions (Edit/Toggle/Delete)
- ปุ่ม "เพิ่ม Field ใหม่" → Dialog:
  - Entity, Field Code (auto-generate), Label, Type, Required, Dropdown Options (ถ้า DROPDOWN)
- หมายเหตุ: UDF ที่สร้างจะแสดงใน form ของ entity นั้นๆ โดยอัตโนมัติ (ใน Tab "ข้อมูลเพิ่มเติม")

=== useFinancialCalc.ts Composable ===

export function useFinancialCalc() {
  // TFRS16: คำนวณ Present Value ของ lease payments
  function calcPresentValue(cashflows: number[], discountRate: number): number

  // TFRS16: สร้าง amortization schedule
  function buildTFRS16Schedule(
    leaseLiability: number,
    monthlyPayment: number,
    ibr: number,
    term: number
  ): TFRS16Row[]

  // IRR: Newton-Raphson method (monthly)
  function calcIRR(cashflows: PaymentCashflow[]): number

  // EIR: อัตราดอกเบี้ยที่แท้จริง (Effective Interest Rate)
  function calcEIR(cashflows: PaymentCashflow[], principal: number): number

  // Flat to Effective Rate Converter
  function flatToEffective(flatRate: number, term: number): number

  // TFRS9 ECL
  function calcECL(pd: number, lgd: number, ead: number, stage: TFRS9Stage): number
}

ไม่ต้อง call API จริง — ใช้ mock data
ใช้ Vuetify: VDataTable, VTabs, VCard, VChip + vue3-apexcharts สำหรับกราฟ
```

---

---

## PROMPT 14 — GL / AR / AP & Billing-Collection Module

> **ครอบคลุม Comply Table items (FIN & ACC):**
> GL (General Ledger) / AR (Accounts Receivable) / AP (Accounts Payable) /
> Billing and Collection — ส่วนที่ยังขาด: Receipt, Bank Recon, SOA, Chart of Accounts
>
> **OL-specific context:**
> - AR = Lease Receivable (Financial Rental) + Maintenance Fee Receivable
> - AP = ค่า Maintenance ที่ค้างจ่ายให้อู่ + ค่าประกันที่ค้างจ่ายให้บริษัทประกัน
> - GL ต้องรองรับ Deferred Income (Unearned Interest) ตาม EIR method (TFRS9)
> - Security Deposit บันทึกเป็น Liability (ไม่ใช่ Revenue)

```
สร้าง GL / AR / AP & Billing-Collection Module สำหรับ Operating Lease B2B
ใน Vuexy template (Vue 3 + Vuetify 3 + TypeScript + Pinia)

=== ไฟล์ที่ต้องสร้าง ===

1. src/pages/accounting/chart-of-accounts/index.vue   (ผังบัญชี - Chart of Accounts)
2. src/pages/accounting/gl/index.vue                  (General Ledger — สมุดบัญชีแยกประเภท)
3. src/pages/accounting/gl/journal/[id].vue           (Journal Entry Form)
4. src/pages/accounting/ar/index.vue                  (AR Dashboard + Aging)
5. src/pages/accounting/ar/receipts/index.vue         (Receipt Recording — รับชำระเงิน)
6. src/pages/accounting/ar/receipts/[id].vue          (Receipt Form)
7. src/pages/accounting/ar/soa/[customerId].vue       (Statement of Account)
8. src/pages/accounting/ar/bank-recon/index.vue       (Bank Reconciliation)
9. src/pages/accounting/ap/index.vue                  (AP Dashboard + Aging)
10. src/pages/accounting/ap/payments/index.vue        (AP Payment — จ่ายเงิน)
11. src/stores/accounting-gl.ts                       (Pinia Store)
12. src/types/accounting-gl.ts                        (TypeScript Types)

=== TypeScript Types (src/types/accounting-gl.ts) ===

// ─── Chart of Accounts ────────────────────────────────────────
type AccountType = 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE'
type AccountNature = 'DR' | 'CR'  // Normal balance side

interface ChartOfAccount {
  code: string             // เช่น "1110", "4101"
  name: string             // เช่น "Lease Receivable", "Rental Income"
  nameEn?: string
  type: AccountType
  nature: AccountNature
  parentCode?: string      // สำหรับ sub-account
  level: number            // 1=หมวด, 2=กลุ่ม, 3=บัญชี, 4=Sub
  active: boolean
  isSystemAccount: boolean // บัญชีระบบ — ไม่ให้ลบ
}

// บัญชีหลักสำหรับ OL Lessor (ตัวอย่าง)
// 1110 Lease Receivable — Current (AR ค่าเช่าระยะสั้น)
// 1111 Lease Receivable — Non-Current
// 1120 Maintenance Fee Receivable
// 1130 Accrued Revenue
// 1210 Assets on Lease (FA ที่ให้เช่า — ราคาทุน)
// 1211 Accumulated Depreciation — Assets on Lease
// 1310 Security Deposit Receivable (เงินประกันที่รับมา → Liability)
// 2110 Security Deposit Payable (คืนให้ลูกค้าท้ายสัญญา)
// 2120 AP — Maintenance Vendors
// 2130 AP — Insurance Premiums
// 2140 Unearned Interest Income (Deferred Income)
// 2150 VAT Payable
// 2160 WHT Payable
// 4101 Financial Rental Income
// 4102 Maintenance Rental Income
// 4103 Insurance Income (pass-through)
// 4104 Interest Income (EIR method)
// 4105 Gain on RV / Sale of Asset
// 5101 Depreciation Expense — Assets on Lease
// 5102 Maintenance Cost
// 5103 Insurance Expense
// 5104 Bad Debt Expense / ECL Expense

// ─── Journal Entry ────────────────────────────────────────────
type JournalSource =
  | 'INVOICE'        // จาก Invoice สร้าง → Dr AR / Cr Revenue
  | 'RECEIPT'        // รับชำระ → Dr Cash / Cr AR
  | 'AP_INVOICE'     // AP Invoice → Dr Expense / Cr AP
  | 'AP_PAYMENT'     // จ่าย AP → Dr AP / Cr Cash
  | 'DEPRECIATION'   // Depreciation run → Dr Depr Expense / Cr Accum Depr
  | 'EIR_AMORTIZE'   // EIR amortization → Dr Unearned Income / Cr Interest Income
  | 'ECL_PROVISION'  // TFRS9 provision → Dr Bad Debt Expense / Cr ECL Allowance
  | 'MANUAL'         // Manual Journal

interface JournalEntry {
  id: string
  entryNo: string           // JE-2024-0001
  date: string
  source: JournalSource
  sourceRefId?: string      // Invoice ID / Receipt ID / etc.
  description: string
  lines: JournalLine[]
  status: 'DRAFT' | 'POSTED' | 'REVERSED'
  reversalEntryId?: string
  postedBy?: string
  postedDate?: string
  period: string            // "2024-01" (accounting period)
}

interface JournalLine {
  lineNo: number
  accountCode: string
  accountName: string
  description: string
  dr: number               // 0 ถ้า CR side
  cr: number               // 0 ถ้า DR side
  costCenter?: string
  contractId?: string      // dimension สำหรับ profitability
  customerId?: string
}

// ─── AR Receipt ───────────────────────────────────────────────
type PaymentMethod = 'CASH' | 'TRANSFER' | 'CHEQUE' | 'DIRECT_DEBIT' | 'PROMPTPAY' | 'CREDIT_CARD'

interface Receipt {
  id: string
  receiptNo: string         // RC-2024-0001
  receiptDate: string
  customerId: string
  // Invoice ที่ชำระ (สามารถชำระหลายใบพร้อมกัน)
  appliedInvoices: {
    invoiceId: string
    invoiceNo: string
    invoiceAmount: number
    paidAmount: number
    discount?: number
    whtDeducted?: number    // ภาษีหัก ณ ที่จ่ายที่ลูกค้าหัก
  }[]
  totalReceived: number
  paymentMethod: PaymentMethod
  bankAccount?: string
  chequeNo?: string
  chequeDate?: string
  referenceNo?: string      // Bank reference / PromptPay ref
  // WHT (ถ้าลูกค้าหักภาษี ณ ที่จ่าย)
  whtTotal: number
  whtCertNo?: string        // เลขที่หนังสือรับรองหัก ณ ที่จ่าย
  // Status
  status: 'DRAFT' | 'CONFIRMED' | 'BOUNCED' | 'CANCELLED'
  journalEntryId?: string   // JE ที่สร้างจาก Receipt นี้
}

// ─── Statement of Account ────────────────────────────────────
interface SOALine {
  date: string
  refNo: string             // Invoice No. / Receipt No.
  description: string
  invoiceAmount: number
  paidAmount: number
  balance: number
  daysOverdue: number
}

// ─── Bank Reconciliation ─────────────────────────────────────
interface BankReconItem {
  id: string
  date: string
  bankRef: string           // Reference จาก Bank Statement
  bankAmount: number
  matchedReceiptId?: string  // Receipt ที่ match แล้ว
  status: 'UNMATCHED' | 'MATCHED' | 'PARTIAL' | 'EXCEPTION'
  notes?: string
}

// ─── AP ──────────────────────────────────────────────────────
interface APInvoice {
  id: string
  apInvoiceNo: string       // AP-2024-0001
  vendorId: string          // อู่ / บริษัทประกัน / อื่นๆ
  vendorName: string
  vendorTaxId: string
  invoiceDate: string
  dueDate: string
  // รายการ
  lines: APLine[]
  subtotal: number
  vatAmount: number
  whtAmount: number         // WHT ที่เราหัก ณ จ่าย
  netPayable: number        // subtotal + vat - wht
  // อ้างอิง
  workOrderId?: string      // อ้างอิง Work Order
  contractId?: string
  status: 'PENDING' | 'APPROVED' | 'PAID' | 'PARTIAL' | 'CANCELLED'
}

interface APLine {
  description: string
  amount: number
  whtRate: number           // % WHT (maintenance service = 3%, rent = 5%)
  whtAmount: number
  accountCode: string
}

=== หน้า Chart of Accounts (src/pages/accounting/chart-of-accounts/index.vue) ===

- Tree view (VTreeview) แสดงผังบัญชีแบบ hierarchy
- Filter: Account Type (ASSET/LIABILITY/EQUITY/REVENUE/EXPENSE)
- ปุ่ม "เพิ่มบัญชี" → Dialog: Code, Name, Type, Nature, Parent
- Badge: isSystemAccount = lock icon ไม่ให้ลบ
- Export to Excel
- สีแยก Type: ASSET=blue, LIABILITY=red, EQUITY=purple, REVENUE=green, EXPENSE=orange

=== หน้า General Ledger (src/pages/accounting/gl/index.vue) ===

Section 1: Filter
- บัญชี (accountCode autocomplete), Period (เดือน), Source

Section 2: Account Balance Summary (ถ้าเลือก 1 บัญชี)
- Opening Balance | Debit (รวม) | Credit (รวม) | Closing Balance

Section 3: GL Transactions Table
คอลัมน์: วันที่ | JE No. | Source | Description | DR | CR | Running Balance
- กด row → ไป Journal Entry detail
- แสดง Unposted JE ด้วย (สีเทา)

=== หน้า Journal Entry Form (src/pages/accounting/gl/journal/[id].vue) ===

- Header: JE No., Date, Source, Description
- Lines Table (editable):
  | # | บัญชี (autocomplete) | คำอธิบาย | DR | CR | Cost Center | Contract |
  - ปุ่ม + Add Line
  - Footer: รวม DR | รวม CR | Difference (ต้องเป็น 0 จึง Post ได้)
- ปุ่ม: Save Draft / Post / Reverse (ถ้า Posted)
- Auto-generate JE จาก Invoice:
  Dr  1110 Lease Receivable        xxx
  Dr  1120 Maintenance Receivable  xxx
      Cr  4101 Financial Rental Income    xxx
      Cr  4102 Maintenance Rental Income  xxx
      Cr  2150 VAT Payable                xxx

=== หน้า AR Receipt Form (src/pages/accounting/ar/receipts/[id].vue) ===

Step 1: เลือกลูกค้า + Invoice ที่ต้องการชำระ
- แสดง Outstanding Invoice ของลูกค้า (VDataTable checkable)
- คอลัมน์: Invoice No. | วันที่ | ยอด | ค้างชำระ | Overdue Days
- กรอก "จ่ายเท่าไหร่" แต่ละใบ (partial payment allowed)

Step 2: วิธีชำระเงิน
- Payment Method dropdown (TRANSFER / CHEQUE / DIRECT_DEBIT / PROMPTPAY)
- วันที่รับชำระ, Bank Account, Reference No.
- WHT section: ถ้าลูกค้าหัก WHT → กรอก WHT Amount + WHT Cert No.
  (Net Received = Total Invoice - WHT)

Step 3: ยืนยัน + Auto-generate JE
- สรุปยอดรับจริง, WHT, ยอดค้างชำระคงเหลือ
- Preview JE:
  Dr  Cash/Bank              xxx
  Dr  WHT Receivable         xxx (ถ้ามี WHT)
      Cr  Lease Receivable       xxx
      Cr  Maintenance Receivable xxx
- ปุ่ม Confirm → สร้าง Receipt + Post JE อัตโนมัติ

=== หน้า Statement of Account (src/pages/accounting/ar/soa/[customerId].vue) ===

- Header: ชื่อลูกค้า, As of Date, Contact Info
- ตาราง SOA: วันที่ | เลขที่เอกสาร | รายการ | Invoice | ชำระแล้ว | ยอดคงเหลือ
- Summary: Total Outstanding | Overdue Amount
- ปุ่ม "Print / Export PDF" → ส่ง Email ให้ลูกค้า
- Watermark: STATEMENT OF ACCOUNT

=== หน้า Bank Reconciliation (src/pages/accounting/ar/bank-recon/index.vue) ===

- Upload Bank Statement (CSV/Excel)
- 2-panel view:
  ซ้าย: รายการ Receipt ในระบบ (ยังไม่ match)
  ขวา: รายการใน Bank Statement (ยังไม่ match)
- Auto-match: ถ้า Amount + Date ตรงกัน → match อัตโนมัติ
- Manual match: drag-drop หรือ select คู่
- Unmatched items: แสดง Exception list + เหตุผล
- Summary: Reconciled Amount | Outstanding System | Outstanding Bank

=== หน้า AP (src/pages/accounting/ap/index.vue) ===

- Aging Table:
  Vendor | ปัจจุบัน | 1-30 | 31-60 | >60 | รวม
- Filter: Vendor, Status, Period
- ปุ่ม "สร้าง AP Invoice" → Form (อ้างอิง Work Order)
- ปุ่ม "จ่ายเงิน" → เลือก AP Invoice + Payment Method

=== Auto Journal สำหรับ AP ===
เมื่อสร้าง AP Invoice (Maintenance):
  Dr  5102 Maintenance Cost      xxx
      Cr  2120 AP — Maintenance Vendors  xxx
      Cr  2160 WHT Payable               xxx (3% WHT on services)

เมื่อจ่าย AP:
  Dr  2120 AP — Maintenance Vendors  xxx
      Cr  Cash/Bank                   xxx

ไม่ต้อง call API จริง — ใช้ mock data
ใช้ Vuetify: VDataTable, VTreeview, VTabs, VDialog, VChip, VStepper
```

---

## PROMPT 15 — Fixed Assets (FA) Module — Lessor Perspective

> **ครอบคลุม Comply Table items (FIN & ACC):**
> Fixed Assets — การบันทึกและบริหารสินทรัพย์ถาวรในมุมของ Lessor
>
> **ความแตกต่าง OL vs HP/Loan:**
> - **OL Lessor:** ยังคงกรรมสิทธิ์ใน Asset → บันทึกเป็น FA ในงบของ Lessor →
>   Depreciation Expense ของ Lessor เอง
> - **HP/Loan:** โอนกรรมสิทธิ์ให้ลูกค้าตั้งแต่ต้น → ไม่มี FA ในงบ Lessor
> - **TFRS 16 (Lessee):** ลูกค้าบันทึก ROU Asset — คนละตัวกับ FA ของ Lessor

```
สร้าง Fixed Assets (FA) Module สำหรับ Operating Lease B2B — Lessor Perspective
ใน Vuexy template (Vue 3 + Vuetify 3 + TypeScript + Pinia)

=== ไฟล์ที่ต้องสร้าง ===

1. src/pages/fixed-assets/index.vue           (FA Register — ทะเบียนสินทรัพย์ถาวร)
2. src/pages/fixed-assets/[id].vue            (FA Detail + Depreciation Schedule)
3. src/pages/fixed-assets/depreciation/index.vue  (Depreciation Run)
4. src/pages/fixed-assets/disposal/index.vue  (FA Disposal / Write-off)
5. src/pages/fixed-assets/revaluation/index.vue   (FA Revaluation)
6. src/stores/fixed-assets.ts                 (Pinia Store)
7. src/types/fixed-assets.ts                  (TypeScript Types)
8. src/composables/useDepreciation.ts         (Depreciation Calculations)

=== TypeScript Types (src/types/fixed-assets.ts) ===

type FAStatus = 'ACTIVE' | 'FULLY_DEPRECIATED' | 'DISPOSED' | 'IMPAIRED' | 'UNDER_MAINTENANCE'
type DepreciationMethod = 'STRAIGHT_LINE' | 'DECLINING_BALANCE' | 'UNITS_OF_PRODUCTION'
type FACategory =
  | 'VEHICLE_PASSENGER'   // รถยนต์นั่ง (เสื่อมราคา 5 ปี)
  | 'VEHICLE_COMMERCIAL'  // รถบรรทุก (เสื่อมราคา 5 ปี)
  | 'MACHINERY'           // เครื่องจักร
  | 'EQUIPMENT'           // อุปกรณ์สำนักงาน
  | 'IT_EQUIPMENT'        // อุปกรณ์ IT

interface FixedAsset {
  id: string
  assetCode: string           // FA-2024-0001 (ต่างจาก Asset SN ใน Asset Management)
  assetManagementId: string   // link ไป Asset Management (SN)
  assetName: string
  category: FACategory
  // มูลค่าและอายุ
  acquisitionDate: string
  acquisitionCost: number     // ราคาทุน
  residualValue: number       // มูลค่าคงเหลือ (Scrap Value) ≠ Lease RV
  usefulLifeYears: number     // อายุการใช้งาน (ปี)
  depreciationMethod: DepreciationMethod
  depreciationRate: number    // % ต่อปี
  // บัญชีที่เกี่ยวข้อง
  accountCode: string         // 1210 Assets on Lease
  accumDeprAccount: string    // 1211 Accumulated Depreciation
  deprExpenseAccount: string  // 5101 Depreciation Expense
  // สถานะ
  status: FAStatus
  // การเช่า (ถ้า FA นี้ถูก on-lease อยู่)
  currentLeaseContractId?: string
  currentLesseeName?: string
  leaseStartDate?: string
  leaseEndDate?: string
  // มูลค่าปัจจุบัน
  accumulatedDepreciation: number
  netBookValue: number        // = acquisitionCost - accumulatedDepreciation
  // Revaluation
  revaluedAmount?: number
  revaluationDate?: string
  revaluationSurplus?: number // Revaluation Surplus ใน OCI
}

interface DepreciationScheduleRow {
  period: string              // "2024-01"
  date: string
  openingNBV: number
  depreciationExpense: number
  accumulatedDepreciation: number
  closingNBV: number
}

interface FADisposal {
  assetId: string
  disposalDate: string
  disposalType: 'SALE' | 'WRITE_OFF' | 'TRANSFER' | 'TOTAL_LOSS'
  saleProceeds?: number       // ราคาขาย (ถ้า SALE)
  nbvAtDisposal: number       // NBV วันที่ Dispose
  gainLossOnDisposal: number  // = saleProceeds - nbvAtDisposal
  // Journal (Auto-generate):
  // Dr  Accumulated Depreciation    xxx
  // Dr  Cash/Receivable             xxx  (ถ้า SALE)
  // Dr/Cr Gain/Loss on Disposal     xxx
  //     Cr  Asset Cost               xxx
  journalEntryId?: string
  approvedBy: string
  remarks: string
}

interface FARevaluation {
  assetId: string
  revaluationDate: string
  previousNBV: number
  newFairValue: number
  increase: number            // บวก = surplus → OCI / ลบ = impairment → P&L
  // Journal:
  // Dr  Asset Cost (adjust)      xxx
  // Dr/Cr Accumulated Depreciation (adjust)  xxx
  //     Cr  Revaluation Surplus (OCI)         xxx  (กรณีเพิ่ม)
  // หรือ
  // Dr  Impairment Loss (P&L)    xxx
  //     Cr  Asset Cost                        xxx  (กรณีลด)
}

=== หน้า FA Register (src/pages/fixed-assets/index.vue) ===

KPI Cards (4 cards):
- จำนวน FA ทั้งหมด + แยก Active / On-Lease / Fully Depreciated
- มูลค่าทุนรวม (Acquisition Cost)
- NBV รวม (ณ วันนี้)
- ค่าเสื่อมราคาสะสม (Accumulated Depreciation)

ตาราง FA:
คอลัมน์: Asset Code | ชื่อ | Category | ราคาทุน | NBV | Depr % | Status | On-Lease | วันหมดสัญญา | Action

Filter: Category | Status | On-Lease (Yes/No) | ช่วงวันที่ซื้อ

=== หน้า FA Detail (src/pages/fixed-assets/[id].vue) ===

Tab 1: ข้อมูลทั่วไป
- ข้อมูล FA ทั้งหมด + link ไป Asset Management record
- แสดงว่า on-lease กับใคร (contract, lessee, ระยะเวลา)

Tab 2: Depreciation Schedule
- ตารางเสื่อมราคาตลอดอายุ (VDataTable)
  คอลัมน์: งวด | วันที่ | Opening NBV | ค่าเสื่อม | Accum Depr | Closing NBV
- กราฟ NBV Declining curve (ApexCharts line chart)
- ปุ่ม "Run Depreciation for [Month]"

Tab 3: ประวัติการเช่า (Lease History)
- Timeline: ถูก lease ครั้งที่ 1 (ลูกค้า A, 2020-2022) → ครั้งที่ 2 (ลูกค้า B, 2022-2025) → ปัจจุบัน
- ใช้ VTimeline

Tab 4: เอกสาร (Book, Registration, Invoice ซื้อ)

=== Depreciation Run (src/pages/fixed-assets/depreciation/index.vue) ===

- เลือก Period (เดือน/ปี)
- ตาราง Preview: แสดง FA ทั้งหมดที่จะ Run + ยอดค่าเสื่อมแต่ละตัว
- ยอดรวมค่าเสื่อมราคาทั้งหมด
- ปุ่ม "Run Depreciation" → Confirm Dialog → Post JE อัตโนมัติ:
  Dr  5101 Depreciation Expense — Assets on Lease    XXX (รวมทุกตัว)
      Cr  1211 Accumulated Depreciation — Assets on Lease  XXX
- แสดงสถานะ: ยัง Run ไหม / Run แล้ว (วันที่ + ผู้ Run)
- ป้องกัน Run ซ้ำใน Period เดียวกัน

=== useDepreciation.ts Composable ===

export function useDepreciation() {
  // Straight Line
  function calcStraightLine(cost: number, residual: number, lifeYears: number): number  // ต่อปี
  
  // Declining Balance
  function calcDecliningBalance(nbv: number, rate: number): number  // ต่อปี
  
  // สร้าง Full Schedule ตลอดอายุ
  function buildDepreciationSchedule(asset: FixedAsset): DepreciationScheduleRow[]
  
  // คำนวณ NBV ณ วันที่ใดวันหนึ่ง
  function getNBVAtDate(asset: FixedAsset, asOfDate: string): number
}

หมายเหตุ Thai Tax:
- รถยนต์นั่ง (≤10 ที่นั่ง): อัตราภาษีเสื่อม 20% declining balance (5 ปี)
- ราคาทุนรถยนต์นั่ง: สรรพากรจำกัดราคาทุนไม่เกิน 1,000,000 บาท/คัน
- ค่าเสื่อมราคาทางบัญชี vs ทางภาษีอาจต่างกัน → Deferred Tax

ไม่ต้อง call API จริง — ใช้ mock data
ใช้ Vuetify: VDataTable, VTabs, VTimeline, VDialog + ApexCharts
```

---

## PROMPT 16 — E-Document & Tax Compliance Module

> **ครอบคลุม Comply Table items (FIN & ACC):**
> E-invoice / E-tax (Invoice) / E-WHT (หัก ณ ที่จ่าย) / E-receipt /
> E-payment / E-filing / E-stamp
>
> **Thai Regulatory Context:**
> - E-invoice / E-tax invoice: ตามมาตรฐาน ETDA + กรมสรรพากร (RD) — ต้องมี Digital Signature
> - E-WHT: ยื่นแบบ ภ.ง.ด.1/3/53 ออนไลน์ผ่าน RD efiling
> - E-receipt: ใบเสร็จรับเงินอิเล็กทรอนิกส์
> - E-payment: PromptPay, Direct Debit, BAHTNET
> - E-stamp: อากรแสตมป์อิเล็กทรอนิกส์ (สัญญาเช่า > 1,000 บาท ต้องติด)
> - E-filing: ยื่น ภ.พ.30 (VAT), ภ.ง.ด. ต่างๆ

```
สร้าง E-Document & Tax Compliance Module สำหรับ Operating Lease B2B
ใน Vuexy template (Vue 3 + Vuetify 3 + TypeScript + Pinia)

=== ไฟล์ที่ต้องสร้าง ===

1. src/pages/e-doc/tax-invoice/index.vue         (E-Tax Invoice List + Status)
2. src/pages/e-doc/tax-invoice/[id].vue          (E-Tax Invoice Detail + Preview)
3. src/pages/e-doc/wht/index.vue                 (E-WHT — ใบหัก ณ ที่จ่าย)
4. src/pages/e-doc/wht/monthly/index.vue         (WHT Monthly Summary สำหรับ efiling)
5. src/pages/e-doc/receipt/index.vue             (E-Receipt List)
6. src/pages/e-doc/payment/index.vue             (E-Payment — Direct Debit / PromptPay)
7. src/pages/e-doc/stamp/index.vue               (E-Stamp — อากรแสตมป์)
8. src/pages/e-doc/filing/index.vue              (E-Filing Dashboard — ภ.พ.30, ภ.ง.ด.)
9. src/stores/e-doc.ts                           (Pinia Store)
10. src/types/e-doc.ts                           (TypeScript Types)

=== TypeScript Types (src/types/e-doc.ts) ===

// ─── E-Tax Invoice ────────────────────────────────────────────
// มาตรฐานตาม ETDA + กรมสรรพากรไทย
type ETaxInvoiceType =
  | 'TAX_INVOICE'          // ใบกำกับภาษี
  | 'DEBIT_NOTE'           // ใบเพิ่มหนี้
  | 'CREDIT_NOTE'          // ใบลดหนี้
  | 'RECEIPT_TAX_INVOICE'  // ใบเสร็จรับเงิน/ใบกำกับภาษี

type ETaxInvoiceStatus =
  | 'DRAFT'
  | 'SIGNED'           // มี Digital Signature
  | 'SUBMITTED_RD'     // ส่ง RD แล้ว
  | 'ACCEPTED_RD'      // RD ยืนยันรับ
  | 'REJECTED_RD'      // RD ปฏิเสธ
  | 'CANCELLED'        // ยกเลิก (ออก Credit Note แทน)

interface ETaxInvoice {
  id: string
  invoiceNo: string            // เลขที่ใบกำกับภาษี (ต่อเนื่อง)
  invoiceType: ETaxInvoiceType
  invoiceDate: string
  // Seller (เรา — Lessor)
  sellerTaxId: string          // 13 หลัก
  sellerName: string
  sellerAddress: string
  sellerBranchNo: string       // 00000 = สำนักงานใหญ่
  // Buyer (ลูกค้า — Lessee)
  buyerTaxId: string
  buyerName: string
  buyerAddress: string
  buyerBranchNo: string
  // รายการ
  lines: ETaxInvoiceLine[]
  // ภาษี
  subtotal: number
  vatRate: number              // 7%
  vatAmount: number
  total: number
  // อ้างอิง Invoice ในระบบ
  sourceInvoiceId: string
  // Digital Signature
  signatureStatus: 'UNSIGNED' | 'SIGNED' | 'VERIFIED'
  signedAt?: string
  certificateSerial?: string   // Digital Certificate Serial
  rdSubmissionId?: string      // RD Reference Number
  rdSubmittedAt?: string
  status: ETaxInvoiceStatus
}

interface ETaxInvoiceLine {
  lineNo: number
  description: string          // เช่น "ค่าเช่ารถยนต์ เดือน มกราคม 2567"
  quantity: number
  unitPrice: number
  amount: number
  vatType: 'STANDARD' | 'ZERO_RATE' | 'EXEMPT'  // OL ส่วนใหญ่ Standard 7%
}

// ─── E-WHT (ภาษีหัก ณ ที่จ่าย) ───────────────────────────────
// สำหรับ AP ที่เราหักจากผู้รับเงิน (อู่, ประกัน, ที่ปรึกษา ฯลฯ)
type WHTType = 'PND1' | 'PND3' | 'PND53'
// PND1: เงินเดือน / PND3: บุคคลธรรมดา / PND53: นิติบุคคล

interface WHTCertificate {
  id: string
  certNo: string               // เลขที่หนังสือรับรองหัก ณ ที่จ่าย
  whtType: WHTType
  issueDate: string
  // ผู้จ่าย (เรา)
  payerTaxId: string
  payerName: string
  // ผู้รับ (Vendor / อู่ / ประกัน)
  payeeTaxId: string
  payeeName: string
  payeeAddress: string
  // รายการ
  lines: WHTLine[]
  totalIncome: number
  totalWHT: number
  // อ้างอิง AP Invoice
  apInvoiceId: string
  // E-Filing
  filingRef?: string           // Reference เมื่อยื่น efiling
  filingDate?: string
  status: 'DRAFT' | 'ISSUED' | 'FILED' | 'CANCELLED'
}

interface WHTLine {
  incomeType: string           // ประเภทเงินได้ เช่น "ค่าบริการ", "ค่าเช่า"
  incomeTypeCode: string       // รหัสตามกรมสรรพากร เช่น "3(2)"
  incomeAmount: number
  whtRate: number              // 3% หรือ 5%
  whtAmount: number
}

// รายละเอียดอัตรา WHT สำหรับ OL:
// - Maintenance Service (บริษัท): PND53, ประเภท 3(2) = 3%
// - ค่าเช่าอสังหาริมทรัพย์: PND3/53 = 5% (ไม่ใช่รถ)
// - รถยนต์ (moveable property lease): ไม่ต้องหัก WHT ตาม OL
// - วิชาชีพอิสระ: PND3, ประเภท 6 = 3%

// ─── E-Payment ───────────────────────────────────────────────
type EPaymentMethod = 'PROMPTPAY' | 'DIRECT_DEBIT' | 'BAHTNET' | 'ORFT'

interface EPaymentBatch {
  id: string
  batchNo: string
  paymentDate: string
  paymentMethod: EPaymentMethod
  // PromptPay / Direct Debit specific
  bankCode?: string
  bankAccountNo?: string
  // รายการที่จ่าย
  items: EPaymentItem[]
  totalAmount: number
  status: 'PENDING' | 'SUBMITTED' | 'CONFIRMED' | 'FAILED' | 'PARTIAL'
  bankRef?: string
}

interface EPaymentItem {
  type: 'AR_COLLECTION' | 'AP_PAYMENT'  // เก็บเงินลูกค้า หรือ จ่ายเจ้าหนี้
  refId: string                         // Invoice ID หรือ AP Invoice ID
  receiverTaxId: string
  receiverName: string
  receiverBankAccount: string
  amount: number
  status: 'PENDING' | 'SUCCESS' | 'FAILED'
  failureReason?: string
}

// ─── E-Stamp ─────────────────────────────────────────────────
// อากรแสตมป์สำหรับสัญญาเช่า
// อัตรา: ค่าเช่า > 1,000 บาท/ครั้ง หรือรวมทั้งสัญญา
// อัตราค่าอากร: 1 บาท ต่อทุก 1,000 บาท (หรือเศษของ 1,000 บาท)
// สูงสุดไม่เกิน... (ขึ้นอยู่กับประเภทสัญญา)

interface EStampRecord {
  id: string
  stampNo: string
  contractId: string
  contractType: string
  stampDate: string
  contractValue: number        // มูลค่าสัญญารวม
  stampDuty: number            // = Math.ceil(contractValue / 1000) บาท (สูงสุด 10,000)
  stampMethod: 'ELECTRONIC' | 'PHYSICAL'
  rdRef?: string               // Reference จาก RD
  status: 'PENDING' | 'PAID' | 'CANCELLED'
}

// ─── E-Filing ────────────────────────────────────────────────
type FilingFormType =
  | 'PP30'    // ภ.พ.30 — VAT Monthly Return
  | 'PP36'    // ภ.พ.36 — VAT for services from abroad
  | 'PND1'    // ภ.ง.ด.1 — WHT on salary (monthly)
  | 'PND1A'   // ภ.ง.ด.1ก — WHT on salary (annual)
  | 'PND3'    // ภ.ง.ด.3 — WHT on individual (monthly)
  | 'PND53'   // ภ.ง.ด.53 — WHT on corporate (monthly)
  | 'PND50'   // ภ.ง.ด.50 — Corporate Income Tax (annual)
  | 'PND51'   // ภ.ง.ด.51 — Corporate Income Tax (half-year)

interface TaxFiling {
  id: string
  formType: FilingFormType
  taxPeriod: string            // "2024-01" สำหรับรายเดือน, "2024" สำหรับรายปี
  dueDate: string              // กำหนดยื่น
  taxableAmount: number
  taxAmount: number
  surcharge?: number           // เบี้ยปรับ (ถ้ายื่นเกินกำหนด)
  status: 'DRAFT' | 'PREPARED' | 'FILED' | 'PAID' | 'OVERDUE'
  filedDate?: string
  rdRefNo?: string             // เลขที่รับจาก RD
  // ข้อมูลสำหรับแต่ละ form
  summary: FilingSummary
}

interface FilingSummary {
  outputVAT?: number           // PP30: ภาษีขาย
  inputVAT?: number            // PP30: ภาษีซื้อ
  netVAT?: number              // PP30: ภาษีต้องชำระ
  whtItems?: WHTLine[]         // PND3/53: รายละเอียด WHT
}

=== หน้า E-Tax Invoice (src/pages/e-doc/tax-invoice/index.vue) ===

KPI Cards:
- ออก Invoice แล้ว (เดือนนี้) | ส่ง RD แล้ว | ยังไม่ส่ง RD | ถูกปฏิเสธ

ตาราง:
คอลัมน์: เลขที่ | วันที่ | ลูกค้า | ยอด | VAT | สถานะ RD | Action (Preview/Download/Submit RD)
Filter: Status, วันที่, ลูกค้า

ปุ่ม "Submit to RD" (batch) → เลือก Invoice หลายใบ → Submit พร้อมกัน

=== หน้า E-Tax Invoice Preview (src/pages/e-doc/tax-invoice/[id].vue) ===

แสดงใบกำกับภาษีแบบ rendered:
- Header: ใบกำกับภาษี / TAX INVOICE (ขนาดใหญ่)
- ข้อมูล Seller / Buyer แบบ 2 column
- ตารางรายการ
- ยอดรวม + VAT + Grand Total
- Digital Signature section: Certificate, Signed At, Status
- QR Code (สำหรับ verify ที่ RD)
- ปุ่ม: Download PDF | Send Email | Submit to RD | Cancel (ออก Credit Note)

=== หน้า E-WHT Monthly (src/pages/e-doc/wht/monthly/index.vue) ===

- เลือก Period + Form Type (PND3 / PND53)
- แสดง WHT Certificates ทั้งหมดของเดือน
- Summary: จำนวน Vendor | รวมรายได้ | รวม WHT
- ปุ่ม "Generate Filing File" → Export XML/CSV ตาม RD format
- ปุ่ม "Submit via RD e-Filing" (link ไป RD Portal)
- แสดง Status ของแต่ละเดือน: ยื่นแล้ว / ยังไม่ยื่น / เกินกำหนด (Badge สี)

=== หน้า E-Filing Dashboard (src/pages/e-doc/filing/index.vue) ===

Calendar View แสดงกำหนดยื่นแต่ละ Form:
- ทุกวันที่ 7: ภ.ง.ด.1, ภ.ง.ด.3, ภ.ง.ด.53
- ทุกวันที่ 15: ภ.พ.30 (หรือ 23 ถ้ายื่น e-filing)
- ปลายปี: ภ.ง.ด.50, ภ.ง.ด.51

Status ต่อ Form: 
- 🟢 ยื่นแล้ว + จ่ายแล้ว
- 🟡 เตรียมแล้ว รอยื่น
- 🔴 เกินกำหนด
- ⚪ ยังไม่เริ่ม

ปุ่ม "Prepare" แต่ละ Form → คำนวณจากข้อมูลในระบบอัตโนมัติ

=== E-Stamp Calculator ===
สูตร: stampDuty = Math.ceil(contractValue / 1000) บาท
ตัวอย่าง: สัญญา OL มูลค่ารวม 756,000 บาท → อากรแสตมป์ = 756 บาท

=== หน้า E-Payment (src/pages/e-doc/payment/index.vue) ===

Section 1: Direct Debit Setup
- ลูกค้าที่ตั้ง Direct Debit ไว้ + บัญชีธนาคาร
- สถานะ: Active / Suspended / Cancelled

Section 2: Monthly Collection Batch
- ปุ่ม "Generate Batch [เดือน]" → รวบ Invoice ทั้งหมดที่ครบกำหนด
- แสดงรายการ: ลูกค้า | Invoice | ยอด | ธนาคาร | สถานะ
- ปุ่ม "Submit Batch" → ส่งไปธนาคาร
- ดูผล: Success / Failed / Partial

Section 3: PromptPay QR
- สร้าง QR สำหรับแต่ละ Invoice (PromptPay standard)
- แสดง QR + Amount + Reference

ไม่ต้อง call API จริง — ใช้ mock data
ใช้ Vuetify: VDataTable, VTabs, VCard, VChip, VCalendar + QRCode library
```

---

---

## PROMPT 17 — Stock / Port Management / Procurement Module

> **ครอบคลุม Comply Table items (Fleet Management):**
> Stock Management / Port Management / Procurement
>
> **OL-specific context:**
> - Lessor ต้องซื้อ Asset ก่อน (จาก Dealer/Manufacturer) แล้วค่อยให้เช่า
> - รถนำเข้า: ต้องผ่านกระบวนการ Port Clearance + ภาษีนำเข้า + ตรวจสภาพ
> - Stock = รถที่อยู่ใน "คลัง" ยังไม่ assign ให้ลูกค้า (status: AVAILABLE/RESERVED)
> - Procurement flow: PR (Purchase Request) → PO (Purchase Order) → Receive → 3-Way Match → AP Invoice

```
สร้าง Stock / Port Management / Procurement Module สำหรับ Operating Lease B2B
ใน Vuexy template (Vue 3 + Vuetify 3 + TypeScript + Pinia)

=== ไฟล์ที่ต้องสร้าง ===

1. src/pages/procurement/purchase-requests/index.vue  (PR List)
2. src/pages/procurement/purchase-requests/[id].vue   (PR Form)
3. src/pages/procurement/purchase-orders/index.vue    (PO List)
4. src/pages/procurement/purchase-orders/[id].vue     (PO Form + Status tracking)
5. src/pages/procurement/receiving/index.vue          (Goods Receipt — รับรถ)
6. src/pages/procurement/receiving/[id].vue           (Receiving Form + Inspection)
7. src/pages/fleet/stock/index.vue                    (Stock Dashboard)
8. src/pages/fleet/port/index.vue                     (Port Management — รถนำเข้า)
9. src/pages/fleet/vendors/index.vue                  (Vendor/Dealer List)
10. src/pages/fleet/vendors/[id].vue                  (Vendor Detail + Performance)
11. src/stores/procurement.ts                         (Pinia Store)
12. src/types/procurement.ts                          (TypeScript Types)

=== TypeScript Types (src/types/procurement.ts) ===

// ─── Vendor / Dealer ──────────────────────────────────────────
type VendorType = 'DEALER' | 'MANUFACTURER' | 'MAINTENANCE_SHOP' | 'INSURANCE' | 'OTHER'

interface Vendor {
  id: string
  vendorCode: string            // VD-001
  vendorType: VendorType
  companyName: string
  taxId: string
  address: string
  contactPerson: string
  phone: string
  email: string
  bankAccount: string
  // สำหรับ Dealer
  brand?: string[]              // เช่น ["Toyota", "Honda"]
  dealerCode?: string
  region?: string
  // สำหรับ Maintenance Shop
  serviceTypes?: string[]       // เช่น ["PM", "Body Repair", "Engine"]
  serviceArea?: string[]        // จังหวัดที่บริการ
  // Performance
  avgDeliveryDays?: number
  qualityScore?: number         // 1-5
  // สถานะ
  status: 'ACTIVE' | 'SUSPENDED' | 'BLACKLISTED'
  whtRate: number               // % WHT (3% สำหรับ service)
}

// ─── Purchase Request (PR) ────────────────────────────────────
type PRStatus = 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'CONVERTED_TO_PO' | 'CANCELLED'

interface PurchaseRequest {
  id: string
  prNo: string                  // PR-2024-001
  requestDate: string
  requestedBy: string
  department: string
  requiredDate: string          // วันที่ต้องการ
  // รายการที่ต้องการ
  items: PRItem[]
  totalBudget: number
  // เหตุผล/ที่มา
  purpose: string
  linkedContractId?: string     // ถ้ามา from Customer Quotation
  linkedCustomerId?: string
  status: PRStatus
  approvedBy?: string
  approvedDate?: string
  remarks: string
}

interface PRItem {
  lineNo: number
  assetType: string             // เช่น "Toyota Camry 2.5G"
  brand: string
  model: string
  year: number
  color?: string
  specification: string         // สเปคเพิ่มเติม (option, accessories)
  quantity: number
  estimatedUnitPrice: number
  estimatedTotal: number
}

// ─── Purchase Order (PO) ──────────────────────────────────────
type POStatus = 'DRAFT' | 'CONFIRMED' | 'PARTIAL_RECEIVED' | 'FULLY_RECEIVED' | 'CANCELLED'

interface PurchaseOrder {
  id: string
  poNo: string                  // PO-2024-001
  poDate: string
  prId: string                  // อ้างอิง PR
  vendorId: string
  vendorName: string
  // เงื่อนไข
  deliveryDate: string          // กำหนดส่งมอบ
  deliveryAddress: string
  paymentTerms: string          // เช่น "30 days net"
  warrantyMonths: number
  // รายการ
  items: POItem[]
  subtotal: number
  vatAmount: number
  total: number
  // สถานะ
  status: POStatus
  confirmedByVendor: boolean
  vendorConfirmDate?: string
}

interface POItem {
  lineNo: number
  brand: string
  model: string
  year: number
  color: string
  specification: string
  quantity: number
  orderedQty: number
  receivedQty: number           // update เมื่อรับรถ
  unitPrice: number
  totalPrice: number
  // สำหรับรถนำเข้า
  isImported: boolean
  chassis?: string[]            // Chassis No. ที่ Manufacturer ยืนยัน
}

// ─── Goods Receipt / Receiving ────────────────────────────────
type ReceivingStatus = 'PENDING' | 'INSPECTING' | 'ACCEPTED' | 'REJECTED' | 'PARTIAL'

interface GoodsReceipt {
  id: string
  grNo: string                  // GR-2024-001
  grDate: string
  poId: string
  vendorId: string
  deliveryNoteNo?: string       // เลขที่ใบส่งของ Dealer
  // รายการที่รับ
  items: GRItem[]
  totalReceived: number
  // การตรวจรับ (PDI — Pre-Delivery Inspection)
  inspectedBy: string
  inspectionDate: string
  inspectionResult: 'PASS' | 'FAIL' | 'CONDITIONAL'
  inspectionNotes: string
  inspectionPhotos: string[]    // URLs
  // ผล 3-Way Match
  threeWayMatch: {
    prMatched: boolean
    poMatched: boolean
    invoiceMatched: boolean
    discrepancies?: string
  }
  status: ReceivingStatus
}

interface GRItem {
  poItemLineNo: number
  chassisNo: string             // เลขตัวถัง — unique per vehicle
  engineNo: string              // เลขเครื่อง
  color: string
  registrationDate?: string     // วันที่จดทะเบียน (ถ้ามาพร้อม plate)
  plateNo?: string
  keyNo: string
  bookNo?: string               // เลขที่สมุดคู่มือ
  // หลังรับ → สร้าง Asset record อัตโนมัติ
  createdAssetId?: string       // Asset ID ที่สร้างใหม่
}

// ─── Port Management (รถนำเข้า) ──────────────────────────────
type PortStatus = 'AT_PORT' | 'CUSTOMS_CLEARANCE' | 'INSPECTION' | 'CLEARED' | 'IN_TRANSIT' | 'DELIVERED'

interface PortRecord {
  id: string
  poId: string
  vesselName: string            // ชื่อเรือ
  billOfLadingNo: string        // B/L No.
  arrivalDate: string           // วันเรือเข้า
  portName: string              // ท่าเรือ
  // ค่าใช้จ่ายท่าเรือ
  portCharges: PortCharge[]
  // พิธีการศุลกากร
  customsDeclarationNo?: string
  importDuty?: number           // ภาษีนำเข้า
  exciseTax?: number            // ภาษีสรรพสามิต (รถยนต์)
  vatOnImport?: number          // VAT นำเข้า
  // สถานะ
  status: PortStatus
  clearedDate?: string
  items: PortItem[]
}

interface PortItem {
  chassisNo: string
  model: string
  color: string
  status: PortStatus
  inspectionStatus?: 'PENDING' | 'PASS' | 'FAIL'
  remarks?: string
}

interface PortCharge {
  chargeType: 'PORT_FEE' | 'DEMURRAGE' | 'STORAGE' | 'HANDLING' | 'CUSTOMS' | 'OTHER'
  amount: number
  currency: string
  thbAmount: number             // แปลงเป็นบาท
  invoiceRef?: string
}

=== หน้า Stock Dashboard (src/pages/fleet/stock/index.vue) ===

KPI Cards (6 cards แบ่งตามสถานะ):
- AVAILABLE: พร้อมให้เช่า (สีเขียว)
- RESERVED: จองแล้ว รอส่งมอบ (สีเหลือง)
- IN_TRANSIT: อยู่ระหว่างขนส่ง/เตรียม (สีฟ้า)
- AT_PORT: รออยู่ท่าเรือ (สีส้ม) — สำหรับรถนำเข้า
- PENDING_REGISTRATION: รอจดทะเบียน (สีเทา)
- TOTAL IN STOCK

ตาราง Stock:
คอลัมน์: Chassis No. | Brand/Model | Year | Color | Location | Status | วันที่รับ | PO Ref | Action
Filter: Brand, Model, Status, Location, Color

Quick Actions:
- "Reserve" → เชื่อมกับ Quotation/Contract
- "ออกมาเป็น Active" → จาก Delivery Process

=== หน้า Procurement PO Detail (src/pages/procurement/purchase-orders/[id].vue) ===

Tab 1: PO ข้อมูลทั่วไป
- ข้อมูล Vendor + เงื่อนไข
- ตารางรายการ: Model | Color | Qty | Unit Price | Total | Received | Status
- Progress bar: รับแล้ว X/Y คัน

Tab 2: Delivery Timeline
- VTimeline แสดง: PO Confirmed → Factory Order → In Production → Shipped → At Port → Received
- แต่ละ step มีวันที่และสถานะ

Tab 3: 3-Way Match
- แสดง PR vs PO vs Goods Receipt vs AP Invoice
- ตรวจสอบ: จำนวน ✓/✗ | ราคา ✓/✗ | สเปค ✓/✗
- ถ้าผ่าน 3-Way Match → ปุ่ม "อนุมัติ AP Invoice"

=== หน้า Receiving Form (src/pages/procurement/receiving/[id].vue) ===

Section 1: PO Reference (auto-fill จาก PO)

Section 2: ตารางรับรถ (1 แถว = 1 คัน)
คอลัมน์: # | Chassis No. | Engine No. | Color | Plate No. | Key No. | Inspection | หมายเหตุ
ปุ่ม: Scan QR / BarCode (สำหรับ Chassis No.)
Inspection checklist per car: ✓ ภายนอก ✓ ภายใน ✓ เอกสาร ✓ อุปกรณ์

Section 3: Upload Photos (PDI photos)

Section 4: Auto-Create Assets
เมื่อ Submit → ระบบสร้าง Asset record ใน Asset Management อัตโนมัติ:
  - assetType, brand, model, chassisNo, engineNo → copy จาก GR item
  - status = AVAILABLE
  - location = รับจากที่ไหน
  - link กลับไป PO, GR

ไม่ต้อง call API จริง — ใช้ mock data
ใช้ Vuetify: VDataTable, VTimeline, VStepper, VFileInput, VChip
```

---

## PROMPT 18 — Insurance, พรบ & Vehicle Tax + Accident/Claim Module

> **ครอบคลุม Comply Table items (Fleet Management):**
> พรบ (Compulsory Motor Insurance) / ประกันภัย (Voluntary Insurance) /
> ภาษีรถยนต์ (Road Tax) / Accident/Claim
>
> **OL context:**
> - ใน OL รถ: Lessor เป็นเจ้าของกรรมสิทธิ์ → ชื่อผู้เอาประกันคือ Lessor
> - แต่ลูกค้า (Lessee) เป็นผู้ใช้รถ → ต้องระบุ Lessee เป็นผู้ขับ
> - ค่าประกัน/พรบ/ภาษี บางส่วน pass-through เป็น Maintenance Rental ให้ลูกค้า
> - Accident → ถ้าเสียหายทั้งคัน (Total Loss) → ไป Contract Event: TOTAL_LOSS (PROMPT 11)
> - Accident → ถ้าเสียหายบางส่วน → ไป Work Order (PROMPT 9) + Insurance Claim

```
สร้าง Insurance, พรบ, Vehicle Tax & Accident/Claim Module สำหรับ Operating Lease B2B
ใน Vuexy template (Vue 3 + Vuetify 3 + TypeScript + Pinia)

=== ไฟล์ที่ต้องสร้าง ===

1. src/pages/fleet/insurance/index.vue          (Insurance Portfolio — ทุกกรมธรรม์)
2. src/pages/fleet/insurance/[id].vue           (Insurance Policy Detail)
3. src/pages/fleet/insurance/renewal/index.vue  (Insurance Renewal Dashboard)
4. src/pages/fleet/compulsory/index.vue         (พรบ Management)
5. src/pages/fleet/vehicle-tax/index.vue        (ภาษีรถยนต์ประจำปี)
6. src/pages/fleet/accidents/index.vue          (Accident Report List)
7. src/pages/fleet/accidents/[id].vue           (Accident Detail + Claim Workflow)
8. src/pages/fleet/claims/index.vue             (Insurance Claim List)
9. src/stores/fleet-insurance.ts                (Pinia Store)
10. src/types/fleet-insurance.ts                (TypeScript Types)

=== TypeScript Types (src/types/fleet-insurance.ts) ===

// ─── Insurance Policy ─────────────────────────────────────────
type InsuranceClass = 'CLASS1' | 'CLASS2PLUS' | 'CLASS3PLUS' | 'CLASS2' | 'CLASS3'
// ชั้น 1 = ครอบคลุมสูงสุด / ชั้น 3 = พื้นฐาน

interface InsurancePolicy {
  id: string
  policyNo: string              // เลขที่กรมธรรม์
  assetId: string               // Asset ที่เอาประกัน
  chassisNo: string
  plateNo: string
  // บริษัทประกัน
  insuranceCompany: string
  agentCode?: string
  // ประเภท
  class: InsuranceClass
  // ความคุ้มครอง
  coverageStart: string
  coverageEnd: string           // วันหมดอายุ — trigger renewal 60 วันล่วงหน้า
  // เบี้ยประกัน
  premiumAmount: number         // เบี้ยสุทธิ
  stampDuty: number             // อากรแสตมป์
  vat: number                   // VAT 7%
  totalPremium: number
  // วงเงินคุ้มครอง
  coverageDetails: {
    ownDamage: number           // ค่าซ่อมตัวเอง
    thirdPartyBody: number      // บุคคลภายนอก ร่างกาย
    thirdPartyProperty: number  // บุคคลภายนอก ทรัพย์สิน
    fire: number                // ไฟไหม้
    theft: number               // ขโมย
    ownPersonalAccident?: number // PA ผู้ขับ
    deductible: number          // ส่วนที่ลูกค้าออกเอง
  }
  // ผู้เอาประกัน / ผู้ขับ
  insuredName: string           // Lessor (เจ้าของ)
  driverName?: string           // Lessee (ผู้ใช้รถ)
  // Linked Contract
  contractId: string
  lesseeId: string
  // สถานะ
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED' | 'RENEWED' | 'SUSPENDED'
  renewalStatus: 'ON_TIME' | 'DUE_SOON' | 'OVERDUE' | 'RENEWED'
  // เอกสาร
  policyDocUrl?: string         // PDF กรมธรรม์
}

// ─── พรบ (Compulsory Motor Insurance) ────────────────────────
interface CompulsoryInsurance {
  id: string
  assetId: string
  plateNo: string
  chassisNo: string
  issueDate: string
  expiryDate: string            // ทุก 1 ปี
  insuredAmount: number         // ตามกฎหมาย (300,000 บาท ร่างกาย, 50,000 บาท ทรัพย์สิน)
  premium: number               // เบี้ย พรบ. (~600-1,200 บาท/ปี ขึ้นกับประเภทรถ)
  insuranceCompany: string
  certificateNo: string         // เลขที่ใบรับรอง
  status: 'ACTIVE' | 'EXPIRED' | 'PENDING'
  renewalAlert: boolean         // แจ้งเตือนล่วงหน้า 30 วัน
}

// ─── ภาษีรถยนต์ประจำปี (Road/Vehicle Tax) ────────────────────
interface VehicleTax {
  id: string
  assetId: string
  plateNo: string
  chassisNo: string
  taxYear: number               // ปี พ.ศ.
  dueDate: string               // ครบกำหนด
  taxAmount: number             // คำนวณจาก CC + ประเภทรถ + อายุรถ
  lateFee?: number              // ค่าปรับถ้าเกินกำหนด (1% ต่อเดือน)
  totalPaid: number
  paidDate?: string
  receiptNo?: string
  method: 'DLT_COUNTER' | 'ONLINE' | 'MOBILE_APP' | 'AGENT'
  status: 'PENDING' | 'PAID' | 'OVERDUE'
  renewalAlert: boolean         // แจ้งเตือน 45 วันล่วงหน้า
}

// ─── Accident Report ─────────────────────────────────────────
type AccidentSeverity = 'MINOR' | 'MODERATE' | 'SEVERE' | 'TOTAL_LOSS'
type AccidentFault = 'OWN' | 'THIRD_PARTY' | 'BOTH' | 'UNKNOWN'

interface AccidentReport {
  id: string
  accidentNo: string            // ACC-2024-001
  reportDate: string
  accidentDate: string
  accidentTime: string
  // รถที่เกิดเหตุ
  assetId: string
  chassisNo: string
  plateNo: string
  // ผู้ขับ/ลูกค้า
  driverName: string
  lesseeId: string
  lesseeContact: string
  // สถานที่และรายละเอียด
  location: string
  province: string
  description: string
  severity: AccidentSeverity
  fault: AccidentFault
  // เจ็บป่วย
  injuries: boolean
  injuredPersons?: string
  // ตำรวจ
  policeStationReported: boolean
  policeReportNo?: string
  policeOfficer?: string
  // รถคู่กรณี (ถ้ามี)
  thirdPartyVehicle?: {
    plateNo: string
    owner: string
    insurance: string
    policyNo: string
    contact: string
    damage: string
  }
  // รูปถ่าย
  photos: string[]
  // ผลการประเมิน
  estimatedRepairCost?: number
  actualRepairCost?: number
  isTotalLoss: boolean          // ถ้า true → link ไป Contract Event TOTAL_LOSS
  // Claims ที่เปิด
  claimIds: string[]
  status: 'REPORTED' | 'UNDER_INVESTIGATION' | 'CLAIM_FILED' | 'REPAIRED' | 'SETTLED' | 'TOTAL_LOSS_PROCESS'
}

// ─── Insurance Claim ─────────────────────────────────────────
type ClaimType = 'OWN_DAMAGE' | 'THIRD_PARTY_BODY' | 'THIRD_PARTY_PROPERTY' | 'THEFT' | 'FIRE'
type ClaimStatus = 'DRAFT' | 'SUBMITTED' | 'SURVEY_SCHEDULED' | 'SURVEYED' | 'APPROVED' | 'REPAIR_IN_PROGRESS' | 'SETTLED' | 'REJECTED'

interface InsuranceClaim {
  id: string
  claimNo: string               // CLM-2024-001
  accidentId: string            // อ้างอิง Accident Report
  policyId: string              // กรมธรรม์ที่เคลม
  claimType: ClaimType
  claimDate: string
  // สำรวจภัย (Survey)
  surveyDate?: string
  surveyorName?: string
  surveyorCompany?: string
  // ผลการสำรวจ
  approvedClaimAmount?: number  // วงเงินที่ประกันอนุมัติ
  deductible: number            // ส่วนที่ลูกค้าออกเอง
  // การซ่อม
  repairShop?: string
  repairStartDate?: string
  repairEndDate?: string
  repairInvoiceAmount?: number
  // การชดใช้
  settlementAmount?: number
  settlementDate?: string
  // Work Order ที่เกี่ยวข้อง
  workOrderId?: string          // link ไป PROMPT 9 Work Order
  status: ClaimStatus
  remarks: string
}

// ─── MA (Maintenance Agreement) ──────────────────────────────
// MA Contract กับ Vendor/Garage ที่ให้บริการ Maintenance
interface MaintenanceAgreement {
  id: string
  maNo: string                  // MA-2024-001
  vendorId: string
  vendorName: string
  // ขอบเขตบริการ
  serviceScope: {
    serviceTypes: string[]      // PM, Engine Repair, Body, Electrical, Tires
    brands: string[]            // Toyota, Honda, etc.
    serviceArea: string[]       // จังหวัด
    maxRepairCostPerJob?: number // วงเงินสูงสุดต่อครั้งโดยไม่ต้อง approve
  }
  // ราคา
  laborRate: number             // อัตราค่าแรง (บาท/ชั่วโมง)
  partsPriceType: 'DEALER_LIST' | 'DISCOUNT_PERCENT' | 'FIXED_CATALOG'
  partsDiscount?: number        // % discount จาก Dealer List
  // SLA
  sla: {
    responseTimeHours: number   // ตอบสนองภายใน (ชั่วโมง)
    repairTimeWorkingDays: number // ซ่อมเสร็จภายใน (วันทำการ)
    loaner: boolean             // มีรถทดแทน (Loaner Car)
  }
  // ระยะเวลา
  startDate: string
  endDate: string
  // Performance KPIs
  kpis?: {
    avgRepairDays: number
    onTimeRate: number          // %
    customerSatisfaction: number // 1-5
    totalJobs: number
    totalCost: number
  }
  status: 'ACTIVE' | 'EXPIRED' | 'SUSPENDED'
}

=== หน้า Insurance Portfolio (src/pages/fleet/insurance/index.vue) ===

KPI Cards:
- กรมธรรม์ Active ทั้งหมด
- หมดอายุใน 30 วัน (สีแดง)
- หมดอายุใน 31-60 วัน (สีส้ม)
- เบี้ยรวมทั้งปี (บาท)

ตาราง Insurance:
คอลัมน์: ทะเบียน | Chassis | ประเภท | บริษัทประกัน | เบี้ย | วันหมดอายุ | เหลือ (วัน) | สถานะ | Action (Renew)
Filter: Class, บริษัท, สถานะ, วันหมดอายุ
Badge สี: ACTIVE=green, DUE_SOON=amber (≤60วัน), OVERDUE=red

ปุ่ม "Bulk Renew" → เลือกหลายรายการ → สร้าง Renewal batch

=== หน้า Insurance Renewal Dashboard (src/pages/fleet/insurance/renewal/index.vue) ===

Calendar view + List view:
- แสดงรถที่หมดอายุในแต่ละเดือน
- ปุ่ม "สร้างใบสั่งซื้อประกัน" → ไป PO (PROMPT 17) หรือ AP Invoice (PROMPT 14)
- Summary: จำนวนรถ | เบี้ยประมาณ | วันหมดอายุ

=== หน้า พรบ Management (src/pages/fleet/compulsory/index.vue) ===

- ตาราง: ทะเบียน | Chassis | วันหมดอายุ | เบี้ย | สถานะ | วันที่ต่ออายุ
- แจ้งเตือนอัตโนมัติ 30 วันล่วงหน้า
- ปุ่ม "ต่อ พรบ" → บันทึกการต่ออายุ + อัปเดต expiry date
- Import batch (Excel) สำหรับ update ทีละมาก

=== หน้า ภาษีรถยนต์ (src/pages/fleet/vehicle-tax/index.vue) ===

- ตาราง: ทะเบียน | ปีภาษี | กำหนดชำระ | ยอดภาษี | ค่าปรับ (ถ้ามี) | สถานะ
- Calculator: CC + ประเภทรถ + อายุรถ → คำนวณภาษีอัตโนมัติ
- ปุ่ม "บันทึกชำระ" → กรอก Receipt No. + วันที่ + วิธีชำระ
- แจ้งเตือน 45 วันล่วงหน้า

=== หน้า Accident Detail + Claim (src/pages/fleet/accidents/[id].vue) ===

Tab 1: รายงานอุบัติเหตุ
- ข้อมูลเหตุการณ์ + รูปถ่าย (Photo gallery)
- ข้อมูลรถคู่กรณี (ถ้ามี)
- เลขรายงานตำรวจ
- ประเมินความเสียหาย: MINOR / MODERATE / SEVERE / TOTAL_LOSS

Tab 2: Insurance Claim
- แสดง Claim ที่เปิดอยู่ทั้งหมด
- ปุ่ม "เปิด Claim ใหม่" → เลือก Claim Type → Form
- Claim Status timeline: SUBMITTED → SURVEY → APPROVED → REPAIR → SETTLED

Tab 3: งานซ่อม
- ถ้าไม่ Total Loss → ปุ่ม "สร้าง Work Order" → link ไป PROMPT 9
- แสดง Work Order ที่เกี่ยวข้อง + สถานะ + ค่าใช้จ่าย

Tab 4: Total Loss Process (ถ้า isTotalLoss = true)
- Warning Banner: "อุบัติเหตุนี้เป็น Total Loss"
- ปุ่ม "ดำเนินการ Total Loss" → redirect ไป Contract Event TOTAL_LOSS (PROMPT 11)
- ซ่อนขั้นตอนซ่อม

=== MA Module (ฝังใน src/pages/fleet/vendors/[id].vue Tab "MA") ===

Tab MA ใน Vendor detail แสดง:
- MA ที่มีกับ Vendor นี้ (ประวัติ + ปัจจุบัน)
- SLA dashboard: Response Time / Repair Time / On-time Rate
- Cost performance: ต้นทุนเฉลี่ยต่องาน vs ตลาด
- ปุ่ม "สร้าง MA ใหม่"

ไม่ต้อง call API จริง — ใช้ mock data
ใช้ Vuetify: VDataTable, VTabs, VTimeline, VCalendar, VDialog, VChip
```

---

## PROMPT 19 — Disposal & Remarketing Module

> **ครอบคลุม Comply Table items (Fleet Management):**
> Disposal — การจำหน่ายรถออกจาก Fleet เมื่อครบสัญญา/เกินอายุ/Total Loss
>
> **OL context:**
> - Lessor เป็นเจ้าของ → ต้องจัดการ Disposal เอง (ต่างจาก HP ที่ลูกค้าเป็นเจ้าของ)
> - ช่องทาง Disposal: ขายให้ลูกค้าตามราคา RV / Auction / Dealer buy-back / Scrap
> - กระบวนการ: ประเมินราคา → เลือกช่องทาง → ขาย → โอนกรรมสิทธิ์ → จดทะเบียนออก → บัญชี FA Disposal
> - Gain/Loss = ราคาขายจริง - NBV ณ วันขาย (link ไป PROMPT 15 FA Disposal)

```
สร้าง Disposal & Remarketing Module สำหรับ Operating Lease B2B
ใน Vuexy template (Vue 3 + Vuetify 3 + TypeScript + Pinia)

=== ไฟล์ที่ต้องสร้าง ===

1. src/pages/fleet/disposal/index.vue          (Disposal Pipeline — รถที่รอ Dispose)
2. src/pages/fleet/disposal/[id].vue           (Disposal Case Detail + Workflow)
3. src/pages/fleet/disposal/valuation/[id].vue (Asset Valuation — ประเมินราคา)
4. src/pages/fleet/remarketing/index.vue       (Remarketing Dashboard)
5. src/pages/fleet/remarketing/auction/index.vue (Auction Management)
6. src/stores/disposal.ts                      (Pinia Store)
7. src/types/disposal.ts                       (TypeScript Types)

=== TypeScript Types (src/types/disposal.ts) ===

type DisposalChannel =
  | 'SELL_TO_LESSEE'       // ขายให้ลูกค้าตามราคา RV (End-of-Lease Purchase)
  | 'DEALER_BUYBACK'       // ขายคืน Dealer
  | 'AUCTION'              // ประมูล (auction house)
  | 'PRIVATE_SALE'         // ขายตรง
  | 'SCRAP'                // ส่งเป็นเหล็กเก่า (รถเสียหายหนัก)
  | 'DONATE'               // บริจาค

type DisposalStatus =
  | 'PENDING_RETURN'       // รอรับรถคืนจากลูกค้า
  | 'RETURNED'             // รับรถคืนแล้ว
  | 'INSPECTION'           // กำลังตรวจสภาพ
  | 'VALUATION'            // กำลังประเมินราคา
  | 'LISTED'               // ลงประกาศขาย/ส่งประมูล
  | 'OFFER_RECEIVED'       // มีข้อเสนอราคา
  | 'SOLD'                 // ขายแล้ว
  | 'TRANSFER_COMPLETE'    // โอนกรรมสิทธิ์เสร็จ
  | 'DEREGISTERED'         // จดทะเบียนออกแล้ว
  | 'CLOSED'               // ปิดเคส — บันทึกบัญชีแล้ว

interface DisposalCase {
  id: string
  disposalNo: string           // DSP-2024-001
  assetId: string
  chassisNo: string
  plateNo: string
  brand: string
  model: string
  year: number
  color: string
  // ที่มา
  originType: 'END_OF_LEASE' | 'EARLY_TERMINATION' | 'TOTAL_LOSS' | 'VOLUNTARY'
  contractId: string
  contractEndDate: string
  returnDate?: string          // วันที่รับรถคืนจริง
  // ข้อมูลการเงิน
  originalCost: number         // ราคาทุนเดิม
  nbvAtDisposal: number        // NBV ณ วันที่ Dispose
  contractRV: number           // RV ที่กำหนดไว้ในสัญญา
  // การประเมินราคา
  valuations: AssetValuation[]
  approvedValuation?: number   // ราคาที่อนุมัติ
  // ช่องทางการขาย
  disposalChannel?: DisposalChannel
  listedPrice?: number         // ราคาตั้ง
  finalSalePrice?: number      // ราคาที่ขายได้จริง
  // ผลทางบัญชี
  gainLoss?: number            // = finalSalePrice - nbvAtDisposal (บวก=กำไร, ลบ=ขาดทุน)
  faDisposalId?: string        // link ไป FA Disposal (PROMPT 15)
  // เอกสาร
  inspectionReport?: string
  transferDeedUrl?: string     // โฉนด/สัญญาโอน
  deregistrationDoc?: string   // ใบจดทะเบียนออก
  // สถานะ
  status: DisposalStatus
  timeline: DisposalEvent[]
}

interface AssetValuation {
  id: string
  valuationDate: string
  valuedBy: string             // ผู้ประเมิน (Dealer / Appraiser / Internal)
  valuationType: 'DEALER_QUOTE' | 'APPRAISAL' | 'INTERNAL' | 'BOOK_VALUE'
  valuationAmount: number
  condition: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR'
  conditionNotes: string
  mileage: number
  photos: string[]
  isApproved: boolean          // ราคาที่อนุมัติใช้จริง
}

interface DisposalEvent {
  date: string
  event: string
  performedBy: string
  notes?: string
}

// ─── Auction ─────────────────────────────────────────────────
type AuctionStatus = 'UPCOMING' | 'REGISTRATION_OPEN' | 'LIVE' | 'COMPLETED' | 'CANCELLED'

interface AuctionLot {
  id: string
  auctionId: string
  lotNo: string                // LOT-001
  disposalCaseId: string
  assetId: string
  // Asset details
  displayTitle: string         // เช่น "2022 Toyota Camry 2.5G สีขาว"
  reservePrice: number         // ราคาเริ่มต้น
  // Bidding
  currentBid?: number
  highestBidder?: string
  bidCount: number
  bidHistory: BidRecord[]
  // ผล
  finalPrice?: number
  winnerId?: string
  winnerName?: string
  status: 'LISTED' | 'BIDDING' | 'SOLD' | 'UNSOLD' | 'WITHDRAWN'
}

interface AuctionSession {
  id: string
  auctionNo: string            // AUC-2024-001
  auctionDate: string
  auctionType: 'PHYSICAL' | 'ONLINE' | 'HYBRID'
  venue?: string
  onlinePlatform?: string
  lots: AuctionLot[]
  totalLots: number
  soldLots: number
  totalRevenue?: number
  status: AuctionStatus
}

interface BidRecord {
  bidderName: string
  bidAmount: number
  bidTime: string
}

// ─── Return Inspection ────────────────────────────────────────
interface ReturnInspection {
  id: string
  disposalCaseId: string
  inspectionDate: string
  inspectedBy: string
  mileage: number
  // ตรวจสภาพ (แบบ Fair Wear & Tear)
  exterior: InspectionSection
  interior: InspectionSection
  mechanical: InspectionSection
  tires: {
    frontLeft: TireCondition
    frontRight: TireCondition
    rearLeft: TireCondition
    rearRight: TireCondition
  }
  // ค่าเสียหายเกิน Fair Wear & Tear
  excessDamages: ExcessDamage[]
  totalDamageCharges: number    // เรียกเก็บจากลูกค้า
  photos: string[]
  overallCondition: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR'
  inspectionReport: string
}

interface InspectionSection {
  condition: 'GOOD' | 'MINOR_DAMAGE' | 'MAJOR_DAMAGE'
  items: { item: string; status: 'OK' | 'DAMAGE' | 'MISSING'; notes?: string }[]
}

interface TireCondition {
  treadDepth: number            // mm (Fair Wear: ≥3mm)
  condition: 'GOOD' | 'WORN' | 'DAMAGED'
  chargeAmount: number          // ถ้าต้องเปลี่ยน
}

interface ExcessDamage {
  location: string              // เช่น "ประตูซ้ายหน้า"
  damageType: string            // Scratch, Dent, Crack, Missing
  severity: 'MINOR' | 'MAJOR'
  repairCost: number            // ค่าซ่อมโดยประมาณ
  chargeable: boolean           // เกิน Fair Wear & Tear → เรียกเก็บลูกค้า
}

=== หน้า Disposal Pipeline (src/pages/fleet/disposal/index.vue) ===

Kanban Board หรือ List แสดง Disposal ตาม Stage:
PENDING_RETURN → INSPECTION → VALUATION → LISTED → SOLD → CLOSED

KPI Cards:
- รอรับรถคืน (สีส้ม)
- อยู่ระหว่างประเมิน (สีเหลือง)
- ลงประกาศแล้ว (สีฟ้า)
- ขายเสร็จแล้ว (เดือนนี้) (สีเขียว)
- Avg Gain/Loss vs RV (บาท / %)

ตาราง:
คอลัมน์: Disposal No. | ทะเบียน | Brand/Model | ปี | ที่มา | NBV | RV สัญญา | ราคาประเมิน | ราคาขาย | Gain/Loss | Stage
Badge Gain/Loss: บวก=เขียว, ลบ=แดง

=== หน้า Disposal Case Detail (src/pages/fleet/disposal/[id].vue) ===

Tab 1: ข้อมูลรถ + ประวัติสัญญา
- Link ไป Contract / Asset Management

Tab 2: Return Inspection
- Checklist แบ่งเป็น section (Exterior, Interior, Mechanical, Tires)
- Photo upload ต่อจุด
- Auto-calculate damage charges

Tab 3: Valuations
- รายการประเมินราคาทั้งหมด (ของ Dealer ต่างๆ)
- ปุ่ม "เพิ่มใบประเมิน"
- เลือก "ใช้ราคาจาก..." → set as approved valuation
- Comparison bar chart: Dealer A / Dealer B / Dealer C / Internal

Tab 4: Sale Process
- เลือกช่องทาง (SELL_TO_LESSEE / DEALER_BUYBACK / AUCTION / PRIVATE_SALE / SCRAP)
- กรอกราคาขาย
- วันที่ส่งมอบ, ผู้ซื้อ
- ปุ่ม "สร้าง FA Disposal" → link ไป PROMPT 15

Tab 5: เอกสาร
- Upload: ใบตรวจสภาพ, สัญญาซื้อขาย, โฉนดโอน, ใบจดทะเบียนออก

Tab 6: Timeline
- VTimeline แสดงทุก event ตั้งแต่รับรถคืนถึงปิดเคส

=== หน้า Auction Management (src/pages/fleet/remarketing/auction/index.vue) ===

Section 1: รายการประมูลที่กำลังจะมา / Active
- แสดง Auction Session + จำนวน Lot
- Badge: UPCOMING / LIVE / COMPLETED

Section 2: Lot Management
- ตาราง Lot: Lot No. | รถ | ราคาเริ่มต้น | Bid ปัจจุบัน | จำนวน Bid | สถานะ
- ปุ่ม "ดู Bid History"
- ปุ่ม "Sold" → กรอกราคา + ผู้ชนะ

Section 3: Auction Results Summary
- รายงาน: จำนวน Lot ทั้งหมด | ขายได้ | ไม่ขาย | Total Revenue | Avg Gain/Loss vs NBV

=== Remarketing KPIs Dashboard ===

กราฟ 1: Disposal by Channel (Donut chart)
กราฟ 2: Avg Sale Price vs Contract RV vs NBV (Bar chart)
กราฟ 3: Days to Sell (from return to sold) — Histogram
กราฟ 4: Monthly Disposal Revenue (Line chart)

ไม่ต้อง call API จริง — ใช้ mock data
ใช้ Vuetify: VDataTable, VTabs, VTimeline, VDialog + ApexCharts
```

---
## PROMPT 20 — CRM: Customer 360° & Social Engagement

### วัตถุประสงค์
ครอบคลุม comply table หัวข้อ **"CRM & Engagement"** ในส่วนของ:
- **Social engagement** — LINE OA, Email/SMS, Customer Portal, Push Notification, NPS/Survey
- **Customer Data** — Customer 360° Profile, Interaction History, Segmentation, PDPA Consent

### Gap Analysis (เทียบกับ PROMPT ที่มี)

| หัวข้อ Comply | ครอบคลุมแล้ว | ยังขาด |
|--------------|-------------|--------|
| Customer B2B (form) | ✅ PROMPT 2 | — |
| KYC / PDPA Consent | ✅ PROMPT 12 | — |
| Customer 360° View | ❌ | รวมทุก interaction จาก Contract, Billing, Claim, Work Order ไว้ในหน้าเดียว |
| Contact Persons (หลายคนต่อบริษัท) | ❌ | สมุดผู้ติดต่อ + บทบาท (CFO, Fleet Manager, Procurement) |
| Interaction / Activity History | ❌ | Log การโทร, ประชุม, ส่งเอกสาร |
| Customer Segmentation | ❌ | Tier / Fleet Size / Renewal Likelihood |
| Social Engagement (LINE OA, Email, SMS) | ❌ | Template + Blast + Tracking open/click |
| Customer Portal (self-service) | ❌ | ลูกค้าดู Invoice, Contract, ชำระเงิน |
| Push Notification / Alert | ❌ | ต่ออายุสัญญา, ชำระค่าเช่า, ประกันหมดอายุ |
| NPS / CSAT Survey | ❌ | วัดความพึงพอใจ |
| PDPA Consent Management | ⚠️ PROMPT 12 บางส่วน | Consent log + withdrawal tracking |

---

### TypeScript Interfaces

```typescript
// ─── Customer 360° Profile ───────────────────────────────────────────────────
interface CustomerProfile {
  customerId: string
  companyName: string
  taxId: string
  tier: 'PLATINUM' | 'GOLD' | 'SILVER' | 'BRONZE'
  fleetSize: number               // จำนวนรถในปัจจุบัน
  totalContractValue: number      // มูลค่าสัญญาสะสม
  totalContracts: number
  activeContracts: number
  overdueAmount: number           // ยอดค้างชำระ (จาก PROMPT 14)
  lastActivityDate: Date
  assignedSalesperson: string     // ← link กับ PROMPT 21
  segment: CustomerSegment
  tags: string[]                  // custom labels
  pdpaConsent: PdpaConsentRecord
  contactPersons: ContactPerson[]
}

interface CustomerSegment {
  tier: string
  fleetCategory: 'SMALL' | 'MEDIUM' | 'LARGE' | 'ENTERPRISE'  // <10, 10-50, 50-200, >200
  renewalLikelihood: 'HIGH' | 'MEDIUM' | 'LOW'  // based on engagement score
  engagementScore: number         // 0-100
  churnRisk: 'LOW' | 'MEDIUM' | 'HIGH'
}

// ─── Contact Persons ─────────────────────────────────────────────────────────
interface ContactPerson {
  contactId: string
  customerId: string
  name: string
  position: string                // CFO, Fleet Manager, Procurement Officer, etc.
  department: string
  phone: string
  email: string
  lineId?: string
  isPrimary: boolean
  roles: ('BILLING' | 'CONTRACT' | 'FLEET' | 'EXECUTIVE')[]
  pdpaConsentDate?: Date
  preferredChannel: 'LINE' | 'EMAIL' | 'PHONE' | 'SMS'
}

// ─── PDPA Consent ────────────────────────────────────────────────────────────
interface PdpaConsentRecord {
  customerId: string
  consentVersion: string          // เช่น "v2.1"
  consentDate: Date
  consentChannels: ('MARKETING' | 'NOTIFICATION' | 'ANALYTICS' | 'THIRD_PARTY')[]
  withdrawnChannels: string[]     // channels ที่ถอนความยินยอม
  lastUpdated: Date
  consentDocument?: string        // file URL
}

// ─── Interaction / Activity Log ──────────────────────────────────────────────
type InteractionType =
  | 'CALL_INBOUND'
  | 'CALL_OUTBOUND'
  | 'MEETING'
  | 'EMAIL_SENT'
  | 'EMAIL_RECEIVED'
  | 'LINE_MESSAGE'
  | 'SITE_VISIT'
  | 'DOCUMENT_SENT'
  | 'COMPLAINT'
  | 'FEEDBACK'
  | 'CONTRACT_DISCUSSION'

interface CustomerInteraction {
  interactionId: string
  customerId: string
  contactPersonId?: string
  type: InteractionType
  subject: string
  notes: string
  outcome?: string                // ผลลัพธ์ (Follow-up, Resolved, Escalated)
  nextAction?: string
  nextActionDate?: Date
  createdBy: string               // salesperson / staff
  createdAt: Date
  linkedToContractId?: string
  linkedToQuotationId?: string
  attachments?: string[]
}

// ─── Social Engagement ───────────────────────────────────────────────────────
type EngagementChannel = 'LINE_OA' | 'EMAIL' | 'SMS' | 'PUSH_NOTIFICATION'
type EngagementPurpose =
  | 'CONTRACT_RENEWAL_REMINDER'   // แจ้งเตือนสัญญาใกล้หมด
  | 'PAYMENT_REMINDER'            // แจ้งค่าเช่าถึงกำหนด
  | 'INSURANCE_RENEWAL'           // ประกัน/พรบ ใกล้หมดอายุ
  | 'SERVICE_DUE'                 // ถึงกำหนด PM
  | 'OVERDUE_NOTICE'              // ค้างชำระ
  | 'MARKETING_CAMPAIGN'          // แคมเปญ / โปรโมชัน
  | 'NPS_SURVEY'                  // ส่ง survey
  | 'DOCUMENT_DELIVERY'           // ส่งใบแจ้งหนี้, statement
  | 'WELCOME'                     // ต้อนรับลูกค้าใหม่

interface EngagementMessage {
  messageId: string
  channel: EngagementChannel
  purpose: EngagementPurpose
  templateId: string
  templateName: string
  recipients: string[]            // contactPersonId[]
  totalSent: number
  totalDelivered: number
  totalOpened?: number            // Email/LINE only
  totalClicked?: number
  sentAt: Date
  scheduledAt?: Date
  status: 'DRAFT' | 'SCHEDULED' | 'SENT' | 'FAILED'
  linkedToContractId?: string
}

interface MessageTemplate {
  templateId: string
  channel: EngagementChannel
  purpose: EngagementPurpose
  name: string
  subject?: string                // Email only
  body: string                    // ใช้ variable {{customerName}}, {{contractNo}}, {{dueDate}}, {{amount}}
  language: 'TH' | 'EN'
  isActive: boolean
}

// ─── Customer Portal (self-service) ─────────────────────────────────────────
interface CustomerPortalAccess {
  portalUserId: string
  customerId: string
  contactPersonId: string
  email: string
  lastLogin?: Date
  isActive: boolean
  permissions: ('VIEW_CONTRACT' | 'VIEW_INVOICE' | 'MAKE_PAYMENT' | 'DOWNLOAD_DOCS' | 'SUBMIT_CLAIM')[]
}

// ─── NPS / CSAT Survey ───────────────────────────────────────────────────────
interface SurveyResponse {
  surveyId: string
  customerId: string
  contactPersonId?: string
  surveyType: 'NPS' | 'CSAT' | 'CES'
  score: number                   // NPS: 0-10, CSAT: 1-5
  comment?: string
  triggeredBy: EngagementPurpose  // เหตุการณ์ที่ trigger survey
  respondedAt: Date
  channel: EngagementChannel
}
```

---

### หน้าจอที่ต้องสร้าง

```
=== หน้า Customer 360° (src/pages/crm/customers/[id]/360.vue) ===

Header Card:
- ชื่อบริษัท + ประเภทธุรกิจ + Tier Badge (PLATINUM/GOLD/SILVER/BRONZE)
- Fleet Size | Active Contracts | Total Contract Value
- Engagement Score (gauge หรือ donut) | Churn Risk Badge
- Assigned Salesperson | วันสร้างลูกค้า

Quick Stats Row (4 Cards):
- สัญญาที่ active
- ยอดค้างชำระ (จาก Billing/AR)
- ประกันใกล้หมด (ใน 30 วัน)
- วันที่ติดต่อล่าสุด

Tab 1: ข้อมูลทั่วไป
- Customer form (link จาก PROMPT 2)
- ที่อยู่, เลขภาษี, ประเภทธุรกิจ

Tab 2: Contact Persons
- VDataTable รายชื่อผู้ติดต่อ
  คอลัมน์: ชื่อ | ตำแหน่ง | แผนก | โทร | Email | LINE | บทบาท | Primary
- ปุ่ม "เพิ่มผู้ติดต่อ" → Dialog form
- Badge บทบาท: BILLING / CONTRACT / FLEET / EXECUTIVE
- Preferred Channel icon

Tab 3: Interaction History
- Timeline/Feed ของทุก interaction
  แต่ละ item: Icon channel + ประเภท + Subject + ผู้บันทึก + วันที่
- Filter: All | Call | Meeting | Email | LINE | Complaint
- ปุ่ม "บันทึก Activity" → Dialog:
  - ประเภท / Subject / Notes / Outcome / Next Action + Date
  - Link to Contract / Quotation (optional)
- ปุ่ม "Export Activity Log"

Tab 4: Contracts & Financial Summary
- รายการสัญญาทั้งหมด (ACTIVE / EXPIRED / TERMINATED) link ไป PROMPT 6
- Mini chart: Monthly Payment History (12 เดือน)
- Overdue aging summary

Tab 5: PDPA Consent
- Consent Version + วันที่
- Channels ที่ให้ consent / ถอน
- ปุ่ม "อัพเดต Consent" → บันทึก log ใหม่ (ไม่ overwrite)
- Consent history (audit trail)

Tab 6: Engagement History
- ตาราง Messages ที่เคยส่งหา customer นี้
  คอลัมน์: วันที่ | Channel | วัตถุประสงค์ | Template | Opened | Clicked
- NPS/CSAT responses

=== หน้า Interaction Log List (src/pages/crm/interactions/index.vue) ===

Filter Bar: Customer | ช่วงวันที่ | ประเภท | Salesperson | Outcome

VDataTable:
คอลัมน์: วันที่ | ลูกค้า | ประเภท | Subject | Outcome | Next Action | วันที่ Next Action | ผู้บันทึก

KPI Row (4 Cards):
- Interactions วันนี้
- รอ Follow-up (Next Action ≤ 3 วัน)
- Overdue Follow-up
- Meetings สัปดาห์นี้

=== หน้า Social Engagement (src/pages/crm/engagement/index.vue) ===

Tab 1: Campaign Management
VDataTable ของ Campaigns:
คอลัมน์: Campaign ID | วัตถุประสงค์ | Channel | ส่งเมื่อ | จำนวนส่ง | Delivered | Opened | Clicked | Status

- ปุ่ม "สร้าง Campaign" → Wizard 3 ขั้นตอน:
  Step 1: เลือก Channel + วัตถุประสงค์ + Template
  Step 2: เลือกกลุ่มผู้รับ (by Tier / by Contract Status / by Fleet Size / รายชื่อ manual)
  Step 3: กำหนดวันเวลาส่ง (ส่งทันที / Scheduled)

- ปุ่ "Auto-Trigger Rules" → ตั้งกฎอัตโนมัติ:
  เช่น "สัญญาเหลือ 90 วัน → ส่ง LINE OA Renewal Reminder"
  เช่น "ประกันหมดใน 30 วัน → ส่ง SMS"
  เช่น "ค้างชำระ 7 วัน → ส่ง Email Overdue"

Tab 2: Message Templates
- Gallery/List ของ Templates แยกตาม Channel
- ปุ่ม "สร้าง Template"
- Preview Template (แสดง rendered message + variables)
- Language toggle: TH / EN

Tab 3: Analytics
- Open Rate, Click Rate trend (Line chart, 30 วัน)
- Top Templates by Engagement
- Delivery Success Rate by Channel (Donut chart)
- Unsubscribe / Opt-out tracking

=== หน้า Automated Alerts (src/pages/crm/alerts/index.vue) ===

VDataTable ของ Alert Rules:
คอลัมน์: Rule Name | Trigger Condition | Channel | Template | สถานะ (Active/Pause) | ส่งใน 7 วัน | Toggle

Trigger Conditions รองรับ:
- ContractDaysToExpiry ≤ N วัน
- InvoiceDueDays ≥ N วัน (overdue)
- InsuranceExpiryDays ≤ N วัน
- ServiceDueMileage ≤ N กม.
- PMDueDays ≤ N วัน

=== หน้า Customer Portal Management (src/pages/crm/portal/index.vue) ===

VDataTable ลูกค้าที่มี Portal Access:
คอลัมน์: บริษัท | Contact Person | Email | สถานะ | Last Login | Permissions

- ปุ่ม "เปิด Portal Access" → Dialog เลือก Contact Person + Permissions
- ปุ่ม "Reset Password (ส่ง Link)"
- ปุ่ม "Revoke Access"

=== หน้า NPS / CSAT Dashboard (src/pages/crm/survey/index.vue) ===

KPI Cards:
- NPS Score (เดือนนี้) — แสดงเป็น gauge
- CSAT Average — 1-5 stars
- Responses รับมา / ส่งออก (Response Rate)
- Detractors (NPS 0-6) / Passives (7-8) / Promoters (9-10)

Chart: NPS Trend (12 เดือน)
Chart: CSAT Distribution (bar)

Table: Recent Responses (Customer | Score | Comment | วันที่)

=== Customer Segmentation Board (src/pages/crm/segments/index.vue) ===

Matrix สี่ช่อง (Tier × Churn Risk) หรือ Kanban columns:
- Platinum / Gold / Silver / Bronze
  แต่ละ Tier: จำนวนลูกค้า, Average Fleet Size, Avg Contract Value

Filter: Tier | Churn Risk | Assigned Salesperson | Fleet Size Range

ปุ่ม "สร้าง Campaign จากกลุ่มนี้" → redirect ไป Engagement Campaign Wizard

ไม่ต้อง call API จริง — ใช้ mock data
ใช้ Vuetify: VDataTable, VTabs, VTimeline, VDialog, VChip, VBadge + ApexCharts
```

---

## PROMPT 21 — Sales Activity & Performance (Sales Force)

### วัตถุประสงค์
ครอบคลุม comply table หัวข้อ **"CRM & Engagement"** ในส่วนของ:
- **Sale Activity** — Lead/Opportunity Pipeline, Activity Log, Follow-up, Quotation Tracking
- **Sale Performance** — Target vs Actual, Commission, Win/Loss Analysis, Salesperson Leaderboard

### Gap Analysis (เทียบกับ PROMPT ที่มี)

| หัวข้อ Comply | ครอบคลุมแล้ว | ยังขาด |
|--------------|-------------|--------|
| Quotation (PD14) | ✅ PROMPT 3 | — |
| Lead / Prospect | ❌ | Pipeline ก่อนถึง Quotation |
| Sales Pipeline | ❌ | Stage: Prospect → Qualified → Quotation → Negotiation → Won/Lost |
| Activity Log | ⚠️ PROMPT 20 บางส่วน | Activity ที่ผูกกับ Opportunity โดยตรง |
| Sales Target (รายเดือน/รายไตรมาส) | ❌ | Set target per salesperson |
| Actual vs Target Tracking | ❌ | Dashboard เปรียบเทียบ |
| Win/Loss Analysis | ❌ | สาเหตุที่แพ้ / ชนะ |
| Commission Calculation | ❌ | Commission rate ตาม product/tier |
| Salesperson Performance | ❌ | Leaderboard, Hit Rate |
| Sales Forecast | ❌ | Pipeline value × Win Rate |

---

### TypeScript Interfaces

```typescript
// ─── Lead / Opportunity ──────────────────────────────────────────────────────
type OpportunityStage =
  | 'PROSPECT'       // รายชื่อที่สนใจ (ยังไม่ qualified)
  | 'QUALIFIED'      // ผ่าน qualify แล้ว (มีความต้องการจริง, งบประมาณมี)
  | 'QUOTATION'      // ส่งใบเสนอราคาแล้ว (link → PROMPT 3)
  | 'NEGOTIATION'    // กำลังต่อรอง
  | 'WON'            // ชนะ → สร้างสัญญา
  | 'LOST'           // แพ้
  | 'ON_HOLD'        // รอ

interface Opportunity {
  opportunityId: string
  opportunityNo: string           // OPP-2026-0001
  customerId?: string             // ลูกค้าเก่า หรือ Prospect ใหม่
  prospectName?: string           // ถ้ายังไม่ได้สร้างเป็น Customer
  stage: OpportunityStage
  source: 'INBOUND' | 'REFERRAL' | 'COLD_CALL' | 'EVENT' | 'PORTAL' | 'RENEWAL'
  vehicleType: string             // ประเภทรถ (Sedan, Pickup, Van, etc.)
  estimatedFleetSize: number      // จำนวนรถที่คาดว่าจะ lease
  estimatedValue: number          // มูลค่าสัญญาที่คาดว่าได้
  estimatedCloseDate: Date        // วันที่คาดว่าจะ close
  winProbability: number          // 0-100%
  assignedSalesperson: string     // userId
  quotationId?: string            // link → PROMPT 3
  contractId?: string             // link → PROMPT 6 (ถ้า WON)
  lostReason?: LostReason
  lostNote?: string
  competitorLost?: string         // แพ้คู่แข่งรายใด
  createdAt: Date
  updatedAt: Date
  closedAt?: Date
}

type LostReason =
  | 'PRICE_TOO_HIGH'
  | 'LOST_TO_COMPETITOR'
  | 'BUDGET_CUT'
  | 'TIMING_NOT_RIGHT'
  | 'PRODUCT_NOT_FIT'
  | 'NO_RESPONSE'
  | 'OTHER'

// ─── Sales Activity ───────────────────────────────────────────────────────────
type SalesActivityType =
  | 'CALL'
  | 'EMAIL'
  | 'MEETING'
  | 'DEMO'
  | 'SITE_VISIT'
  | 'PROPOSAL_SENT'
  | 'FOLLOW_UP'
  | 'NEGOTIATION_SESSION'
  | 'CONTRACT_SIGNING'

interface SalesActivity {
  activityId: string
  opportunityId?: string          // ผูกกับ Opportunity
  customerId?: string             // หรือผูกกับลูกค้าโดยตรง
  type: SalesActivityType
  subject: string
  notes: string
  outcome: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE'
  nextAction?: string
  nextActionDate?: Date
  durationMinutes?: number        // เวลาที่ใช้ (calls/meetings)
  salesperson: string
  createdAt: Date
}

// ─── Sales Target ─────────────────────────────────────────────────────────────
interface SalesTarget {
  targetId: string
  salespersonId: string
  period: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL'
  year: number
  month?: number                  // 1-12 (ถ้า MONTHLY)
  quarter?: number                // 1-4 (ถ้า QUARTERLY)
  targetRevenue: number           // เป้า revenue (บาท)
  targetContracts: number         // เป้าจำนวนสัญญา
  targetFleetSize: number         // เป้าจำนวนรถ
  targetNewCustomers: number      // ลูกค้าใหม่
  bonusThreshold: number          // ถ้าเกิน % นี้ จะได้ bonus
}

// ─── Sales Performance / Actuals ─────────────────────────────────────────────
interface SalesActual {
  salespersonId: string
  period: string                  // "2026-03", "2026-Q1", "2026"
  actualRevenue: number
  actualContracts: number
  actualFleetSize: number
  newCustomers: number
  wonOpportunities: number
  lostOpportunities: number
  hitRate: number                 // won / (won + lost) %
  avgDealSize: number
  avgSalesCycle: number           // วันเฉลี่ยจาก Prospect → WON
  pipelineValue: number           // Σ (estimatedValue × winProbability) ของ open opp
}

// ─── Commission ───────────────────────────────────────────────────────────────
interface CommissionRule {
  ruleId: string
  name: string
  productType: 'FINANCIAL_LEASE' | 'MAINTENANCE_LEASE' | 'FULL_SERVICE'
  tierCondition?: CustomerTier
  revenueFrom: number
  revenueTo?: number
  commissionRate: number          // % of contract value
  bonusRate?: number              // bonus % ถ้าเกิน target
  effectiveFrom: Date
  effectiveTo?: Date
}

interface CommissionRecord {
  commissionId: string
  salespersonId: string
  contractId: string
  contractValue: number
  commissionRate: number
  commissionAmount: number
  bonusAmount: number
  status: 'PENDING' | 'APPROVED' | 'PAID'
  paidDate?: Date
  approvedBy?: string
}

type CustomerTier = 'PLATINUM' | 'GOLD' | 'SILVER' | 'BRONZE'

// ─── Sales Forecast ───────────────────────────────────────────────────────────
interface SalesForecast {
  salespersonId?: string          // ถ้า null = ทั้งทีม
  forecastMonth: string           // "2026-04"
  openPipelineValue: number       // Σ (value × probability) ของ open opp
  committedValue: number          // Opp ที่ probability ≥ 70%
  bestCaseValue: number           // Opp ทั้งหมดที่ยัง open
  targetRevenue: number           // จาก SalesTarget
  lastMonthActual: number
}
```

---

### หน้าจอที่ต้องสร้าง

```
=== หน้า Sales Pipeline (src/pages/sales/pipeline/index.vue) ===

Kanban Board 6 columns: PROSPECT | QUALIFIED | QUOTATION | NEGOTIATION | WON | LOST

แต่ละ Card แสดง:
- บริษัทลูกค้า
- จำนวนรถ (estimatedFleetSize)
- มูลค่าโดยประมาณ (format ล้านบาท)
- Win Probability Badge (สีเขียว ≥70%, สีเหลือง 40-69%, สีแดง <40%)
- Assigned Salesperson avatar
- วัน Close ที่คาดไว้ + badge เตือนถ้า Overdue

Header Summary Bar:
- Total Open Pipeline Value | Weighted Pipeline (value × probability) | ClosingThisMonth | Won MTD

ปุ่ม "เพิ่ม Opportunity" → Dialog form:
- Prospect/Customer Name
- ประเภทรถ, จำนวนรถ, มูลค่าประมาณ
- Source, Estimated Close Date, Win Probability %
- Assign ให้ Salesperson
ปุ่ "สร้างใบเสนอราคา" (ใน card ที่ Stage = QUALIFIED) → link ไป PROMPT 3

Drag & Drop เปลี่ยน Stage

=== หน้า Opportunity Detail (src/pages/sales/pipeline/[id].vue) ===

Header: Opportunity No. | บริษัท | Stage badge | มูลค่า | Win% | Due Date

Tab 1: ข้อมูล Opportunity
- ฟอร์ม Edit ทุก field
- Stage Progress Bar (ขั้นตอนปัจจุบัน)
- ถ้า Stage = WON → button "สร้างสัญญา" (link → PROMPT 6)
- ถ้า Stage = LOST → Required fill LostReason + Note + Competitor

Tab 2: Activities
- Timeline ของ SalesActivity ทั้งหมดใน Opportunity นี้
- ปุ่ "Log Activity" → Dialog:
  - ประเภท (CALL / MEETING / EMAIL / etc.)
  - Subject, Notes, Outcome
  - Next Action + วันที่
- ปุ่ "Schedule Meeting" (เปิด dialog เพิ่ม calendar event)

Tab 3: Documents
- ไฟล์ที่แนบ (Quotation PDF, Proposal, NDA, etc.)
- Upload / View / Delete

Tab 4: History
- Audit trail: ใครเปลี่ยน Stage, มูลค่า, Probability เมื่อไหร่

=== หน้า Sales Activity Log (src/pages/sales/activities/index.vue) ===

Filter: Salesperson | Customer | วันที่ | ประเภท | Outcome | Next Action ≤ N วัน

KPI Row:
- Activities วันนี้ | Follow-up รอดำเนินการ | Overdue Follow-up | Meetings สัปดาห์นี้

VDataTable:
คอลัมน์: วันที่ | Salesperson | ลูกค้า | Opportunity | ประเภท | Subject | Outcome | Next Action | วันที่ Next Action

ปุ่ "My Activities" toggle → กรองเฉพาะของตัวเอง
Export Excel

=== หน้า Sales Performance Dashboard (src/pages/sales/performance/index.vue) ===

Section 1: Period Selector + Salesperson selector (ทีม / รายคน)

Section 2: KPI Cards (4-6 cards)
- Revenue Actual vs Target (badge: % hit)
- Contracts Actual vs Target
- Fleet Size Actual vs Target
- Hit Rate (Win/Loss ratio)
- Avg Deal Size
- Avg Sales Cycle (วัน)

Section 3: Leaderboard (ถ้าดูในมุม Manager)
- Top 5 Salesperson by Revenue (บาร์ chart แนวนอน)
  แต่ละแถว: Avatar + ชื่อ | Revenue | Contracts | Hit Rate | Target%

Section 4: Charts
- กราฟ 1: Monthly Revenue Actual vs Target (Grouped Bar, 12 เดือน)
- กราฟ 2: Pipeline Value by Stage (Funnel chart)
- กราฟ 3: Win/Loss Ratio Trend (Stacked Bar: Won / Lost / Month)
- กราฟ 4: Lost Reason Breakdown (Donut chart: สาเหตุที่แพ้)
- กราฟ 5: Activity Count by Type (Bar chart: CALL/MEETING/EMAIL per month)

Section 5: Forecast Table
คอลัมน์: Salesperson | Target | Committed | Best Case | Open Pipeline | Gap to Target

=== หน้า Sales Target Management (src/pages/sales/targets/index.vue) ===

Tab 1: Set Targets
- เลือก Period (Monthly / Quarterly / Annual)
- เลือก Year + Month/Quarter
- VDataTable แต่ละ Salesperson:
  คอลัมน์: ชื่อ | Revenue Target | Contracts | Fleet | New Customers
  inline edit ได้
- ปุ่ "Copy from Last Period" | "Save All"

Tab 2: Target vs Actual Summary
- Pivot table: แกน X = เดือน, แกน Y = Salesperson
  แต่ละ cell แสดง % hit (สีเขียว ≥100%, สีเหลือง 70-99%, สีแดง <70%)

=== หน้า Commission Management (src/pages/sales/commission/index.vue) ===

Tab 1: Commission Rules
- VDataTable ของ Rules:
  คอลัมน์: Rule Name | Product Type | Revenue Range | Rate% | Bonus% | มีผลตั้งแต่ | สิ้นสุด | สถานะ
- ปุ่ "สร้าง Rule"

Tab 2: Commission Records
- Filter: Salesperson | เดือน | Status (PENDING/APPROVED/PAID)
- VDataTable:
  คอลัมน์: Salesperson | Contract No. | Contract Value | Rate% | Commission | Bonus | Status | วันที่จ่าย
- ปุ่ "Approve Selected" (Manager only)
- ปุ่ "Mark as Paid"
- Summary: Total Pending | Total Approved | Total Paid (เดือนนี้)

Tab 3: Commission Summary Report
- Pivot: Salesperson × Month
- Export Excel

=== หน้า Win/Loss Analysis (src/pages/sales/winloss/index.vue) ===

KPI Row:
- Win Rate % (เดือน/ไตรมาส)
- Lost Opportunities value
- Top Lost Reason
- Avg Probability เมื่อ Lost (บ่งบอกว่า deal ตายตอนไหน)

Chart 1: Win Rate Trend (Line chart, 12 เดือน)
Chart 2: Lost Reason Breakdown (Horizontal Bar)
Chart 3: Won vs Lost by Competitor (Stack bar)
Chart 4: Stage เมื่อ Lost (Funnel — deal ตายที่ stage ไหนมากที่สุด)

Table: Lost Deals Detail (ลิงก์ไป Opportunity)
คอลัมน์: วันที่ | ลูกค้า | มูลค่า | Stage สุดท้าย | Lost Reason | Competitor | Salesperson

ไม่ต้อง call API จริง — ใช้ mock data
ใช้ Vuetify: VDataTable, VTabs, VChip, VBadge, VDialog + ApexCharts
Kanban Drag & Drop: ใช้ vuedraggable หรือ @vueuse/gesture
```

---

