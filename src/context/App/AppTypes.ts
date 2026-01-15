export interface StaffInterface {
  employeeId: string
  rank: RankType
  fullName: string
  skills: string
  phone: string
  email: string
  shift: ShiftType | null
  StepUps: StepUpsInterface[]
  Schedules: ScheduleInterface[]
  [key: string]: string | RankType | StepUpsInterface[] | ScheduleInterface[] | ShiftType | null
}

export interface ScheduleInterface {
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  hours: number
  detailCode: string
}

export interface RosterEntryInterface {
  rscEmployeeIDCh: string
  rscMasterNameCh: string
  stationAbrvCh: StationType
  shiftAbrvCh: ShiftType
  physicalUnitAbrvCh: ApparatusType
  posJobAbrvCh: RankAbrvType
  shiftStartDt: string
  shiftEndDt: string
  staffingStartDt: string
  staffingEndDt: string
  rank: RankWFDType
  isParamedic: boolean
}

export interface ServerResponse { // Server response object
  success: boolean
  msg?: string
}

export type RankType =
  | "Firefighter"
  | "Engineer"
  | "Lieutenant"
  | "Captain"
  | "BC"

export type StationType =
  | "S1"
  | "S2"
  | "S3"
  | "S4"
  | "S5"
  | "S6"
  | "S7"
  | "S8"

export type ShiftType =
  | "A"
  | "B"
  | "C"

export type ApparatusType =
  | "A7FK"
  | "B1FK"
  | "B7FK"
  | "BATT1FK"
  | "E10FK"
  | "E11FK"
  | "E1FK"
  | "E2FK"
  | "E6FK"
  | "E7FK"
  | "F10FK"
  | "F3FK"
  | "H6FK"
  | "L11FK"
  | "L3FK"
  | "L4FK"
  | "L5FK"
  | "L8FK"
  | "R2FK"
  | "R5FK"
  | "T10FK"
  | "T1FK"
  | "T2FK"
  | "T6FK"

export type RankAbrvType =
  | "FF"
  | "ENG"
  | "OFF"
  | "BC"

export type RankWFDType =
  | "FireCapt"
  | "FireLT"
  | "FireE"
  | "FireF"

export type DetailCodeType =
  | "ENG"
  | "LT"
  | "CAP"
  | "BC"

interface StepUpsInterface {
  detailCode: DetailCodeType
  hours: number
}