import { useMemo } from "react"

// Types
import { RosterItemType } from "../../context"

/**
* Returns table data ordered by rank and shift start date/time
**/
export const useOrderRanks = (rosters: RosterItemType[]): RosterItemType[] => {

  const array = useMemo(() => {
    return rosters.sort((a, b) => {
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
  }, [rosters])

  return array
}