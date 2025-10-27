import styles from './Table.module.css'
import { handleHours, setProgressBar } from './utils'
import { useHandleTableRow } from './hooks'

// Types
import { TableDataType } from './utils'

// Components
import SchedulesTable from '../SchedulesTable'
import ParamedicIcon from '../../../icons/ParamedicIcon'
import PhoneIcon from '../../../icons/PhoneIcon'
import EmailIcon from '../../../icons/EmailIcon'

export const Headers = () => {

  return (
    <thead>
      <tr className={styles.header}>
        <th className="px-4">Employee</th>
        <th className="text-center rounded-tr-lg whitespace-nowrap lg:rounded-none md:transform md:-translate-x-10">Step-Up HRs.</th>
        <th className="text-center hidden lg:block">Recent Step Up Shifts</th>
      </tr>
    </thead>
  )
}

export const TableBody = ({ employees }: { employees: TableDataType[] }) => { // Employee table body

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

type TableRowProps = { employee: TableDataType, index: number }

export const TableRow = (props: TableRowProps) => { // Table row
  const { onMouseEnter, onMouseLeave, className, hovered } = useHandleTableRow(props.index)

  return (
    <tr
      key={`table-row-${ props.employee.employeeId }`}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
        <SetEmployee 
          employee={props.employee}
          hovered={hovered} />
        <Hours employee={props.employee} />

        <td className="hidden lg:table-cell">
          <div className={styles.schedule}>
            <SchedulesTable 
              schedules={props.employee.Schedules}
              employeeId={props.employee.employeeId} />
          </div>
        </td>
    </tr>
  )
}

type SetEmployeeProps = { employee: TableDataType, hovered?: boolean }

const SetEmployee = (props: SetEmployeeProps) => { // Employee table data cell
  
  return (
    <td>
      <div className={styles.employeeCell}>
        <div className="flex gap-2">
          <div className={styles.rank}>{props.employee.rank}</div>
          <div className={styles.shift}>{props.employee.shift} Shift</div>
          <Paramedic skills={props.employee.skills} />
        </div>
        <div className="flex flex-col items-center">
          <div className="flex gap-1 items-center">
            <div className="font-bold whitespace-nowrap md:indent-5 md:text-lg">{props.employee.fullName}</div>
            <Phone
              phone={props.employee.phone}
              hovered={props.hovered} />
            <Email
              email={props.employee.email}
              hovered={props.hovered} />
          </div>
        </div>

        <Skills
          skills={props.employee.skills}
          employeeId={props.employee.employeeId} />
        
      </div>
    </td>
  )
}

type PhoneProps = { phone: string, hovered: boolean | undefined }

const Phone = (props: PhoneProps) => { // Phone icon
  const variant = !props.hovered ? 'normal' : 'light'

  return (
    <div className={props.phone ? 'block' : 'hidden'}>
      <PhoneIcon
        iconProps={{ width: 20, height: 20, variant }} 
        phoneNumber={props.phone} />
    </div>
  )
}

type EmailProps = { email: string, hovered: boolean | undefined }

const Email = (props: EmailProps) => { // Email icon
  if(!props.email) return

  const variant = !props.hovered ? 'normal' : 'light'

  return (
    <EmailIcon
      iconProps={{ width: 20, height: 20, variant }} 
      email={props.email} />
  )
}

const Paramedic = ({ skills }: { skills: string }) => { // Paramedic icon
  const visible = skills.split(',').some(skill => skill === 'Paramedic')

  if(!visible) return

  return (
    <ParamedicIcon iconProps={{ width: 28, height: 28 }} />
  )
}

type SkillsProps = { skills: string, employeeId: string }

const Skills = (props: SkillsProps) => { // Employee skills

  return (
    <div className="flex flex-col indent-10 gap-1 leading-none">
      {props.skills.split(',').map(skill => {
        return (
          <small key={`employee-skill-${ props.employeeId }-${ skill }`}>{skill}</small>
        )
      })}
    </div>
  )
}

const Hours = ({ employee }: { employee: TableDataType }) => { // Step up hours table data cell
  if(!employee) return

  return (
    <td>
      <div className="flex flex-col items-center px-6 md:transform md:-translate-x-10">
        <div className={styles.hours}>{handleHours(employee.hours)} <span className="text-sm">HRs.</span></div>
        <progress className={`progress ${ setProgressBar(employee.hours) } h-4 shadow-lg`} value={employee.hours} max={73}></progress>
      </div>
    </td>
  )
}