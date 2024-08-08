import { useContext } from "react"
import AppContext from "../../../context/App/AppContext"
import styles from './QualifiedFilterContainer.module.css'

// Types
import { QualifiedFilterContainerProps } from "./types"

// Components
import QualifiedBtn from "../../buttons/QualifiedBtn/QualifiedBtn"
import ResetSearchBtn from "../../buttons/ResetSearchBtn/ResetSearchBtn"

function QualifiedFilterContainer({ handleResetSearchBtn }: QualifiedFilterContainerProps) {
  const { filter, searchValue } = useContext(AppContext)

  return (
    <div data-testid="qualified-filter-container" className={styles.container}>
      <div className={styles.header}>Filter Qualified</div>
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
              <>
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
              </>
            )}
            {filter && (
              <div className={styles.footer}>Showing { filter } </div>
            )}
    </div>
  )
}

export default QualifiedFilterContainer
