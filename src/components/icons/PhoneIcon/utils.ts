import icon from '../../../assets/icons/phone/phone.svg'
import iconLight from '../../../assets/icons/phone/phoneLight.svg'  
import iconWarning from '../../../assets/icons/phone/phoneWarning.svg'  

// Types
import { SetVariantProps } from "./types"

export const setVariant = (variant: SetVariantProps['variant'], state: SetVariantProps['state']) => {
  if(state.hovered) { // Warning / hovered
    return iconWarning
  }

  if(variant === 'light') { // Light
    return iconLight
  }

  return icon // Normal
}