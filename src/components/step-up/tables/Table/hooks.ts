import { useState } from "react"
import styles from './Table.module.css'

export const useHandleTableRow = (index: number) => {
  const [state, setState] = useState<{ hovered: boolean }>({ hovered: false })

  const onMouseEnter = () => {
    setState({ hovered: true })
  }

  const onMouseLeave = () => {
    setState({ hovered: false })
  }

  const className = index % 2 === 0 ? styles.evenRow : styles.oddRow

  return { onMouseEnter, onMouseLeave, className, hovered: state.hovered }
}