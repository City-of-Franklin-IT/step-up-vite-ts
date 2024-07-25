// Types
import { HandleTimeProps } from "./types"

export const handleTime = (time: HandleTimeProps['time']): string => { // Format and return time
  return time.split("T")[1].replace("Z", '').split('.')[0]
}