import { defineStore } from 'pinia'
import type { Customer } from '@/types/customer'

export const useCustomerStore = defineStore('customer', () => {
  const customers = ref<Customer[]>([
    {
      id: 'CUST-001',
      companyName: 'บริษัท สยาม โกลบอล เทค จำกัด (มหาชน)',
      taxId: '0107563000123',
      companyType: 'PCL',
      registeredDate: '2010-05-15',
      registeredCapital: 500000000,
      businessType: 'เทคโนโลยีและคอมพิวเตอร์',
      address: '123 ชั้น 20 อาคารทาวเวอร์ สุขุมวิท',
      subdistrict: 'คลองเตย',
      district: 'คลองเตย',
      province: 'กรุงเทพมหานคร',
      postalCode: '10110',
      contactName: 'คุณสมชาย ใจดี',
      contactPosition: 'ผู้อำนวยการฝ่ายจัดซื้อ',
      contactPhone: '02-123-4567',
      contactEmail: 'somchai@siamglobal.co.th',
      website: 'assets.siamglobal.co.th',
      creditLimit: 25000000,
      creditUsed: 18500000,
      customerSegment: 'CORPORATE',
      status: 'ACTIVE',
      documents: [],
      createdAt: '2024-01-10T08:00:00Z',
      updatedAt: '2024-03-01T10:30:00Z',
    },
    {
      id: 'CUST-002',
      companyName: 'บริษัท เอเพ็กซ์ โลจิสติกส์ จำกัด',
      taxId: '0105545009876',
      companyType: 'CO_LTD',
      registeredDate: '2012-08-20',
      registeredCapital: 50000000,
      businessType: 'ขนส่งและคลังสินค้า',
      address: '45/1 หมู่ 4 ถนนบางนา-ตราด',
      subdistrict: 'บางแก้ว',
      district: 'บางพลี',
      province: 'สมุทรปราการ',
      postalCode: '10540',
      contactName: 'คุณวิภาวรรณ สดใส',
      contactPosition: 'ผู้จัดการทั่วไป',
      contactPhone: '081-987-6543',
      contactEmail: 'wipawan@apexlogistics.com',
      creditLimit: 10000000,
      creditUsed: 4200000,
      customerSegment: 'SME',
      status: 'ACTIVE',
      documents: [],
      createdAt: '2024-01-15T09:00:00Z',
      updatedAt: '2024-02-20T14:15:00Z',
    },
    {
      id: 'CUST-003',
      companyName: 'กรมโยธาธิการและผังเมือง',
      taxId: '0994000164723',
      companyType: 'GOVERNMENT',
      registeredDate: '2000-01-01',
      registeredCapital: 0,
      businessType: 'หน่วยงานรัฐบาล',
      address: '224 ถนนพระราม 9',
      subdistrict: 'ห้วยขวาง',
      district: 'ห้วยขวาง',
      province: 'กรุงเทพมหานคร',
      postalCode: '10310',
      contactName: 'คุณเกรียงไกร มีทรัพย์',
      contactPosition: 'เจ้าหน้าที่บริหารงานทั่วไป',
      contactPhone: '02-299-4000',
      contactEmail: 'kriengkrai@dpt.go.th',
      creditLimit: 50000000,
      creditUsed: 35000000,
      customerSegment: 'GOVERNMENT',
      status: 'ACTIVE',
      documents: [],
      createdAt: '2024-02-01T10:00:00Z',
      updatedAt: '2024-02-01T10:00:00Z',
    },
    {
      id: 'CUST-004',
      companyName: 'หจก. รุ่งเรือง การก่อสร้าง',
      taxId: '0123547000456',
      companyType: 'LP',
      registeredDate: '2015-03-10',
      registeredCapital: 5000000,
      businessType: 'รับเหมาก่อสร้าง',
      address: '99/9 ถนนมิตรภาพ',
      subdistrict: 'ในเมือง',
      district: 'เมืองนครราชสีมา',
      province: 'นครราชสีมา',
      postalCode: '30000',
      contactName: 'คุณมานะ ขยันงาน',
      contactPosition: 'หุ้นส่วนผู้จัดการ',
      contactPhone: '044-123-456',
      contactEmail: 'mana@rrcon.com',
      creditLimit: 2000000,
      creditUsed: 1900000,
      customerSegment: 'SME',
      status: 'SUSPENDED',
      documents: [],
      createdAt: '2024-02-10T11:00:00Z',
      updatedAt: '2024-03-10T09:00:00Z',
    },
    {
      id: 'CUST-005',
      companyName: 'บริษัท ไทย อินโนเวทีฟ รีเทล จำกัด',
      taxId: '0105560001111',
      companyType: 'CO_LTD',
      registeredDate: '2018-11-25',
      registeredCapital: 100000000,
      businessType: 'ค้าปลีกสมัยใหม่',
      address: '888 อาคารอโศก',
      subdistrict: 'คลองเตยเหนือ',
      district: 'วัฒนา',
      province: 'กรุงเทพมหานคร',
      postalCode: '10110',
      contactName: 'คุณปิยะพร รวยทรัพย์',
      contactPosition: 'CFO',
      contactPhone: '02-888-8888',
      contactEmail: 'piyaporn@tir.co.th',
      creditLimit: 15000000,
      creditUsed: 0,
      customerSegment: 'CORPORATE',
      status: 'ACTIVE',
      documents: [],
      createdAt: '2024-03-05T15:00:00Z',
      updatedAt: '2024-03-05T15:00:00Z',
    },
  ])

  const selectedCustomer = ref<Customer | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const activeCustomers = computed(() => customers.value.filter(c => c.status === 'ACTIVE'))
  const customersBySegment = (segment: string) => customers.value.filter(c => c.customerSegment === segment)

  async function fetchCustomers() {
    loading.value = true
    try {
      // In a real app, this would be an API call
      // await new Promise(resolve => setTimeout(resolve, 500))
    }
    catch (err: any) {
      error.value = err.message
    }
    finally {
      loading.value = false
    }
  }

  async function fetchCustomerById(id: string) {
    loading.value = true
    try {
      const customer = customers.value.find(c => c.id === id)
      selectedCustomer.value = customer ? { ...customer } : null
    }
    catch (err: any) {
      error.value = err.message
    }
    finally {
      loading.value = false
    }
  }

  async function createCustomer(data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) {
    loading.value = true
    try {
      const newCustomer: Customer = {
        ...data,
        id: `CUST-${String(customers.value.length + 1).padStart(3, '0')}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      customers.value.push(newCustomer)
      return newCustomer
    }
    finally {
      loading.value = false
    }
  }

  async function updateCustomer(id: string, data: Partial<Customer>) {
    loading.value = true
    try {
      const index = customers.value.findIndex(c => c.id === id)
      if (index !== -1) {
        customers.value[index] = {
          ...customers.value[index],
          ...data,
          updatedAt: new Date().toISOString(),
        }
      }
    }
    finally {
      loading.value = false
    }
  }

  async function deleteCustomer(id: string) {
    loading.value = true
    try {
      const index = customers.value.findIndex(c => c.id === id)
      if (index !== -1)
        customers.value.splice(index, 1)
    }
    finally {
      loading.value = false
    }
  }

  return {
    customers,
    selectedCustomer,
    loading,
    error,
    activeCustomers,
    customersBySegment,
    fetchCustomers,
    fetchCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  }
})
