// Types
import { Dispatch, SetStateAction } from "react"
import { QualifiedFilterContainerState } from "../../qualified/QualifiedFilterContainer/types"

export interface HideBtnProps { // HideBtn props
  setState: Dispatch<SetStateAction<QualifiedFilterContainerState>>
  hidden: boolean
}