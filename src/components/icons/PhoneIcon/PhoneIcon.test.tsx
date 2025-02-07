import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import { BrowserRouter } from "react-router-dom"
import styles from './PhoneIcon.module.css'

// Types
import { PhoneIconProps } from "./types"

// Components
import PhoneIcon from "."

describe('PhoneIcon component', () => {
  const defaultProps: PhoneIconProps = {
    width: 20,
    height: 20,
    phoneNumber: '615-550-6619',
    variant: 'normal'
  }

  test('Component renders correctly', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <PhoneIcon { ...defaultProps } />
      </BrowserRouter>
    )

    const icon = getByTestId('phone-icon')

    expect(icon).toBeInTheDocument()
  })

  test('State updated on hover', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <PhoneIcon { ...defaultProps } />
      </BrowserRouter>
    )

    const icon = getByTestId('phone-icon')

    fireEvent.mouseEnter(icon)

    expect(icon).toHaveClass(styles.hovered)

    fireEvent.mouseLeave(icon)

    expect(icon).not.toHaveClass(styles.hovered)
  })
})
