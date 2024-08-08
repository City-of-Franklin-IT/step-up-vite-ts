import { fireEvent, render } from "@testing-library/react"
import { vi } from "vitest"
import "@testing-library/jest-dom"

// Types
import { ResetSearchBtnProps } from "./types"

// Components
import ResetSearchBtn from "./ResetSearchBtn"

describe('ResetSearchBtn component', () => {
  const handleResetSearchBtnMock = vi.fn()

  const defaultProps: ResetSearchBtnProps = {
    handleResetSearchBtn: handleResetSearchBtnMock
  }

  test('Component renders correctly', () => {
    const { getByTestId } = render(<ResetSearchBtn { ...defaultProps } />)
    const button = getByTestId('reset-search-btn')

    expect(button).toBeInTheDocument()
  })

  test('handleResetSearchBtn called on button click', () => {
    const { getByTestId } = render(<ResetSearchBtn { ...defaultProps } />)
    const button = getByTestId('reset-search-btn')

    fireEvent.click(button)

    expect(handleResetSearchBtnMock).toHaveBeenCalled()
  })
})