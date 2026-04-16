import { render, screen } from "@testing-library/react"
import SchedulesTable from "../index"
import * as AppTypes from "@/context/App/AppTypes"

const schedule: AppTypes.ScheduleInterface = {
  startDate: "2024-01-15",
  startTime: "2024-01-15T08:00:00Z",
  endDate: "2024-01-16",
  endTime: "2024-01-16T16:00:00Z",
  hours: 8,
  detailCode: "ENG"
}

describe("SchedulesTable", () => {
  it("shows no recent shifts message when schedules array is empty", () => {
    render(<SchedulesTable schedules={[]} employeeId="001" />)
    expect(screen.getByTestId("no-recent-shifts")).toBeInTheDocument()
    expect(screen.queryByTestId("schedules-table")).not.toBeInTheDocument()
  })

  it("shows the schedules table when entries are present", () => {
    render(<SchedulesTable schedules={[schedule]} employeeId="001" />)
    expect(screen.getByTestId("schedules-table")).toBeInTheDocument()
    expect(screen.queryByTestId("no-recent-shifts")).not.toBeInTheDocument()
  })

  it("renders schedule row data correctly", () => {
    render(<SchedulesTable schedules={[schedule]} employeeId="001" />)
    expect(screen.getByText("2024-01-15")).toBeInTheDocument()
    expect(screen.getByText("08:00")).toBeInTheDocument()
    expect(screen.getByText("2024-01-16")).toBeInTheDocument()
    expect(screen.getByText("16:00")).toBeInTheDocument()
    expect(screen.getByText("ENG")).toBeInTheDocument()
  })

  it("renders multiple schedule rows", () => {
    const schedules = [
      schedule,
      { ...schedule, startDate: "2024-02-01", endDate: "2024-02-01", detailCode: "LT" }
    ]
    render(<SchedulesTable schedules={schedules} employeeId="001" />)
    expect(screen.getAllByText("08:00")).toHaveLength(2)
    expect(screen.getByText("LT")).toBeInTheDocument()
  })
})
