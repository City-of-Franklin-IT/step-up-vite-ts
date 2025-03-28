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
  const { filter, dispatch } = useContext(AppContext)

  return (
    <>
      {filter ? (
        <div className="flex gap-6">
          <QualifiedBtn
            label={'Remove Filter'}
            onClick={() => dispatch({ type: 'SET_FILTER', payload: '' })} />
        </div>
        ) : (
          <div className={hidden ? 'hidden' : 'flex flex-col justify-around w-full gap-8 md:flex-row'}>
            <QualifiedBtn
              label={'Engineer'}
              onClick={() => dispatch({ type: 'SET_FILTER', payload: 'Engineer' })} />
            <QualifiedBtn
              label={'Lieutenant'}
              onClick={() => dispatch({ type: 'SET_FILTER', payload: 'Lieutenant' })} />
            <QualifiedBtn
              label={'Captain'}
              onClick={() => dispatch({ type: 'SET_FILTER', payload: 'Captain' })} />
            <QualifiedBtn
              label={'BC'}
              onClick={() => dispatch({ type: 'SET_FILTER', payload: 'BC' })} />
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