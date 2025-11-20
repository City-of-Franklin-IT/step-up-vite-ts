import styles from './QualifiedFilterContainer.module.css'
import { useHandleQualifiedFilterContainer } from './hooks'

// Components
import HideBtn from "../../buttons/HideBtn"
import { Header, Buttons, Footer } from "./components"

function QualifiedFilterContainer() {
  const btnProps = useHandleQualifiedFilterContainer()

  return (
    <div className={styles.container}>
      <Header />
      <div className="absolute -top-5 right-5">
        <HideBtn { ...btnProps } />
      </div>
      <Buttons hidden={btnProps.hidden} />
      <Footer />
    </div>
  )
}

export default QualifiedFilterContainer
