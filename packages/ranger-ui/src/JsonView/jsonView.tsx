import ReactJson from 'react-json-view'
import type { FC } from 'react'
import type { ReactJsonViewProps } from 'react-json-view'

export interface JsonViewProps extends ReactJsonViewProps {}

const JsonView: FC<JsonViewProps> = ({
  src,
  theme = 'rjv-default',
  collapsed = false,
  displayObjectSize = true,
  displayDataTypes = true,
  sortKeys = false,
  quotesOnKeys = true,
  ...props
}) => {
  return (
    <ReactJson
      src={src}
      theme={theme}
      collapsed={collapsed}
      displayObjectSize={displayObjectSize}
      displayDataTypes={displayDataTypes}
      sortKeys={sortKeys}
      quotesOnKeys={quotesOnKeys}
      {...props}
    />
  )
}

export default JsonView
