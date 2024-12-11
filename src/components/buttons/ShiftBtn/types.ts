// Types
import { Shift } from "../../../context/App/types"

export interface ShiftBtnProps { // ShiftBtn props
  shift: Shift | null
  label: Shift | 'Remove Filter'
}