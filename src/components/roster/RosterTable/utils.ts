import styles from './RosterTable.module.css'

// Types
import { HandleActiveProps } from "./types"

export const handleActive = (start: HandleActiveProps['start'], end: HandleActiveProps['end']) => { // Handle row styling for active / inactive rows
  const startDateTime = new Date(start)
  const endDateTime = new Date(end)
  const now = new Date()

  if(startDateTime < now && endDateTime > now) {
    return styles.tableData
  } else return styles.tableDataInactive
}