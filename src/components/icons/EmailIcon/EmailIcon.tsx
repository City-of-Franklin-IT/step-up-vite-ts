import { useState } from 'react'
import { Link } from 'react-router-dom'
import { setVariant } from '.'
import styles from './EmailIcon.module.css'

// Types
import { EmailIconProps, EmailIconState } from "./types"

function EmailIcon({ width, height, email, variant }: EmailIconProps) {
  const [state, setState] = useState<EmailIconState>({ hovered: false })

  return (
    <Link 
      data-testid="email-icon"
      to={`mailto:${ email }`}
      onMouseEnter={() => setState({ hovered: true })}
      onMouseLeave={() => setState({ hovered: false })}
      className={state.hovered ? styles.hovered : ''}>
      <img src={setVariant(variant, state)} width={width} height={height} title={email} />
    </Link>
  )
}

export default EmailIcon
