import { filterQualified } from "../utils"
import * as AppTypes from "@/context/App/AppTypes"

const makeStaff = (rank: AppTypes.RankType, hours: number, shift: AppTypes.ShiftType | null = "A"): AppTypes.StaffInterface => ({
  employeeId: "001",
  rank,
  fullName: "Test Employee",
  skills: "",
  phone: "555-1234",
  email: "test@test.com",
  shift,
  StepUps: [{ detailCode: "ENG", hours }],
  Schedules: []
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
      Schedules: []
    }
    const result = filterQualified([employee], "Engineer")
    expect(result).toHaveLength(1)
    expect(result[0].hours).toBe(72)
  })
})
