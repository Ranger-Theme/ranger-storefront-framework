import type { FC } from 'react'
import type { ReactPlayerProps } from 'react-player'
import ReactPlayer from 'react-player'

export interface PlayerProps extends ReactPlayerProps {}

const Player: FC<PlayerProps> = ({
  url = '',
  playing = false,
  loop = false,
  controls = false,
  muted = false,
  playbackRate = 1,
  width = '100%',
  height = '360px',
  playsinline = false,
  config,
  ...props
}) => {
  return (
    <ReactPlayer
      url={url}
      playing={playing}
      loop={loop}
      controls={controls}
      muted={muted}
      playbackRate={playbackRate}
      width={width}
      height={height}
      playsinline={playsinline}
      config={config}
      {...props}
    />
  )
}

export default Player
