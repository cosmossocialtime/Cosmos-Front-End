import Plyr from 'plyr-react'
import 'plyr-react/plyr.css'

interface VideoPopUpProps {
  source: string
}

export function VideoPopUp({ source }: VideoPopUpProps) {
  return (
    <Plyr
      source={{
        type: 'video',
        sources: [
          {
            src: source,
            provider: 'youtube',
          },
        ],
      }}
    />
  )
}
