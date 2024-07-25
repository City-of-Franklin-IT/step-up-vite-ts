import { handleHours, isParamedic } from '.'
import styles from './Table.module.css'

// Types
import { TableProps } from './types'

// Components
import SchedulesTable from '../SchedulesTable/SchedulesTable'

function Table({ data }: TableProps) {
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr className={styles.header}>
            <th className="px-4">Employee</th>
            <th className="text-center">Total Step-Up HRs.</th>
            <th className="text-center">Recent Step Up Shifts</th>
          </tr>
        </thead>
        <tbody>
          {data.map((obj, index) => {
            return (
              <tr key={`${ obj.employeeId }-tableRow-${ index }`} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                <td>
                  <div className={styles.employeeCell}>
                    <div className={styles.rank}>{obj.rank}</div>
                    <div className="flex gap-2">
                      <div className="indent-5 text-lg font-bold">{obj.fullName}</div>
                      {isParamedic(obj.skills)}
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
                  <div className="flex flex-col items-center px-6">
                    <div className={styles.hours}>{handleHours(obj.hours)} <span className="text-sm">HRs.</span></div>
                    <progress className={`progress ${ obj.hours >= 72 ? 'progress-success' : 'progress-warning' } bg-warning/20 h-4 shadow-lg`} value={obj.hours} max={72}></progress>
                  </div>
                </td>
                <td>
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
