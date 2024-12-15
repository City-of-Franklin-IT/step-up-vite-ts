import { render, renderHook } from "@testing-library/react"
import "@testing-library/jest-dom"
import { useOrderRanks, handleActive } from "./components"
import styles from './RosterTable.module.css'

// Types
import { RosterItem } from "../RosterContainer/types"
import { RosterTableProps } from "./types"

// Components
import RosterTable from "./RosterTable"

describe('RosterTable component', () => {
  const defaultProps: RosterTableProps = {
    data: [{
      employeeId: "0792",
      name: "Alexander, Thomas A.",
      station: "1",
      shift: "C",
      unit: "E1FK",
      rank: "FireE",
      rankAbrv: "ENG",
      shiftStart: new Date("2024-08-06T06:00:00"),
      shiftEnd: new Date("2024-08-07T06:00:00"),
      staffStart: new Date("2024-08-06T06:00:00"),
      staffEnd: new Date("2024-08-07T06:00:00"),
      isParamedic: false
    },
    {
      employeeId: "4419",
      name: "Miller, Marcus A.",
      station: "1",
      shift: "C",
      unit: "E1FK",
      rank: "FireF",
      rankAbrv: "FF",
      shiftStart: new Date("2024-08-06T06:00:00"),
      shiftEnd: new Date("2024-08-07T06:00:00"),
      staffStart: new Date("2024-08-06T06:00:00"),
      staffEnd: new Date("2024-08-07T06:00:00"),
      isParamedic: true
    },{
      employeeId: "0715",
      name: "Bess, Kyle M.",
      station: "1",
      shift: "C",
      unit: "E1FK",
      rank: "FireCapt",
      rankAbrv: "OFF",
      shiftStart: new Date("2024-08-06T06:00:00"),
      shiftEnd: new Date("2024-08-07T06:00:00"),
      staffStart: new Date("2024-08-06T06:00:00"),
      staffEnd: new Date("2024-08-07T06:00:00"),
      isParamedic: false
    }] as RosterItem[],
    label: 'E1FK'
  }

  test('Component renders correctly', () => {
    const { getByTestId } = render(<RosterTable { ...defaultProps } />)
    const component = getByTestId('roster-table')

    expect(component).toBeInTheDocument()
  })

  test('Label rendered correctly', () => {
    const { getByText } = render(<RosterTable { ...defaultProps } />)
    const text = getByText(defaultProps.label)
    
    expect(text).toBeInTheDocument()
  })

  test('useOrderRanks hook orders roster by rank and staffStart', () => {
    const ordered = renderHook(() => useOrderRanks(defaultProps.data))

    expect(ordered.result.current[0].employeeId).toBe("0715")
  })
  
  test('handleRank returns element by employee rank', () => {
    const { getByTestId, queryByTestId } = render(<RosterTable { ...defaultProps } />)
    const element = getByTestId('fire-capt')

    expect(element).toBeInTheDocument() // fire-capt should be in the document
    expect(queryByTestId('fire-lt')).not.toBeInTheDocument() // fire-lt should not be in the document
  })

  test('handleActive returns correct css class', () => {
    let style = handleActive(defaultProps.data[0].staffStart, defaultProps.data[0].staffEnd) // Date is in the past

    expect(style).toBe(styles.tableDataInactive)

    const newDate = new Date()

    style = handleActive(new Date(newDate.setHours(newDate.getHours() - 7)), new Date(newDate.setHours(newDate.getHours() + 8)))

    expect(style).toBe(styles.tableData)
  })
})