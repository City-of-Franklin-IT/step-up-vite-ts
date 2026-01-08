import { useHandleQualifiedFilterContainer } from './hooks'

// Components
import HideBtn from "../../buttons/HideBtn"
import { Header, Buttons, Footer } from "./components"

function QualifiedFilterContainer() {
  const btnProps = useHandleQualifiedFilterContainer()

  return (
    <div className="flex-1 flex relative items-center justify-evenly gap-8 p-8 border border-neutral-content rounded-lg">
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
