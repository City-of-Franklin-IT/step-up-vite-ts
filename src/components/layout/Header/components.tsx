import { Menu, X } from "lucide-react"
import { Link, useLocation } from "react-router"
import ffdIcon from '@/assets/icons/ffd/ffd.png'
import { useActiveAccount } from "@/helpers/hooks"
import useHandleLogoutRedirect from "@/context/Auth/hooks/useHandleLogoutRedirect"
import { useHandleButtons, useHandleHeaderBtn, useHandleMobileMenu } from './hooks'

export const Title = () => {

  return (
    <Link
      to={'/home'}
      className="flex flex-col text-primary-content text-center w-fit">
        <div className="flex gap-2 text-primary-content items-center justify-center md:gap-4">
          <img src={ffdIcon} alt="ffd icon" className="w-12 md:w-20" />
          <h1 className="text-xl font-bold text-center md:text-2xl lg:text-4xl">{import.meta.env.VITE_APP_TITLE}</h1>
        </div>
    </Link>
  )
}

export const Buttons = () => {
  const { visible } = useHandleButtons()

  if (!visible) return

  return (
    <div className="flex gap-2 md:gap-4">
      <HeaderBtn to={'/home'}>Step Up</HeaderBtn>
      <HeaderBtn to={'/rosters'}>Rosters</HeaderBtn>
      <LogoutBtn />
    </div>
  )
}

export const MobileMenu = () => {
  const { pathname } = useLocation()
  const { visible } = useHandleButtons()
  const { ref, open, onBtnClick, close } = useHandleMobileMenu()
  const handleLogoutRedirect = useHandleLogoutRedirect()

  if (!visible || pathname === '/') return null

  return (
    <div ref={ref} className={`dropdown dropdown-end md:hidden ${open ? 'dropdown-open' : ''}`}>
      <button
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        onClick={onBtnClick}
        className="btn btn-ghost btn-square text-primary-content hover:bg-primary/60 hover:shadow-none">
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      <MenuItems visible={open} onNavigate={close} onLogout={handleLogoutRedirect} />
    </div>
  )
}

type MenuItemsProps = {
  visible: boolean
  onNavigate: () => void
  onLogout: () => void
}

const MenuItems = ({ visible, onNavigate, onLogout }: MenuItemsProps) => {
  if (!visible) return null

  return (
    <ul className="dropdown-content menu z-50 bg-primary text-primary-content rounded-box w-56 p-2 shadow border border-primary tracking-normal">
      <li>
        <Link to={'/home'} onClick={onNavigate} className="uppercase hover:bg-primary/80">
          Step Up
        </Link>
      </li>
      <li>
        <Link to={'/rosters'} onClick={onNavigate} className="uppercase hover:bg-primary/80">
          Rosters
        </Link>
      </li>
      <li>
        <a href={'/home'} className="uppercase hover:bg-primary/80">
          Back to All Fire Apps
        </a>
      </li>
      <li>
        <button type="button" onClick={onLogout} className="uppercase hover:bg-primary/80">
          Logout
        </button>
      </li>
    </ul>
  )
}

export const HomeLink = () => {

  return (
    <a href={'/home'} className="hidden md:block text-neutral-content uppercase p-3 m-auto bg-neutral/20 w-fit rounded-b-lg hover:bg-warning/50 hover:text-neutral">Back To All FFD Apps</a>
  )
}

type HeaderBtnProps = { to: string, children: React.ReactNode }

const HeaderBtn = (props: HeaderBtnProps) => {
  const { visible, className } = useHandleHeaderBtn(String(props.children))

  if(!visible) return

  return (
    <Link 
      to={props.to} 
      className={className}>
        {props.children}
    </Link>
  )
}

const LogoutBtn = () => { // Logout button
  const activeAccount = useActiveAccount()

  const handleLogoutRedirect = useHandleLogoutRedirect()

  if(!activeAccount) return null

  return (
    <button 
      type="button"
      onClick={handleLogoutRedirect}
      className="btn btn-ghost text-neutral-content rounded-none uppercase hover:bg-primary hover:shadow-none">
        Logout
    </button>
  )
}