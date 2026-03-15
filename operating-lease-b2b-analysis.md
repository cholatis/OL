# วิเคราะห์ความแตกต่าง: ใบคำขอ Hire Purchase → Operating Lease (B2B)

## ภาพรวม

| หัวข้อ | Hire Purchase (เช่าซื้อ) | Operating Lease B2B (เช่าดำเนินงาน) |
|--------|--------------------------|--------------------------------------|
| ความเป็นเจ้าของ | โอนให้ผู้เช่าซื้อเมื่อชำระครบ | ไม่โอน — ทรัพย์สินคืนให้ผู้ให้เช่าตลอด |
| คู่สัญญา | บุคคลธรรมดา / นิติบุคคล | **นิติบุคคลกับนิติบุคคล (B2B เท่านั้น)** |
| ลักษณะการจ่าย | ค่างวด (เงินต้น + ดอกเบี้ย) | ค่าเช่ารายงวด (Operating Lease Payment) |
| มูลค่าตกค้าง (Residual Value) | ไม่มี | มี — ความเสี่ยงอยู่ที่ผู้ให้เช่า |
| การบันทึกบัญชี (ผู้เช่า) | บันทึกเป็นสินทรัพย์ + หนี้สิน | บันทึกเป็น Right-of-Use Asset (IFRS 16) |
| สิทธิประโยชน์ทางภาษี | หักค่าเสื่อมราคา + ดอกเบี้ย | **หักค่าเช่าเป็นค่าใช้จ่ายได้ 100%** |
| ระยะเวลาสัญญา | กำหนดชัด — ผ่อนจบ = สิ้นสุด | มีตัวเลือกต่ออายุ / คืน / ซื้อคืนท้ายสัญญา |

---

## 1. ส่วน "หัวใจ" (Header / ข้อมูลทั่วไป)

### สิ่งที่ต้องเพิ่ม / เปลี่ยน

| Field (ปัจจุบัน — HP) | การเปลี่ยนแปลง (OL B2B) | หมายเหตุ |
|-----------------------|--------------------------|----------|
| ประเภทสินเชื่อ: `IHP_FREEZER เช่าซื้อ` | เปลี่ยนเป็น `OL_[PRODUCT_TYPE] เช่าดำเนินงาน` | ต้องมี Product Type Code แยก |
| ประเภทสัญญา: `(NEW) New Agreement` | เพิ่ม: `RENEWAL`, `EXTENSION`, `EARLY TERMINATION` | OL มีการต่ออายุบ่อยกว่า HP |
| ช่องทางการขาย | เพิ่ม: `Direct Sales`, `Broker/Agent`, `Tender` | B2B มีช่องทางขายต่างออกไป |
| — | **เพิ่ม: ประเภทการเช่า** | `Full Service Lease` / `Finance Lease` / `Operating Lease` |
| — | **เพิ่ม: วันครบกำหนดคืนทรัพย์สิน** | Return Date ต่างจาก End Date ของ HP |
| — | **เพิ่ม: เงื่อนไขท้ายสัญญา (End-of-Term Option)** | Return / Renew / Purchase Option |

---

## 2. ส่วน "รายละเอียดใบคำขอ" (พนักงานที่เกี่ยวข้อง)

### สิ่งที่ต้องเพิ่ม

| Role (ปัจจุบัน — HP) | การเปลี่ยนแปลง (OL B2B) |
|----------------------|--------------------------|
| พนักงานทำสัญญา | คงไว้ |
| พนักงานขาย (SA) | คงไว้ + เพิ่ม **Account Manager (AM)** สำหรับ B2B |
| พนักงานสินเชื่อ (CA) | คงไว้ + เพิ่ม **Credit Analyst (Corporate)** เพราะวิเคราะห์งบการเงินบริษัท |
| พนักงานติดตั้ง | เปลี่ยนเป็น **Asset Management Officer** — ดูแลทรัพย์สินตลอดอายุสัญญา |
| — | **เพิ่ม: Asset Inspector** — ตรวจสภาพก่อน/หลังสัญญา |
| — | **เพิ่ม: Contract Renewal Officer** — ดูแลการต่ออายุ |

---

## 3. ส่วน "ข้อมูลผู้" → เปลี่ยนเป็น "ข้อมูลผู้เช่า (Lessee)"

### ความแตกต่างสำคัญที่สุด: B2B = นิติบุคคลเท่านั้น

**HP ปัจจุบัน:**
```
ประเภทบุคคล: บุคคลธรรมดา
ชื่อ: กรกนก นิรา
เบอร์โทร: 0865554335
```

**OL B2B ที่ต้องการ:**
```
ประเภทองค์กร: บริษัทจำกัด / บริษัทมหาชน / ห้างหุ้นส่วนจำกัด
ชื่อบริษัท: [Company Name]
เลขทะเบียนนิติบุคคล: 13 หลัก
วันที่จดทะเบียน:
ทุนจดทะเบียน:
ผู้มีอำนาจลงนาม: (Authorized Signatory)
ตำแหน่ง:
เบอร์โทรบริษัท / โทรสาร:
อีเมลติดต่อ (Corporate Email):
เว็บไซต์บริษัท:
```

### Field เพิ่มเติมสำหรับ B2B Credit Assessment

```
งบการเงินปีล่าสุด (ปีที่ [N]):
  - รายได้รวม
  - กำไรสุทธิ
  - สินทรัพย์รวม
  - หนี้สินรวม
  - D/E Ratio

ประวัติการชำระหนี้:
  - เครดิตบูโร (Business Credit Bureau)
  - ประวัติกับสถาบันการเงินอื่น

ผู้ค้ำประกัน (Guarantor — ถ้ามี):
  - บุคคลธรรมดา (กรรมการ/ผู้ถือหุ้นหลัก)
  - นิติบุคคล (บริษัทแม่/บริษัทในเครือ)
```

---

## 4. ส่วน "ข้อมูลลูกค้า" → เพิ่ม "ข้อมูลผู้ค้ำ (Guarantor)"

**HP:** ว่างเปล่า (ไม่มี)

**OL B2B ที่ต้องการ:**
- กรรมการบริษัท ค้ำประกันในฐานะบุคคลธรรมดา
- บริษัทแม่ค้ำประกัน (Parent Company Guarantee)
- Letter of Comfort จากบริษัทในเครือ

---

