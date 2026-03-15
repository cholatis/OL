export interface Customer {
  id: string
  // ข้อมูลบริษัท
  companyName: string
  taxId: string // เลขทะเบียนนิติบุคคล 13 หลัก
  companyType: 'CO_LTD' | 'PCL' | 'LP' | 'GOVERNMENT' | 'OTHER'
  registeredDate: string
  registeredCapital: number
  businessType: string // ประเภทธุรกิจ
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
  creditLimit: number // วงเงินที่อนุมัติ (Fleet Facility)
  creditUsed: number // วงเงินที่ใช้ไปแล้ว
  customerSegment: 'CORPORATE' | 'GOVERNMENT' | 'SME'
  status: 'ACTIVE' | 'SUSPENDED' | 'BLACKLIST'
  // เอกสาร
  documents: CustomerDocument[]
  createdAt: string
  updatedAt: string
}

export interface CustomerDocument {
  id: string
  type: 'COMPANY_CERT' | 'SHAREHOLDER_LIST' | 'AUTHORIZED_SIGNATORY' |
        'FINANCIAL_STMT' | 'BANK_STATEMENT' | 'VAT_CERT' | 'OTHER'
  fileName: string
  uploadedAt: string
  url?: string
}

export type CompanyType = Customer['companyType']
export type CustomerSegment = Customer['customerSegment']
export type CustomerStatus = Customer['status']
export type DocumentType = CustomerDocument['type']
