import { useContext } from "react"
import AppContext from "../../../context/App/AppContext"

export const Checkbox = () => { // Show all staff checkbox
  const { showAllStaff, dispatch } = useContext(AppContext)

  return (
    <div className="flex gap-2 ml-auto items-center w-fit">
      <label className="text-white uppercase text-sm">Include Staff With 0 Hours</label>
      <input type="checkbox" className="toggle toggle-success" checked={showAllStaff} onChange={() => dispatch({ type: 'TOGGLE_SHOW_ALL_STAFF', payload: !showAllStaff })}></input>
    </div>
  )
}