import { useState } from 'react'
import { useSearch } from './hooks'
import styles from './Search.module.css'

// Types
import { SearchState } from './types'

// Components
import * as Components from './components'

function Search() {
  const [state, setState] = useState<SearchState>({ searchValue: '' })

  useSearch(state.searchValue)

  return (
    <div data-testid="search" className={styles.container}>
      <h2 className={styles.header}>Search</h2>
      
      <Components.SearchInput 
        value={state.searchValue}
        onChange={(e) => setState(({ searchValue: e.target.value }))} />
      <Components.ClearBtn onClick={() => setState({ searchValue: '' })} />
    </div>
  )
}

export default Search