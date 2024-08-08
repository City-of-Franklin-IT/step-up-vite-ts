// Types
import { IsParamedicProps } from './types'

// Components
import ParamedicIcon from '../../icons/ParamedicIcon/ParamedicIcon'
import { ReactElement } from 'react'

export const handleHours = (hours: number): string => { // Handle hours worked
  if(hours > 72) {
    return "72+"
  } else return hours.toString()
}

export const isParamedic = (skills: IsParamedicProps['skills']): ReactElement | null => { // Determine if paramedic
  if(skills.split(',').find(obj => obj.trim() === 'Paramedic')) {
    return (
      <ParamedicIcon width={28} height={28} />
    )
  }

  return null
}