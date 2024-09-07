import { useState } from 'react'
import { useGetWindowSize } from '../../../helpers'
import { handleRowHover, handleHours, isParamedic } from '.'
import styles from './Table.module.css'

// Types
import { TableProps, TableState } from './types'

// Components
import SchedulesTable from '../SchedulesTable/SchedulesTable'
import PhoneIcon from '../../icons/PhoneIcon/PhoneIcon'
import EmailIcon from '../../icons/EmailIcon/EmailIcon'

function Table({ data }: TableProps) {
  const [state, setState] = useState<TableState>({ hovered: undefined })

  const windowSize = useGetWindowSize()

  return (
    <div data-testid="table" className={styles.container}>
      <table>

        <thead>
          <tr className={styles.header}>
            <th className="px-4">Employee</th>
            <th className="text-center rounded-tr-lg whitespace-nowrap lg:rounded-none md:transform md:-translate-x-10">Step-Up HRs.</th>
            <th className="text-center hidden lg:block">Recent Step Up Shifts</th>
          </tr>
        </thead>

        <tbody>
          {data.map((obj, index) => {
            return (
              <tr
                key={`${ obj.employeeId }-tableRow-${ index }`} 
                className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
                onMouseEnter={() => handleRowHover(setState, windowSize, index)}
                onMouseLeave={() => setState({ hovered: undefined })}>

                <td>
                  <div className={styles.employeeCell}>
                    <div className="flex gap-2">
                      <div className={styles.rank}>{obj.rank}</div>
                      {isParamedic(obj.skills)}
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex gap-1 items-center">
                        <div className="font-bold whitespace-nowrap md:indent-5 md:text-lg">{obj.fullName}</div>
                        {obj.phone && (
                          <PhoneIcon 
                            width={20} 
                            height={20}
                            phoneNumber={obj.phone}
                            variant={state.hovered === index ? 'light' : 'normal'}  />
                        )}
                        {obj.email && (
                          <EmailIcon 
                            width={20} 
                            height={20} 
                            email={obj.email}
                            variant={state.hovered === index ? 'light' : 'normal'} />
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col indent-10 gap-1 leading-none">
                      {obj.skills.split(',').map((skill, index) => {
                        return (
                          <small key={`${ obj.employeeId }-${ skill }-${ index }`}>{skill}</small>
                        )
                      })}
                    </div>
                  </div>
                </td>

                <td>
                  <div className="flex flex-col items-center px-6 md:transform md:-translate-x-10">
                    <div className={styles.hours}>{handleHours(obj.hours)} <span className="text-sm">HRs.</span></div>
                    <progress className={`progress ${ obj.hours > 72 ? 'progress-success' : 'progress-warning' } bg-warning/20 h-4 shadow-lg`} value={obj.hours} max={73}></progress>
                  </div>
                </td>

                <td className="hidden lg:table-cell">
                  <div className={styles.schedule}>
                    <SchedulesTable data={obj.Schedules} />
                  </div>
                </td>
                
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table
