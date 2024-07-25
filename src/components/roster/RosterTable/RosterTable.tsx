import { handleTime } from '../../../helpers'
import { useOrderRanks, handleRank } from '.'
import styles from './RosterTable.module.css'

// Types
import { RosterTableProps } from "./types"

function RosterTable({ data, label }: RosterTableProps) {
  const ordered = useOrderRanks(data)

  return (
    <div className={styles.rosterTable}>
      <div className={styles.label}>{label}</div>
      <table className="w-full">
        <thead>
          <tr>
            <th className={styles.header}>Name</th>
            <th className={styles.header}>Rank</th>
            <th className={styles.header}>Start Date</th>
            <th className={styles.header}>Start Time</th>
            <th className={styles.header}>End Date</th>
            <th className={styles.header}>End Time</th>
          </tr>
        </thead>
        <tbody>
          {ordered.map(obj => {
            return (
              <tr key={`${ obj.employeeId }-${ obj.station }-${ obj.shift }`} className={styles.tableData}>
                <td>{handleRank(obj)}</td>
                <td>{obj.rankAbrv}</td>
                <td>{obj.staffStart.toString().split('T')[0]}</td>
                <td>{handleTime(obj.staffStart.toString())}</td>
                <td>{obj.staffEnd.toString().split('T')[0]}</td>
                <td>{handleTime(obj.staffEnd.toString())}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default RosterTable