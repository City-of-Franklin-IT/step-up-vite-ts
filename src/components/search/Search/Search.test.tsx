import { fireEvent, render } from "@testing-library/react"
import { vi } from "vitest"
import "@testing-library/jest-dom"
import AppContext from "../../../context/App/AppContext"

// Types
import { AppContextObj } from "../../../context/App/types"

// Components
import Search from "."

describe('Search component', () => {
  const setSearchValueMock = vi.fn()
  const dispatchMock = vi.fn()

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
    const { getByTestId } = render(<Search />)
    const component = getByTestId('search')

    expect(component).toBeInTheDocument()
  })

  test('setSearchValue called on button click', () => {
    const { getByRole, unmount } = render(
      <AppContext.Provider value={ctx}>
        <Search />)
      </AppContext.Provider>
    )

    const button = getByRole('button')

    fireEvent.click(button)

    expect(setSearchValueMock).toHaveBeenCalled()

    unmount()

    render(
      <AppContext.Provider value={{ ...ctx, searchValue: '' }}>
        <Search />)
      </AppContext.Provider>
    )

    fireEvent.click(button)

    expect(setSearchValueMock).toHaveBeenCalledTimes(1) // Second click event should be disabled because searchValue = ''
  })

  test('setSearchValue called on change', () => {
    const { getByRole } = render(
      <AppContext.Provider value={ctx}>
        <Search />)
      </AppContext.Provider>
    )
    const input = getByRole('textbox')

    fireEvent.change(input, { target: { value: 'Andrew' } })

    expect(setSearchValueMock).toHaveBeenCalled()
  })
})
