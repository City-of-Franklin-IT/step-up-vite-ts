import { useHandlePhoneIcon } from './hooks'

type PhoneIconProps = { iconProps: { width: number, height: number, variant: 'normal' | 'light' }, phoneNumber: string }

function PhoneIcon(props: PhoneIconProps) {
  const { onMouseEnter, onMouseLeave, icon } = useHandlePhoneIcon(props.iconProps.variant)

  return (
    <a
      href={`tel:${ props.phoneNumber }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
        <img src={icon} { ...props.iconProps } title={props.phoneNumber} />
    </a>
  )
}

export default PhoneIcon
