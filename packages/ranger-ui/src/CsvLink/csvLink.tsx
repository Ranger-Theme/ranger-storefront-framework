import { CSVLink as ReactCSVLink } from 'react-csv'
import type { FC } from 'react'
import type { LinkProps } from 'react-csv/components/Link'

export interface CsvLinkProps extends Omit<LinkProps, 'ref'> {}

const CsvLink: FC<CsvLinkProps> = ({
  data,
  filename,
  target = '_blank',
  asyncOnClick = false,
  onClick = () => {},
  ...props
}) => {
  return (
    <ReactCSVLink
      data={data}
      filename={filename}
      target={target}
      asyncOnClick={asyncOnClick}
      onClick={onClick}
      {...props}
    />
  )
}

export default CsvLink
