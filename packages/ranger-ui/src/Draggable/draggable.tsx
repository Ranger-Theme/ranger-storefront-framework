import ReactDraggable from 'react-draggable'
import type { FC } from 'react'
import type { DraggableProps as ReactDraggableProps } from 'react-draggable'

export interface DraggableProps extends Partial<ReactDraggableProps> {}

const Draggable: FC<DraggableProps> = ({
  children,
  allowAnyClick = true,
  disabled = false,
  handle = '.handle',
  axis = 'x',
  scale = 1,
  ...props
}) => {
  return (
    <ReactDraggable
      allowAnyClick={allowAnyClick}
      disabled={disabled}
      handle={handle}
      axis={axis}
      scale={scale}
      {...props}
    >
      {children}
    </ReactDraggable>
  )
}

export default Draggable
