import { BrowserRouter as Router, Route, Routes } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from "react-toastify"
import { APP_BASE } from './config'
import { StepUpProvider } from "./components/step-up/context"
import { RosterProvider } from "./components/roster/context"
import 'react-toastify/dist/ReactToastify.css'

// Components
import Login from "./pages/Login"
import Home from "./pages/Home"
import Rosters from "./pages/Rosters"
import Redirect from './pages/Redirect'

const queryClient = new QueryClient()

function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
      <Router basename={APP_BASE}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={
            <StepUpProvider>
              <Home />
            </StepUpProvider>
          } />
          <Route path="/rosters" element={
            <RosterProvider>
              <Rosters />
            </RosterProvider>
          } />
          <Route path="/*" element={<Redirect />} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer />
    </QueryClientProvider>
  )
}

export default App
