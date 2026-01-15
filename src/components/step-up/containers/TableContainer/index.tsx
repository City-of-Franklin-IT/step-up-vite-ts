import { useHandleTableContainer } from './hooks'
import { scrollToTop } from './utils'
import styles from './TableContainer.module.css'

// Types
import * as AppTypes from '@/context/App/AppTypes'

// Components
import FiltersContainer from '../../filters/FiltersContainer'
import Table from '../../tables/Table'
import Search from '../../search/Search'
import BackToTopBtn from '../../buttons/BackToTopBtn'
import * as Components from './components'

function TableContainer({ staff }: { staff: AppTypes.StaffInterface[] | undefined }) {
  const { tableData, skills, topRef } = useHandleTableContainer(staff)

  return (
    <div ref={topRef} className={styles.container}>
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
