import styled from '@emotion/styled'

export const StyledContainer = styled.div`
  max-width: ${({ theme }) => theme?.width?.container ?? 1240}px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    max-width: 100%;
    padding: 0;
  }
`
