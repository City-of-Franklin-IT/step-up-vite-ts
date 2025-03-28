// Components
import * as Components from './components'

function RosterLegend() {

  return (
    <div data-testid="roster-legend" className="flex gap-3">
      <Components.LegendItem
        className={['bg-error', 'text-error-content']}
        label={'Captain'} />
      <Components.LegendItem
        className={['bg-warning', 'text-warning-content']}
        label={'Lieutenant'} />
      <Components.LegendItem
        className={['bg-success', 'text-success-content']}
        label={'Engineer'} />
      <Components.LegendItem
        className={['bg-info', 'text-info-content']}
        label={'Paramedic'} />
    </div>
  )
}

export default RosterLegend
