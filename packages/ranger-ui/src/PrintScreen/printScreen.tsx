import type { FC } from 'react'
import type { IReactToPrintProps } from 'react-to-print'
import ReactToPrint, { useReactToPrint } from 'react-to-print'

export interface PrintScreenProps extends IReactToPrintProps {}
export { useReactToPrint }

const PrintScreen: FC<PrintScreenProps> = ({
  content = () => null,
  bodyClass = '',
  documentTitle = '',
  pageStyle = '',
  suppressErrors,
  ...props
}) => {
  return (
    <ReactToPrint
      content={content}
      bodyClass={bodyClass}
      documentTitle={documentTitle}
      pageStyle={pageStyle}
      suppressErrors={suppressErrors}
      {...props}
    />
  )
}

export default PrintScreen
