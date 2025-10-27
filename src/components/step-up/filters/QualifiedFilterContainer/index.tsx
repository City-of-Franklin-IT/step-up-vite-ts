import styles from './QualifiedFilterContainer.module.css'
import { useHandleQualifiedFilterContainer } from './hooks'

// Components
import HideBtn from "../../buttons/HideBtn"
import { Header, Buttons, Footer } from "./components"

function QualifiedFilterContainer() {
  const { hidden, onHideBtnClick } = useHandleQualifiedFilterContainer()

  return (
    <div className={styles.container}>
      <Header />
      <div className="absolute -top-5 right-5">
        <HideBtn
          onClick={onHideBtnClick} 
          hidden={hidden} />
      </div>
      <Buttons hidden={hidden} />
      <Footer />
    </div>
  )
}

export default QualifiedFilterContainer
