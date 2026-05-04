import { BrowserRouter as Router, Route, Routes } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from "react-toastify"
import { APP_BASE } from './config'
import { StepUpProvider } from "./components/step-up/context"
import { RosterProvider } from "./components/roster/context"
import { AuthCtxProvider } from "./context/Auth"
import 'react-toastify/dist/ReactToastify.css'

// Components
import Layout from "./components/layout/Layout"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Rosters from "./pages/Rosters"
import Docs from "./pages/Docs"
import Redirect from './pages/Redirect'

const queryClient = new QueryClient()

function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthCtxProvider>
        <Router basename={APP_BASE}>
          <Routes>
            <Route element={<Layout />}>
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
              <Route path="/docs" element={<Docs />} />
              <Route path="/*" element={<Redirect />} />
            </Route>
          </Routes>
        </Router>
      </AuthCtxProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer />
    </QueryClientProvider>
  )
}

export default App
