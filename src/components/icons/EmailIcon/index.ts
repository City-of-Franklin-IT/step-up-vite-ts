// Icons
import icon from '../../../assets/icons/email/email.svg'
import iconLight from '../../../assets/icons/email/emailLight.svg'
import iconWarning from '../../../assets/icons/email/emailWarning.svg'

// Types
import { SetVariantProps } from "./types"

export const setVariant = (variant: SetVariantProps['variant'], state: SetVariantProps['state']) => {
  if(state.hovered) { // Warning
    return iconWarning
  }

  if(variant === 'light') { // Light
    return iconLight
  }

  return icon // Normal
}