import { render } from "@testing-library/react"
import "@testing-library/jest-dom"
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from "react-router-dom"

// Components
import Home from "."

const queryClient = new QueryClient()

describe('Home component', () => {
  test('Component renders correctly', () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </QueryClientProvider>
    )

    expect(container).toBeInTheDocument()
  })
  
  test('Renders children correctly', () => {
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </QueryClientProvider>
    )
    const component = getByTestId('table-container')

    expect(component).toBeInTheDocument()
  })
})
