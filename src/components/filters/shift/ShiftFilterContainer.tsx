import { useState } from "react"
import { useGetWindowSize } from "../../../helpers"
import styles from './ShiftFilter.module.css'

// Types
import { ShiftfilterContainerState } from './types'

// Components
import HideBtn from "../../buttons/HideBtn/HideBtn"
import { Header, Buttons, Footer } from "./components"

function ShiftFilterContainer() {
  const hidden = useGetWindowSize()

  const [state, setState] = useState<ShiftfilterContainerState>({ hidden })

  return (
    <div data-testid="shift-filter-container" className={styles.container}>
      <Header />
      <div className="absolute -top-5 right-5">
        <HideBtn 
          setState={setState}
          hidden={state.hidden} />
      </div>
      <Buttons hidden={state.hidden} />
      <Footer />
    </div>
  )
}

export default ShiftFilterContainer