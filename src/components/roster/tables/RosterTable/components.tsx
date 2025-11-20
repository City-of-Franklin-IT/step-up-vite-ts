import { handleTableRow } from './utils'
import styles from './RosterTable.module.css'

// Types
import { RosterItemType } from '../../context'

export const Table = ({ ordered }: { ordered: RosterItemType[] }) => {

  return (
    <table className="w-full">
      <TableHeaders />
      <TableBody ordered={ordered} />
    </table>
  )
}

const TableHeaders = () => {

  return (
    <thead>
      <tr>
        <Header className={styles.header}>Name</Header>
        <Header className={styles.header}>Rank</Header>
        <Header className={styles.dateHeader}>Start Date</Header>
        <Header className={styles.header}>Start Time</Header>
        <Header className={styles.dateHeader}>End Date</Header>
        <Header className={styles.header}>End Time</Header>
      </tr>
    </thead>
  )
}

type HeaderProps = { className: string, children: React.ReactNode }

const Header = (props: HeaderProps) => {

  return (
    <th className={props.className}>{props.children}</th>
  )
}

const TableBody = ({ ordered }: { ordered: RosterItemType[] }) => {

  return (
    <tbody>
      {ordered.map(roster => {
        return (
          <TableRow 
            key={`roster-table-row-${ roster.employeeId }`}
            roster={roster} />
        )
      })}
    </tbody>
  )
}

const TableRow = ({ roster }: { roster: RosterItemType }) => {
  const { className, start, end, rank } = handleTableRow(roster)

  return (
    <tr className={className}>
      <RosterNameTableData roster={roster} />
      <td>{rank}</td>
      <td className="hidden md:block">{start.date}</td>
      <td>{start.time}</td>
      <td className="hidden md:block">{end.date}</td>
      <td>{end.time}</td>
    </tr>
  )
}

const RosterNameTableData = ({ roster }: { roster: RosterItemType }) => {

  switch(roster.rank) {
    case 'FireCapt':
      return (
        <RosterName
          roster={roster}
          title={'Captain'}
          bgColor={'bg-error'} />
      )
    case 'FireLT':
      return (
        <RosterName
          roster={roster}
          title={'Lieutenant'}
          bgColor={'bg-warning'} />
      )
    case 'FireE':
      return (
        <RosterName
          roster={roster}
          title={'Engineer'}
          bgColor={'bg-success'} />
      )
    default:
      return (
        <div className="flex gap-1 items-center">
          {roster.name}
          <IsParamedicIndicator isParamedic={roster.isParamedic} />
        </div>
      )
  }
}

type RankIndicatorProps = { roster: RosterItemType, title: 'Captain' | 'Lieutenant' | 'Engineer', bgColor: 'bg-error' | 'bg-warning' | 'bg-success' }

const RosterName = (props: RankIndicatorProps) => {

  return (
    <td>
      <div className="flex gap-1 items-center">
        {props.roster.name}
        <div className={`w-2.5 h-2.5 rounded-full ${ props.bgColor }`} title={props.title}></div>
        <IsParamedicIndicator isParamedic={props.roster.isParamedic} />
      </div>
    </td>
  )
}

const IsParamedicIndicator = ({ isParamedic }: { isParamedic: boolean }) => {
  if(!isParamedic) return

  return (
    <div className="bg-info w-2.5 h-2.5 rounded-full" title="Paramedic"></div>
  )
}