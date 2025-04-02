import { useState } from "react"
import { useGetWindowSize } from "../../../../helpers/hooks"
import styles from './QualifiedFilterContainer.module.css'

// Types
import { QualifiedFilterContainerState } from "./types"

// Components
import HideBtn from "../../../buttons/HideBtn"
import { Header, Buttons, Footer } from "./components"

function QualifiedFilterContainer() {
  const hidden = useGetWindowSize()

  const [state, setState] = useState<QualifiedFilterContainerState>({ hidden })

  return (
    <div data-testid="qualified-filter-container" className={styles.container}>
      <Header />
      <div className="absolute -top-5 right-5">
        <HideBtn
          onClick={() => setState(prevState => ({ ...prevState,  hidden: !prevState.hidden }))} 
          hidden={state.hidden} />
      </div>
      <Buttons hidden={state.hidden} />
      <Footer />
    </div>
  )
}

export default QualifiedFilterContainer
