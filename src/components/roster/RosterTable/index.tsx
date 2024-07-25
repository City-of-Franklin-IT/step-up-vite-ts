import { ReactElement, useMemo } from 'react'

// Types
import { RosterItem } from '../RosterContainer/types'
import { OrderRanksProps, HandleRankProps } from './types'

export const useOrderRanks = (data: OrderRanksProps['data']): RosterItem[] => useMemo(() => { // Order by rank
  return data.sort((a, b) => {
    if(a.rankAbrv === 'BC') {
      return -1
    }

    if(a.rankAbrv === 'OFF' && b.rankAbrv !== 'BC') {
      return -1
    }

    if(a.rankAbrv === 'ENG' && b.rankAbrv === 'FF') {
      return -1
    }

    if(a.rankAbrv === 'ENG' && b.rankAbrv === 'OFF') {
      return 1
    }

    if(a.rankAbrv === 'FF') {
      return 1
    }

    return 0
  })
}, [data])

export const handleRank = (data: HandleRankProps['data']): ReactElement => { // Handle rank indicators
  switch(data.rank) {
    case 'FireCapt':
      return (
        <div className="flex gap-1 items-center">
          {data.name}
          <div className="bg-error w-[10px] h-[10px] rounded-full" title="Captain"></div>
          {data.isParamedic && (
            <div className="bg-info w-[10px] h-[10px] rounded-full" title="Paramedic"></div>
          )}
        </div>
      )
    case 'FireLT':
      return (
        <div className="flex gap-1 items-center">
          {data.name}
          <div className="bg-warning w-[10px] h-[10px] rounded-full" title="Lieutenant"></div>
          {data.isParamedic && (
            <div className="bg-info w-[10px] h-[10px] rounded-full" title="Paramedic"></div>
          )}
        </div>
      )
    case 'FireE':
      return (
        <div className="flex gap-1 items-center">
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