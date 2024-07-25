import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'
import { AppProvider } from "./context/App/AppContext"
import { APP_BASE } from './config'

// Components
import Home from "./pages/Home/Home"
import Rosters from "./pages/Rosters/Rosters"

const queryClient = new QueryClient()

function App() {
  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <Router basename={APP_BASE} future={{ v7_startTransition: true }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rosters" element={<Rosters />} />
          </Routes>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AppProvider>
  )
}

export default App
