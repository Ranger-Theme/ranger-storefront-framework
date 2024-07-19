import ReactHeadRoom from 'react-headroom'
import type { FC } from 'react'
import type { ReactHeadroomProps } from 'react-headroom'

export interface HeadRoomProps extends ReactHeadroomProps {}

const HeadRoom: FC<HeadRoomProps> = ({
  children,
  disableInlineStyles = false,
  disable = false,
  calcHeightOnResize = true,
  tag = 'div',
  pinStart = 0,
  upTolerance = 5,
  downTolerance = 0,
  parent = () => window,
  ...props
}) => {
  return (
    <ReactHeadRoom
      disableInlineStyles={disableInlineStyles}
      disable={disable}
      calcHeightOnResize={calcHeightOnResize}
      tag={tag}
      pinStart={pinStart}
      upTolerance={upTolerance}
      downTolerance={downTolerance}
      parent={parent}
      {...props}
    >
      {children}
    </ReactHeadRoom>
  )
}

export default HeadRoom
