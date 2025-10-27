import { useContext, useEffect } from "react"
import { useLocation } from "react-router"
import HeaderCtx from "./context"

// Types
import { PagesType } from "./context"
import { useActiveAccount } from "@/helpers/hooks"

export const useSetActivePage = () => {
  const { dispatch } = useContext(HeaderCtx)

  const location = useLocation()

  useEffect(() => {
    const pathname = location.pathname

    let payload: PagesType = 'Login'

    switch(pathname) {
      case '/home':
        payload = 'Step Up'
        break
      case '/rosters':
        payload = 'Rosters'
        break
      default:
        payload = 'Login'
    }

    dispatch({ type: 'SET_ACTIVE_PAGE', payload })
  }, [dispatch, location])
}

export const useHandleButtons = () => {
  const { pathname } = useLocation()

  const visible = pathname !== '/'

  return { visible }
}

export const useHandleHeaderBtn = (label: string) => {
  const { activePage } = useContext(HeaderCtx)

  const activeAccount = useActiveAccount()

  const { pathname } = useLocation()

  const visible = activeAccount || pathname !== '/'

  const active = activePage === label

  return { visible, active }
}