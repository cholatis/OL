export default [
  {
    title: 'Dashboard',
    to: { name: 'root' },
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
      { title: 'Contract Lifecycle', to: { name: 'contract-events' }, icon: { icon: 'tabler-arrows-left-right' } },
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
  {
    title: 'เครดิตและลูกหนี้',
    icon: { icon: 'tabler-shield-check' },
    children: [
      { title: 'KYC & Credit Scoring', to: { name: 'kyc' }, icon: { icon: 'tabler-user-check' } },
      { title: 'ลูกหนี้ค้างชำระ (Aging)', to: { name: 'debtors' }, icon: { icon: 'tabler-users' } },
      { title: 'ตรวจสอบ NCB', to: { name: 'ncb' }, icon: { icon: 'tabler-search' } },
      { title: 'งานคดีและยึดทรัพย์', to: { name: 'legal' }, icon: { icon: 'tabler-gavel' } },
    ],
  },
  {
    title: 'บัญชีและ AR/AP',
    icon: { icon: 'tabler-file-analytics' },
    children: [
      { title: 'ผังบัญชี', to: { name: 'accounting-chart-of-accounts' }, icon: { icon: 'tabler-list' } },
      { title: 'สมุดรายวัน', to: { name: 'accounting-gl' }, icon: { icon: 'tabler-list' } },
      { title: 'รับชำระเงิน (AR)', to: { name: 'accounting-ar-receipts' }, icon: { icon: 'tabler-list' } },
      { title: 'กระทบยอดธนาคาร', to: { name: 'accounting-ar-bank-recon' }, icon: { icon: 'tabler-list' } },
      { title: 'เจ้าหนี้ (AP)', to: { name: 'accounting-ap' }, icon: { icon: 'tabler-list' } },
      { title: 'จ่ายเงินเจ้าหนี้', to: { name: 'accounting-ap-payments' }, icon: { icon: 'tabler-list' } },
      { title: 'TFRS 16', to: { name: 'accounting-tfrs16' }, icon: { icon: 'tabler-list' } },
      { title: 'TFRS 9', to: { name: 'accounting-tfrs9' }, icon: { icon: 'tabler-list' } },
    ],
  },
  {
    title: 'E-Doc & Tax Compliance',
    icon: { icon: 'tabler-file-certificate' },
    children: [
      { title: 'E-Tax Invoice', to: { path: '/e-doc/tax-invoice' }, icon: { icon: 'tabler-file-invoice' } },
      { title: 'E-WHT (ใบหัก ณ ที่จ่าย)', to: { path: '/e-doc/wht/monthly' }, icon: { icon: 'tabler-cut' } },
      { title: 'E-Payment', to: { path: '/e-doc/payment' }, icon: { icon: 'tabler-credit-card' } },
      { title: 'E-Stamp (อากรแสตมป์)', to: { path: '/e-doc/stamp' }, icon: { icon: 'tabler-stamp' } },
      { title: 'E-Filing Dashboard', to: { path: '/e-doc/filing' }, icon: { icon: 'tabler-report-analytics' } },
    ],
  },
  {
    title: 'สินทรัพย์ถาวร (FA)',
    icon: { icon: 'tabler-calculator' },
    children: [
      { title: 'ทะเบียน FA', to: { name: 'fixed-assets' }, icon: { icon: 'tabler-list' } },
      { title: 'ประมวลผลค่าเสื่อม', to: { name: 'fixed-assets-depreciation' }, icon: { icon: 'tabler-run' } },
      { title: 'ตัดจำหน่าย (Disposal)', to: { name: 'fixed-assets-disposal' }, icon: { icon: 'tabler-trash' } },
      { title: 'ตีราคาใหม่ (Reval)', to: { name: 'fixed-assets-revaluation' }, icon: { icon: 'tabler-refresh' } },
    ],
  },
  {
    title: 'ฝ่ายจัดซื้อ (Procurement)',
    icon: { icon: 'tabler-shopping-cart' },
    children: [
      { title: 'ใบขอซื้อ (PR)', to: { path: '/procurement/purchase-requests' }, icon: { icon: 'tabler-file-plus' } },
      { title: 'ใบสั่งซื้อ (PO)', to: { path: '/procurement/purchase-orders' }, icon: { icon: 'tabler-file-invoice' } },
      { title: 'การรับรถ (Receiving)', to: { path: '/procurement/receiving' }, icon: { icon: 'tabler-package-receive' } },
    ],
  },
  {
    title: 'บริหาร Fleet & Stock',
    icon: { icon: 'tabler-car-garage' },
    children: [
      { title: 'Stock Dashboard', to: { path: '/fleet/stock' }, icon: { icon: 'tabler-dashboard' } },
      { title: 'Port Management', to: { path: '/fleet/port' }, icon: { icon: 'tabler-ship' } },
      { title: 'คู่ค้า & Dealer', to: { path: '/fleet/vendors' }, icon: { icon: 'tabler-users' } },
    ],
  },
  {
    title: 'ประกันภัย & ภาษี',
    icon: { icon: 'tabler-shield-lock' },
    children: [
      { title: 'Insurance Portfolio', to: { path: '/fleet/insurance' }, icon: { icon: 'tabler-shield-check' } },
      { title: 'Renewal Dashboard', to: { path: '/fleet/insurance/renewal' }, icon: { icon: 'tabler-refresh' } },
      { title: 'การจัดการ พรบ.', to: { path: '/fleet/compulsory' }, icon: { icon: 'tabler-file-report' } },
      { title: 'ภาษีรถยนต์ประจำปี', to: { path: '/fleet/vehicle-tax' }, icon: { icon: 'tabler-receipt-tax' } },
    ],
  },
  {
    title: 'อุบัติเหตุ & เคลม',
    icon: { icon: 'tabler-alert-triangle' },
    children: [
      { title: 'รายการอุบัติเหตุ', to: { path: '/fleet/accidents' }, icon: { icon: 'tabler-car-crash' } },
      { title: 'รายการเคลม', to: { path: '/fleet/claims' }, icon: { icon: 'tabler-file-invoice' } },
    ],
  },
  {
    title: 'จำหน่ายสินทรัพย์ (Disposal)',
    icon: { icon: 'tabler-car-off' },
    children: [
      { title: 'Disposal Pipeline', to: { path: '/fleet/disposal' }, icon: { icon: 'tabler-pipeline' } },
      { title: 'Remarketing Dashboard', to: { path: '/fleet/remarketing' }, icon: { icon: 'tabler-chart-pie' } },
      { title: 'Auction Management', to: { path: '/fleet/remarketing/auction' }, icon: { icon: 'tabler-gavel' } },
    ],
  },
  {
    title: 'Sales Management',
    icon: { icon: 'tabler-trending-up' },
    children: [
      { title: 'Sales Pipeline (Kanban)', to: { path: '/sales/pipeline' }, icon: { icon: 'tabler-layout-kanban' } },
      { title: 'Sales Activities', to: { path: '/sales/activities' }, icon: { icon: 'tabler-run' } },
      { title: 'Performance Dashboard', to: { path: '/sales/performance' }, icon: { icon: 'tabler-chart-pie' } },
      { title: 'Sales Target', to: { path: '/sales/targets' }, icon: { icon: 'tabler-pennant' } },
      { title: 'Commissions', to: { path: '/sales/commission' }, icon: { icon: 'tabler-coin' } },
      { title: 'Win/Loss Analysis', to: { path: '/sales/winloss' }, icon: { icon: 'tabler-chart-funnel' } },
    ],
  },
  {
    title: 'CRM & Engagement',
    icon: { icon: 'tabler-heart-handshake' },
    children: [
      { title: 'ประวัติการติดต่อ', to: { path: '/crm/interactions' }, icon: { icon: 'tabler-message-2' } },
      { title: 'สื่อสารลูกค้า (Campaign)', to: { path: '/crm/engagement' }, icon: { icon: 'tabler-send' } },
      { title: 'NPS & Survey', to: { path: '/crm/survey' }, icon: { icon: 'tabler-mood-smile' } },
      { title: 'Automated Alerts', to: { path: '/crm/alerts' }, icon: { icon: 'tabler-bell-ringing' } },
      { title: 'Customer Segmentation', to: { path: '/crm/segments' }, icon: { icon: 'tabler-chart-bubble' } },
      { title: 'Portal Management', to: { path: '/crm/portal' }, icon: { icon: 'tabler-user-cog' } },
    ],
  },
  {
    title: 'ตั้งค่า',
    icon: { icon: 'tabler-settings' },
    children: [
      { title: 'Hire Groups', to: { name: 'settings-hire-groups' } },
      { title: 'Maintenance Packs', to: { name: 'settings-maintenance-packs' } },
      { title: 'Base Insurance Rates', to: { name: 'settings-base-rates' } },
      { title: 'RV Tables', to: { name: 'settings-rv-table' } },
      { title: 'User Defined Fields (UDF)', to: { name: 'settings-user-defined-fields' }, icon: { icon: 'tabler-list-details' } },
    ],
  },
]
