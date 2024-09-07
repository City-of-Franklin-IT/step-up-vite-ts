import { handleTime } from '../../../helpers'
import { useOrderRanks, handleRank, handleActive } from '.'
import styles from './RosterTable.module.css'

// Types
import { RosterTableProps } from "./types"

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
        <tbody>
          {ordered.map(obj => {
            return (
              <tr key={`${ obj.employeeId }-${ obj.station }-${ obj.staffStart }`} className={handleActive(obj.staffStart, obj.staffEnd)}>
                <td>{handleRank(obj)}</td>
                <td>{obj.rankAbrv}</td>
                <td className="hidden md:block">{obj.staffStart.toString().split('T')[0]}</td>
                <td>{handleTime(obj.staffStart.toString())}</td>
                <td className="hidden md:block">{obj.staffEnd.toString().split('T')[0]}</td>
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