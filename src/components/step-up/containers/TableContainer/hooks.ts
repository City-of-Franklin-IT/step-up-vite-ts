import { useMemo, useContext, useRef } from "react"
import StepUpCtx from "../../context"
import { filterQualified } from "./utils"

// Types
import * as AppTypes from '@/context/App/AppTypes'

export interface TableData {
  employeeId: string
  rank: AppTypes.RankType
  fullName: string
  skills: string
  phone: string
  email: string
  hours: number
  shift: AppTypes.ShiftType | null
  Schedules: AppTypes.ScheduleInterface[]
  [key: string]: string | AppTypes.RankType | number | AppTypes.ScheduleInterface[] | null
}

/**
* Returns step up table data, skills array, and container ref
**/
export const useHandleTableContainer = (staff: AppTypes.StaffInterface[] | undefined): { tableData: TableData[], skills: string[], topRef: React.RefObject<HTMLDivElement|null> } => { // Set table data
  const { filter, skillsFilter, showAllStaff, searchValue, shiftFilter } = useContext(StepUpCtx)

  const topRef = useRef<HTMLDivElement>(null)

  if(!staff) return { tableData: [], skills: [], topRef }

  const tableData = useMemo(() => {
    let data: TableData[] = []

    if(filter) { // Handle qualified filter
      data = filterQualified(staff, filter)
    } else {
      data = staff.map(x => {
        let hours = 0

        x.StepUps.forEach(y => hours += y.hours) // Sum hours

        const entry: TableData = {
          employeeId: x.employeeId,
          rank: x.rank,
          fullName: x.fullName,
          skills: x.skills,
          phone: x.phone,
          email: x.email,
          hours,
          shift: x.shift,
          Schedules: x.Schedules
        }

        return entry
      })
    }

    if(shiftFilter) { // Handle shift filter
      data = data.filter(obj => {
        return obj.shift === shiftFilter
      })
    }

    if(skillsFilter) { // Handle skills filter
      data = data.filter(obj => {
        const skills = obj.skills.split(',').map(skill => skill.trim())

        return skills.includes(skillsFilter)
      })
    }

    if(searchValue) { // Handle search
      const regex = new RegExp(searchValue, 'i')

      data = data.filter(obj => {
        for(const prop in obj) {
          if(typeof obj[prop] === 'string' && regex.test(obj[prop])) {
            return true
          }
        }
        return false
      })
    }

    if(!showAllStaff) {
      return data.filter(obj => obj.hours > 0)
    }

    return data
  }, [staff, filter, skillsFilter, showAllStaff, searchValue, shiftFilter])

  const skills = useSetSkills(tableData)

  return { tableData, skills, topRef }
}

/**
* Returns show all employees checkbox props
**/
export const useHandleCheckbox = () => {
  const { showAllStaff, dispatch } = useContext(StepUpCtx)

  const onChange = () => {
    dispatch({ type: 'TOGGLE_SHOW_ALL_STAFF', payload: !showAllStaff })
  }

  return { onChange, checked: showAllStaff }
}

/**
* Returns array of unique skills for filter component
**/
const useSetSkills = (staff: TableData[]): string[] => { // Set employee skills
  const skills = useMemo(() => {
    const skills: string[] = []
  
    staff.forEach(employee => {
      employee.skills.split(',').forEach(x => {
        if(!skills.includes(x.trim())) {
          skills.push(x.trim())
        }
      })
    })
  
    return skills.filter(obj => obj !== '')
  }, [staff])

  return skills
}