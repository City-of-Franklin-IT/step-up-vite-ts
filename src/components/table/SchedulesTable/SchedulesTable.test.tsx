import { render } from "@testing-library/react"
import "@testing-library/jest-dom"
import { mock, instance } from 'ts-mockito'

// Types
import { Schedule } from "../../../context/App/types"
import { SchedulesTableProps } from "./types"

// Components
import SchedulesTable from "./SchedulesTable"

describe('SchedulesTable component', () => {
  const scheduleMock = mock<Schedule>()
  const scheduleArrayMock = Array.from({ length: 10 }).map(_ => instance(scheduleMock))

  const defaultProps: SchedulesTableProps = {
    schedules: scheduleArrayMock,
    employeeId: '1234'
  }

  test('Component renders correctly', () => {
    const { getByTestId } = render(<SchedulesTable { ...defaultProps } />)
    const component = getByTestId('schedules-table')

    expect(component).toBeInTheDocument()
  })

  test('No recent shifts element renders correctly', () => {
    const { getByTestId, queryByTestId, unmount } = render(<SchedulesTable { ...defaultProps } />)
    const element = getByTestId('no-recent-shifts')

    expect(element).toBeInTheDocument() // Element should render when !data[].length

    unmount()

    render(<SchedulesTable { ...defaultProps } />)

    expect(queryByTestId('no-recent-shifts')).not.toBeInTheDocument() // Element should not render when data[].length
  })
})