import { filterQualified, getQualifyingShifts } from "../utils"
import * as AppTypes from "@/context/App/AppTypes"

const makeSchedule = (overrides: Partial<AppTypes.ScheduleInterface> = {}): AppTypes.ScheduleInterface => ({
  startDate: "2024-01-15",
  startTime: "2024-01-15T08:00:00Z",
  endDate: "2024-01-15",
  endTime: "2024-01-15T16:00:00Z",
  hours: 8,
  detailCode: "ENG",
  ...overrides
})

const makeStaff = (rank: AppTypes.RankType, hours: number, shift: AppTypes.ShiftType | null = "A"): AppTypes.StaffInterface => ({
  employeeId: "001",
  rank,
  fullName: "Test Employee",
  skills: "",
  phone: "555-1234",
  email: "test@test.com",
  shift,
  StepUps: [{ detailCode: "ENG", hours }],
  Schedules: [],
  QualifyingSchedules: []
})

describe("filterQualified", () => {
  it("returns Firefighters with >= 72 hours for the Engineer filter", () => {
    const staff = [
      makeStaff("Firefighter", 72),
      makeStaff("Firefighter", 71),
      makeStaff("Engineer", 100)
    ]
    const result = filterQualified(staff, "Engineer")
    expect(result).toHaveLength(1)
    expect(result[0].rank).toBe("Firefighter")
  })

  it("returns Firefighters and Engineers for the Lieutenant filter", () => {
    const staff = [
      makeStaff("Firefighter", 80),
      makeStaff("Engineer", 80),
      makeStaff("Lieutenant", 100)
    ]
    expect(filterQualified(staff, "Lieutenant")).toHaveLength(2)
  })

  it("returns Lieutenants with >= 72 hours for the Captain filter", () => {
    const staff = [makeStaff("Lieutenant", 72), makeStaff("Firefighter", 100)]
    const result = filterQualified(staff, "Captain")
    expect(result).toHaveLength(1)
    expect(result[0].rank).toBe("Lieutenant")
  })

  it("returns Captains with >= 72 hours for the BC filter", () => {
    const staff = [makeStaff("Captain", 72), makeStaff("Lieutenant", 100)]
    const result = filterQualified(staff, "BC")
    expect(result).toHaveLength(1)
    expect(result[0].rank).toBe("Captain")
  })

  it("excludes employees with fewer than 72 total hours", () => {
    const staff = [makeStaff("Firefighter", 71)]
    expect(filterQualified(staff, "Engineer")).toHaveLength(0)
  })

  it("sums hours across multiple StepUps entries", () => {
    const employee: AppTypes.StaffInterface = {
      employeeId: "002",
      rank: "Firefighter",
      fullName: "Multi Hour",
      skills: "",
      phone: "",
      email: "",
      shift: "A",
      StepUps: [{ detailCode: "ENG", hours: 40 }, { detailCode: "ENG", hours: 32 }],
      Schedules: [],
      QualifyingSchedules: []
    }
    const result = filterQualified([employee], "Engineer")
    expect(result).toHaveLength(1)
    expect(result[0].hours).toBe(72)
  })

  it("carries the computed qualifying shifts through onto the result", () => {
    const employee: AppTypes.StaffInterface = {
      employeeId: "003",
      rank: "Firefighter",
      fullName: "Qualifying Shifts Employee",
      skills: "",
      phone: "",
      email: "",
      shift: "A",
      StepUps: [{ detailCode: "ENG", hours: 80 }],
      Schedules: [],
      QualifyingSchedules: [
        makeSchedule({ startTime: "2024-01-01T08:00:00Z", hours: 40 }),
        makeSchedule({ startTime: "2024-01-08T08:00:00Z", hours: 40 }),
        makeSchedule({ startTime: "2024-01-15T08:00:00Z", hours: 40 })
      ]
    }
    const result = filterQualified([employee], "Engineer")
    expect(result).toHaveLength(1)
    expect(result[0].QualifyingSchedules).toHaveLength(2)
  })
})

describe("getQualifyingShifts", () => {
  it("returns an empty array when there are no schedules", () => {
    expect(getQualifyingShifts([])).toEqual([])
  })

  it("includes all shifts when their hours never reach 72", () => {
    const schedules = [
      makeSchedule({ startTime: "2024-01-01T08:00:00Z", hours: 20 }),
      makeSchedule({ startTime: "2024-01-08T08:00:00Z", hours: 20 })
    ]
    expect(getQualifyingShifts(schedules)).toHaveLength(2)
  })

  it("includes shifts up through the one that reaches exactly 72 hours", () => {
    const schedules = [
      makeSchedule({ startTime: "2024-01-01T08:00:00Z", hours: 40 }),
      makeSchedule({ startTime: "2024-01-08T08:00:00Z", hours: 32 })
    ]
    expect(getQualifyingShifts(schedules)).toHaveLength(2)
  })

  it("excludes shifts after cumulative hours cross 72", () => {
    const schedules = [
      makeSchedule({ startTime: "2024-01-01T08:00:00Z", hours: 40 }),
      makeSchedule({ startTime: "2024-01-08T08:00:00Z", hours: 40 }),
      makeSchedule({ startTime: "2024-01-15T08:00:00Z", hours: 40 })
    ]
    const result = getQualifyingShifts(schedules)
    expect(result).toHaveLength(2)
    expect(result[0].startTime).toBe("2024-01-01T08:00:00Z")
    expect(result[1].startTime).toBe("2024-01-08T08:00:00Z")
  })

  it("sorts shifts oldest-first before accumulating, regardless of input order", () => {
    const schedules = [
      makeSchedule({ startTime: "2024-01-15T08:00:00Z", hours: 40 }),
      makeSchedule({ startTime: "2024-01-01T08:00:00Z", hours: 40 }),
      makeSchedule({ startTime: "2024-01-08T08:00:00Z", hours: 40 })
    ]
    const result = getQualifyingShifts(schedules)
    expect(result).toHaveLength(2)
    expect(result[0].startTime).toBe("2024-01-01T08:00:00Z")
    expect(result[1].startTime).toBe("2024-01-08T08:00:00Z")
  })
})
