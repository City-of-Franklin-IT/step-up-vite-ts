import { render } from "@testing-library/react"
import "@testing-library/jest-dom"
import { BrowserRouter } from "react-router-dom"
import { APP_TITLE } from "../../../config"
import { handleBtn } from "."

// Types
import { Location } from "react-router-dom"

// Components
import Header from "./Header"

describe('Header component', () => {
  test('Component renders correctly', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )

    const component = getByTestId('header')

    expect(component).toBeInTheDocument()
  })

  test('Component renders APP_TITLE correctly', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )

    const text = getByText(APP_TITLE)

    expect(text).toBeInTheDocument()
  })

  test('Correct button label is rendered', () => {
    const location = {
      pathname: '/rosters'
    } as Location

    const { getByText } = render(
      <BrowserRouter>
        <Header />
        {handleBtn(location)}
      </BrowserRouter>
    )

    const text = getByText('View Rosters')

    expect(text).toBeInTheDocument()
  })
})
