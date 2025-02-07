import { useContext } from "react"
import AppContext from "../../../../context/App/AppContext"
import styles from './QualifiedFilterContainer.module.css'

// Types
import { ReactElement } from "react"

// Components
import QualifiedBtn from "../../../buttons/QualifiedBtn"

export const Header = (): ReactElement => {
  const { filter } = useContext(AppContext)

  return (
    <div className={!filter ? styles.header : 'hidden'}>Filter Qualified</div>
  )
}

export const Buttons = ({ hidden }: { hidden: boolean }): ReactElement => {
  const { filter } = useContext(AppContext)

  return (
    <>
      {filter ? (
        <div className="flex gap-6">
          <QualifiedBtn
            label={'Remove Filter'}
            type={''} />
        </div>
        ) : (
          <div className={hidden ? 'hidden' : 'flex flex-col justify-around w-full gap-8 md:flex-row'}>
            <QualifiedBtn
              type={'Engineer'}
              label={'Engineer'} />
            <QualifiedBtn
              type={'Lieutenant'}
              label={'Lieutenant'} />
            <QualifiedBtn
              type={'Captain'}
              label={'Captain'} />
            <QualifiedBtn
              type={'BC'}
              label={'BC'} />
          </div>
        )}
    </>
  )
}

export const Footer = () => {
  const { filter } = useContext(AppContext)

  return (
    <>
      {filter && (
        <div className={styles.footer}>Showing { filter }</div>
      )}
    </>
  )
}