import { CopyToClipboard } from 'react-copy-to-clipboard'
import type { FC } from 'react'
import type { Options } from 'react-copy-to-clipboard'

export interface CopyBoardProps {
  children?: React.ReactNode
  text: string
  onCopy?(text: string, result: boolean): void
  options?: Options | undefined
}

const CopyBoard: FC<CopyBoardProps> = ({ children, text = '', ...props }) => {
  return (
    <CopyToClipboard text={text} {...props}>
      {children}
    </CopyToClipboard>
  )
}

export default CopyBoard
