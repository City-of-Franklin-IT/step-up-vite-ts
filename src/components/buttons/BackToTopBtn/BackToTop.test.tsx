import { render, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

// Types
import { BackToTopBtnProps } from './types'

// Components
import BackToTopBtn from './BackToTopBtn'

describe('Back to top button', () => {
  const handleClick = vi.fn()

  const defaultProps: BackToTopBtnProps = {
    handleClick
  }

  test('Renders correctly', () => {
    const { getByTestId } = render(<BackToTopBtn { ...defaultProps } />)
    const button = getByTestId('back-to-top-btn')

    expect(button).toBeInTheDocument()
  })

  test('Calls handleClick when button clicked', () => {
    const { getByTestId } = render(<BackToTopBtn { ...defaultProps } />)
    const button = getByTestId('back-to-top-btn')

    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalled()
  })
})