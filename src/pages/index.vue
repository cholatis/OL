<script setup lang="ts">
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()

const currentTheme = computed(() => vuetifyTheme.current.value.colors)

// --- KPI Data ---
const kpiData = [
  {
    title: 'Total Assets',
    value: '1,284',
    icon: 'tabler-car',
    color: 'primary',
    subtitle: 'Active: 1,120 | Maint: 42 | Avail: 122',
  },
  {
    title: 'MRR (Incl. VAT)',
    value: '฿4,250,000',
    icon: 'tabler-currency-baht',
    color: 'success',
    subtitle: '+12% from last month',
  },
  {
    title: 'สัญญาใกล้หมด (30 วัน)',
    value: '18',
    icon: 'tabler-calendar-due',
    color: 'warning',
    subtitle: 'มูลค่ารวม: ฿850,000',
    action: 'ดูทั้งหมด',
  },
  {
    title: 'ค้างชำระ',
    value: '24',
    icon: 'tabler-alert-circle',
    color: 'error',
    subtitle: 'ยอดรวม: ฿420,000',
  },
]

// --- Asset Status Donut Chart ---
const assetStatusChartConfig = computed(() => {
  return {
    chart: {
      type: 'donut',
      sparkline: { enabled: true },
    },
    labels: ['Active', 'Maintenance', 'Available', 'Returned'],
    colors: [currentTheme.value.primary, currentTheme.value.warning, currentTheme.value.success, currentTheme.value.secondary],
    stroke: { width: 0 },
    legend: { show: false },
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: { show: true, fontSize: '14px', offsetY: -5 },
            value: { show: true, fontSize: '18px', fontWeight: 600, offsetY: 5 },
            total: {
              show: true,
              label: 'Total',
              formatter: () => '1,284',
            },
          },
        },
      },
    },
  }
})

const assetStatusSeries = [1120, 42, 122, 0]

// --- Monthly Revenue Bar Chart ---
const revenueChartConfig = computed(() => {
  return {
    chart: {
      type: 'bar',
      stacked: false,
      toolbar: { show: false },
    },
    grid: {
      show: false,
      padding: { left: 0, right: 0 },
    },
    plotOptions: {
      bar: {
        columnWidth: '45%',
        borderRadius: 4,
      },
    },
    dataLabels: { enabled: false },
    legend: { show: true, position: 'top', horizontalAlign: 'start' },
    colors: [currentTheme.value.primary, currentTheme.value.info],
    xaxis: {
      categories: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { show: false },
  }
})

const revenueSeries = [
  { name: 'Financial Rental', data: [2.5, 2.7, 2.8, 2.8, 3.0, 3.2] },
  { name: 'Maintenance Rental', data: [0.8, 0.9, 0.9, 1.0, 1.0, 1.1] },
]

// --- Upcoming Expirations Table ---
const upcomingContracts = [
  { id: 'CON-2024-001', customer: 'Siam Global Tech', assets: 15, expiry: '2026-04-10', days: 28 },
  { id: 'CON-2024-042', customer: 'Apex Logistics', assets: 8, expiry: '2026-04-25', days: 43 },
  { id: 'CON-2023-118', customer: 'United Retail Group', assets: 24, expiry: '2026-05-15', days: 63 },
  { id: 'CON-2024-089', customer: 'Thai Manufacturing Co.', assets: 12, expiry: '2026-05-20', days: 68 },
  { id: 'CON-2024-105', customer: 'Bangkok Innovative', assets: 5, expiry: '2026-03-25', days: 12 },
].sort((a, b) => a.days - b.days)

const getStatusColor = (days: number) => {
  if (days < 30) return 'error'
  if (days < 60) return 'warning'
  return 'success'
}
</script>

<template>
  <VRow class="match-height">
    <!-- KPI Cards -->
    <VCol
      v-for="(kpi, index) in kpiData"
      :key="index"
      cols="12"
      sm="6"
      lg="3"
    >
      <VCard>
        <VCardText class="d-flex align-center">
          <VAvatar
            :color="kpi.color"
            variant="tonal"
            rounded
            size="44"
            class="me-4"
          >
            <VIcon
              :icon="kpi.icon"
              size="28"
            />
          </VAvatar>
          <div>
            <div class="text-body-1">
              {{ kpi.title }}
            </div>
            <div class="text-h5 font-weight-bold">
              {{ kpi.value }}
            </div>
          </div>
        </VCardText>
        <VCardText>
          <div class="d-flex justify-space-between align-center">
            <span class="text-caption text-disabled">{{ kpi.subtitle }}</span>
            <VBtn
              v-if="kpi.action"
              variant="text"
              color="primary"
              density="compact"
              size="small"
            >
              {{ kpi.action }}
            </VBtn>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <!-- Asset Status Donut -->
    <VCol
      cols="12"
      md="4"
    >
      <VCard title="Asset Status Split">
        <VCardText>
          <VueApexCharts
            type="donut"
            height="220"
            :options="assetStatusChartConfig"
            :series="assetStatusSeries"
          />

          <div class="mt-8">
            <div
              v-for="(label, index) in ['Active', 'Maintenance', 'Available', 'Returned']"
              :key="label"
              class="d-flex align-center mb-3"
            >
              <VBadge
                dot
                inline
                :color="assetStatusChartConfig.colors[index]"
                class="me-3"
              />
              <span class="text-body-1">{{ label }}</span>
              <VSpacer />
              <span class="font-weight-medium">{{ assetStatusSeries[index] }}</span>
            </div>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <!-- Monthly Revenue Bar -->
    <VCol
      cols="12"
      md="8"
    >
      <VCard title="Monthly Revenue (M. THB)">
        <VCardText>
          <VueApexCharts
            type="bar"
            height="320"
            :options="revenueChartConfig"
            :series="revenueSeries"
          />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Upcoming Expirations Table -->
    <VCol cols="12">
      <VCard title="สัญญาใกล้หมดอายุ (Top 5)">
        <VTable class="text-no-wrap">
          <thead>
            <tr>
              <th>เลขสัญญา</th>
              <th>ลูกค้า</th>
              <th class="text-center">
                จำนวน ASSET
              </th>
              <th>วันหมดสัญญา</th>
              <th>เหลืออีก (วัน)</th>
              <th class="text-center">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="contract in upcomingContracts"
              :key="contract.id"
            >
              <td class="font-weight-medium">
                {{ contract.id }}
              </td>
              <td>{{ contract.customer }}</td>
              <td class="text-center">
                {{ contract.assets }}
              </td>
              <td>{{ contract.expiry }}</td>
              <td>
                <VChip
                  :color="getStatusColor(contract.days)"
                  size="small"
                  label
                >
                  {{ contract.days }} วัน
                </VChip>
              </td>
              <td class="text-center">
                <VBtn
                  icon
                  variant="text"
                  size="small"
                  color="medium-emphasis"
                >
                  <VIcon icon="tabler-eye" />
                </VBtn>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>
