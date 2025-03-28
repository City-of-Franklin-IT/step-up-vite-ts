import { useContext, ChangeEvent } from "react"
import AppContext from "../../../context/App/AppContext"

// Types
import { InputHTMLAttributes, ButtonHTMLAttributes, MouseEventHandler } from "react"

type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> & { value: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void }

export const SearchInput = (props: SearchInputProps) => {
  return (
    <input 
      data-testid="search-input"
      type="text" 
      value={props.value} 
      placeholder="by employee name.." 
      onChange={(e) => props.onChange(e)} 
      className="input bg-white rounded-r-none w-full" />
  )
}

type ClearBtnProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & { onClick: MouseEventHandler<HTMLButtonElement> }

export const ClearBtn = (props: ClearBtnProps) => {
  const { searchValue } = useContext(AppContext)

  return (
    <button 
      type="button" 
      onClick={props.onClick}
      disabled={!searchValue}
      className="btn btn-primary uppercase rounded-l-none">
      Clear
    </button>
  )
}