## 5. ส่วน "สินค้า" → เปลี่ยนเป็น "ทรัพย์สินให้เช่า (Leased Asset)"

### ความแตกต่างของมุมมองสินค้า

| HP (ปัจจุบัน) | OL B2B |
|---------------|--------|
| สินค้า = ขายให้ลูกค้า | ทรัพย์สิน = ยังเป็นของบริษัท ต้องติดตามตลอด |
| ไม่ต้องระบุ Serial/Asset No. ละเอียด | **ต้องระบุ Serial Number, Asset Tag ทุกชิ้น** |
| ไม่มีการประเมินมูลค่าตกค้าง | **ต้องคำนวณ Residual Value ทุกรายการ** |
| ไม่มีประกันภัยที่ผู้ให้เช่ากำหนด | **ต้องระบุกรมธรรม์ประกันภัยที่ครอบคลุม** |

### Field เพิ่มเติม

```
ทรัพย์สิน:
  - Asset Code / Asset Tag (Internal)
  - Serial Number (Manufacturer)
  - วันที่ซื้อ / วันเริ่มเสื่อมราคา
  - ราคาต้นทุน (Cost)
  - มูลค่าตกค้าง ณ สิ้นสัญญา (Residual Value): บาท / % ของราคาต้นทุน
  - อัตราเสื่อมราคา (%/ปี)
  - ประเภทการบำรุงรักษา: Full Service / Partial / As-is
  - สัญญาบำรุงรักษา (Maintenance Agreement): มี/ไม่มี
  - ประกันภัย: ผู้รับผิดชอบ (ผู้เช่า / ผู้ให้เช่า)
  - สถานที่ติดตั้ง (Installation Site): แผนที่ / GPS
```

---

## 6. ส่วน "เงื่อนไข" — เปลี่ยนโครงสร้างมากที่สุด

### 6.1 พารามิเตอร์การคำนวณ

| HP (ปัจจุบัน) | OL B2B |
|---------------|--------|
| จำนวนผ่อน (งวด): 10 | **จำนวนงวดการเช่า**: 12/24/36/48/60 เดือน |
| วัน Due Date: 1 | วันครบกำหนดชำระ: คงไว้ |
| วันสิ้นสุดสัญญา: 30/11/2025 | วันสิ้นสุดสัญญาเช่า + วันกำหนดคืนทรัพย์สิน |
| วันที่เริ่มต้นชำระ: 01/01/2026 | วันที่เริ่มต้นสัญญาเช่า (Commencement Date) |
| — | **Residual Value (บาท / %)** |
| — | **ดอกเบี้ยโดยปริยาย (Implicit Rate)** ตาม IFRS 16 |
| — | **ประเภทการคำนวณ**: Flat Rate / Effective Rate / Annuity |

### 6.2 โครงสร้างค่าเช่า (ต่างจาก HP มาก)

**HP — ค่างวดปัจจุบัน:**
```
ราคาขาย:        5,000.00
ค่างวด:         1,869.16
ภาษี:             130.84
รวม:            2,000.00
```

**OL B2B — โครงสร้างค่าเช่าที่ต้องการ:**
```
ค่าเช่าหลัก (Base Rent):               X,XXX.XX บาท/งวด
ค่าบริการบำรุงรักษา (Maintenance Fee): X,XXX.XX บาท/งวด  [ถ้า Full Service]
ค่าประกันภัย (Insurance Fee):          X,XXX.XX บาท/งวด  [ถ้ารวมในสัญญา]
ค่าเช่ารวมก่อนภาษี:                    X,XXX.XX บาท/งวด
ภาษีมูลค่าเพิ่ม 7%:                      XXX.XX บาท/งวด
ค่าเช่ารวมทั้งสิ้น:                    X,XXX.XX บาท/งวด

เงินประกัน (Security Deposit):         X,XXX.XX บาท  [จ่ายครั้งเดียวตอนเริ่มสัญญา]
ค่าธรรมเนียมแรกเข้า (Upfront Fee):     X,XXX.XX บาท  [ถ้ามี]
```

### 6.3 เงื่อนไขท้ายสัญญา (End-of-Term) — ไม่มีใน HP

```
ตัวเลือกท้ายสัญญา:
  [ ] คืนทรัพย์สิน (Return Asset)
  [ ] ต่ออายุสัญญา (Renew) — ระยะเวลา ___ เดือน, ค่าเช่า ___ บาท/งวด
  [ ] ซื้อทรัพย์สินคืน (Purchase Option) — ราคา ___ บาท (= Residual Value)

เงื่อนไขการคืนทรัพย์สิน:
  - สภาพที่ยอมรับได้ (Fair Wear & Tear)
  - ค่าซ่อมแซมหากเกินเกณฑ์ (Excess Damage Charge)
  - กระบวนการตรวจรับคืน (Return Inspection Process)
```

---

## 7. ส่วน "ตารางค่างวด" → เปลี่ยนเป็น "ตารางค่าเช่า (Lease Schedule)"

### ความแตกต่างของตาราง

**HP ปัจจุบัน — คอลัมน์:**
```
ประเภท | งวดที่ | วันที่ต้องชำระ | ค่างวด | ดอกเบี้ย | เงินต้น | ยอดคืนเงินคงเหลือ | ยอดลูกหนี้คงเหลือ | ภาษี | ยอดรวมที่ต้องชำระ
```

**OL B2B — คอลัมน์ที่ต้องการ:**
```
งวดที่ | วันที่ครบกำหนด | ค่าเช่าก่อนภาษี | ค่าบริการ | ภาษีมูลค่าเพิ่ม | ค่าเช่ารวม |
Right-of-Use Asset (IFRS 16) | ดอกเบี้ยตามสัญญาเช่า | มูลค่าตามบัญชีทรัพย์สิน (คงเหลือ) | สถานะการชำระ
```

### ความแตกต่างเรื่องบัญชี (IFRS 16)

OL B2B ต้องคำนวณและแสดงค่าเพิ่มเติมสำหรับผู้เช่า:
- **Present Value of Lease Payments** (มูลค่าปัจจุบันของค่าเช่าทั้งหมด)
- **Right-of-Use (ROU) Asset** — บันทึกเป็นสินทรัพย์ในงบดุลของผู้เช่า
- **Lease Liability** — บันทึกเป็นหนี้สินในงบดุลของผู้เช่า
- **Depreciation of ROU Asset** — ค่าเสื่อมราคาสิทธิการใช้
- **Interest on Lease Liability** — ดอกเบี้ยจากหนี้สินตามสัญญาเช่า

