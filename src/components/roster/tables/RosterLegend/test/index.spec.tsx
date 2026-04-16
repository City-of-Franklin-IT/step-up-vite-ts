import { render, screen } from "@testing-library/react"
import RosterLegend from "../index"

describe("RosterLegend", () => {
  it("renders all four rank/role legend items", () => {
    render(<RosterLegend />)
    expect(screen.getByText("Captain")).toBeInTheDocument()
    expect(screen.getByText("Lieutenant")).toBeInTheDocument()
    expect(screen.getByText("Engineer")).toBeInTheDocument()
    expect(screen.getByText("Paramedic")).toBeInTheDocument()
  })
})
