import { useContext, useEffect } from "react"
import { useLocation } from "react-router"
import HeaderCtx from "./context"

// Types
import { PagesType } from "./context"
import { useActiveAccount } from "@/helpers/hooks"

/**
* Handles setting activePage in context on page change
**/
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

/**
* Returns visibility boolean for header buttons
**/
export const useHandleButtons = () => {
  const { pathname } = useLocation()

  const visible = pathname !== '/'

  return { visible }
}

/**
* Returns visibility boolean and className for header button
**/
export const useHandleHeaderBtn = (label: string) => {
  const { activePage } = useContext(HeaderCtx)

  const activeAccount = useActiveAccount()

  const { pathname } = useLocation()

  const visible = activeAccount || pathname !== '/'
  const active = activePage === label
  const textColor = active ? 'text-warning' : 'text-neutral-content'
  const className = `btn btn-ghost rounded-none uppercase hover:bg-primary hover:shadow-none ${ textColor }`

  return { visible, className }
}