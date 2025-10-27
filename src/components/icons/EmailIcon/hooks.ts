import { useState, useCallback } from "react"

// Icons
import iconDark from '@/assets/icons/email/email.svg'
import iconLight from '@/assets/icons/email/emailLight.svg'
import iconWarning from '@/assets/icons/email/emailWarning.svg'

export const useHandleEmailIcon = (variant: 'light' | 'normal' | 'warning') => {
  const [state, setState] = useState<{ hovered: boolean }>({ hovered: false })

  const onMouseEnter = () => {
    setState({ hovered: true })
  }

  const onMouseLeave = () => {
    setState({ hovered: false })
  }

  const setIcon = useCallback(() => {
    if(state.hovered) {
      return iconWarning
    }

    if(variant === 'light') {
      return iconLight
    }

    return iconDark
  }, [state.hovered, variant])

  const icon = setIcon()

  return { onMouseEnter, onMouseLeave, icon }
}