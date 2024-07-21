import { ResizableBox } from 'react-resizable'
import type { FC } from 'react'
import type { ResizableBoxProps } from 'react-resizable'

export type ResizableProps = {} & ResizableBoxProps

const Resizable: FC<ResizableProps> = ({ children, onResize, ...props }) => {
  return (
    <ResizableBox onResize={onResize} {...props}>
      {children}
    </ResizableBox>
  )
}

export default Resizable