---

## 8. ส่วน "เอกสารประกอบ" — เปลี่ยนทั้งหมด

### HP ปัจจุบัน (บุคคลธรรมดา):
- บัตรประชาชนผู้ซื้อ
- บัตรประชาชนผู้ค้า
- รูปทิติการจัดอหนี้

### OL B2B ที่ต้องการ (นิติบุคคล):

**เอกสารบริษัท (Corporate Documents):**
```
[ ] หนังสือรับรองบริษัท (ไม่เกิน 3 เดือน)
[ ] บัญชีรายชื่อผู้ถือหุ้น (บอจ.5)
[ ] หนังสือบริคณห์สนธิ + ข้อบังคับบริษัท
[ ] รายงานประชุมผู้ถือหุ้น / คณะกรรมการ (อนุมัติการทำสัญญาเช่า)
[ ] ตัวอย่างลายมือชื่อผู้มีอำนาจลงนาม
```

**เอกสารทางการเงิน (Financial Documents):**
```
[ ] งบการเงิน 3 ปีย้อนหลัง (ผ่านการตรวจสอบโดย CPA)
[ ] Statement ธนาคาร 6-12 เดือนล่าสุด
[ ] ภ.พ.01 / ภ.พ.09 (ทะเบียนภาษีมูลค่าเพิ่ม)
[ ] ภ.ง.ด.50 (แบบแสดงภาษีเงินได้นิติบุคคล) 2 ปีล่าสุด
```

**เอกสารทรัพย์สิน (Asset Documents):**
```
[ ] รูปภาพทรัพย์สินก่อนส่งมอบ (Asset Condition Report)
[ ] เอกสารการตรวจรับทรัพย์สิน (Acceptance Certificate)
[ ] กรมธรรม์ประกันภัย (Insurance Policy)
[ ] คู่มือการใช้งาน / ใบรับประกัน
```

**เอกสารสถานที่ (Site Documents — ถ้าจำเป็น):**
```
[ ] แผนผัง/แผนที่สถานที่ติดตั้ง
[ ] หนังสือยินยอมจากเจ้าของอาคาร (ถ้าเช่าสถานที่)
```

---

## 9. ส่วนใหม่ที่ต้องเพิ่มทั้งหมด (ไม่มีใน HP)

### 9.1 การจัดการทรัพย์สิน (Asset Management)
```
- Asset Tracking: QR Code / RFID
- ตารางการบำรุงรักษาตามแผน (Preventive Maintenance Schedule)
- ประวัติการซ่อมบำรุง (Maintenance History)
- การตรวจสอบสภาพประจำปี (Annual Inspection)
- การแจ้งเตือนเมื่อสัญญาใกล้ครบกำหนด
```

### 9.2 การต่ออายุ / ยกเลิกก่อนกำหนด (Renewal / Early Termination)
```
Early Termination:
  - ค่าปรับยกเลิกก่อนกำหนด (Early Termination Fee)
  - สูตรคำนวณ: Remaining Lease Payments × Discount Factor
  - ขั้นตอนการแจ้งล่วงหน้า (Notice Period): ___ วัน

Renewal:
  - เงื่อนไขการต่ออายุอัตโนมัติ
  - การปรับค่าเช่าเมื่อต่ออายุ (CPI-linked / Fixed Escalation %)
```

### 9.3 การรายงานและ Dashboard B2B
```
- รายงานสรุปทรัพย์สินให้เช่าทั้งหมด (Asset Portfolio Report)
- รายงาน Aging ของค่าเช่าค้างชำระ
- รายงานทรัพย์สินที่ใกล้ครบสัญญา (Upcoming Expiry Report)
- Dashboard: Utilization Rate, Revenue per Asset
- การออกใบแจ้งหนี้ / ใบกำกับภาษี (Tax Invoice) แบบ B2B
```

---

## 10. สรุป: Scope การพัฒนา (Development Scope)

### Priority 1 — Must Have (ต้องมีก่อนเปิดใช้)
- [ ] เปลี่ยนประเภทลูกค้าเป็นนิติบุคคล (Corporate Entity Form)
- [ ] เพิ่ม Residual Value ในโครงสร้างสัญญา
- [ ] เปลี่ยนตาราง Payment Schedule → Lease Schedule พร้อม IFRS 16
- [ ] เพิ่ม End-of-Term Option (Return / Renew / Purchase)
- [ ] เปลี่ยนชุดเอกสารประกอบเป็น B2B Corporate Documents
- [ ] เพิ่ม Asset Management Module (Serial Number, Location, Condition)

### Priority 2 — Should Have
- [ ] Early Termination Calculation
- [ ] Maintenance Service Package (Full Service / Partial)
- [ ] Insurance Management per Asset
- [ ] Renewal Workflow
- [ ] Corporate Credit Scoring (ใช้งบการเงินบริษัท แทน Credit Bureau บุคคล)

### Priority 3 — Nice to Have
- [ ] Asset Tracking (QR/RFID)
- [ ] IFRS 16 Reporting Module สำหรับผู้เช่า
- [ ] Auto-renewal Notification
- [ ] Asset Portfolio Dashboard
- [ ] Integration กับ ERP ของลูกค้า B2B

---

---

## 11. Fleet Asset Management — กรณี 10–100 ชิ้น/คัน ต่อสัญญา

### 11.1 โครงสร้างสัญญา: 1 สัญญา vs. หลายสัญญา

การมีทรัพย์สินจำนวนมากในครั้งเดียว ต้องเลือกโครงสร้างสัญญาให้ถูก:

| รูปแบบ | เหมาะกับ | ข้อดี | ข้อเสีย |
|--------|----------|-------|---------|
| **Master Agreement + Schedule** | Fleet ขนาดใหญ่ (50–100+) | ลดงานเอกสาร, เงื่อนไขเดียว | ยกเลิกรายชิ้นทำยาก |
| **1 สัญญา / 1 ชิ้น** | Asset มูลค่าสูง แตกต่างกัน | ยืดหยุ่น, ติดตามชัด | เอกสารเยอะมาก |
| **Lot Contract (กลุ่มตาม Site)** | ติดตั้งหลาย Location | จัดการตาม Site ง่าย | ซับซ้อนเมื่อย้ายของ |

