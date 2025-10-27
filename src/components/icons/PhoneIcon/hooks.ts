import { useState, useCallback } from 'react'

// Icons
import iconDark from '@/assets/icons/phone/phone.svg'
import iconLight from '@/assets/icons/phone/phoneLight.svg'  
import iconWarning from '@/assets/icons/phone/phoneWarning.svg'  

export const useHandlePhoneIcon = (variant: 'normal' | 'light') => {
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