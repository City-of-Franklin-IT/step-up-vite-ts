// Types
import { Dispatch, SetStateAction } from "react"
import { RosterContainerState } from "../../roster/RosterContainer/types"

export interface HideBtnProps { // HideBtn props
  setState: Dispatch<SetStateAction<RosterContainerState>>,
  label: string
}