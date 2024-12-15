// Types
import { HandleDateChangeProps, SetDateProps } from "./types"

export const handleDateChange = (event: HandleDateChangeProps['event'], setState: HandleDateChangeProps['setState']): void => {
  const date = new Date(event.target.value)

  if(!isNaN(date.getTime()) && date.getFullYear().toString().length === 4) { // Valid date/time
    return setState(prevState => ({ ...prevState, showDatePicker: false, date: event.target.value }))
  }
}

export const setDate = (date: SetDateProps['date']): string => {
  return date ? new Date(new Date(date).setDate(new Date(date).getDate() + 1)).toDateString() : new Date().toDateString()
}