import { StyledContainer } from './styled'

export interface LineContainerProps extends React.DetailsHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const LineContainer: React.FC<LineContainerProps> = ({ children, ...props }) => {
  return (
    <StyledContainer className="container" {...props}>
      {children}
    </StyledContainer>
  )
}

export default LineContainer
