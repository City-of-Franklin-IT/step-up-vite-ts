import { useHandleShiftFilterContainer } from './hooks'

// Components
import HideBtn from "../../buttons/HideBtn"
import * as Components from './components'

function ShiftFilterContainer() {
  const btnProps = useHandleShiftFilterContainer()

  return (
    <div className="flex-1 flex relative items-center justify-evenly gap-8 p-8 border border-neutral-content rounded-lg">
      <Components.Header />
      <div className="absolute -top-5 right-5">
        <HideBtn { ...btnProps } />
      </div>
      <Components.Buttons hidden={btnProps.hidden} />
      <Components.Footer />
    </div>
  )
}

export default ShiftFilterContainer