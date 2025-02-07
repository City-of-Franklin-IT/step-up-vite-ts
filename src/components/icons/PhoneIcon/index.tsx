import { useState } from 'react'
import { Link } from 'react-router-dom'
import { setVariant } from './utils'
import styles from './PhoneIcon.module.css'

// Types
import { PhoneIconProps, PhoneIconState } from './types'

function PhoneIcon({ width, height, phoneNumber, variant }: PhoneIconProps) {
  const [state, setState] = useState<PhoneIconState>({ hovered: false })

  return (
    <Link
      data-testid="phone-icon" 
      to={`tel:${ phoneNumber }`}
      onMouseEnter={() => setState({ hovered: true })}
      onMouseLeave={() => setState({ hovered: false })}
      className={state.hovered ? styles.hovered : ''}>
      <img data-testid="phone-icon-img" src={setVariant(variant, state)} width={width} height={height} title={phoneNumber} />
    </Link>
  )
}

export default PhoneIcon
