import { useState } from "react"
import styles from './Table.module.css'

/**
* Returns table row props and hovered boolean
**/
export const useHandleTableRow = (index: number) => {
  const [state, setState] = useState<{ hovered: boolean }>({ hovered: false })

  const onMouseEnter = () => {
    setState({ hovered: true })
  }

  const onMouseLeave = () => {
    setState({ hovered: false })
  }

  const className = index % 2 === 0 ? styles.evenRow : styles.oddRow

  const rowProps = {
    onMouseEnter,
    onMouseLeave,
    className
  }

  return { rowProps, hovered: state.hovered }
}