import { useState } from "react"

// Icons
import iconDark from '@/assets/icons/email/email.svg'
import iconLight from '@/assets/icons/email/emailLight.svg'
import iconWarning from '@/assets/icons/email/emailWarning.svg'

/**
* 
**/
export const useHandleEmailIcon = (variant: 'light' | 'normal' | 'warning') => {
  const [state, setState] = useState<{ hovered: boolean }>({ hovered: false })

  const onMouseEnter = () => {
    setState({ hovered: true })
  }

  const onMouseLeave = () => {
    setState({ hovered: false })
  }

  const setIcon = () => {
    if(state.hovered) {
      return iconWarning
    }

    return variant === 'light' ?
      iconLight :
      iconDark
  }

  const icon = setIcon()

  return { onMouseEnter, onMouseLeave, icon }
}