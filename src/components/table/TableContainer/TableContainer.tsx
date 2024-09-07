import { useContext, useState, useEffect, useRef } from 'react'
import AppContext from '../../../context/App/AppContext'
import { useSetTableData, useSearch, useSetSkills, handleResetSearchBtn, scrollToTop } from '.'
import styles from './TableContainer.module.css'

// Types
import { TableContainerProps, TableContainerState } from './types'

// Components
import SkillsFilterContainer from '../../skills/SkillsFilterContainer/SkillsFilterContainer'
import QualifiedFilterContainer from '../../qualified/QualifiedFilterContainer/QualifiedFilterContainer'
import Table from '../Table/Table'
import Search from '../../search/Search/Search'
import BackToTopBtn from '../../buttons/BackToTopBtn/BackToTopBtn'

function TableContainer({ data }: TableContainerProps) {
  const { filter, skillsFilter, showAllStaff, searchValue, dispatch } = useContext(AppContext)

  const [state, setState] = useState<TableContainerState>({ searchValue: '' })

  const topRef = useRef<HTMLDivElement>(null)

  const handleSearch = useSearch(state.searchValue, dispatch)

  const tableData = useSetTableData(data, filter, skillsFilter, showAllStaff, searchValue)

  const skills = useSetSkills(tableData)

  useEffect(() => { // Set searchValue to ctx
    handleSearch()
  }, [state.searchValue])

  return (
    <div data-testid="table-container" ref={topRef} className={styles.container}>

      <section className="flex flex-col gap-14">
        <div className="ml-10 w-3/4">
          <Search
            searchValue={state.searchValue}
            setSearchValue={setState} />
        </div>
        <QualifiedFilterContainer 
          handleResetSearchBtn={() => handleResetSearchBtn(setState, dispatch)} />
        <SkillsFilterContainer
          skills={skills} 
          handleResetSearchBtn={() => handleResetSearchBtn(setState, dispatch)} />
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
