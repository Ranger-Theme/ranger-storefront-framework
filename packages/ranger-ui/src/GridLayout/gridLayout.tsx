import ReactGridLayout from 'react-grid-layout'
import type { FC } from 'react'
import type { ReactGridLayoutProps } from 'react-grid-layout'

export interface GridLayoutProps extends ReactGridLayoutProps {}

const GridLayout: FC<GridLayoutProps> = ({ ...props }) => {
  return <ReactGridLayout {...props} />
}

export default GridLayout
