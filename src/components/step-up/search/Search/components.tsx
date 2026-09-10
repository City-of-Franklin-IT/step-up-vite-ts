import { useHandleSearch, useHandleClearBtn } from './hooks'

export const SearchInput = () => {
  const searchProps = useHandleSearch()

  return (
    <input
      type="text"
      placeholder="by employee name.."
      className="input join-item w-full"
      { ...searchProps } />
  )
}

export const ClearBtn = () => {
  const btnProps = useHandleClearBtn()

  return (
    <button
      type="button"
      className="btn btn-primary join-item uppercase"
      { ...btnProps }>
        Clear
    </button>
  )
}
