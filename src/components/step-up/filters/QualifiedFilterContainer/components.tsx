import { useContext } from "react"
import StepUpCtx from "../../context"
import styles from './QualifiedFilterContainer.module.css'
import { useHandleButtons } from './hooks'

// Components
import QualifiedBtn from "../../buttons/QualifiedBtn"

export const Header = () => {
  const { filter } = useContext(StepUpCtx)

  if(filter) return

  return (
    <div className={styles.header}>Filter Qualified</div>
  )
}

export const Buttons = ({ hidden }: { hidden: boolean }) => {
  const { filter } = useContext(StepUpCtx)

  const { onBtnClick } = useHandleButtons()

  if(hidden) return

  if(filter) return (
    <QualifiedBtn
      value={''}
      onClick={onBtnClick}>
        Remove Filter
    </QualifiedBtn>
  )

  return (
    <div className="flex flex-col justify-around w-full gap-8 md:flex-row">
      <QualifiedBtn
        value={'Engineer'}
        onClick={onBtnClick}>
          Engineer
      </QualifiedBtn>
      <QualifiedBtn
        value={'Lieutenant'}
        onClick={onBtnClick}>
          Lieutenant
      </QualifiedBtn>
      <QualifiedBtn
        value={'Captain'}
        onClick={onBtnClick}>
          Captain
      </QualifiedBtn>
      <QualifiedBtn
        value={'BC'}
        onClick={onBtnClick}>
          BC
      </QualifiedBtn>
    </div>
  )
}

export const Footer = () => {
  const { filter } = useContext(StepUpCtx)

  if(!filter) return

  return (
    <div className={styles.footer}>Showing { filter }</div>
  )
}