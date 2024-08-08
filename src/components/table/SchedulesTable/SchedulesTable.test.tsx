import { render } from "@testing-library/react"
import "@testing-library/jest-dom"

// Types
import { Schedule } from "../../../context/App/types"
import { SchedulesTableProps } from "./types"

// Components
import SchedulesTable from "./SchedulesTable"

describe('SchedulesTable component', () => {
  const defaultProps: SchedulesTableProps = {
    data: [{
      startDate: new Date("2024-07-27"),
      startTime: "1970-01-01T06:00:00.000Z",
      endDate: new Date("2024-07-28"),
      endTime: "1970-01-01T06:00:00.000Z",
      hours: 24,
      detailCode: "LT"
    }] as Schedule[]
  }

  test('Component renders correctly', () => {
    const { getByTestId } = render(<SchedulesTable { ...defaultProps } />)
    const component = getByTestId('schedules-table')

    expect(component).toBeInTheDocument()
  })

  test('No recent shifts element renders correctly', () => {
    const { getByTestId, queryByTestId, unmount } = render(<SchedulesTable data={[]} />)
    const element = getByTestId('no-recent-shifts')

    expect(element).toBeInTheDocument() // Element should render when !data[].length

    unmount()

    render(<SchedulesTable { ...defaultProps } />)

    expect(queryByTestId('no-recent-shifts')).not.toBeInTheDocument() // Element should not render when data[].length
  })
})