import styles from './RosterLegend.module.css'

function RosterLegend() {
  return (
    <div data-testid="roster-legend" className="flex gap-3">
      <div className="flex bg-error items-center px-1 rounded"><span className={styles.label}>Captain</span></div>
      <div className="flex bg-warning items-center px-1 rounded"><span className={`${ styles.label } text-warning-content`}>Lieutenant</span></div>
      <div className="flex bg-success items-center px-1 rounded"><span className={`${ styles.label } text-success-content`}>Engineer</span></div>
      <div className="flex bg-info items-center px-1 rounded"><span className={`${ styles.label } text-info-content`}>Paramedic</span></div>
    </div>
  )
}

export default RosterLegend
