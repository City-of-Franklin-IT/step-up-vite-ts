import { useState } from "react"
import { useGetWindowSize } from "../../../helpers/hooks"
import styles from './ShiftFilter.module.css'

// Types
import { ShiftfilterContainerState } from './types'

// Components
import HideBtn from "../../buttons/HideBtn"
import * as Components from './components'

function ShiftFilterContainer() {
  const hidden = useGetWindowSize()

  const [state, setState] = useState<ShiftfilterContainerState>({ hidden })

  return (
    <div data-testid="shift-filter-container" className={styles.container}>
      <Components.Header />
      <div className="absolute -top-5 right-5">
        <HideBtn 
          onClick={() => setState(prevState => ({ ...prevState,  hidden: !prevState.hidden }))}
          hidden={state.hidden} />
      </div>
      <Components.Buttons />
      <Components.Footer />
    </div>
  )
}

export default ShiftFilterContainer