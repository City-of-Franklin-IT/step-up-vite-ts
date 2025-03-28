// Types
import { HandleDateChangeProps } from "./types"

export const handleDateChange = (event: HandleDateChangeProps['event'], setState: HandleDateChangeProps['setState']): void => {
  const date = new Date(event.target.value)

  if(!isNaN(date.getTime()) && date.getFullYear().toString().length === 4) { // Valid date/time
    return setState(prevState => ({ ...prevState, showDatePicker: false, date: event.target.value }))
  }
}