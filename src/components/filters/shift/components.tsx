import { useContext } from "react"
import AppContext from "../../../context/App/AppContext"
import { useGetWindowSize } from "../../../helpers"
import styles from './ShiftFilter.module.css'

// Types
import { ReactElement } from "react"

// Components
import ShiftBtn from "../../buttons/ShiftBtn"

export const Header = () => {
  const { shiftFilter } = useContext(AppContext)

  return (
    <div className={!shiftFilter ? styles.header : 'hidden'}>Filter <small className="italic">by</small> Shift</div>
  )
}

export const Buttons = (): ReactElement => {

  return (
    <>
      <RemoveFilterBtn />
      <ShiftBtns />
    </>
  )
}

export const Footer = () => {
  const { shiftFilter } = useContext(AppContext)

  return (
    <>
      {shiftFilter && (
        <div className={styles.footer}>Showing { shiftFilter } Shift</div>
      )}
    </>
  )
}

const RemoveFilterBtn = () => {
  const { shiftFilter, dispatch } = useContext(AppContext)

  if(!shiftFilter) return null

  return (
    <ShiftBtn
      label={'Remove Filter'}
      onClick={() => dispatch({ type: 'SET_SHIFT_FILTER', payload: null })} />
  )
}

const ShiftBtns = () => {
  const { shiftFilter, dispatch } = useContext(AppContext)

  const hidden = useGetWindowSize()

  if(!!shiftFilter || hidden) return null

  return (
    <div className={'flex flex-col justify-around w-full gap-8 md:flex-row'}>
      <ShiftBtn
        label={'A'}
        onClick={() => dispatch({ type: 'SET_SHIFT_FILTER', payload: 'A' })} />
      <ShiftBtn
        label={'B'}
        onClick={() => dispatch({ type: 'SET_SHIFT_FILTER', payload: 'B' })} />
      <ShiftBtn
        label={'C'}
        onClick={() => dispatch({ type: 'SET_SHIFT_FILTER', payload: 'C' })} />
    </div>
  )
}