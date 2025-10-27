import { Link } from "react-router"
import { APP_TITLE } from '@/config'
import cofIcon from '@/assets/icons/cof/cof-primary-content.svg'
import { useActiveAccount } from "@/helpers/hooks"
import useHandleLogoutRedirect from "@/context/Auth/hooks/useHandleLogoutRedirect"
import { useHandleButtons, useHandleHeaderBtn } from './hooks'

export const Title = () => {

  return (
    <Link to={'/home'} className="flex flex-col text-primary-content text-center w-fit">
      <div className="flex gap-4 text-primary-content items-center">
        <img src={cofIcon} alt="cof icon" className="w-20" />
        <h1 className="text-4xl font-bold text-center">{APP_TITLE}</h1>
      </div>
    </Link>
  )
}

export const Buttons = () => {
  const { visible } = useHandleButtons()

  if(!visible) return

  return (
    <div className="flex gap-2">
      <HeaderBtn to={'/home'}>Step Up</HeaderBtn>
      <HeaderBtn to={'/rosters'}>Rosters</HeaderBtn>
      <LogoutBtn />
    </div>
  )
}

export const HomeLink = () => {

  return (
    <a href={'/home'} className="text-neutral-content uppercase p-3 m-auto bg-neutral/20 w-fit rounded-b-lg hover:bg-warning/50 hover:text-neutral">Back To All FFD Apps</a>
  )
}

type HeaderBtnProps = { to: string, children: React.ReactNode }

const HeaderBtn = (props: HeaderBtnProps) => {
  const { visible, active } = useHandleHeaderBtn(String(props.children))

  if(!visible) return

  const textColor = active ? 'text-warning' : 'text-neutral-content'

  return (
    <Link 
      to={props.to} 
      className={`btn btn-sm btn-ghost rounded-none uppercase hover:bg-primary hover:shadow-none 2xl:btn-lg ${ textColor }`}>
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
      className="btn btn-sm btn-ghost text-neutral-content rounded-none uppercase hover:bg-primary hover:shadow-none lg:btn-lg">
        Logout
    </button>
  )
}