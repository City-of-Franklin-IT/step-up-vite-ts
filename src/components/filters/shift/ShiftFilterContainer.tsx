import { useContext, useState } from "react"
import AppContext from "../../../context/App/AppContext"
import { useGetWindowSize } from "../../../helpers"
import styles from './ShiftFilter.module.css'

// Types
import { ShiftfilterContainerState } from './types'

// Components
import ShiftBtn from "../../buttons/ShiftBtn/ShiftBtn"
import HideBtn from "../../buttons/HideBtn/HideBtn"

function ShiftFilterContainer() {
  const { shiftFilter } = useContext(AppContext)

  const window = useGetWindowSize()

  const [state, setState] = useState<ShiftfilterContainerState>({ hidden: window > 1025 ? false : true })

  return (
    <div data-testid="shift-filter-container" className={styles.container}>
      <div className={styles.header}>Filter <small className="italic">by</small> Shift</div>
      <div className="absolute -top-5 right-5">
        <HideBtn 
          setState={setState}
          hidden={state.hidden} />
      </div>
      {shiftFilter ? (
        <div className="flex gap-6">
          <ShiftBtn
            label={'Remove Filter'}
            shift={null} />
        </div>
        ) : (
          <div className={state.hidden ? 'hidden' : 'flex flex-col justify-around w-full gap-8 md:flex-row'}>
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

        {shiftFilter && (
          <div className={styles.footer}>Showing { shiftFilter } Shift</div>
        )}
    </div>
  )
}

export default ShiftFilterContainer