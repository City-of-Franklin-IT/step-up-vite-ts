import { ReactElement, useMemo } from 'react'
import { handleTime } from '../../../helpers'
import styles from './RosterTable.module.css'

// Types
import { RosterItem } from '../RosterContainer/types'
import { OrderRanksProps, HandleRankProps, HandleActiveProps } from './types'

export const useOrderRanks = (data: OrderRanksProps['data']): RosterItem[] => { // Order staff by rank
  const array = useMemo(() => {
    return data.sort((a, b) => {
      const rankOrder = ['BC', 'OFF', 'ENG', 'FF']
  
      const rankA = rankOrder.indexOf(a.rankAbrv)
      const rankB = rankOrder.indexOf(b.rankAbrv)
    
      if(rankA !== rankB) {
        return rankA - rankB
      }
    
      const startA = new Date(a.staffStart) // If ranks are the same, sort by staffStart
      const startB = new Date(b.staffStart)
    
      if(startA > startB) {
        return 1
      }
    
      if(startA < startB) {
        return -1
      }
    
      return 0
    })
  }, [data])

  return array
} 

export const TableBody = ({ ordered }: { ordered: RosterItem[] }): ReactElement => {
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
      <td>{handleRank(roster)}</td>
      <td>{roster.rankAbrv}</td>
      <td className="hidden md:block">{roster.staffStart.toString().split('T')[0]}</td>
      <td>{handleTime(roster.staffStart.toString())}</td>
      <td className="hidden md:block">{roster.staffEnd.toString().split('T')[0]}</td>
      <td>{handleTime(roster.staffEnd.toString())}</td>
    </tr>
  )
}

const handleActive = (start: HandleActiveProps['start'], end: HandleActiveProps['end']) => { // Handle row styling for active / inactive rows
  const startDateTime = new Date(start)
  const endDateTime = new Date(end)
  const now = new Date()

  if(startDateTime < now && endDateTime > now) {
    return styles.tableData
  } else return styles.tableDataInactive
}

const handleRank = (data: HandleRankProps['data']): ReactElement => { // Handle rank indicators
  switch(data.rank) {
    case 'FireCapt':
      return (
        <div data-testid="fire-capt" className="flex gap-1 items-center">
          {data.name}
          <div className="bg-error w-[10px] h-[10px] rounded-full" title="Captain"></div>
          {data.isParamedic && (
            <div className="bg-info w-[10px] h-[10px] rounded-full" title="Paramedic"></div>
          )}
        </div>
      )
    case 'FireLT':
      return (
        <div data-testid="fire-lt" className="flex gap-1 items-center">
          {data.name}
          <div className="bg-warning w-[10px] h-[10px] rounded-full" title="Lieutenant"></div>
          {data.isParamedic && (
            <div className="bg-info w-[10px] h-[10px] rounded-full" title="Paramedic"></div>
          )}
        </div>
      )
    case 'FireE':
      return (
        <div data-testid="fire-e" className="flex gap-1 items-center">
          {data.name}
          <div className="bg-success w-[10px] h-[10px] rounded-full" title="Engineer"></div>
          {data.isParamedic && (
            <div className="bg-info w-[10px] h-[10px] rounded-full" title="Paramedic"></div>
          )}
        </div>
      )
    default:
      return (
        <div className="flex gap-1 items-center">
          {data.name}
          {data.isParamedic && (
            <div className="bg-info w-[10px] h-[10px] rounded-full" title="Paramedic"></div>
          )}
        </div>
      )
  }
}