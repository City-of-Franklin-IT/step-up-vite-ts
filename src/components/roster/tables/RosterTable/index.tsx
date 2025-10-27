import { useOrderRanks } from './hooks'
import styles from './RosterTable.module.css'

// Types
import { RosterItemType } from '../../context'

// Components
import * as Components from './components'

type RosterTableProps = { rosters: RosterItemType[], label: string }

function RosterTable(props: RosterTableProps) {
  const ordered = useOrderRanks(props.rosters)

  return (
    <div className={styles.rosterTable}>
      <div className={styles.label}>{props.label}</div>
      <Components.Table ordered={ordered} />
    </div>
  )
}

export default RosterTable