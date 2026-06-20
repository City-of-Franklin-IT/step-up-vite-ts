import { useContext } from "react"
import StepUpCtx from "../../context"
import { useHandleButtons } from './hooks'
import styles from './QualifiedFilterContainer.module.css'

// Components
import QualifiedBtn from "../../buttons/QualifiedBtn"

export const Header = () => {
  const { filter } = useContext(StepUpCtx)

  if(filter) return null

  return (
    <h2 className={styles.header}>Filter Qualified</h2>
  )
}

export const Buttons = ({ hidden }: { hidden: boolean }) => {
  const { onClick, showRemoveBtn } = useHandleButtons()

  if(hidden) return (
    <span className="text-neutral-content/50 font-[jura] italic">Filter hidden..</span>
  )

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

  if(!filter) return null

  return (
    <div className={styles.footer}>Showing { filter }</div>
  )
}