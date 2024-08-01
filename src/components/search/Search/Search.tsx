import { useContext } from 'react'
import AppContext from '../../../context/App/AppContext'
import styles from './Search.module.css'

// Types
import { SearchProps } from './types'

function Search({ searchValue, setSearchValue }: SearchProps) {
  const { searchValue: searchValue_ctx, dispatch } = useContext(AppContext)

  return (
    <div className={styles.container}>
      <div className={styles.header}>Search</div>
      <input 
        type="text" 
        value={searchValue} 
        placeholder="by employee name.." 
        onChange={(e) => setSearchValue(prevState => ({ ...prevState, searchValue: e.target.value }))} 
        className="input bg-white rounded-r-none w-full" />
      <button 
        type="button" 
        onClick={() => {
          dispatch({ type: 'SET_SEARCH_VALUE', payload: '' })
          setSearchValue(prevState => ({ ...prevState, searchValue: '' }))
        }}
        disabled={!searchValue_ctx && true}
        className="btn btn-primary uppercase rounded-l-none">
        Clear
      </button>
    </div>
  )
}

export default Search