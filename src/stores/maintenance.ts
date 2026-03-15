import { defineStore } from 'pinia'
import type { WorkOrder, PMPlan, ChecklistItem, WorkOrderStatus, WorkOrderResult } from '@/types/maintenance'

export const useMaintenanceStore = defineStore('maintenance', {
  state: () => ({
    workOrders: [
      {
        id: 'WO-001',
        workOrderNo: 'WO-2026-00001',
        type: 'CM' as const,
        status: 'IN_PROGRESS' as const,
        priority: 'HIGH' as const,
        assetId: 'ASSET-001',
        assetTag: 'T-CAR-001',
        serialNumber: '7324/TT6044J',
        assetModel: 'Camry 2.5 HEV',
        assetBrand: 'Toyota',
        contractId: 'MLA-001',
        contractNo: 'MLA-2024-001',
        lesseeId: 'L-001',
        lesseeName: 'Business Development Co., Ltd.',
        siteAddress: '456 Rama 9 Rd, Bangkok',
        reportedBy: 'K. Somchai',
        reportedAt: '2026-03-10T09:00:00Z',
        scheduledDate: '2026-03-12',
        scheduledTimeSlot: '09:00-12:00',
        technicianId: 'TECH-001',
        technicianName: 'Somsak Mechanic',
        problemDescription: 'Air conditioning not cooling properly',
        workDescription: 'Check refrigerant levels and inspect compressor',
        checklistItems: [
          { id: '1', description: 'Check compressor belt', isRequired: true, result: 'PASS' },
          { id: '2', description: 'Measure refrigerant pressure', isRequired: true, result: 'PASS' },
          { id: '3', description: 'Clean condenser fins', isRequired: false }
        ],
        partsUsed: [],
        laborCost: 1500,
        partsCost: 0,
        totalCost: 1500,
        beforePhotos: [],
        afterPhotos: [],
        createdAt: '2026-03-10T10:00:00Z',
        updatedAt: '2026-03-12T08:00:00Z'
      },
      {
        id: 'WO-002',
        workOrderNo: 'WO-2026-00002',
        type: 'PM' as const,
        status: 'ASSIGNED' as const,
        priority: 'MEDIUM' as const,
        assetId: 'ASSET-002',
        assetTag: 'T-CAR-002',
        serialNumber: '9921/XX1234K',
        assetModel: 'Camry 2.5 HEV',
        assetBrand: 'Toyota',
        contractId: 'MLA-001',
        contractNo: 'MLA-2024-001',
        lesseeId: 'L-001',
        lesseeName: 'Business Development Co., Ltd.',
        siteAddress: '456 Rama 9 Rd, Bangkok',
        reportedBy: 'System (PM)',
        reportedAt: '2026-03-11T00:00:00Z',
        scheduledDate: '2026-03-13',
        scheduledTimeSlot: '13:00-17:00',
        technicianId: 'TECH-002',
        technicianName: 'Vichai Service',
        problemDescription: 'Scheduled 30,000 KM Maintenance',
        workDescription: 'Standard PM for 30,000 KM',
        checklistItems: [
          { id: '4', description: 'Engine oil change', isRequired: true },
          { id: '5', description: 'Brake fluid check', isRequired: true },
          { id: '6', description: 'Tire rotation', isRequired: false }
        ],
        partsUsed: [],
        laborCost: 1200,
        partsCost: 0,
        totalCost: 1200,
        beforePhotos: [],
        afterPhotos: [],
        createdAt: '2026-03-11T00:00:00Z',
        updatedAt: '2026-03-11T00:00:00Z'
      },
      {
        id: 'WO-003',
        workOrderNo: 'WO-2026-00003',
        type: 'EMERGENCY' as const,
        status: 'OPEN' as const,
        priority: 'CRITICAL' as const,
        assetId: 'ASSET-003',
        assetTag: 'T-CAR-003',
        serialNumber: '5566/YY7788L',
        assetModel: 'Fortuner 2.8 GR',
        assetBrand: 'Toyota',
        contractId: 'MLA-002',
        contractNo: 'MLA-2024-005',
        lesseeId: 'L-005',
        lesseeName: 'Apex Logistics',
        siteAddress: 'Bang Na-Trat KM 12',
        reportedBy: 'Driver',
        reportedAt: '2026-03-12T08:30:00Z',
        scheduledDate: '2026-03-12',
        scheduledTimeSlot: 'ASAP',
        problemDescription: 'Engine overheat, stopped on highway',
        workDescription: 'Towing and diagnostic',
        checklistItems: [],
        partsUsed: [],
        laborCost: 0,
        partsCost: 0,
        totalCost: 0,
        beforePhotos: [],
        afterPhotos: [],
        createdAt: '2026-03-12T08:30:00Z',
        updatedAt: '2026-03-12T08:30:00Z'
      }
    ] as WorkOrder[],
    pmPlans: [
      {
        id: 'PM-PLAN-001',
        planCode: 'PM-CAMRY-HEV',
        planName: 'Standard Maintenance - Camry Hybrid',
        assetCategory: 'SEDAN',
        assetModel: 'Camry 2.5 HEV',
        intervalMonths: 6,
        checklistTemplate: [
          { id: '101', description: 'Engine Oil & Filter Change', isRequired: true },
          { id: '102', description: 'Hybrid System Diagnostic', isRequired: true },
          { id: '103', description: 'Brake System Inspection', isRequired: true },
          { id: '104', description: 'Battery Health Check', isRequired: true }
        ],
        estimatedDurationHours: 3,
        estimatedCost: 3500,
        activeAssetCount: 15,
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ] as PMPlan[],
    loading: false
  }),

  actions: {
    async fetchWorkOrders() {
      // Mock API call
      return this.workOrders
    },

    async assignTechnician(woId: string, technicianId: string, technicianName: string, date: string) {
      const wo = this.workOrders.find(o => o.id === woId)
      if (wo) {
        wo.technicianId = technicianId
        wo.technicianName = technicianName
        wo.scheduledDate = date
        wo.status = 'ASSIGNED'
      }
    },

    async startWork(woId: string) {
      const wo = this.workOrders.find(o => o.id === woId)
      if (wo) {
        wo.status = 'IN_PROGRESS'
        wo.actualStartAt = new Date().toISOString()
      }
    },

    async completeWork(woId: string, result: WorkOrderResult, note: string) {
      const wo = this.workOrders.find(o => o.id === woId)
      if (wo) {
        wo.status = 'COMPLETED'
        wo.result = result
        wo.resultNote = note
        wo.actualEndAt = new Date().toISOString()
      }
    }
  }
})
