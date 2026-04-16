import { render, screen } from "@testing-library/react"
import RosterTable from "../index"
import type { RosterItemType } from "../../../context"

const makeRosterItem = (rankAbrv: "FF" | "ENG" | "OFF" | "BC", name: string): RosterItemType => ({
  employeeId: `emp-${ name }`,
  name,
  station: "S1",
  shift: "A",
  unit: "E1FK",
  rank: rankAbrv === "FF" ? "FireF" : rankAbrv === "ENG" ? "FireE" : rankAbrv === "OFF" ? "FireLT" : "Fire Captain",
  rankAbrv,
  shiftStart: "2024-01-15T07:00:00Z",
  shiftEnd: "2024-01-15T19:00:00Z",
  staffStart: "2024-01-15T07:00:00Z",
  staffEnd: "2024-01-15T19:00:00Z",
  isParamedic: false
})

describe("RosterTable", () => {
  it("renders the unit label", () => {
    render(<RosterTable rosters={[makeRosterItem("FF", "Smith")]} label="E1FK" />)
    expect(screen.getByText("E1FK")).toBeInTheDocument()
  })

  it("renders employee names", () => {
    const rosters = [makeRosterItem("FF", "Smith"), makeRosterItem("ENG", "Jones")]
    render(<RosterTable rosters={rosters} label="E1FK" />)
    expect(screen.getByText("Smith")).toBeInTheDocument()
    expect(screen.getByText("Jones")).toBeInTheDocument()
  })

  it("renders rank abbreviation in each row", () => {
    render(<RosterTable rosters={[makeRosterItem("ENG", "Jones")]} label="E1FK" />)
    expect(screen.getByText("ENG")).toBeInTheDocument()
  })

  it("renders a paramedic indicator for paramedic employees", () => {
    const paramedicRoster: RosterItemType = { ...makeRosterItem("FF", "Davis"), isParamedic: true }
    render(<RosterTable rosters={[paramedicRoster]} label="E1FK" />)
    expect(screen.getByTitle("Paramedic")).toBeInTheDocument()
  })
})
