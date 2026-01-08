import { useContext } from "react"
import StepUpCtx from "../../context"
import styles from '../QualifiedFilterContainer/QualifiedFilterContainer.module.css'
import { useHandleShiftBtns, useHandleRemoveFilterBtn } from './hooks'

// Components
import ShiftBtn from "../../buttons/ShiftBtn"

export const Header = () => {
  const { shiftFilter } = useContext(StepUpCtx)

  if(shiftFilter) return

  return (
    <div className={styles.header}>Filter <small className="italic">by</small> Shift</div>
  )
}

export const Buttons = ({ hidden }: { hidden: boolean }) => {
  if(hidden) return

  return (
    <>
      <RemoveFilterBtn />
      <ShiftBtns />
    </>
  )
}

export const Footer = () => {
  const { shiftFilter } = useContext(StepUpCtx)

  if(!shiftFilter) return

  return (
    <div className={styles.footer}>Showing { shiftFilter } Shift</div>
  )
}

const RemoveFilterBtn = () => {
  const { visible, onClick } = useHandleRemoveFilterBtn()

  if(!visible) return

  return (
    <ShiftBtn btnProps={{ onClick }}>
      Remove Filter
    </ShiftBtn>
  )
}

const ShiftBtns = () => {
  const { visible, onClick } = useHandleShiftBtns()

  if(!visible) return

  return (
    <div className={'flex flex-col justify-around w-full gap-8 md:flex-row'}>
      <ShiftBtn
        btnProps={{
          onClick,
          value: 'A'
        }}> 
          A
      </ShiftBtn>
      <ShiftBtn
        btnProps={{
          onClick,
          value: 'B'
        }}> 
          B
      </ShiftBtn>
      <ShiftBtn
        btnProps={{
          onClick,
          value: 'C'
        }}> 
          C
      </ShiftBtn>
    </div>
  )
}