> **แนะนำ:** ใช้ **Master Lease Agreement (MLA)** + **Equipment Schedule** แนบท้าย
> โดย MLA กำหนดเงื่อนไขหลักครั้งเดียว แต่ละ Schedule = 1 batch ของ asset

---

### 11.2 Asset Lifecycle — วงจรชีวิตทรัพย์สินที่ต้องติดตาม

```
[จัดซื้อ] → [ตรวจรับ / QC] → [ส่งมอบ / ติดตั้ง] → [Active Lease]
                                                              ↓
[คืน / Disposal] ← [ตรวจสภาพก่อนคืน] ← [แจ้งเตือนใกล้หมด] ← [บำรุงรักษา]
                                                              ↓
                                          [Renew / Redeploy / ขายซาก]
```

**Status ที่ระบบต้องรองรับ:**

| Status | ความหมาย | Action ที่เกิดขึ้น |
|--------|----------|------------------|
| `AVAILABLE` | พร้อมให้เช่า ยังไม่มีสัญญา | ระบบแสดงใน Available Pool |
| `RESERVED` | จองแล้ว รอส่งมอบ | Lock ไม่ให้ assign ซ้ำ |
| `ACTIVE` | อยู่ระหว่างสัญญา | คิดค่าเช่า, ติดตามการบำรุงรักษา |
| `MAINTENANCE` | ซ่อมบำรุง / อยู่ที่ศูนย์ | หยุดค่าเช่าชั่วคราว (ถ้าสัญญากำหนด) |
| `RETURNED` | รับคืนแล้ว รอตรวจสภาพ | ยังไม่ Available จนกว่าจะผ่าน QC |
| `DAMAGED` | เสียหายเกินซ่อม | เข้ากระบวนการ Insurance Claim |
| `DISPOSED` | ขายซาก / จำหน่ายแล้ว | ปิด Asset Record |

---

### 11.3 Data Model: สิ่งที่ต้องเก็บต่อ 1 Asset

```
Asset Master:
├── asset_id          (UUID / Internal Code)
├── asset_tag         (QR / Barcode / RFID)
├── serial_number     (Manufacturer Serial)
├── model / brand
├── purchase_date
├── purchase_cost
├── current_book_value
├── residual_value_thb (มูลค่าตกค้างที่ประเมิน)
├── residual_value_pct (% ของราคาต้นทุน)
├── warranty_expiry
├── insurance_policy_no
├── insurance_expiry
└── status            (AVAILABLE / ACTIVE / MAINTENANCE / ...)

Asset Location (ต่อ 1 Asset มีได้หลาย record ตามเวลา):
├── lessee_id
├── site_name / address
├── gps_lat / gps_lng
├── installed_date
└── removed_date

Lease Assignment (เชื่อม Asset กับ Contract):
├── contract_id
├── asset_id
├── schedule_no       (Equipment Schedule ที่)
├── start_date
├── end_date
├── monthly_rent_thb
└── end_of_term_option (RETURN / RENEW / PURCHASE)
```

---

### 11.4 การจัดการค่าเช่า — Fleet Billing

เมื่อมี asset 10–100 ชิ้นในสัญญาเดียว การออกใบแจ้งหนี้มี 2 รูปแบบ:

**รูปแบบ A: Consolidated Invoice (แนะนำ)**
```
ใบแจ้งหนี้ 1 ใบ / เดือน / ลูกค้า
รวมค่าเช่าทุก Asset ไว้ด้วยกัน
แนบ Asset Detail List เป็น Attachment
```

**รูปแบบ B: Per-Asset Invoice**
```
ใบแจ้งหนี้แยก / Asset
เหมาะเมื่อลูกค้าต้องการแยก Cost Center ตาม Asset
```

**สิ่งที่ระบบต้องรองรับ:**
- Pro-rata billing เมื่อ asset เริ่ม/คืนกลางเดือน
- หยุดเก็บค่าเช่า Asset ที่อยู่ใน Maintenance (ถ้าสัญญากำหนด)
- Replacement Asset — เก็บค่าเช่าต่อเนื่องโดยไม่ขาด
- Credit Note เมื่อ asset เสียหายและอยู่ระหว่าง Insurance Claim

---

### 11.5 Maintenance Management — Fleet Scale

**ปัญหาหลักเมื่อมีหลาย Asset:**
- Preventive Maintenance (PM) ที่แตกต่างกันตาม model และอายุการใช้งาน
- ต้องส่ง Technician ไปหลาย Site ต้องวางแผน Route

**โครงสร้างที่แนะนำ:**

```
Maintenance Plan (Master):
├── asset_type / model
├── pm_interval_months  (เช่น ทุก 6 เดือน)
├── pm_checklist        (รายการตรวจ)
└── estimated_cost

Maintenance Record (ต่อครั้ง):
├── asset_id
├── type: PM / CM (Corrective) / Emergency
├── scheduled_date / actual_date
├── technician_id
├── cost_thb
├── parts_used
├── before_photo / after_photo
├── result: PASS / FAIL / PENDING_PARTS
└── next_pm_date

Work Order Queue (สำหรับ Dispatcher):
├── วันนัดหมาย
├── Technician ที่รับผิดชอบ
├── Site / Address
├── Asset Tag ที่ต้องดูแล
└── Route Optimization (ถ้ามีหลาย Site ใกล้กัน)
```

---

### 11.6 Asset Substitution — เปลี่ยน Asset กลางสัญญาโดยไม่ต้องทำสัญญาใหม่

**หลักการสำคัญ: สัญญาไม่เปลี่ยน — เฉพาะ Asset ที่เปลี่ยน**

เมื่อ asset เสียหาย / สูญหาย / ชำรุดซ่อมไม่ได้ระหว่างอายุสัญญา ระบบต้องรองรับ **Asset Substitution** คือสลับ Serial Number โดยที่ contract_id, เงื่อนไข, ค่าเช่า ยังคงเดิมทั้งหมด

