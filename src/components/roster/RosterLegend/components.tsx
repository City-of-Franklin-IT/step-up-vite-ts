import styles from './RosterLegend.module.css'

// Types
import { HTMLAttributes } from 'react'

type LegendItemProps = Omit<HTMLAttributes<HTMLDivElement>, 'className'> & { className: [string, string], label: string }

export const LegendItem = (props: LegendItemProps) => {

  return (
    <div className={`flex ${ props.className[0] } items-center px-1 rounded`}><span className={`${ styles.label } ${ props.className[1] }`}>{props.label}</span></div>
  )
}