import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"

// Components
import LogoutBtn from "../../buttons/LogoutBtn"

export const Buttons = () => {

  return (
    <div className="flex gap-4">
      <RostersBtn />
      <StepUpBtn />
      <LogoutBtn />
    </div>
  )
}

const RostersBtn = () => {
  const { pathname } = useLocation()

  if(pathname === '/rosters' || pathname === '/' ) return null

  return (
    <Link to={'/rosters'} className="btn rounded-none uppercase hover:btn-primary">
      View Rosters
    </Link>
  )
}

const StepUpBtn = () => {
  const { pathname } = useLocation()

  if(pathname === '/home' || pathname === '/') return null

  return ( 
    <Link to={'/home'} className="btn rounded-none uppercase hover:btn-primary">
      View Step Up
    </Link>
  )
} 