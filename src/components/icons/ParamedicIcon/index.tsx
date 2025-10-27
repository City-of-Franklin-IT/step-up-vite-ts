import icon from '@/assets/icons/paramedic/paramedic.svg'

type ParamedicIconProps = { iconProps: { width: number, height: number } }

function ParamedicIcon(props: ParamedicIconProps) {
  
  return (
    <img src={icon} { ...props.iconProps } title={'Paramedic'} />
  )
}

export default ParamedicIcon
