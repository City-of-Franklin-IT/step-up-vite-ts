import { useHandleCheckbox } from './hooks'

export const Checkbox = () => { // Show all staff checkbox
  const inputProps = useHandleCheckbox()

  return (
    <div className="flex gap-2 ml-auto items-center w-fit">
      <label className="text-white uppercase text-sm">Include Staff With 0 Hours</label>
      <input 
        type="checkbox" 
        className="toggle toggle-success" 
        { ...inputProps }></input>
    </div>
  )
}