import type { FC } from 'react'
import type { CountdownProps as ReactCountdownProps } from 'react-countdown'
import ReactCountdown from 'react-countdown'

export interface CountDownProps extends ReactCountdownProps {}

const CountDown: FC<CountDownProps> = ({
  date,
  daysInHours = false,
  controlled = false,
  intervalDelay = 1000,
  precision = 0,
  autoStart = true,
  overtime = false,
  ...props
}) => {
  return (
    <ReactCountdown
      date={date}
      daysInHours={daysInHours}
      controlled={controlled}
      intervalDelay={intervalDelay}
      precision={precision}
      autoStart={autoStart}
      overtime={overtime}
      {...props}
    />
  )
}

export default CountDown
