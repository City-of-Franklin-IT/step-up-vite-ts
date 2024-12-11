import { render } from "@testing-library/react"
import "@testing-library/jest-dom"
import { BrowserRouter } from "react-router-dom"

// Types
import { TableData } from "../TableContainer/types"
import { TableProps } from "./types"

// Components
import Table from "./Table"

describe('Table component', () => {
  const defaultProps: TableProps = {
    data: [{
      employeeId: "0789",
      rank: "Firefighter",
      fullName: "Adams, Andrew",
      skills: "Driver, Tech Rescue, Officer, Swiftwater, Rope Rescue, AEMT, Hazmat",
      phone: "615-533-6887",
      email: "andy.adams@franklintn.gov",
      hours: 72,
      shift: "A",
      Schedules: []
    }] as TableData[]
  }

  test('Component renders correctly', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Table { ...defaultProps } />
      </BrowserRouter>
    )
    const component = getByTestId('table')

    expect(component).toBeInTheDocument()
  })

  test('Component renders correct amount of table rows', () => {
    const { getAllByRole } = render(
      <BrowserRouter>
        <Table { ...defaultProps } />
      </BrowserRouter>
    )
    const rows = getAllByRole('row')

    console.log(defaultProps.data.length)

    expect(rows.length).toBe(defaultProps.data.length + 1) // Header row + body
  })
})