import type { FC } from 'react'
import type { CountUpProps as ReactCountUpProps } from 'react-countup'
import ReactCountUp, { useCountUp } from 'react-countup'

export interface CountUpProps extends ReactCountUpProps {}

const CountUp: FC<CountUpProps> = ({
  start,
  end,
  duration = 2.75,
  separator = ' ',
  decimals = 4,
  decimal = ',',
  prefix = '',
  suffix = '',
  onEnd = () => {},
  onStart = () => {},
  ...props
}) => {
  return (
    <ReactCountUp
      start={start}
      end={end}
      duration={duration}
      separator={separator}
      decimals={decimals}
      decimal={decimal}
      prefix={prefix}
      suffix={suffix}
      onEnd={onEnd}
      onStart={onStart}
      {...props}
    />
  )
}

export default CountUp

export { useCountUp }
