import { useContext, useState, useEffect, useRef } from 'react'
import AppContext from '../../../context/App/AppContext'
import { useSetTableData, useSearch, useSetSkills, handleResetSearchBtn, scrollToTop } from '.'
import styles from './TableContainer.module.css'

// Types
import { TableContainerProps, TableContainerState } from './types'

// Components
import SkillsFilterContainer from '../../skills/SkillsFilterContainer/SkillsFilterContainer'
import QualifiedFilterContainer from '../../qualified/QualifiedFilterContainer/QualifiedFilterContainer'
import QualifiedBtn from '../../buttons/QualifiedBtn/QualifiedBtn'
import ResetSearchBtn from '../../buttons/ResetSearchBtn/ResetSearchBtn'
import Table from '../Table/Table'
import Search from '../../search/Search/Search'
import BackToTopBtn from '../../buttons/BackToTopBtn/BackToTopBtn'

function TableContainer({ data }: TableContainerProps) {
  const { filter, skillsFilter, searchValue, dispatch } = useContext(AppContext)

  const [state, setState] = useState<TableContainerState>({ searchValue: '' })

  const topRef = useRef<HTMLDivElement>(null)

  const tableData = useSetTableData(data, filter, skillsFilter, searchValue)

  const handleSearch = useSearch(state.searchValue, dispatch)

  const skills = useSetSkills(tableData)

  useEffect(() => { // Set searchValue to ctx
    handleSearch()
  }, [state.searchValue])

  return (
    <div ref={topRef} className={styles.container}>
      <div className="flex flex-col gap-14">
        <div className="ml-10 w-1/2">
          <Search
            searchValue={state.searchValue}
            setSearchValue={setState} />
        </div>
        <QualifiedFilterContainer 
          handleResetSearchBtn={() => handleResetSearchBtn(setState, dispatch)} />
        <SkillsFilterContainer
          skills={skills} 
          handleResetSearchBtn={() => handleResetSearchBtn(setState, dispatch)} />
      </div>
      <Table data={tableData} />
      <BackToTopBtn handleClick={() => scrollToTop(topRef)} />
    </div>
  )
}

export default TableContainer
