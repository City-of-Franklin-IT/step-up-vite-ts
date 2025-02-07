import { useState } from 'react'
import { handleHours, setProgressBar } from './utils'
import styles from './Table.module.css'

// Types
import { ReactElement } from 'react'
import { TableData } from '../TableContainer/types'
import { TableRowProps, SetEmployeeProps } from './types'

// Components
import SchedulesTable from '../SchedulesTable'
import ParamedicIcon from '../../icons/ParamedicIcon'
import PhoneIcon from '../../icons/PhoneIcon'
import EmailIcon from '../../icons/EmailIcon'

export const TableBody = ({ employees }: { employees: TableData[] }) => { // Employee table body

  return (
    <tbody>
      {employees.map((employee, index) => {
        return (
          <TableRow
            key={`table-row-${ employee.employeeId }`}
            employee={employee}
            index={index} />
        )
      })}
    </tbody>
  )
}

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
        <Hours employee={employee} />

        <td className="hidden lg:table-cell">
          <div className={styles.schedule}>
            <SchedulesTable 
              schedules={employee.Schedules}
              employeeId={employee.employeeId} />
          </div>
        </td>
    </tr>
  )
}

const SetEmployee = ({ employee, hovered }: SetEmployeeProps): ReactElement => { // Employee table data cell
  
  return (
    <td>
      <div className={styles.employeeCell}>
        <div className="flex gap-2">
          <div className={styles.rank}>{employee.rank}</div>
          <div className={styles.shift}>{employee.shift} Shift</div>
          <Paramedic skills={employee.skills} />
        </div>
        <div className="flex flex-col items-center">
          <div className="flex gap-1 items-center">
            <div className="font-bold whitespace-nowrap md:indent-5 md:text-lg">{employee.fullName}</div>
            <Phone
              phone={employee.phone}
              hovered={hovered} />
            <Email
              email={employee.email}
              hovered={hovered} />
          </div>
        </div>

        <Skills
          skills={employee.skills}
          employeeId={employee.employeeId} />
        
      </div>
    </td>
  )
}

const Phone = ({ phone, hovered }: { phone: string, hovered: boolean | undefined }) => { // Phone icon

  return (
    <div className={phone ? 'block' : 'hidden'}>
      <PhoneIcon 
        width={20} 
        height={20}
        phoneNumber={phone}
        variant={!hovered ? 'normal' : 'light'}  />
    </div>
  )
}

const Email = ({ email, hovered }: { email: string, hovered: boolean | undefined } ) => { // Email icon

  return (
    <div className={email ? 'block' : 'hidden'}>
      <EmailIcon 
        width={20}
        height={20}
        email={email}
        variant={!hovered ? 'normal' : 'light'} />
    </div>
  )
}

const Paramedic = ({ skills }: { skills: string }) => { // Paramedic icon

  return (
    <>
      {skills.split(',').some(skill => skill === 'Paramedic') ? (
        <ParamedicIcon 
          width={28}
          height={28} />
      ) : null}
    </>
  )
}

const Skills = ({ skills, employeeId }: { skills: string, employeeId: string }) => { // Employee skills

  return (
    <div className="flex flex-col indent-10 gap-1 leading-none">
      {skills.split(',').map(skill => {
        return (
          <small key={`employee-skill-${ employeeId }-${ skill }`}>{skill}</small>
        )
      })}
    </div>
  )
}

const Hours = ({ employee }: SetEmployeeProps): ReactElement => { // Step up hours table data cell

  return (
    <td>
      <div className="flex flex-col items-center px-6 md:transform md:-translate-x-10">
        <div className={styles.hours}>{handleHours(employee.hours)} <span className="text-sm">HRs.</span></div>
        <progress className={`progress ${ setProgressBar(employee.hours) } h-4 shadow-lg`} value={employee.hours} max={73}></progress>
      </div>
    </td>
  )
}