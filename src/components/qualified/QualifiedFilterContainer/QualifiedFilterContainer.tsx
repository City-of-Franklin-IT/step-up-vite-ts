import { useContext, useState } from "react"
import AppContext from "../../../context/App/AppContext"
import { useGetWindowSize } from "../../../helpers"
import styles from './QualifiedFilterContainer.module.css'

// Types
import { QualifiedFilterContainerProps, QualifiedFilterContainerState } from "./types"

// Components
import QualifiedBtn from "../../buttons/QualifiedBtn/QualifiedBtn"
import ResetSearchBtn from "../../buttons/ResetSearchBtn/ResetSearchBtn"
import HideBtn from "../../buttons/HideBtn/HideBtn"

function QualifiedFilterContainer({ handleResetSearchBtn }: QualifiedFilterContainerProps) {
  const { filter, searchValue } = useContext(AppContext)

  const window = useGetWindowSize()

  const [state, setState] = useState<QualifiedFilterContainerState>({ hidden: window > 1025 ? false : true })

  return (
    <div data-testid="qualified-filter-container" className={styles.container}>
      <div className={styles.header}>Filter Qualified</div>
      <div className="absolute -top-5 right-5">
        <HideBtn 
          setState={setState}
          hidden={state.hidden} />
      </div>
      {filter ? (
        <div className="flex gap-6">
          <QualifiedBtn
            label={'Remove Filter'}
            type={''} />
          {searchValue ? (
            <ResetSearchBtn 
              handleResetSearchBtn={() => handleResetSearchBtn()} />
          ) : null}
        </div>
        ) : (
          <div className={state.hidden ? 'hidden' : 'flex flex-col justify-around w-full gap-8 md:flex-row'}>
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
            {searchValue ? (
              <ResetSearchBtn 
                handleResetSearchBtn={() => handleResetSearchBtn()} />
            ) : null}
          </div>
        )}
        {filter && (
          <div className={styles.footer}>Showing { filter } </div>
        )}
    </div>
  )
}

export default QualifiedFilterContainer
