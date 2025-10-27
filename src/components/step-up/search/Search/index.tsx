import styles from './Search.module.css'

// Components
import * as Components from './components'

function Search() {

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Search</h2>
      
      <Components.SearchInput />
      <Components.ClearBtn />
    </div>
  )
}

export default Search