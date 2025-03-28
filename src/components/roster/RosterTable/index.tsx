import { useOrderRanks } from './hooks'
import styles from './RosterTable.module.css'

// Types
import { RosterItem } from '../RosterContainer/types'

// Components
import * as Components from './components'

function RosterTable({ rosters, label }: { rosters: RosterItem[], label: string }) {
  const ordered = useOrderRanks(rosters)

  return (
    <div data-testid="roster-table" className={styles.rosterTable}>
      <div className={styles.label}>{label}</div>
      <Components.Table ordered={ordered} />
    </div>
  )
}

export default RosterTable