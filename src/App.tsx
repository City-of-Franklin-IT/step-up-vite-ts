import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from "react-toastify"
import { AppProvider } from "./context/App/AppContext"
import { APP_BASE } from './config'
import 'react-toastify/dist/ReactToastify.css'

// Components
import Login from "./pages/Login"
import Home from "./pages/Home"
import Rosters from "./pages/Rosters"
import Redirect from './pages/Redirect'

const queryClient = new QueryClient()

function App() {
  
  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <Router basename={APP_BASE} future={{ v7_startTransition: true }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/rosters" element={<Rosters />} />
            <Route path="/*" element={<Redirect />} />
          </Routes>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
        <ToastContainer />
      </QueryClientProvider>
    </AppProvider>
  )
}

export default App
