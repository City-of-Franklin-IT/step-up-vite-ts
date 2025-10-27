// Types
import { RefObject } from "react"

export const scrollToTop = (topRef: RefObject<HTMLElement | null>) => { // Scroll to top
  topRef.current?.scrollIntoView({ behavior: 'smooth' })
}