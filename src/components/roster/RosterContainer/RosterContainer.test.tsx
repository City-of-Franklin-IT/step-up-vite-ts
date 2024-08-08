import { fireEvent, render } from "@testing-library/react"
import "@testing-library/jest-dom"

// Types
import { RosterEntry } from "../../../context/App/types"
import { RosterContainerProps, RosterContainerState } from "./types"

// Components
import RosterContainer from "./RosterContainer"

describe('RosterContainer component', () => {
  const data: RosterEntry[] = [{
    rscMasterNameCh: "Pickle, Jayce C.",
    rscEmployeeIDCh: "4381",
    shiftAbrvCh: "B",
    stationAbrvCh: "S1",
    physicalUnitAbrvCh: "E1FK",
    posJobAbrvCh: "OFF",
    staffingStartDt: new Date("2024-08-06T06:00:00"),
    staffingEndDt: new Date("2024-08-06T11:00:00"),
    shiftStartDt: new Date("2024-08-06T06:00:00"),
    shiftEndDt: new Date("2024-08-07T06:00:00"),
    rank: "FireF",
    isParamedic: false
  },{
    rscMasterNameCh: "Daniel, Robert",
    rscEmployeeIDCh: "4144",
    shiftAbrvCh: "B",
    stationAbrvCh: "S1",
    physicalUnitAbrvCh: "E1FK",
    posJobAbrvCh: "ENG",
    staffingStartDt: new Date("2024-08-06T06:00:00"),
    staffingEndDt: new Date("2024-08-07T06:00:00"),
    shiftStartDt: new Date("2024-08-06T06:00:00"),
    shiftEndDt: new Date("2024-08-07T06:00:00"),
    rank: "FireE",
    isParamedic: true
  }]

  const defaultProps: RosterContainerProps = {
    data
  }

  test('Component renders correctly', () => {
    const { getByTestId } = render(<RosterContainer { ...defaultProps } />)
    const component = getByTestId('roster-container')

    expect(component).toBeInTheDocument()
  })

  test('Date picker rendered correctly based on state', () => {
    const { container, getByTestId } = render(<RosterContainer { ...defaultProps } />)
    let component = container.querySelector('[data-testid="date-picker"')

    expect(component).toBeNull()

    const button = getByTestId('calendar-btn')

    fireEvent.click(button) // Button click updates state to show datePicker

    component = container.querySelector('[data-testid="date-picker"')

    expect(component).toBeInTheDocument()
  })

  test('Station groups rendered correctly', () => {
    const { getAllByTestId } = render(<RosterContainer { ...defaultProps } />)
    const components = getAllByTestId('station-group')

    expect(components).toHaveLength(1)
  })

  test('Render LoadingIcon component when fetching data', () => {
    const { getByTestId } = render(<RosterContainer data={[]} />)
    const component = getByTestId('loading-icon')

    expect(component).toBeInTheDocument()
  })
})