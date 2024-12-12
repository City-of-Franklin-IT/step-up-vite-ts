import { render } from "@testing-library/react"
import { vi } from "vitest"
import "@testing-library/jest-dom"
import { BrowserRouter } from "react-router-dom"
import AppContext from "../../../../context/App/AppContext"

// Types
import { AppContextObj } from "../../../../context/App/types"

// Components
import QualifiedFilterContainer from "./QualifiedFilterContainer"

describe('QualifiedFilterContainer component', () => {
  const dispatchMock = vi.fn()

  const ctx: AppContextObj = { // Context state
    dispatch: dispatchMock,
    date: '2024-08-05',
    filter: '',
    searchValue: '',
    shiftFilter: null,
    showAllStaff: false,
    skillsFilter: ''
  }

  test('Component renders correctly', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <QualifiedFilterContainer />
      </BrowserRouter>
    )

    const component = getByTestId('qualified-filter-container')

    expect(component).toBeInTheDocument()
  })

  test('Component renders children correctly', () => {
    const { getAllByTestId, unmount } = render(
      <BrowserRouter>
        <AppContext.Provider value={{ ...ctx }}>
          <QualifiedFilterContainer />
        </AppContext.Provider>
      </BrowserRouter>
    )

    const selectors = ['qualified-btn']
    let children = getAllByTestId(selectors[0])

    expect(children).toHaveLength(4) // Should render 4 buttons with default ctx

    unmount()

    ctx.filter = 'Engineer' // Mock ctx change to filter

    render(
      <BrowserRouter>
        <AppContext.Provider value={{ ...ctx }}>
          <QualifiedFilterContainer />
        </AppContext.Provider>
      </BrowserRouter>
    )

    children = getAllByTestId(selectors[0])

    expect(children).toHaveLength(1) // With filter applied only 1 button should render
  })
})
