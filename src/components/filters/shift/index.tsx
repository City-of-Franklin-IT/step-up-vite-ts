import { useContext } from "react"
import AppContext from "../../../context/App/AppContext"
import styles from './ShiftFilter.module.css'

// Types
import { ReactElement } from "react"

// Components
import ShiftBtn from "../../buttons/ShiftBtn/ShiftBtn"

export const Header = () => {
  const { shiftFilter } = useContext(AppContext)

  return (
    <div className={!shiftFilter ? styles.header : 'hidden'}>Filter <small className="italic">by</small> Shift</div>
  )
}

export const Buttons = ({ hidden }: { hidden: boolean }): ReactElement => {
  const { shiftFilter } = useContext(AppContext)

  return (
    <>
      {shiftFilter ? (
        <div className="flex gap-6">
          <ShiftBtn
            label={'Remove Filter'}
            shift={null} />
        </div>
        ) : (
          <div className={hidden ? 'hidden' : 'flex flex-col justify-around w-full gap-8 md:flex-row'}>
            <ShiftBtn
              shift={'A'}
              label={'A'} />
            <ShiftBtn
              shift={'B'}
              label={'B'} />
            <ShiftBtn
              shift={'C'}
              label={'C'} />
          </div>
        )}
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