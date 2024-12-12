import { useState } from 'react'
import styles from './Table.module.css'

// Types
import { ReactElement } from 'react'
import { TableRowProps, IsParamedicProps, SetEmployeeProps } from './types'

// Components
import SchedulesTable from '../SchedulesTable/SchedulesTable'
import ParamedicIcon from '../../icons/ParamedicIcon/ParamedicIcon'
import PhoneIcon from '../../icons/PhoneIcon/PhoneIcon'
import EmailIcon from '../../icons/EmailIcon/EmailIcon'

export const TableRow = ({ employee, index }: TableRowProps): ReactElement => { // Table row
  const [state, setState] = useState<{ hovered: boolean }>({ hovered: false })

  return (
    <tr
      key={`table-row-${ employee.employeeId }`}
      className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
      onMouseEnter={() => setState({ hovered: true })}
      onMouseLeave={() => setState({ hovered: false })}>
        <SetEmployee 
          employee={employee}
          hovered={state.hovered} />
        <SetHours employee={employee} />

        <td className="hidden lg:table-cell">
          <div className={styles.schedule}>
            <SchedulesTable 
              data={employee.Schedules}
              employeeId={employee.employeeId} />
          </div>
        </td>
    </tr>
  )
}

export const SetEmployee = ({ employee, hovered }: SetEmployeeProps): ReactElement => { // Employee table data cell
  return (
    <td>
      <div className={styles.employeeCell}>
        <div className="flex gap-2">
          <div className={styles.rank}>{employee.rank}</div>
          <div className={styles.shift}>{employee.shift} Shift</div>
          {isParamedic(employee.skills)}
        </div>
        <div className="flex flex-col items-center">
          <div className="flex gap-1 items-center">
            <div className="font-bold whitespace-nowrap md:indent-5 md:text-lg">{employee.fullName}</div>
            {employee.phone && (
              <PhoneIcon 
                width={20} 
                height={20}
                phoneNumber={employee.phone}
                variant={!hovered ? 'normal' : 'light'}  />
            )}
            {employee.email && (
              <EmailIcon 
                width={20} 
                height={20} 
                email={employee.email}
                variant={!hovered ? 'normal' : 'light'} />
            )}
          </div>
        </div>

        <div className="flex flex-col indent-10 gap-1 leading-none">
          {employee.skills.split(',').map((skill, index) => {
            return (
              <small key={`${ employee.employeeId }-${ skill }-${ index }`}>{skill}</small>
            )
          })}
        </div>
        
      </div>
    </td>
  )
}

export const SetHours = ({ employee }: SetEmployeeProps): ReactElement => { // Step up hours table data cell
  return (
    <td>
      <div className="flex flex-col items-center px-6 md:transform md:-translate-x-10">
        <div className={styles.hours}>{handleHours(employee.hours)} <span className="text-sm">HRs.</span></div>
        <progress className={`progress ${ setProgressBar(employee.hours) } h-4 shadow-lg`} value={employee.hours} max={73}></progress>
      </div>
    </td>
  )
}

const handleHours = (hours: number): string => { // Handle hours worked
  if(hours > 72) {
    return "72+"
  } else return hours.toString()
}

const setProgressBar = (hours: number): string => { // Set step up hrs progress bar color
  if(hours > 72) { // >72 hrs
    return 'progress-success'
  }

  if(hours === 72) { // Exactly 72 hours
    return 'bg-success/30'
  }

  return 'progress-warning bg-warning/20'
}

const isParamedic = (skills: IsParamedicProps['skills']): ReactElement | null => { // Determine if paramedic
  if(skills.split(',').find(obj => obj.trim() === 'Paramedic')) {
    return (
      <ParamedicIcon width={28} height={28} />
    )
  }

  return null
}