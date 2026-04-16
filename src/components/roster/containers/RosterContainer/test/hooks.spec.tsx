import { renderHook } from "@testing-library/react"
import { useRosterGroups } from "../hooks"

// Types
import * as AppTypes from "@/context/App/AppTypes"

const makeRosterEntry = (station: AppTypes.StationType, unit: AppTypes.ApparatusType, employeeId = "001"): AppTypes.RosterEntryInterface => ({
  rscEmployeeIDCh: employeeId,
  rscMasterNameCh: "Test Employee",
  stationAbrvCh: station,
  shiftAbrvCh: "A",
  physicalUnitAbrvCh: unit,
  posJobAbrvCh: "FF",
  shiftStartDt: "2024-01-15T07:00:00Z",
  shiftEndDt: "2024-01-15T19:00:00Z",
  staffingStartDt: "2024-01-15T07:00:00Z",
  staffingEndDt: "2024-01-15T19:00:00Z",
  rank: "FireF",
  isParamedic: false
})

describe("useRosterGroups", () => {
  it("returns empty array when rosters is undefined", () => {
    const { result } = renderHook(() => useRosterGroups(undefined))
    expect(result.current).toHaveLength(0)
  })

  it("groups entries by station number", () => {
    const rosters = [
      makeRosterEntry("S1", "E1FK", "001"),
      makeRosterEntry("S2", "E2FK", "002")
    ]
    const { result } = renderHook(() => useRosterGroups(rosters))
    const stations = result.current.map(s => s.station)
    expect(stations).toContain("1")
    expect(stations).toContain("2")
  })

  it("groups multiple entries with the same unit together", () => {
    const rosters = [
      makeRosterEntry("S1", "E1FK", "001"),
      makeRosterEntry("S1", "E1FK", "002")
    ]
    const { result } = renderHook(() => useRosterGroups(rosters))
    const station1 = result.current.find(s => s.station === "1")!
    const e1unit = station1.units.find(u => u.unit === "E1FK")!
    expect(e1unit.roster).toHaveLength(2)
  })

  it("sorts stations in ascending numerical order", () => {
    const rosters = [
      makeRosterEntry("S3", "E6FK", "003"),
      makeRosterEntry("S1", "E1FK", "001"),
      makeRosterEntry("S2", "E2FK", "002")
    ]
    const { result } = renderHook(() => useRosterGroups(rosters))
    const stations = result.current.map(s => s.station)
    expect(stations).toEqual(["1", "2", "3"])
  })

  it("excludes entries from stations outside S1–S8", () => {
    const validEntry = makeRosterEntry("S1", "E1FK", "001")
    const invalidEntry: AppTypes.RosterEntryInterface = {
      ...makeRosterEntry("S1", "E1FK", "002"),
      stationAbrvCh: "S9" as AppTypes.StationType
    }
    const { result } = renderHook(() => useRosterGroups([validEntry, invalidEntry]))
    const totalRosters = result.current.flatMap(s => s.units.flatMap(u => u.roster))
    expect(totalRosters).toHaveLength(1)
    expect(totalRosters[0].employeeId).toBe("001")
  })
})
