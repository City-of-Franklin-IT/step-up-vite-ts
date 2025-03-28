// Types
import { RefObject } from "react"

export const scrollToTop = (topRef: RefObject<HTMLElement>): void => { // Scroll to top
  topRef.current?.scrollIntoView({ behavior: 'smooth' })
}