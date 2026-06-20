import styles from './RosterLegend.module.css'

export const LegendItems = () => (
  <div className="flex gap-3 ml-auto">
    <LegendItem className={{ bgColor: 'bg-error', textColor: 'text-neutral-content' }}>
      Captain
    </LegendItem>
    <LegendItem className={{ bgColor: 'bg-warning', textColor: 'text-neutral' }}>
      Lieutenant
    </LegendItem>
    <LegendItem className={{ bgColor: 'bg-success', textColor: 'text-success-content' }}>
      Engineer
    </LegendItem>
    <LegendItem className={{ bgColor: 'bg-info', textColor: 'text-neutral' }}>
      Paramedic
    </LegendItem>
  </div>
)

type LegendItemProps = { 
  className: { 
    bgColor: string
    textColor: string 
  }
  children: React.ReactNode 
}

const LegendItem = (props: LegendItemProps) => (
  <div className={`flex ${ props.className.bgColor } items-center px-1 rounded`}>
    <span className={`${ styles.label } ${ props.className.textColor }`}>{props.children}</span>
  </div>
)