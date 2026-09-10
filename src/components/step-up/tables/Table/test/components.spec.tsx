import { render, screen } from "@testing-library/react"
import { TableRow } from "../components"

// Types
import type { TableDataType } from "../utils"
import * as AppTypes from "@/context/App/AppTypes"

const makeEmployee = (overrides: Partial<TableDataType> = {}): TableDataType => ({
  employeeId: "001",
  rank: "Firefighter",
  fullName: "Test Employee",
  skills: "",
  phone: "",
  email: "",
  hours: 40,
  shift: "A",
  Schedules: [],
  QualifyingSchedules: [],
  ...overrides
})

const makeSchedule = (overrides: Partial<AppTypes.ScheduleInterface> = {}): AppTypes.ScheduleInterface => ({
  startDate: "2024-01-15",
  startTime: "2024-01-15T08:00:00Z",
  endDate: "2024-01-15",
  endTime: "2024-01-15T16:00:00Z",
  hours: 8,
  detailCode: "ENG",
  ...overrides
})

const renderRow = (employee: TableDataType) => render(
  <table>
    <tbody>
      <TableRow employee={employee} index={0} />
    </tbody>
  </table>
)

describe("TableRow", () => {
  it("renders the Recent Step Up Shifts and Qualifying Shifts columns independently", () => {
    const employee = makeEmployee({
      Schedules: [makeSchedule({ detailCode: "LT" })],
      QualifyingSchedules: [makeSchedule({ detailCode: "CAP" })]
    })

    renderRow(employee)

    expect(screen.getByTestId("recent-schedules-table")).toBeInTheDocument()
    expect(screen.getByTestId("qualifying-schedules-table")).toBeInTheDocument()
    expect(screen.getByText("LT")).toBeInTheDocument()
    expect(screen.getByText("CAP")).toBeInTheDocument()
  })

  it("shows the qualifying shifts empty state while the recent shifts column still renders its own data", () => {
    const employee = makeEmployee({
      Schedules: [makeSchedule()],
      QualifyingSchedules: []
    })

    renderRow(employee)

    expect(screen.getByTestId("recent-schedules-table")).toBeInTheDocument()
    expect(screen.getByTestId("no-qualifying-shifts")).toBeInTheDocument()
    expect(screen.getByText("No Step-Up Shifts")).toBeInTheDocument()
  })

  it("colors the qualifying shifts table with the warning color when the employee is under 72 hours, leaving recent shifts info-colored", () => {
    const employee = makeEmployee({
      hours: 40,
      Schedules: [makeSchedule()],
      QualifyingSchedules: [makeSchedule()]
    })

    renderRow(employee)

    expect(screen.getByTestId("qualifying-schedules-table").querySelector("thead tr")).toHaveClass("bg-warning")
    expect(screen.getByTestId("recent-schedules-table").querySelector("thead tr")).toHaveClass("bg-info")
  })

  it("colors the qualifying shifts table with the success color once the employee reaches 72 hours, leaving recent shifts info-colored", () => {
    const employee = makeEmployee({
      hours: 72,
      Schedules: [makeSchedule()],
      QualifyingSchedules: [makeSchedule()]
    })

    renderRow(employee)

    expect(screen.getByTestId("qualifying-schedules-table").querySelector("thead tr")).toHaveClass("bg-success")
    expect(screen.getByTestId("recent-schedules-table").querySelector("thead tr")).toHaveClass("bg-info")
  })

  it("renders the hours gauge above the qualifying shifts table instead of as its own column", () => {
    const employee = makeEmployee({ hours: 40, QualifyingSchedules: [makeSchedule()] })

    const { container } = renderRow(employee)

    expect(screen.getByText("40")).toBeInTheDocument()
    expect(screen.getByText("HRs.")).toBeInTheDocument()
    expect(container.querySelector("tbody > tr")?.children).toHaveLength(3)
  })
})
