export interface EmailIconProps { // EmailIcon props
  width: number,
  height: number,
  email: string,
  variant: 'normal' | 'light' | 'warning'
}

export interface EmailIconState { // EmailIcon stage object
  hovered: boolean
}

export interface SetVariantProps { // setEmail fn props
  variant: EmailIconProps['variant']
  state: EmailIconState
}