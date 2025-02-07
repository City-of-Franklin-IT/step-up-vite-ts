import { BrowserRouter } from "react-router-dom"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom"
import { mock, instance } from 'ts-mockito'

// Types
import { TableData } from "../TableContainer/types"
import { TableProps } from "./types"

// Components
import Table from "."

describe('Table component', () => {
  const tableDataMock = mock<TableData>()
  const tableDataArrayMock = Array.from({ length: 10 }).map(_ => instance(tableDataMock))

  const defaultProps: TableProps = {
    employees: tableDataArrayMock
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

    console.log(defaultProps.employees.length)

    expect(rows.length).toBe(defaultProps.employees.length + 1) // Header row + body
  })
})