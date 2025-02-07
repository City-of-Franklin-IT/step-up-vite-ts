import { useOrderRanks } from './hooks'
import styles from './RosterTable.module.css'

// Types
import { RosterTableProps } from "./types"

// Components
import { Header, TableBody } from './components'

function RosterTable({ data, label }: RosterTableProps) {
  const ordered = useOrderRanks(data)

  return (
    <div data-testid="roster-table" className={styles.rosterTable}>
      <div className={styles.label}>{label}</div>
      <table className="w-full">
        <Header />
        <TableBody ordered={ordered} />
      </table>
    </div>
  )
}

export default RosterTable