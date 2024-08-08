import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

// Types
import { Dispatch, SetStateAction } from 'react'
import { RosterContainerState } from '../../roster/RosterContainer/types'
import { HideBtnProps } from './types'

// Components
import HideBtn from './HideBtn'

describe('Hide button', () => {
  const initialState: RosterContainerState = {
    date: '2024-08-05',
    hidden: false,
    showDatePicker: false
  }

  let stateMock: RosterContainerState = { ...initialState }

  const setStateMock: Dispatch<SetStateAction<RosterContainerState>> = (newState) => {
    if(typeof newState === 'function') {
      stateMock = newState(stateMock)
    } else {
      stateMock = { ...stateMock, ...newState }
    }
  }

  const defaultProps: HideBtnProps = {
    label: 'Hide Rosters',
    setState: setStateMock
  }

  test('Components renders correctly', () => {
    const { getByTestId } = render(<HideBtn { ...defaultProps } />)
    const button = getByTestId('hide-btn')

    expect(button).toBeInTheDocument()
  })

  test('Calls state setting function on click', () => {
    const { getByTestId } = render(<HideBtn { ...defaultProps } />)
    const button = getByTestId('hide-btn')

    fireEvent.click(button)

    expect(stateMock.hidden).toBe(true)
  })

  test('Component displays label', () => {
    const { getByText } = render(<HideBtn { ...defaultProps } />)
    const text = getByText('Hide Rosters')

    expect(text).toBeInTheDocument()
  })
})
