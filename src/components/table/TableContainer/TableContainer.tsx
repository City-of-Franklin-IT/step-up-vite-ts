import { useContext, useRef } from 'react'
import AppContext from '../../../context/App/AppContext'
import { useSetTableData, useSetSkills, scrollToTop } from '.'
import styles from './TableContainer.module.css'

// Types
import { TableContainerProps } from './types'

// Components
import FiltersContainer from '../../filters/FiltersContainer/FiltersContainer'
import Table from '../Table/Table'
import Search from '../../search/Search/Search'
import BackToTopBtn from '../../buttons/BackToTopBtn/BackToTopBtn'

function TableContainer({ data }: TableContainerProps) {
  const { showAllStaff, dispatch } = useContext(AppContext)

  const topRef = useRef<HTMLDivElement>(null)

  const tableData = useSetTableData(data)

  const skills = useSetSkills(tableData)

  return (
    <div data-testid="table-container" ref={topRef} className={styles.container}>

      <section className="flex flex-col gap-14">
        <div className="ml-10 w-3/4">
          <Search />
        </div>
        <FiltersContainer skills={skills} />
      </section>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2 ml-auto items-center w-fit">
          <label className="text-white uppercase text-sm">Include Staff With 0 Hours</label>
          <input type="checkbox" className="toggle toggle-success" checked={showAllStaff} onChange={() => dispatch({ type: 'TOGGLE_SHOW_ALL_STAFF', payload: !showAllStaff })}></input>
        </div>
        <Table data={tableData} />
      </div>

      <BackToTopBtn handleClick={() => scrollToTop(topRef)} />

    </div>
  )
}

export default TableContainer
