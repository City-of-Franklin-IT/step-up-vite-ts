import { useContext, useState } from 'react'
import AppContext from '../../../context/App/AppContext'
import { useSearch } from '.'
import styles from './Search.module.css'

// Types
import { SearchState } from './types'

function Search() {
  const { searchValue: searchValue_ctx } = useContext(AppContext)

  const [state, setState] = useState<SearchState>({ searchValue: '' })

  useSearch(state.searchValue)

  return (
    <div data-testid="search" className={styles.container}>
      <div className={styles.header}>Search</div>
      <input 
        data-testid="search-input"
        type="text" 
        value={state.searchValue} 
        placeholder="by employee name.." 
        onChange={(e) => setState(({ searchValue: e.target.value }))} 
        className="input bg-white rounded-r-none w-full" />
      <button 
        type="button" 
        onClick={() => setState({ searchValue: '' })}
        disabled={!searchValue_ctx && true}
        className="btn btn-primary uppercase rounded-l-none">
        Clear
      </button>
    </div>
  )
}

export default Search