```
สัญญาเลขที่: OL-2026-00123  (คงเดิม ไม่เปลี่ยน)
├── Schedule A: Asset 50 ชิ้น
│   ├── SN-001  ✅ ACTIVE
│   ├── SN-002  ✅ ACTIVE
│   ├── SN-015  ❌ DAMAGED → สลับเป็น SN-NEW01  ✅ ACTIVE
│   ├── SN-031  ✅ ACTIVE
│   └── ...
└── เงื่อนไข / ค่าเช่า / วันหมดสัญญา: ไม่เปลี่ยนแปลง
```

---

#### 11.6.1 Scenarios และวิธีจัดการ

| Scenario | ต้องทำอะไร | ทำสัญญาใหม่? | เปลี่ยน Invoice? |
|----------|-----------|-------------|----------------|
| **Asset เสียระหว่างสัญญา — ซ่อมได้** | Work Order ซ่อม → ไม่มีอะไรเปลี่ยน | ❌ ไม่ | ❌ ไม่ |
| **Asset เสียระหว่างสัญญา — ซ่อมไม่ได้** | Substitute ด้วย asset ใหม่ (SN ใหม่) | ❌ ไม่ | ❌ ไม่ (ค่าเช่าเดิม) |
| **Asset สูญหาย / ถูกขโมย** | Insurance Claim + Substitute | ❌ ไม่ | ❌ ไม่ |
| **ลูกค้าต้องการลด Fleet กลางสัญญา** | Partial Early Termination (ต้องคำนวณค่าปรับ) | 📝 Amendment | ✅ ปรับลง |
| **ลูกค้าต้องการเพิ่ม Asset** | Add-on Schedule แนบท้าย MLA เดิม | 📝 New Schedule | ✅ เพิ่มขึ้น |
| **Asset ครบสัญญา ต่อบางชิ้น** | Selective Renewal ต่อชิ้นที่ต้องการ | 📝 Renewal Schedule | ✅ ปรับตาม |

---

#### 11.6.2 Asset Substitution Record — Data Model

```
Asset Substitution Log:
├── substitution_id       (UUID)
├── contract_id           (เชื่อมสัญญาเดิม)
├── original_asset_id     (SN ที่เสียหาย → Status → DAMAGED/DISPOSED)
├── replacement_asset_id  (SN ใหม่ → Status → ACTIVE)
├── substitution_date
├── reason                (DAMAGED / LOST / STOLEN / UPGRADE)
├── damage_report_ref     (เชื่อมไปยัง Damage Report)
├── insurance_claim_ref   (เชื่อมไปยัง Claim No.)
├── approved_by
└── remark
```

**กฎสำคัญของระบบ:**
- ค่าเช่าไม่เปลี่ยนแปลง (เพราะ lease rate ผูกกับ contract ไม่ใช่ asset)
- วันหมดสัญญาไม่เปลี่ยนแปลง (replacement asset ใช้วันเดิม)
- ประวัติ original asset ยังคงอยู่ — ไม่ลบ เพียงเปลี่ยน status
- Audit Trail ต้องบันทึกว่าใครอนุมัติการสลับ

---

#### 11.6.3 กระบวนการเมื่อ Asset เสียหาย (Damage Flow)

```
[ลูกค้าแจ้งปัญหา]
       ↓
[Technician ตรวจสภาพ On-site]
       ↓
    ซ่อมได้? ──────── YES ──→ [ออก Work Order ซ่อม] → จบ
       │
      NO
       ↓
[ประเมินมูลค่าความเสียหาย]
       ↓
    ≤ ขีดจำกัด Insurance? ── YES ──→ [เปิด Insurance Claim]
       │                                      ↓
      NO                          [รับค่าสินไหมทดแทน]
       ↓                                      ↓
[ลูกค้ารับผิดชอบค่าซ่อม]              ↓
       │                        [จัดหา Replacement Asset]
       └──────────────────────────────↓
                              [Asset Substitution Record]
                                      ↓
                              [ส่งมอบ Asset ใหม่]
                                      ↓
                              [สัญญาดำเนินต่อปกติ]
```

---

#### 11.6.4 Partial Early Termination — ยกเลิกบางชิ้น กลางสัญญา

กรณีลูกค้าต้องการลด Fleet (เช่น ปิดสาขา 1 จาก 10):

**สิ่งที่ระบบต้องคำนวณ:**

```
Early Termination Fee (ต่อ 1 Asset):
= Σ (ค่าเช่าที่เหลือทุกงวด) × Discount Factor
+ ค่าดำเนินการ (Admin Fee)
- มูลค่าตกค้างที่ได้คืน (Residual Value)

ตัวอย่าง:
- ค่าเช่า/เดือน: 2,000 บาท
- เหลืออีก: 18 งวด
- Discount Rate: 5% ต่อปี
- PV ค่าเช่าที่เหลือ: ~34,500 บาท
- Residual Value ณ วันนั้น: ~2,000 บาท
- ETF ≈ 34,500 - 2,000 = 32,500 บาท + Admin Fee
```

**เอกสารที่ต้องออก:**
- Contract Amendment (ระบุ asset ที่ยกเลิก + ETF)
- Debit Note ค่า ETF
- Invoice ปรับลดค่าเช่าตั้งแต่เดือนถัดไป

---

#### 11.6.5 Selective Renewal — ต่ออายุบางชิ้นเมื่อสัญญาครบ

**สถานการณ์:** สัญญา 50 ชิ้น ครบกำหนด ลูกค้าต้องการ:
- ต่อ 30 ชิ้น (ยังใช้งานอยู่)
- คืน 15 ชิ้น (ไม่ต้องการแล้ว)
- ซื้อ 5 ชิ้น (ใช้ดีอยากได้ต่อ)

**Flow ของระบบ:**

```
[แจ้งเตือนล่วงหน้า 90 วัน]
       ↓
[ลูกค้าแจ้งความประสงค์ต่อ Asset — รายชิ้น]
  Asset 1-30  → RENEW
  Asset 31-45 → RETURN
  Asset 46-50 → PURCHASE
       ↓
[ระบบสร้าง 3 Workflow พร้อมกัน]
  ┌─────────────────────────────────────┐
  │ RENEW: ออก New Schedule แนบ MLA เดิม│  ← ค่าเช่าใหม่ (อาจปรับตาม RV ใหม่)
  │ RETURN: นัด Inspection + รับคืน    │  ← ตรวจสภาพ + คืน Security Deposit
  │ PURCHASE: ออกใบแจ้งหนี้ Residual   │  ← ลูกค้าจ่ายครั้งเดียว = ได้กรรมสิทธิ์
  └─────────────────────────────────────┘
```

