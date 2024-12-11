import { render, cleanup, fireEvent } from "@testing-library/react"
import { vi } from "vitest"
import "@testing-library/jest-dom"
import { BrowserRouter } from "react-router-dom"
import AppContext from "../../../context/App/AppContext"

// Types
import { Staff, AppContextObj } from "../../../context/App/types"
import { TableContainerProps } from "./types"

// Components
import TableContainer from "./TableContainer"

describe('TableContainer component', () => {
  const dispatchMock = vi.fn()

  const defaultProps: TableContainerProps = {
    data: [{
      rank: "Firefighter",
      employeeId: "0789",
      fullName: "Adams, Andrew",
      skills: "Driver, Tech Rescue, Officer, Swiftwater, Rope Rescue, AEMT, Hazmat",
      phone: "615-533-6887",
      email: "andy.adams@franklintn.gov",
      shift: "A",
      StepUps: [],
      Schedules: []
    },{
      rank: "Captain",
      employeeId: "0687",
      fullName: "Almon, William",
      skills: "Officer, Swiftwater, Rope Rescue, AEMT, Hazmat",
      phone: null,
      email: "billa@franklintn.gov",
      StepUps: [],
      Schedules: []}] as Staff[]
  }

  const ctx: AppContextObj = { // Context state
    dispatch: dispatchMock,
    date: '2024-08-05',
    filter: '',
    searchValue: '',
    shiftFilter: null,
    showAllStaff: true,
    skillsFilter: ''
  }

  test('Component renders correctly', () => {
    const { getByTestId } = render(<TableContainer { ...defaultProps } />)
    const component = getByTestId('table-container')

    expect(component).toBeInTheDocument()
  })

  test('useSetTableData hook handles search and filters correctly', () => {
    const { getAllByRole, unmount } = render(
      <AppContext.Provider value={ctx}>
        <BrowserRouter>
          <TableContainer { ...defaultProps } />
        </BrowserRouter>
      </AppContext.Provider>
    )
    let rows = getAllByRole('row')

    expect(rows.length).toBe(defaultProps.data.length + 1) // +1 row for table header

    unmount()
    cleanup()

    render(
      <AppContext.Provider value={{ ...ctx, skillsFilter: 'Tech Rescue' }}>
        <BrowserRouter>
          <TableContainer { ...defaultProps } />
        </BrowserRouter>
      </AppContext.Provider>
    )

    rows = getAllByRole('row')

    expect(rows.length).toBe(defaultProps.data.filter(obj => !obj.skills.split(',').includes('Tech Rescue')).length) // Length should be 2 with employee without 'Tech Rescue' skill removed and header included

    unmount()
    cleanup()

    render(
      <AppContext.Provider value={{ ...ctx, searchValue: 'Adams' }}>
        <BrowserRouter>
          <TableContainer { ...defaultProps } />
        </BrowserRouter>
      </AppContext.Provider>
    )
    rows = getAllByRole('row')

    expect(rows.length).toBe(defaultProps.data.filter(obj => obj.fullName.includes('Adams')).length + 1) // Length should be 2 with employee without name 'Adams' removed and header included

    unmount()
    cleanup()

    render(
      <AppContext.Provider value={{ ...ctx, showAllStaff: false }}>
        <BrowserRouter>
          <TableContainer { ...defaultProps } />
        </BrowserRouter>
      </AppContext.Provider>
    )

    rows = getAllByRole('row')

    expect(rows.length).toBe(1) // Only header row
  })

  test('useSearch hook updates context', () => {
    const { getByTestId } = render(
      <AppContext.Provider value={{ ...ctx }}>
        <BrowserRouter>
          <TableContainer { ...defaultProps } />
        </BrowserRouter>
      </AppContext.Provider>
    )
    const searchInput = getByTestId('search-input') as HTMLInputElement

    fireEvent.change(searchInput, { target: { value: 'Adams' } })

    expect(searchInput.value).toBe('Adams') // searchValue in ctx updated and used as value for input
  })

  test('useSetSkills hook sets skills[] used for Skills buttons', () => {
    const { getAllByTestId } = render(
      <AppContext.Provider value={{ ...ctx }}>
        <BrowserRouter>
          <TableContainer { ...defaultProps } />
        </BrowserRouter>
      </AppContext.Provider>
    )
    const buttons = getAllByTestId('skills-btn')

    const uniqueSkills: string[] = []

    defaultProps.data.forEach(obj => {
      obj.skills.split(',').forEach(x => {
        if(!uniqueSkills.includes(x.trim())) {
          uniqueSkills.push(x.trim())
        }
      })
    })

    expect(buttons.length).toBe(uniqueSkills.length) // Skils buttons should = uniqueSkills[].length
  })

  test('handleResetSearchBtn clears searchValue from component state and context', () => {
    const { getAllByTestId } = render(
      <AppContext.Provider value={{ ...ctx, searchValue: 'Adams' }}>
        <BrowserRouter>
          <TableContainer { ...defaultProps } />
        </BrowserRouter>
      </AppContext.Provider>
    )
    const buttons = getAllByTestId('reset-search-btn')

    fireEvent.click(buttons[0])

    expect(ctx.searchValue).toBe('')
  })

  test('scrollToTop calls scrollIntoView method', () => {
    const { getByTestId } = render(
      <AppContext.Provider value={ctx}>
        <BrowserRouter>
          <TableContainer { ...defaultProps } />
        </BrowserRouter>
      </AppContext.Provider>
    )
    const button = getByTestId('back-to-top-btn') as HTMLButtonElement

    window.HTMLElement.prototype.scrollIntoView = vi.fn() // Mock scrollIntoView method

    fireEvent.click(button)

    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled()
  })
})
