export interface PhoneIconProps {
  width: number,
  height: number,
  phoneNumber: string,
  variant: 'normal' | 'light'
}

export interface PhoneIconState { // PhoneIcon state object
  hovered: boolean
}

export interface SetVariantProps { // setVariant fn props
  variant: PhoneIconProps['variant'],
  state: PhoneIconState
}