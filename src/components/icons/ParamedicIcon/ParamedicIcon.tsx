import icon from '../../../assets/icons/paramedic/paramedic.svg'

// Types
import { ParamedicIconProps } from './types'

function ParamedicIcon({ width, height }: ParamedicIconProps) {
  return (
    <img src={icon} width={width} height={height} title={'Paramedic'} />
  )
}

export default ParamedicIcon
