import { useRef } from 'react'
import { useSetTableData, useSetSkills } from './hooks'
import { scrollToTop } from './utils'
import styles from './TableContainer.module.css'

// Types
import { Staff } from '../../../context/App/types'

// Components
import FiltersContainer from '../../filters/FiltersContainer'
import Table from '../Table'
import Search from '../../search/Search'
import BackToTopBtn from '../../buttons/BackToTopBtn'
import * as Components from './components'

function TableContainer({ staff }: { staff: Staff[] }) {
  const topRef = useRef<HTMLDivElement>(null)

  const tableData = useSetTableData(staff) // Set table data

  const skills = useSetSkills(tableData) // Set skills for filter

  return (
    <div data-testid="table-container" ref={topRef} className={styles.container}>
      <div className="flex flex-col gap-14">
        <div className="ml-10 w-3/4">
          <Search />
        </div>
        <FiltersContainer skills={skills} />
      </div>

      <div className="flex flex-col gap-3">
        <Components.Checkbox />
        <Table employees={tableData} />
      </div>

      <BackToTopBtn onClick={() => scrollToTop(topRef)} />
    </div>
  )
}

export default TableContainer
