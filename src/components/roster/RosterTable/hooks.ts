import { useMemo } from "react"

// Types
import { RosterItem } from "../RosterContainer/types"
import { OrderRanksProps } from "./types"

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