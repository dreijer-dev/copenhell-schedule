import { Metal_Mania } from 'next/font/google'
import { Channel } from 'planby'
import { ChannelBox } from 'planby'

const metalMania = Metal_Mania({
  subsets: ['latin'],
  weight: ['400'],
})

export function ChannelItem({ channel }: { channel: Channel }) {
  const { position, name } = channel
  return (
    <ChannelBox {...position}>
      <p
        className={`text-white text-nowrap text-lg ${metalMania.className} font-bold`}
      >
        {name}
      </p>
    </ChannelBox>
  )
}
