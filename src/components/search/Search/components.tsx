import { useContext, ReactElement, ChangeEvent } from "react"
import AppContext from "../../../context/App/AppContext"

export const SearchInput = ({ searchValue, handleChange }: { searchValue: string, handleChange: (e: ChangeEvent<HTMLInputElement>) => void }): ReactElement => {
  return (
    <input 
      data-testid="search-input"
      type="text" 
      value={searchValue} 
      placeholder="by employee name.." 
      onChange={(e) => handleChange(e)} 
      className="input bg-white rounded-r-none w-full" />
  )
}

export const ClearBtn = ({ resetState }: { resetState: () => void }): ReactElement => {
  const { searchValue: searchValue_ctx } = useContext(AppContext)

  return (
    <button 
      type="button" 
      onClick={resetState}
      disabled={!searchValue_ctx && true}
      className="btn btn-primary uppercase rounded-l-none">
      Clear
    </button>
  )
}