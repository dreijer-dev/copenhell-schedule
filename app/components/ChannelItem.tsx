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
    <ChannelBox {...position} className=''>
      <div className='py-2 border-l-2 border-red-900 w-full text-center'>
        <p
          className={`text-white text-nowrap text-sm md:text-lg ${metalMania.className} font-bold`}
        >
          {name}
        </p>
      </div>
    </ChannelBox>
  )
}
