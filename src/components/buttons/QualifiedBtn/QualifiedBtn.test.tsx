import { render, fireEvent,  } from '@testing-library/react'
import { vi } from 'vitest'
import '@testing-library/jest-dom'
import AppContext from '../../../context/App/AppContext'

// Types
import { AppContextObj } from '../../../context/App/types'
import { QualifiedBtnProps } from './types'

// Components
import QualifiedBtn from './QualifiedBtn'

describe('Qualified button', () => {
  const defaultProps: QualifiedBtnProps = {
    label: 'Engineer',
    type: 'Engineer'
  }

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
    const { getByTestId } = render(<QualifiedBtn { ...defaultProps } />)
    const button = getByTestId('qualified-btn')

    expect(button).toBeInTheDocument()
  })

  test('Dispatch called on button click', () => {
    const { getByTestId } = render(
      <AppContext.Provider value={ctx}>
        <QualifiedBtn { ...defaultProps } />
      </AppContext.Provider>
    )

    const button = getByTestId('qualified-btn')

    fireEvent.click(button)

    expect(ctx.dispatch).toHaveBeenCalledWith({ type: 'SET_FILTER', payload: 'Engineer' })
  })

  test('Label rendered correctly', () => {
    const { getByText } = render(<QualifiedBtn { ...defaultProps } />)
    const text = getByText('Engineer')

    expect(text).toBeInTheDocument()
  })
})