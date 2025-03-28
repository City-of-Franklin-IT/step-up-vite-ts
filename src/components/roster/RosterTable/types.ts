// Types
import { RosterItem } from "../RosterContainer/types"

export interface OrderRanksProps { // orderRanks fn props
  data: RosterItem[]
}

export interface HandleTimeProps { // handleTime fn props
  time: string
}

export interface HandleActiveProps { // handleActive fn props
  start: Date,
  end: Date
}