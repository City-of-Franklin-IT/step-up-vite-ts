import { useHandleEmailIcon } from './hooks'

type EmailIconProps = { iconProps: { width: number, height: number, variant: 'normal' | 'light' | 'warning' }, email: string }

function EmailIcon(props: EmailIconProps) {
  const { onMouseEnter, onMouseLeave, icon } = useHandleEmailIcon(props.iconProps.variant)

  return (
    <a 
      href={`mailto:${ props.email }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
        <img src={icon} { ...props.iconProps } title={props.email} />
    </a>
  )
}

export default EmailIcon
