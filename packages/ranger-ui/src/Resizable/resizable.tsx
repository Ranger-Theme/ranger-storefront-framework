import { ResizableBox } from 'react-resizable'
import type { FC } from 'react'
import type { ResizableBoxProps } from 'react-resizable'

import { StyledResizable } from './styled'

export type ResizableProps = {} & ResizableBoxProps

const Resizable: FC<ResizableProps> = ({ children, onResize, ...props }) => {
  return (
    <StyledResizable>
      <ResizableBox onResize={onResize} {...props}>
        {children}
      </ResizableBox>
    </StyledResizable>
  )
}

export default Resizable
