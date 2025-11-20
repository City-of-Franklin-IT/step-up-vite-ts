import { handleTime } from '@/helpers/utils'
import styles from './RosterTable.module.css'

// Types
import { RosterItemType } from '../../context'

export const handleTableRow = (roster: RosterItemType) => {
  const { staffStart, staffEnd } = roster

  const className = handleActive(staffStart, staffEnd)

  const startDate = staffStart.split('T')[0]
  const endDate = staffEnd.split('T')[0]
  const startTime = handleTime(staffStart.toString())
  const endTime = handleTime(staffEnd.toString())

  return { className, start: { date: startDate, time: startTime }, end: { date: endDate, time: endTime }, rank: roster.rankAbrv }
}

const handleActive = (start: string, end: string) => { // Handle row styling for active / inactive rows
  const startDateTime = new Date(start)
  const endDateTime = new Date(end)
  const now = new Date()

  if(startDateTime < now && endDateTime > now) {
    return styles.tableData
  } else return styles.tableDataInactive
}