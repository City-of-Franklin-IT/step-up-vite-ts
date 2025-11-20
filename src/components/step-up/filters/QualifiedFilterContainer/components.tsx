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
  const { onClick, showRemoveBtn } = useHandleButtons()

  if(hidden) return

  if(showRemoveBtn) return (
    <QualifiedBtn
      btnProps={{
        onClick,
        value: '',
      }}>
        Remove Filter
    </QualifiedBtn>
  )

  return (
    <div className="flex flex-col justify-around w-full gap-8 md:flex-row">
      <QualifiedBtn
        btnProps={{
          onClick,
          value: 'Engineer'
        }}>
          Engineer
      </QualifiedBtn>
      <QualifiedBtn
        btnProps={{
          onClick,
          value: 'Lieutenant'
        }}>
          Lieutenant
      </QualifiedBtn>
      <QualifiedBtn
        btnProps={{
          onClick,
          value: 'Captain'
        }}>
          Captain
      </QualifiedBtn>
      <QualifiedBtn
        btnProps={{
          onClick,
          value: 'BC'
        }}>
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