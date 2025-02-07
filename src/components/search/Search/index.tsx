import { useState } from 'react'
import { useSearch } from './hooks'
import styles from './Search.module.css'

// Types
import { SearchState } from './types'

// Components
import { SearchInput, ClearBtn } from './components'

function Search() {
  const [state, setState] = useState<SearchState>({ searchValue: '' })

  useSearch(state.searchValue)

  return (
    <div data-testid="search" className={styles.container}>
      <div className={styles.header}>Search</div>
      <SearchInput 
        searchValue={state.searchValue}
        handleChange={(e) => setState(({ searchValue: e.target.value }))} />
      <ClearBtn resetState={() => setState({ searchValue: '' })} />
    </div>
  )
}

export default Search