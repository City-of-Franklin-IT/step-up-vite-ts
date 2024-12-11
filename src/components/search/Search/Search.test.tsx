import { fireEvent, render } from "@testing-library/react"
import { vi } from "vitest"
import "@testing-library/jest-dom"
import AppContext from "../../../context/App/AppContext"

// Types
import { AppContextObj } from "../../../context/App/types"
import { SearchProps } from "./types"

// Components
import Search from "./Search"

describe('Search component', () => {
  const setSearchValueMock = vi.fn()
  const dispatchMock = vi.fn()

  const defaultProps: SearchProps = {
    searchValue: 'Southern',
    setSearchValue: setSearchValueMock
  }

  const ctx: AppContextObj = {
    dispatch: dispatchMock,
    date: '',
    filter: '',
    searchValue: 'Southern',
    shiftFilter: null,
    showAllStaff: false,
    skillsFilter: ''    
  }

  test('Component renders correctly', () => {
    const { getByTestId } = render(<Search { ...defaultProps } />)
    const component = getByTestId('search')

    expect(component).toBeInTheDocument()
  })

  test('setSearchValue called on button click', () => {
    const { getByRole, unmount } = render(
      <AppContext.Provider value={ctx}>
        <Search { ...defaultProps } />)
      </AppContext.Provider>
    )

    const button = getByRole('button')

    fireEvent.click(button)

    expect(setSearchValueMock).toHaveBeenCalled()

    unmount()

    render(
      <AppContext.Provider value={{ ...ctx, searchValue: '' }}>
        <Search { ...defaultProps } />)
      </AppContext.Provider>
    )

    fireEvent.click(button)

    expect(setSearchValueMock).toHaveBeenCalledTimes(1) // Second click event should be disabled because searchValue = ''
  })

  test('setSearchValue called on change', () => {
    const { getByRole } = render(
      <AppContext.Provider value={ctx}>
        <Search { ...defaultProps } />)
      </AppContext.Provider>
    )
    const input = getByRole('textbox')

    fireEvent.change(input, { target: { value: 'Andrew' } })

    expect(setSearchValueMock).toHaveBeenCalled()
  })
})
