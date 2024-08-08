import { render } from "@testing-library/react"
import "@testing-library/jest-dom"
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from "react-router-dom"

// Components
import Rosters from "./Rosters"

const queryClient = new QueryClient()

describe('Rosters component', () => {

  test('Component renders correctly', () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Rosters />
        </BrowserRouter>
      </QueryClientProvider>
    )

    expect(container).toBeInTheDocument()
  })

  test('Renders children correctly', () => {
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Rosters />
        </BrowserRouter>
      </QueryClientProvider>
    )
    const component = getByTestId('roster-container')

    expect(component).toBeInTheDocument()
  })
})
