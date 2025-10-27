import { useHandleSearch, useHandleClearBtn } from './hooks'

export const SearchInput = () => {
  const { searchValue, onChange } = useHandleSearch()

  return (
    <input 
      type="text" 
      value={searchValue} 
      placeholder="by employee name.." 
      onChange={onChange} 
      className="input bg-white rounded-r-none w-full" />
  )
}

export const ClearBtn = () => {
  const { disabled, onClick } = useHandleClearBtn()

  return (
    <button 
      type="button" 
      disabled={disabled}
      onClick={onClick}
      className="btn btn-primary uppercase rounded-l-none">
        Clear
    </button>
  )
}