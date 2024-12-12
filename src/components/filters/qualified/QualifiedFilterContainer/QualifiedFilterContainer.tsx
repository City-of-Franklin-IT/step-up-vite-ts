import { useState } from "react"
import { useGetWindowSize } from "../../../../helpers"
import styles from './QualifiedFilterContainer.module.css'

// Types
import { QualifiedFilterContainerState } from "./types"

// Components
import HideBtn from "../../../buttons/HideBtn/HideBtn"
import { Header, Buttons, Footer } from "."

function QualifiedFilterContainer() {
  const hidden = useGetWindowSize()

  const [state, setState] = useState<QualifiedFilterContainerState>({ hidden })

  return (
    <div data-testid="qualified-filter-container" className={styles.container}>
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

export default QualifiedFilterContainer
