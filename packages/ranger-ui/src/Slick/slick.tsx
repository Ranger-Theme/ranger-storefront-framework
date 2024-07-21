import Slider from 'react-slick'
import type { FC } from 'react'
import type { Settings } from 'react-slick'

import { StyledCarousel } from './styled'

export interface SlickProps extends Settings {}

const Slick: FC<SlickProps> = ({
  children,
  arrows = true,
  dots = true,
  infinite = false,
  speed = 500,
  slidesToShow = 1,
  slidesToScroll = 1,
  ...props
}) => {
  return (
    <StyledCarousel>
      <Slider
        arrows={arrows}
        dots={dots}
        infinite={infinite}
        speed={speed}
        slidesToShow={slidesToShow}
        slidesToScroll={slidesToScroll}
        {...props}
      >
        {children}
      </Slider>
    </StyledCarousel>
  )
}

export default Slick
