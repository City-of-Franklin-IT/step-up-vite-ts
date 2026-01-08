import { useHandleEmailIcon } from './hooks'

type EmailIconProps = { iconProps: { width: number, height: number, variant: 'normal' | 'light' | 'warning' }, email: string }

function EmailIcon(props: EmailIconProps) {
  const { icon, ...linkProps } = useHandleEmailIcon(props.iconProps.variant)

  return (
    <a 
      href={`mailto:${ props.email }`}
      { ...linkProps }>
        <img src={icon} { ...props.iconProps } title={props.email} />
    </a>
  )
}

export default EmailIcon
