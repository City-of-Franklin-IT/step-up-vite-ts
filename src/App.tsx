import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from "react-toastify"
import { AppProvider } from "./context/App/AppContext"
import { UserProvider } from "./context/User/UserContext"
import { APP_BASE } from './config'
import 'react-toastify/dist/ReactToastify.css'

// Components
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"
import Rosters from "./pages/Rosters/Rosters"
import NotFound from "./pages/NotFound/NotFound"

const queryClient = new QueryClient()

function App() {
  return (
    <AppProvider>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <Router basename={APP_BASE} future={{ v7_startTransition: true }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/rosters" element={<Rosters />} />
              <Route path={'*'} element={<NotFound />} />
            </Routes>
          </Router>
          <ReactQueryDevtools initialIsOpen={false} />
          <ToastContainer />
        </QueryClientProvider>
      </UserProvider>
    </AppProvider>
  )
}

export default App