**ข้อมูลที่ระบบต้องแสดงให้ลูกค้าตัดสินใจ:**

| Asset | อายุใช้งาน | สภาพ | ค่าเช่าเดิม | ค่าเช่าใหม่ (ถ้าต่อ) | Residual Value (ถ้าซื้อ) |
|-------|-----------|------|------------|---------------------|------------------------|
| SN-001 | 36 เดือน | ดี | 2,000 | 1,400 | 1,500 |
| SN-015 | 36 เดือน | ปานกลาง | 2,000 | 1,200 | 800 |
| SN-031 | 36 เดือน | ดี | 2,000 | 1,400 | 1,500 |

> ค่าเช่าใหม่ลดลงเพราะ asset เสื่อมราคาแล้ว → จูงใจให้ลูกค้าต่อสัญญา

---

### 11.7 Return & Inspection — Fleet Scale

เมื่อมี asset จำนวนมากคืนพร้อมกัน (เช่น สัญญา 3 ปีครบ):

**ขั้นตอน:**
```
1. แจ้งเตือนล่วงหน้า 90/60/30 วัน (Auto Notification)
2. ลูกค้าแจ้งความประสงค์: Return / Renew / Purchase (ต่อ Asset)
3. นัดตรวจสภาพ (Inspection Appointment)
   - Technician ไปตรวจ On-site
   - บันทึก Condition Report + รูปภาพ
4. ประเมินความเสียหาย (Damage Assessment)
   - Fair Wear & Tear = ไม่คิดเพิ่ม
   - Excess Damage = ออก Debit Note แจ้งลูกค้า
5. รับคืน Asset → เปลี่ยน Status เป็น RETURNED
6. QC ที่โกดัง → เปลี่ยนเป็น AVAILABLE หรือ MAINTENANCE
7. คืนเงินประกัน (Security Deposit) หักค่าเสียหาย (ถ้ามี)
```

**Inspection Checklist ตัวอย่าง (Water Purifier):**
```
[ ] สภาพภายนอก (รอยขีด / บุบ / แตก)
[ ] ระบบกรองน้ำทำงานปกติ
[ ] ไส้กรองถูกเปลี่ยนตามกำหนด
[ ] ท่อน้ำและข้อต่อไม่รั่วซึม
[ ] ระบบไฟฟ้าปลอดภัย
[ ] ความสะอาดภายใน/ภายนอก
[ ] อุปกรณ์ครบตามที่ส่งมอบ
```

---

### 11.8 Dashboard & Reporting — Fleet Management

**KPI หลักที่ต้องแสดง:**

```
Portfolio Overview:
├── Total Assets Under Management: XXX ชิ้น
├── Active: XX% | Maintenance: X% | Available: X% | Returned: X%
├── Total Monthly Revenue (MRR): X,XXX,XXX บาท
└── Avg. Asset Utilization Rate: XX%

Expiry Monitoring:
├── หมดสัญญาใน 30 วัน: XX ชิ้น
├── หมดสัญญาใน 60 วัน: XX ชิ้น
├── หมดสัญญาใน 90 วัน: XX ชิ้น
└── Renewal Rate (ประวัติ): XX%

Financial:
├── Outstanding Receivables: X,XXX,XXX บาท
├── Overdue > 30 days: XX ราย
├── Total Residual Value (Fleet): XX,XXX,XXX บาท
└── Expected End-of-Term Revenue (Purchase Option)

Maintenance:
├── PM Completion Rate: XX% (ตามแผน)
├── Avg. Repair Cost per Asset/Year: X,XXX บาท
├── Assets ใน Maintenance: XX ชิ้น
└── Upcoming PM ใน 30 วัน: XX ชิ้น
```

---

### 11.9 สรุป: ความต้องการระบบ (System Requirements) เพิ่มเติม สำหรับ Fleet

| Module | Feature | Priority |
|--------|---------|----------|
| Asset Registry | Master Data + Status Lifecycle | P1 |
| Contract-Asset Mapping | Many-to-Many (Asset ↔ Contract) | P1 |
| **Asset Substitution** | **สลับ Serial Number โดยไม่ทำสัญญาใหม่** | **P1** |
| **Partial Early Termination** | **คำนวณ ETF + ปรับ Invoice รายชิ้น** | **P1** |
| Fleet Billing | Consolidated Invoice + Pro-rata | P1 |
| Expiry Alert | Auto-notification 90/60/30 วัน | P1 |
| **Selective Renewal** | **ต่ออายุ / คืน / ซื้อ แบบรายชิ้นในสัญญาเดียว** | **P1** |
| Maintenance Scheduling | PM Plan + Work Order | P2 |
| Return Inspection | Checklist + Photo Upload | P2 |
| Damage Assessment | ประเมินค่าเสียหาย + Debit Note | P2 |
| Insurance Claim Workflow | เปิด Claim + ติดตามสถานะ + เชื่อม Substitution | P2 |
| Fleet Dashboard | KPI + Utilization Report | P2 |
| Asset Tracking | QR Code / RFID (Scan ตอน Delivery/Return) | P3 |
| Route Optimization | วางแผนเส้นทาง Technician | P3 |
| Mobile App (Technician) | Inspection + Work Order บนมือถือ | P3 |

---

---

## 12. วิเคราะห์ OL-PD14 Input Sheet — Field Mapping กับระบบ

เอกสาร **OL-PD14 No-OPT Input Sheet** คือ **Pricing Quotation Sheet** ที่ใช้คำนวณ
ค่าเช่ารายเดือนก่อนทำสัญญาจริง โดยใน 1 Sheet มี 6 กลุ่ม Input ดังนี้:

---

### 12.1 กลุ่ม A — ข้อมูล Asset (Vehicle)

| Field ใน Sheet | ค่าตัวอย่าง | Input/Calc | Field ในระบบ |
|----------------|------------|-----------|--------------|
| Customer Name | BUSINESS DEVELOPMENT | **Input** | lessee_company_name |
| Contact Name | Weerachat | **Input** | contact_person_name |
| Quote Number | 130174/A12 | Auto-gen | quotation_no |
| Vehicle | Toyota Camry 2.5 HEV | **Input** → เลือกจาก catalog | asset_model_id |
| Model Year | 24 | ดึงจาก catalog | asset_year |
| New/Used | NEW | **Input** | asset_condition |
| Car/Comm | CAR | ดึงจาก catalog | asset_category |
| INS GRP | 2 | ดึงจาก catalog → ใช้คำนวณประกัน | insurance_group |
| Effective Date | 16/07/2025 | **Input** | quotation_date |
| Valid From/To | 16/07 – 30/07/2025 | **Input** | quotation_valid_until |

