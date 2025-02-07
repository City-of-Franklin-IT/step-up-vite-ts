import { fireEvent, render } from "@testing-library/react"
import "@testing-library/jest-dom"
import { BrowserRouter } from "react-router-dom"
import styles from './EmailIcon.module.css'

// Types
import { EmailIconProps } from "./types"

// Components
import EmailIcon from "."

describe('EmailIcon component', () => {
  const defaultProps: EmailIconProps = {
    width: 20,
    height: 20,
    email: 'test.o365-3@franklintn.gov' ,
    variant: 'normal'
  }

  test('Component renders correctly', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <EmailIcon { ...defaultProps } />  
      </BrowserRouter>
    )

    const button = getByTestId('email-icon')

    expect(button).toBeInTheDocument()
  })

  test('State updated on hover', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <EmailIcon { ...defaultProps } />
      </BrowserRouter>
    )

    const icon = getByTestId('email-icon')

    fireEvent.mouseEnter(icon)

    expect(icon).toHaveClass(styles.hovered)

    fireEvent.mouseLeave(icon)

    expect(icon).not.toHaveClass(styles.hovered)
  })
})