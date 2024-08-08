import { ReactElement, useMemo } from 'react'
import styles from './RosterTable.module.css'

// Types
import { RosterItem } from '../RosterContainer/types'
import { OrderRanksProps, HandleRankProps, HandleActiveProps } from './types'

export const useOrderRanks = (data: OrderRanksProps['data']): RosterItem[] => useMemo(() => { // Order by rank
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

export const handleRank = (data: HandleRankProps['data']): ReactElement => { // Handle rank indicators
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

export const handleActive = (start: HandleActiveProps['start'], end: HandleActiveProps['end']) => { // Handle row styling for active / inactive rows
  const startDateTime = new Date(start)
  const endDateTime = new Date(end)
  const now = new Date()

  if(startDateTime < now && endDateTime > now) {
    return styles.tableData
  } else return styles.tableDataInactive
}