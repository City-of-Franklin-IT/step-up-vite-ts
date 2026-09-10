// Components
import * as Components from './components'

function Search() {

  return (
    <label className="flex-1 flex flex-col gap-2">
      <span className="font-[jura] uppercase text-base text-neutral-content/90">Search</span>
      <div className="join w-full">
        <Components.SearchInput />
        <Components.ClearBtn />
      </div>
    </label>
  )
}

export default Search