---

### 12.2 กลุ่ม B — ข้อมูลราคารถ (Pricing Information)

> **หมายเหตุจากเอกสาร:** มีหมายเหตุเขียนมือว่า "ไม่เอา VAT" และ "ยกเลิก RV ค่า Input ส่วน VAT" → ระบบต้องมี toggle **Include/Exclude VAT** ในการคำนวณ

| Field ใน Sheet | ค่าตัวอย่าง | Input/Calc | Field ในระบบ |
|----------------|------------|-----------|--------------|
| Vehicle Basic (Original) | 1,559,813.08 | ดึงจาก Price List | asset_list_price |
| Vehicle Basic (Current) | 1,559,813.08 | **Input** (อาจต่างจาก List) | asset_selling_price |
| Vehicle Discount | 50,000.00 | **Input** | discount_amount |
| Pre VAT Price (NSP) | 1,509,813.08 | **Calc** = Basic - Discount | pre_vat_price |
| VAT (7%) | 105,686.92 | **Calc** | vat_amount |
| Registration Fee | 9,696.00 | **Input** / ดึงจาก Rate Table | registration_fee |
| RST Service Reg Fee | 8,000.00 | **Input** | rst_service_fee |
| On The Road (OTR) | 1,633,196.00 | **Calc** = Pre VAT + VAT + Reg | on_road_price |
| Reclaimed VAT | 105,686.92 | **Calc** (ถ้า lessee เป็น VAT registered) | reclaimed_vat |
| NSP (Net Selling Price) | 1,527,509.08 | **Calc** = OTR - Reclaimed VAT | net_selling_price |
| OTD / RP | 1,669,000.00 | **Input** (ราคาที่ลูกค้าเห็น) | otd_price |

---

### 12.3 กลุ่ม C — Contract Parameters (พารามิเตอร์สัญญา)

> **นี่คือ "หัวใจ" ของการคำนวณ** — ทุก field ส่งผลต่อ monthly rental โดยตรง

| Field ใน Sheet | ค่าตัวอย่าง | Input/Calc | Field ในระบบ |
|----------------|------------|-----------|--------------|
| Annual Mileage | 40,000 km | **Input** | annual_mileage_km |
| Contract Mileage | 200,000 km | **Calc** = Annual × Term/12 | total_contract_mileage |
| Payment Frequency | Monthly | **Input** | payment_frequency |
| Contract Term | **60 เดือน** | **Input** | contract_term_months |
| Number of Payments | 60 | **Calc** = Term × Frequency | total_payments |
| Payments in Advance | 0 | **Input** | payments_in_advance |
| Own Payment | 0.00 | **Input** (Down Payment) | down_payment |
| Security Deposit | 0.00 | **Input** | security_deposit |
| Payment Profile | T00 | **Input** → เลือก Profile | payment_profile_code |
| VAT Reclaimed | Y | **Input** (Yes/No) | is_vat_registered |

---

### 12.4 กลุ่ม D — Services Package (ชุดบริการ)

> **สำคัญมาก:** Operating Lease รถยนต์ **รวมบริการ** ไว้ในค่าเช่า ต่างจากที่เราคุยกัน
> ก่อนหน้า — ต้องออกแบบ Package Builder ที่ให้เลือก/ไม่เลือกแต่ละบริการได้

| Service | Monthly Cost | Total (60M) | Input/Calc |
|---------|-------------|-------------|-----------|
| **Repairs** | 566.67 | 34,000 | **Input** (ประมาณการ) |
| **Servicing** (7 ครั้ง) | 933.33 | 56,000 | **Input** → คำนวณจากจำนวนครั้ง × ราคา |
| **Tyres** | 2,166.67 | 130,000 | **Input** → จำนวนชุด × ราคา |
| **Registration Fee** | 646.40 | 38,784 | **Calc** จาก Reg Fee ÷ Term |
| **Admin Cost: PD14** | 140.00 | 8,400 | ดึงจาก Package Rate |
| **Labor: Insurance** | 90.00 | 13,800 | **Calc** |
| **Labor: Maintenance** | 200.00 | 25,800 | **Input** |
| **Labor: Relief Vehicle** | 260.00 | 41,400 | **Input** (รถทดแทน) |
| **Labor: Procurement** | 40.00 | 43,800 | ดึงจาก Rate |
| **Labor: Roadside PD13-22** | 40.00 | 46,200 | ดึงจาก Rate |
| **Services Total** | **5,219.50** | **351,954** | **Calc** |

**Fields ที่ระบบต้องมี:**
```
maintenance_pack_code: "PD14"        ← เลือก Package
hire_group: "D"                      ← กำหนด Rate ตามกลุ่มรถ
include_repairs: true/false
include_servicing: true/false  → จำนวนครั้ง
include_tyres: true/false      → จำนวนชุด
include_relief_vehicle: true/false
include_roadside: true/false
```

---

### 12.5 กลุ่ม E — Finance Scheme + Residual Value

> **Residual Value (RV) = มูลค่าตกค้างท้ายสัญญา** — นี่คือสิ่งที่ทำให้ OL ต่างจาก HP มากที่สุด
> RV สูง → ค่าเสื่อมราคาต่อเดือนต่ำ → ค่าเช่าต่ำลง

| Field ใน Sheet | ค่าตัวอย่าง | Input/Calc | Field ในระบบ |
|----------------|------------|-----------|--------------|
| Base Rate | 3.50% | ดึงจาก Funding Rate Table | base_interest_rate |
| Margin | 4.00% | **Input** (กำหนดโดยบริษัท) | margin_rate |
| Total Rate | **7.50%** | **Calc** = Base + Margin | total_interest_rate |
| Quoted RV (Vehicle) | 618,000.00 | **Input** / ดึงจาก RV Table | residual_value_thb |
| % MRP | 37% | **Calc** = RV ÷ OTD Price | residual_value_pct |
| RV with VAT | 618,000.00 | **Calc** | rv_with_vat |
| RV net VAT | 577,570.00 | **Calc** = RV ÷ 1.07 | rv_net_vat |
| Depreciation (total) | 949,938.99 | **Calc** = NSP - RV net VAT | total_depreciation |

