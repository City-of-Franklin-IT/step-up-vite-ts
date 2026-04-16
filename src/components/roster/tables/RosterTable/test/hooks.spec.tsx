import { renderHook } from "@testing-library/react"
import { useOrderRanks } from "../hooks"
import type { RosterItemType } from "../../../context"

const makeRosterItem = (rankAbrv: "FF" | "ENG" | "OFF" | "BC", staffStart = "2024-01-15T07:00:00Z"): RosterItemType => ({
  employeeId: `emp-${ rankAbrv }-${ staffStart }`,
  name: `${ rankAbrv } Employee`,
  station: "S1",
  shift: "A",
  unit: "E1FK",
  rank: rankAbrv === "FF" ? "FireF" : rankAbrv === "ENG" ? "FireE" : rankAbrv === "OFF" ? "FireLT" : "Fire Captain",
  rankAbrv,
  shiftStart: "2024-01-15T07:00:00Z",
  shiftEnd: "2024-01-15T19:00:00Z",
  staffStart,
  staffEnd: "2024-01-15T19:00:00Z",
  isParamedic: false
})

describe("useOrderRanks", () => {
  it("sorts by rank priority: BC → OFF → ENG → FF", () => {
    const rosters = [
      makeRosterItem("FF"),
      makeRosterItem("BC"),
      makeRosterItem("ENG"),
      makeRosterItem("OFF")
    ]
    const { result } = renderHook(() => useOrderRanks(rosters))
    const rankOrder = result.current.map(r => r.rankAbrv)
    expect(rankOrder).toEqual(["BC", "OFF", "ENG", "FF"])
  })

  it("sorts same rank by staffStart ascending", () => {
    const rosters = [
      makeRosterItem("FF", "2024-01-15T12:00:00Z"),
      makeRosterItem("FF", "2024-01-15T07:00:00Z"),
      makeRosterItem("FF", "2024-01-15T10:00:00Z")
    ]
    const { result } = renderHook(() => useOrderRanks(rosters))
    const starts = result.current.map(r => r.staffStart)
    expect(starts).toEqual([
      "2024-01-15T07:00:00Z",
      "2024-01-15T10:00:00Z",
      "2024-01-15T12:00:00Z"
    ])
  })

  it("returns a single-entry roster unchanged", () => {
    const rosters = [makeRosterItem("ENG")]
    const { result } = renderHook(() => useOrderRanks(rosters))
    expect(result.current).toHaveLength(1)
    expect(result.current[0].rankAbrv).toBe("ENG")
  })
})
