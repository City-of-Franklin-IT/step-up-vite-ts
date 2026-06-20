// Types
import type { TableDataType } from './utils'

// Components
import * as Components from './components'

function Table({ employees }: { employees: TableDataType[] }) {

  return (
    <div className="flex flex-col font-[play] rounded-md w-full overflow-hidden">
      <table>
        <Components.Headers />
        <Components.TableBody employees={employees} />
      </table>
    </div>
  )
}

export default Table