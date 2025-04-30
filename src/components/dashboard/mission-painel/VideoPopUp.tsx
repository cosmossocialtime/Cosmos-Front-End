import dynamic from 'next/dynamic'

const Plyr = dynamic(() => import('plyr-react'), { ssr: false })

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
