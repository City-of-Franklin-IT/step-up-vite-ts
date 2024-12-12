import { useOrderRanks } from '.'
import styles from './RosterTable.module.css'

// Types
import { RosterTableProps } from "./types"

// Components
import { TableBody } from '.'

function RosterTable({ data, label }: RosterTableProps) {
  const ordered = useOrderRanks(data)

  return (
    <div data-testid="roster-table" className={styles.rosterTable}>
      <div className={styles.label}>{label}</div>
      <table className="w-full">
        <thead>
          <tr>
            <th className={styles.header}>Name</th>
            <th className={styles.header}>Rank</th>
            <th className={styles.dateHeader}>Start Date</th>
            <th className={styles.header}>Start Time</th>
            <th className={styles.dateHeader}>End Date</th>
            <th className={styles.header}>End Time</th>
          </tr>
        </thead>
        <TableBody ordered={ordered} />
      </table>
    </div>
  )
}

export default RosterTable