**หมายเหตุจากเอกสาร:** มีการเขียนมือ "% RV ต่อ Showroom price ← 0%" ในช่อง Database RV Adjustment → ระบบต้องมีช่อง **Manual RV Override** ที่ override ค่าจาก database ได้

---

### 12.6 กลุ่ม F — Payments Summary (ผลลัพธ์การคำนวณ)

> **กลุ่มนี้เป็น Output ทั้งหมด** — ระบบต้องคำนวณให้อัตโนมัติ ไม่ให้ user กรอกเอง

| Payment Component | Monthly | Contract Total | สูตร |
|-------------------|---------|---------------|------|
| **Depreciation** | 15,832.32 | 949,938.99 | (NSP - RV net VAT) ÷ Term |
| Finance Maintenance | 646.40 | 38,784.00 | Reg Fee ÷ Term |
| **Finance Profit** | 6,812.33 | 408,739.51 | คำนวณจาก Total Rate × ยอดเงิน |
| Insurance | 3,521.67 | 211,300.00 | Insurance Premium ÷ 12 |
| **Financial Rental** | **26,166.31** | **1,569,978.60** | รวม Finance components |
| Services Maintenance | 5,219.50 | 313,170.00 | รวม Services |
| Maintenance Rental | **5,865.90** | **351,954.00** | Services + VAT |
| **TOTAL (before VAT)** | **32,032.21** | **1,921,932.60** | Financial + Maintenance |
| **TOTAL INC VAT** | **34,274.46** | **2,056,467.88** | Total × 1.07 |

**ค่าที่ระบบต้องแสดงแยกชัดเจน:**
```
financial_rental_monthly:     26,166.31   ← ส่วนการเงิน
maintenance_rental_monthly:    5,865.90   ← ส่วนบริการ
total_rental_excl_vat:        32,032.21
vat_amount:                    2,242.25
total_rental_incl_vat:        34,274.46   ← ที่ลูกค้าจ่ายจริง
```

---

### 12.7 สรุป: Fields ที่ต้องมีใน "ใบคำขอ OL" (จาก Input Sheet)

```
Section 1: Asset Info
  □ เลือกรุ่นรถ / ราคา List / ส่วนลด
  □ New/Used, Model Year, Insurance Group
  □ On-Road Price, Reclaimed VAT Toggle

Section 2: Contract Parameters
  □ Contract Term (เดือน)
  □ Annual Mileage
  □ Down Payment / Security Deposit
  □ Payment Profile
  □ VAT Registered (Y/N)

Section 3: Services Package
  □ เลือก Maintenance Pack (PD14 / PD13 / ฯลฯ)
  □ Hire Group (กำหนด Rate)
  □ Toggle แต่ละ service: Repairs / Servicing / Tyres / Roadside / Relief

Section 4: Finance
  □ Base Rate (ดึงจาก system)
  □ Margin (กรอก / อนุมัติ)
  □ Residual Value (ดึงจาก RV Table / Manual Override)
  □ RV % ปรับได้

Section 5: OUTPUT (คำนวณอัตโนมัติ — ห้ามกรอกเอง)
  □ Financial Rental / Month
  □ Maintenance Rental / Month
  □ Total Rental inc VAT / Month
  □ Total Contract Value
  □ Depreciation Total
  □ Finance Profit Total
```

---

### 12.8 ประเด็นพิเศษที่พบจากเอกสาร

**1. Toggle "ไม่เอา VAT" ในการคำนวณ RV**
หมายเหตุเขียนมือระบุว่าต้องการยกเลิก VAT ออกจาก Input บางส่วน → ระบบต้องมี
`calculation_mode: WITH_VAT / WITHOUT_VAT` ที่สลับได้ต่อ Quotation

**2. Financial Rental vs. Maintenance Rental แยกกัน**
ลูกค้าบางรายต้องการแยก invoice — Finance จาก Leasing Co. / Maintenance จาก Service Co.
→ ระบบต้องรองรับการออก **2 ใบแจ้งหนี้แยก** ต่อ 1 สัญญา

**3. Hire Group กำหนด Rate ทั้งหมด**
Hire Group "D" ดึง Rate ของ Repairs, Servicing, Tyres โดยอัตโนมัติ
→ ต้องมี **Rate Table Master** แยกตาม Hire Group และ Maintenance Pack

**4. Manual RV Override**
ต้องให้ Credit/Finance Team override RV จาก Database ได้ พร้อม Approval Workflow
เพราะ RV ส่งผลต่อค่าเช่ารายเดือนโดยตรง

**5. "สำหรับลูกค้า นก/กรม" — ราคาพิเศษสำหรับหน่วยงานรัฐ**
→ ระบบต้องมี **Customer Segment Pricing** (Corporate / Government / SME)
ที่ให้ discount / rate พิเศษต่างกัน

---

## ภาคผนวก: ความแตกต่างทางกฎหมาย / ภาษี

| ประเด็น | HP | OL B2B |
|---------|-----|--------|
| กฎหมายที่บังคับใช้ | ป.พ.พ. มาตรา 572-574 (เช่าซื้อ) | ป.พ.พ. มาตรา 537 (เช่าทรัพย์) |
| การบันทึกบัญชีผู้เช่า | บันทึกเป็นสินทรัพย์ตั้งแต่ต้น | IFRS 16: บันทึก ROU Asset + Lease Liability |
| ภาษีมูลค่าเพิ่ม | VAT บนค่างวด | **VAT บนค่าเช่าทุกงวด** (ออกใบกำกับภาษีทุกเดือน) |
| ภาษีหัก ณ ที่จ่าย | ไม่มี | **หัก ณ ที่จ่าย 5%** (ถ้าผู้เช่าเป็นนิติบุคคล) |
| การโอนความเสี่ยง | โอนทันทีเมื่อส่งมอบ | **ไม่โอน** — ผู้ให้เช่ายังเป็นเจ้าของและรับความเสี่ยง |
| Stamp Duty | ตามอัตราเช่าซื้อ | ตามอัตราสัญญาเช่า (0.1% ของค่าเช่าตลอดสัญญา) |
