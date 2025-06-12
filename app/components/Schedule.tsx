'use client'

import { Channel, ChannelBox, Epg, Layout, useEpg } from 'planby'
import React from 'react'
import { stages } from '../fixtures/stages'
import { events } from '../fixtures/events'
import { Metal_Mania } from 'next/font/google'
import { theme } from '../helpers/theme'

const metalMania = Metal_Mania({
  subsets: ['latin'],
  weight: ['400'],
})

const ChannelItem = ({ channel }: { channel: Channel }) => {
  const { position, name } = channel
  return (
    <ChannelBox {...position}>
      <p
        className={`text-white text-nowrap  ${metalMania.className} font-bold`}
      >
        {name}
      </p>
    </ChannelBox>
  )
}

export function Schedule() {
  const { getEpgProps, getLayoutProps } = useEpg({
    epg: events,
    channels: stages,
    startDate: '2025-06-20T12:00:00',
    itemHeight: 100,
    isLine: true,
    dayWidth: 2000,
    sidebarWidth: 175,
    theme,
  })

  return (
    <div className='w-[1000px] md:w-[1200px] h-[800px]'>
      <Epg {...getEpgProps()}>
        <Layout
          {...getLayoutProps()}
          renderChannel={({ channel }) => (
            <ChannelItem key={channel.uuid} channel={channel} />
          )}
        />
      </Epg>
    </div>
  )
}
