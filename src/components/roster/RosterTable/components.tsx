import { ReactElement } from 'react'
import { handleTime } from '../../../helpers'
import { handleActive } from './utils'
import styles from './RosterTable.module.css'

// Types
import { RosterItem } from '../RosterContainer/types'

export const Table = ({ ordered }: { ordered: RosterItem[] }) => {

  return (
    <table className="w-full">
      <Header />
      <TableBody ordered={ordered} />
    </table>
  )
}

const Header = () => {

  return (
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
  )
}

const TableBody = ({ ordered }: { ordered: RosterItem[] }): ReactElement => {
  return (
    <tbody>
      {ordered.map(roster => {
        return (
          <TableRow roster={roster} />
        )
      })}
    </tbody>
  )
}

const TableRow = ({ roster }: { roster: RosterItem }): ReactElement => {
  return (
    <tr className={handleActive(roster.staffStart, roster.staffEnd)}>
      <td><Rank roster={roster} /></td>
      <td>{roster.rankAbrv}</td>
      <td className="hidden md:block">{roster.staffStart.toString().split('T')[0]}</td>
      <td>{handleTime(roster.staffStart.toString())}</td>
      <td className="hidden md:block">{roster.staffEnd.toString().split('T')[0]}</td>
      <td>{handleTime(roster.staffEnd.toString())}</td>
    </tr>
  )
}

const Rank = ({ roster }: { roster: RosterItem }): ReactElement => { // Handle rank indicators

  switch(roster.rank) {
    case 'FireCapt':
      return (
        <div data-testid="fire-capt" className="flex gap-1 items-center">
          {roster.name}
          <div className="bg-error w-[10px] h-[10px] rounded-full" title="Captain"></div>
          {roster.isParamedic && (
            <div className="bg-info w-[10px] h-[10px] rounded-full" title="Paramedic"></div>
          )}
        </div>
      )
    case 'FireLT':
      return (
        <div data-testid="fire-lt" className="flex gap-1 items-center">
          {roster.name}
          <div className="bg-warning w-[10px] h-[10px] rounded-full" title="Lieutenant"></div>
          {roster.isParamedic && (
            <div className="bg-info w-[10px] h-[10px] rounded-full" title="Paramedic"></div>
          )}
        </div>
      )
    case 'FireE':
      return (
        <div data-testid="fire-e" className="flex gap-1 items-center">
          {roster.name}
          <div className="bg-success w-[10px] h-[10px] rounded-full" title="Engineer"></div>
          {roster.isParamedic && (
            <div className="bg-info w-[10px] h-[10px] rounded-full" title="Paramedic"></div>
          )}
        </div>
      )
    default:
      return (
        <div className="flex gap-1 items-center">
          {roster.name}
          {roster.isParamedic && (
            <div className="bg-info w-[10px] h-[10px] rounded-full" title="Paramedic"></div>
          )}
        </div>
      )
  }
}