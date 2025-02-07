import { render } from "@testing-library/react"
import "@testing-library/jest-dom"
import { BrowserRouter } from "react-router-dom"

// Types
import { ReactNode } from "react"

// Components
import Layout from "."

describe('Layout component', () => {
  const defaultProps: { children: ReactNode } = {
    children: <></>
  }

  test('Component renders correctly', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Layout { ...defaultProps }>
        </Layout>
      </BrowserRouter>
    )
    const component = getByTestId('layout')

    expect(component).toBeInTheDocument()
  })

  test('Component renders children correctly', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Layout { ...defaultProps }>
        </Layout>
      </BrowserRouter>
    )

    const selectors = ['header', 'main', 'footer']

    selectors.forEach(selector => {
      const component = getByTestId(selector)

      expect(component).toBeInTheDocument()
    })
  })
})