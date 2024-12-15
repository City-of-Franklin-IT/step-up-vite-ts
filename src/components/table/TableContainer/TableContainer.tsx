import { useRef } from 'react'
import { useSetTableData, useSetSkills } from './hooks'
import { scrollToTop } from './utils'
import styles from './TableContainer.module.css'

// Types
import { TableContainerProps } from './types'

// Components
import FiltersContainer from '../../filters/FiltersContainer/FiltersContainer'
import Table from '../Table/Table'
import Search from '../../search/Search/Search'
import BackToTopBtn from '../../buttons/BackToTopBtn/BackToTopBtn'
import { Checkbox } from './components'

function TableContainer({ data }: TableContainerProps) {
  const topRef = useRef<HTMLDivElement>(null)

  const tableData = useSetTableData(data) // Set table data

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
        <Checkbox />
        <Table employees={tableData} />
      </div>

      <BackToTopBtn handleClick={() => scrollToTop(topRef)} />
    </div>
  )
}

export default TableContainer
