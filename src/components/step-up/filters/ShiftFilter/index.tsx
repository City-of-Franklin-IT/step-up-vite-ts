import styles from './ShiftFilter.module.css'
import { useHandleShiftFilterContainer } from './hooks'

// Components
import HideBtn from "../../buttons/HideBtn"
import * as Components from './components'

function ShiftFilterContainer() {
  const { onHideBtnClick, hidden } = useHandleShiftFilterContainer()

  return (
    <div className={styles.container}>
      <Components.Header />
      <div className="absolute -top-5 right-5">
        <HideBtn 
          onClick={onHideBtnClick}
          hidden={hidden} />
      </div>
      <Components.Buttons hidden={hidden} />
      <Components.Footer />
    </div>
  )
}

export default ShiftFilterContainer